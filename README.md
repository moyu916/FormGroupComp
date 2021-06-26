## 封装FromGroup组件，解决大规模Form可读性差的问题(逻辑关注点分离)

B端系统有些对表单的使用非常之多，而且一张表单可能会放很多表单项。随着业务的迭代，不断地往一个Form中添加FormItem，造成一个Form表单会有大几百行甚至上千行代码，非常不容易阅读

针对上述问题，本仓库使用antd+ts+react封装了FormGroup组件，并给了两个文件QueryForm.tsx和Edit.tsx用以简单示例FormGroup怎么使用

**ps: 这个组件原本是本人在实习的时候用公司内部组件库封装的，内部组件库Form使用方式跟andt4挺不一样，我也没用过antd4，所以就简单改了改，给个思路**



往GroupForm里传config的时候，config的定义可以根据不同功能的FormItem表单块写不同的config，再用{...config1, ...config2, ...}的方式传入，解决了逻辑关注点分离的问题