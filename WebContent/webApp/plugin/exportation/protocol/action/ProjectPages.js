Ext.ns('Plugin.exportation');

Plugin.exportation.storyCountPage = Ext.extend(Object, {
	init: function(cmp) {
		this.hostCmp = cmp;
		this.hostCmp.on('render', this.onRender, this, {delay: 200});
	},

	onRender: function() {
		var StoryCountPage = new Ext.Panel({
			id			: 'StoryCountChart_Page',
			layout		: 'anchor',
			autoScroll	: true,
			items : [
			    { ref: 'StoryCountChartPanel_ID', xtype : 'StoryCountChartPanel' }
			],
			listeners : {
				'show' : function() {
				}
			}
		});
//		panel = new Ext.Panel({
//			id			: 'storyCountPage',
//			title		: 'storyCountPage',
//			height		: 300,
//			width		: '25%',
//			autoScroll	: true,
//			bodyStyle	: 'padding: 10px;',
//			releases	: [],
//			initComponent: function() {
//				ezScrum.VelocityReleasePanel.superclass.initComponent.apply(this, arguments);
//				
//			}
//		});

		this.hostCmp.add(StoryCountPage);
		this.hostCmp.doLayout();
	}
});

Ext.preg('storyCountPage', Plugin.exportation.storyCountPage);

//Plugin.analyseTeamCooperation.peoplePage = Ext.extend(Object, {
//	init: function(cmp) {
//		this.hostCmp = cmp;
//		this.hostCmp.on('render', this.onRender, this, {delay: 200});
//	},
//
//	onRender: function() {
//		panel = new Ext.Panel({
//			id			: 'peoplePage',
//			title		: 'peoplePage',
//			height		: 300,
//			width		: '25%',
//			autoScroll	: true,
//			bodyStyle	: 'padding: 10px;',
//			releases	: [],
//			initComponent: function() {
//				ezScrum.VelocityReleasePanel.superclass.initComponent.apply(this, arguments);
//			},
//		});
//
//		this.hostCmp.add(panel);
//		this.hostCmp.doLayout();
//	}
//});
//
//Ext.preg('analyseTeamCooperation_peoplePage', Plugin.analyseTeamCooperation.peoplePage);
