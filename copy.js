function copySimulation() {
	if (window.location.href.match(/https:\/\/my.observepoint.com\/simulation\/form\/.*?p=58/) !== null) {
		document.body.style.backgroundColor = "red";
		chrome.storage.sync.set({"observePointClone": doCopy()});
		chrome.extension.sendMessage({cmd: "launchNewSimulationScreen", url: "https://my.observepoint.com/simulation/form?p=58&t=3"});
	}
}

function doCopy() {
	var act = new Array,
	    actList = new Array,
	    mySettings = new Array,
	    action = jQuery(".action_row");

	for (i = 0; i < action.length; i++) {
	    var clonedobj = jQuery.extend({}, act);
	    clonedobj.ActionType = jQuery(action[i]).find("select").find(":selected").val();
	    clonedobj.PreventNav = jQuery(action[i]).find("input[namejQuery='[prevent_navigation]']").prop("checked");
	    clonedobj.Value = jQuery(action[i]).find("input[placeholder='value']").val();
	    clonedobj.Identifier = jQuery(action[i]).find("input[placeholder='identifier']").val();
	    actList.push(clonedobj);
	}

	var clonedobj = jQuery.extend({}, act);

	clonedobj.Name = jQuery("#flow_description").val();
	clonedobj.Address = jQuery("#flow_starting_url").val();
	clonedobj.Frequency = jQuery("#uniform-flow_monitor_frequency_in_minutes select").val();
	clonedobj.Location = jQuery("#flow_location_id").val();
	clonedobj.UserAgent = jQuery("#flow_user_agent_id").val();
	clonedobj.NotificationEmails = jQuery("#flow_notification_addresses").val();
	clonedobj.ActionSet = actList;
	clonedobj.SendAlerts = jQuery("#flow_send_alerts").prop("checked");
	clonedobj.SilentMode = jQuery("#flow_silent_mode").prop("checked");
	clonedobj.SendReminders = jQuery("#flow_send_reminders").prop("checked");
	clonedobj.LoadVideos = jQuery("#flow_load_videos").prop("checked");
	clonedobj.BrowserOverride = jQuery("#flow_browser_width").val();
	mySettings.push(clonedobj);

	return JSON.stringify(mySettings);
}