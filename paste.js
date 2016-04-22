var clone;

function addActionRow(actionSet, index) {
	var link = document.querySelector('a[data-remote="true"]');
	link.click();
	if (waitForActionRow(index)) {
		$('.action_row')[index].find("input[placeholder='value']").val(clone[0].ActionSet[i].Value);
		$('.action_row')[index].find("input[placeholder='identifier']").val(clone[0].ActionSet[i].Identifier);
		$('.action_row')[index].find("input[name$='[prevent_navigation]']").prop(actionSet.PreventNav ? "checked" : "");
	}
}

function waitForActionRow(index) {
	if ($('.action_row').length == index+1) {
		console.log('action row created!');
		return true;
	} else {
		//setTimeout(function() { waitForActionRow(index); }, 1000);
	}
}

function popalate(clone) {

	// $readyToRefresh = false;
	$(clone[0].ActionSet).each(function() {
		addActionRow(this, clone[0].ActionSet.indexOf(this));
	});

	$("#flow_description").val(clone[0].Name + " ***** COPY *****");
	$("#flow_starting_url").val(clone[0].Address);
	$("#uniform-flow_monitor_frequency_in_minutes select").val(clone[0].Frequency);
	$("#flow_location_id").val(clone[0].Location);
	$("#flow_user_agent_id").val(clone[0].UserAgent);
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

	document.body.style.backgroundColor = "green";
}


function pasteSimulation() {
	chrome.storage.sync.get("observePointClone", function (obj) {
	    clone = JSON.parse(obj["observePointClone"]);
	    popalate(clone);
	});
}