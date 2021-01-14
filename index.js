/**
 * @author
 */

 const AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({ profile: "nuxt" });
AWS.config.credentials = credentials;

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const { MultiSelect } = require("enquirer");
const { execPromise } = require('./modules/exec')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 *
 * @param {*} bucket
 */
const deleteBucket = async bucket => {
    return await execPromise(`sh ./delete.sh ${bucket}`)
    .then((result) => {
        console.log('Bucket deleted : ', bucket)
        return true
    }, (error) => {
        console.log('Error occured! ', error)
        return false
    })
};

/**
 *
 */
const main = async () => {
  const { Buckets } = await s3.listBuckets().promise();
  const choices = Buckets.map(({ Name }) => ({ name: Name, value: Name }));
  const prompt = new MultiSelect({
    name: "value",
    message: "Select the buckets you would like to delete",
    choices
  });

  const bucketsToDelete = await prompt.run();
  let deletedBuckets = 0;
  for (let bucket of bucketsToDelete) {
    await delay(200);
    const isDeleted = await deleteBucket(bucket);
    deletedBuckets += isDeleted ? 1 : 0;
  }
  console.log(
    `\nDeleted ${deletedBuckets}/${bucketsToDelete.length} buckets.\n`
  );
};

main();