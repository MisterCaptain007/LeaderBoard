const owner = "your-username"; // Replace with your GitHub username
const repo = "your-repo"; // Replace with your repository name   
 
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;
 
async function fetchContributors() {
  try {
    const response = await fetch(apiUrl);
    const contributors = await response.json();
 
    if (contributors.message) {
      document.getElementById("loading").innerText = "Error: " + contributors.message;
      return;
    }
 
    populateLeaderboard(contributors);
  } catch (error) {
    document.getElementById("loading").innerText = "Error fetching data!";
    console.error(error);
  }
}
 
function populateLeaderboard(contributors) {
  const leaderboard = document.getElementById("leaderboard");
  const tbody = leaderboard.querySelector("tbody");
 
  contributors
    .sort((a, b) => b.contributions - a.contributions)
    .forEach((contributor, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><a href="${contributor.html_url}" target="_blank">${contributor.login}</a></td>
        <td>${contributor.contributions}</td>
      `;
      tbody.appendChild(row);
    });
 
  document.getElementById("loading").style.display = "none";
leaderboard.style.display = "table";
}
 
fetchContributors();