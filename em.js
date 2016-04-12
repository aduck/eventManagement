var em=(function(){
	function _each(arr,cb){
		for(var i=0,len=arr.length;i<len;i++){
			cb.call(arr[i],i);
		}
	}
	function _addEvent(o,type,cb){
		if(o.addEventListener){
			o.addEventListener(type,cb,false);
		}else if(o.attachEvent){
			o.attachEvent('on'+type,cb);
		}
	}
	function _removeEvent(o,type,cb){
		if(o.removeEventListener){
			o.removeEventListener(type,cb,false)
		}else if(o.detachEvent){
			o.detachEvent('on'+type,cb)
		}
	}

	return {
		events:[],
		add:function(o,type,cbs){
			var events=this.events;
			if(cbs instanceof Array){
				_each(cbs,function(){
					var self=this;
					_addEvent(o,type,self)
				})
			}else{
				_addEvent(o,type,cbs);
			}
			events.push({
				target:o,
				type:type,
				callbacks:cbs
			});
		},
		fire:function(o,type){
			var events=this.events;
			_each(events,function(){
				var self=this;
				if(self.target==o && self.type==type){
					if(self.callbacks instanceof Array){
						_each(self.callbacks,function(){
							var _self=this;
							_self();
						})
					}else{
						self.callbacks();
					}
				}
			})
		},
		remove:function(o,type){
			var events=this.events;
			_each(events,function(i){
				if(this.target==o && this.type==type){
					var callbacks=this.callbacks;
					if(callbacks instanceof Array){
						_each(callbacks,function(){
							var self=this;
							_removeEvent(o,type,self);
						})
					}else{
						_removeEvent(o,type,callbacks);
					}
					events.splice(i,1);
				}
			})
		},
		getEvents:function(o){
			var events=this.events,
				_events=[];
			_each(events,function(){
				if(this.target==o){
					_events.push(this);
				}
			})
			return _events;
		}
	}
})();