// Saves options to chrome.storage
function save_options() {
  const workerId = document.getElementById("workerId").value;
  chrome.storage.sync.set(
    {
      workerId
    },
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 1000);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      workerId: ""
    },
    function(items) {
      document.getElementById("workerId").value = items.workerId;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
