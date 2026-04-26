import * as microsoftTeams from "@microsoft/teams-js";

/**
 * Initializes the Microsoft Teams SDK and returns a promise that resolves
 * when initialization is complete.
 */
export const initializeTeams = async () => {
  try {
    await microsoftTeams.app.initialize();
    console.log("Teams SDK initialized");
    return true;
  } catch (error) {
    console.error("Teams SDK initialization failed", error);
    return false;
  }
};

/**
 * Checks if the app is running inside Microsoft Teams.
 */
export const inTeams = () => {
  try {
    return window.self !== window.top && !!window.name;
    // A more robust check can be done via Teams SDK if initialized
  } catch (e) {
    return true;
  }
};

/**
 * Fetches an auth token silently from Microsoft Teams.
 */
export const getTeamsAuthToken = () => {
  return new Promise((resolve, reject) => {
    microsoftTeams.authentication.getAuthToken({
      successCallback: (token) => {
        resolve(token);
      },
      failureCallback: (error) => {
        reject(error);
      },
    });
  });
};
