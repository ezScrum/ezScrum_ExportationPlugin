Ext.ns('Plugin.exportation');

Plugin.exportation.StoryCountReleasePanel = Ext.extend(Ext.Panel, {
	title		: 'Releases',
	height		: 300,
	width		: '25%',
	autoScroll	: true,
	bodyStyle	: 'padding: 10px;',
	releases	: [],
	initComponent: function() {
		var config = {
				items:[]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Plugin.exportation.StoryCountReleasePanel.superclass.initComponent.apply(this, arguments);
		
		this.createCheckboxs();
	},
	createCheckboxs: function() {
		var obj = this;
		var username = this.getCookie("username");
		var userpwd = this.getCookie("userpwd");

		Ext.Ajax.request({
			url		: '/ezScrum/web-service/' + getURLParameter("projectName") + '/release-plan/all?username=' + username + '&password=' + userpwd,
			success	: function(response) {
				obj.releases = Ext.decode(response.responseText);
				for(var i=0; i<obj.releases.length; i++) {
					obj.add({
						xtype		: 'checkbox',
						boxLabel	: obj.releases[i].name,
						releaseId	: obj.releases[i].serial_id,
						listeners	: {
							check: function(checkbox, value) {
								obj.checkChange();
							}
						}
					});
				}
			}
		});
	},
	checkChange: function() {
		var obj = this;
		var selectedPanel = Ext.getCmp('StoryCountSelectPanel_ID');
		var exportbutton = Ext.getCmp('StoryCountExportButton');
		
		selectedPanel.removeAll();
		for(var i=0; i<obj.items.length; i++) { 
			if(obj.get(i).checked) {
				selectedPanel.add({
					html: obj.get(i).boxLabel,
					style: 'margin: 0px 0px 3px 0px;',
					border: false
				});
			}
		}
		if(selectedPanel.items.length > 0){
			exportbutton.enable();
		} else {
			exportbutton.disable();
		}
		selectedPanel.doLayout();
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length-1).replace('"', '');
		}
		return "";
	}
});
Ext.reg('StoryCountReleasePanel', Plugin.exportation.StoryCountReleasePanel);

Plugin.exportation.StoryCountSelectPanel = Ext.extend(Ext.Panel, {
	title		: 'Selected',
	height		: 300,
	width		: '25%',
	autoScroll	: true,
	bodyStyle	: 'padding: 10px;'
});
Ext.reg('StoryCountSelectPanel', Plugin.exportation.StoryCountSelectPanel);

Plugin.exportation.StoryCountControlPanel = Ext.extend(Ext.Panel, {
	border		: false,
	layout		: {
		type: 'hbox',
		pack: 'center',
		align: 'top'
	},
	height		: 350,
	style		: 'padding: 15px;',
	initComponent: function() {
		var config = {
			items: [{
			    	xtype	: 'StoryCountReleasePanel', 
			    	ref		: 'StoryCountReleasePanel_ID',
			    	id		: 'StoryCountReleasePanel_ID'
			    }, {
			    	html	: '>>',
			    	border	: false,
			    	bodyStyle: 'margin:140px 50px 0px 50px'
			    }, {
			    	xtype	: 'StoryCountSelectPanel',
			    	ref		: 'StoryCountSelectPanel_ID',
			    	id		: 'StoryCountSelectPanel_ID'
			    }, {
			    	xtype	: 'button',
			    	text	: 'Export',
			    	handler	: this.doExport,
			    	disabled: true,
			    	style	: 'margin: 275px 0px 0px 50px;',
			    	id      : 'StoryCountExportButton'
			    }
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Plugin.exportation.StoryCountControlPanel.superclass.initComponent.apply(this, arguments);
	},
	doExport: function() {
		var exportPanel = Ext.getCmp('StoryCountExportPanel_ID');
		var releasePanel = Ext.getCmp('StoryCountReleasePanel_ID');
		
		//組合query string
		var checked = [];
		var queryString = "projectName=" + getURLParameter("projectName") + "&releases=";
		for(var i=0; i<releasePanel.items.length; i++) {
			if(releasePanel.get(i).checked) {
				checked.push(releasePanel.get(i).releaseId);
			}
		}
		for (var i = 0; i<checked.length; i++) {
			queryString += checked[i];
			if (i != checked.length - 1) {
				queryString += ",";
			}
		};
		
		if(checked.length === 0) {
			alert('Please select one release at least.');
			return;
		}
		
		exportPanel.removeAll();
		exportPanel.add({
				html: '<iframe src="/ezScrum/plugin/Exportation/getStoryCountChartPage?' + queryString + '" width="820" height="650" frameborder="0" scrolling="auto"></iframe>',
				border: false
			}
		);
		exportPanel.doLayout();
	}
});
Ext.reg('StoryCountControlPanel', Plugin.exportation.StoryCountControlPanel);

Plugin.exportation.StoryCountExportPanel = Ext.extend(Ext.Panel, {
	border		: true,
	layout		: {
		type: 'hbox',
		pack: 'center',
		align: 'top'
	},
	autoHeight	: true,
	width		: '100%',
	autoScroll	: true
});
Ext.reg('StoryCountExportPanel', Plugin.exportation.StoryCountExportPanel);

Plugin.exportation.StoryCountChartPanel = Ext.extend(Ext.Panel, {
	id			: 'StoryCountChartPanel_ID',
	title		: 'Story Count Chart',
	border		: false,
	layout		: 'anchor',
	initComponent: function() {
		var config = {
			items: [{
					xtype	: 'StoryCountControlPanel', 
					ref		: 'StoryCountControlPanel_ID',
					id		: 'StoryCountControlPanel_ID'
				}, {
					xtype	: 'StoryCountExportPanel',
					ref		: 'StoryCountExportPanel_ID',
					id		: 'StoryCountExportPanel_ID'
				}
			]
		}
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Plugin.exportation.StoryCountChartPanel.superclass.initComponent.apply(this, arguments);
	}
});
Ext.reg('StoryCountChartPanel', Plugin.exportation.StoryCountChartPanel);