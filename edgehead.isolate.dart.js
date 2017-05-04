(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(b7){if(a2[b7])return
a2[b7]=true
var a5=a4.pending[b7]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[b7].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[b7]
var b5=b4.prototype
b5.constructor=b4
b5.$isd=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[b7]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(b5.$isaE)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="v"){processStatics(init.statics[b1]=b2.v,b3)
delete b2.v}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dP"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dP"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dP(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aO=function(){}
var dart=[["","",,H,{"^":"",q1:{"^":"d;a"}}],["","",,J,{"^":"",
p:function(a){return void 0},
aE:{"^":"d;",
A:function(a,b){return a===b},
gB:function(a){return H.a1(a)},
j:function(a){return H.ct(a)},
gb7:function(a){return new H.af(H.h6(a),null)}},
em:{"^":"aE;",
j:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gb7:function(a){return C.a3},
$isX:1},
eo:{"^":"aE;",
A:function(a,b){return null==b},
j:function(a){return"null"},
gB:function(a){return 0},
gb7:function(a){return C.a1}},
es:{"^":"aE;",
gB:function(a){return 0},
gb7:function(a){return C.a0},
j:function(a){return String(a)},
$isep:1},
q5:{"^":"es;"},
b9:{"^":"es;"},
bM:{"^":"aE;$ti",
f7:function(a,b){if(!!a.immutable$list)throw H.c(new P.P(b))},
cS:function(a,b){if(!!a.fixed$length)throw H.c(new P.P(b))},
p:function(a,b){this.cS(a,"add")
a.push(b)},
bY:function(a){this.cS(a,"removeLast")
if(a.length===0)throw H.c(H.ap(a,-1))
return a.pop()},
i1:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sk(a,v)
for(x=0;x<z.length;++x)this.l(a,x,z[x])},
bB:function(a,b){return new H.K(a,b,[H.j(a,0)])},
ag:function(a,b){var z
this.cS(a,"addAll")
for(z=J.ab(b);z.w();)a.push(z.d)},
I:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aL:function(a,b){return new H.am(a,b,[null,null])},
dg:function(a,b){return H.f7(a,b,null,H.j(a,0))},
aU:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bf:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a7())},
ff:function(a,b){return this.bf(a,b,null)},
aa:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gfe:function(a){if(a.length>0)return a[0]
throw H.c(H.a7())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a7())},
gbJ:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a7())
throw H.c(H.d4())},
aC:function(a,b,c,d,e){var z,y,x
this.f7(a,"set range")
P.cv(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.i(P.W(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.el())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bQ:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cF:function(a,b){var z
this.f7(a,"sort")
z=b==null?P.p2():b
H.bU(a,0,a.length-1,z)},
er:function(a){return this.cF(a,null)},
e0:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
bg:function(a,b){return this.e0(a,b,0)},
Y:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gH:function(a){return a.length===0},
ga5:function(a){return a.length!==0},
j:function(a){return P.b0(a,"[","]")},
bj:function(a){return P.aS(a,H.j(a,0))},
gZ:function(a){return new J.bJ(a,a.length,0,null,[H.j(a,0)])},
gB:function(a){return H.a1(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cS(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.ca(b,"newLength",null))
if(b<0)throw H.c(P.W(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ap(a,b))
if(b>=a.length||b<0)throw H.c(H.ap(a,b))
return a[b]},
l:function(a,b,c){if(!!a.immutable$list)H.i(new P.P("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ap(a,b))
if(b>=a.length||b<0)throw H.c(H.ap(a,b))
a[b]=c},
$iscp:1,
$ascp:I.aO,
$isI:1,
$isU:1},
q0:{"^":"bM;$ti"},
bJ:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
w:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ak(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bN:{"^":"aE;",
be:function(a,b){var z
if(typeof b!=="number")throw H.c(H.R(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbS(b)
if(this.gbS(a)===z)return 0
if(this.gbS(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbS:function(a){return a===0?1/a<0:a<0},
ee:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.P(""+a+".round()"))},
ct:function(a,b){var z
if(b>20)throw H.c(P.W(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbS(a))return"-"+z
return z},
jP:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.W(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cf(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.i(new P.P("Unexpected toString result: "+z))
x=J.J(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.bH("0",w)},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
en:function(a){return-a},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a+b},
aP:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a-b},
d7:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a/b},
bH:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a*b},
bo:function(a,b){return(a|0)===a?a/b|0:this.ia(a,b)},
ia:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.P("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cP:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
au:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a<b},
bF:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a>b},
bG:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a<=b},
bC:function(a,b){if(typeof b!=="number")throw H.c(H.R(b))
return a>=b},
gb7:function(a){return C.a6},
$isL:1},
en:{"^":"bN;",
gb7:function(a){return C.a5},
$isaB:1,
$isL:1,
$isv:1},
jv:{"^":"bN;",
gb7:function(a){return C.a4},
$isaB:1,
$isL:1},
bO:{"^":"aE;",
cf:function(a,b){if(b<0)throw H.c(H.ap(a,b))
if(b>=a.length)H.i(H.ap(a,b))
return a.charCodeAt(b)},
c3:function(a,b){if(b>=a.length)throw H.c(H.ap(a,b))
return a.charCodeAt(b)},
dR:function(a,b,c){if(c>b.length)throw H.c(P.W(c,0,b.length,null,null))
return new H.o6(b,a,c)},
dQ:function(a,b){return this.dR(a,b,0)},
fo:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.W(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cf(b,c+y)!==this.c3(a,y))return
return new H.f6(c,b,a)},
a4:function(a,b){if(typeof b!=="string")throw H.c(P.ca(b,null,null))
return a+b},
dW:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bm(a,y-z)},
jE:function(a,b,c){H.bh(c)
return H.q(a,b,c)},
jF:function(a,b,c,d){H.bh(c)
P.ky(d,0,a.length,"startIndex",null)
return H.bI(a,b,c,d)},
d0:function(a,b,c){return this.jF(a,b,c,0)},
hb:function(a,b,c){var z
if(c>a.length)throw H.c(P.W(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.ht(b,a,c)!=null},
dh:function(a,b){return this.hb(a,b,0)},
ax:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.i(H.R(c))
if(b<0)throw H.c(P.bR(b,null,null))
if(typeof c!=="number")return H.D(c)
if(b>c)throw H.c(P.bR(b,null,null))
if(c>a.length)throw H.c(P.bR(c,null,null))
return a.substring(b,c)},
bm:function(a,b){return this.ax(a,b,null)},
fN:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.c3(z,0)===133){x=J.d5(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cf(z,w)===133?J.jw(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jQ:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.c3(z,0)===133?J.d5(z,1):0}else{y=J.d5(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bH:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.F)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e0:function(a,b,c){if(c>a.length)throw H.c(P.W(c,0,a.length,null,null))
return a.indexOf(b,c)},
bg:function(a,b){return this.e0(a,b,0)},
jl:function(a,b,c){var z,y
c=a.length
z=b.length
y=a.length
if(c+z>y)c=y-z
return a.lastIndexOf(b,c)},
jk:function(a,b){return this.jl(a,b,null)},
iz:function(a,b,c){if(b==null)H.i(H.R(b))
if(c>a.length)throw H.c(P.W(c,0,a.length,null,null))
return H.pJ(a,b,c)},
Y:function(a,b){return this.iz(a,b,0)},
gH:function(a){return a.length===0},
ga5:function(a){return a.length!==0},
be:function(a,b){var z
if(typeof b!=="string")throw H.c(H.R(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
j:function(a){return a},
gB:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gb7:function(a){return C.a2},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ap(a,b))
if(b>=a.length||b<0)throw H.c(H.ap(a,b))
return a[b]},
$iscp:1,
$ascp:I.aO,
$ism:1,
$isdh:1,
v:{
eq:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
d5:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.c3(a,b)
if(y!==32&&y!==13&&!J.eq(y))break;++b}return b},
jw:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cf(a,z)
if(y!==32&&y!==13&&!J.eq(y))break}return b}}}}],["","",,H,{"^":"",
a7:function(){return new P.F("No element")},
d4:function(){return new P.F("Too many elements")},
el:function(){return new P.F("Too few elements")},
bU:function(a,b,c,d){if(c-b<=32)H.eX(a,b,c,d)
else H.eW(a,b,c,d)},
eX:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a0(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
eW:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bo(c-b+1,6)
y=b+z
x=c-z
w=C.d.bo(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a0(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a0(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a0(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a0(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a0(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a0(d.$2(p,o),0)){n=o
o=p
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
t.l(a,v,t.h(a,b))
t.l(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.f(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.p(i)
if(h.A(i,0))continue
if(h.au(i,0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.aa(i)
if(h.bF(i,0)){--l
continue}else{g=l-1
if(h.au(i,0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
l=g
m=f
break}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.c6(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.a0(d.$2(j,p),0))for(;!0;)if(J.a0(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c6(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}e=!1}h=m-1
t.l(a,b,t.h(a,h))
t.l(a,h,r)
h=l+1
t.l(a,c,t.h(a,h))
t.l(a,h,p)
H.bU(a,b,m-2,d)
H.bU(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.f(d.$2(t.h(a,m),r),0);)++m
for(;J.f(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.f(d.$2(j,r),0)){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(J.f(d.$2(j,p),0))for(;!0;)if(J.f(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.c6(d.$2(t.h(a,l),r),0)){t.l(a,k,t.h(a,m))
f=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=f}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=g
break}}H.bU(a,m,l,d)}else H.bU(a,m,l,d)},
U:{"^":"x;$ti"},
aH:{"^":"U;$ti",
gZ:function(a){return new H.d9(this,this.gk(this),0,null,[H.w(this,"aH",0)])},
I:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.aa(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gH:function(a){return this.gk(this)===0},
gE:function(a){if(this.gk(this)===0)throw H.c(H.a7())
return this.aa(0,this.gk(this)-1)},
Y:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.f(this.aa(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.aa(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
cW:function(a,b){var z,y,x,w
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.aa(0,0))
if(z!==this.gk(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.aa(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.aa(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bB:function(a,b){return this.ew(0,b)},
aL:function(a,b){return new H.am(this,b,[H.w(this,"aH",0),null])},
aU:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.aa(0,x))
if(z!==this.gk(this))throw H.c(new P.B(this))}return y},
bi:function(a,b){var z,y,x,w
z=[H.w(this,"aH",0)]
if(b){y=H.t([],z)
C.a.sk(y,this.gk(this))}else{x=new Array(this.gk(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gk(this);++w){z=this.aa(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
c_:function(a){return this.bi(a,!0)},
bj:function(a){var z,y
z=P.H(null,null,null,H.w(this,"aH",0))
for(y=0;y<this.gk(this);++y)z.p(0,this.aa(0,y))
return z}},
me:{"^":"aH;a,b,c,$ti",
ghC:function(){var z=J.au(this.a)
return z},
gi8:function(){var z,y
z=J.au(this.a)
y=this.b
if(y>z)return z
return y},
gk:function(a){var z,y
z=J.au(this.a)
y=this.b
if(y>=z)return 0
return z-y},
aa:function(a,b){var z,y
z=this.gi8()+b
if(!(b<0)){y=this.ghC()
if(typeof y!=="number")return H.D(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cl(b,this,"index",null,null))
return J.dZ(this.a,z)},
bi:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gk(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.t([],u)
C.a.sk(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.t(s,u)}for(r=0;r<v;++r){u=x.aa(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gk(y)<w)throw H.c(new P.B(this))}return t},
hk:function(a,b,c,d){var z=this.b
if(z<0)H.i(P.W(z,0,null,"start",null))},
v:{
f7:function(a,b,c,d){var z=new H.me(a,b,c,[d])
z.hk(a,b,c,d)
return z}}},
d9:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
w:function(){var z,y,x
z=this.a
y=z.gk(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.aa(0,x);++this.c
return!0}},
cq:{"^":"x;a,b,$ti",
gZ:function(a){return new H.jO(null,J.ab(this.a),this.b,this.$ti)},
gk:function(a){return J.au(this.a)},
gH:function(a){return J.e_(this.a)},
gE:function(a){return this.b.$1(J.hq(this.a))},
$asx:function(a,b){return[b]},
v:{
br:function(a,b,c,d){if(!!J.p(a).$isU)return new H.bo(a,b,[c,d])
return new H.cq(a,b,[c,d])}}},
bo:{"^":"cq;a,b,$ti",$isU:1,
$asU:function(a,b){return[b]}},
jO:{"^":"co;a,b,c,$ti",
w:function(){var z=this.b
if(z.w()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$asco:function(a,b){return[b]}},
am:{"^":"aH;a,b,$ti",
gk:function(a){return J.au(this.a)},
aa:function(a,b){return this.b.$1(J.dZ(this.a,b))},
$asaH:function(a,b){return[b]},
$asU:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
K:{"^":"x;a,b,$ti",
gZ:function(a){return new H.fv(J.ab(this.a),this.b,this.$ti)},
aL:function(a,b){return new H.cq(this,b,[H.j(this,0),null])}},
fv:{"^":"co;a,b,$ti",
w:function(){var z,y
for(z=this.a,y=this.b;z.w();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
eP:{"^":"x;a,b,$ti",
gZ:function(a){return new H.ll(J.ab(this.a),this.b,this.$ti)},
ex:function(a,b,c){},
v:{
lk:function(a,b,c){var z
if(!!J.p(a).$isU){z=new H.j_(a,b,[c])
z.ex(a,b,c)
return z}return H.lj(a,b,c)},
lj:function(a,b,c){var z=new H.eP(a,b,[c])
z.ex(a,b,c)
return z}}},
j_:{"^":"eP;a,b,$ti",
gk:function(a){var z=J.au(this.a)-this.b
if(z>=0)return z
return 0},
$isU:1},
ll:{"^":"co;a,b,$ti",
w:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.w()
this.b=0
return z.w()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
c_:function(a,b){var z=a.ci(b)
if(!init.globalState.d.cy)init.globalState.f.b6()
return z},
hj:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isI)throw H.c(P.z("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.nT(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$ej()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.ns(P.aU(null,H.bX),0)
x=P.v
y.z=new H.O(0,null,null,null,null,null,0,[x,H.dG])
y.ch=new H.O(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.nS()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.jn,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.nU)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.O(0,null,null,null,null,null,0,[x,H.bS])
x=P.H(null,null,null,x)
v=new H.bS(0,null,!1)
u=new H.dG(y,w,x,init.createNewIsolate(),v,new H.aZ(H.cR()),new H.aZ(H.cR()),!1,!1,[],P.H(null,null,null,null),null,null,!1,!0,P.H(null,null,null,null))
x.p(0,0)
u.dk(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.aq(a,{func:1,args:[,]}))u.ci(new H.pB(z,a))
else if(H.aq(a,{func:1,args:[,,]}))u.ci(new H.pC(z,a))
else u.ci(a)
init.globalState.f.b6()},
jr:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.js()
return},
js:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.P("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.P('Cannot extract URI from "'+H.b(z)+'"'))},
jn:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cG(!0,[]).bt(b.data)
y=J.J(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cG(!0,[]).bt(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cG(!0,[]).bt(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.v
p=new H.O(0,null,null,null,null,null,0,[q,H.bS])
q=P.H(null,null,null,q)
o=new H.bS(0,null,!1)
n=new H.dG(y,p,q,init.createNewIsolate(),o,new H.aZ(H.cR()),new H.aZ(H.cR()),!1,!1,[],P.H(null,null,null,null),null,null,!1,!0,P.H(null,null,null,null))
q.p(0,0)
n.dk(0,o)
init.globalState.f.a.al(new H.bX(n,new H.jo(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b6()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").D(y.h(z,"msg"))
init.globalState.f.b6()
break
case"close":init.globalState.ch.aM(0,$.$get$ek().h(0,a))
a.terminate()
init.globalState.f.b6()
break
case"log":H.jm(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a8(["command","print","msg",z])
q=new H.bc(!0,P.bD(null,P.v)).aY(q)
y.toString
self.postMessage(q)}else P.dW(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
jm:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a8(["command","log","msg",a])
x=new H.bc(!0,P.bD(null,P.v)).aY(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.y(w)
z=H.A(w)
throw H.c(P.cj(z))}},
jp:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eE=$.eE+("_"+y)
$.eF=$.eF+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.bZ(y,x),w,z.r])
x=new H.jq(a,b,c,d,z)
if(e===!0){z.f4(w,w)
init.globalState.f.a.al(new H.bX(z,x,"start isolate"))}else x.$0()},
on:function(a){return new H.cG(!0,[]).bt(new H.bc(!1,P.bD(null,P.v)).aY(a))},
pB:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
pC:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
nT:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
nU:function(a){var z=P.a8(["command","print","msg",a])
return new H.bc(!0,P.bD(null,P.v)).aY(z)}}},
dG:{"^":"d;m:a<,b,c,ji:d<,iB:e<,f,r,x,cl:y<,z,Q,ch,cx,cy,db,dx",
f4:function(a,b){if(!this.f.A(0,a))return
if(this.Q.p(0,b)&&!this.y)this.y=!0
this.ce()},
jD:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aM(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.f3(x)}this.y=!1}this.ce()},
ir:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jB:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.i(new P.P("removeRange"))
P.cv(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
h4:function(a,b){if(!this.r.A(0,a))return
this.db=b},
iX:function(a,b,c){var z=J.p(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.aU(null,null)
this.cx=z}z.al(new H.nJ(a,c))},
iW:function(a,b){var z
if(!this.r.A(0,a))return
z=J.p(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){this.e5()
return}z=this.cx
if(z==null){z=P.aU(null,null)
this.cx=z}z.al(this.gjj())},
iY:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.dW(a)
if(b!=null)P.dW(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.h(a)
y[1]=b==null?null:J.h(b)
for(x=new P.ag(z,z.r,null,null,[null]),x.c=z.e;x.w();)x.d.D(y)},
ci:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.y(u)
w=t
v=H.A(u)
this.iY(w,v)
if(this.db===!0){this.e5()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gji()
if(this.cx!=null)for(;t=this.cx,!t.gH(t);)this.cx.d_().$0()}return y},
bV:function(a){return this.b.h(0,a)},
dk:function(a,b){var z=this.b
if(z.W(a))throw H.c(P.cj("Registry: ports must be registered only once."))
z.l(0,a,b)},
ce:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.e5()},
e5:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aJ(0)
for(z=this.b,y=z.gc0(),y=y.gZ(y);y.w();)y.gF().hx()
z.aJ(0)
this.c.aJ(0)
init.globalState.z.aM(0,this.a)
this.dx.aJ(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.D(z[v])}this.ch=null}},"$0","gjj",0,0,3]},
nJ:{"^":"a:3;a,b",
$0:function(){this.a.D(this.b)}},
ns:{"^":"d;a,b",
iG:function(){var z=this.a
if(z.b===z.c)return
return z.d_()},
fK:function(){var z,y,x
z=this.iG()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.W(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gH(y)}else y=!1
else y=!1
else y=!1
if(y)H.i(P.cj("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gH(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a8(["command","close"])
x=new H.bc(!0,new P.fE(0,null,null,null,null,null,0,[null,P.v])).aY(x)
y.toString
self.postMessage(x)}return!1}z.jA()
return!0},
eX:function(){if(self.window!=null)new H.nt(this).$0()
else for(;this.fK(););},
b6:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eX()
else try{this.eX()}catch(x){w=H.y(x)
z=w
y=H.A(x)
w=init.globalState.Q
v=P.a8(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bc(!0,P.bD(null,P.v)).aY(v)
w.toString
self.postMessage(v)}}},
nt:{"^":"a:3;a",
$0:function(){if(!this.a.fK())return
P.mF(C.x,this)}},
bX:{"^":"d;a,b,c",
jA:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ci(this.b)}},
nS:{"^":"d;"},
jo:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.jp(this.a,this.b,this.c,this.d,this.e,this.f)}},
jq:{"^":"a:3;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.aq(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.aq(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.ce()}},
fy:{"^":"d;"},
bZ:{"^":"fy;b,a",
D:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.geN())return
x=H.on(a)
if(z.giB()===y){y=J.J(x)
switch(y.h(x,0)){case"pause":z.f4(y.h(x,1),y.h(x,2))
break
case"resume":z.jD(y.h(x,1))
break
case"add-ondone":z.ir(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.jB(y.h(x,1))
break
case"set-errors-fatal":z.h4(y.h(x,1),y.h(x,2))
break
case"ping":z.iX(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.iW(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.p(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aM(0,y)
break}return}init.globalState.f.a.al(new H.bX(z,new H.nW(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.bZ&&J.f(this.b,b.b)},
gB:function(a){return this.b.gdB()}},
nW:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.geN())z.hp(this.b)}},
dI:{"^":"fy;b,c,a",
D:function(a){var z,y,x
z=P.a8(["command","message","port",this,"msg",a])
y=new H.bc(!0,P.bD(null,P.v)).aY(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.dI&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.eo()
y=this.a
if(typeof y!=="number")return y.eo()
x=this.c
if(typeof x!=="number")return H.D(x)
return(z<<16^y<<8^x)>>>0}},
bS:{"^":"d;dB:a<,b,eN:c<",
hx:function(){this.c=!0
this.b=null},
b0:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aM(0,y)
z.c.aM(0,y)
z.ce()},
hp:function(a){if(this.c)return
this.b.$1(a)},
$iskz:1},
kA:{"^":"a4;a,b",
an:function(a,b,c,d){var z=this.b
z.toString
return new P.cF(z,[H.j(z,0)]).an(a,b,c,d)},
e8:function(a,b,c){return this.an(a,null,b,c)},
b0:[function(){this.a.b0()
this.b.b0()},"$0","gix",0,0,3],
hi:function(a){var z=new P.oa(null,0,null,null,null,null,this.gix(),[null])
this.b=z
this.a.b=z.gii(z)},
$asa4:I.aO},
mB:{"^":"d;a,b,c",
hl:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.al(new H.bX(y,new H.mD(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cM(new H.mE(this,b),0),a)}else throw H.c(new P.P("Timer greater than 0."))},
v:{
mC:function(a,b){var z=new H.mB(!0,!1,null)
z.hl(a,b)
return z}}},
mD:{"^":"a:3;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
mE:{"^":"a:3;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aZ:{"^":"d;dB:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.jY()
z=C.i.cP(z,0)^C.i.bo(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aZ){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bc:{"^":"d;a,b",
aY:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gk(z))
z=J.p(a)
if(!!z.$iscp)return this.h0(a)
if(!!z.$isjk){x=this.gfY()
z=a.gbT()
z=H.br(z,x,H.w(z,"x",0),null)
z=P.V(z,!0,H.w(z,"x",0))
w=a.gc0()
w=H.br(w,x,H.w(w,"x",0),null)
return["map",z,P.V(w,!0,H.w(w,"x",0))]}if(!!z.$isep)return this.h1(a)
if(!!z.$isaE)this.fO(a)
if(!!z.$iskz)this.cu(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbZ)return this.h2(a)
if(!!z.$isdI)return this.h3(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cu(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaZ)return["capability",a.a]
if(!(a instanceof P.d))this.fO(a)
return["dart",init.classIdExtractor(a),this.h_(init.classFieldsExtractor(a))]},"$1","gfY",2,0,0],
cu:function(a,b){throw H.c(new P.P(H.b(b==null?"Can't transmit:":b)+" "+H.b(a)))},
fO:function(a){return this.cu(a,null)},
h0:function(a){var z=this.fZ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cu(a,"Can't serialize indexable: ")},
fZ:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aY(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
h_:function(a){var z
for(z=0;z<a.length;++z)C.a.l(a,z,this.aY(a[z]))
return a},
h1:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cu(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aY(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
h3:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
h2:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdB()]
return["raw sendport",a]}},
cG:{"^":"d;a,b",
bt:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.z("Bad serialized message: "+H.b(a)))
switch(C.a.gfe(a)){case"ref":if(1>=a.length)return H.e(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.e(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.cg(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.cg(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cg(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.cg(x),[null])
y.fixed$length=Array
return y
case"map":return this.iJ(a)
case"sendport":return this.iK(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iI(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.aZ(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cg(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","giH",2,0,0],
cg:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.D(x)
if(!(y<x))break
z.l(a,y,this.bt(z.h(a,y)));++y}return a},
iJ:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aG()
this.b.push(w)
y=J.e0(y,this.giH()).c_(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.e(y,u)
w.l(0,y[u],this.bt(v.h(x,u)))}return w},
iK:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bV(w)
if(u==null)return
t=new H.bZ(u,x)}else t=new H.dI(y,w,x)
this.b.push(t)
return t},
iI:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.D(t)
if(!(u<t))break
w[z.h(y,u)]=this.bt(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
im:function(){throw H.c(new P.P("Cannot modify unmodifiable Map"))},
pd:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.h(a)
if(typeof z!=="string")throw H.c(H.R(a))
return z},
a1:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bu:function(a){var z,y,x,w,v,u,t,s
z=J.p(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.H||!!J.p(a).$isb9){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.c3(w,0)===36)w=C.b.bm(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cO(H.c3(a),0,null),init.mangledGlobalNames)},
ct:function(a){return"Instance of '"+H.bu(a)+"'"},
a9:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.cP(z,10))>>>0,56320|z&1023)}throw H.c(P.W(a,0,1114111,null,null))},
b3:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dk:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.R(a))
return a[b]},
eG:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.R(a))
a[b]=c},
D:function(a){throw H.c(H.R(a))},
e:function(a,b){if(a==null)J.au(a)
throw H.c(H.ap(a,b))},
ap:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aQ(!0,b,"index",null)
z=J.au(a)
if(!(b<0)){if(typeof z!=="number")return H.D(z)
y=b>=z}else y=!0
if(y)return P.cl(b,a,"index",null,z)
return P.bR(b,"index",null)},
R:function(a){return new P.aQ(!0,a,null,null)},
bh:function(a){if(typeof a!=="string")throw H.c(H.R(a))
return a},
c:function(a){var z
if(a==null)a=new P.cr()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hm})
z.name=""}else z.toString=H.hm
return z},
hm:function(){return J.h(this.dartException)},
i:function(a){throw H.c(a)},
ak:function(a){throw H.c(new P.B(a))},
y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.pQ(a)
if(a==null)return
if(a instanceof H.d0)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.cP(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d7(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.ez(v,null))}}if(a instanceof TypeError){u=$.$get$fg()
t=$.$get$fh()
s=$.$get$fi()
r=$.$get$fj()
q=$.$get$fn()
p=$.$get$fo()
o=$.$get$fl()
$.$get$fk()
n=$.$get$fq()
m=$.$get$fp()
l=u.b4(y)
if(l!=null)return z.$1(H.d7(y,l))
else{l=t.b4(y)
if(l!=null){l.method="call"
return z.$1(H.d7(y,l))}else{l=s.b4(y)
if(l==null){l=r.b4(y)
if(l==null){l=q.b4(y)
if(l==null){l=p.b4(y)
if(l==null){l=o.b4(y)
if(l==null){l=r.b4(y)
if(l==null){l=n.b4(y)
if(l==null){l=m.b4(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.ez(y,l==null?null:l.method))}}return z.$1(new H.mJ(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.eY()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aQ(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.eY()
return a},
A:function(a){var z
if(a instanceof H.d0)return a.b
if(a==null)return new H.fH(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fH(a,null)},
pp:function(a){if(a==null||typeof a!='object')return J.l(a)
else return H.a1(a)},
p8:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
pf:function(a,b,c,d,e,f,g){switch(c){case 0:return H.c_(b,new H.pg(a))
case 1:return H.c_(b,new H.ph(a,d))
case 2:return H.c_(b,new H.pi(a,d,e))
case 3:return H.c_(b,new H.pj(a,d,e,f))
case 4:return H.c_(b,new H.pk(a,d,e,f,g))}throw H.c(P.cj("Unsupported number of arguments for wrapped closure"))},
cM:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.pf)
a.$identity=z
return z},
ii:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isI){z.$reflectionInfo=c
x=H.kC(z).r}else x=c
w=d?Object.create(new H.lM().constructor.prototype):Object.create(new H.cU(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.av
$.av=J.a_(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.e7(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.pd,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.e4:H.cV
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.e7(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ie:function(a,b,c,d){var z=H.cV
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
e7:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ih(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ie(y,!w,z,b)
if(y===0){w=$.av
$.av=J.a_(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bn
if(v==null){v=H.cd("self")
$.bn=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.av
$.av=J.a_(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bn
if(v==null){v=H.cd("self")
$.bn=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
ig:function(a,b,c,d){var z,y
z=H.cV
y=H.e4
switch(b?-1:a){case 0:throw H.c(new H.kO("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ih:function(a,b){var z,y,x,w,v,u,t,s
z=H.i7()
y=$.e3
if(y==null){y=H.cd("receiver")
$.e3=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ig(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.av
$.av=J.a_(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.av
$.av=J.a_(u,1)
return new Function(y+H.b(u)+"}")()},
dP:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isI){c.fixed$length=Array
z=c}else z=c
return H.ii(a,b,z,!!d,e,f)},
pv:function(a,b){var z=J.J(b)
throw H.c(H.cf(H.bu(a),z.ax(b,3,z.gk(b))))},
aj:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.p(a)[b]
else z=!0
if(z)return a
H.pv(a,b)},
dS:function(a){var z=J.p(a)
return"$signature" in z?z.$signature():null},
aq:function(a,b){var z
if(a==null)return!1
z=H.dS(a)
return z==null?!1:H.dV(z,b)},
h1:function(a,b){var z,y
if(a==null)return a
if(H.aq(a,b))return a
z=H.S(b,null)
y=H.dS(a)
throw H.c(H.cf(y!=null?H.S(y,null):H.bu(a),z))},
pO:function(a){throw H.c(new P.iz(a))},
cR:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
aY:function(a){return new H.af(a,null)},
t:function(a,b){a.$ti=b
return a},
c3:function(a){if(a==null)return
return a.$ti},
h5:function(a,b){return H.dX(a["$as"+H.b(b)],H.c3(a))},
w:function(a,b,c){var z=H.h5(a,b)
return z==null?null:z[c]},
j:function(a,b){var z=H.c3(a)
return z==null?null:z[b]},
S:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cO(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.S(z,b)
return H.os(a,b)}return"unknown-reified-type"},
os:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.S(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.S(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.S(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.p7(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.S(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
cO:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bA("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.u=v+", "
u=a[y]
if(u!=null)w=!1
v=z.u+=H.S(u,c)}return w?"":"<"+z.j(0)+">"},
h6:function(a){var z,y
if(a instanceof H.a){z=H.dS(a)
if(z!=null)return H.S(z,null)}y=J.p(a).constructor.builtin$cls
if(a==null)return y
return y+H.cO(a.$ti,0,null)},
dX:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aA:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.c3(a)
y=J.p(a)
if(y[b]==null)return!1
return H.fX(H.dX(y[d],z),c)},
aC:function(a,b,c,d){if(a==null)return a
if(H.aA(a,b,c,d))return a
throw H.c(H.cf(H.bu(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cO(c,0,null),init.mangledGlobalNames)))},
fX:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a5(a[y],b[y]))return!1
return!0},
aX:function(a,b,c){return a.apply(b,H.h5(b,c))},
cL:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="aV"
if(b==null)return!0
z=H.c3(a)
a=J.p(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$signature
if(x==null)return!1
return H.dV(x.apply(a,null),b)}return H.a5(y,b)},
hk:function(a,b){if(a!=null&&!H.cL(a,b))throw H.c(H.cf(H.bu(a),H.S(b,null)))
return a},
a5:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="aV")return!0
if('func' in b)return H.dV(a,b)
if('func' in a)return b.builtin$cls==="bq"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.S(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.fX(H.dX(u,z),x)},
fW:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a5(z,v)||H.a5(v,z)))return!1}return!0},
oD:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a5(v,u)||H.a5(u,v)))return!1}return!0},
dV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a5(z,y)||H.a5(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fW(x,w,!1))return!1
if(!H.fW(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}}return H.oD(a.named,b.named)},
pJ:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.p(b)
if(!!z.$iser){z=C.b.bm(a,c)
return b.b.test(z)}else{z=z.dQ(b,C.b.bm(a,c))
return!z.gH(z)}}},
q:function(a,b,c){var z,y,x
H.bh(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
qr:[function(a){return a},"$1","ou",2,0,37],
pK:function(a,b,c,d){var z,y,x,w,v,u
d=H.ou()
z=J.p(b)
if(!z.$isdh)throw H.c(P.ca(b,"pattern","is not a Pattern"))
for(z=z.dQ(b,a),z=new H.fw(z.a,z.b,z.c,null),y=0,x="";z.w();){w=z.d
v=w.b
u=v.index
x=x+H.b(d.$1(C.b.ax(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(d.$1(C.b.bm(a,y)))
return z.charCodeAt(0)==0?z:z},
bI:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.pL(a,z,z+b.length,c)},
pL:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
il:{"^":"d;$ti",
gH:function(a){return this.gk(this)===0},
ga5:function(a){return this.gk(this)!==0},
j:function(a){return P.dc(this)},
l:function(a,b,c){return H.im()},
$isE:1},
io:{"^":"il;a,b,c,$ti",
gk:function(a){return this.a},
W:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.W(b))return
return this.eJ(b)},
eJ:function(a){return this.b[a]},
I:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eJ(w))}}},
kB:{"^":"d;a,b,c,d,e,f,r,x",v:{
kC:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.kB(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
mG:{"^":"d;a,b,c,d,e,f",
b4:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
v:{
az:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.mG(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cE:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fm:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
ez:{"^":"Y;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
jy:{"^":"Y;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
d7:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.jy(a,y,z?null:b.receiver)}}},
mJ:{"^":"Y;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
d0:{"^":"d;a,aZ:b<"},
pQ:{"^":"a:0;a",
$1:function(a){if(!!J.p(a).$isY)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fH:{"^":"d;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
pg:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
ph:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
pi:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
pj:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
pk:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
j:function(a){return"Closure '"+H.bu(this).trim()+"'"},
gfV:function(){return this},
$isbq:1,
gfV:function(){return this}},
fc:{"^":"a;"},
lM:{"^":"fc;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cU:{"^":"fc;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cU))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.a1(this.a)
else y=typeof z!=="object"?J.l(z):H.a1(z)
z=H.a1(this.b)
if(typeof y!=="number")return y.jZ()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.ct(z)},
v:{
cV:function(a){return a.a},
e4:function(a){return a.c},
i7:function(){var z=$.bn
if(z==null){z=H.cd("self")
$.bn=z}return z},
cd:function(a){var z,y,x,w,v
z=new H.cU("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ia:{"^":"Y;a",
j:function(a){return this.a},
v:{
cf:function(a,b){return new H.ia("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
kO:{"^":"Y;a",
j:function(a){return"RuntimeError: "+H.b(this.a)}},
af:{"^":"d;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.l(this.a)},
A:function(a,b){if(b==null)return!1
return b instanceof H.af&&J.f(this.a,b.a)}},
O:{"^":"d;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gH:function(a){return this.a===0},
ga5:function(a){return!this.gH(this)},
gbT:function(){return new H.jF(this,[H.j(this,0)])},
gc0:function(){return H.br(this.gbT(),new H.jx(this),H.j(this,0),H.j(this,1))},
W:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eF(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eF(y,a)}else return this.j8(a)},
j8:function(a){var z=this.d
if(z==null)return!1
return this.ck(this.cL(z,this.cj(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c6(z,b)
return y==null?null:y.gbw()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c6(x,b)
return y==null?null:y.gbw()}else return this.j9(b)},
j9:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cL(z,this.cj(a))
x=this.ck(y,a)
if(x<0)return
return y[x].gbw()},
l:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dD()
this.b=z}this.ez(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dD()
this.c=y}this.ez(y,b,c)}else this.jb(b,c)},
jb:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dD()
this.d=z}y=this.cj(a)
x=this.cL(z,y)
if(x==null)this.dN(z,y,[this.dE(a,b)])
else{w=this.ck(x,a)
if(w>=0)x[w].sbw(b)
else x.push(this.dE(a,b))}},
fD:function(a,b){var z
if(this.W(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
aM:function(a,b){if(typeof b==="string")return this.eW(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eW(this.c,b)
else return this.ja(b)},
ja:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cL(z,this.cj(a))
x=this.ck(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.f_(w)
return w.gbw()},
aJ:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
I:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
ez:function(a,b,c){var z=this.c6(a,b)
if(z==null)this.dN(a,b,this.dE(b,c))
else z.sbw(c)},
eW:function(a,b){var z
if(a==null)return
z=this.c6(a,b)
if(z==null)return
this.f_(z)
this.eG(a,b)
return z.gbw()},
dE:function(a,b){var z,y
z=new H.jE(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f_:function(a){var z,y
z=a.ghY()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cj:function(a){return J.l(a)&0x3ffffff},
ck:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gfk(),b))return y
return-1},
j:function(a){return P.dc(this)},
c6:function(a,b){return a[b]},
cL:function(a,b){return a[b]},
dN:function(a,b,c){a[b]=c},
eG:function(a,b){delete a[b]},
eF:function(a,b){return this.c6(a,b)!=null},
dD:function(){var z=Object.create(null)
this.dN(z,"<non-identifier-key>",z)
this.eG(z,"<non-identifier-key>")
return z},
$isjk:1,
$isE:1,
v:{
et:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])}}},
jx:{"^":"a:0;a",
$1:function(a){return this.a.h(0,a)}},
jE:{"^":"d;fk:a<,bw:b@,c,hY:d<,$ti"},
jF:{"^":"U;a,$ti",
gk:function(a){return this.a.a},
gH:function(a){return this.a.a===0},
gZ:function(a){var z,y
z=this.a
y=new H.jG(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Y:function(a,b){return this.a.W(b)},
I:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
jG:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
w:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
er:{"^":"d;a,b,c,d",
j:function(a){return"RegExp/"+this.a+"/"},
ghU:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.d6(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghT:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.d6(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dR:function(a,b,c){if(c>b.length)throw H.c(P.W(c,0,b.length,null,null))
return new H.n8(this,b,c)},
dQ:function(a,b){return this.dR(a,b,0)},
hE:function(a,b){var z,y
z=this.ghU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fG(this,y)},
hD:function(a,b){var z,y
z=this.ghT()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fG(this,y)},
fo:function(a,b,c){if(c>b.length)throw H.c(P.W(c,0,b.length,null,null))
return this.hD(b,c)},
$isdh:1,
v:{
d6:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eh("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fG:{"^":"d;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isb2:1},
n8:{"^":"cn;a,b,c",
gZ:function(a){return new H.fw(this.a,this.b,this.c,null)},
$ascn:function(){return[P.b2]},
$asx:function(){return[P.b2]}},
fw:{"^":"d;a,b,c,d",
gF:function(){return this.d},
w:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hE(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
f6:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.i(P.bR(b,null,null))
return this.c},
$isb2:1},
o6:{"^":"x;a,b,c",
gZ:function(a){return new H.o7(this.a,this.b,this.c,null)},
$asx:function(){return[P.b2]}},
o7:{"^":"d;a,b,c,d",
w:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.f6(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
p7:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
pu:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
n9:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.oE()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cM(new P.nb(z),1)).observe(y,{childList:true})
return new P.na(z,y,x)}else if(self.setImmediate!=null)return P.oF()
return P.oG()},
qk:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cM(new P.nc(a),0))},"$1","oE",2,0,9],
ql:[function(a){++init.globalState.f.b
self.setImmediate(H.cM(new P.nd(a),0))},"$1","oF",2,0,9],
qm:[function(a){P.dx(C.x,a)},"$1","oG",2,0,9],
u:function(a,b,c){if(b===0){c.bs(a)
return}else if(b===1){c.dV(H.y(a),H.A(a))
return}P.fI(a,b)
return c.gfh()},
fI:function(a,b){var z,y,x,w
z=new P.oh(b)
y=new P.oi(b)
x=J.p(a)
if(!!x.$isC)a.dO(z,y)
else if(!!x.$isN)a.eg(z,y)
else{w=new P.C(0,$.o,null,[null])
w.a=4
w.c=a
w.dO(z,null)}},
ai:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.o.toString
return new P.oC(z)},
cJ:function(a,b,c){var z,y,x
if(b===0){if(c.ge2())c.c.dU()
else c.a.b0()
return}else if(b===1){if(c.ge2())c.c.dV(H.y(a),H.A(a))
else{z=H.y(a)
y=H.A(a)
c.a.dP(z,y)
c.a.b0()}return}if(a instanceof P.bC){if(c.ge2()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aD(c.a,z)
P.c4(new P.of(b,c))
return}else if(z===1){x=a.a
c.a.it(x,!1).bz(new P.og(b,c))
return}}P.fI(a,b)},
oB:function(a){return a.gdi()},
dM:function(a,b){if(H.aq(a,{func:1,args:[,,]})){b.toString
return a}else{b.toString
return a}},
jh:function(a,b){var z=new P.C(0,$.o,null,[b])
z.b_(a)
return z},
al:function(a){return new P.o8(new P.C(0,$.o,null,[a]),[a])},
oq:function(a,b,c){$.o.toString
a.aR(b,c)},
ov:function(){var z,y
for(;z=$.be,z!=null;){$.bF=null
y=z.gbW()
$.be=y
if(y==null)$.bE=null
z.giv().$0()}},
qq:[function(){$.dK=!0
try{P.ov()}finally{$.bF=null
$.dK=!1
if($.be!=null)$.$get$dA().$1(P.fY())}},"$0","fY",0,0,3],
fS:function(a){var z=new P.fx(a,null)
if($.be==null){$.bE=z
$.be=z
if(!$.dK)$.$get$dA().$1(P.fY())}else{$.bE.b=z
$.bE=z}},
oA:function(a){var z,y,x
z=$.be
if(z==null){P.fS(a)
$.bF=$.bE
return}y=new P.fx(a,null)
x=$.bF
if(x==null){y.b=z
$.bF=y
$.be=y}else{y.b=x.b
x.b=y
$.bF=y
if(y.b==null)$.bE=y}},
c4:function(a){var z=$.o
if(C.f===z){P.bg(null,null,C.f,a)
return}z.toString
P.bg(null,null,z,z.dS(a,!0))},
qg:function(a,b){return new P.o5(null,a,!1,[b])},
dN:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){w=H.y(x)
z=w
y=H.A(x)
w=$.o
w.toString
P.bf(null,null,w,z,y)}},
ow:[function(a,b){var z=$.o
z.toString
P.bf(null,null,z,a,b)},function(a){return P.ow(a,null)},"$2","$1","oI",2,2,12,0],
qp:[function(){},"$0","oH",0,0,3],
fR:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.y(u)
z=t
y=H.A(u)
$.o.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gb2()
w=t
v=x.gaZ()
c.$2(w,v)}}},
oj:function(a,b,c,d){var z=a.bR()
if(!!J.p(z).$isN&&z!==$.$get$b_())z.bA(new P.ol(b,c,d))
else b.aR(c,d)},
fJ:function(a,b){return new P.ok(a,b)},
fK:function(a,b,c){var z=a.bR()
if(!!J.p(z).$isN&&z!==$.$get$b_())z.bA(new P.om(b,c))
else b.aQ(c)},
oe:function(a,b,c){$.o.toString
a.bK(b,c)},
mF:function(a,b){var z=$.o
if(z===C.f){z.toString
return P.dx(a,b)}return P.dx(a,z.dS(b,!0))},
dx:function(a,b){var z=C.d.bo(a.a,1000)
return H.mC(z<0?0:z,b)},
bf:function(a,b,c,d,e){var z={}
z.a=d
P.oA(new P.oy(z,e))},
fO:function(a,b,c,d){var z,y
y=$.o
if(y===c)return d.$0()
$.o=c
z=y
try{y=d.$0()
return y}finally{$.o=z}},
fQ:function(a,b,c,d,e){var z,y
y=$.o
if(y===c)return d.$1(e)
$.o=c
z=y
try{y=d.$1(e)
return y}finally{$.o=z}},
fP:function(a,b,c,d,e,f){var z,y
y=$.o
if(y===c)return d.$2(e,f)
$.o=c
z=y
try{y=d.$2(e,f)
return y}finally{$.o=z}},
bg:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dS(d,!(!z||!1))
P.fS(d)},
nb:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
na:{"^":"a:42;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
nc:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
nd:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
oh:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
oi:{"^":"a:11;a",
$2:function(a,b){this.a.$2(1,new H.d0(a,b))}},
oC:{"^":"a:26;a",
$2:function(a,b){this.a(a,b)}},
of:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcl()){z.b=!0
return}this.a.$2(null,0)}},
og:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
ne:{"^":"d;a,b,c",
gdi:function(){return this.a.gdi()},
gcl:function(){return this.a.gcl()},
ge2:function(){return this.c!=null},
p:function(a,b){return J.aD(this.a,b)},
dP:function(a,b){return this.a.dP(a,b)},
b0:function(){return this.a.b0()},
hn:function(a){var z=new P.nh(a)
this.a=new P.nm(null,0,null,new P.nj(z),null,new P.nk(this,z),new P.nl(this,a),[null])},
v:{
nf:function(a){var z=new P.ne(null,!1,null)
z.hn(a)
return z}}},
nh:{"^":"a:1;a",
$0:function(){P.c4(new P.ni(this.a))}},
ni:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
nj:{"^":"a:1;a",
$0:function(){this.a.$0()}},
nk:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
nl:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjf()){z.c=new P.bV(new P.C(0,$.o,null,[null]),[null])
if(z.b===!0){z.b=!1
P.c4(new P.ng(this.b))}return z.c.gfh()}}},
ng:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bC:{"^":"d;at:a<,b",
j:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
bY:function(a){return new P.bC(a,1)},
aL:function(){return C.a7},
fC:function(a){return new P.bC(a,0)},
aM:function(a){return new P.bC(a,3)}}},
aW:{"^":"d;a,b,c,d",
gF:function(){var z=this.c
return z==null?this.b:z.gF()},
w:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.w())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bC){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ab(z)
if(!!w.$isaW){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
o9:{"^":"cn;a",
gZ:function(a){return new P.aW(this.a(),null,null,null)},
$ascn:I.aO,
$asx:I.aO,
v:{
aN:function(a){return new P.o9(a)}}},
N:{"^":"d;$ti"},
fz:{"^":"d;fh:a<,$ti",
dV:function(a,b){if(a==null)a=new P.cr()
if(this.a.a!==0)throw H.c(new P.F("Future already completed"))
$.o.toString
this.aR(a,b)},
cT:function(a){return this.dV(a,null)}},
bV:{"^":"fz;a,$ti",
bs:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.b_(a)},
dU:function(){return this.bs(null)},
aR:function(a,b){this.a.eB(a,b)}},
o8:{"^":"fz;a,$ti",
bs:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.aQ(a)},
dU:function(){return this.bs(null)},
aR:function(a,b){this.a.aR(a,b)}},
dF:{"^":"d;dG:a<,b,c,d,e,$ti",
gig:function(){return this.b.b},
gfj:function(){return(this.c&1)!==0},
gj0:function(){return(this.c&2)!==0},
gfi:function(){return this.c===8},
iZ:function(a){return this.b.b.ef(this.d,a)},
jp:function(a){if(this.c!==6)return!0
return this.b.b.ef(this.d,a.gb2())},
iV:function(a){var z,y
z=this.e
y=this.b.b
if(H.aq(z,{func:1,args:[,,]}))return y.jI(z,a.gb2(),a.gaZ())
else return y.ef(z,a.gb2())},
j_:function(){return this.b.b.fI(this.d)}},
C:{"^":"d;bM:a<,b,i2:c<,$ti",
ghO:function(){return this.a===2},
gdC:function(){return this.a>=4},
eg:function(a,b){var z=$.o
if(z!==C.f){z.toString
if(b!=null)b=P.dM(b,z)}return this.dO(a,b)},
bz:function(a){return this.eg(a,null)},
dO:function(a,b){var z,y
z=new P.C(0,$.o,null,[null])
y=b==null?1:3
this.cG(new P.dF(null,z,y,a,b,[H.j(this,0),null]))
return z},
bA:function(a){var z,y
z=$.o
y=new P.C(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.j(this,0)
this.cG(new P.dF(null,y,8,a,null,[z,z]))
return y},
cG:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdC()){y.cG(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bg(null,null,z,new P.nw(this,a))}},
eS:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdG()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdC()){v.eS(a)
return}this.a=v.a
this.c=v.c}z.a=this.cN(a)
y=this.b
y.toString
P.bg(null,null,y,new P.nD(z,this))}},
cM:function(){var z=this.c
this.c=null
return this.cN(z)},
cN:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdG()
z.a=y}return y},
aQ:function(a){var z,y
z=this.$ti
if(H.aA(a,"$isN",z,"$asN"))if(H.aA(a,"$isC",z,null))P.cH(a,this)
else P.fB(a,this)
else{y=this.cM()
this.a=4
this.c=a
P.bb(this,y)}},
aR:[function(a,b){var z=this.cM()
this.a=8
this.c=new P.cb(a,b)
P.bb(this,z)},function(a){return this.aR(a,null)},"k_","$2","$1","gbq",2,2,12,0],
b_:function(a){var z=this.$ti
if(H.aA(a,"$isN",z,"$asN")){if(H.aA(a,"$isC",z,null))if(a.gbM()===8){this.a=1
z=this.b
z.toString
P.bg(null,null,z,new P.ny(this,a))}else P.cH(a,this)
else P.fB(a,this)
return}this.a=1
z=this.b
z.toString
P.bg(null,null,z,new P.nz(this,a))},
eB:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bg(null,null,z,new P.nx(this,a,b))},
$isN:1,
v:{
fB:function(a,b){var z,y,x,w
b.a=1
try{a.eg(new P.nA(b),new P.nB(b))}catch(x){w=H.y(x)
z=w
y=H.A(x)
P.c4(new P.nC(b,z,y))}},
cH:function(a,b){var z,y,x
for(;a.ghO();)a=a.c
z=a.gdC()
y=b.c
if(z){b.c=null
x=b.cN(y)
b.a=a.a
b.c=a.c
P.bb(b,x)}else{b.a=2
b.c=a
a.eS(y)}},
bb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=v.gb2()
x=v.gaZ()
z.toString
P.bf(null,null,z,y,x)}return}for(;b.gdG()!=null;b=u){u=b.a
b.a=null
P.bb(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gfj()||b.gfi()){s=b.gig()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=v.gb2()
r=v.gaZ()
y.toString
P.bf(null,null,y,x,r)
return}q=$.o
if(q==null?s!=null:q!==s)$.o=s
else q=null
if(b.gfi())new P.nG(z,x,w,b).$0()
else if(y){if(b.gfj())new P.nF(x,b,t).$0()}else if(b.gj0())new P.nE(z,x,b).$0()
if(q!=null)$.o=q
y=x.b
if(!!J.p(y).$isN){p=b.b
if(y.a>=4){o=p.c
p.c=null
b=p.cN(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.cH(y,p)
return}}p=b.b
b=p.cM()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
nw:{"^":"a:1;a,b",
$0:function(){P.bb(this.a,this.b)}},
nD:{"^":"a:1;a,b",
$0:function(){P.bb(this.b,this.a.a)}},
nA:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.aQ(a)}},
nB:{"^":"a:21;a",
$2:function(a,b){this.a.aR(a,b)},
$1:function(a){return this.$2(a,null)}},
nC:{"^":"a:1;a,b,c",
$0:function(){this.a.aR(this.b,this.c)}},
ny:{"^":"a:1;a,b",
$0:function(){P.cH(this.b,this.a)}},
nz:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cM()
z.a=4
z.c=this.b
P.bb(z,y)}},
nx:{"^":"a:1;a,b,c",
$0:function(){this.a.aR(this.b,this.c)}},
nG:{"^":"a:3;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.j_()}catch(w){v=H.y(w)
y=v
x=H.A(w)
if(this.c){v=this.a.a.c.gb2()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cb(y,x)
u.a=!0
return}if(!!J.p(z).$isN){if(z instanceof P.C&&z.gbM()>=4){if(z.gbM()===8){v=this.b
v.b=z.gi2()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bz(new P.nH(t))
v.a=!1}}},
nH:{"^":"a:0;a",
$1:function(a){return this.a}},
nF:{"^":"a:3;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.iZ(this.c)}catch(x){w=H.y(x)
z=w
y=H.A(x)
w=this.a
w.b=new P.cb(z,y)
w.a=!0}}},
nE:{"^":"a:3;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jp(z)===!0&&w.e!=null){v=this.b
v.b=w.iV(z)
v.a=!1}}catch(u){w=H.y(u)
y=w
x=H.A(u)
w=this.a
v=w.a.c.gb2()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cb(y,x)
s.a=!0}}},
fx:{"^":"d;iv:a<,bW:b@"},
a4:{"^":"d;$ti",
aL:function(a,b){return new P.nV(b,this,[H.w(this,"a4",0),null])},
Y:function(a,b){var z,y
z={}
y=new P.C(0,$.o,null,[P.X])
z.a=null
z.a=this.an(new P.lW(z,this,b,y),!0,new P.lX(y),y.gbq())
return y},
I:function(a,b){var z,y
z={}
y=new P.C(0,$.o,null,[null])
z.a=null
z.a=this.an(new P.m_(z,this,b,y),!0,new P.m0(y),y.gbq())
return y},
gk:function(a){var z,y
z={}
y=new P.C(0,$.o,null,[P.v])
z.a=0
this.an(new P.m5(z),!0,new P.m6(z,y),y.gbq())
return y},
gH:function(a){var z,y
z={}
y=new P.C(0,$.o,null,[P.X])
z.a=null
z.a=this.an(new P.m1(z,y),!0,new P.m2(y),y.gbq())
return y},
c_:function(a){var z,y,x
z=H.w(this,"a4",0)
y=H.t([],[z])
x=new P.C(0,$.o,null,[[P.I,z]])
this.an(new P.m7(this,y),!0,new P.m8(y,x),x.gbq())
return x},
bj:function(a){var z,y,x
z=H.w(this,"a4",0)
y=P.H(null,null,null,z)
x=new P.C(0,$.o,null,[[P.bx,z]])
this.an(new P.m9(this,y),!0,new P.ma(y,x),x.gbq())
return x},
gE:function(a){var z,y
z={}
y=new P.C(0,$.o,null,[H.w(this,"a4",0)])
z.a=null
z.b=!1
this.an(new P.m3(z,this),!0,new P.m4(z,y),y.gbq())
return y}},
lW:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.fR(new P.lU(this.c,a),new P.lV(z,y),P.fJ(z.a,y))},
$signature:function(){return H.aX(function(a){return{func:1,args:[a]}},this.b,"a4")}},
lU:{"^":"a:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
lV:{"^":"a:20;a,b",
$1:function(a){if(a===!0)P.fK(this.a.a,this.b,!0)}},
lX:{"^":"a:1;a",
$0:function(){this.a.aQ(!1)}},
m_:{"^":"a;a,b,c,d",
$1:function(a){P.fR(new P.lY(this.c,a),new P.lZ(),P.fJ(this.a.a,this.d))},
$signature:function(){return H.aX(function(a){return{func:1,args:[a]}},this.b,"a4")}},
lY:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lZ:{"^":"a:0;",
$1:function(a){}},
m0:{"^":"a:1;a",
$0:function(){this.a.aQ(null)}},
m5:{"^":"a:0;a",
$1:function(a){++this.a.a}},
m6:{"^":"a:1;a,b",
$0:function(){this.b.aQ(this.a.a)}},
m1:{"^":"a:0;a,b",
$1:function(a){P.fK(this.a.a,this.b,!1)}},
m2:{"^":"a:1;a",
$0:function(){this.a.aQ(!0)}},
m7:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.aX(function(a){return{func:1,args:[a]}},this.a,"a4")}},
m8:{"^":"a:1;a,b",
$0:function(){this.b.aQ(this.a)}},
m9:{"^":"a;a,b",
$1:function(a){this.b.p(0,a)},
$signature:function(){return H.aX(function(a){return{func:1,args:[a]}},this.a,"a4")}},
ma:{"^":"a:1;a,b",
$0:function(){this.b.aQ(this.a)}},
m3:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$signature:function(){return H.aX(function(a){return{func:1,args:[a]}},this.b,"a4")}},
m4:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aQ(x.a)
return}try{x=H.a7()
throw H.c(x)}catch(w){x=H.y(w)
z=x
y=H.A(w)
P.oq(this.b,z,y)}}},
cI:{"^":"d;bM:b<,$ti",
gdi:function(){return new P.cF(this,this.$ti)},
gjf:function(){return(this.b&4)!==0},
gcl:function(){var z=this.b
return(z&1)!==0?this.gbn().geO():(z&2)===0},
ghW:function(){if((this.b&8)===0)return this.a
return this.a.gcw()},
dt:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dH(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcw()==null)y.c=new P.dH(null,null,0,this.$ti)
return y.c},
gbn:function(){if((this.b&8)!==0)return this.a.gcw()
return this.a},
c2:function(){if((this.b&4)!==0)return new P.F("Cannot add event after closing")
return new P.F("Cannot add event while adding a stream")},
it:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c2())
if((z&2)!==0){z=new P.C(0,$.o,null,[null])
z.b_(null)
return z}z=this.a
y=new P.C(0,$.o,null,[null])
x=this.ghq()
x=a.an(this.ght(),!1,this.ghu(),x)
w=this.b
if((w&1)!==0?this.gbn().geO():(w&2)===0)x.cn()
this.a=new P.o1(z,y,x,this.$ti)
this.b|=8
return y},
eI:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b_():new P.C(0,$.o,null,[null])
this.c=z}return z},
p:[function(a,b){if(this.b>=4)throw H.c(this.c2())
this.bp(b)},"$1","gii",2,0,function(){return H.aX(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cI")}],
dP:function(a,b){if(this.b>=4)throw H.c(this.c2())
if(a==null)a=new P.cr()
$.o.toString
this.bK(a,b)},
b0:function(){var z=this.b
if((z&4)!==0)return this.eI()
if(z>=4)throw H.c(this.c2())
z|=4
this.b=z
if((z&1)!==0)this.cb()
else if((z&3)===0)this.dt().p(0,C.v)
return this.eI()},
bp:[function(a){var z=this.b
if((z&1)!==0)this.ca(a)
else if((z&3)===0)this.dt().p(0,new P.dB(a,null,this.$ti))},"$1","ght",2,0,function(){return H.aX(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cI")}],
bK:[function(a,b){var z=this.b
if((z&1)!==0)this.cc(a,b)
else if((z&3)===0)this.dt().p(0,new P.dC(a,b,null))},"$2","ghq",4,0,27],
dl:[function(){var z=this.a
this.a=z.gcw()
this.b&=4294967287
z.a.b_(null)},"$0","ghu",0,0,3],
i9:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.F("Stream has already been listened to."))
z=$.o
y=d?1:0
x=new P.nq(this,null,null,null,z,y,null,null,this.$ti)
x.ey(a,b,c,d,H.j(this,0))
w=this.ghW()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scw(x)
v.b.cr()}else this.a=x
x.i7(w)
x.dA(new P.o3(this))
return x},
i_:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bR()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){w=H.y(v)
y=w
x=H.A(v)
u=new P.C(0,$.o,null,[null])
u.eB(y,x)
z=u}else z=z.bA(w)
w=new P.o2(this)
if(z!=null)z=z.bA(w)
else w.$0()
return z}},
o3:{"^":"a:1;a",
$0:function(){P.dN(this.a.d)}},
o2:{"^":"a:3;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.b_(null)}},
ob:{"^":"d;$ti",
ca:function(a){this.gbn().bp(a)},
cc:function(a,b){this.gbn().bK(a,b)},
cb:function(){this.gbn().dl()}},
nn:{"^":"d;$ti",
ca:function(a){this.gbn().bL(new P.dB(a,null,[H.j(this,0)]))},
cc:function(a,b){this.gbn().bL(new P.dC(a,b,null))},
cb:function(){this.gbn().bL(C.v)}},
nm:{"^":"cI+nn;a,b,c,d,e,f,r,$ti"},
oa:{"^":"cI+ob;a,b,c,d,e,f,r,$ti"},
cF:{"^":"o4;a,$ti",
gB:function(a){return(H.a1(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cF))return!1
return b.a===this.a}},
nq:{"^":"bW;x,a,b,c,d,e,f,r,$ti",
dH:function(){return this.x.i_(this)},
dJ:[function(){var z=this.x
if((z.b&8)!==0)z.a.cn()
P.dN(z.e)},"$0","gdI",0,0,3],
dL:[function(){var z=this.x
if((z.b&8)!==0)z.a.cr()
P.dN(z.f)},"$0","gdK",0,0,3]},
n6:{"^":"d;$ti",
cn:function(){this.b.cn()},
cr:function(){this.b.cr()},
bR:function(){var z=this.b.bR()
if(z==null){this.a.b_(null)
return}return z.bA(new P.n7(this))},
dU:function(){this.a.b_(null)}},
n7:{"^":"a:1;a",
$0:function(){this.a.a.b_(null)}},
o1:{"^":"n6;cw:c@,a,b,$ti"},
qn:{"^":"d;$ti"},
bW:{"^":"d;bM:e<,$ti",
i7:function(a){if(a==null)return
this.r=a
if(!a.gH(a)){this.e=(this.e|64)>>>0
this.r.cB(this)}},
jw:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.f5()
if((z&4)===0&&(this.e&32)===0)this.dA(this.gdI())},
cn:function(){return this.jw(null)},
cr:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gH(z)}else z=!1
if(z)this.r.cB(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dA(this.gdK())}}}},
bR:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dm()
z=this.f
return z==null?$.$get$b_():z},
geO:function(){return(this.e&4)!==0},
gcl:function(){return this.e>=128},
dm:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.f5()
if((this.e&32)===0)this.r=null
this.f=this.dH()},
bp:["hd",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.ca(a)
else this.bL(new P.dB(a,null,[H.w(this,"bW",0)]))}],
bK:["he",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cc(a,b)
else this.bL(new P.dC(a,b,null))}],
dl:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cb()
else this.bL(C.v)},
dJ:[function(){},"$0","gdI",0,0,3],
dL:[function(){},"$0","gdK",0,0,3],
dH:function(){return},
bL:function(a){var z,y
z=this.r
if(z==null){z=new P.dH(null,null,0,[H.w(this,"bW",0)])
this.r=z}z.p(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cB(this)}},
ca:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fL(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dq((z&4)!==0)},
cc:function(a,b){var z,y
z=this.e
y=new P.np(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dm()
z=this.f
if(!!J.p(z).$isN&&z!==$.$get$b_())z.bA(y)
else y.$0()}else{y.$0()
this.dq((z&4)!==0)}},
cb:function(){var z,y
z=new P.no(this)
this.dm()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isN&&y!==$.$get$b_())y.bA(z)
else z.$0()},
dA:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dq((z&4)!==0)},
dq:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gH(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gH(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dJ()
else this.dL()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cB(this)},
ey:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.dM(b==null?P.oI():b,z)
this.c=c==null?P.oH():c}},
np:{"^":"a:3;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aq(y,{func:1,args:[P.d,P.aK]})
w=z.d
v=this.b
u=z.b
if(x)w.jJ(u,v,this.c)
else w.fL(u,v)
z.e=(z.e&4294967263)>>>0}},
no:{"^":"a:3;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fJ(z.c)
z.e=(z.e&4294967263)>>>0}},
o4:{"^":"a4;$ti",
an:function(a,b,c,d){return this.a.i9(a,d,c,!0===b)},
e8:function(a,b,c){return this.an(a,null,b,c)}},
dD:{"^":"d;bW:a@,$ti"},
dB:{"^":"dD;at:b<,a,$ti",
ea:function(a){a.ca(this.b)}},
dC:{"^":"dD;b2:b<,aZ:c<,a",
ea:function(a){a.cc(this.b,this.c)},
$asdD:I.aO},
nr:{"^":"d;",
ea:function(a){a.cb()},
gbW:function(){return},
sbW:function(a){throw H.c(new P.F("No events after a done."))}},
nX:{"^":"d;bM:a<,$ti",
cB:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.c4(new P.nY(this,a))
this.a=1},
f5:function(){if(this.a===1)this.a=3}},
nY:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbW()
z.b=w
if(w==null)z.c=null
x.ea(this.b)}},
dH:{"^":"nX;b,c,a,$ti",
gH:function(a){return this.c==null},
p:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbW(b)
this.c=b}}},
o5:{"^":"d;a,b,c,$ti"},
ol:{"^":"a:1;a,b,c",
$0:function(){return this.a.aR(this.b,this.c)}},
ok:{"^":"a:11;a,b",
$2:function(a,b){P.oj(this.a,this.b,a,b)}},
om:{"^":"a:1;a,b",
$0:function(){return this.a.aQ(this.b)}},
dE:{"^":"a4;$ti",
an:function(a,b,c,d){return this.hB(a,d,c,!0===b)},
e8:function(a,b,c){return this.an(a,null,b,c)},
hB:function(a,b,c,d){return P.nv(this,a,b,c,d,H.w(this,"dE",0),H.w(this,"dE",1))},
eL:function(a,b){b.bp(a)},
hM:function(a,b,c){c.bK(a,b)},
$asa4:function(a,b){return[b]}},
fA:{"^":"bW;x,y,a,b,c,d,e,f,r,$ti",
bp:function(a){if((this.e&2)!==0)return
this.hd(a)},
bK:function(a,b){if((this.e&2)!==0)return
this.he(a,b)},
dJ:[function(){var z=this.y
if(z==null)return
z.cn()},"$0","gdI",0,0,3],
dL:[function(){var z=this.y
if(z==null)return
z.cr()},"$0","gdK",0,0,3],
dH:function(){var z=this.y
if(z!=null){this.y=null
return z.bR()}return},
k5:[function(a){this.x.eL(a,this)},"$1","ghJ",2,0,function(){return H.aX(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fA")}],
k7:[function(a,b){this.x.hM(a,b,this)},"$2","ghL",4,0,29],
k6:[function(){this.dl()},"$0","ghK",0,0,3],
ho:function(a,b,c,d,e,f,g){this.y=this.x.a.e8(this.ghJ(),this.ghK(),this.ghL())},
$asbW:function(a,b){return[b]},
v:{
nv:function(a,b,c,d,e,f,g){var z,y
z=$.o
y=e?1:0
y=new P.fA(a,null,null,null,null,z,y,null,null,[f,g])
y.ey(b,c,d,e,g)
y.ho(a,b,c,d,e,f,g)
return y}}},
nV:{"^":"dE;b,a,$ti",
eL:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.y(w)
y=v
x=H.A(w)
P.oe(b,y,x)
return}b.bp(z)}},
cb:{"^":"d;b2:a<,aZ:b<",
j:function(a){return H.b(this.a)},
$isY:1},
qj:{"^":"d;"},
od:{"^":"d;"},
oy:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cr()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.h(y)
throw x}},
nZ:{"^":"od;",
fJ:function(a){var z,y,x,w
try{if(C.f===$.o){x=a.$0()
return x}x=P.fO(null,null,this,a)
return x}catch(w){x=H.y(w)
z=x
y=H.A(w)
return P.bf(null,null,this,z,y)}},
fL:function(a,b){var z,y,x,w
try{if(C.f===$.o){x=a.$1(b)
return x}x=P.fQ(null,null,this,a,b)
return x}catch(w){x=H.y(w)
z=x
y=H.A(w)
return P.bf(null,null,this,z,y)}},
jJ:function(a,b,c){var z,y,x,w
try{if(C.f===$.o){x=a.$2(b,c)
return x}x=P.fP(null,null,this,a,b,c)
return x}catch(w){x=H.y(w)
z=x
y=H.A(w)
return P.bf(null,null,this,z,y)}},
dS:function(a,b){if(b)return new P.o_(this,a)
else return new P.o0(this,a)},
h:function(a,b){return},
fI:function(a){if($.o===C.f)return a.$0()
return P.fO(null,null,this,a)},
ef:function(a,b){if($.o===C.f)return a.$1(b)
return P.fQ(null,null,this,a,b)},
jI:function(a,b,c){if($.o===C.f)return a.$2(b,c)
return P.fP(null,null,this,a,b,c)}},
o_:{"^":"a:1;a,b",
$0:function(){return this.a.fJ(this.b)}},
o0:{"^":"a:1;a,b",
$0:function(){return this.a.fI(this.b)}}}],["","",,P,{"^":"",
eu:function(a,b){return new H.O(0,null,null,null,null,null,0,[a,b])},
aG:function(){return new H.O(0,null,null,null,null,null,0,[null,null])},
a8:function(a){return H.p8(a,new H.O(0,null,null,null,null,null,0,[null,null]))},
ju:function(a,b,c){var z,y
if(P.dL(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bG()
y.push(a)
try{P.ot(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.f5(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
b0:function(a,b,c){var z,y,x
if(P.dL(a))return b+"..."+c
z=new P.bA(b)
y=$.$get$bG()
y.push(a)
try{x=z
x.u=P.f5(x.gu(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.u=y.gu()+c
y=z.gu()
return y.charCodeAt(0)==0?y:y},
dL:function(a){var z,y
for(z=0;y=$.$get$bG(),z<y.length;++z)if(a===y[z])return!0
return!1},
ot:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gZ(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.w())return
w=H.b(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.w()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gF();++x
if(!z.w()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.w();t=s,s=r){r=z.gF();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.e(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
jH:function(a,b,c,d,e){return new H.O(0,null,null,null,null,null,0,[d,e])},
bP:function(a,b,c){var z=P.jH(null,null,null,b,c)
a.I(0,new P.oJ(z))
return z},
H:function(a,b,c,d){return new P.fD(0,null,null,null,null,null,0,[d])},
aS:function(a,b){var z,y
z=P.H(null,null,null,b)
for(y=J.ab(a);y.w();)z.p(0,y.gF())
return z},
dc:function(a){var z,y,x
z={}
if(P.dL(a))return"{...}"
y=new P.bA("")
try{$.$get$bG().push(a)
x=y
x.u=x.gu()+"{"
z.a=!0
a.I(0,new P.jP(z,y))
z=y
z.u=z.gu()+"}"}finally{z=$.$get$bG()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gu()
return z.charCodeAt(0)==0?z:z},
fE:{"^":"O;a,b,c,d,e,f,r,$ti",
cj:function(a){return H.pp(a)&0x3ffffff},
ck:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfk()
if(x==null?b==null:x===b)return y}return-1},
v:{
bD:function(a,b){return new P.fE(0,null,null,null,null,null,0,[a,b])}}},
fD:{"^":"nI;a,b,c,d,e,f,r,$ti",
dF:function(){return new P.fD(0,null,null,null,null,null,0,this.$ti)},
gZ:function(a){var z=new P.ag(this,this.r,null,null,[null])
z.c=this.e
return z},
gk:function(a){return this.a},
gH:function(a){return this.a===0},
ga5:function(a){return this.a!==0},
Y:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hz(b)},
hz:function(a){var z=this.d
if(z==null)return!1
return this.cJ(z[this.cI(a)],a)>=0},
bV:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.Y(0,a)?a:null
else return this.hQ(a)},
hQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cI(a)]
x=this.cJ(y,a)
if(x<0)return
return J.at(y,x).geH()},
I:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gE:function(a){var z=this.f
if(z==null)throw H.c(new P.F("No elements"))
return z.a},
p:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eC(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eC(x,b)}else return this.al(b)},
al:function(a){var z,y,x
z=this.d
if(z==null){z=P.nR()
this.d=z}y=this.cI(a)
x=z[y]
if(x==null)z[y]=[this.dr(a)]
else{if(this.cJ(x,a)>=0)return!1
x.push(this.dr(a))}return!0},
aM:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eD(this.c,b)
else return this.i0(b)},
i0:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cI(a)]
x=this.cJ(y,a)
if(x<0)return!1
this.eE(y.splice(x,1)[0])
return!0},
hG:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.aM(0,y)}},
aJ:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eC:function(a,b){if(a[b]!=null)return!1
a[b]=this.dr(b)
return!0},
eD:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eE(z)
delete a[b]
return!0},
dr:function(a){var z,y
z=new P.nQ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eE:function(a){var z,y
z=a.ghy()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cI:function(a){return J.l(a)&0x3ffffff},
cJ:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].geH(),b))return y
return-1},
$isbx:1,
$isU:1,
v:{
nR:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
nQ:{"^":"d;eH:a<,b,hy:c<"},
ag:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
w:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
nI:{"^":"lh;$ti",
bj:function(a){var z=this.dF()
z.ag(0,this)
return z}},
cn:{"^":"x;$ti"},
oJ:{"^":"a:5;a",
$2:function(a,b){this.a.l(0,a,b)}},
ev:{"^":"eA;$ti"},
eA:{"^":"d+aT;$ti",$asI:null,$asU:null,$isI:1,$isU:1},
aT:{"^":"d;$ti",
gZ:function(a){return new H.d9(this,this.gk(this),0,null,[H.w(this,"aT",0)])},
aa:function(a,b){return this.h(0,b)},
I:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gH:function(a){return this.gk(this)===0},
ga5:function(a){return!this.gH(this)},
gE:function(a){if(this.gk(this)===0)throw H.c(H.a7())
return this.h(0,this.gk(this)-1)},
Y:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<this.gk(this);++y){if(J.f(this.h(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bQ:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y))===!0)return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bf:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
aL:function(a,b){return new H.am(this,b,[H.w(this,"aT",0),null])},
dg:function(a,b){return H.f7(this,b,null,H.w(this,"aT",0))},
bj:function(a){var z,y
z=P.H(null,null,null,H.w(this,"aT",0))
for(y=0;y<this.gk(this);++y)z.p(0,this.h(0,y))
return z},
p:function(a,b){var z=this.gk(this)
this.sk(0,z+1)
this.l(0,z,b)},
aM:function(a,b){var z
for(z=0;z<this.gk(this);++z)if(J.f(this.h(0,z),b)){this.aC(0,z,this.gk(this)-1,this,z+1)
this.sk(0,this.gk(this)-1)
return!0}return!1},
hF:function(a,b){var z,y,x,w
z=H.t([],[H.w(this,"aT",0)])
y=this.gk(this)
for(x=0;x<y;++x){w=this.h(0,x)
if(J.f(a.$1(w),b))z.push(w)
if(y!==this.gk(this))throw H.c(new P.B(this))}if(z.length!==this.gk(this)){this.h5(0,0,z.length,z)
this.sk(0,z.length)}},
aC:function(a,b,c,d,e){var z,y,x,w,v
P.cv(b,c,this.gk(this),null,null,null)
z=c-b
if(z===0)return
if(H.aA(d,"$isI",[H.w(this,"aT",0)],"$asI")){y=e
x=d}else{x=J.hw(d,e).bi(0,!1)
y=0}w=J.J(x)
if(y+z>w.gk(x))throw H.c(H.el())
if(y<b)for(v=z-1;v>=0;--v)this.l(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.l(0,b+v,w.h(x,y+v))},
h5:function(a,b,c,d){return this.aC(a,b,c,d,0)},
j:function(a){return P.b0(this,"[","]")},
$isI:1,
$isU:1},
oc:{"^":"d;$ti",
l:function(a,b,c){throw H.c(new P.P("Cannot modify unmodifiable map"))},
$isE:1},
jN:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
l:function(a,b,c){this.a.l(0,b,c)},
W:function(a){return this.a.W(a)},
I:function(a,b){this.a.I(0,b)},
gH:function(a){var z=this.a
return z.gH(z)},
ga5:function(a){var z=this.a
return z.ga5(z)},
gk:function(a){var z=this.a
return z.gk(z)},
j:function(a){return this.a.j(0)},
$isE:1},
fu:{"^":"jN+oc;a,$ti",$asE:null,$isE:1},
jP:{"^":"a:5;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.u+=", "
z.a=!1
z=this.b
y=z.u+=H.b(a)
z.u=y+": "
z.u+=H.b(b)}},
jI:{"^":"aH;a,b,c,d,$ti",
gZ:function(a){return new P.fF(this,this.c,this.d,this.b,null,this.$ti)},
I:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.i(new P.B(this))}},
gH:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gE:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.a7())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
aa:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.i(P.cl(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
p:function(a,b){this.al(b)},
ag:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aA(b,"$isI",z,"$asI")){y=b.gk(b)
x=this.gk(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.jJ(w+(w>>>1))
if(typeof t!=="number")return H.D(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.ie(s)
this.a=s
this.b=0
C.a.aC(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aC(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aC(v,z,z+r,b,0)
C.a.aC(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.fF(b,b.c,b.d,b.b,null,[H.j(b,0)]);z.w();)this.al(z.e)},
aJ:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.b0(this,"{","}")},
f3:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eK();++this.d},
d_:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.a7());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
al:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.eK();++this.d},
eK:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aC(y,0,w,z,x)
C.a.aC(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ie:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aC(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aC(a,0,v,x,z)
C.a.aC(a,v,v+this.c,this.a,0)
return this.c+v}},
hg:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
v:{
aU:function(a,b){var z=new P.jI(null,0,0,0,[b])
z.hg(a,b)
return z},
jJ:function(a){var z
a=C.q.eo(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
fF:{"^":"d;a,b,c,d,e,$ti",
gF:function(){return this.e},
w:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.i(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
li:{"^":"d;$ti",
gH:function(a){return this.a===0},
ga5:function(a){return this.a!==0},
ag:function(a,b){var z
for(z=J.ab(b);z.w();)this.p(0,z.gF())},
iA:function(a){var z,y
for(z=a.a,y=new P.ag(z,z.r,null,null,[null]),y.c=z.e;y.w();)if(!this.Y(0,y.d))return!1
return!0},
bi:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sk(z,this.a)
for(y=new P.ag(this,this.r,null,null,[null]),y.c=this.e,x=0;y.w();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
c_:function(a){return this.bi(a,!0)},
aL:function(a,b){return new H.bo(this,b,[H.j(this,0),null])},
j:function(a){return P.b0(this,"{","}")},
I:function(a,b){var z
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e;z.w();)b.$1(z.d)},
aU:function(a,b,c){var z,y
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e,y=b;z.w();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.ag(this,this.r,null,null,[null])
z.c=this.e
if(!z.w())throw H.c(H.a7())
do y=z.d
while(z.w())
return y},
bf:function(a,b,c){var z,y
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e;z.w();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
av:function(a,b){var z,y,x,w
for(z=new P.ag(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.w();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.d4())
y=w
x=!0}}if(x)return y
throw H.c(H.a7())},
$isbx:1,
$isU:1},
lh:{"^":"li;$ti"}}],["","",,P,{"^":"",
cK:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.nL(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cK(a[z])
return a},
ox:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.R(a))
z=null
try{z=JSON.parse(a)}catch(x){w=H.y(x)
y=w
throw H.c(new P.eh(String(y),null,null))}return P.cK(z)},
qo:[function(a){return a.d3()},"$1","p1",2,0,0],
nL:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hZ(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c4().length
return z},
gH:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c4().length
return z===0},
ga5:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c4().length
return z>0},
l:function(a,b,c){var z,y
if(this.b==null)this.c.l(0,b,c)
else if(this.W(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.ib().l(0,b,c)},
W:function(a){if(this.b==null)return this.c.W(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
fD:function(a,b){var z
if(this.W(a))return this.h(0,a)
z=b.$0()
this.l(0,a,z)
return z},
I:function(a,b){var z,y,x,w
if(this.b==null)return this.c.I(0,b)
z=this.c4()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cK(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
j:function(a){return P.dc(this)},
c4:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
ib:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.aG()
y=this.c4()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.l(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
hZ:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cK(this.a[a])
return this.b[a]=z},
$isE:1,
$asE:I.aO},
e8:{"^":"d;$ti"},
ch:{"^":"d;$ti"},
d8:{"^":"Y;a,b",
j:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
jA:{"^":"d8;a,b",
j:function(a){return"Cyclic error in JSON stringify"}},
jz:{"^":"e8;a,b",
iE:function(a,b){return P.ox(a,this.giF().a)},
iD:function(a){return this.iE(a,null)},
iN:function(a,b){var z=this.giO()
return P.nN(a,z.b,z.a)},
fc:function(a){return this.iN(a,null)},
giO:function(){return C.N},
giF:function(){return C.M},
$ase8:function(){return[P.d,P.m]}},
jC:{"^":"ch;a,b",
$asch:function(){return[P.d,P.m]}},
jB:{"^":"ch;a",
$asch:function(){return[P.m,P.d]}},
nO:{"^":"d;",
fU:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gk(a)
if(typeof y!=="number")return H.D(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cf(a,v)
if(u>92)continue
if(u<32){if(v>w)x.u+=C.b.ax(a,w,v)
w=v+1
x.u+=H.a9(92)
switch(u){case 8:x.u+=H.a9(98)
break
case 9:x.u+=H.a9(116)
break
case 10:x.u+=H.a9(110)
break
case 12:x.u+=H.a9(102)
break
case 13:x.u+=H.a9(114)
break
default:x.u+=H.a9(117)
x.u+=H.a9(48)
x.u+=H.a9(48)
t=u>>>4&15
x.u+=H.a9(t<10?48+t:87+t)
t=u&15
x.u+=H.a9(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.u+=C.b.ax(a,w,v)
w=v+1
x.u+=H.a9(92)
x.u+=H.a9(u)}}if(w===0)x.u+=H.b(a)
else if(w<y)x.u+=z.ax(a,w,y)},
dn:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.jA(a,null))}z.push(a)},
d6:function(a){var z,y,x,w
if(this.fT(a))return
this.dn(a)
try{z=this.b.$1(a)
if(!this.fT(z))throw H.c(new P.d8(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){x=H.y(w)
y=x
throw H.c(new P.d8(a,y))}},
fT:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.u+=C.i.j(a)
return!0}else if(a===!0){this.c.u+="true"
return!0}else if(a===!1){this.c.u+="false"
return!0}else if(a==null){this.c.u+="null"
return!0}else if(typeof a==="string"){z=this.c
z.u+='"'
this.fU(a)
z.u+='"'
return!0}else{z=J.p(a)
if(!!z.$isI){this.dn(a)
this.jV(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isE){this.dn(a)
y=this.jW(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
jV:function(a){var z,y,x
z=this.c
z.u+="["
y=J.J(a)
if(y.gk(a)>0){this.d6(y.h(a,0))
for(x=1;x<y.gk(a);++x){z.u+=","
this.d6(y.h(a,x))}}z.u+="]"},
jW:function(a){var z,y,x,w,v,u
z={}
if(a.gH(a)){this.c.u+="{}"
return!0}y=a.gk(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.I(0,new P.nP(z,x))
if(!z.b)return!1
z=this.c
z.u+="{"
for(w='"',v=0;v<y;v+=2,w=',"'){z.u+=w
this.fU(x[v])
z.u+='":'
u=v+1
if(u>=y)return H.e(x,u)
this.d6(x[u])}z.u+="}"
return!0}},
nP:{"^":"a:5;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.e(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.e(z,w)
z[w]=b}},
nM:{"^":"nO;c,a,b",v:{
nN:function(a,b,c){var z,y,x
z=new P.bA("")
y=P.p1()
x=new P.nM(z,[],y)
x.d6(a)
y=z.u
return y.charCodeAt(0)==0?y:y}}}}],["","",,P,{"^":"",
pS:[function(a,b){return J.c7(a,b)},"$2","p2",4,0,39],
ee:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.h(a)
if(typeof a==="string")return JSON.stringify(a)
return P.j0(a)},
j0:function(a){var z=J.p(a)
if(!!z.$isa)return z.j(a)
return H.ct(a)},
cj:function(a){return new P.nu(a)},
V:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.ab(a);y.w();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
jK:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
dW:function(a){var z=H.b(a)
H.pu(z)},
b5:function(a,b,c){return new H.er(a,H.d6(a,!1,b,!1),null,null)},
X:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
ci:{"^":"d;ic:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.ci))return!1
return this.a===b.a&&!0},
be:function(a,b){return C.d.be(this.a,b.gic())},
gB:function(a){var z=this.a
return(z^C.d.cP(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t
z=P.iA(H.b3(this).getFullYear()+0)
y=P.bL(H.b3(this).getMonth()+1)
x=P.bL(H.b3(this).getDate()+0)
w=P.bL(H.b3(this).getHours()+0)
v=P.bL(H.b3(this).getMinutes()+0)
u=P.bL(H.b3(this).getSeconds()+0)
t=P.iB(H.b3(this).getMilliseconds()+0)
return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
p:function(a,b){var z,y
z=this.a+b.gj4()
y=new P.ci(z,!1)
z=Math.abs(z)
if(!(z>864e13)){z===864e13
z=!1}else z=!0
if(z)H.i(P.z(y.gjq()))
return y},
gjq:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.ci]},
v:{
iA:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
iB:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bL:function(a){if(a>=10)return""+a
return"0"+a}}},
aB:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+double":0,
aR:{"^":"d;br:a<",
a4:function(a,b){return new P.aR(this.a+b.gbr())},
aP:function(a,b){return new P.aR(this.a-b.gbr())},
bH:function(a,b){return new P.aR(C.i.ee(this.a*b))},
au:function(a,b){return C.d.au(this.a,b.gbr())},
bF:function(a,b){return this.a>b.gbr()},
bG:function(a,b){return C.d.bG(this.a,b.gbr())},
bC:function(a,b){return C.d.bC(this.a,b.gbr())},
gj4:function(){return C.d.bo(this.a,1000)},
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.aR))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
be:function(a,b){return C.d.be(this.a,b.gbr())},
j:function(a){var z,y,x,w,v
z=new P.iL()
y=this.a
if(y<0)return"-"+new P.aR(0-y).j(0)
x=z.$1(C.d.bo(y,6e7)%60)
w=z.$1(C.d.bo(y,1e6)%60)
v=new P.iK().$1(y%1e6)
return""+C.d.bo(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
en:function(a){return new P.aR(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aR]}},
iK:{"^":"a:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
iL:{"^":"a:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Y:{"^":"d;",
gaZ:function(){return H.A(this.$thrownJsError)}},
cr:{"^":"Y;",
j:function(a){return"Throw of null."}},
aQ:{"^":"Y;a,b,i:c<,d",
gdv:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdu:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdv()+y+x
if(!this.a)return w
v=this.gdu()
u=P.ee(this.b)
return w+v+": "+H.b(u)},
v:{
z:function(a){return new P.aQ(!1,null,null,a)},
ca:function(a,b,c){return new P.aQ(!0,a,b,c)},
n:function(a){return new P.aQ(!1,null,a,"Must not be null")}}},
dm:{"^":"aQ;e,f,a,b,c,d",
gdv:function(){return"RangeError"},
gdu:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
kx:function(a){return new P.dm(null,null,!1,null,null,a)},
bR:function(a,b,c){return new P.dm(null,null,!0,a,b,"Value not in range")},
W:function(a,b,c,d,e){return new P.dm(b,c,!0,a,d,"Invalid value")},
ky:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.W(a,b,c,d,e))},
cv:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.W(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.W(b,a,c,"end",f))
return b}}},
jj:{"^":"aQ;e,k:f>,a,b,c,d",
gdv:function(){return"RangeError"},
gdu:function(){if(J.c6(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cl:function(a,b,c,d,e){var z=e!=null?e:J.au(b)
return new P.jj(b,z,!0,a,c,"Index out of range")}}},
P:{"^":"Y;a",
j:function(a){return"Unsupported operation: "+this.a}},
an:{"^":"Y;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
F:{"^":"Y;a",
j:function(a){return"Bad state: "+this.a}},
B:{"^":"Y;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.ee(z))+"."}},
k6:{"^":"d;",
j:function(a){return"Out of Memory"},
gaZ:function(){return},
$isY:1},
eY:{"^":"d;",
j:function(a){return"Stack Overflow"},
gaZ:function(){return},
$isY:1},
iz:{"^":"Y;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
nu:{"^":"d;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eh:{"^":"d;a,b,c",
j:function(a){var z,y
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(typeof y!=="string")return z
if(y.length>78)y=C.b.ax(y,0,75)+"..."
return z+"\n"+y}},
j1:{"^":"d;i:a<,eP,$ti",
j:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.eP
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.i(P.ca(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dk(b,"expando$values")
return y==null?null:H.dk(y,z)},
l:function(a,b,c){var z,y
z=this.eP
if(typeof z!=="string")z.set(b,c)
else{y=H.dk(b,"expando$values")
if(y==null){y=new P.d()
H.eG(b,"expando$values",y)}H.eG(y,z,c)}}},
bq:{"^":"d;"},
v:{"^":"L;",$isQ:1,
$asQ:function(){return[P.L]}},
"+int":0,
x:{"^":"d;$ti",
aL:function(a,b){return H.br(this,b,H.w(this,"x",0),null)},
bB:["ew",function(a,b){return new H.K(this,b,[H.w(this,"x",0)])}],
Y:function(a,b){var z
for(z=this.gZ(this);z.w();)if(J.f(z.gF(),b))return!0
return!1},
I:function(a,b){var z
for(z=this.gZ(this);z.w();)b.$1(z.gF())},
aU:function(a,b,c){var z,y
for(z=this.gZ(this),y=b;z.w();)y=c.$2(y,z.gF())
return y},
bi:function(a,b){return P.V(this,b,H.w(this,"x",0))},
c_:function(a){return this.bi(a,!0)},
bj:function(a){return P.aS(this,H.w(this,"x",0))},
gk:function(a){var z,y
z=this.gZ(this)
for(y=0;z.w();)++y
return y},
gH:function(a){return!this.gZ(this).w()},
ga5:function(a){return!this.gH(this)},
dg:function(a,b){return H.lk(this,b,H.w(this,"x",0))},
gE:function(a){var z,y
z=this.gZ(this)
if(!z.w())throw H.c(H.a7())
do y=z.gF()
while(z.w())
return y},
gbJ:function(a){var z,y
z=this.gZ(this)
if(!z.w())throw H.c(H.a7())
y=z.gF()
if(z.w())throw H.c(H.d4())
return y},
aa:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.n("index"))
if(b<0)H.i(P.W(b,0,null,"index",null))
for(z=this.gZ(this),y=0;z.w();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cl(b,this,"index",null,y))},
j:function(a){return P.ju(this,"(",")")}},
co:{"^":"d;$ti"},
I:{"^":"d;$ti",$isx:1,$isU:1},
"+List":0,
E:{"^":"d;$ti"},
aV:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
L:{"^":"d;",$isQ:1,
$asQ:function(){return[P.L]}},
"+num":0,
d:{"^":";",
A:function(a,b){return this===b},
gB:function(a){return H.a1(this)},
j:function(a){return H.ct(this)},
gb7:function(a){return new H.af(H.h6(this),null)},
toString:function(){return this.j(this)}},
b2:{"^":"d;"},
bx:{"^":"U;$ti"},
aK:{"^":"d;"},
m:{"^":"d;",$isQ:1,
$asQ:function(){return[P.m]},
$isdh:1},
"+String":0,
bA:{"^":"d;u<",
gk:function(a){return this.u.length},
gH:function(a){return this.u.length===0},
ga5:function(a){return this.u.length!==0},
j:function(a){var z=this.u
return z.charCodeAt(0)==0?z:z},
v:{
f5:function(a,b,c){var z=J.ab(b)
if(!z.w())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.w())}else{a+=H.b(z.gF())
for(;z.w();)a=a+c+H.b(z.gF())}return a},
md:function(a){return new P.bA(a)}}}}],["","",,P,{"^":"",eO:{"^":"d;"}}],["","",,P,{"^":"",
pm:function(a,b){if(typeof a!=="number")throw H.c(P.z(a))
if(typeof b!=="number")throw H.c(P.z(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.i.gbS(b)||isNaN(b))return b
return a}return a},
pl:function(a,b){if(typeof a!=="number")throw H.c(P.z(a))
if(typeof b!=="number")throw H.c(P.z(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.i.gbS(a))return b
return a},
dl:function(a){return C.G},
nK:{"^":"d;",
ai:function(a){if(a<=0||a>4294967296)throw H.c(P.kx("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fs:function(){return Math.random()}}}],["","",,S,{"^":"",ip:{"^":"d;a,b,$ti",
h:function(a,b){return this.b.h(0,b)},
W:function(a){return this.b.W(a)},
I:function(a,b){return this.b.I(0,b)},
gH:function(a){var z=this.b
return z.gH(z)},
ga5:function(a){var z=this.b
return z.ga5(z)},
gk:function(a){var z=this.b
return z.gk(z)},
l:function(a,b,c){this.hA()
this.b.l(0,b,c)},
j:function(a){return J.h(this.b)},
hA:function(){if(!this.a)return
this.a=!1
this.b=P.bP(this.b,H.j(this,0),H.j(this,1))},
$isE:1}}],["","",,A,{"^":"",iq:{"^":"d;a,b,$ti",
gk:function(a){return this.b.a},
bV:function(a){return this.b.bV(a)},
Y:function(a,b){return this.b.Y(0,b)},
I:function(a,b){return this.b.I(0,b)},
gH:function(a){return this.b.a===0},
ga5:function(a){return this.b.a!==0},
gZ:function(a){var z,y
z=this.b
y=new P.ag(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aL:function(a,b){var z=this.b
z.toString
return new H.bo(z,b,[H.j(z,0),null])},
bj:function(a){var z,y
z=this.b
y=z.dF()
y.ag(0,z)
return y},
p:function(a,b){this.hS()
return this.b.p(0,b)},
j:function(a){return J.h(this.b)},
hS:function(){if(!this.a)return
this.a=!1
this.b=P.aS(this.b,H.j(this,0))},
$isbx:1,
$isU:1}}],["","",,S,{"^":"",cW:{"^":"d;eR:a<,b,$ti",
a6:function(a){var z=new S.aw(null,null,this.$ti)
z.aE()
z.q(this)
a.$1(z)
return z.t()},
gB:function(a){var z=this.b
if(z==null){z=X.bj(this.a)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$iscW)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
j:function(a){return J.h(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gk:function(a){return this.a.length},
gZ:function(a){var z=this.a
return new J.bJ(z,z.length,0,null,[H.j(z,0)])},
aL:function(a,b){var z=this.a
z.toString
return new H.am(z,b,[null,null])},
Y:function(a,b){var z=this.a
return(z&&C.a).Y(z,b)},
I:function(a,b){var z=this.a
return(z&&C.a).I(z,b)},
bj:function(a){var z=this.a
z.toString
return P.aS(z,H.j(z,0))},
gH:function(a){return this.a.length===0},
ga5:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
aE:function(){if(new H.af(H.S(H.j(this,0)),null).A(0,C.m))throw H.c(new P.P('explicit element type required, for example "new BuiltList<int>"'))}},aw:{"^":"d;eR:a<,b,$ti",
t:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.cW(z,null,this.$ti)
y.aE()
this.a=z
this.b=y
z=y}return z},
q:function(a){if(H.aA(a,"$iscW",this.$ti,null)){this.a=a.geR()
this.b=a}else{this.a=P.V(a,!0,H.j(this,0))
this.b=null}},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
l:function(a,b,c){var z
if(c==null)H.i(P.z("null element"))
z=this.geY()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
p:function(a,b){var z
if(b==null)H.i(P.z("null element"))
z=this.geY();(z&&C.a).p(z,b)},
aL:function(a,b){var z=this.a
z.toString
z=new H.am(z,b,[null,null]).bi(0,!0)
this.a=z
this.b=null
this.hv(z)},
geY:function(){if(this.b!=null){this.a=P.V(this.a,!0,H.j(this,0))
this.b=null}return this.a},
aE:function(){if(new H.af(H.S(H.j(this,0)),null).A(0,C.m))throw H.c(new P.P('explicit element type required, for example "new ListBuilder<int>"'))},
hv:function(a){var z,y,x,w
for(z=a.length,y=H.j(this,0),x=0;x<a.length;a.length===z||(0,H.ak)(a),++x){w=a[x]
if(!H.cL(w,y))throw H.c(P.z("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",ce:{"^":"d;hR:a<,b,c,d,$ti",
a6:function(a){var z=new A.db(null,null,this.$ti)
z.c8()
z.q(this)
a.$1(z)
return z.t()},
C:function(){return new S.ip(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gbT()
z=H.br(z,new A.i8(this),H.w(z,"x",0),null)
z=P.V(z,!1,H.w(z,"x",0))
C.a.er(z)
z=X.bj(z)
this.b=z}return z},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$isce)return!1
y=b.a
x=this.a
if(y.gk(y)!==x.gk(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbT()
this.c=z}z=z.gZ(z)
for(;z.w();){v=z.gF()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
j:function(a){return J.h(this.a)},
h:function(a,b){return this.a.h(0,b)},
I:function(a,b){this.a.I(0,b)},
gH:function(a){var z=this.a
return z.gH(z)},
ga5:function(a){var z=this.a
return z.ga5(z)},
gk:function(a){var z=this.a
return z.gk(z)},
c8:function(){if(new H.af(H.S(H.j(this,0)),null).A(0,C.m))throw H.c(new P.P('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.af(H.S(H.j(this,1)),null).A(0,C.m))throw H.c(new P.P('explicit value type required, for example "new BuiltMap<int, int>"'))}},i8:{"^":"a:0;a",
$1:function(a){var z,y
z=J.l(a)
y=J.l(this.a.a.h(0,a))
return X.dJ(X.bd(X.bd(0,J.l(z)),J.l(y)))}},db:{"^":"d;a,b,$ti",
t:function(){var z=this.b
if(z==null){z=new A.ce(this.a,null,null,null,this.$ti)
z.c8()
this.b=z}return z},
q:function(a){var z
if(H.aA(a,"$isce",this.$ti,null)){this.b=a
this.a=a.ghR()}else if(!!a.$isce){z=P.bP(a.a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else if(!!a.$isE){z=P.bP(a,H.j(this,0),H.j(this,1))
this.b=null
this.a=z}else throw H.c(P.z("expected Map or BuiltMap, got "+H.b(a.gb7(a))))},
h:function(a,b){return this.a.h(0,b)},
l:function(a,b,c){if(c==null)H.i(P.z("null value"))
this.gi3().l(0,b,c)},
gi3:function(){if(this.b!=null){this.a=P.bP(this.a,H.j(this,0),H.j(this,1))
this.b=null}return this.a},
c8:function(){if(new H.af(H.S(H.j(this,0)),null).A(0,C.m))throw H.c(new P.P('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.af(H.S(H.j(this,1)),null).A(0,C.m))throw H.c(new P.P('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",cX:{"^":"d;i5:a<,b,$ti",
a6:function(a){var z=new L.b6(null,null,this.$ti)
z.b9()
z.q(this)
a.$1(z)
return z.t()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.V(new H.bo(z,new L.i9(),[H.j(z,0),null]),!1,null)
C.a.er(z)
z=X.bj(z)
this.b=z}return z},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$iscX)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gB(b)
x=this.gB(this)
if(z==null?x!=null:z!==x)return!1
return y.iA(b)},
j:function(a){return J.h(this.a)},
gk:function(a){return this.a.a},
bV:function(a){return this.a.bV(a)},
gZ:function(a){var z,y
z=this.a
y=new P.ag(z,z.r,null,null,[null])
y.c=z.e
return y},
aL:function(a,b){var z=this.a
z.toString
return new H.bo(z,b,[H.j(z,0),null])},
Y:function(a,b){return this.a.Y(0,b)},
I:function(a,b){return this.a.I(0,b)},
bj:function(a){return new A.iq(!0,this.a,this.$ti)},
gH:function(a){return this.a.a===0},
ga5:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
b9:function(){if(new H.af(H.S(H.j(this,0)),null).A(0,C.m))throw H.c(new P.P('explicit element type required, for example "new BuiltSet<int>"'))}},i9:{"^":"a:0;",
$1:function(a){return J.l(a)}},b6:{"^":"d;a,b,$ti",
t:function(){var z=this.b
if(z==null){z=new L.cX(this.a,null,this.$ti)
z.b9()
this.b=z}return z},
q:function(a){var z,y,x,w
if(H.aA(a,"$iscX",this.$ti,null)){this.a=a.gi5()
this.b=a}else{z=H.j(this,0)
y=P.H(null,null,null,z)
for(x=J.ab(a);x.w();){w=x.gF()
if(H.cL(w,z))y.p(0,w)
else throw H.c(P.z("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
p:function(a,b){if(b==null)H.i(P.z("null element"))
this.geZ().p(0,b)},
aL:function(a,b){var z=this.a
z.toString
z=P.aS(new H.bo(z,b,[H.j(z,0),null]),null)
this.b=null
this.a=z
this.i6(z)},
geZ:function(){if(this.b!=null){this.a=P.aS(this.a,H.j(this,0))
this.b=null}return this.a},
b9:function(){if(new H.af(H.S(H.j(this,0)),null).A(0,C.m))throw H.c(new P.P('explicit element type required, for example "new SetBuilder<int>"'))},
i6:function(a){var z,y,x
for(z=new P.ag(a,a.r,null,null,[null]),z.c=a.e,y=H.j(this,0);z.w();){x=z.d
if(!H.cL(x,y))throw H.c(P.z("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.D(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
a2:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",kW:{"^":"kU;ch,cx,aq:cy@,bl:db@,b,c,d,e,f,r,x,y,z,Q,a",
fB:function(){var z=$.$get$c5()
z.l(0,"game",this.cx)
z.l(0,"hitpoints",this.cy)
z.l(0,"stamina",this.db)},
j6:function(){var z,y,x
this.cx=null
this.cy=Z.cB("Health",new N.kZ(),"#CCCCCC","Your physical state",100,0,!0,P.aB)
z=Z.cB("Stamina",new N.l_(),"#CCCCCC","Spare physical energy",0,0,!0,P.v)
this.db=z
y=$.$get$bH()
x=this.cy
y=new O.ed(N.b1("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,null,new Y.ay(H.t([],[Y.a3]),0,P.aG()),x,z,O.pA(),O.pz(),O.py(),y,this.gh8(),new P.bA(""),!1,null)
y.h6()
this.cx=y
y.x="endGame"
$.$get$c1().p(0,0)},
hj:function(){var z,y
z=new O.cz(["<p class='meta'>Debug version from Wed, May 3, 2017.</p>",[null,P.a8(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.l(0,"start",z)
z.a="start"
z=new O.cz([new N.kY(this),[null,P.a8(["goto","gameLoop"])]],0,null,!1,!1)
y.l(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cz(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.l(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
v:{
kX:function(){var z,y,x,w
z=Z.cB("Health",new N.oW(),"#CCCCCC","Your physical state",100,0,!0,P.aB)
y=Z.cB("Stamina",new N.oX(),"#CCCCCC","Spare physical energy",0,0,!0,P.v)
x=P.m
w=new H.O(0,null,null,null,null,null,0,[x,O.cz])
x=new N.kW("net.filiph.edgehead.0.0.1",null,z,y,new O.l0(w),null,null,null,P.H(null,null,null,x),!1,null,-9999,null,null,null)
x.hj()
return x}}},oW:{"^":"a:14;",
$1:function(a){var z=J.p(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.bG(a,0.5))return"\ud83d\ude23"
if(z.au(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},oX:{"^":"a:8;",
$1:function(a){return H.b(a)+" S"}},kY:{"^":"a:13;a",
$0:function(){var z=0,y=new P.al(),x=1,w,v=this
var $async$$0=P.ai(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.u(v.a.cx.b6(),$async$$0,y)
case 2:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$$0,y)}},kZ:{"^":"a:14;",
$1:function(a){var z=J.p(a)
if(z.A(a,0))return"\ud83d\udc80"
if(z.bG(a,0.5))return"\ud83d\ude23"
if(z.au(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},l_:{"^":"a:8;",
$1:function(a){return H.b(a)+" S"}}}],["","",,O,{"^":"",
qs:[function(a){var z,y
z=a.gbI()
y=a.gbu()
if(typeof y!=="number")return H.D(y)
return z-2*y},"$1","cN",2,0,19],
qx:[function(a){var z,y,x
z=a.gbI()
y=a.gcs()
if(typeof y!=="number")return H.D(y)
x=a.gbu()
if(typeof x!=="number")return H.D(x)
return z+y-x},"$1","h0",2,0,19],
ed:{"^":"jM;y,z,Q,ch,cx,cy,db,dx,dy,fr,bk:fx<,fy,es:go<,aq:id<,bl:k1<,a,b,c,d,e,f,r,x",
h6:function(){var z,y,x,w,v
z=[P.m]
y=H.t([],z)
x=P.H(null,null,null,null)
w=$.$get$cQ()
x=new R.ba(null,!0,y,null,null,C.h,1,1,0,null,100,!0,!1,x,null,null,!0,C.j,null,w,null)
new O.iP().$1(x)
this.cy=x.t()
y=new R.ba(null,!0,H.t([],z),null,null,C.h,1,1,0,null,100,!0,!1,P.H(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iQ().$1(y)
this.db=y.t()
y=[Q.G]
x=new S.aw(null,null,y)
x.aE()
x.q([new Q.G("tunnel","Run towards freedom","You and Briana sprint through the giant worm\u2019s tunnel.",null)])
this.dx=new K.bw(x.t(),"deadEscapee","UNUSED because this is the first choice","",null,null,"ground")
x=$.$get$dR().b
y=new S.aw(null,null,y)
y.aE()
y.q([new Q.G(x,"Continue","You finally arrive to the cave's entrance.",null)])
this.dy=new K.bw(y.t(),"tunnel","Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)","",new O.iR(this),null,"{rock|cavern} floor")
y=new R.ba(null,!0,H.t([],z),null,null,C.h,1,1,0,null,100,!0,!1,P.H(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iS(this).$1(y)
y=y.t()
this.ch=y
this.id.sat(y.r/y.cx)
this.k1.sat(this.ch.fx)
w=new R.ba(null,!0,H.t([],z),null,null,C.h,1,1,0,null,100,!0,!1,P.H(null,null,null,null),null,null,!0,C.j,null,w,null)
new O.iT(this).$1(w)
this.cx=w.t()
this.fr=F.eK(this.dx,!1)
z=K.bw
v=P.V($.$get$fU(),!0,z)
C.a.ag(v,[this.dx,this.dy,$.$get$dQ()])
y=this.ch
x=this.cx
w=this.fr
x=P.aS([y,x],R.T)
y=P.aU(null,O.c8)
w=new A.ao(x,P.H(null,null,null,U.d3),y,P.aS(v,z),P.V([w],!0,S.ae),0)
this.fx=w
z=new Y.ay(H.t([],[Y.a3]),0,P.aG())
z.b=w.f
this.fy=new B.bs(w,null,z,1,1,!0,!1,!1,0)},
cv:function(){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$cv=P.ai(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.go
s=u.giM()
if(t.fw(s)){z=1
break}r=u.fx.ae(u.ch.x)
q=r.gaq()
p=r.gfp()
if(typeof q!=="number"){x=q.d7()
z=1
break}u.id.sat(q/p)
u.k1.sat(r.gbl())
p=u.y
p.fm("update() for world at time "+u.fx.f)
q=u.fx.e
if(q.length===0){u.r=!0
t.bd(0,"\n\n",!0)
if(u.fx.j1(u.ch.x))t.bd(0,"TO BE CONTINUED.",!0)
else t.bd(0,"You died.",!0)
u.f.u+=t.cp()
z=1
break}o=C.a.gE(q)
n=o.d9(u.fx)
q=u.fx
m=N.b1("ActorPlanner")
l=new H.O(0,null,null,null,null,null,0,[null,null])
k=n==null
j=k?n:n.gm()
i=new Y.ay(H.t([],[Y.a3]),0,P.aG())
i.b=q.f
h=new G.hC(m,j,new B.bs(q,null,i,1,1,!0,!1,!1,0),0,!1,l)
if(k)H.i(P.z("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.h(q)+". Situation: "+H.b(q.giC())))
z=3
return P.u(h.jy(),$async$cv,y)
case 3:if(l.gH(l)){m.ej("There are no actions available for actorId="+H.b(j)+".")
k="Actions not available for "+H.b(j)+" and "
j=J.p(q)
q="PlanConsequence<"+j.gB(q)+", "+j.j(q)+", "+C.q.j(null)
m.bv(k+(q+", 1, 0, >")+".")}q=Z.kd(l)
g=new Z.kc(new P.fu(l,[null,null]),q)
if(l.gH(l))$.$get$bt().ej("Created with no recommendations.")
if(q.length===0){p.dd("No recommendation for "+H.b(n.gi()))
p.dd(new O.iV(u))
u.fx.fb(o.gm());++u.fx.f
z=1
break}z=n.gJ()?4:6
break
case 4:s=q.length
if(s>1)for(f=0;m=q.length,f<m;m===s||(0,H.ak)(q),++f);u.f.u+=t.cp()
C.a.sk(t.a,0)
p.bv("planner.generateTable for "+H.b(n.gi()))
h.ek().I(0,new O.iW(u))
t=g.fA(6,O.h0())
t.toString
e=P.V(t,!1,H.w(t,"x",0))
t=new O.iX(new O.iZ())
s=e.length-1
if(s-0<=32)H.eX(e,0,s,t)
else H.eW(e,0,s,t)
for(t=e.length,s=u.c,f=0;f<e.length;e.length===t||(0,H.ak)(e),++f){d=e[f]
s.$3$helpMessage$script(d.gX(),d.gU(),new O.iY(u,n,d))}z=1
break
z=5
break
case 6:q=n.gfa()
z=7
return P.u(u.c1(g.jx(q==null?O.h0():q),n,t),$async$cv,y)
case 7:case 5:t.fw(s)
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$cv,y)},
c1:function(a,b,c){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r
var $async$c1=P.ai(function(d,e){if(d===1){v=e
z=w}while(true)switch(z){case 0:t=a.cQ(b,u.fy,u.fx)
s=P.V(t,!0,H.w(t,"x",0))
z=b.gJ()?3:5
break
case 3:z=6
return P.u(u.cH(a,b,s),$async$c1,y)
case 6:z=4
break
case 5:r=S.ku(new H.am(s,new O.iO(),[null,null]),1)
if(r>=s.length){x=H.e(s,r)
z=1
break}u.fy=s[r]
case 4:C.a.ag(c.a,u.fy.ges().a)
u.fx=u.fy.gbk()
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c1,y)},
cH:function(a,b,c){var z=0,y=new P.al(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k,j
var $async$cH=P.ai(function(d,e){if(d===1){w=e
z=x}while(true)switch(z){case 0:u=a.L(b,v.fx)
z=u===1?2:4
break
case 2:v.fy=C.a.gbJ(c)
z=3
break
case 4:z=u===0?5:7
break
case 5:v.fy=C.a.gbJ(c)
z=6
break
case 7:t=C.a.gE(J.h(a.gR()).split("."))
s=a.af(b,v.fx)
r=a.gS()&&b.j2(a.gR())
q="use "+H.b(t)
v.eU()
z=8
return P.u(v.e.$4$rerollEffectDescription$rerollable(u,s,q,r),$async$cH,y)
case 8:p=e
r=new H.K(c,new O.iM(p),[H.j(c,0)])
v.fy=r.gbJ(r)
if(p.gjU()===!0){o=A.dy(v.fy.gbk())
o.ak(b.gm(),new O.iN())
s=v.fy
r=s.gf0()
q=H.t([],[Y.a3])
n=new Y.ay(q,0,P.aG())
C.a.ag(q,s.c.a)
q=s.d
m=s.e
l=s.f
k=s.r
j=s.x
s=s.y
n.b=o.f
v.fy=new B.bs(o,r,n,q,m,l,k,j,s)}case 6:case 3:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$cH,y)}},
iP:{"^":"a:0;",
$1:function(a){var z
a.gn()
a.y=1000
a.gn()
a.cy="orc"
a.gn()
a.dx=!1
a.gn()
a.dy=C.u
z=$.$get$ar()
a.gn()
a.c=new U.bB(!1,10,!0,z,"sword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
z=$.$get$c2()
a.gn()
a.fx=z
a.gn()
a.fy=O.cN()
return a}},
iQ:{"^":"a:0;",
$1:function(a){var z
a.gn()
a.y=1001
a.gn()
a.cy="goblin"
a.gn()
a.dx=!1
a.gn()
a.dy=C.u
z=$.$get$ar()
a.gn()
a.c=new U.bB(!1,10,!0,z,"scimitar",C.c)
z=$.$get$c2()
a.gn()
a.fx=z
a.gn()
a.fy=O.cN()
return a}},
iR:{"^":"a:0;a",
$1:function(a){var z=this.a
return[z.cy,z.db]}},
iS:{"^":"a:0;a",
$1:function(a){var z
a.gn()
a.y=1
a.gn()
a.ch=!0
a.gn()
a.dy=C.A
a.gn()
a.cy="Filip"
z=$.$get$ar()
a.gn()
a.c=new U.bB(!1,10,!0,z,"sword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
a.gn()
a.x=1
a.gn()
a.z=1000
z=this.a.dx.b
a.gn()
a.db=z
return a}},
iT:{"^":"a:0;a",
$1:function(a){var z,y
a.gn()
a.y=100
a.gn()
a.dy=C.W
a.gn()
a.cy="Briana"
z=$.$get$ar()
a.gn()
a.c=new U.bB(!1,10,!0,z,"longsword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
z=this.a
y=z.dx.b
a.gn()
a.db=y
z=z.ch.x
a.gn()
a.fr=z
return a}},
iV:{"^":"a:1;a",
$0:function(){var z=this.a.fx.c
return"- how we got here: "+new H.am(z,new O.iU(),[H.j(z,0),null]).cW(0," <- ")}},
iU:{"^":"a:0;",
$1:function(a){return a.gaS()}},
iW:{"^":"a:0;a",
$1:function(a){return this.a.y.bv(a)}},
iZ:{"^":"a:36;",
$1:function(a){if(a instanceof Q.M)return H.b(a.b.gi())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
iX:{"^":"a:5;a",
$2:function(a,b){var z=this.a
return J.c7(z.$1(a),z.$1(b))}},
iY:{"^":"a:13;a,b,c",
$0:function(){var z=0,y=new P.al(),x=1,w,v=this,u
var $async$$0=P.ai(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:u=v.a
z=2
return P.u(u.c1(v.c,v.b,u.go),$async$$0,y)
case 2:return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$$0,y)}},
iO:{"^":"a:0;",
$1:function(a){return a.gjz()}},
iM:{"^":"a:0;a",
$1:function(a){return a.ge4()===this.a.ge4()}},
iN:{"^":"a:0;",
$1:function(a){var z=a.gbl()
if(typeof z!=="number")return z.aP()
a.sbl(z-1)
return a}}}],["","",,Q,{"^":"",
h2:function(a,b,c){return new P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$h2(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=t.length!==0?C.a.gE(t):null
s=J.hz(t.aO(y.a,y),new Q.pb(z))
t=J.ab(s.a),r=new H.fv(t,s.b,[H.j(s,0)])
case 2:if(!r.w()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gV()&&!z.e_(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
h3:function(a,b,c){return new P.aN(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$h3(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.e
t=y.cA((t.length!==0?C.a.gE(t):null).gb1()).giQ().a,t=new J.bJ(t,t.length,0,null,[H.j(t,0)])
case 2:if(!t.w()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aL()
case 1:return P.aM(u)}}})},
pb:{"^":"a:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gb3()}},
kF:{"^":"d;a,b",
j:function(a){return this.b},
v:{"^":"q8<"}},
ac:{"^":"d;",
cQ:function(a,b,c){var z=this
return new P.aN(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cQ(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.L(y,x.gbk())
v=s>0?2:3
break
case 2:r=A.dy(w)
v=4
return B.eD(r,x,z,z.hs(r,y,w,z.gM(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dy(w)
v=7
return B.eD(r,x,z,z.hr(r,y,w,z.gO(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aL()
case 1:return P.aM(t)}}})},
eA:function(a,b,c,d,e,f){var z,y,x,w,v,u
z=a.a.av(0,new Q.hA(b))
y=new O.e1(null,null,null,null,null,null,null,null,null,null,null)
x=this.gi()
y.ga0().c=x
x=b.gm()
y.ga0().f=x
y.ga0().e=C.O
y.ga0().Q=f
y.ga0().z=e
x=this.gV()
y.ga0().y=x
if(!!this.$isM){x=y.ga0()
w=x.r
if(w==null){w=new L.b6(null,null,[P.v])
w.b9()
w.q(C.k)
x.r=w
x=w}else x=w
w=this.b.gm()
x.toString
if(w==null)H.i(P.z("null element"))
x.geZ().p(0,w)}v=new Y.ay(H.t([],[Y.a3]),0,P.aG())
x=a.e
u=(x.length!==0?C.a.gE(x):null).gm()
a.gB(a);(x.length!==0?C.a.gE(x):null).fv(a,v)
this.a=d.$3(z,a,v)
if(a.cK(u)!=null)a.fb(u);++a.f
w=a.em(u)
if(!(w==null))w.fu(a,v)
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.d9(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.f(w==null?w:w.de(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
C.a.gE(x).bx(a)
C.a.bY(x)}if(this.a==null)H.i(new P.F("No description given when executing "+this.j(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga0().d=x
x=a.f
y.ga0().x=x
a.c.f3(y.t())
return v},
hs:function(a,b,c,d,e){return this.eA(a,b,c,d,!1,e)},
hr:function(a,b,c,d,e){return this.eA(a,b,c,d,e,!1)}},
hA:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a.gm())}},
M:{"^":"ac;bu:b<",
gX:function(){var z=new Y.ay(H.t([],[Y.a3]),0,P.aG())
z.ik(0,this.ga9(),this.b)
return z.cp()},
af:function(a,b){var z=new Y.ay(H.t([],[Y.a3]),0,P.aG())
z.ip(0,this.gac(),this.b,a,!0)
return z.cp()},
j:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga9()+"::enemy="+H.b(z.gm())+"/"+H.b(z.gi())+">"}},
ck:{"^":"ac;",
gX:function(){return this.b.gX()},
j:function(a){return"ExitAction<"+this.b.gX()+">"}}}],["","",,O,{"^":"",c8:{"^":"d;",
j:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},jD:{"^":"d;a,b",
j:function(a){return this.b}},mT:{"^":"c8;a,f1:b<,aS:c<,d,eb:e<,ev:f<,N:r<,fR:x<,y,fS:z<",
a6:function(a){var z=new O.e1(null,null,null,null,null,null,null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof O.c8))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.f(this.e,b.e))if(J.f(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)),J.l(this.f)),J.l(this.r)),J.l(this.x)),J.l(this.y)),J.l(this.z)))},
j:function(a){return"ActionRecord {accomplices="+J.h(this.a)+",\nactionName="+J.h(this.b)+",\ndescription="+H.b(J.h(this.c))+",\nknownTo="+J.h(this.d)+",\nprotagonist="+H.b(J.h(this.e))+",\nsufferers="+J.h(this.f)+",\ntime="+J.h(this.r)+",\nwasAggressive="+J.h(this.x)+",\nwasFailure="+J.h(this.y)+",\nwasSuccess="+J.h(this.z)+",\n}"}},e1:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q",
gf1:function(){return this.ga0().c},
gaS:function(){return this.ga0().d},
geb:function(){return this.ga0().f},
gev:function(){var z,y
z=this.ga0()
y=z.r
if(y==null){y=new L.b6(null,null,[P.v])
y.b9()
y.q(C.k)
z.r=y
z=y}else z=y
return z},
gN:function(){return this.ga0().x},
gfR:function(){return this.ga0().y},
gfS:function(){return this.ga0().Q},
ga0:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.b6(null,null,[H.j(z,0)])
y.b9()
y.q(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.b6(null,null,[H.j(z,0)])
y.b9()
y.q(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
if(z==null){y=this.ga0()
x=y.b
if(x==null){x=new L.b6(null,null,[P.v])
x.b9()
x.q(C.k)
y.b=x
y=x}else y=x
y=y==null?y:y.t()
x=this.ga0().c
w=this.ga0().d
v=this.ga0().e
u=this.ga0().f
t=this.ga0()
s=t.r
if(s==null){s=new L.b6(null,null,[P.v])
s.b9()
s.q(C.k)
t.r=s
t=s}else t=s
t=t==null?t:t.t()
s=this.ga0().x
r=this.ga0().y
q=this.ga0().z
p=this.ga0().Q
z=new O.mT(y,x,w,v,u,t,s,r,q,p)
if(y==null)H.i(P.n("accomplices"))
if(x==null)H.i(P.n("actionName"))
if(w==null)H.i(P.n("description"))
if(v==null)H.i(P.n("knownTo"))
if(u==null)H.i(P.n("protagonist"))
if(t==null)H.i(P.n("sufferers"))
if(s==null)H.i(P.n("time"))
if(r==null)H.i(P.n("wasAggressive"))
if(q==null)H.i(P.n("wasFailure"))
if(p==null)H.i(P.n("wasSuccess"))}this.q(z)
return z}}}],["","",,R,{"^":"",
h4:function(a,b){return new P.aN(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$h4(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bY(new H.K(u,new R.pc(z),[H.j(u,0)]))
case 3:return P.aL()
case 1:return P.aM(v)}}})},
pc:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gdY()
y=this.a.gm()
return z==null?y==null:z===y}},
T:{"^":"jT;",
gbh:function(){return this.r>0},
gaV:function(){return this.dx===C.l},
gad:function(){return this.dx===C.o},
gab:function(){return this.dx===C.h},
j2:function(a){return this.fx>=1},
e_:function(a,b){return this.fl(a,b)>0},
fl:function(a,b){var z,y
if(this.e3(b)){z=a.gaX()
y=this.fy.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hN(a,b,10))return 1
z=a.gaX()
y=this.fy.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
e3:function(a){var z,y
z=a.bZ("Confuse",this,!0)
if(z==null)return!1
y=a.jK("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cD:function(a){var z,y,x
z=a.ae(this.x)
y=z.gaq()
if(typeof y!=="number")return H.D(y)
x=2*y
if(!z.gbh())x-=10
y=a.a
return new A.c9(x,new H.K(y,new R.i4(this),[H.j(y,0)]).aU(0,0,new R.i5()),y.aU(0,0,new R.i6(this,a)))},
aA:function(a){var z=this.e
return z!=null&&z.a===a},
hN:function(a,b,c){var z=b.jL(a,this,!0)
if(z==null)return!1
return z<=c},
$isbp:1},
jT:{"^":"d+d_;"},
i4:{"^":"a:0;a",
$1:function(a){return J.f(a.gaX(),this.a.fy)}},
i5:{"^":"a:38;",
$2:function(a,b){return J.a_(J.a_(a,b.gb3()?2:0),2*b.gaq())}},
i6:{"^":"a:40;a,b",
$2:function(a,b){var z=b.gb3()?1:0
return J.a_(a,(z+b.gaq())*this.a.fl(b,this.b))}},
hB:{"^":"d;a2:c<,az:e?,aq:f@,bl:x<,m:y<,J:ch<,i:cy@,b1:db@,G:dy<,dY:fr<,aX:fx<"},
di:{"^":"d;a,b",
j:function(a){return this.b}},
mU:{"^":"T;a,b,fa:c<,b1:d<,a2:e<,dY:f<,aq:r<,m:x<,y,e1:z<,J:Q<,ch,fp:cx<,i:cy<,cX:db<,dx,G:dy<,fr,bl:fx<,aX:fy<",
a6:function(a){var z=new R.ba(null,!0,H.t([],[P.m]),null,null,C.h,1,1,0,null,100,!0,!1,P.H(null,null,null,null),null,null,!0,C.j,null,$.$get$cQ(),null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.T))return!1
if(this.b===b.b)if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y)if(this.r===b.r){z=this.x
y=b.x
if(z==null?y==null:z===y)if(this.y===b.y)if(this.Q===b.Q)if(this.ch===b.ch)if(this.cx===b.cx){z=this.cy
y=b.cy
if(z==null?y==null:z===y)if(this.db===b.db)if(this.dx===b.dx)if(this.dy===b.dy)z=this.fx===b.fx&&J.f(this.fy,b.fy)
else z=!1
else z=!1
else z=!1
else z=!1}else z=!1
else z=!1
else z=!1
else z=!1
else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,C.p.gB(!0)),H.a1(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)),J.l(this.f)),this.r&0x1FFFFFFF),J.l(this.x)),this.y&0x1FFFFFFF),C.p.gB(!0)),C.p.gB(this.Q)),H.a1(this.ch)),this.cx&0x1FFFFFFF),J.l(this.cy)),C.p.gB(this.db)),H.a1(this.dx)),H.a1(this.dy)),C.q.gB(this.fr)),this.fx&0x1FFFFFFF),J.l(this.fy)))},
j:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.b0(this.b,"[","]")+",\ncombineFunction="+J.h(this.c)+",\ncurrentRoomName="+J.h(this.d)+",\ncurrentWeapon="+J.h(this.e)+",\nfollowingActorId="+J.h(this.f)+",\nhitpoints="+C.i.j(this.r)+",\nid="+J.h(this.x)+",\ninitiative="+C.d.j(this.y)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.Q)+",\nitems="+P.b0(this.ch,"{","}")+",\nmaxHitpoints="+C.d.j(this.cx)+",\nname="+J.h(this.cy)+",\nnameIsProperNoun="+String(this.db)+",\npose="+this.dx.b+",\npronoun="+this.dy.a+",\nshield="+C.q.j(this.fr)+",\nstamina="+C.i.j(this.fx)+",\nteam="+J.h(this.fy)+",\n}"}},
ba:{"^":"hB;go,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
gfa:function(){this.gn()
return this.fy},
gb1:function(){this.gn()
return this.db},
sb1:function(a){this.gn()
this.db=a},
ga2:function(){this.gn()
return this.c},
gdY:function(){this.gn()
return this.fr},
gaq:function(){this.gn()
return this.f},
saq:function(a){this.gn()
this.f=a},
gm:function(){this.gn()
return this.y},
gJ:function(){this.gn()
return this.ch},
gfp:function(){this.gn()
return this.r},
gi:function(){this.gn()
return this.cy},
si:function(a){this.gn()
this.cy=a},
gcX:function(){this.gn()
return this.dx},
saz:function(a){this.gn()
this.e=a},
gG:function(){this.gn()
return this.dy},
gbl:function(){this.gn()
return this.x},
sbl:function(a){this.gn()
this.x=a},
gaX:function(){this.gn()
return this.fx},
gn:function(){if(this.go!=null){this.a=!0
this.b=this.go.b
this.fy=this.go.c
this.db=this.go.d
this.c=this.go.e
this.fr=this.go.f
this.f=this.go.r
this.y=this.go.x
this.z=this.go.y
this.go.z
this.Q=!0
this.ch=this.go.Q
this.cx=this.go.ch
this.r=this.go.cx
this.cy=this.go.cy
this.dx=this.go.db
this.e=this.go.dx
this.dy=this.go.dy
this.d=this.go.fr
this.x=this.go.fx
this.fx=this.go.fy
this.go=null}return this},
q:function(a){this.go=a},
t:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.go
if(z==null){this.gn()
this.a
this.gn()
y=this.b
this.gn()
x=this.fy
this.gn()
w=this.db
this.gn()
v=this.c
this.gn()
u=this.fr
this.gn()
t=this.f
this.gn()
s=this.y
this.gn()
r=this.z
this.gn()
this.Q
this.gn()
q=this.ch
this.gn()
p=this.cx
this.gn()
o=this.r
this.gn()
n=this.cy
this.gn()
m=this.dx
this.gn()
l=this.e
this.gn()
k=this.dy
this.gn()
j=this.d
this.gn()
i=this.x
this.gn()
h=this.fx
z=new R.mU(!0,y,x,w,v,u,t,s,r,!0,q,p,o,n,m,l,k,j,i,h)
if(s==null)H.i(P.n("id"))
if(n==null)H.i(P.n("name"))
if(h==null)H.i(P.n("team"))}this.q(z)
return z}}}],["","",,A,{"^":"",c9:{"^":"d;bI:a<,cs:b<,bu:c<",
aP:function(a,b){return new A.a6(this.a-b.gbI(),J.as(this.b,b.gcs()),J.as(this.c,b.gbu()))},
j:function(a){return"ActorScore<self="+C.i.ct(this.a,2)+",team="+J.bm(this.b,2)+",enemy="+J.bm(this.c,2)+">"}},a6:{"^":"d;bI:a<,cs:b<,bu:c<",
gjh:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
bH:function(a,b){return new A.a6(this.a*b,J.bl(this.b,b),J.bl(this.c,b))},
a4:function(a,b){return new A.a6(this.a+b.gbI(),J.a_(this.b,b.gcs()),J.a_(this.c,b.gbu()))},
d7:function(a,b){if(typeof b!=="number")return H.D(b)
return new A.a6(this.a/b,J.bk(this.b,b),J.bk(this.c,b))},
j:function(a){return"ActorScoreChange<self="+C.i.ct(this.a,2)+",team="+J.bm(this.b,2)+",enemy="+J.bm(this.c,2)+">"},
v:{
i3:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ak)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.D(r)
w+=r
r=s.c
if(typeof r!=="number")return H.D(r)
v+=r}if(y===0)throw H.c(P.z("Cannot average empty iterable"))
return new A.a6(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
pP:function(a){switch(a){case C.I:return"spear"
case C.J:return"branch"
case C.K:return"tent"
case C.c:return"sword"
default:throw H.c(P.z(a))}},
d3:{"^":"jU;ei:a<",
gaS:function(){return U.pP(this.a)},
$isbp:1},
jU:{"^":"d+d_;"},
cm:{"^":"d;a,b",
j:function(a){return this.b}},
bB:{"^":"d3;b,c,e1:d<,aX:e<,i:f<,a",
gm:function(){return H.a1(this)},
gbh:function(){return!1},
gJ:function(){return!1},
gcX:function(){return!1},
gG:function(){return C.j}}}],["","",,G,{"^":"",jM:{"^":"d;",
eU:function(){var z,y
z=this.f
y=z.u
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.u=""}},
k9:[function(a){this.f.u+=a},"$1","giM",2,0,15],
b6:function(){var z=0,y=new P.al(),x,w=2,v,u=this,t,s
var $async$b6=P.ai(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.x==null)throw H.c(new P.F("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.r){u.d.sk(0,0)
u.a.$1(u.x)
z=1
break}t=u.d
s=u.f
case 3:if(!!0){z=4
break}if(!(!u.r&&t.gk(t)===0&&s.u.length===0)){z=4
break}z=5
return P.u(u.cv(),$async$b6,y)
case 5:z=3
break
case 4:u.eU()
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$b6,y)}}}],["","",,B,{"^":"",e9:{"^":"d;cC:a<,cU:b<,cm:c<",
j:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.i.ct(this.b,3)+", score="+this.a.j(0)+">"}},bs:{"^":"d;bk:a<,f0:b<,es:c<,jz:d<,cU:e<,f,r,e4:x<,cm:y<",
gB:function(a){return X.bj([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
A:function(a,b){var z
if(b==null)return!1
z=J.p(b)
return!!z.$isbs&&this.gB(this)===z.gB(b)},
j:function(a){var z,y
z=this.a
y=J.p(z)
z="PlanConsequence<"+y.gB(z)+", "+y.j(z)+", "+J.h(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
eD:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gcU()
z=z?0:b.gcm()+1
d.b=a.f
return new B.bs(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",hC:{"^":"d;a,b,c,d,e,f",
iy:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
z.a3("...")
z.a3("combining scores")
y=H.t([],[A.a6])
x=new G.hX()
for(w=J.ab(a),v=b.a,u=b.b,t=b.c,s=null;w.w();){r=w.gF()
z.a3(new G.hV(r))
if(r.gcU()>0.15)if(s==null){z.a3("    - first _bestCase")
s=r}else if(J.a0(x.$1(r.gcC()),x.$1(s.gcC()))){z.a3("    - new _bestCase")
s=r}q=r.gcC()
p=J.as(q.b,u)
o=J.as(q.c,t)
n=r.b
m=new A.a6((q.a-v)*n,J.bl(p,n),J.bl(o,n))
z.a3(new G.hW(m))
y.push(m)}l=A.i3(y)
x=s==null
if(x)k=C.C
else{w=s.gcC()
k=new A.a6(w.a-v,J.as(w.b,u),J.as(w.c,t))}x=x?s:s.gcm()
if(typeof x!=="number")return H.D(x)
x=new A.a6(k.a/x,J.bk(k.b,x),J.bk(k.c,x))
z.a3("- uplifts average = "+("ActorScoreChange<self="+C.i.ct(l.a,2)+",team="+J.bm(l.b,2)+",enemy="+J.bm(l.c,2)+">"))
z.a3("- best = "+x.j(0))
j=x.a4(0,l)
z.a3("- result = "+j.j(0))
return j},
ek:function(){var z=this
return new P.aN(function(){var y=0,x=1,w,v,u,t,s
return function $async$ek(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbT(),u=u.gZ(u),t=1
case 2:if(!u.w()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aL()
case 1:return P.aM(w)}}})},
cY:function(a,b,c){var z=0,y=new P.al(),x=1,w,v=this,u,t,s,r,q,p,o,n,m,l,k
var $async$cY=P.ai(function(d,e){if(d===1){w=e
z=x}while(true)switch(z){case 0:u=v.f
u.aJ(0)
t=v.c
s=t.a
r=s.a.av(0,new G.hY(v))
q=r.cD(s)
p=v.a
p.bv("Planning for "+H.b(r.cy)+", initialScore="+q.j(0))
o=new P.aW(v.dz(r,s).a(),null,null,null)
case 2:if(!o.w()){z=3
break}n=o.c
m=n==null?o.b:n.gF()
p.aT(new G.hZ(r,m))
if(m.K(r,s)!==!0){p.aT(new G.i_(m))
z=2
break}z=4
return P.u(v.c5(t,m,b,a,c).c_(0),$async$cY,y)
case 4:l=e
if(J.e_(l)===!0){p.aT(new G.i0(m))
u.l(0,m,C.D)
z=2
break}p.aT(new G.i1(q,m,l))
k=v.iy(l,q,b)
u.l(0,m,k)
p.aT(new G.i2(m,k))
z=2
break
case 3:v.e=!0
return P.u(null,0,y)
case 1:return P.u(w,1,y)}})
return P.u(null,$async$cY,y)},
jy:function(){return this.cY(50,10,null)},
dz:function(a,b){return new P.aN(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p
return function $async$dz(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.bY((u.length!==0?C.a.gE(u):null).gbb())
case 2:u=(u.length!==0?C.a.gE(u):null).gba()
t=u.length
s={func:1,ret:Q.ck,args:[Q.G]}
r={func:1,ret:Q.M,args:[R.T]}
q=0
case 3:if(!(q<u.length)){x=5
break}p=u[q]
x=H.aq(p,r)?6:8
break
case 6:x=9
return P.bY(Q.h2(z,y,p))
case 9:x=7
break
case 8:x=H.aq(p,s)?10:12
break
case 10:x=13
return P.bY(Q.h3(z,y,p))
case 13:x=11
break
case 12:throw H.c(new P.F(p.j(0)+" is not one of the supported ones"))
case 11:case 7:case 4:u.length===t||(0,H.ak)(u),++q
x=3
break
case 5:return P.aL()
case 1:return P.aM(v)}}})},
c5:function(a5,a6,a7,a8,a9){var $async$c5=P.ai(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.av(0,new G.hF(t))
p=t.a
p.aT("=====")
p.aT(new G.hG(a6,q))
p.aT(new G.hH(a6))
if(a6.K(q,r)!==!0){p.aT("- firstAction not applicable")
z=1
break}o=q.cD(r)
p.aT(new G.hN(a5,o))
p.aT(new G.hO(a5))
n=P.aU(null,B.bs)
m=P.H(null,null,null,A.ao)
l=J.p(r)
k=l.gB(r)
for(j=new P.aW(a6.cQ(q,a5,r).a(),null,null,null);j.w();){i=j.c
h=i==null?j.b:i.gF()
if(l.gB(r)!==k)throw H.c(new P.F("Action "+a6.j(0)+" modified world state when producing "+H.b(h)+"."))
n.al(h)}s.a=0
r=t.b
case 3:if(!!n.gH(n)){z=4
break}++s.a
g=n.d_()
p.a3("----")
p.a3(new G.hP(g))
p.a3(new G.hQ(g))
if(g.gcm()>a7||s.a>a8){p.a3(new G.hR(s,a7,g))
p.a3(new G.hS(g))
z=4
break}z=g.gbk().e.length===0?5:6
break
case 5:p.a3("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bf(0,new G.hT(t),new G.hU())
if(q==null){p.a3("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.e9(q.cD(l),g.e,g.y)
p.a3(new G.hI(f))
z=7
x=[1]
return P.cJ(P.fC(f),$async$c5,y)
case 7:z=3
break
case 6:l=g.a
j=l.e
e=(j.length!==0?C.a.gE(j):null).d9(l)
j=l.a
i=new H.K(j,new G.hJ(t),[H.j(j,0)])
d=i.gk(i)
if(d>1)throw H.c(new P.F("World has several duplicates of mainActor: "+J.h(l)))
else if(d===0){p.fm("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.av(0,new G.hK(t))
c=J.f(e,q)
p.a3("- actor: "+H.b(e.gi())+" (isMain=="+c+")")
j=q==null
p.a3("- mainActor: "+H.b(j?q:q.gi()))
b=j?q:q.cD(l)
if(b==null)b=C.E
f=new B.e9(b,g.e,g.y)
p.a3(new G.hL(o,f))
p.a3(new G.hM(g))
z=8
x=[1]
return P.cJ(P.fC(f),$async$c5,y)
case 8:p.a3("- generating all actions for "+H.b(e.gi()))
j=n.c
i=n.b
a=n.a
for(a0=new P.aW(t.dz(e,l).a(),null,null,null);a0.w();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.K(e,l)!==!0)continue
for(a1=new P.aW(a2.cQ(e,g,l).a(),null,null,null);a1.w();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(a4.gcU()<0.05)continue
if(m.Y(0,a4.gbk()))continue
n.al(a4)}}p.a3("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.p(0,l)
z=3
break
case 4:case 1:return P.cJ(null,0,y)
case 2:return P.cJ(v,1,y)}})
var z=0,y=P.nf($async$c5),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.oB(y)}},hX:{"^":"a:45;",
$1:function(a){return J.as(a.b,a.c)}},hV:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},hW:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.j(0)}},hY:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hZ:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.cy)}},i_:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},i0:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},i1:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.au(this.c))+" different ConsequenceStats, initialScore="+this.a.j(0)}},i2:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},hF:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hG:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gi())}},hH:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},hN:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.j(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},hO:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bH(" ",z.y)+"- "+J.h(z.b)}},hP:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gf0().gX()+"'"}},hQ:{"^":"a:1;a",
$0:function(){var z=this.a.gbk().e
return"- situation: "+H.b(J.hr(z.length!==0?C.a.gE(z):null))}},hR:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcm()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},hS:{"^":"a:1;a",
$0:function(){var z=this.a.gbk().c
return"- how we got here: "+new H.am(z,new G.hE(),[H.j(z,0),null]).cW(0," <- ")}},hE:{"^":"a:0;",
$1:function(a){return a.gaS()}},hT:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hU:{"^":"a:1;",
$0:function(){return}},hI:{"^":"a:1;a",
$0:function(){return"- "+this.a.j(0)}},hJ:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hK:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a.b)}},hL:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.j(0)+" (initial="+this.a.j(0)+")"}},hM:{"^":"a:1;a",
$0:function(){var z=this.a.gbk().c
return"- how we got here: "+new H.am(z,new G.hD(),[H.j(z,0),null]).cW(0," <- ")}},hD:{"^":"a:0;",
$1:function(a){return a.gaS()}}}],["","",,Z,{"^":"",kc:{"^":"d;a,b",
gbb:function(){return this.b},
gH:function(a){return this.b.length===0},
fA:function(a,b){var z=this
return new P.aN(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fA(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bY(t)
case 5:w=1
break
case 4:s=z.hH(new Z.kf())
r=z.dw(new Z.kg(),[s])
q=z.dw(new Z.kh(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bt().bv("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bt().bv("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bt().bv("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cF(t,new Z.ki(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.p(m)
if(l.A(m,s)){w=17
break}if(l.A(m,r)){w=17
break}if(l.A(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ak)(t),++n
w=16
break
case 18:case 1:return P.aL()
case 2:return P.aM(u)}}})},
jx:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbJ(y)
C.a.cF(y,new Z.kj(this,a))
x=this.a.a
w=x.gc0().aU(0,1/0,new Z.kk(a))
v=x.gc0().aU(0,-1/0,new Z.kl(a))
x=J.aa(v)
u=J.aa(w)
t=u.aP(w,J.bl(x.aP(v,w),0.1))
z.a=t
if(u.A(w,v)){t=J.as(t,1)
z.a=t
u=t}else u=t
s=x.aP(v,u)
r=P.jK(y.length,new Z.km(z,this,a,s),!1,P.L)
q=new H.am(r,new Z.kn(C.a.aU(r,0,Z.hg())),[null,null]).bi(0,!1)
z=C.a.aU(q,0,Z.hg())
if(typeof z!=="number")return H.D(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.a_(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.kv(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dw:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ak)(z),++u){t=z[u]
if(C.a.Y(b,t))continue
if(w==null||J.a0(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hH:function(a){return this.dw(a,C.k)},
v:{
kd:function(a){var z,y,x
z=a.gbT()
y=H.w(z,"x",0)
x=P.V(new H.K(z,new Z.ke(a),[y]),!1,y)
if(x.length===0)$.$get$bt().ej("After removing actions scored by undefined, there are no recommendations.")
return x},
q6:[function(a,b){return J.a_(a,b)},"$2","hg",4,0,41]}},kf:{"^":"a:0;",
$1:function(a){return a.gbI()}},kg:{"^":"a:0;",
$1:function(a){return J.ho(a.gbu())}},kh:{"^":"a:0;",
$1:function(a){return a.gcs()}},ki:{"^":"a:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c7(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},kj:{"^":"a:5;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.c7(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},kk:{"^":"a:5;a",
$2:function(a,b){return P.pm(a,this.a.$1(b))}},kl:{"^":"a:5;a",
$2:function(a,b){return P.pl(a,this.a.$1(b))}},km:{"^":"a:8;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.bk(J.as(this.c.$1(z.a.a.h(0,y[a])),this.a.a),this.d)}},kn:{"^":"a:0;a",
$1:function(a){return J.hv(J.bl(J.bk(a,this.a),1000))}},ke:{"^":"a:0;a",
$1:function(a){return!this.a.h(0,a).gjh()}}}],["","",,K,{"^":"",bw:{"^":"d;a,i:b<,aS:c<,d,jr:e<,f,bE:r<",
giQ:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
A:function(a,b){if(b==null)return!1
return b instanceof K.bw&&b.b===this.b},
j:function(a){return"Room<"+this.b+">"},
js:function(a){return this.e.$1(a)},
v:{
aJ:function(a,b,c,d,e,f,g){var z=new S.aw(null,null,[Q.G])
z.aE()
z.q(f)
return new K.bw(z.t(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",G:{"^":"d;iL:a<,X:b<,aS:c<,jc:d<"}}],["","",,S,{"^":"",ae:{"^":"d;",
gba:function(){return C.k},
gbb:function(){return C.k},
d9:function(a){return this.aB(this.gN(),a)},
fu:function(a,b){},
fv:function(a,b){},
bx:function(a){},
de:function(a){return!0}}}],["","",,S,{"^":"",
eH:function(a){var z=$.$get$b4().ai(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
ku:function(a,b){var z,y,x,w,v
z=$.$get$b4().fs()*b
for(y=new H.d9(a,a.gk(a),0,null,[H.w(a,"aH",0)]),x=0,w=0;y.w();){v=y.d
if(typeof v!=="number")return H.D(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.z("The weights do not add up to total="+b))},
kv:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b4().ai(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ak)(a),++v){t=a[v]
if(typeof t!=="number")return H.D(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.z("The weights do not add up to total="+b))},
cu:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bg(a,"{")
if(z!==-1&&z<a.length-1){y=H.t([],[P.v])
y.push(z)
w=z+1
v=a.length
u=null
t=1
while(!0){if(!(w<v)){x=null
break}if(w<0)return H.e(a,w)
s=a[w]
if(s==="{")++t
else if(s==="|"&&t===1)y.push(w)
else if(s==="}"){--t
if(t===0){y.push(w)
x=w
u=x
break}}r=w+1
u=w
w=r}q=y.length-1
if(q>1){p=$.$get$b4().ai(q)
o=C.b.ax(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cu(C.b.ax(a,m+1,y[l]))
if(typeof x!=="number")return x.a4()
l+=C.b.ax(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cu(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a4()
v=u+1
return C.b.ax(a,0,v)+S.cu(C.b.bm(a,v))}}else return a},
bv:function(a,b,c,d){switch($.$get$b4().ai(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
kw:function(a){if(a<0||a>1)throw H.c(P.W(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b4().fs()<a}}],["","",,Y,{"^":"",a3:{"^":"d;aD:a<,aw:b<,ar:c<,fz:d<,e,cR:f@,fC:r<,fq:x<,eu:y<,iP:z<,ha:Q<,cz:ch<,cx,jg:cy<,N:db<",
h:function(a,b){switch(b){case"string":return this.a
case"subject":return this.b
case"object":return this.c
case"owner":return this.d
case"but":return this.f
case"positive":return this.r
case"negative":return this.x
case"endSentence":return this.z
case"startSentence":return this.Q
case"wholeSentence":return this.ch
case"time":return this.db
default:throw H.c(P.z("Invalid key "+H.b(b)+"."))}}},ay:{"^":"d;a,N:b<,c",
gdZ:function(){return C.a.bQ(this.a,new Y.lO())},
bc:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.bi(b).dW(b,".")||C.b.dW(b,"!")||C.b.dW(b,"?"))&&C.b.dh(b,P.b5("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a3(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
p:function(a,b){return this.bc(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
bd:function(a,b,c){return this.bc(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
ik:function(a,b,c){return this.bc(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
a_:function(a,b,c,d,e,f,g,h,i,j){return this.bc(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
io:function(a,b,c,d,e){return this.bc(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
im:function(a,b,c,d){return this.bc(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
f2:function(a,b,c,d){return this.bc(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
il:function(a,b,c,d){return this.bc(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
ip:function(a,b,c,d,e){return this.bc(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
bP:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bg(a,"<owner's> "+b)!==-1||C.b.bg(a,"<ownerPronoun's> "+b)!==-1||C.b.bg(a,"<object-owner's> "+b)!==-1||C.b.bg(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(!c.gcX()){z=this.c
y=z.h(0,c.gm())
if(y==null)y=-1
if(typeof y!=="number")return y.au()
if(y<e)x=C.b.d0(a,b,"the "+b)
else{x=J.cT(c.gi(),P.b5("[aeiouy]",!1,!1))?C.b.d0(a,b,"an "+b):C.b.d0(a,b,"a "+b)
z.l(0,c.gm(),e)}}else x=null
return x==null?a:x},
dX:function(a,b){var z,y
if(!this.as(a)||!this.as(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaw()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaw()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gar()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gar()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaw().gm()
if(b<0||b>=z.length)return H.e(z,b)
if(J.f(y,z[b].gar().gm())){if(a>=z.length)return H.e(z,a)
y=z[a].gar().gm()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gaw().gm())}else z=!1
return z},
d8:function(a){var z=this
return new P.aN(function(){var y=a
var x=0,w=2,v,u,t
return function $async$d8(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.as(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaw()!=null?3:4
break
case 3:x=5
return t.gaw()
case 5:case 4:x=t.gar()!=null?6:7
break
case 6:x=8
return t.gar()
case 8:case 7:x=t.gfz()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aL()
case 2:return P.aM(v)}}})},
ay:[function(a){var z=J.aa(a)
if(z.au(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gar()}},"$1","gar",2,0,16],
jv:function(a,b){var z
if(!this.as(a)||!this.as(b))return!1
if(this.dX(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geu()}return!1},
fw:function(a){var z
for(z=!1;this.gdZ();z=!0){a.$1(this.fE(!0))
this.jC()}return z},
fE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.aU(z,[],new Y.lP())
C.a.i1(z,new Y.lQ(y),!1)
x=a&&this.gdZ()?C.a.bg(z,C.a.ff(z,new Y.lR()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dX(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gcR())n=this.jv(s,p)&&this.h9(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcR()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scR(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].gha()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].giP()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcz())if(this.cO(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcR()}else n=!1
n=n||this.jM(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcz()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcz()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.eH([" but "," but ",", but "])
u=!this.fX(s,s+1)&&!0}else{r+=S.eH([" and "," and ",", and "])
u=!0}}m=this.dj(s)
p=!v
if(p){n=s-1
if(this.cO(s,n))if(J.cT(this.dj(n),"<subject> "))if(J.cT(m,"<subject> "))m=H.bI(m,"<subject> ","",0)}l=J.hu(m,"<action>",this.dj(s))
if(this.i4(s,s-1))n=!(this.ay(s).gG()===C.j&&this.a7(s).gG()===C.j)
else n=!1
if(n){n=this.ay(s).gG()
l=H.q(l,"<object-owner's> <object>",n.b)
n=this.ay(s).gG()
l=H.q(l,"<object-ownerPronoun's> <object>",n.b)
n=this.ay(s).gG()
l=H.q(l,"<object>",n.b)
n=this.ay(s).gG()
l=H.q(l,"<object's>",n.c)}if(this.cO(s,s-1)){n=this.a7(s).gG()
l=H.q(l,"<owner's> <subject>",n.a)
n=this.a7(s).gG()
l=H.q(l,"<ownerPronoun's> <subject>",n.a)
n=this.a7(s).gG()
l=H.q(l,"<subject>",n.a)
n=this.a7(s).gG()
l=H.q(l,"<subject's>",n.c)}n=s-1
if(this.ay(n)!=null)if(this.a7(s)!=null)if(this.a7(n)!=null){k=this.ay(n)
k=k==null?k:k.gm()
j=this.a7(s)
if(J.f(k,j==null?j:j.gm())){k=this.a7(n)
k=k==null?k:k.gG()
j=this.a7(s)
k=!J.f(k,j==null?j:j.gG())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.a7(s).gG()
l=H.q(l,"<owner's> <subject>",k.a)
k=this.a7(s).gG()
l=H.q(l,"<ownerPronoun's> <subject>",k.a)
k=this.a7(s).gG()
l=H.q(l,"<subject>",k.a)
k=this.a7(s).gG()
l=H.q(l,"<subject's>",k.c)}if(this.a7(n)!=null)if(this.ay(s)!=null){k=this.a7(n)
k=k==null?k:k.gm()
j=this.ay(s)
if(J.f(k,j==null?j:j.gm())){n=this.a7(n)
n=n==null?n:n.gG()
k=this.a7(s)
n=!J.f(n,k==null?k:k.gG())}else n=!1}else n=!1
else n=!1
if(n){n=this.ay(s).gG()
l=H.q(l,"<object-owner's> <object>",n.a)
n=this.ay(s).gG()
l=H.q(l,"<object-ownerPronoun's> <object>",n.a)
n=this.ay(s).gG()
l=H.q(l,"<object>",n.b)
n=this.ay(s).gG()
l=H.q(l,"<object's>",n.c)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaw()
h=n.gar()
g=n.gfz()
f=n.e
e=S.cu(l)
if(C.b.Y(e,"{")||C.b.Y(e,"}"))$.$get$ha().dd('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gJ()){e=H.q(e,"<subject>","you")
e=H.q(e,"<subject's>","your")}if(i.gG()===C.A||i.gG()===C.X){e=H.q(e,"<s>","")
e=H.q(e,"<es>","")
e=H.q(e,"<ies>","y")
e=H.q(e,"<does>","do")
e=H.q(e,"<is>","are")
e=H.q(e,"<has>","have")}else{e=H.q(e,"<s>","s")
e=H.q(e,"<es>","es")
e=H.q(e,"<ies>","ies")
e=H.q(e,"<does>","does")
e=H.q(e,"<is>","is")
e=H.q(e,"<has>","has")}e=H.bI(e,"<subject>","<subjectNoun>",0)
k=i.gG()
e=H.q(e,"<subject>",k.a)
k=n.db
e=this.bP(e,"<subjectNoun>",i,g,k)
j=i.gi()
if(typeof j!=="string")H.i(H.R(j))
e=H.bI(e,"<subjectNoun>",j,0)
j=i.gG()
e=H.q(e,"<subjectPronoun>",j.a)
if(C.b.Y(l,P.b5("<subject>.+<subject's>",!0,!1))){j=i.gG()
e=H.q(e,"<subject's>",j.c)}e=this.bP(e,"<subject's>",i,g,k)
k=H.b(i.gi())+"'s"
e=H.bI(e,"<subject's>",k,0)
k=i.gG()
e=H.q(e,"<subject's>",k.c)
k=i.gG()
e=H.q(e,"<subjectPronoun's>",k.c)}if(h!=null){if(h.gJ()){e=H.q(e,"<object>","you")
e=H.q(e,"<object's>","your")}else{e=this.bP(e,"<object>",h,f,n.db)
k=h.gi()
if(typeof k!=="string")H.i(H.R(k))
e=H.q(e,"<object>",k)}k=h.gG()
e=H.q(e,"<objectPronoun>",k.b)
if(C.b.Y(l,P.b5("<object>.+<object's>",!0,!1))){k=h.gG()
e=H.q(e,"<object's>",k.c)}e=this.bP(e,"<object's>",h,f,n.db)
k=H.b(h.gi())+"'s"
e=H.bI(e,"<object's>",k,0)
k=h.gG()
e=H.q(e,"<object's>",k.c)
k=h.gG()
e=H.q(e,"<objectPronoun's>",k.c)}n=n.db
l=this.eV(f,this.eV(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.lN(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcz())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcz()?r+".":r
return H.pK(z.charCodeAt(0)==0?z:z,$.$get$f3(),new Y.lS(),null)},
cp:function(){return this.fE(!1)},
jC:function(){var z,y
if(!this.gdZ()){C.a.sk(this.a,0)
return}z=this.a
y=C.a.bg(z,C.a.ff(z,new Y.lT()))+1
P.cv(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fX:function(a,b){var z,y
if(!this.as(a)||!this.as(b))return!1
if(this.dX(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geu()}if(!this.cO(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfC()){if(b>=z.length)return H.e(z,b)
y=z[b].gfC()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfq()){if(b>=z.length)return H.e(z,b)
z=z[b].gfq()}else z=!1
if(z)return!0
else return!1},
h9:function(a,b){var z,y,x,w,v
if(!this.as(a)||!this.as(b))return!1
for(z=new P.aW(this.d8(a).a(),null,null,null);z.w();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.aW(this.d8(b).a(),null,null,null);y.w();){w=y.c
v=w==null?y.b:w.gF()
if(J.f(x.gm(),v.gm()))return!0}}return!1},
dj:[function(a){var z=J.aa(a)
if(z.au(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaD()}},"$1","gaD",2,0,7],
a7:[function(a){var z=J.aa(a)
if(z.au(a,0)||z.bC(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaw()}},"$1","gaw",2,0,16],
jM:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gN()!=null){y=a-1
if(this.as(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gN()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gN()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gN()
if(typeof y!=="number")return y.aP()
if(typeof x!=="number")return H.D(x)
return y-x}},
j:function(a){return this.cp()},
as:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eV:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gJ())z=H.q(H.q(b,d,"you"),e,"your")
else{z=this.bP(b,d,a,null,h)
y=a.gi()
H.bh(y)
z=H.q(z,d,y)}z=H.q(z,f,a.gG().a)
z=H.q(H.q(C.b.d0(this.bP(C.b.Y(c,P.b5(d+".+"+e,!0,!1))?H.q(z,e,a.gG().c):z,e,a,null,h),e,H.b(a.gi())+"'s"),e,a.gG().c),g,a.gG().c)}else z=H.q(H.q(H.q(H.q(b,d,""),e,""),f,""),g,"")
return z},
i4:function(a,b){var z,y
if(!this.as(a)||!this.as(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gar()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gar()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gar().gm()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gar().gm())},
cO:function(a,b){var z,y
if(!this.as(a)||!this.as(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaw()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaw()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaw().gm()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaw().gm())},
v:{
lN:function(a){var z,y,x
z=!C.b.Y(a,"\n\n")?C.b.jQ(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bm(z,1)}}},lO:{"^":"a:0;",
$1:function(a){return J.f(a.gaD(),"\n\n")}},lP:{"^":"a:22;",
$2:function(a,b){var z,y
z=J.J(a)
y=z.ga5(a)?z.gE(a):null
if(y!=null)y.gjg()
z.p(a,b)
return a}},lQ:{"^":"a:23;a",
$1:function(a){return J.dY(this.a,a)}},lR:{"^":"a:0;",
$1:function(a){return J.f(a.gaD(),"\n\n")}},lS:{"^":"a:24;",
$1:function(a){return H.b(a.h(0,1))+H.b(a.h(0,2))+H.b(a.h(0,3))}},lT:{"^":"a:0;",
$1:function(a){return J.f(a.gaD(),"\n\n")}},bp:{"^":"jV;cX:a<,i:b<,c,aX:d<,J:e<,G:f<",
gm:function(){return H.a1(this)},
ge1:function(){return!0},
gbh:function(){return!0},
v:{
cZ:function(a,b,c,d,e){var z=H.t([],[P.m])
return new Y.bp(c,b,z,e==null?$.$get$ar():e,!1,d)}}},jV:{"^":"d+d_;"},d_:{"^":"d;",
gb3:function(){if(this.gbh()){this.ge1()
var z=!0}else z=!1
return z},
aN:function(a,b,c,d,e,f,g,h,i){a.a_(0,b,c,d,e,f,g,h,H.aj(this,"$isbp"),!1)},
aj:function(a,b){return this.aN(a,b,!1,!1,!1,null,null,!1,!1)},
b5:function(a,b,c,d){return this.aN(a,b,!1,!1,!1,c,null,d,!1)},
aW:function(a,b,c){return this.aN(a,b,!1,!1,!1,c,null,!1,!1)},
cq:function(a,b,c){return this.aN(a,b,!1,!1,!1,null,null,c,!1)},
d1:function(a,b,c,d){return this.aN(a,b,c,!1,!1,d,null,!1,!1)},
ec:function(a,b,c,d){return this.aN(a,b,!1,c,d,null,null,!1,!1)},
by:function(a,b,c){return this.aN(a,b,!1,!1,c,null,null,!1,!1)},
ec:function(a,b,c,d){return this.aN(a,b,!1,c,d,null,null,!1,!1)},
fG:function(a,b,c,d){return this.aN(a,b,!1,!1,c,d,null,!1,!1)},
jH:function(a,b,c,d){return this.aN(a,b,c,!1,!1,null,null,d,!1)},
jG:function(a,b,c){return this.aN(a,b,c,!1,!1,null,null,!1,!1)},
fH:function(a,b,c,d){return this.aN(a,b,!1,!1,!1,c,d,!1,!1)}},bQ:{"^":"d;a,b,c,d",
j:function(a){return this.a}}}],["","",,L,{"^":"",oL:{"^":"a:0;",
$1:function(a){a.gcd().b=2
return 2}},oK:{"^":"a:0;",
$1:function(a){a.gcd().b=0
return 0}},oU:{"^":"a:0;",
$1:function(a){a.gcd().b=1
return 1}},fa:{"^":"d;"},n4:{"^":"fa;m:a<",
a6:function(a){var z=new L.fb(null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.fa))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.a2(Y.k(0,J.l(this.a)))},
j:function(a){return"Team {id="+J.h(this.a)+",\n}"},
v:{
dz:function(a){var z=new L.fb(null,null)
a.$1(z)
return z.t()}}},fb:{"^":"d;a,b",
gm:function(){return this.gcd().b},
gcd:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y
z=this.a
if(z==null){y=this.gcd().b
z=new L.n4(y)
if(y==null)H.i(P.n("id"))}this.q(z)
return z}}}],["","",,X,{"^":"",
fV:function(a,b){return new P.aN(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$fV(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bJ(u,u.length,0,null,[H.j(u,0)])
u=y.a
s=new J.bJ(u,u.length,0,null,[H.j(u,0)])
case 2:r=t.w()
q=s.w()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aL()
case 1:return P.aM(v)}}})}}],["","",,A,{"^":"",ao:{"^":"d;ih:a<,b,c,d,e,N:f<",
giC:function(){var z=this.e
return z.length!==0?C.a.gE(z):null},
gB:function(a){var z,y,x,w
z=X.bj(this.a)
y=X.bj(this.c)
x=X.bj(this.e)
w=this.f
return X.dJ(X.bd(X.bd(X.bd(X.bd(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
A:function(a,b){var z
if(b==null)return!1
z=J.p(b)
return!!z.$isao&&this.gB(this)===z.gB(b)},
fb:function(a){var z,y,x
z=this.cK(a)
if(z==null)throw H.c(new P.F("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.e)+")."))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].aK()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
aK:function(){++this.f},
fW:function(a,b,c,d,e){var z=this.c
if(a!=null)z=z.ew(0,new A.mK(a))
if(b!=null)z=z.bB(0,new A.mL(b))
if(c!=null)z=z.bB(0,new A.mM(c))
if(e!=null)z=z.bB(0,new A.mN(e))
return d!=null?z.bB(0,new A.mO(d)):z},
ae:function(a){return this.a.av(0,new A.mP(a))},
cA:function(a){return this.d.av(0,new A.mQ(a))},
em:function(a){var z,y
z=this.cK(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
bD:function(a){var z,y
for(z=this.e,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gi(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.z("No situation with name="+a+" found."))},
j1:function(a){var z=this.a.bf(0,new A.mR(a),new A.mS())
if(z==null)return!1
return z.gbh()},
bX:function(){var z=this.e
C.a.gE(z).bx(this)
C.a.bY(z)},
co:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(C.a.gE(z).gi(),a)))break
C.a.gE(z).bx(this)
C.a.bY(z)}if(z.length===0)throw H.c(P.z("Tried to pop situations until "+a+" but none was found in stack."))},
fF:function(a,b){var z,y
z=this.cK(a)
if(z==null)throw H.c(P.z("Situation with id "+H.b(a)+" does not exist in "+H.b(this.e)))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
d2:function(a,b,c,d,e){var z,y,x,w
z=this.fW(a,b,c,d,e)
y=z.gZ(z)
if(y.w()){x=y.gF()
y=this.f
w=x.gN()
if(typeof w!=="number")return H.D(w)
return y-w}return},
fM:function(a){return this.d2(a,null,null,null,null)},
jL:function(a,b,c){return this.d2(null,a,b,c,null)},
bZ:function(a,b,c){return this.d2(a,null,b,null,c)},
jK:function(a,b,c){return this.d2(a,b,null,null,c)},
j:function(a){var z,y
z=this.a
y=z.dF()
y.ag(0,z)
return"World<"+P.b0(y,"{","}")+">"},
ak:function(a,b){var z,y,x
z=this.ae(a)
y=z.a6(b)
x=this.a
x.aM(0,z)
x.p(0,y)},
cK:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gm(),a)){z=x
break}++x}return z},
hm:function(a){this.a.ag(0,a.a)
this.c.ag(0,a.c)
this.b.ag(0,a.b)
this.d.ag(0,a.d)
C.a.ag(this.e,a.e)
this.f=a.f},
v:{
dy:function(a){var z,y
z=P.H(null,null,null,R.T)
y=P.aU(null,O.c8)
y=new A.ao(z,P.H(null,null,null,U.d3),y,P.H(null,null,null,null),[],null)
y.hm(a)
return y}}},mK:{"^":"a:0;a",
$1:function(a){return J.dY(a.gf1(),this.a)}},mL:{"^":"a:0;a",
$1:function(a){return J.f(a.geb(),this.a.gm())}},mM:{"^":"a:0;a",
$1:function(a){return a.gev().Y(0,this.a.x)}},mN:{"^":"a:0;a",
$1:function(a){return a.gfS()===this.a}},mO:{"^":"a:0;a",
$1:function(a){return a.gfR()===this.a}},mP:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},mQ:{"^":"a:0;a",
$1:function(a){return J.f(a.gi(),this.a)}},mR:{"^":"a:0;a",
$1:function(a){return J.f(a.gm(),this.a)}},mS:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aI:{"^":"ac;",
ka:[function(a,b){a.bD("RoomRoamingSituation").e9(a,this.el(a),b)},"$2","gju",4,0,25],
el:function(a){return a.gih().av(0,new A.kG())}},kG:{"^":"a:0;",
$1:function(a){return a.gJ()}},by:{"^":"aI;b,X:c<,U:d<,i:e<,a",
T:[function(a,b,c){throw H.c(new P.F("SimpleAction always succeeds"))},"$3","gO",6,0,2],
P:[function(a,b,c){return this.b.$4(a,b,c,this.gju())},"$3","gM",6,0,2],
af:function(a,b){throw H.c(new P.F("SimpleAction shouldn't have to provide roll reason"))},
L:function(a,b){return 1},
gV:function(){return!1},
K:function(a,b){return!0},
gR:function(){return H.i(new P.F("Not rerollable"))},
gS:function(){return!1}}}],["","",,N,{"^":"",ij:{"^":"M;V:c<,U:d<,S:e<,R:f<,b,a",
ga9:function(){return"confuse <object>"},
gi:function(){return"Confuse"},
gac:function(){return"will <subject> confuse <object>?"},
T:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a_(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.a_(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.b(a.gi())+" fails to confuse "+H.b(z.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z
a.aj(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a_(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.by(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gi())+" confuses "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return 0.6},
K:function(a,b){var z
if(a.gJ())if(a.gab()){z=b.a
z=new H.K(z,new N.ik(this),[H.j(z,0)])
z=z.gk(z)>=2&&!this.b.e3(b)}else z=!1
else z=!1
return z},
v:{
pT:[function(a){return new N.ij(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","p0",2,0,4]}},ik:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbh()){z=a.gaX()
y=this.a.b.gaX()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,F,{"^":"",kb:{"^":"ac;U:b<,V:c<,S:d<,R:e<,a",
gX:function(){return"Stand off."},
gi:function(){return"Pass"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){if(a.gJ())a.aj(c,"<subject> stand<s> off")
return H.b(a.gi())+" passes the opportunity"},"$3","gM",6,0,2],
af:function(a,b){return"WARNING this shouldn't be user-visible"},
L:function(a,b){return 1},
K:function(a,b){return!0}}}],["","",,Y,{"^":"",kp:{"^":"M;S:c<,R:d<,V:e<,U:f<,b,a",
ga9:function(){return"force <object> off balance"},
gi:function(){return"Pound"},
gac:function(){return"will <subject> force <object> off balance?"},
T:[function(a,b,c){var z=this.b
a.fH(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga2(),z)
z.cq(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gi())+" kicks "+H.b(z.cy)+" off balance"},"$3","gO",6,0,2],
P:[function(a,b,c){var z=this.b
a.fH(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga2(),z)
if(z.gab()){z.fG(c,"<subject> lose<s> <object>",!0,$.$get$dO())
b.ak(z.x,new Y.kq())
C.a.p(b.e,U.jW(z,a))
return H.b(a.gi())+" pounds "+H.b(z.cy)+" off balance"}else if(z.gaV()){z.aj(c,"<subject> <is> already off balance")
c.f2(0,"<subject> make<s> <object> fall to the "+H.b(b.bD("FightSituation").gbE()),z,$.$get$hh())
b.ak(z.x,new Y.kr())
return H.b(a.gi())+" pounds "+H.b(z.cy)+" to the ground"}throw H.c(new P.F("enemy pose must be either standing or off-balance"))},"$3","gM",6,0,2],
L:function(a,b){var z=a.gab()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
K:function(a,b){var z
if(!a.gad()){z=a.e
z=z!=null&&z.a===C.c&&!this.b.gad()}else z=!1
return z},
v:{
q7:[function(a){return new Y.kp(!0,C.e,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","pt",2,0,4]}},kq:{"^":"a:0;",
$1:function(a){a.saz(C.l)
return a}},kr:{"^":"a:0;",
$1:function(a){a.saz(C.o)
return a}}}],["","",,B,{"^":"",kD:{"^":"ac;U:b<,V:c<,S:d<,R:e<,a",
gX:function(){return"Regain balance."},
gi:function(){return"RegainBalance"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){if(a.gJ())a.b5(c,"<subject> regain<s> <object>",$.$get$dO(),!0)
b.ak(a.gm(),new B.kE())
return H.b(a.gi())+" regains balance"},"$3","gM",6,0,2],
af:function(a,b){return"Will "+a.gG().a+" regain balance?"},
L:function(a,b){return 1},
K:function(a,b){return a.gaV()}},kE:{"^":"a:0;",
$1:function(a){a.saz(C.h)
return C.h}}}],["","",,O,{"^":"",kT:{"^":"ac;U:b<,V:c<,S:d<,R:e<,a",
gX:function(){return"Scramble."},
gi:function(){return"Scramble"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gi())+" scrambles on ground"},"$3","gM",6,0,2],
af:function(a,b){return"Will "+a.gG().a+" crawl out of harm's way?"},
L:function(a,b){return 1},
K:function(a,b){var z,y
if(!a.gad())return!1
z=b.bZ("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
y=b.bZ("Pound",a,!0)
if(y!=null&&y<=2)return!0
return!1}}}],["","",,Q,{"^":"",lB:{"^":"ac;U:b<,V:c<,S:d<,R:e<,a",
gX:function(){return"Stand up."},
gi:function(){return"StandUp"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){a.aj(c,"<subject> stand<s> up")
b.ak(a.gm(),new Q.lC())
return H.b(a.gi())+" stands up"},"$3","gM",6,0,2],
af:function(a,b){return"Will "+a.gG().a+" stand up?"},
L:function(a,b){return 1},
K:function(a,b){var z,y
if(!a.gad())return!1
z=b.bZ("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!1
y=b.bZ("Pound",a,!0)
if(y!=null&&y<=2)return!1
return!0}},lC:{"^":"a:0;",
$1:function(a){a.saz(C.h)
return C.h}}}],["","",,G,{"^":"",f0:{"^":"M;U:c<,V:d<,R:e<,b,a",
gi:function(){return"StartSlash"},
ga9:function(){return"swing at <object>"},
gS:function(){return!1},
gac:function(){return},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> swing<s> {<subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.r))
return H.b(a.cy)+" starts a slash at "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return 1},
K:function(a,b){return!a.gJ()&&a.gab()&&!this.b.gad()&&a.aA(C.c)},
v:{
qd:[function(a){return new G.f0("The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","pD",2,0,4]}}}],["","",,R,{"^":"",f1:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"StartSlashOutOfBalance"},
ga9:function(){return"swing at <object> (while out of balance)"},
gac:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){var z=this.b
a.fG(c,"<subject> completely miss<es> <object> with <subject's> "+a.ga2().f,!0,z)
return H.b(a.cy)+" fails to start an out-of-balance slash at "+H.b(z.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> swing<s> {<subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.r))
return H.b(a.cy)+" starts an out-of-balance slash at "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return 0.7},
K:function(a,b){return!a.gJ()&&a.gaV()&&!this.b.gad()&&a.aA(C.c)},
v:{
qb:[function(a){return new R.f1("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","pE",2,0,4]}}}],["","",,T,{"^":"",lD:{"^":"f1;c,d,e,f,b,a",
gi:function(){return"StartSlashOutOfBalancePlayer"},
P:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> swing<s> {<subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.n))
return H.b(a.cy)+" starts an out-of-balance slash at "+H.b(z.gi())},"$3","gM",6,0,2],
K:function(a,b){return a.gJ()&&a.gaV()&&!this.b.gad()&&a.aA(C.c)},
v:{
qa:[function(a){return new T.lD("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","pF",2,0,4]}}}],["","",,A,{"^":"",lE:{"^":"f0;S:f<,c,d,e,b,a",
gac:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> swing<s> {<subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.t))
return H.b(a.cy)+" starts a failed slash at "+H.b(z.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> swing<s> {<subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.n))
return H.b(a.cy)+" starts a successful slash at "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return 0.7},
K:function(a,b){return a.gJ()&&a.gab()&&!this.b.gad()&&a.aA(C.c)},
v:{
qc:[function(a){return new A.lE(!0,"The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","pG",2,0,4]}}}],["","",,D,{"^":"",f2:{"^":"M;U:c<,V:d<,b,a",
gi:function(){return"StartStrikeDown"},
ga9:function(){return"strike down at <object>"},
gS:function(){return!1},
gR:function(){return},
gac:function(){return},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> strike<s> down {with <subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,D.du(a,z))
C.a.p(y,V.df(a,z,C.r))
return H.b(a.cy)+" strikes down at "+H.b(z.gi())+" on the ground"},"$3","gM",6,0,2],
L:function(a,b){return 1},
K:function(a,b){return!a.gJ()&&this.b.gad()&&!a.gad()&&a.aA(C.c)},
v:{
qf:[function(a){return new D.f2("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","pH",2,0,4]}}}],["","",,Q,{"^":"",lF:{"^":"f2;c,d,b,a",
ga9:function(){return"strike down at <object>"},
gS:function(){return!0},
gR:function(){return C.e},
gac:function(){return"will <subject> hit?"},
T:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> strike<s> down {with <subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,D.du(a,z))
C.a.p(y,V.df(a,z,C.t))
return H.b(a.cy)+" makes an unsuccessful strike at "+H.b(z.gi())+" on the ground"},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.aW(c,"<subject> strike<s> down {with <subject's> "+a.ga2().f+" |}at <object>",z)
y=b.e
C.a.p(y,D.du(a,z))
C.a.p(y,V.df(a,z,C.n))
return H.b(a.cy)+" makes a successful strike at "+H.b(z.gi())+" on the ground"},"$3","gM",6,0,2],
L:function(a,b){return 0.7},
K:function(a,b){return a.gJ()&&this.b.gad()&&!a.gad()&&a.aA(C.c)},
v:{
qe:[function(a){return new Q.lF("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","pI",2,0,4]}}}],["","",,B,{"^":"",mf:{"^":"M;S:c<,R:d<,V:e<,U:f<,b,a",
gi:function(){return"SweepOffFeet"},
ga9:function(){return"sweep <object> off <objectPronoun's> feet"},
gac:function(){return"will <subject> knock <object> down?"},
T:[function(a,b,c){S.bv(new B.mg(this,a,c),new B.mh(this,a,c),null,null)
return H.b(a.gi())+" fails to sweep "+H.b(this.b.gi())+" off feet"},"$3","gO",6,0,2],
P:[function(a,b,c){var z
S.bv(new B.mi(this,a,c),new B.mj(this,a,c,b.bD("FightSituation").gbE()),null,null)
z=this.b
b.ak(z.gm(),new B.mk())
return H.b(a.gi())+" sweeps "+H.b(z.gi())+" off feet"},"$3","gM",6,0,2],
L:function(a,b){var z=a.gab()?0:0.2
if(a.Q)return 0.7-z
return 0.5-z},
K:function(a,b){return(a.gab()||a.dx===C.l)&&!this.b.gad()},
v:{
qh:[function(a){return new B.mf(!0,C.e,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","pM",2,0,4]}},mg:{"^":"a:1;a,b,c",
$0:function(){var z=this.c
this.b.aW(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.il(0,"they don't connect",!0,!0)}},mh:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aW(z,"<subject> kick<s> <object's> shin",y)
y.jG(z,"<subject> <does>n't budge",!0)}},mi:{"^":"a:1;a,b,c",
$0:function(){this.b.b5(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},mj:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b5(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.aj(z,"<subject> {grunt|shriek}<s>")
y.by(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mk:{"^":"a:0;",
$1:function(a){a.saz(C.o)
return a}}}],["","",,M,{"^":"",mI:{"^":"ac;U:b<,S:c<,R:d<,V:e<,a",
gX:function(){return"Regain clarity."},
gi:function(){return"Unconfuse"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){a.aj(c,"<subject> shake<s> <subject's> head violently")
if(a.gJ())c.p(0,"the {horrible|terrible} spell seems to recede")
c.a_(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.b(a.gi())+" regains clarity"},"$3","gM",6,0,2],
af:function(a,b){return"WARNING this shouldn't be user-visible"},
L:function(a,b){return 1},
K:function(a,b){var z
if(a.e3(b)){z=b.bZ("Confuse",a,!0)
if(typeof z!=="number")return z.bF()
z=z>4}else z=!1
return z}}}],["","",,G,{"^":"",ec:{"^":"M;U:c<,V:d<,b,a",
gi:function(){return"CounterSlash"},
gS:function(){return!1},
gR:function(){return},
ga9:function(){return"swing back at <object>"},
gac:function(){return"will <subject> keep <subject's> balance?"},
T:[function(a,b,c){a.aj(c,"<subject> tr<ies> to swing back")
a.toString
c.a_(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gab()){b.ak(a.x,new G.iw())
c.a_(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.l){b.ak(a.x,new G.ix())
c.a_(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a_(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.cy)+" fails to swing back at "+H.b(this.b.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.b5(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.r))
return H.b(a.gi())+" swings back at "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return this.b.gab()?0.7:0.9},
K:function(a,b){return!a.gJ()&&a.aA(C.c)&&!a.gad()},
v:{
pV:[function(a){return new G.ec("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","p3",2,0,4]}},iw:{"^":"a:0;",
$1:function(a){a.saz(C.l)
return a}},ix:{"^":"a:0;",
$1:function(a){a.saz(C.o)
return a}}}],["","",,D,{"^":"",it:{"^":"ec;c,d,b,a",
gS:function(){return!0},
gR:function(){return C.e},
ga9:function(){return"swing back at <object>"},
gac:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){a.aj(c,"<subject> tr<ies> to swing back")
a.toString
c.a_(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gab()){b.ak(a.x,new D.iu())
c.a_(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dx===C.l){b.ak(a.x,new D.iv())
c.a_(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a_(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.cy)+" fails to swing back at "+H.b(this.b.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y
z=this.b
a.b5(c,"<subject> swing<s> back at <object>",z,!0)
y=b.e
C.a.p(y,M.b8(a,z))
C.a.p(y,L.b7(a,z,C.n))
return H.b(a.gi())+" swings successfully back at "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return this.b.gab()?0.7:0.9},
K:function(a,b){return a.gJ()&&a.aA(C.c)&&!a.gad()},
v:{
pU:[function(a){return new D.it("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","p4",2,0,4]}},iu:{"^":"a:0;",
$1:function(a){a.saz(C.l)
return a}},iv:{"^":"a:0;",
$1:function(a){a.saz(C.o)
return a}}}],["","",,S,{"^":"",
eb:function(a,b){var z=new S.cY(null,null,null,null,null)
new S.p_(a,b).$1(z)
return z.t()},
ea:{"^":"ae;",
gba:function(){return[G.p3(),D.p4()]},
gbb:function(){return[$.$get$dg()]},
gi:function(){return"CounterAttackSituation"},
aK:function(){var z=new S.cY(null,null,null,null,null)
z.q(this)
new S.ir().$1(z)
return z.t()},
aB:function(a,b){if(a===0)return b.ae(this.a)
return},
aO:function(a,b){return new H.K(a,new S.is(this),[H.j(a,0)])}},
p_:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gaF().c=z
a.gaF().e=0
z=this.a.gm()
a.gaF().b=z
z=this.b.gm()
a.gaF().d=z
return a}},
ir:{"^":"a:0;",
$1:function(a){var z=a.gaF().e
if(typeof z!=="number")return z.a4()
a.gaF().e=z+1
return a}},
is:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
mV:{"^":"ea;a,m:b<,c,N:d<",
a6:function(a){var z=new S.cY(null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.ea))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
j:function(a){return"CounterAttackSituation {counterAttacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
cY:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaF().c},
gN:function(){return this.gaF().e},
gaF:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaF().b
x=this.gaF().c
w=this.gaF().d
v=this.gaF().e
z=new S.mV(y,x,w,v)
if(y==null)H.i(P.n("counterAttacker"))
if(x==null)H.i(P.n("id"))
if(w==null)H.i(P.n("target"))
if(v==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,X,{"^":"",
hi:function(a,b,c){switch($.$get$fM().ai(3)){case 0:b.ec(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.by(a,"<subject> fall<s> backward",!0)
b.toString
a.a_(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b,!1)
a.a_(0,"<subject> hit<s> the "+H.b(c)+" face down",!1,!0,!0,null,null,!1,b,!1)
break
case 2:b.by(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
a.a_(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b,!1)
break}a.bd(0,"\n\n",!0)}}],["","",,U,{"^":"",
j2:function(a,b,c,d){var z=new U.d1(null,null,null,null,null,null,null,null)
new U.oY(a,b,c,d).$1(z)
return z.t()},
eg:{"^":"ae;",
gba:function(){return[N.p0(),Y.pt(),B.pM(),G.pD(),A.pG(),D.pH(),Q.pI(),R.pE(),T.pF()]},
gbb:function(){return H.t([$.$get$eJ(),$.$get$f_(),$.$get$eN(),$.$get$ft()],[Q.ac])},
gi:function(){return"FightSituation"},
aK:function(){var z=new U.d1(null,null,null,null,null,null,null,null)
z.q(this)
new U.j4().$1(z)
return z.t()},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.fV(this.f,this.a)
y=H.br(z,new U.j5(b),H.w(z,"x",0),null)
x=H.w(y,"x",0)
w=P.V(new H.K(y,new U.j6(),[x]),!1,x)
x=H.j(w,0)
v=P.V(new H.K(w,new U.j7(),[x]),!1,x)
u=v.length===1?C.a.gbJ(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ak)(w),++r){q=w[r]
p=b.c.bf(0,new U.j8(q),new U.j9())
o=p==null?p:p.gN()
if(o==null)o=-1
x=b.f
if(typeof o!=="number")return H.D(o)
n=x-o
if(q.gJ())n=C.i.ee(n*1.5)
if(n>t){s=q
t=n}}return s},
aO:function(a,b){return new H.K(a,new U.ja(this),[H.j(a,0)])},
fv:function(a,b){var z,y
if(S.kw(0.25))b.bd(0,"\n\n",!0)
z=this.r
y=this.b.a
if(y.W(z))y.h(0,z).$2(a,b)},
bx:function(a){var z,y
z=this.c
if(z!=null&&!this.dT(this.a,a)){y=a.em(z)
a.fF(y.gm(),y.a6(new U.jb()))}},
de:function(a){var z=this.f
if(this.dT(z,a))if(this.dT(this.a,a)){z=z.a
z=(z&&C.a).bQ(z,new U.jc(a))}else z=!1
else z=!1
return z},
dT:function(a,b){var z=a.a
return(z&&C.a).bQ(z,new U.j3(b))}},
oY:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$ah().ai(1073741823)
a.ga8().f=z
a.ga8().x=0
z=a.ga8()
y=z.r
if(y==null){y=new S.aw(null,null,[P.v])
y.aE()
y.q(C.k)
z.r=y
z=y}else z=y
y=this.a
z.q(new H.cq(y,new U.oo(),[H.j(y,0),null]))
y=a.ga8()
z=y.b
if(z==null){z=new S.aw(null,null,[P.v])
z.aE()
z.q(C.k)
y.b=z}z.q(J.e0(this.b,new U.op()))
a.ga8().e=this.c
z=this.d.gm()
a.ga8().d=z
return a}},
oo:{"^":"a:0;",
$1:function(a){return a.gm()}},
op:{"^":"a:0;",
$1:function(a){return a.gm()}},
j4:{"^":"a:0;",
$1:function(a){var z=a.ga8().x
if(typeof z!=="number")return z.a4()
a.ga8().x=z+1
return a}},
j5:{"^":"a:0;a",
$1:function(a){return this.a.ae(a)}},
j6:{"^":"a:0;",
$1:function(a){return a.gb3()}},
j7:{"^":"a:0;",
$1:function(a){return a.gJ()}},
j8:{"^":"a:0;a",
$1:function(a){return J.f(a.geb(),this.a.gm())}},
j9:{"^":"a:1;",
$0:function(){return}},
ja:{"^":"a:17;a",
$1:function(a){var z,y,x
if(a.gb3()){z=this.a
y=a.gm()
x=z.f.a
if(!(x&&C.a).Y(x,y)){y=a.gm()
z=z.a.a
y=(z&&C.a).Y(z,y)
z=y}else z=!0}else z=!1
return z}},
jb:{"^":"a:0;",
$1:function(a){a.sjt(!1)
return a}},
jc:{"^":"a:28;a",
$1:function(a){var z=this.a.ae(a)
return z.gJ()&&z.gb3()}},
j3:{"^":"a:0;a",
$1:function(a){return this.a.ae(a).gb3()}},
mW:{"^":"eg;a,b,c,bE:d<,m:e<,f,N:r<",
a6:function(a){var z=new U.d1(null,null,null,null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.eg))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.f(this.f,b.f)){z=this.r
y=b.r
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)),J.l(this.f)),J.l(this.r)))},
j:function(a){return"FightSituation {enemyTeamIds="+J.h(this.a)+",\nevents="+J.h(this.b)+",\nroomRoamingSituationId="+J.h(this.c)+",\ngroundMaterial="+J.h(this.d)+",\nid="+J.h(this.e)+",\nplayerTeamIds="+J.h(this.f)+",\ntime="+J.h(this.r)+",\n}"}},
d1:{"^":"d;a,b,c,d,e,f,r,x",
gbE:function(){return this.ga8().e},
gm:function(){return this.ga8().f},
gN:function(){return this.ga8().x},
ga8:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.aw(null,null,[H.j(z,0)])
y.aE()
y.q(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.db(null,null,[H.j(z,0),H.j(z,1)])
y.c8()
y.q(z)
z=y}this.c=z
z=this.a
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.aw(null,null,[H.j(z,0)])
y.aE()
y.q(z)
z=y}this.r=z
this.x=this.a.r
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v,u,t,s
z=this.a
if(z==null){y=this.ga8()
x=y.b
if(x==null){x=new S.aw(null,null,[P.v])
x.aE()
x.q(C.k)
y.b=x
y=x}else y=x
y=y==null?y:y.t()
x=this.ga8()
w=x.c
if(w==null){w=new A.db(null,null,[P.v,{func:1,v:true,args:[A.ao,Y.ay]}])
w.c8()
w.q(C.V)
x.c=w
x=w}else x=w
x=x==null?x:x.t()
w=this.ga8().d
v=this.ga8().e
u=this.ga8().f
t=this.ga8()
s=t.r
if(s==null){s=new S.aw(null,null,[P.v])
s.aE()
s.q(C.k)
t.r=s
t=s}else t=s
t=t==null?t:t.t()
s=this.ga8().x
z=new U.mW(y,x,w,v,u,t,s)
if(y==null)H.i(P.n("enemyTeamIds"))
if(x==null)H.i(P.n("events"))
if(v==null)H.i(P.n("groundMaterial"))
if(u==null)H.i(P.n("id"))
if(t==null)H.i(P.n("playerTeamIds"))
if(s==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,A,{"^":"",k_:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"OffBalanceOpportunityThrust"},
ga9:function(){return"stab <object>"},
gac:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){var z=this.b
a.aW(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.a_(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gi())+" fails to stab "+H.b(z.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z=this.b
b.ak(z.gm(),new A.k0())
if(b.ae(z.gm()).gbh()){a.b5(c,"<subject> thrust<s> {|<subject's> "+a.ga2().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.by(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b5(c,"<subject> {stab<s>|run<s> <subject's> "+a.ga2().f+" through} <object>",z,!0)
X.hi(c,z,b.bD("FightSituation").gbE())}return H.b(a.gi())+" stabs "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){if(a.gJ())return 0.6
return 0.5},
K:function(a,b){var z
if(a.gab())if(this.b.gaV()){z=a.e
z=z!=null&&z.a===C.c}else z=!1
else z=!1
return z},
v:{
q2:[function(a){return new A.k_("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.e,a,null)},"$1","pq",2,0,4]}},k0:{"^":"a:0;",
$1:function(a){var z=a.gaq()
if(typeof z!=="number")return z.aP()
a.saq(z-1)
return a}}}],["","",,U,{"^":"",
jW:function(a,b){var z=new U.dd(null,null,null,null,null)
new U.oP(a,b).$1(z)
return z.t()},
eB:{"^":"ae;",
gba:function(){return H.t([A.pq()],[{func:1,ret:Q.M,args:[R.T]}])},
gbb:function(){return[$.$get$dg()]},
gi:function(){return"OffBalanceOpportunitySituation"},
aK:function(){var z=new U.dd(null,null,null,null,null)
z.q(this)
new U.jX().$1(z)
return z.t()},
aB:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bF()
if(a>0)return
z=b.ae(this.a)
y=b.a
x=H.j(y,0)
w=P.V(new H.K(y,new U.jY(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gfe(w)
if(v.gab())if(z.gaV()){y=v.e
y=y!=null&&y.a===C.c}else y=!1
else y=!1
if(y)return v
return},
aO:function(a,b){return new H.K(a,new U.jZ(b,b.ae(this.a)),[H.j(a,0)])}},
oP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gaG().d=z
a.gaG().e=0
z=this.a.gm()
a.gaG().b=z
z=this.b
z=z==null?z:z.gm()
a.gaG().c=z
return a}},
jX:{"^":"a:0;",
$1:function(a){var z=a.gaG().e
if(typeof z!=="number")return z.a4()
a.gaG().e=z+1
return a}},
jY:{"^":"a:17;a,b,c",
$1:function(a){var z,y
if(a.gb3())if(a.e_(this.c,this.b)){z=a.x
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
jZ:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.e_(z,this.a)}},
mX:{"^":"eB;a,b,m:c<,N:d<",
a6:function(a){var z=new U.dd(null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.eB))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
j:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.h(this.a))+",\nculpritId="+J.h(this.b)+",\nid="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dd:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaG().d},
gN:function(){return this.gaG().e},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
z=new U.mX(y,x,w,v)
if(y==null)H.i(P.n("actorId"))
if(w==null)H.i(P.n("id"))
if(v==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,O,{"^":"",jd:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"FinishSlash"},
ga9:function(){return""},
gac:function(){return"(WARNING should not be user-visible)"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y,x
z=this.b
b.ak(z.gm(),new O.jg())
y=b.ae(z.gm()).gbh()
if(y){a.b5(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.by(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b5(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.hi(c,z,b.bD("FightSituation").gbE())}x=H.b(a.gi())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.b(z.gi())},"$3","gM",6,0,2],
L:function(a,b){return 1},
K:function(a,b){return a.aA(C.c)},
v:{
q_:[function(a){return new O.jd(null,!0,!0,C.e,a,null)},"$1","p9",2,0,4]}},jg:{"^":"a:0;",
$1:function(a){var z=a.gaq()
if(typeof z!=="number")return z.aP()
a.saq(z-1)
return a}}}],["","",,X,{"^":"",iC:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"DefensiveParrySlash"},
ga9:function(){return"step back and parry"},
gac:function(){return"will <subject> parry it?"},
T:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.ga2().f+"|fend it off}")
if(a.gaV())c.a_(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bv(new X.iD(a,c),new X.iE(this,a,c),null,null)
z=b.e
C.a.gE(z).bx(b)
C.a.bY(z)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){if(a.gJ())a.aj(c,"<subject> {step<s>|take<s> a step} back")
a.cq(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.ga2().f+"|fend<s> it off}",!0)
if(!a.gab()){b.ak(a.x,new X.iF())
if(a.Q)c.a_(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.co("FightSituation")
return H.b(a.cy)+" steps back and parries "+H.b(this.b.gi())},"$3","gM",6,0,2],
L:function(a,b){var z,y
if(a.gJ())return 1
z=b.e
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbO())return 1
return 0.5-(a.gab()?0:0.2)},
K:function(a,b){return a.aA(C.c)},
v:{
pW:[function(a){return new X.iC("Stepping back is the safest way to get out of harm's way.",!1,!0,C.e,a,null)},"$1","p5",2,0,4]}},iD:{"^":"a:1;a,b",
$0:function(){this.b.a_(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},iE:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d1(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},iF:{"^":"a:0;",
$1:function(a){a.saz(C.h)
return a}}}],["","",,F,{"^":"",iG:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"DodgeSlash"},
ga9:function(){return"dodge and counter"},
gac:function(){return"will <subject> dodge?"},
T:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaV())c.a_(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bv(new F.iH(a,c),new F.iI(this,a,c),null,null)
z=b.e
C.a.gE(z).bx(b)
C.a.bY(z)
return H.b(a.cy)+" fails to dodge "+H.b(this.b.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z=this.b
a.b5(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gab()){z.ec(c,"<subject> lose<s> balance because of that",!0,!0)
b.ak(z.x,new F.iJ())}b.co("FightSituation")
if(a.gJ())c.p(0,"this opens an opportunity for a counter attack")
C.a.p(b.e,S.eb(a,z))
return H.b(a.gi())+" dodges "+H.b(z.cy)},"$3","gM",6,0,2],
L:function(a,b){var z,y,x
z=b.e
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbO())return 1
x=a.gab()?0:0.2
if(a.Q)return 0.7-x
return 0.4-x},
K:function(a,b){return!a.gad()},
v:{
pX:[function(a){return new F.iG("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.e,a,null)},"$1","p6",2,0,4]}},iH:{"^":"a:1;a,b",
$0:function(){this.b.a_(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},iI:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d1(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},iJ:{"^":"a:0;",
$1:function(a){a.saz(C.l)
return C.l}}}],["","",,G,{"^":"",k8:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"ParrySlash"},
ga9:function(){return"parry and counter"},
gac:function(){return"will <subject> parry?"},
T:[function(a,b,c){var z
a.aj(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.ga2().f+"|fend it off}")
if(a.gaV())c.a_(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bv(new G.k9(a,c),new G.ka(this,a,c),null,null)
z=b.e
C.a.gE(z).bx(b)
C.a.bY(z)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){var z=this.b
if(z.gaV()){c.io(0,"<subject> <is> out of balance",!0,!0,z)
c.im(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$hl())
a.cq(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+a.ga2().f+"|fend<s> it off easily}",!0)}else a.cq(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.ga2().f+"|fend<s> it off}",!0)
b.co("FightSituation")
if(a.gJ())c.p(0,"this opens an opportunity for a counter attack")
C.a.p(b.e,S.eb(a,z))
return H.b(a.gi())+" parries "+H.b(z.cy)},"$3","gM",6,0,2],
L:function(a,b){var z,y,x,w
z=b.e
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbO())return 1
x=a.gab()?0:0.2
w=this.b.gaV()?0.3:0
if(a.Q)return 0.6-x+w
return 0.3-x+w},
K:function(a,b){return a.aA(C.c)},
v:{
q4:[function(a){return new G.k8("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.e,a,null)},"$1","ps",2,0,4]}},k9:{"^":"a:1;a,b",
$0:function(){this.b.a_(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},ka:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d1(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
b7:function(a,b,c){var z=new L.dq(null,null,null,null,null,null)
new L.oZ(a,b,c).$1(z)
return z.t()},
eQ:{"^":"ae;",
gba:function(){return[F.p6(),G.ps(),X.p5()]},
gbN:function(){return this.c===C.n},
gbO:function(){return this.c===C.t},
gi:function(){return"SlashDefenseSituation"},
aK:function(){var z=new L.dq(null,null,null,null,null,null)
z.q(this)
new L.lm().$1(z)
return z.t()},
aB:function(a,b){if(a===0)return b.ae(this.d)
return},
aO:function(a,b){return new H.K(a,new L.ln(this),[H.j(a,0)])}},
oZ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gap().c=z
a.gap().f=0
z=this.a.gm()
a.gap().b=z
z=this.b.gm()
a.gap().e=z
a.gap().d=this.c
return a}},
lm:{"^":"a:0;",
$1:function(a){var z=a.gap().f
if(typeof z!=="number")return z.a4()
a.gap().f=z+1
return a}},
ln:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
n_:{"^":"eQ;a,m:b<,c,d,N:e<",
a6:function(a){var z=new L.dq(null,null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.eQ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)))},
j:function(a){return"SlashDefenseSituation {attacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntarget="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
dq:{"^":"d;a,b,c,d,e,f",
gm:function(){return this.gap().c},
gN:function(){return this.gap().f},
gap:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gap().b
x=this.gap().c
w=this.gap().d
v=this.gap().e
u=this.gap().f
z=new L.n_(y,x,w,v,u)
if(y==null)H.i(P.n("attacker"))
if(x==null)H.i(P.n("id"))
if(w==null)H.i(P.n("predeterminedResult"))
if(v==null)H.i(P.n("target"))
if(u==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,M,{"^":"",
b8:function(a,b){var z=new M.dr(null,null,null,null,null)
new M.oM(a,b).$1(z)
return z.t()},
eR:{"^":"ae;",
gba:function(){return[O.p9()]},
gi:function(){return"SlashSituation"},
aK:function(){var z=new M.dr(null,null,null,null,null)
z.q(this)
new M.lo().$1(z)
return z.t()},
aB:function(a,b){if(a===0)return b.ae(this.a)
return},
aO:function(a,b){return new H.K(a,new M.lp(this),[H.j(a,0)])}},
oM:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gaH().c=z
a.gaH().e=0
z=this.a.gm()
a.gaH().b=z
z=this.b.gm()
a.gaH().d=z
return a}},
lo:{"^":"a:0;",
$1:function(a){var z=a.gaH().e
if(typeof z!=="number")return z.a4()
a.gaH().e=z+1
return a}},
lp:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
n0:{"^":"eR;a,m:b<,c,N:d<",
a6:function(a){var z=new M.dr(null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.eR))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
j:function(a){return"SlashSituation {attacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntarget="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dr:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaH().c},
gN:function(){return this.gaH().e},
gaH:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaH().b
x=this.gaH().c
w=this.gaH().d
v=this.gaH().e
z=new M.n0(y,x,w,v)
if(y==null)H.i(P.n("attacker"))
if(x==null)H.i(P.n("id"))
if(w==null)H.i(P.n("target"))
if(v==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,Q,{"^":"",je:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"FinishSlashGroundedEnemy"},
ga9:function(){return""},
gac:function(){return"(WARNING should not be user-visible)"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){var z=this.b
b.ak(z.gm(),new Q.jf())
c.f2(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga2())
z.by(c,"<subject> die<s>",!0)
c.bd(0,"\n\n",!0)
return H.b(a.gi())+" slains "+H.b(z.gi())+" on the ground"},"$3","gM",6,0,2],
L:function(a,b){return 1},
K:function(a,b){return this.b.gad()&&a.aA(C.c)},
v:{
pZ:[function(a){return new Q.je(null,!1,!0,C.e,a,null)},"$1","pa",2,0,4]}},jf:{"^":"a:0;",
$1:function(a){a.saq(0)
return a}}}],["","",,K,{"^":"",k3:{"^":"M;V:c<,S:d<,R:e<,U:f<,b,a",
gi:function(){return"OnGroundParry"},
ga9:function(){return"parry it"},
gac:function(){return"will <subject> parry it?"},
T:[function(a,b,c){a.aj(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.ga2().f+"}}")
S.bv(new K.k4(a,c),new K.k5(this,a,c),null,null)
return H.b(a.cy)+" fails to parry "+H.b(this.b.gi())},"$3","gO",6,0,2],
P:[function(a,b,c){a.cq(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.ga2().f+"}",!0)
b.co("FightSituation")
return H.b(a.cy)+" parries "+H.b(this.b.gi())},"$3","gM",6,0,2],
L:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbO())return 1
if(a.gJ())return 0.6
return 0.3},
K:function(a,b){return a.aA(C.c)},
v:{
q3:[function(a){return new K.k3(!1,!0,C.e,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","pr",2,0,4]}},k4:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a_(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},k5:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d1(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",kH:{"^":"M;U:c<,V:d<,S:e<,R:f<,b,a",
gi:function(){return"RollOutOfWay"},
ga9:function(){return"roll out of way"},
gac:function(){return"will <subject> evade?"},
T:[function(a,b,c){a.aj(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.a_(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gi())+" fails to roll out of the way"},"$3","gO",6,0,2],
P:[function(a,b,c){a.jH(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gJ()){b.ak(a.gm(),new Y.kI())
c.a_(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.co("FightSituation")
return H.b(a.gi())+" rolls out of the way of "+H.b(this.b.gi())+"'s strike"},"$3","gM",6,0,2],
L:function(a,b){var z,y
z=b.e
y=z.length!==0?C.a.gE(z):null
if(y.gbN())return 0
if(y.gbO())return 1
if(a.gJ())return 1
return 0.5},
K:function(a,b){return!0},
v:{
q9:[function(a){return new Y.kH(null,!1,!0,C.e,a,null)},"$1","px",2,0,4]}},kI:{"^":"a:0;",
$1:function(a){a.saz(C.h)
return a}}}],["","",,V,{"^":"",
df:function(a,b,c){var z=new V.de(null,null,null,null,null,null)
new V.oN(a,b,c).$1(z)
return z.t()},
eC:{"^":"ae;",
gba:function(){return[K.pr(),Y.px()]},
gbN:function(){return this.c===C.n},
gbO:function(){return this.c===C.t},
gi:function(){return"OnGroundDefenseSituation"},
aK:function(){var z=new V.de(null,null,null,null,null,null)
z.q(this)
new V.k1().$1(z)
return z.t()},
aB:function(a,b){if(a===0)return b.ae(this.d)
return},
aO:function(a,b){return new H.K(a,new V.k2(this),[H.j(a,0)])}},
oN:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gao().c=z
a.gao().f=0
z=this.a.gm()
a.gao().b=z
z=this.b.gm()
a.gao().e=z
a.gao().d=this.c
return a}},
k1:{"^":"a:0;",
$1:function(a){var z=a.gao().f
if(typeof z!=="number")return z.a4()
a.gao().f=z+1
return a}},
k2:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.d)}},
mY:{"^":"eC;a,m:b<,c,d,N:e<",
a6:function(a){var z=new V.de(null,null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.eC))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)),J.l(this.e)))},
j:function(a){return"OnGroundDefenseSituation {attacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\npredeterminedResult="+J.h(this.c)+",\ntargetOnGround="+H.b(J.h(this.d))+",\ntime="+J.h(this.e)+",\n}"}},
de:{"^":"d;a,b,c,d,e,f",
gm:function(){return this.gao().c},
gN:function(){return this.gao().f},
gao:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gao().b
x=this.gao().c
w=this.gao().d
v=this.gao().e
u=this.gao().f
z=new V.mY(y,x,w,v,u)
if(y==null)H.i(P.n("attacker"))
if(x==null)H.i(P.n("id"))
if(w==null)H.i(P.n("predeterminedResult"))
if(v==null)H.i(P.n("targetOnGround"))
if(u==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,D,{"^":"",
du:function(a,b){var z=new D.dt(null,null,null,null,null)
new D.oO(a,b).$1(z)
return z.t()},
f4:{"^":"ae;",
gba:function(){return[Q.pa()]},
gi:function(){return"StrikeDownSituation"},
aK:function(){var z=new D.dt(null,null,null,null,null)
z.q(this)
new D.mb().$1(z)
return z.t()},
aB:function(a,b){if(a===0)return b.ae(this.a)
return},
aO:function(a,b){return new H.K(a,new D.mc(this),[H.j(a,0)])}},
oO:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gaI().c=z
a.gaI().e=0
z=this.a.gm()
a.gaI().b=z
z=this.b.gm()
a.gaI().d=z
return a}},
mb:{"^":"a:0;",
$1:function(a){var z=a.gaI().e
if(typeof z!=="number")return z.a4()
a.gaI().e=z+1
return a}},
mc:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gm(),z.a)||J.f(a.gm(),z.c)}},
n2:{"^":"f4;a,m:b<,c,N:d<",
a6:function(a){var z=new D.dt(null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.f4))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
j:function(a){return"StrikeDownSituation {attacker="+J.h(this.a)+",\nid="+J.h(this.b)+",\ntargetOnGround="+H.b(J.h(this.c))+",\ntime="+J.h(this.d)+",\n}"}},
dt:{"^":"d;a,b,c,d,e",
gm:function(){return this.gaI().c},
gN:function(){return this.gaI().e},
gaI:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaI().b
x=this.gaI().c
w=this.gaI().d
v=this.gaI().e
z=new D.n2(y,x,w,v)
if(y==null)H.i(P.n("attacker"))
if(x==null)H.i(P.n("id"))
if(w==null)H.i(P.n("targetOnGround"))
if(v==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,K,{"^":"",dj:{"^":"d;a,b",
j:function(a){return this.b}}}],["","",,D,{"^":"",lq:{"^":"ac;V:b<,S:c<,R:d<,a",
gX:function(){return"Fight"},
gU:function(){return},
gi:function(){return"SlayMonstersAction"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y,x,w,v
z=b.e
y=z.length!==0?C.a.gE(z):null
x=b.cA(y.gb1())
w=b.a
v=x.js(b)
w.ag(0,v)
C.a.p(z,U.j2(new H.K(w,new D.lr(a,x),[H.j(w,0)]),v,x.r,y))
return H.b(a.gi())+" initiated combat with monsters in "+x.j(0)},"$3","gM",6,0,2],
af:function(a,b){return"WARNING should not be user-visible"},
L:function(a,b){return 1},
K:function(a,b){var z=b.e
return H.aj(z.length!==0?C.a.gE(z):null,"$isad").c}},lr:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gb3()){z=a.gaX()
y=this.a.gaX()
z=z.a
y=y.a
if(z==null?y==null:z===y){z=a.gb1()
y=this.b.gi()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",ml:{"^":"ck;V:c<,S:d<,R:e<,b,a",
gU:function(){return},
gi:function(){return"TakeExitAction"},
T:[function(a,b,c){throw H.c(new P.an(null))},"$3","gO",6,0,2],
P:[function(a,b,c){var z,y,x
z=this.b
y=b.cA(z.giL())
c.p(0,z.c)
x=b.e
H.aj(x.length!==0?C.a.gE(x):null,"$isad").e9(b,a,y.gi())
c.bd(0,"\n\n",!0)
c.bd(0,y.gaS(),!0)
c.bd(0,"\n\n",!0)
return H.b(a.gi())+" went through exit to "+z.a},"$3","gM",6,0,2],
af:function(a,b){return"WARNING should not be user-visible"},
L:function(a,b){return 1},
K:function(a,b){var z=b.e
if(H.aj(z.length!==0?C.a.gE(z):null,"$isad").c===!0)return!1
this.b.gjc()
return!0},
v:{
qi:[function(a){return new Y.ml(!1,!1,null,a,null)},"$1","pN",2,0,43]}}}],["","",,F,{"^":"",
eK:function(a,b){var z=new F.dn(null,null,null,null,null)
new F.oT(a,b).$1(z)
return z.t()},
ad:{"^":"ae;",
gba:function(){return[Y.pN()]},
gbb:function(){var z=[]
C.a.ag(z,$.$get$fT())
z.push($.$get$eS())
return z},
gi:function(){return"RoomRoamingSituation"},
aK:function(){var z=new F.dn(null,null,null,null,null)
z.q(this)
new F.kJ().$1(z)
return z.t()},
aB:function(a,b){return b.a.bf(0,new F.kK(),new F.kL())},
aO:function(a,b){var z=this.aB(null,b)
if(z==null)return[]
return[z]},
fu:function(a,b){a.a.hG(new F.kN(),!0)},
e9:function(a,b,c){var z,y,x,w,v,u,t
z=a.cA(c)
a.fF(this.b,F.eK(z,z.gjr()!=null))
for(y=R.h4(b,a),y=P.V(y,!0,H.w(y,"x",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ak)(y),++v){u=a.ae(y[v].gm())
t=u.a6(new F.kM(z))
w.aM(0,u)
w.p(0,t)}},
de:function(a){if(J.f(this.a,$.$get$dQ().b))return!1
return!0}},
oT:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.gam().c=z
a.gam().e=0
z=this.a.gi()
a.gam().b=z
a.gam().d=this.b
return a}},
kJ:{"^":"a:0;",
$1:function(a){var z=a.gam().e
if(typeof z!=="number")return z.a4()
a.gam().e=z+1
return a}},
kK:{"^":"a:0;",
$1:function(a){return a.gJ()&&a.gb3()}},
kL:{"^":"a:1;",
$0:function(){return}},
kN:{"^":"a:0;",
$1:function(a){return!a.gbh()}},
kM:{"^":"a:0;a",
$1:function(a){a.sb1(this.a.b)
return a}},
mZ:{"^":"ad;b1:a<,m:b<,c,N:d<",
a6:function(a){var z=new F.dn(null,null,null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof F.ad))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)),J.l(this.c)),J.l(this.d)))},
j:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.h(this.a))+",\nid="+J.h(this.b)+",\nmonstersAlive="+J.h(this.c)+",\ntime="+J.h(this.d)+",\n}"}},
dn:{"^":"d;a,b,c,d,e",
gb1:function(){return this.gam().b},
sb1:function(a){this.gam().b=a
return a},
gm:function(){return this.gam().c},
sjt:function(a){this.gam().d=a
return a},
gN:function(){return this.gam().e},
gam:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gam().b
x=this.gam().c
w=this.gam().d
v=this.gam().e
z=new F.mZ(y,x,w,v)
if(y==null)H.i(P.n("currentRoomName"))
if(x==null)H.i(P.n("id"))
if(w==null)H.i(P.n("monstersAlive"))
if(v==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,V,{"^":"",
mn:function(){var z=new V.dv(null,null,null)
new V.oS().$1(z)
return z.t()},
mv:function(){var z=new V.dw(null,null,null)
new V.oR().$1(z)
return z.t()},
lu:function(){var z=new V.ds(null,null,null)
new V.oQ().$1(z)
return z.t()},
ls:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"mountain_pass_gate"))return!1
return!0},
P:[function(a,b,c){c.p(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
b.bD("RoomRoamingSituation").e9(b,this.el(b),"mountain_pass")
return H.b(a.gi())+" successfully performs SneakOntoCart"},"$3","gM",6,0,2],
T:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gO",6,0,2],
L:function(a,b){return 1},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gV:function(){return!1}},
mm:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"mountain_pass_gate"))return!1
if(b.fM(this.c)!=null)return!1
return!0},
P:[function(a,b,c){c.p(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
return H.b(a.gi())+" successfully performs TakeOutGateGuards"},"$3","gM",6,0,2],
T:[function(a,b,c){c.p(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.p(b.e,V.mn())
return H.b(a.gi())+" fails to perform TakeOutGateGuards"},"$3","gO",6,0,2],
L:function(a,b){return 0.5},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gV:function(){return!1}},
f8:{"^":"ae;",
gbb:function(){return[new A.by(new V.mo(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",null),new A.by(new V.mp(),"MISSING","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",null)]},
gi:function(){return"take_out_gate_guards"},
aK:function(){var z=new V.dv(null,null,null)
z.q(this)
new V.mq().$1(z)
return z.t()},
aB:function(a,b){if(a!==0)return
return b.a.av(0,new V.mr())},
aO:function(a,b){return[a.av(0,new V.ms())]}},
oS:{"^":"a:0;",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.ga1().b=z
a.ga1().c=0
return a}},
mo:{"^":"a:6;",
$4:function(a,b,c,d){J.aD(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.bX()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
mp:{"^":"a:6;",
$4:function(a,b,c,d){J.aD(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.bX()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (MISSING)"}},
mq:{"^":"a:0;",
$1:function(a){var z=a.ga1().c
if(typeof z!=="number")return z.a4()
a.ga1().c=z+1
return a}},
mr:{"^":"a:0;",
$1:function(a){return a.gJ()}},
ms:{"^":"a:0;",
$1:function(a){return a.gJ()}},
mt:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"winged_serpent_nest"))return!1
return!0},
P:[function(a,b,c){c.p(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
return H.b(a.gi())+" successfully performs ThreatenWingedSerpent"},"$3","gM",6,0,2],
T:[function(a,b,c){c.p(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.p(b.e,V.mv())
return H.b(a.gi())+" fails to perform ThreatenWingedSerpent"},"$3","gO",6,0,2],
L:function(a,b){return 0.3},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gV:function(){return!1}},
fe:{"^":"ae;",
gbb:function(){return[new A.by(new V.mw(),"get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",null),new A.by(new V.mx(),"face the winged serpent head on.","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",null)]},
gi:function(){return"threaten_winged_serpent"},
aK:function(){var z=new V.dw(null,null,null)
z.q(this)
new V.my().$1(z)
return z.t()},
aB:function(a,b){if(a!==0)return
return b.a.av(0,new V.mz())},
aO:function(a,b){return[a.av(0,new V.mA())]}},
oR:{"^":"a:0;",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.ga1().b=z
a.ga1().c=0
return a}},
mw:{"^":"a:6;",
$4:function(a,b,c,d){J.aD(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.bX()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (get Briana\u2019s help)"}},
mx:{"^":"a:6;",
$4:function(a,b,c,d){J.aD(c,"You slash at the serpent\u2019s head as it moves in to strike you!\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.\nEND")
b.bX()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (face the winged serpent head on.)"}},
my:{"^":"a:0;",
$1:function(a){var z=a.ga1().c
if(typeof z!=="number")return z.a4()
a.ga1().c=z+1
return a}},
mz:{"^":"a:0;",
$1:function(a){return a.gJ()}},
mA:{"^":"a:0;",
$1:function(a){return a.gJ()}},
lt:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"winged_serpent_nest"))return!1
return!0},
P:[function(a,b,c){c.p(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
return H.b(a.gi())+" successfully performs SootheWingedSerpent"},"$3","gM",6,0,2],
T:[function(a,b,c){c.p(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.p(b.e,V.lu())
return H.b(a.gi())+" fails to perform SootheWingedSerpent"},"$3","gO",6,0,2],
L:function(a,b){return 0.8},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gV:function(){return!1}},
eU:{"^":"ae;",
gbb:function(){return[new A.by(new V.lv(),"get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",null),new A.by(new V.lw(),"face the winged serpent head on.","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",null)]},
gi:function(){return"soothe_winged_serpent"},
aK:function(){var z=new V.ds(null,null,null)
z.q(this)
new V.lx().$1(z)
return z.t()},
aB:function(a,b){if(a!==0)return
return b.a.av(0,new V.ly())},
aO:function(a,b){return[a.av(0,new V.lz())]}},
oQ:{"^":"a:0;",
$1:function(a){var z=$.$get$ah().ai(1073741823)
a.ga1().b=z
a.ga1().c=0
return a}},
lv:{"^":"a:6;",
$4:function(a,b,c,d){J.aD(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.bX()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (get Briana\u2019s help)"}},
lw:{"^":"a:6;",
$4:function(a,b,c,d){J.aD(c,"You slash at the serpent\u2019s head as it moves in to strike you!\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.\nEND")
b.bX()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (face the winged serpent head on.)"}},
lx:{"^":"a:0;",
$1:function(a){var z=a.ga1().c
if(typeof z!=="number")return z.a4()
a.ga1().c=z+1
return a}},
ly:{"^":"a:0;",
$1:function(a){return a.gJ()}},
lz:{"^":"a:0;",
$1:function(a){return a.gJ()}},
mu:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"winged_serpent_nest"))return!1
return!0},
P:[function(a,b,c){c.p(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
return H.b(a.gi())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gM",6,0,2],
T:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gO",6,0,2],
L:function(a,b){return 1},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"Perhaps you can divert its attention."},
gV:function(){return!1}},
ji:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"ironcast_road"))return!1
return!0},
P:[function(a,b,c){c.p(0,"You sink to your knees below the grass and hold your breath. The orcs pass close, but given their proximity to Fort Ironcast don\u2019t seem eager to linger. They hurry onwards back to the mountain pass. When they are specks in the distance, you stand up and continue on.")
return H.b(a.gi())+" successfully performs HideInGrass"},"$3","gM",6,0,2],
T:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gO",6,0,2],
L:function(a,b){return 1},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"The grass here is tall enough to hide you if you crouch."},
gV:function(){return!1}},
lA:{"^":"aI;X:b<,i:c<,a",
K:function(a,b){var z=b.e
if(!J.f(H.aj(z.length!==0?C.a.gE(z):null,"$isad").a,"ironcast_road"))return!1
return!0},
P:[function(a,b,c){throw H.c(new P.F("Success chance is 0%."))},"$3","gM",6,0,2],
T:[function(a,b,c){c.p(0,"You raise a war cry and close the gap against the battle-eager orcs. But it soon becomes clear that you are outnumbered and outflanked. The orcs surround you, beat you down, and cast you in chains. You trail blood as you are led up the mountain pass you traversed years ago, once again a slave.")
return H.b(a.gi())+" fails to perform StandAndFight"},"$3","gO",6,0,2],
L:function(a,b){return 0},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gR:function(){return},
gU:function(){return"This patrol won\u2019t get in between you and the fort."},
gV:function(){return!1}},
n3:{"^":"f8;m:a<,N:b<",
a6:function(a){var z=new V.dv(null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.f8))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)))},
j:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dv:{"^":"d;a,b,c",
gm:function(){return this.ga1().b},
gN:function(){return this.ga1().c},
ga1:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x
z=this.a
if(z==null){y=this.ga1().b
x=this.ga1().c
z=new V.n3(y,x)
if(y==null)H.i(P.n("id"))
if(x==null)H.i(P.n("time"))}this.q(z)
return z}},
n5:{"^":"fe;m:a<,N:b<",
a6:function(a){var z=new V.dw(null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.fe))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)))},
j:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
dw:{"^":"d;a,b,c",
gm:function(){return this.ga1().b},
gN:function(){return this.ga1().c},
ga1:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x
z=this.a
if(z==null){y=this.ga1().b
x=this.ga1().c
z=new V.n5(y,x)
if(y==null)H.i(P.n("id"))
if(x==null)H.i(P.n("time"))}this.q(z)
return z}},
n1:{"^":"eU;m:a<,N:b<",
a6:function(a){var z=new V.ds(null,null,null)
z.q(this)
a.$1(z)
return z.t()},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.eU))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.a2(Y.k(Y.k(0,J.l(this.a)),J.l(this.b)))},
j:function(a){return"SootheWingedSerpentRescueSituation {id="+J.h(this.a)+",\ntime="+J.h(this.b)+",\n}"}},
ds:{"^":"d;a,b,c",
gm:function(){return this.ga1().b},
gN:function(){return this.ga1().c},
ga1:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
q:function(a){this.a=a},
t:function(){var z,y,x
z=this.a
if(z==null){y=this.ga1().b
x=this.ga1().c
z=new V.n1(y,x)
if(y==null)H.i(P.n("id"))
if(x==null)H.i(P.n("time"))}this.q(z)
return z}}}],["","",,N,{"^":"",
qw:[function(a){var z,y,x,w,v,u
z=[P.m]
y=H.t([],z)
x=P.H(null,null,null,null)
w=$.$get$cQ()
x=new R.ba(null,!0,y,null,null,C.h,1,1,0,null,100,!0,!1,x,null,null,!0,C.j,null,w,null)
new N.pn().$1(x)
v=x.t()
z=new R.ba(null,!0,H.t([],z),null,null,C.h,1,1,0,null,100,!0,!1,P.H(null,null,null,null),null,null,!0,C.j,null,w,null)
new N.po().$1(z)
u=z.t()
if(a.fM("take_out_gate_guards")==null)return[v,u]
else return[v]},"$1","pR",2,0,44],
pn:{"^":"a:0;",
$1:function(a){var z
a.gn()
a.y=1000
a.gn()
a.cy="orc"
a.gn()
a.dx=!1
a.gn()
a.dy=C.u
z=$.$get$ar()
a.gn()
a.c=new U.bB(!1,10,!0,z,"sword",C.c)
a.gn()
a.f=2
a.gn()
a.r=2
z=$.$get$c2()
a.gn()
a.fx=z
a.gn()
a.fy=O.cN()
return a}},
po:{"^":"a:0;",
$1:function(a){var z
a.gn()
a.y=1001
a.gn()
a.cy="goblin"
a.gn()
a.dx=!1
a.gn()
a.dy=C.u
z=$.$get$ar()
a.gn()
a.c=new U.bB(!1,10,!0,z,"scimitar",C.c)
z=$.$get$c2()
a.gn()
a.fx=z
a.gn()
a.fy=O.cN()
return a}}}],["","",,O,{"^":"",
qt:[function(a){var z,y
z=$.$get$cS()
y=z.u
if(y.length>0){y+=" "
z.u=y}z.u=y+a},"$1","pz",2,0,10],
qu:[function(a){$.dU=a},"$1","pA",2,0,10],
fZ:[function(a,b,c,d,e,f,g){var z=L.e5(a,!1,!1,d,e,f,g)
$.$get$bH().p(0,z)
return z},function(a){return O.fZ(a,!1,!1,null,null,null,null)},function(a,b,c){return O.fZ(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","py",2,13,46,0,0,0,1,1,0],
kU:{"^":"l4;",
b8:function(){var z=0,y=new P.al(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$b8=P.ai(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cD){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.D(m.C())
m=t.Q
n=Z.lJ()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.C()
m.a.D(l.C())
new P.C(0,$.o,null,[null]).b_(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.D(m.C())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.c_(0)
m.a.D(n.C())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.D(m.C())
w=7
z=10
return P.u(t.c7(),$async$b8,y)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.y(j)
if(n instanceof M.cc){r=n
q=H.A(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.r(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.D(l.C())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.r(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.D(l.C())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.f(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.D(m.C())
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$b8,y)},
ed:function(){var z,y
this.eM()
this.f.aJ(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fs(Z.bz())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bz()
z.a.D(y.C())
this.b8()},
k0:[function(a){var z,y
z={}
z.a=null
y=$.$get$bH()
y.I(0,new O.lf(z,this,a))
z=z.a
if(z==null)throw H.c(P.z("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.h(y)+")"))
this.hX(z)
this.b8()},"$1","ghI",2,0,30],
hX:function(a){var z
if(a.gfd()!=null){z=a.r
$.$get$c0().al(z)}z=a.x
if(z!=null)this.dM(z)},
c7:function(){var z=0,y=new P.al(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$c7=P.ai(function(a1,a2){if(a1===1){v=a2
z=w}while(true)switch(z){case 0:s={}
p=$.$get$c1()
o=p.b
if(o.b!==o.c){s=t.Q
s.toString
o=new A.r(667,null,null,null,null)
o.c="Awarding points."
s.a.D(o.C())
n=p.b.d_()
p=t.Q
o=n.giu()
s=n.b
m=n.c
p.toString
l=new A.r(70,null,null,null,null)
l.b=[o,s]
l.c=m
p.a.D(l.C())
p=new P.C(0,$.o,null,[null])
p.b_(null)
p.bz(new O.l5(t))
x=!0
z=1
break}k=t.x===t.e.gah().length-1||t.x===t.y
s.a=k
p=t.x
o=t.y
if(p!==o)if(p!=null){if(p<t.e.gah().length){p=t.e.gah()
m=t.x
if(m>>>0!==m||m>=p.length){x=H.e(p,m)
z=1
break}m=!!J.p(p[m]).$isI
p=m}else p=!1
j=p}else j=!1
else j=!1
p="atEndOfPage = "+k+", atStaticChoiceList = "+j
m=t.Q
m.toString
i=new A.r(667,null,null,null,null)
i.c=p
m.a.D(i.C())
i=$.$get$bH()
i.hF(new O.l6(t),!1)
if(i.gk(i)!==0){p=t.Q
p.toString
m=new A.r(667,null,null,null,null)
m.c="We have choices."
p.a.D(m.C())
m=H.w(i,"aT",0)
m=P.V(new H.K(i,new O.l7(s,j),[m]),!0,m)
p=i.a
H.t([],[L.Z])
h=new L.e6(p,m)
if(!h.gH(h)){s=t.Q
p=s.e
if(p!=null){p.cT(new D.bK("Showing new choice before previous one was selected."))
s.e=null}p=P.v
s.e=new P.bV(new P.C(0,$.o,null,[p]),[p])
p=h.d4()
s.a.D(p.C())
s=s.e.a.bz(t.ghI())
g=new O.l8(t)
p=H.j(s,0)
o=$.o
if(o!==C.f){g=P.dM(g,o)
o.toString}s.cG(new P.dF(null,new P.C(0,o,null,[p]),6,new O.l9(),g,[p,p]))
x=!0
z=1
break}else{f=i.bf(0,new O.la(),new O.lb())
if(f!=null){if(f.gfd()!=null){p=f.r
$.$get$c0().al(p)}p=f.x
if(p!=null)t.dM(p)
i.aM(0,f)}}}p=$.$get$c0()
m=p.b
e=p.c
z=m!==e?3:4
break
case 3:++p.d
s=p.a
o=s.length
e=(e-1&o-1)>>>0
p.c=e
if(e<0||e>=o){x=H.e(s,e)
z=1
break}d=s[e]
s[e]=null
z=5
return P.u(t.c9(d),$async$c7,y)
case 5:x=a2
z=1
break
case 4:p=$.dU
if(p!=null){t.dM(p)
$.dU=null
x=!1
z=1
break}p=t.x
if(p==null){t.x=0
p=0}else if(p===o){p=t.e.gah().length-1
t.x=p}else if($.fN)$.fN=!1
else{++p
t.x=p}s.a=p===t.e.gah().length-1
p="Resolving block: '"+H.b(t.e.gi())+"' block "+H.b(t.x)+"."
o=t.Q
o.toString
m=new A.r(667,null,null,null,null)
m.c=p
o.a.D(m.C())
if(t.x===t.e.gah().length){s=t.Q
s.toString
p=new A.r(667,null,null,null,null)
p.c="End of book."
s.a.D(p.C())
p=t.Q
s=t.ds()
p.toString
s=s.eh(50)
p.a.D(s.C())
t.Q.a.D(new A.r(80,null,null,null,null).C())
x=!0
z=1
break}p=t.e.gah()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
z=typeof o==="string"?6:8
break
case 6:s=t.Q
p=t.e.gah()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
p=P.X
s.f=new P.bV(new P.C(0,$.o,null,[p]),[p])
p=new A.r(30,null,null,null,null)
p.c=o
s.a.D(p.C())
s.f.a.bz(new O.lc(t))
x=!0
z=1
break
z=7
break
case 8:p=t.e.gah()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}z=!!J.p(p[o]).$isI?9:11
break
case 9:p=t.Q
p.toString
o=new A.r(667,null,null,null,null)
o.c="A ChoiceList encountered."
p.a.D(o.C())
try{p=t.e.gah()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}i.is(p[o])}catch(a0){s=H.y(a0)
if(s instanceof M.cc){r=s
q=H.A(a0)
s=t.Q
p=H.b(r)+"\nStacktrace: "+H.b(q)
s.toString
o=new A.r(666,null,null,null,null)
o.c="AuthorScriptException: "+p
s.a.D(o.C())
x=!0
z=1
break}else throw a0}p=t.Q
p.toString
o=new A.r(667,null,null,null,null)
o.c="- choices added"
p.a.D(o.C())
if(i.bQ(0,new O.ld(s,t))&&t.x===t.e.gah().length-1){s=t.Q
s.toString
p=new A.r(667,null,null,null,null)
p.c="Creating & sending savegame"
s.a.D(p.C())
p=t.Q
s=t.ds()
p.toString
s=s.eh(50)
p.a.D(s.C())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:p=t.e.gah()
o=t.x
if(o>>>0!==o||o>=p.length){x=H.e(p,o)
z=1
break}o=p[o]
p={func:1,ret:[P.N,P.aV]}
z=H.aq(o,p)?12:14
break
case 12:b=t.x===t.e.gah().length-1?t.ds():null
o=t.e.gah()
m=t.x
if(m>>>0!==m||m>=o.length){x=H.e(o,m)
z=1
break}z=15
return P.u(t.c9(H.h1(o[m],p)),$async$c7,y)
case 15:a=a2
if(i.bQ(0,new O.le(s,t))&&t.x===t.e.gah().length-1){s=t.Q
s.toString
p=b.eh(50)
s.a.D(p.C())}x=a
z=1
break
z=13
break
case 14:s=t.e.gah()
p=t.x
if(p>>>0!==p||p>=s.length){x=H.e(s,p)
z=1
break}throw H.c(new P.F("Invalid block: "+H.b(s[p])))
case 13:case 10:case 7:case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c7,y)},
dM:function(a){var z,y,x,w,v
z=$.$get$cg()
if(z.b.test(H.bh(a))){y=this.d
if(y==null)throw H.c(new P.F("Cannot use ["+J.h(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aP()
w=z-1}else{x=this.b.da(a,this.e.gdc())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.p(0,H.b(z.gi())+">>"+H.b(y.gi()))
this.r=!0}if(this.f.Y(0,H.b(this.e.gi())+">>"+H.b(x.gi()))||x.gfQ()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfQ()
else z=!1}else z=!1
$.fL=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.D(v.C())
v=this.e
this.d=new O.kV(v,this.x)
this.e=x
this.x=w
v.e=J.a_(v.gd5(),1)},
eM:function(){var z,y,x,w,v,u
this.x=null
$.$get$c0().aJ(0)
$.$get$bH().sk(0,0)
$.or=null
x=$.$get$c5()
x.aJ(0)
w=$.$get$c1()
x.l(0,"points",w)
w.a=0
w.b.aJ(0)
this.b.iw()
$.h9=!0
try{this.j6()}catch(v){x=H.y(v)
z=x
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.D(u.C())
throw H.c(z)}this.fB()
$.h9=!1},
c9:function(a){var z=0,y=new P.al(),x,w=2,v,u=[],t=this,s,r,q,p,o,n
var $async$c9=P.ai(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$cS()
q.u=""
w=4
z=7
return P.u(a.$0(),$async$c9,y)
case 7:w=2
z=6
break
case 4:w=3
n=v
o=H.y(n)
s=o
r=H.A(n)
q.u+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
throw H.c(new M.cc(J.h(s),t.e.gi(),t.x))
z=6
break
case 3:z=2
break
case 6:if(q.u.length!==0){t.Q.ep(J.h(q)).bz(new O.lg(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$c9,y)},
hP:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cg().b.test(H.bh(z)))return!1
y=this.b.da(z,this.e.gdc())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.D(w.C())
return!0}y.gjS()
return!1},"$1","geQ",2,0,47],
ds:function(){var z,y,x,w,v,u
this.fB()
try{x=this.e.gi()
w=$.$get$c5()
x=new Z.eL(x,this.b.iR(),null,null,null,null)
x.c=H.aC(Z.cy(w),"$isE",[P.m,P.d],"$asE")
x.f=Date.now()
x.e=C.d.jP(H.a1(x),16)
return x}catch(v){x=H.y(v)
z=x
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.D(u.C())
throw H.c(z)}},
fn:function(a,b){var z,y,x
this.eM()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.d2("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.D(x.C())
z.j3(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Importing player chronology."
z.a.D(y.C())
this.f.ag(0,b)}z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.D(y.C())
y=$.$get$c5()
Z.kR(a,y,P.eu(P.m,P.bq))
this.cx=H.aj(y.h(0,"game"),"$ised")
this.cy=H.aC(y.h(0,"hitpoints"),"$isax",[P.aB],"$asax")
this.db=H.aC(y.h(0,"stamina"),"$isax",[P.v],"$asax")
y=this.Q
Z.fs(Z.bz())
y.toString
z=new A.r(90,null,null,null,null)
z.b=Z.bz()
y.a.D(z.C())
z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="loadFromSaveGame() done."
z.a.D(y.C())
this.b8()},
jm:function(a){return this.fn(a,null)},
df:[function(a,b,c,d){var z=0,y=new P.al(),x,w=2,v,u=this,t,s,r
var $async$df=P.ai(function(e,f){if(e===1){v=f
z=w}while(true)switch(z){case 0:t=$.$get$cS()
if(t.u.length!==0){u.Q.ep(J.h(t))
t.u=""}t=u.Q
t.toString
s=new A.r(130,null,null,null,null)
s.b=[a,b,d,c]
t.a.D(s.C())
s=U.bT
r=new P.C(0,$.o,null,[s])
t.x=new P.bV(r,[s])
x=r
z=1
break
case 1:return P.u(x,0,y)
case 2:return P.u(v,1,y)}})
return P.u(null,$async$df,y)},function(a,b){return this.df(a,b,null,!1)},"jX","$4$rerollEffectDescription$rerollable","$2","gh8",4,5,32,1,0]},
lf:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seq(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.D(x.C())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cg().b.test(H.bh(z))?y.d.a:y.b.da(z,y.e.gdc())
if(w!=null){y.f.p(0,H.b(y.e.gi())+">>"+H.b(w.gi()))
y.r=!0}}}}},
l5:{"^":"a:0;a",
$1:function(a){return this.a.b8()}},
l6:{"^":"a:0;a",
$1:function(a){return a.geq()||this.a.hP(a)}},
l7:{"^":"a:33;a,b",
$1:function(a){return a.jd(this.b,this.a.a)}},
l8:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.D(x.C())
return}},
l9:{"^":"a:0;",
$1:function(a){return a instanceof D.bK}},
la:{"^":"a:0;",
$1:function(a){return a.gje()}},
lb:{"^":"a:1;",
$0:function(){return}},
lc:{"^":"a:0;a",
$1:function(a){return this.a.b8()}},
ld:{"^":"a:0;a,b",
$1:function(a){return a.cV(!0,this.a.a,this.b.geQ())}},
le:{"^":"a:0;a,b",
$1:function(a){return a.cV(!0,this.a.a,this.b.geQ())}},
lg:{"^":"a:0;a",
$1:function(a){return this.a.b8()}},
ko:{"^":"d;a,b,f8:c<",
ij:function(a,b,c){var z
if(!$.fL){z=J.a_(this.a,b)
this.a=z
this.b.al(new A.cs(b,z,c))}},
p:function(a,b){return this.ij(a,b,null)},
a4:function(a,b){this.p(0,b)
return this},
C:function(){return P.a8(["points",this.a])},
fP:function(a){this.a=a.h(0,"points")
this.b.aJ(0)},
hh:function(){this.b=P.aU(null,A.cs)},
$isdp:1},
cz:{"^":"k7;ah:d<,d5:e@,a,b,c",
gfQ:function(){return J.a0(this.e,0)}},
kV:{"^":"d;a,b"},
l0:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
da:function(a,b){var z
if(b!=null&&this.a.W(b+": "+H.b(a)))return this.a.h(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.W(a))return z.h(0,a)
else return}},
l:function(a,b,c){this.a.l(0,b,c)
c.si(b)},
iR:function(){var z=new H.O(0,null,null,null,null,null,0,[P.m,null])
this.a.I(0,new O.l2(z))
return z},
j3:function(a){a.I(0,new O.l3(this))},
iw:function(){this.a.I(0,new O.l1())}},
l2:{"^":"a:5;a",
$2:function(a,b){this.a.l(0,a,P.a8(["visitCount",b.gd5()]))}},
l3:{"^":"a:5;a",
$2:function(a,b){var z=this.a.a
if(z.W(a))z.h(0,a).sd5(J.at(b,"visitCount"))}},
l1:{"^":"a:5;",
$2:function(a,b){b.sd5(0)}}}],["","",,M,{"^":"",cc:{"^":"d;a,b,c",
j:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
e2:function(a){return new M.cc(a,null,null)}}}}],["","",,M,{"^":"",l4:{"^":"d;"}}],["","",,Z,{"^":"",eL:{"^":"d;a,b,c,d,e,f",
eh:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.r(a,null,null,null,null)
z.c=this.d3()
return z},
d3:function(){var z,y
z=new H.O(0,null,null,null,null,null,0,[P.m,null])
z.l(0,"uid",this.e)
z.l(0,"currentPageName",this.a)
z.l(0,"pageMapState",this.b)
z.l(0,"vars",this.c)
z.l(0,"timestamp",this.f)
y=this.d
if(y!=null)z.l(0,"previousText",y)
return C.w.fc(z)},
j:function(a){return this.d3()},
v:{
eM:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.p(a)
z=!!z.$isI||!!z.$isE}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.p(a).$isdp},
cy:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.p(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gk(a);++x)if(Z.eM(z.h(a,x)))y.push(Z.cy(z.h(a,x)))
return y}else if(!!z.$isE){w=new H.O(0,null,null,null,null,null,0,[null,null])
z.I(a,new Z.kQ(a,w))
return w}else if(!!z.$isdp){v=a.C()
v.l(0,"_class",a.gf8())
return Z.cy(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cx:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.p(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gk(a);++x)y.push(Z.cx(z.h(a,x),b,null))
return y}else{w=!!z.$isE
if(w&&!a.W("_class")){v=new H.O(0,null,null,null,null,null,0,[null,null])
z.I(a,new Z.kP(b,v))
return v}else if(w&&a.W("_class"))if(c!=null){c.fP(a)
return c}else{u=z.h(a,"_class")
if(!b.W(u))throw H.c(new Z.d2("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
kR:function(a,b,c){a.c.I(0,new Z.kS(b,c))}}},kQ:{"^":"a:5;a,b",
$2:function(a,b){if(Z.eM(this.a.h(0,a)))this.b.l(0,a,Z.cy(b))}},kP:{"^":"a:5;a,b",
$2:function(a,b){this.b.l(0,a,Z.cx(b,this.a,null))}},kS:{"^":"a:34;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.l(0,a,Z.cx(b,x,null))
else z.l(0,a,Z.cx(b,x,y))}},d2:{"^":"d;a",
j:function(a){return"IncompatibleSavegameException: "+this.a}},jl:{"^":"d;a",
j:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",kt:{"^":"d;"},ks:{"^":"kt;"},jt:{"^":"ks;a,b,c,d,e,f,r,x",
k8:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.m
n=[o,P.d]
H.aC(a,"$isE",n,"$asE")
m=new A.r(a.h(0,"type"),null,null,null,null)
if(a.W("strContent"))m.c=a.h(0,"strContent")
if(a.W("listContent"))m.b=a.h(0,"listContent")
if(a.W("intContent"))m.d=a.h(0,"intContent")
if(a.W("mapContent"))m.e=H.aC(a.h(0,"mapContent"),"$isE",n,"$asE")
z=m
switch(z.gei()){case 1070:o=this.e
if(o!=null){o.cT(new D.bK("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.b0()
o.b.b0()
return
case 1000:o=new A.r(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.D(o.C())
n.D(new A.r(10,null,this.c.ch,null,null).C())
return
case 1050:l=z.gj7()
this.e.bs(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.D(o.C())
o=z.gjo()
if(!o.W("__submitted__"))o.l(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.i(n.c2())
n.bp(new G.iy(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.D(o.C())
k=J.at(z.ge7(),0)
j=J.at(z.ge7(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.z,k)
o.bs(new U.bT(C.z[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.D(o.C())
o=this.e
if(o!=null){o.cT(new D.bK("Book Restart before choice was selected."))
this.e=null}try{this.c.ed()}catch(i){o=H.y(i)
y=o
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.D(o.C())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bz()
n.D(o.C())
n.D(new A.cs(0,0,null).d4().C())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.D(h.C())
h=this.e
if(h!=null){h.cT(new D.bK("Book Load before choice was selected."))
this.e=null}try{h=z.ghc()
f=new Z.eL(null,null,null,null,null,null)
e=H.aC(C.w.iD(h),"$isE",n,"$asE")
if(!e.W("currentPageName")||!e.W("vars"))H.i(new Z.jl("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.aC(e.h(0,"pageMapState"),"$isE",n,"$asE")
f.c=H.aC(e.h(0,"vars"),"$isE",n,"$asE")
if(e.W("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.aC(J.hy(z.ge7()),"$isbx",[o],"$asbx")
o=this.c
if(v!=null)o.fn(w,v)
else o.jm(w)}catch(i){o=H.y(i)
if(o instanceof Z.d2){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.D(o.C())
this.c.ed()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.D(o.C())
this.c.ed()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bz()
g.D(o.C())}catch(i){o=H.y(i)
q=o
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.D(o.C())
throw H.c(q)}this.c.toString
g.D(new A.cs(0,$.$get$c1().a,null).d4().C())
return
case 1090:this.f.bs(!0)
this.f=null
return
case 1040:this.c.b8()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gei())+"."
this.a.D(o.C())}},"$1","ghV",2,0,15],
ep:function(a){var z=P.X
this.f=new P.bV(new P.C(0,$.o,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.D(z.C())
return this.f.a}},bK:{"^":"d;a",
j:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",iy:{"^":"d;a",
C:function(){return P.bP(this.a,null,null)},
j:function(a){return"<CurrentState submitted="+H.b(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;ei:a<,e7:b<,hc:c<,j7:d<,jo:e<",
gjR:function(){var z=this.a
switch(z){case 10:return"SEND_BOOK_UID"
case 20:return"NO_RESULT"
case 30:return"TEXT_RESULT"
case 40:return"SHOW_CHOICES"
case 50:return"SAVE_GAME"
case 60:return"SAVE_PLAYER_CHRONOLOGY"
case 70:return"POINTS_AWARD"
case 80:return"END_OF_BOOK"
case 90:return"SET_STATS"
case 100:return"UPDATE_STATS"
case 110:return"SHOW_FORM"
case 120:return"UPDATE_FORM"
case 666:return"SCRIPTER_ERROR"
case 667:return"SCRIPTER_LOG"
case 1000:return"REQUEST_BOOK_UID"
case 1010:return"START"
case 1020:return"LOAD_GAME"
case 1040:return"PROCEED"
case 1050:return"CHOICE_SELECTED"
case 1060:return"FORM_INPUT"
case 130:return"SHOW_SLOT_MACHINE"
case 1090:return"TEXT_SHOWN"
case 1070:return"QUIT"
default:return"Unknown type="+H.b(z)}},
d3:function(){return C.w.fc(this.C())},
C:function(){var z,y
z=new H.O(0,null,null,null,null,null,0,[P.m,P.d])
z.l(0,"type",this.a)
y=this.c
if(y!=null)z.l(0,"strContent",y)
y=this.b
if(y!=null)z.l(0,"listContent",y)
y=this.d
if(y!=null)z.l(0,"intContent",y)
y=this.e
if(y!=null)z.l(0,"mapContent",y)
return z},
j:function(a){var z,y,x
z="Message "+this.gjR()
y=this.a
x=J.p(y)
return z+(x.A(y,50)||x.A(y,60)||x.A(y,90)||x.A(y,100)||x.A(y,666)||x.A(y,667)?" (async)":"")}}}],["","",,E,{"^":"",k7:{"^":"d;i:a@,jS:b<",
j:function(a){return this.a},
gdc:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.hs(z,": ")
if(y>0)return J.hx(this.a,0,y)
else return}}}],["","",,A,{"^":"",cs:{"^":"d;iu:a<,b,c",
j:function(a){return"Score +"+H.b(this.a)+"."},
d4:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",Z:{"^":"d;eq:a@,b,c,d,aD:e<,U:f<,fd:r<,x,y",
gje:function(){return this.e.length===0},
cV:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
if(b!=null)!b
if(a!=null)!a
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jd:function(a,b){return this.cV(a,b,null)},
jN:function(){return P.a8(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bz:function(a){this.r=a
return this},
be:function(a,b){return C.b.be(this.e,b.gaD())},
j:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hf:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.z("String given to choice cannot be null."))
this.e=J.bi(a).fN(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.Z]},
v:{
e5:function(a,b,c,d,e,f,g){var z=new L.Z(!1,null,null,null,null,e,null,d,g)
z.hf(a,!1,!1,d,e,f,g)
return z}}},e6:{"^":"ev;a,b",
gk:function(a){return this.b.length},
sk:function(a,b){C.a.sk(this.b,b)
return b},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
l:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
is:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
v=J.J(a)
if(v.h(a,0)!=null&&!!J.p(v.h(a,0)).$isbq)try{this.a=v.h(a,0).$0()}catch(u){v=H.y(u)
z=v
throw H.c(M.e2(J.h(z)))}else this.a=null
t=this.b
s={func:1,ret:[P.N,P.aV]}
r=1
while(!0){q=v.gk(a)
if(typeof q!=="number")return H.D(q)
if(!(r<q))break
y=v.h(a,r)
x=null
if(J.at(y,"string")!=null&&!!J.p(J.at(y,"string")).$isbq)try{x=J.at(y,"string").$0()}catch(u){v=H.y(u)
w=v
throw H.c(M.e2(J.h(w)))}else x=""
q=x
p=J.at(y,"goto")
o=H.h1(J.at(y,"script"),s)
n=new L.Z(!1,null,null,null,null,null,null,p,J.at(y,"submenu"))
if(q==null)H.i(P.z("String given to choice cannot be null."))
n.e=J.bi(q).fN(q)
n.d=C.b.gB(q)
n.r=o
n.b=!1
n.c=!1
C.a.p(t,n);++r}},
iq:function(a,b,c,d,e,f,g){if(b instanceof L.Z)C.a.p(this.b,b)
else if(typeof b==="string")C.a.p(this.b,L.e5(b,!1,!1,e,null,f,g))
else throw H.c(P.z("To add a choice to choices, one must provide either a new Choice element or a String."))},
p:function(a,b){return this.iq(a,b,!1,!1,null,null,null)},
jO:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.j(z,0)
x=P.V(new H.K(z,new L.ib(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.r(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.I(x,new L.ic(w))
return w},
d4:function(){return this.jO(null,null,null,null)},
j:function(a){return new H.am(this.b,new L.id(),[null,null]).cW(0,", ")},
$asev:function(){return[L.Z]},
$aseA:function(){return[L.Z]},
$asI:function(){return[L.Z]},
$asU:function(){return[L.Z]}},ib:{"^":"a:0;a,b,c",
$1:function(a){return a.cV(this.b,this.a,this.c)}},ic:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aD(this.a.b,a.jN())
a.a=!0}},id:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cA:{"^":"d;cE:a<,aD:b<",
C:function(){return P.a8(["show",this.a,"string",this.b])}},lG:{"^":"d;a",
C:function(){var z=new H.O(0,null,null,null,null,null,0,[P.m,P.d])
this.a.I(0,new Z.lH(z))
return z},
I:function(a,b){this.a.I(0,b)}},lH:{"^":"a:35;a",
$2:function(a,b){this.a.l(0,a,b.C())}},fr:{"^":"d;i:a@,aS:b<,f9:c<,cZ:d<,cE:e<,ft:f<,aD:r<",v:{
fs:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t(new Array(a.length),[Z.fr])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ak)(a),++v){u=a[v]
t=J.J(u)
s=t.h(u,"name")
r=t.h(u,"description")
q=t.h(u,"color")
p=t.h(u,"priority")
o=t.h(u,"show")
n=t.h(u,"notifyOnChange")
t=t.h(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fr(s,r,q,p,o,n,t);++w}C.a.cF(z,new Z.mH())
return z}}},mH:{"^":"a:5;",
$2:function(a,b){return J.as(b.gcZ(),a.gcZ())}},ax:{"^":"d;i:a<,aS:b<,c,f9:d<,cZ:e<,f,r,ft:x<,f6:y@,f8:z<,$ti",
gat:function(){return this.f},
sat:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cD=!0}},
gcE:function(){return this.r},
gaD:function(){return this.c.$1(this.f)},
C:function(){return P.a8(["name",this.a,"value",this.f,"show",this.r])},
fP:function(a){var z
this.sat(H.hk(a.h(0,"value"),H.j(this,0)))
z=a.h(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cD=!0}},
$isdp:1,
v:{
cB:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cC()
y=z.W(a)?H.aC(z.h(0,a),"$isax",[h],"$asax"):new Z.ax(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.hk(e,h)
y.r=!0
z.l(0,a,y)
return y},
lJ:function(){var z,y
z=new Z.lG(new H.O(0,null,null,null,null,null,0,[P.m,Z.cA]))
y=$.$get$cC().gc0()
new H.K(y,new Z.lK(),[H.w(y,"x",0)]).I(0,new Z.lL(z))
$.cD=!1
return z},
bz:function(){var z=H.t([],[[P.E,P.m,P.d]])
$.$get$cC().gc0().I(0,new Z.lI(z))
return z}}},lK:{"^":"a:0;",
$1:function(a){return a.gf6()}},lL:{"^":"a:18;a",
$1:function(a){var z,y
z=a.gcE()
y=a.gaD()
a.sf6(!1)
this.a.a.l(0,a.a,new Z.cA(z,y))}},lI:{"^":"a:18;a",
$1:function(a){var z=new H.O(0,null,null,null,null,null,0,[P.m,P.d])
z.l(0,"name",a.gi())
z.l(0,"description",a.gaS())
z.l(0,"color",a.gf9())
z.l(0,"priority",a.gcZ())
z.l(0,"show",a.gcE())
z.l(0,"notifyOnChange",a.gft())
z.l(0,"string",a.gaD())
this.a.push(z)}}}],["","",,B,{"^":"",jQ:{"^":"d;"},pY:{"^":"jS;"},jR:{"^":"jQ;"},jS:{"^":"jR;"}}],["","",,N,{"^":"",da:{"^":"d;i:a<,b,c,hw:d<,e,f",
gfg:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gi(),"")
x=this.a
return y?x:z.gfg()+"."+x},
ge6:function(){if($.h7){var z=this.b
if(z!=null)return z.ge6()}return $.oz},
jn:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.ge6().b){if(!!J.p(b).$isbq)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.h(b)}else v=null
if(d==null&&x>=$.pw.b)try{x="autogenerated stack trace for "+a.j(0)+" "+H.b(b)
throw H.c(x)}catch(u){x=H.y(u)
z=x
y=H.A(u)
d=y
if(c==null)c=z}e=$.o
x=b
w=this.gfg()
t=c
s=d
r=Date.now()
q=$.ew
$.ew=q+1
p=new N.jL(a,x,v,w,new P.ci(r,!1),q,t,s,e)
if($.h7)for(o=this;o!=null;){o.eT(p)
o=o.b}else $.$get$ey().eT(p)}},
bU:function(a,b,c,d){return this.jn(a,b,c,d,null)},
iU:function(a,b,c){return this.bU(C.Q,a,b,c)},
a3:function(a){return this.iU(a,null,null)},
iT:function(a,b,c){return this.bU(C.P,a,b,c)},
aT:function(a){return this.iT(a,null,null)},
iS:function(a,b,c){return this.bU(C.R,a,b,c)},
bv:function(a){return this.iS(a,null,null)},
j5:function(a,b,c){return this.bU(C.y,a,b,c)},
fm:function(a){return this.j5(a,null,null)},
jT:function(a,b,c){return this.bU(C.U,a,b,c)},
ej:function(a){return this.jT(a,null,null)},
h7:function(a,b,c){return this.bU(C.T,a,b,c)},
dd:function(a){return this.h7(a,null,null)},
eT:function(a){},
v:{
b1:function(a){return $.$get$ex().fD(a,new N.oV(a))}}},oV:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dh(z,"."))H.i(P.z("name shouldn't start with a '.'"))
y=C.b.jk(z,".")
if(y===-1)x=z!==""?N.b1(""):null
else{x=N.b1(C.b.ax(z,0,y))
z=C.b.bm(z,y+1)}w=new H.O(0,null,null,null,null,null,0,[P.m,N.da])
w=new N.da(z,x,null,w,new P.fu(w,[null,null]),null)
if(x!=null)x.ghw().l(0,z,w)
return w}},aF:{"^":"d;i:a<,at:b<",
A:function(a,b){if(b==null)return!1
return b instanceof N.aF&&this.b===b.b},
au:function(a,b){return C.d.au(this.b,b.gat())},
bG:function(a,b){return C.d.bG(this.b,b.gat())},
bF:function(a,b){var z=b.gat()
if(typeof z!=="number")return H.D(z)
return this.b>z},
bC:function(a,b){return this.b>=b.gat()},
be:function(a,b){var z=b.gat()
if(typeof z!=="number")return H.D(z)
return this.b-z},
gB:function(a){return this.b},
j:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aF]}},jL:{"^":"d;e6:a<,b,ar:c<,d,N:e<,f,b2:r<,aZ:x<,y",
j:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bj:function(a){return X.dJ(J.hp(a,0,new X.pe()))},
bd:function(a,b){var z=J.a_(a,b)
if(typeof z!=="number")return H.D(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dJ:function(a){if(typeof a!=="number")return H.D(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
pe:{"^":"a:5;",
$2:function(a,b){return X.bd(a,J.l(b))}}}],["","",,U,{"^":"",cw:{"^":"d;a,b",
j:function(a){return this.b}},bT:{"^":"d;a,jU:b<",
ge4:function(){return this.a===C.B},
j:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
A:function(a,b){if(b==null)return!1
return b instanceof U.bT&&b.a===this.a&&J.f(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
qv:[function(a,b){var z,y,x,w,v
z=new D.jt(b,null,null,null,null,null,null,null)
y=$.eI
$.eI=y+1
x=new H.bS(y,null,!1)
w=init.globalState.d
w.dk(y,x)
w.ce()
w=new H.kA(x,null)
w.hi(x)
z.b=w
w=w.b
w.toString
new P.cF(w,[H.j(w,0)]).an(z.ghV(),null,null,null)
b.D(new H.bZ(z.b.a,init.globalState.d.a))
v=N.kX()
z.c=v
v.Q=z},"$2","h_",4,0,31]},1]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.en.prototype
return J.jv.prototype}if(typeof a=="string")return J.bO.prototype
if(a==null)return J.eo.prototype
if(typeof a=="boolean")return J.em.prototype
if(a.constructor==Array)return J.bM.prototype
if(!(a instanceof P.d))return J.b9.prototype
return a}
J.aP=function(a){if(a==null)return a
if(a.constructor==Array)return J.bM.prototype
if(!(a instanceof P.d))return J.b9.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(a.constructor==Array)return J.bM.prototype
if(!(a instanceof P.d))return J.b9.prototype
return a}
J.aa=function(a){if(typeof a=="number")return J.bN.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b9.prototype
return a}
J.dT=function(a){if(typeof a=="number")return J.bN.prototype
if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b9.prototype
return a}
J.bi=function(a){if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.b9.prototype
return a}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.dT(a).a4(a,b)}
J.bk=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aa(a).d7(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).A(a,b)}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aa(a).bF(a,b)}
J.c6=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aa(a).au(a,b)}
J.bl=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dT(a).bH(a,b)}
J.ho=function(a){if(typeof a=="number")return-a
return J.aa(a).en(a)}
J.as=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aa(a).aP(a,b)}
J.at=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).h(a,b)}
J.aD=function(a,b){return J.aP(a).p(a,b)}
J.c7=function(a,b){return J.dT(a).be(a,b)}
J.dY=function(a,b){return J.J(a).Y(a,b)}
J.dZ=function(a,b){return J.aP(a).aa(a,b)}
J.hp=function(a,b,c){return J.aP(a).aU(a,b,c)}
J.l=function(a){return J.p(a).gB(a)}
J.e_=function(a){return J.J(a).gH(a)}
J.ab=function(a){return J.aP(a).gZ(a)}
J.hq=function(a){return J.aP(a).gE(a)}
J.au=function(a){return J.J(a).gk(a)}
J.hr=function(a){return J.p(a).gb7(a)}
J.hs=function(a,b){return J.J(a).bg(a,b)}
J.e0=function(a,b){return J.aP(a).aL(a,b)}
J.ht=function(a,b,c){return J.bi(a).fo(a,b,c)}
J.hu=function(a,b,c){return J.bi(a).jE(a,b,c)}
J.hv=function(a){return J.aa(a).ee(a)}
J.hw=function(a,b){return J.aP(a).dg(a,b)}
J.cT=function(a,b){return J.bi(a).dh(a,b)}
J.hx=function(a,b,c){return J.bi(a).ax(a,b,c)}
J.hy=function(a){return J.aP(a).bj(a)}
J.h=function(a){return J.p(a).j(a)}
J.bm=function(a,b){return J.aa(a).ct(a,b)}
J.hz=function(a,b){return J.aP(a).bB(a,b)}
I.cP=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.H=J.aE.prototype
C.a=J.bM.prototype
C.p=J.em.prototype
C.d=J.en.prototype
C.q=J.eo.prototype
C.i=J.bN.prototype
C.b=J.bO.prototype
C.C=new A.a6(0,0,0)
C.D=new A.a6(-1/0,-1/0,-1/0)
C.E=new A.c9(-10,0,100)
C.F=new P.k6()
C.v=new P.nr()
C.G=new P.nK()
C.f=new P.nZ()
C.x=new P.aR(0)
C.I=new U.cm(0,"ItemType.spear")
C.J=new U.cm(1,"ItemType.branch")
C.K=new U.cm(2,"ItemType.tent")
C.c=new U.cm(3,"ItemType.sword")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.w=new P.jz(null,null)
C.M=new P.jB(null)
C.N=new P.jC(null,null)
C.O=new O.jD(0,"KnownToMode.all")
C.P=new N.aF("FINER",400)
C.Q=new N.aF("FINEST",300)
C.R=new N.aF("FINE",500)
C.y=new N.aF("INFO",800)
C.S=new N.aF("OFF",2000)
C.T=new N.aF("SEVERE",1000)
C.U=new N.aF("WARNING",900)
C.B=new U.cw(0,"Result.success")
C.Y=new U.cw(1,"Result.failure")
C.Z=new U.cw(2,"Result.criticalSuccess")
C.a_=new U.cw(3,"Result.criticalFailure")
C.z=I.cP([C.B,C.Y,C.Z,C.a_])
C.k=I.cP([])
C.V=new H.io(0,{},C.k,[null,null])
C.h=new R.di(0,"Pose.standing")
C.l=new R.di(1,"Pose.offBalance")
C.o=new R.di(2,"Pose.onGround")
C.r=new K.dj(0,"Predetermination.none")
C.t=new K.dj(1,"Predetermination.successGuaranteed")
C.n=new K.dj(2,"Predetermination.failureGuaranteed")
C.u=new Y.bQ("he","him","his","himself")
C.j=new Y.bQ("it","it","its","itself")
C.W=new Y.bQ("she","her","her","herself")
C.X=new Y.bQ("they","them","their","themselves")
C.A=new Y.bQ("you","you","your","yourself")
C.e=new Q.kF(0,"Resource.stamina")
C.a0=H.aY("ep")
C.a1=H.aY("aV")
C.a2=H.aY("m")
C.a3=H.aY("X")
C.a4=H.aY("aB")
C.m=H.aY("dynamic")
C.a5=H.aY("v")
C.a6=H.aY("L")
C.a7=new P.bC(null,2)
$.eI=1
$.eE="$cachedFunction"
$.eF="$cachedInvocation"
$.av=0
$.bn=null
$.e3=null
$.be=null
$.bE=null
$.bF=null
$.dK=!1
$.o=C.f
$.ef=0
$.dU=null
$.fL=!1
$.or=null
$.fN=!1
$.h9=!0
$.cD=!1
$.h7=!1
$.pw=C.S
$.oz=C.y
$.ew=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["ej","$get$ej",function(){return H.jr()},"ek","$get$ek",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ef
$.ef=z+1
z="expando$key$"+z}return new P.j1(null,z,[P.v])},"fg","$get$fg",function(){return H.az(H.cE({
toString:function(){return"$receiver$"}}))},"fh","$get$fh",function(){return H.az(H.cE({$method$:null,
toString:function(){return"$receiver$"}}))},"fi","$get$fi",function(){return H.az(H.cE(null))},"fj","$get$fj",function(){return H.az(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fn","$get$fn",function(){return H.az(H.cE(void 0))},"fo","$get$fo",function(){return H.az(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fl","$get$fl",function(){return H.az(H.fm(null))},"fk","$get$fk",function(){return H.az(function(){try{null.$method$}catch(z){return z.message}}())},"fq","$get$fq",function(){return H.az(H.fm(void 0))},"fp","$get$fp",function(){return H.az(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dA","$get$dA",function(){return P.n9()},"b_","$get$b_",function(){return P.jh(null,null)},"bG","$get$bG",function(){return[]},"bt","$get$bt",function(){return N.b1("PlannerRecommendation")},"dQ","$get$dQ",function(){return K.aJ("__END_OF_ROAM__","","",null,null,[],"ground")},"ah","$get$ah",function(){return P.dl(null)},"b4","$get$b4",function(){return P.dl(null)},"ha","$get$ha",function(){return N.b1("Storyline")},"f3","$get$f3",function(){return P.b5("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"c2","$get$c2",function(){return L.dz(new L.oL())},"ar","$get$ar",function(){return L.dz(new L.oK())},"cQ","$get$cQ",function(){return L.dz(new L.oU())},"dg","$get$dg",function(){return new F.kb("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"dO","$get$dO",function(){return Y.cZ(!1,"balance",!0,C.j,$.$get$ar())},"hh","$get$hh",function(){return Y.cZ(!1,"pounding",!1,C.j,$.$get$ar())},"eJ","$get$eJ",function(){return new B.kD("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"eN","$get$eN",function(){return new O.kT(null,!1,!1,null,null)},"f_","$get$f_",function(){return new Q.lB(null,!1,!0,C.e,null)},"ft","$get$ft",function(){return new M.mI("",!0,C.e,!1,null)},"fM","$get$fM",function(){return P.dl(null)},"hl","$get$hl",function(){return Y.cZ(!1,"swing",!0,C.j,$.$get$ar())},"eS","$get$eS",function(){return new D.lq(!1,!1,null,null)},"dR","$get$dR",function(){return K.aJ("entrance_to_bloodrock",'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?',"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.",null,null,H.t([new Q.G("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.G("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.G]),"ground")},"hb","$get$hb",function(){return K.aJ("mountain_pass","The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\nIf hidden in cart=true\nYou and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.\n\n\nA few miles further down and you will reach Fort Ironcast.","The Bloodrock pass flows snakelike down the mountain.",null,null,H.t([new Q.G("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.G]),"ground")},"hc","$get$hc",function(){return K.aJ("mountain_pass_gate","The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d","The Bloodrock stone gate looms ahead of you.",null,null,H.t([new Q.G("mountain_pass_guard_post","Go to the gate","You unsheathe (DOLLAR_SIGN)weapon and start towards the guards.",null)],[Q.G]),"ground")},"hd","$get$hd",function(){return K.aJ("mountain_pass_guard_post","The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d","The stone gate looms before you.",N.pR(),null,H.t([new Q.G("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.G]),"ground")},"eT","$get$eT",function(){return new V.ls("Sneak onto the back of the cart","sneak_onto_cart",null)},"f9","$get$f9",function(){return new V.mm("Stealthily take out some of the gate guards","take_out_gate_guards",null)},"he","$get$he",function(){return K.aJ("mountainside_base","After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.","The great stone doors still stands unopened on the mountainside.",null,null,H.t([new Q.G("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.G]),"ground")},"hf","$get$hf",function(){return K.aJ("mountainside_path","You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.","",null,null,H.t([new Q.G("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.G]),"ground")},"ff","$get$ff",function(){return new V.mt("scare off the serpent","threaten_winged_serpent",null)},"eV","$get$eV",function(){return new V.lt("soothe the serpent","soothe_winged_serpent",null)},"fd","$get$fd",function(){return new V.mu("threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",null)},"hn","$get$hn",function(){return K.aJ("winged_serpent_nest","After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.","The sheer cliff of the mountainside impedes your progress.",null,null,H.t([new Q.G("__END_OF_ROAM__","Continue down (UNIMPLEMENTED)","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.G]),"ground")},"h8","$get$h8",function(){return K.aJ("ironcast_road","You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.","A dirt road streaks through the grass. In the distance, a stone fort looms.",null,null,H.t([new Q.G("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.G]),"ground")},"ei","$get$ei",function(){return new V.ji("Take cover in the tall grass","hide_in_grass",null)},"eZ","$get$eZ",function(){return new V.lA("Stand and fight","stand_and_fight",null)},"fU","$get$fU",function(){return H.t([$.$get$dR(),$.$get$hb(),$.$get$hc(),$.$get$hd(),$.$get$he(),$.$get$hf(),$.$get$hn(),$.$get$h8()],[K.bw])},"fT","$get$fT",function(){return H.t([$.$get$eT(),$.$get$f9(),$.$get$ff(),$.$get$eV(),$.$get$fd(),$.$get$ei(),$.$get$eZ()],[A.aI])},"cS","$get$cS",function(){return P.md("")},"c1","$get$c1",function(){var z=new O.ko(0,null,"PointsCounter")
z.hh()
return z},"bH","$get$bH",function(){return new L.e6(null,H.t([],[L.Z]))},"c5","$get$c5",function(){return H.et(P.m,P.d)},"c0","$get$c0",function(){return P.aU(null,{func:1,ret:[P.N,P.aV]})},"cg","$get$cg",function(){return P.b5("^\\s*<<<\\s*$",!0,!1)},"cC","$get$cC",function(){return H.et(P.m,Z.ax)},"ey","$get$ey",function(){return N.b1("")},"ex","$get$ex",function(){return P.eu(P.m,N.da)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.m,args:[R.T,A.ao,Y.ay]},{func:1,v:true},{func:1,ret:Q.M,args:[R.T]},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,ret:P.m,args:[P.v]},{func:1,args:[P.v]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.m]},{func:1,args:[,P.aK]},{func:1,v:true,args:[P.d],opt:[P.aK]},{func:1,ret:P.N},{func:1,args:[P.aB]},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bp,args:[P.v]},{func:1,args:[R.T]},{func:1,args:[Z.ax]},{func:1,ret:P.L,args:[A.a6]},{func:1,args:[P.X]},{func:1,args:[,],opt:[,]},{func:1,args:[[P.I,Y.a3],Y.a3]},{func:1,args:[Y.a3]},{func:1,args:[P.b2]},{func:1,v:true,args:[A.ao,P.m]},{func:1,args:[P.v,,]},{func:1,v:true,args:[P.d,P.aK]},{func:1,ret:P.X,args:[P.v]},{func:1,v:true,args:[,P.aK]},{func:1,v:true,args:[P.v]},{func:1,v:true,args:[[P.I,P.m],P.eO]},{func:1,ret:[P.N,U.bT],args:[P.aB,P.m],named:{rerollEffectDescription:P.m,rerollable:P.X}},{func:1,args:[L.Z]},{func:1,args:[P.m,,]},{func:1,args:[P.m,Z.cA]},{func:1,ret:P.m,args:[Q.ac]},{func:1,ret:P.m,args:[P.m]},{func:1,args:[P.v,R.T]},{func:1,ret:P.v,args:[P.Q,P.Q]},{func:1,args:[P.L,R.T]},{func:1,ret:P.L,args:[P.L,P.L]},{func:1,args:[{func:1,v:true}]},{func:1,ret:Q.ck,args:[Q.G]},{func:1,ret:[P.x,R.T],args:[A.ao]},{func:1,ret:P.L,args:[A.c9]},{func:1,ret:L.Z,args:[P.m],named:{deferToChoiceList:P.X,deferToEndOfPage:P.X,goto:P.m,helpMessage:P.m,script:{func:1,ret:[P.N,P.aV]},submenu:P.m}},{func:1,ret:P.X,args:[L.Z]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.pO(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cP=a.cP
Isolate.aO=a.aO
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hj(X.h_(),b)},[])
else (function(b){H.hj(X.h_(),b)})([])})})()