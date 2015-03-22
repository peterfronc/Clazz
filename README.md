# Clazz

Clazz is a minimum to define class or namespace in Javascript.

Grab the build/Clazz.js and you're ready to go!

## Examples

```javascript

    function OldClass () {
      //...
    }
    
    function NewClass () {
      //...
    }
    
    //define NewClass in my.awesome.package.NewClass, it will also inherit from OldClass
    clazz("my.awesome.package.NewClass", NewClass, OldClass);

```

Another one:

```javascript
  
    var BigObject = {
      someProp: {}
    };
    
    namespace("my.awesome.package.BigObject", BigObject);

```

Class object receive PACKAGE_NAME and CLASS_NAME on prototypes, also constructor/object receives PACKAGE_NAME (same as prototype).
