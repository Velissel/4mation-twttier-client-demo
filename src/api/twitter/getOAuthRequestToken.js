export default (oauth) => {
  return new Promise((resolve, reject) => {
    oauth.getOAuthRequestToken((err, oauth_token, oauth_token_secret, results) => {
      if (err) {
        return reject(err);
      }
      resolve({ oauth_token, oauth_token_secret, results });
    });
  });
}