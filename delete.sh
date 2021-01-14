#!/bin/bash
# Make sure AWS is configure with a profile on the deploy server
# @TODO region is defined in the environement
export AWS_REGION=us-east-1
export AWS_PROFILE=nuxt

# Get S3Bucket from arguments
if [ -z "$1" ]; then
    echo "Bucket name is required !"
fi

# Delete AWS S3 Bucket
S3_BUCKET=$1
aws s3 rb s3://$S3_BUCKET --force