const { exec } = require('child_process')

/**
* Execute the command as a Promise
* @param {string} cmd
*/
exports.execPromise = (cmd) => new Promise((resolve, reject) => {
	exec(cmd, (error, stdout, stderr) => {
	/**
     * Error handling
     */
		if (error) {
			console.log(error)

			if (stderr) {
				console.log(stderr)
			}

			reject(error)
		}

		/**
         * Success
         */
		resolve(stdout)
	})
})
