// Global variables
const insertBeforeDiv = window.document.getElementById('fullscreen-features');
const testDiv = window.document.createElement('div');

// Add h2 tag for set of fullscreen api functions
function addTitleTag(title) {
  const newHeader = window.document.createElement('h2');
  newHeader.classList.add('section-type');
  const newContent = window.document.createTextNode(title ?? 'no Type');
  newHeader.appendChild(newContent);
  window.document.body.insertBefore(newHeader, insertBeforeDiv);
}

// Add container for group of features
function addGroup(id) {
  const newGroup = window.document.createElement('div');
  newGroup.classList.add('feature-group');
  newGroup.setAttribute('id', id);
  window.document.body.insertBefore(newGroup, insertBeforeDiv);
}

// Add a row to the container with group features
function addAvailabilityToGroup(groupId, functionName, isAvailable) {
  const group = window.document.getElementById(groupId);

  // Create column with name of the function
  const newGroupEntryName = window.document.createElement('div');
  const nameContent = window.document.createTextNode(functionName ?? 'no function name');
  newGroupEntryName.appendChild(nameContent);
  group.appendChild(newGroupEntryName);

  // Create column with the availability of the function
  const newGroupEntryState = window.document.createElement('div');
  // Create element for availability image
  const newGroupEntryStateImage = window.document.createElement('div');
  if (isAvailable) {
    newGroupEntryStateImage.classList.add('circle-green');
  } else {
    newGroupEntryStateImage.classList.add('circle-red');
  }
  newGroupEntryStateImage.innerHTML = '&nbsp;';
  newGroupEntryState.appendChild(newGroupEntryStateImage);
  // Create element for availability text
  const newGroupEntryStateText = window.document.createElement('div');
  newGroupEntryStateText.classList.add('feature-text');
  const stateContentText = window.document.createTextNode(isAvailable ? 'available' : 'not available');
  newGroupEntryStateText.appendChild(stateContentText);
  newGroupEntryState.appendChild(newGroupEntryStateText);
  // Add element with image and text to group
  group.appendChild(newGroupEntryState);

  // Insert row
  window.document.body.insertBefore(group, insertBeforeDiv);
}

/**
 * Main program
 */
const notAvailableString = 'not available';

// browser detection
window.document.getElementById('user-agent-header').innerHTML = navigator.userAgent;
window.document.getElementById('browser-platform').innerHTML = window.navigator.platform ?? notAvailableString;

// feature detection
const fullscreenInterfaces = {
  apiStandard: [
    { functionName: 'requestFullscreen', baseElement: testDiv },
    { functionName: 'exitFullscreen', baseElement: window.document },
    { functionName: 'fullscreenElement', baseElement: window.document },
    { functionName: 'fullscreenEnabled', baseElement: window.document }
  ],
  newWebkit: [
		{ functionName: 'webkitRequestFullscreen', baseElement: testDiv },
		{ functionName: 'webkitExitFullscreen', baseElement: window.document },
		{ functionName: 'webkitFullscreenElement', baseElement: window.document },
		{ functionName: 'webkitFullscreenEnabled', baseElement: window.document }
  ],
	oldWebKit: [
		{ functionName: 'webkitRequestFullScreen', baseElement: testDiv },
		{ functionName: 'webkitCancelFullScreen', baseElement: window.document },
		{ functionName: 'webkitCurrentFullScreenElement', baseElement: window.document },
		{ functionName: 'webkitCancelFullScreen', baseElement: window.document }
  ],
  oldMozilla: [
		{ functionName: 'mozRequestFullScreen', baseElement: testDiv },
		{ functionName: 'mozCancelFullScreen', baseElement: window.document },
		{ functionName: 'mozFullScreenElement', baseElement: window.document },
		{ functionName: 'mozFullScreenEnabled', baseElement: window.document }
  ]
}

if (typeof window.document !== 'undefined') {
  window.document.getElementById('error-message').classList.add('error-message-hide');

  for (const key in fullscreenInterfaces) {
    if (Object.hasOwnProperty.call(fullscreenInterfaces, key)) {
      addTitleTag(key);
      addGroup(key);
      const element = fullscreenInterfaces[key];
      element.forEach(featureEntry => {
        const isAvailable = (featureEntry.functionName in featureEntry.baseElement);
        addAvailabilityToGroup(key, featureEntry.functionName, isAvailable)
      });
    }
  }
} else {
  window.document.getElementById('error-message').innerHTML = "Error: 'window.document' not available";
  window.document.getElementById('error-message').classList.add('error-message-show');
}
