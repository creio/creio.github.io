import { Octokit } from "octokit";
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

  const octokit = new Octokit({
    auth: config.GH_TOKEN, // Change in .env
  });

  function transformGithubData(repo: any) {
    const desc = repo.description ?? "No description";
    return {
      name: repo.name,
      description: desc,
      created: repo.created_at.split("T")[0],
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks,
    };
  }

  const data = await octokit.request("GET /users/{username}/repos", {
    username: config.GH_USER, // Your github username
  });

  return data.data.map((rep) => {
    return transformGithubData(rep);
  });
});
