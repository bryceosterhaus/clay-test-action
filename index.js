/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const github_token = core.getInput('token');

		const context = github.context;

		const octokit = new github.GitHub(github_token);










		octokit.pulls.list(context.repo).then(
			prs => {
				prs.data.forEach(pr => {
					if (
						!pr.labels.find(label => label.name === 'Build Stats Finished')
					) {
						octokit.issues.addLabels({
							...context.repo,
							issue_number: pr.number,
							labels: ['Build Stats Started'],
						});

						// Build stats...

						octokit.issues.createComment({
							...context.repo,
							body: 'test',
							issue_number: pr.number,
						});

						octokit.issues.removeLabel({
							...context.repo,
							issue_number: pr.number,
							name: 'Build Stats Started'
						});

						octokit.issues.addLabels({
							...context.repo,
							issue_number: pr.number,
							labels: ['Build Stats Finished'],
						});
					}
				})
			});

	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
