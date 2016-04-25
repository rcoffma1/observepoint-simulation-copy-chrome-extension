var clone;

function addActionRow(actionRow, index) {
	$('fieldset#actions').append("<section class=action_row id=action_6342400><label><div style=float:left;width:300px><div style=float:left;width:80px;margin-top:10px>Type</div><div class=selector id=uniform-flow_flow_events_attributes_6342400_event_type_id><span>INPUT</span><select id=flow_flow_events_attributes_6342400_event_type_id name=flow[flow_events_attributes][6342400][event_type_id] onchange=refreshRow(6342400) style=opacity:0><option value=1>NAVTO<option value=4>CLICK<option value=5 selected>INPUT<option value=6>SELECT<option value=7>CHECK<option value=8>UNCHECK<option value=9>EXECUTE<option value=10>WATCH</select></div></div><div style=float:left;width:300px><div style=float:left;width:80px;margin-top:5px>Prevent Nav</div><div class=checker id=uniform-flow_flow_events_attributes_6342400_prevent_navigation><span><input id=flow_flow_events_attributes_6342400_prevent_navigation name=flow[flow_events_attributes][6342400][prevent_navigation] style=opacity:0 type=checkbox value=1></span></div></div></label><div><div><div style=float:left;width:270px;min-height:1px><input id=flow_flow_events_attributes_6342400_tagvalue name=flow[flow_events_attributes][6342400][tagvalue] class=text placeholder=value size=20 style=width:200px> <span style=width:40px;margin-left:15px;padding-top:10px>into</span></div><div style=float:left;width:270px;min-height:1px><input id=flow_flow_events_attributes_6342400_tagid name=flow[flow_events_attributes][6342400][tagid] class=text placeholder=identifier size=20 style=width:200px></div><div style=float:left;width:60px;padding-top:10px><img onclick=moveUp(6342400) src=/assets/up.png> <img onclick=moveDown(6342400) src=/assets/down.png> <img onclick=removeRow(6342400) src=/assets/x.png></div><input id=flow_flow_events_attributes_6342400__destroy name=flow[flow_events_attributes][6342400][_destroy] class=hidden value=false> <input id=flow_flow_events_attributes_6342400_id name=flow[flow_events_attributes][6342400][id] class=hidden></div></div></section>");

		$('.action_row').eq(index).find("input[placeholder='value']").val(actionRow.Value);
		$('.action_row').eq(index).find("input[placeholder='identifier']").val(actionRow.Identifier);
		$('.action_row').eq(index).find("input[name$='[prevent_navigation]']").prop("checked", actionRow.PreventNav ? "checked" : "");
		$('.action_row').eq(index).find("input[name$='[prevent_navigation]']").parents('span').prop('class', actionRow.PreventNav? 'checked' : '');
		$('.action_row').eq(index).find("[id^='flow_flow_events_attributes_'][id$='event_type_id']").val(actionRow.ActionType);
		$('.action_row').eq(index).find("[id^='uniform-flow_flow_events_attributes_'][id$='event_type_id']").find('span').text($('.action_row').eq(index).find("[id^='flow_flow_events_attributes_'][id$='event_type_id']").find(':selected').text());
}

function popalate(clone) {

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

	$(clone[0].ActionSet).each(function() {
		addActionRow(this, clone[0].ActionSet.indexOf(this));
	});

	document.body.style.backgroundColor = "green";
}


function pasteSimulation() {
	chrome.storage.sync.get("observePointClone", function (obj) {
	    clone = JSON.parse(obj["observePointClone"]);
	    popalate(clone);
	});
}