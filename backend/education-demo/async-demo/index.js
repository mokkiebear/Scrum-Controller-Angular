//Callbacks approach
/*
getUser(1, (user) => {
  getRepositiories(user.name, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
*/

//Promise-base approach

getUser(1)
  .then(user => getRepositiories(user.name))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(err => console.log(err.message));

//Async and Await approach
async function displayCommits(){
  try{
    const user = await getUser(1);
    const repos = await getRepositiories(user.name);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch (err) {
    console.log(err.message);
  }
}
displayCommits();


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, name: 'Maxim' });
    }, 2000);
  });
}

function getRepositiories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Getting commits...');
      resolve(['com1', 'com2', 'com3']);
    }, 2000);
  });
}