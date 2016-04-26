var clone;
var actionLink = document.querySelector('a[data-remote="true"]');
var targetNode = $("fieldset#actions")[0];

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var newRow = $(mutation.addedNodes[0]);
		var index = $("fieldset#actions").find("section.action_row").index(newRow);
		setActionRow(clone[0].ActionSet[index], newRow);
		addActionRows();
	});
});

var observerConfig = {
	attributes: true,
	childList: true,
	characterData: true
};

observer.observe(targetNode, observerConfig);

function addActionRows() {
	if ($('section.action_row').length < clone[0].ActionSet.length) {
		addActionRow();
	}
}

function addActionRow(actionRow, index) {
	actionLink.click();
}

function setActionRow(actionRow, newRow) {
	$(newRow).find("input[placeholder='value']").val(actionRow.Value);
	$(newRow).find("input[placeholder='identifier']").val(actionRow.Identifier);
	$(newRow).find("input[name$='[prevent_navigation]']").prop("checked", actionRow.PreventNav ? "checked" : "");
	$(newRow).find("input[name$='[prevent_navigation]']").parents('span').prop('class', actionRow.PreventNav? 'checked' : '');
	$(newRow).find("[id^='flow_flow_events_attributes_'][id$='event_type_id']").val(actionRow.ActionType);
	$(newRow).find("[id^='uniform-flow_flow_events_attributes_'][id$='event_type_id']").find('span').text($(newRow).find("[id^='flow_flow_events_attributes_'][id$='event_type_id']").find(':selected').text());
}

function setFields(clone) {
	$("#flow_description").val(clone[0].Name + " ***** COPY *****");
	$("#flow_starting_url").val(clone[0].Address);
	$("#flow_monitor_frequency_in_minutes").val(clone[0].Frequency);
	$("#uniform-flow_monitor_frequency_in_minutes span").text($("#flow_monitor_frequency_in_minutes").find(':selected').text());
	$("#flow_location_id").val(clone[0].Location);
	$("#uniform-flow_location_id span").text($("#flow_location_id").find(':selected').text());
	$("#flow_user_agent_id").val(clone[0].UserAgent);
	$("#uniform-flow_user_agent_id span").text($("#flow_user_agent_id").find(':selected').text());
	$("#flow_notification_addresses").val(clone[0].NotificationEmails);
	$("#flow_send_alerts").prop("checked", clone[0].SendAlerts);
	$('#flow_send_alerts').parents('span').prop('class', clone[0].SendAlerts? 'checked': '');
	$("#flow_silent_mode").prop("checked", clone[0].SilentMode);
	$('#flow_silent_mode').parents('span').prop('class', clone[0].SilentMode? 'checked': '');
	$("#flow_send_reminders").prop("checked", clone[0].SendReminders);
	$('#flow_send_reminders').parents('span').prop('class', clone[0].SendReminders? 'checked': '');
	$("#flow_load_videos").prop("checked", clone[0].LoadVideos);
	$('#flow_load_videos').parents('span').prop('class', clone[0].LoadVideos? 'checked': '');
	$("#flow_browser_width").val(clone[0].BrowserOverride);
	addActionRows();
	document.body.style.backgroundColor = "green";
}


function pasteSimulation() {
	chrome.storage.sync.get("observePointClone", function (obj) {
	    clone = JSON.parse(obj["observePointClone"]);
	    setFields(clone);
	});
}
