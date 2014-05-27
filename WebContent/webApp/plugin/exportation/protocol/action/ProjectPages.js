Ext.ns('Plugin.exportation');

Plugin.exportation.storyCountChartPage = Ext.extend(Object, {
	init: function(cmp) {
		this.hostCmp = cmp;
		this.hostCmp.on('render', this.onRender, this, {delay: 200});
	},

	onRender: function() {
		var StoryCountChartPage = new Ext.Panel({
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

		this.hostCmp.add(StoryCountChartPage);
		this.hostCmp.doLayout();
	}
});

Ext.preg('storyCountChartPage', Plugin.exportation.storyCountChartPage);

Plugin.exportation.velocityChartPage = Ext.extend(Object, {
	init: function(cmp) {
		this.hostCmp = cmp;
		this.hostCmp.on('render', this.onRender, this, {delay: 200});
	},

	onRender: function() {
		var VelocityChartPage = new Ext.Panel({
			id			: 'VelocityChart_Page',
			layout		: 'anchor',
			autoScroll	: true,
			items : [
			    { ref: 'VelocityChartPanel_ID', xtype : 'VelocityChartPanel' }
			],
			listeners : {
				'show' : function() {
				}
			}
		});

		this.hostCmp.add(VelocityChartPage);
		this.hostCmp.doLayout();
	}
});

Ext.preg('velocityChartPage', Plugin.exportation.velocityChartPage);
