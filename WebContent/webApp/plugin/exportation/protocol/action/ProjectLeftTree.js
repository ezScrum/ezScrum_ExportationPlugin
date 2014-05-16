Ext.ns('Plugin.exportation.projectLeftTree');

Plugin.exportation.projectLeftTree.TreePlugin = Ext.extend(Object, {
	init: function(cmp) {
		this.hostCmp = cmp;
		this.hostCmp.on('render', this.onRender, this, {delay: 200});
	},

	onRender: function() {
		var node = new Ext.tree.AsyncTreeNode({
			text: 'Team Analysis',
	    	id 	: 'teamAnalysis',
			expanded : true,
			iconCls:'None',
        	cls:'treepanel-parent',
			children : [
		    {
		    	id:'storyCount',
				text : '<u>StoryCount Chart</u>', 
		    	cls:'treepanel-leaf',
            	iconCls:'leaf-icon',
				leaf:true,
				listeners: {
					click: function(node, event) {
						var index = Ext.getCmp('content_panel').items.keys.indexOf("StoryCountChart_Page");
						Ext.getCmp('content_panel').layout.setActiveItem(index);
						Ext.getCmp('left_panel').Plugin_Clicked = true;
					}
				}
//			}, 
//			{
//				id:'analysisByTeam',
//				text : '<u>Analysis by Team</u>',
//				cls:'treepanel-leaf',
//            	iconCls:'leaf-icon',
//				leaf:true,
//				listeners: {
//					click: function(node, event) {
//						var index = Ext.getCmp('content_panel').items.keys.indexOf("peoplePage");
//						Ext.getCmp('content_panel').layout.setActiveItem(index);
//						Ext.getCmp('left_panel').Plugin_Clicked = true;
//					}
//				}
			}]
		});

		this.hostCmp.getRootNode().appendChild(node);
		this.hostCmp.doLayout();
	}
});

Ext.preg('storyCount', Plugin.exportation.projectLeftTree.TreePlugin);
