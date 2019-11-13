
## 小程序页面间通信


当我们从PageA新开PageB后，做一些操作，再回退到PageA的时候，这个数据要刷新。很显然，这需要在PageB中做操作时，能通知到PageA,以便PageA做相应的联动变化。

这里的通知，专业点说就是页面通信。所谓通信，认为要满足下面两个条件：

- 激活对方的一个方法调用
- 能够向被激活的方法传递数据


### 分类

1. 延迟激活，即我在PageB做完操作，等返回到PageA再激活PageA的方法调用

- GobolData   
1) getApp    
2) var 
- localStorage


2. 立即激活，即我在PageB做完操作，在PageB激活PageA的方法调用

- Notifacation
- KVO
- Redux

3. Other

- getCurrentPages()
...
