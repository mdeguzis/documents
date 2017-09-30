# Representing null

```
var json1 = '{}';
var json2 = '{"myCount": null}';
var json3 = '{"myCount": 0}';
var json4 = '{"myString": ""}';
var json5 = '{"myString": "null"}';
var json6 = '{"myArray": []}';

console.log(JSON.parse(json1)); // {}
console.log(JSON.parse(json2)); // {myCount: null}
console.log(JSON.parse(json3)); // {myCount: 0}
console.log(JSON.parse(json4)); // {myString: ""}
console.log(JSON.parse(json5)); // {myString: "null"}
console.log(JSON.parse(json6)); // {myArray: []}
```

JSON2 is way the [JSON spec](http://www.json.org/) indicates null should be represented. But as always, it depends on what you're doing -- sometimes the "right" way to do it doesn't always work for your situation. Use your judgement and make an informed decision.

**JSON1 {}**

This returns an empty object. There is no data there, and it's only going to tell you that whatever key you're looking for (be it myCount or something else) is of type undefined.

**JSON2 {"myCount": null}**

In this case, myCount is actually defined, albeit its value is null. This is not the same as both "not undefined and not null", and if you were testing for one condition or the other, this might succeed whereas JSON1 would fail.

This is the definitive way to represent null per the JSON spec.

**JSON3 {"myCount": 0}**

In this case, myCount is 0. That's not the same as null, and it's not the same as false. If your conditional statement evaluates myCount > 0, then this might be worthwhile to have. Moreover, if you're running calculations based on the value here, 0 could be useful. If you're trying to test for null however, this is actually not going to work at all.

**JSON4 {"myString": ""}**

In this case, you're getting an empty string. Again, as with JSON2, it's defined, but it's empty. You could test for if (obj.myString == "") but you could not test for null or undefined.

**JSON5 {"myString": "null"}**

This is probably going to get you in trouble, because you're setting the string value to null; in this case,  obj.myString == "null" however it is not == null.

**JSON6 {"myArray": []}**

This will tell you that your array myArray exists, but it's empty. This is useful if you're trying to perform a count or evaluation on myArray. For instance, say you wanted to evaluate the number of photos a user posted - you could do myArray.length and it would return 0: defined, but no photos posted.

Source: [stackoverflow]( https://stackoverflow.com/questions/21120999/representing-null-in-json)
