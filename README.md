# eventManagement
js事件管理工具<br>
属性：<br>
em.events 返回页面所有事件对象（包含target,type,callbacks）<br>
方法：<br>
/*<br>
@ o dom元素<br>
@ type 事件类型<br>
@ cbs 回调函数（可为函数或函数数组）<br>
*/<br>
em.add(o,type,cbs)  添加事件<br>
em.remove(o,type)  删除事件<br>
em.fire(o,type)  立即触发事件<br>
em.getEvents(o)  获取o元素上所有绑定的事件对象<br>
