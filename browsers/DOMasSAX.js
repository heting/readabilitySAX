/*
	Explenation:
		DOM port of E4XasSAX
		use the document root to initialise it
*/

function saxParser(elem, callbacks){
	if(typeof callbacks !== 'object')
		throw 'please provide callbacks!';

	//todo: support further events, options for trim & space normalisation
	
	function parse(node){
		var name = node.tagName.toLowerCase(),
			attributes = {},
			attributeNodes = node.attributes, 
			attrNum = attributeNodes.length;
		for(var i = 0; i < attrNum; i++){
			attributes[attributeNodes[i].name+''] = attributeNodes[i].value;
		}
		callbacks.onopentag(name, attributes);
		
		var childs = node.childNodes, num = childs.length, nodeType;
		for(var i = 0; i < num; i++){
			nodeType = childs[i].nodeType;
			if(nodeType === 3 /*text*/)
				callbacks.ontext(childs[i].textContent);
			else if(nodeType === 1 /*element*/) parse(childs[i]);
			/*else if(nodeType === 8) //comment
				if(callbacks.oncomment) callbacks.oncomment(childs[i].toString());
			[...]
			*/
		}
		callbacks.onclosetag(name);
	}
	
	parse(elem);
}