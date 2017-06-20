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
if(b5.$isaJ)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="t"){processStatics(init.statics[b1]=b2.t,b3)
delete b2.t}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
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
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
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
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.e1"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.e1"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.e1(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b1=function(){}
var dart=[["","",,H,{"^":"",rv:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aJ:{"^":"d;",
v:function(a,b){return a===b},
gA:function(a){return H.as(a)},
k:function(a){return H.cz(a)},
gbd:function(a){return new H.al(H.hs(a),null)}},
eD:{"^":"aJ;",
k:function(a){return String(a)},
gA:function(a){return a?519018:218159},
gbd:function(a){return C.a3},
$isW:1},
eF:{"^":"aJ;",
v:function(a,b){return null==b},
k:function(a){return"null"},
gA:function(a){return 0},
gbd:function(a){return C.a1},
$isai:1},
eJ:{"^":"aJ;",
gA:function(a){return 0},
gbd:function(a){return C.a0},
k:function(a){return String(a)},
$iseG:1},
rz:{"^":"eJ;"},
bf:{"^":"eJ;"},
bR:{"^":"aJ;$ti",
fb:function(a,b){if(!!a.immutable$list)throw H.c(new P.N(b))},
cX:function(a,b){if(!!a.fixed$length)throw H.c(new P.N(b))},
n:function(a,b){this.cX(a,"add")
a.push(b)},
bb:function(a){this.cX(a,"removeLast")
if(a.length===0)throw H.c(H.ax(a,-1))
return a.pop()},
i8:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bN:function(a,b){return new H.H(a,b,[H.l(a,0)])},
al:function(a,b){var z
this.cX(a,"addAll")
for(z=J.af(b);z.u();)a.push(z.d)},
K:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aR:function(a,b){return new H.ah(a,b,[H.l(a,0),null])},
dl:function(a,b){return H.fq(a,b,null,H.l(a,0))},
b1:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bn:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a9())},
fj:function(a,b){return this.bn(a,b,null)},
ag:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gfi:function(a){if(a.length>0)return a[0]
throw H.c(H.a9())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a9())},
gbR:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a9())
throw H.c(H.dd())},
aI:function(a,b,c,d,e){var z,y,x
this.fb(a,"setRange")
P.cC(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.V(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eC())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bV:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cK:function(a,b){var z
this.fb(a,"sort")
z=b==null?P.qt():b
H.c_(a,0,a.length-1,z)},
ev:function(a){return this.cK(a,null)},
e4:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.i(a[z],b))return z
return-1},
bo:function(a,b){return this.e4(a,b,0)},
Z:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
gI:function(a){return a.length===0},
gab:function(a){return a.length!==0},
k:function(a){return P.bQ(a,"[","]")},
br:function(a){return P.aW(a,H.l(a,0))},
gY:function(a){return new J.bM(a,a.length,0,null,[H.l(a,0)])},
gA:function(a){return H.as(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cX(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.cg(b,"newLength",null))
if(b<0)throw H.c(P.V(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ax(a,b))
if(b>=a.length||b<0)throw H.c(H.ax(a,b))
return a[b]},
m:function(a,b,c){if(!!a.immutable$list)H.h(new P.N("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ax(a,b))
if(b>=a.length||b<0)throw H.c(H.ax(a,b))
a[b]=c},
$iscv:1,
$ascv:I.b1,
$isI:1,
$isS:1},
ru:{"^":"bR;$ti"},
bM:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ap(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bS:{"^":"aJ;",
bl:function(a,b){var z
if(typeof b!=="number")throw H.c(H.O(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd0(b)
if(this.gd0(a)===z)return 0
if(this.gd0(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd0:function(a){return a===0?1/a<0:a<0},
ei:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.N(""+a+".round()"))},
cA:function(a,b){var z
if(b>20)throw H.c(P.V(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd0(a))return"-"+z
return z},
k_:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.V(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.ck(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.N("Unexpected toString result: "+z))
x=J.J(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.bP("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
eq:function(a){return-a},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a+b},
aK:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a-b},
cF:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a/b},
bP:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a*b},
bv:function(a,b){return(a|0)===a?a/b|0:this.ij(a,b)},
ij:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.N("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cU:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aH:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a<b},
bC:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a>b},
bO:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a<=b},
bA:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a>=b},
gbd:function(a){return C.a6},
$isK:1},
eE:{"^":"bS;",
gbd:function(a){return C.a5},
$isaH:1,
$isK:1,
$isu:1},
k6:{"^":"bS;",
gbd:function(a){return C.a4},
$isaH:1,
$isK:1},
bT:{"^":"aJ;",
ck:function(a,b){if(b<0)throw H.c(H.ax(a,b))
if(b>=a.length)H.h(H.ax(a,b))
return a.charCodeAt(b)},
c6:function(a,b){if(b>=a.length)throw H.c(H.ax(a,b))
return a.charCodeAt(b)},
dW:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.p_(b,a,c)},
dV:function(a,b){return this.dW(a,b,0)},
fu:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.V(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.ck(b,c+y)!==this.c6(a,y))return
return new H.fp(c,b,a)},
a4:function(a,b){if(typeof b!=="string")throw H.c(P.cg(b,null,null))
return a+b},
e0:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bt(a,y-z)},
jO:function(a,b,c){H.bl(c)
return H.p(a,b,c)},
jP:function(a,b,c,d){H.bl(c)
P.lf(d,0,a.length,"startIndex",null)
return H.bL(a,b,c,d)},
d5:function(a,b,c){return this.jP(a,b,c,0)},
hg:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.hW(b,a,c)!=null},
dm:function(a,b){return this.hg(a,b,0)},
aE:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.O(c))
if(b<0)throw H.c(P.bW(b,null,null))
if(typeof c!=="number")return H.y(c)
if(b>c)throw H.c(P.bW(b,null,null))
if(c>a.length)throw H.c(P.bW(c,null,null))
return a.substring(b,c)},
bt:function(a,b){return this.aE(a,b,null)},
fR:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.c6(z,0)===133){x=J.de(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.ck(z,w)===133?J.k7(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
k0:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.c6(z,0)===133?J.de(z,1):0}else{y=J.de(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bP:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.E)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e4:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bo:function(a,b){return this.e4(a,b,0)},
jv:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
ju:function(a,b){return this.jv(a,b,null)},
iJ:function(a,b,c){if(b==null)H.h(H.O(b))
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return H.ra(a,b,c)},
Z:function(a,b){return this.iJ(a,b,0)},
gI:function(a){return a.length===0},
gab:function(a){return a.length!==0},
bl:function(a,b){var z
if(typeof b!=="string")throw H.c(H.O(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gbd:function(a){return C.a2},
gl:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ax(a,b))
if(b>=a.length||b<0)throw H.c(H.ax(a,b))
return a[b]},
$iscv:1,
$ascv:I.b1,
$isq:1,
$isdt:1,
t:{
eH:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
de:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.c6(a,b)
if(y!==32&&y!==13&&!J.eH(y))break;++b}return b},
k7:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.ck(a,z)
if(y!==32&&y!==13&&!J.eH(y))break}return b}}}}],["","",,H,{"^":"",
h1:function(a){return a},
a9:function(){return new P.F("No element")},
dd:function(){return new P.F("Too many elements")},
eC:function(){return new P.F("Too few elements")},
c_:function(a,b,c,d){if(c-b<=32)H.ff(a,b,c,d)
else H.fe(a,b,c,d)},
ff:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a1(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.h(a,v))
w=v}y.m(a,w,x)}},
fe:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bv(c-b+1,6)
y=b+z
x=c-z
w=C.e.bv(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a1(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a1(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a1(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a1(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a1(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a1(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a1(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a1(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a1(d.$2(p,o),0)){n=o
o=p
p=n}t.m(a,y,s)
t.m(a,w,q)
t.m(a,x,o)
t.m(a,v,t.h(a,b))
t.m(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.i(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.v(i,0))continue
if(h.aH(i,0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.ae(i)
if(h.bC(i,0)){--l
continue}else{g=l-1
if(h.aH(i,0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
l=g
m=f
break}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.cc(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else if(J.a1(d.$2(j,p),0))for(;!0;)if(J.a1(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.cc(d.$2(t.h(a,l),r),0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)}l=g
break}}e=!1}h=m-1
t.m(a,b,t.h(a,h))
t.m(a,h,r)
h=l+1
t.m(a,c,t.h(a,h))
t.m(a,h,p)
H.c_(a,b,m-2,d)
H.c_(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.i(d.$2(t.h(a,m),r),0);)++m
for(;J.i(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.i(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else if(J.i(d.$2(j,p),0))for(;!0;)if(J.i(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.cc(d.$2(t.h(a,l),r),0)){t.m(a,k,t.h(a,m))
f=m+1
t.m(a,m,t.h(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.h(a,l))
t.m(a,l,j)}l=g
break}}H.c_(a,m,l,d)}else H.c_(a,m,l,d)},
S:{"^":"x;$ti"},
aM:{"^":"S;$ti",
gY:function(a){return new H.dj(this,this.gl(this),0,null,[H.v(this,"aM",0)])},
K:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.ag(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gI:function(a){return this.gl(this)===0},
gE:function(a){if(this.gl(this)===0)throw H.c(H.a9())
return this.ag(0,this.gl(this)-1)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.i(this.ag(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bn:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.ag(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
cq:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ag(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ag(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ag(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bN:function(a,b){return this.ez(0,b)},
aR:function(a,b){return new H.ah(this,b,[H.v(this,"aM",0),null])},
b1:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ag(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
bq:function(a,b){var z,y,x,w
z=[H.v(this,"aM",0)]
if(b){y=H.t([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gl(this);++w){z=this.ag(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
c2:function(a){return this.bq(a,!0)},
br:function(a){var z,y
z=P.T(null,null,null,H.v(this,"aM",0))
for(y=0;y<this.gl(this);++y)z.n(0,this.ag(0,y))
return z}},
n_:{"^":"aM;a,b,c,$ti",
ghJ:function(){var z=J.aC(this.a)
return z},
gih:function(){var z,y
z=J.aC(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aC(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ag:function(a,b){var z,y
z=this.gih()+b
if(!(b<0)){y=this.ghJ()
if(typeof y!=="number")return H.y(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cr(b,this,"index",null,null))
return J.eb(this.a,z)},
bq:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.J(y)
w=x.gl(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.t([],u)
C.a.sl(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.t(s,u)}for(r=0;r<v;++r){u=x.ag(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hp:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.V(z,0,null,"start",null))},
t:{
fq:function(a,b,c,d){var z=new H.n_(a,b,c,[d])
z.hp(a,b,c,d)
return z}}},
dj:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ag(0,x);++this.c
return!0}},
cw:{"^":"x;a,b,$ti",
gY:function(a){return new H.kp(null,J.af(this.a),this.b,this.$ti)},
gl:function(a){return J.aC(this.a)},
gI:function(a){return J.ec(this.a)},
gE:function(a){return this.b.$1(J.hT(this.a))},
$asx:function(a,b){return[b]},
t:{
bw:function(a,b,c,d){if(!!J.o(a).$isS)return new H.bt(a,b,[c,d])
return new H.cw(a,b,[c,d])}}},
bt:{"^":"cw;a,b,$ti",$isS:1,
$asS:function(a,b){return[b]}},
kp:{"^":"cu;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascu:function(a,b){return[b]}},
ah:{"^":"aM;a,b,$ti",
gl:function(a){return J.aC(this.a)},
ag:function(a,b){return this.b.$1(J.eb(this.a,b))},
$asaM:function(a,b){return[b]},
$asS:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
H:{"^":"x;a,b,$ti",
gY:function(a){return new H.fN(J.af(this.a),this.b,this.$ti)},
aR:function(a,b){return new H.cw(this,b,[H.l(this,0),null])}},
fN:{"^":"cu;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
f7:{"^":"x;a,b,$ti",
gY:function(a){return new H.m2(J.af(this.a),this.b,this.$ti)},
t:{
m1:function(a,b,c){if(!!J.o(a).$isS)return new H.ju(a,H.h1(b),[c])
return new H.f7(a,H.h1(b),[c])}}},
ju:{"^":"f7;a,b,$ti",
gl:function(a){var z=J.aC(this.a)-this.b
if(z>=0)return z
return 0},
$isS:1},
m2:{"^":"cu;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
c6:function(a,b){var z=a.cm(b)
if(!init.globalState.d.cy)init.globalState.f.bc()
return z},
hG:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isI)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.oM(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eA()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.ol(P.aY(null,H.c3),0)
x=P.u
y.z=new H.M(0,null,null,null,null,null,0,[x,H.dR])
y.ch=new H.M(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.oL()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.jZ,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.oN)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.T(null,null,null,x)
v=new H.bX(0,null,!1)
u=new H.dR(y,new H.M(0,null,null,null,null,null,0,[x,H.bX]),w,init.createNewIsolate(),v,new H.b3(H.cZ()),new H.b3(H.cZ()),!1,!1,[],P.T(null,null,null,null),null,null,!1,!0,P.T(null,null,null,null))
w.n(0,0)
u.dr(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cm(new H.r2(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cm(new H.r3(z,a))
else u.cm(a)
init.globalState.f.bc()},
k2:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.k3()
return},
k3:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.N("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.N('Cannot extract URI from "'+z+'"'))},
jZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cM(!0,[]).bI(b.data)
y=J.J(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cM(!0,[]).bI(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cM(!0,[]).bI(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.T(null,null,null,q)
o=new H.bX(0,null,!1)
n=new H.dR(y,new H.M(0,null,null,null,null,null,0,[q,H.bX]),p,init.createNewIsolate(),o,new H.b3(H.cZ()),new H.b3(H.cZ()),!1,!1,[],P.T(null,null,null,null),null,null,!1,!0,P.T(null,null,null,null))
p.n(0,0)
n.dr(0,o)
init.globalState.f.a.aq(new H.c3(n,new H.k_(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bc()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").D(y.h(z,"msg"))
init.globalState.f.bc()
break
case"close":init.globalState.ch.aS(0,$.$get$eB().h(0,a))
a.terminate()
init.globalState.f.bc()
break
case"log":H.jY(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aa(["command","print","msg",z])
q=new H.bh(!0,P.bG(null,P.u)).b5(q)
y.toString
self.postMessage(q)}else P.e7(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
jY:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aa(["command","log","msg",a])
x=new H.bh(!0,P.bG(null,P.u)).b5(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cp(z)
throw H.c(y)}},
k0:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eW=$.eW+("_"+y)
$.eX=$.eX+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.c5(y,x),w,z.r])
x=new H.k1(a,b,c,d,z)
if(e===!0){z.f8(w,w)
init.globalState.f.a.aq(new H.c3(z,x,"start isolate"))}else x.$0()},
pg:function(a){return new H.cM(!0,[]).bI(new H.bh(!1,P.bG(null,P.u)).b5(a))},
r2:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
r3:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
oM:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",t:{
oN:function(a){var z=P.aa(["command","print","msg",a])
return new H.bh(!0,P.bG(null,P.u)).b5(z)}}},
dR:{"^":"d;j:a<,b,c,js:d<,iL:e<,f,r,x,cp:y<,z,Q,ch,cx,cy,db,dx",
f8:function(a,b){if(!this.f.v(0,a))return
if(this.Q.n(0,b)&&!this.y)this.y=!0
this.cj()},
jN:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aS(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.f7(x)}this.y=!1}this.cj()},
iA:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jL:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.N("removeRange"))
P.cC(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
h9:function(a,b){if(!this.r.v(0,a))return
this.db=b},
j6:function(a,b,c){var z=J.o(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.aY(null,null)
this.cx=z}z.aq(new H.oC(a,c))},
j5:function(a,b){var z
if(!this.r.v(0,a))return
z=J.o(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){this.e9()
return}z=this.cx
if(z==null){z=P.aY(null,null)
this.cx=z}z.aq(this.gjt())},
j7:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.e7(a)
if(b!=null)P.e7(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.f(a)
y[1]=b==null?null:J.f(b)
for(x=new P.am(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.D(y)},
cm:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.j7(w,v)
if(this.db===!0){this.e9()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjs()
if(this.cx!=null)for(;t=this.cx,!t.gI(t);)this.cx.d4().$0()}return y},
bZ:function(a){return this.b.h(0,a)},
dr:function(a,b){var z=this.b
if(z.a_(a))throw H.c(P.cp("Registry: ports must be registered only once."))
z.m(0,a,b)},
cj:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.e9()},
e9:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aQ(0)
for(z=this.b,y=z.gc3(),y=y.gY(y);y.u();)y.gF().hE()
z.aQ(0)
this.c.aQ(0)
init.globalState.z.aS(0,this.a)
this.dx.aQ(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.D(z[v])}this.ch=null}},"$0","gjt",0,0,4]},
oC:{"^":"a:4;a,b",
$0:function(){this.a.D(this.b)}},
ol:{"^":"d;a,b",
iQ:function(){var z=this.a
if(z.b===z.c)return
return z.d4()},
fP:function(){var z,y,x
z=this.iQ()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a_(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gI(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cp("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gI(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aa(["command","close"])
x=new H.bh(!0,new P.fW(0,null,null,null,null,null,0,[null,P.u])).b5(x)
y.toString
self.postMessage(x)}return!1}z.jJ()
return!0},
f_:function(){if(self.window!=null)new H.om(this).$0()
else for(;this.fP(););},
bc:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.f_()
else try{this.f_()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.aa(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bh(!0,P.bG(null,P.u)).b5(v)
w.toString
self.postMessage(v)}}},
om:{"^":"a:4;a",
$0:function(){if(!this.a.fP())return
P.nu(C.w,this)}},
c3:{"^":"d;a,b,c",
jJ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cm(this.b)}},
oL:{"^":"d;"},
k_:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.k0(this.a,this.b,this.c,this.d,this.e,this.f)}},
k1:{"^":"a:4;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cj()}},
fQ:{"^":"d;"},
c5:{"^":"fQ;b,a",
D:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.geQ())return
x=H.pg(a)
if(z.giL()===y){y=J.J(x)
switch(y.h(x,0)){case"pause":z.f8(y.h(x,1),y.h(x,2))
break
case"resume":z.jN(y.h(x,1))
break
case"add-ondone":z.iA(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.jL(y.h(x,1))
break
case"set-errors-fatal":z.h9(y.h(x,1),y.h(x,2))
break
case"ping":z.j6(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.j5(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.n(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aS(0,y)
break}return}init.globalState.f.a.aq(new H.c3(z,new H.oP(this,x),"receive"))},
v:function(a,b){if(b==null)return!1
return b instanceof H.c5&&J.i(this.b,b.b)},
gA:function(a){return this.b.gdG()}},
oP:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.geQ())z.hv(this.b)}},
dT:{"^":"fQ;b,c,a",
D:function(a){var z,y,x
z=P.aa(["command","message","port",this,"msg",a])
y=new H.bh(!0,P.bG(null,P.u)).b5(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
v:function(a,b){if(b==null)return!1
return b instanceof H.dT&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.er()
y=this.a
if(typeof y!=="number")return y.er()
x=this.c
if(typeof x!=="number")return H.y(x)
return(z<<16^y<<8^x)>>>0}},
bX:{"^":"d;dG:a<,b,eQ:c<",
hE:function(){this.c=!0
this.b=null},
b7:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aS(0,y)
z.c.aS(0,y)
z.cj()},
hv:function(a){if(this.c)return
this.b.$1(a)},
$islg:1},
lh:{"^":"a5;a,b",
as:function(a,b,c,d){var z=this.b
z.toString
return new P.cL(z,[H.l(z,0)]).as(a,b,c,d)},
ec:function(a,b,c){return this.as(a,null,b,c)},
b7:[function(){this.a.b7()
this.b.b7()},"$0","giH",0,0,4],
hn:function(a){var z=new P.p3(null,0,null,null,null,null,this.giH(),[null])
this.b=z
this.a.b=z.gis(z)},
$asa5:I.b1},
nq:{"^":"d;a,b,c",
hq:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aq(new H.c3(y,new H.ns(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cU(new H.nt(this,b),0),a)}else throw H.c(new P.N("Timer greater than 0."))},
t:{
nr:function(a,b){var z=new H.nq(!0,!1,null)
z.hq(a,b)
return z}}},
ns:{"^":"a:4;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
nt:{"^":"a:4;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b3:{"^":"d;dG:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.kc()
z=C.i.cU(z,0)^C.i.bv(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b3){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bh:{"^":"d;a,b",
b5:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscv)return this.h5(a)
if(!!z.$isjW){x=this.gh2()
z=a.gbX()
z=H.bw(z,x,H.v(z,"x",0),null)
z=P.U(z,!0,H.v(z,"x",0))
w=a.gc3()
w=H.bw(w,x,H.v(w,"x",0),null)
return["map",z,P.U(w,!0,H.v(w,"x",0))]}if(!!z.$iseG)return this.h6(a)
if(!!z.$isaJ)this.fS(a)
if(!!z.$islg)this.cB(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isc5)return this.h7(a)
if(!!z.$isdT)return this.h8(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cB(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb3)return["capability",a.a]
if(!(a instanceof P.d))this.fS(a)
return["dart",init.classIdExtractor(a),this.h4(init.classFieldsExtractor(a))]},"$1","gh2",2,0,0],
cB:function(a,b){throw H.c(new P.N((b==null?"Can't transmit:":b)+" "+H.b(a)))},
fS:function(a){return this.cB(a,null)},
h5:function(a){var z=this.h3(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cB(a,"Can't serialize indexable: ")},
h3:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.b5(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
h4:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.b5(a[z]))
return a},
h6:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cB(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.b5(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
h8:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
h7:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdG()]
return["raw sendport",a]}},
cM:{"^":"d;a,b",
bI:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.b(a)))
switch(C.a.gfi(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.t(this.cl(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.cl(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.cl(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.cl(x),[null])
y.fixed$length=Array
return y
case"map":return this.iT(a)
case"sendport":return this.iU(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iS(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b3(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.cl(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","giR",2,0,0],
cl:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.y(x)
if(!(y<x))break
z.m(a,y,this.bI(z.h(a,y)));++y}return a},
iT:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aV()
this.b.push(w)
y=J.ed(y,this.giR()).c2(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.m(0,y[u],this.bI(v.h(x,u)))}return w},
iU:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bZ(w)
if(u==null)return
t=new H.c5(u,x)}else t=new H.dT(y,w,x)
this.b.push(t)
return t},
iS:function(a){var z,y,x,w,v,u,t
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
while(!0){t=z.gl(y)
if(typeof t!=="number")return H.y(t)
if(!(u<t))break
w[z.h(y,u)]=this.bI(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
iR:function(){throw H.c(new P.N("Cannot modify unmodifiable Map"))},
qH:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.f(a)
if(typeof z!=="string")throw H.c(H.O(a))
return z},
as:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bz:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.G||!!J.o(a).$isbf){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.c6(w,0)===36)w=C.b.bt(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cX(H.c9(a),0,null),init.mangledGlobalNames)},
cz:function(a){return"Instance of '"+H.bz(a)+"'"},
ab:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.cU(z,10))>>>0,56320|z&1023)}throw H.c(P.V(a,0,1114111,null,null))},
b7:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
la:function(a){var z=H.b7(a).getFullYear()+0
return z},
l8:function(a){var z=H.b7(a).getMonth()+1
return z},
l4:function(a){var z=H.b7(a).getDate()+0
return z},
l5:function(a){var z=H.b7(a).getHours()+0
return z},
l7:function(a){var z=H.b7(a).getMinutes()+0
return z},
l9:function(a){var z=H.b7(a).getSeconds()+0
return z},
l6:function(a){var z=H.b7(a).getMilliseconds()+0
return z},
dw:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.O(a))
return a[b]},
eY:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.O(a))
a[b]=c},
y:function(a){throw H.c(H.O(a))},
e:function(a,b){if(a==null)J.aC(a)
throw H.c(H.ax(a,b))},
ax:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aT(!0,b,"index",null)
z=J.aC(a)
if(!(b<0)){if(typeof z!=="number")return H.y(z)
y=b>=z}else y=!0
if(y)return P.cr(b,a,"index",null,z)
return P.bW(b,"index",null)},
O:function(a){return new P.aT(!0,a,null,null)},
cS:function(a){if(typeof a!=="number")throw H.c(H.O(a))
return a},
bl:function(a){if(typeof a!=="string")throw H.c(H.O(a))
return a},
c:function(a){var z
if(a==null)a=new P.cx()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hK})
z.name=""}else z.toString=H.hK
return z},
hK:function(){return J.f(this.dartException)},
h:function(a){throw H.c(a)},
ap:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.rh(a)
if(a==null)return
if(a instanceof H.d9)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.cU(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dg(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.eP(v,null))}}if(a instanceof TypeError){u=$.$get$fy()
t=$.$get$fz()
s=$.$get$fA()
r=$.$get$fB()
q=$.$get$fF()
p=$.$get$fG()
o=$.$get$fD()
$.$get$fC()
n=$.$get$fI()
m=$.$get$fH()
l=u.ba(y)
if(l!=null)return z.$1(H.dg(y,l))
else{l=t.ba(y)
if(l!=null){l.method="call"
return z.$1(H.dg(y,l))}else{l=s.ba(y)
if(l==null){l=r.ba(y)
if(l==null){l=q.ba(y)
if(l==null){l=p.ba(y)
if(l==null){l=o.ba(y)
if(l==null){l=r.ba(y)
if(l==null){l=n.ba(y)
if(l==null){l=m.ba(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eP(y,l==null?null:l.method))}}return z.$1(new H.ny(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fg()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aT(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fg()
return a},
A:function(a){var z
if(a instanceof H.d9)return a.b
if(a==null)return new H.fZ(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fZ(a,null)},
qR:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.as(a)},
qA:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
qL:function(a,b,c,d,e,f,g){switch(c){case 0:return H.c6(b,new H.qM(a))
case 1:return H.c6(b,new H.qN(a,d))
case 2:return H.c6(b,new H.qO(a,d,e))
case 3:return H.c6(b,new H.qP(a,d,e,f))
case 4:return H.c6(b,new H.qQ(a,d,e,f,g))}throw H.c(P.cp("Unsupported number of arguments for wrapped closure"))},
cU:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.qL)
a.$identity=z
return z},
iN:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isI){z.$reflectionInfo=c
x=H.lj(z).r}else x=c
w=d?Object.create(new H.mx().constructor.prototype):Object.create(new H.d1(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aD
$.aD=J.a0(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.en(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.qH,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.ei:H.d2
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.en(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
iK:function(a,b,c,d){var z=H.d2
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
en:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.iM(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.iK(y,!w,z,b)
if(y===0){w=$.aD
$.aD=J.a0(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bs
if(v==null){v=H.cj("self")
$.bs=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aD
$.aD=J.a0(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bs
if(v==null){v=H.cj("self")
$.bs=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
iL:function(a,b,c,d){var z,y
z=H.d2
y=H.ei
switch(b?-1:a){case 0:throw H.c(new H.lu("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
iM:function(a,b){var z,y,x,w,v,u,t,s
z=H.iB()
y=$.eh
if(y==null){y=H.cj("receiver")
$.eh=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.iL(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aD
$.aD=J.a0(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aD
$.aD=J.a0(u,1)
return new Function(y+H.b(u)+"}")()},
e1:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isI){c.fixed$length=Array
z=c}else z=c
return H.iN(a,b,z,!!d,e,f)},
qX:function(a,b){var z=J.J(b)
throw H.c(H.cl(H.bz(a),z.aE(b,3,z.gl(b))))},
a_:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.qX(a,b)},
e3:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.e3(a)
return z==null?!1:H.e6(z,b)},
hn:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.R(b,null)
y=H.e3(a)
throw H.c(H.cl(y!=null?H.R(y,null):H.bz(a),z))},
rf:function(a){throw H.c(new P.j2(a))},
cZ:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b0:function(a){return new H.al(a,null)},
t:function(a,b){a.$ti=b
return a},
c9:function(a){if(a==null)return
return a.$ti},
hr:function(a,b){return H.e9(a["$as"+H.b(b)],H.c9(a))},
v:function(a,b,c){var z=H.hr(a,b)
return z==null?null:z[c]},
l:function(a,b){var z=H.c9(a)
return z==null?null:z[b]},
R:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cX(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.R(z,b)
return H.pl(a,b)}return"unknown-reified-type"},
pl:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.R(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.R(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.R(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.qz(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.R(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
cX:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bE("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.w=v+", "
u=a[y]
if(u!=null)w=!1
v=z.w+=H.R(u,c)}return w?"":"<"+z.k(0)+">"},
hs:function(a){var z,y
if(a instanceof H.a){z=H.e3(a)
if(z!=null)return H.R(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.cX(a.$ti,0,null)},
e9:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aG:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.c9(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hg(H.e9(y[d],z),c)},
aA:function(a,b,c,d){if(a==null)return a
if(H.aG(a,b,c,d))return a
throw H.c(H.cl(H.bz(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cX(c,0,null),init.mangledGlobalNames)))},
hg:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a7(a[y],b[y]))return!1
return!0},
b_:function(a,b,c){return a.apply(b,H.hr(b,c))},
cT:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ai"
if(b==null)return!0
z=H.c9(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.e6(x.apply(a,null),b)}return H.a7(y,b)},
hH:function(a,b){if(a!=null&&!H.cT(a,b))throw H.c(H.cl(H.bz(a),H.R(b,null)))
return a},
a7:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ai")return!0
if('func' in b)return H.e6(a,b)
if('func' in a)return b.builtin$cls==="bv"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.R(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.hg(H.e9(u,z),x)},
hf:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a7(z,v)||H.a7(v,z)))return!1}return!0},
pv:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a7(v,u)||H.a7(u,v)))return!1}return!0},
e6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a7(z,y)||H.a7(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hf(x,w,!1))return!1
if(!H.hf(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a7(o,n)||H.a7(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a7(o,n)||H.a7(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a7(o,n)||H.a7(n,o)))return!1}}return H.pv(a.named,b.named)},
ra:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$iseI){z=C.b.bt(a,c)
return b.b.test(z)}else{z=z.dV(b,C.b.bt(a,c))
return!z.gI(z)}}},
p:function(a,b,c){var z,y,x
H.bl(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
rV:[function(a){return a},"$1","h2",2,0,38],
rb:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdt)throw H.c(P.cg(b,"pattern","is not a Pattern"))
for(z=z.dV(b,a),z=new H.fO(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.h2().$1(C.b.aE(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.h2().$1(C.b.bt(a,y)))
return z.charCodeAt(0)==0?z:z},
bL:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.rc(a,z,z+b.length,c)},
rc:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
iQ:{"^":"d;$ti",
gI:function(a){return this.gl(this)===0},
gab:function(a){return this.gl(this)!==0},
k:function(a){return P.dm(this)},
m:function(a,b,c){return H.iR()},
$isD:1},
iS:{"^":"iQ;a,b,c,$ti",
gl:function(a){return this.a},
a_:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.a_(b))return
return this.eM(b)},
eM:function(a){return this.b[a]},
K:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eM(w))}}},
li:{"^":"d;a,b,c,d,e,f,r,x",t:{
lj:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.li(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
nv:{"^":"d;a,b,c,d,e,f",
ba:function(a){var z,y,x
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
t:{
aF:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.nv(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cK:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fE:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eP:{"^":"Y;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
k9:{"^":"Y;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
t:{
dg:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.k9(a,y,z?null:b.receiver)}}},
ny:{"^":"Y;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
d9:{"^":"d;a,b6:b<"},
rh:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isY)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fZ:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
qM:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
qN:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
qO:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
qP:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
qQ:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bz(this).trim()+"'"},
gfZ:function(){return this},
$isbv:1,
gfZ:function(){return this}},
fu:{"^":"a;"},
mx:{"^":"fu;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d1:{"^":"fu;a,b,c,d",
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d1))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.as(this.a)
else y=typeof z!=="object"?J.j(z):H.as(z)
z=H.as(this.b)
if(typeof y!=="number")return y.kd()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cz(z)},
t:{
d2:function(a){return a.a},
ei:function(a){return a.c},
iB:function(){var z=$.bs
if(z==null){z=H.cj("self")
$.bs=z}return z},
cj:function(a){var z,y,x,w,v
z=new H.d1("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iG:{"^":"Y;a",
k:function(a){return this.a},
t:{
cl:function(a,b){return new H.iG("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
lu:{"^":"Y;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
al:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gA:function(a){return J.j(this.a)},
v:function(a,b){if(b==null)return!1
return b instanceof H.al&&J.i(this.a,b.a)}},
M:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gI:function(a){return this.a===0},
gab:function(a){return!this.gI(this)},
gbX:function(){return new H.kg(this,[H.l(this,0)])},
gc3:function(){return H.bw(this.gbX(),new H.k8(this),H.l(this,0),H.l(this,1))},
a_:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eI(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eI(y,a)}else return this.ji(a)},
ji:function(a){var z=this.d
if(z==null)return!1
return this.co(this.cQ(z,this.cn(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c9(z,b)
return y==null?null:y.gbK()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c9(x,b)
return y==null?null:y.gbK()}else return this.jj(b)},
jj:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cQ(z,this.cn(a))
x=this.co(y,a)
if(x<0)return
return y[x].gbK()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dI()
this.b=z}this.eB(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dI()
this.c=y}this.eB(y,b,c)}else this.jl(b,c)},
jl:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dI()
this.d=z}y=this.cn(a)
x=this.cQ(z,y)
if(x==null)this.dS(z,y,[this.dJ(a,b)])
else{w=this.co(x,a)
if(w>=0)x[w].sbK(b)
else x.push(this.dJ(a,b))}},
jK:function(a,b){var z
if(this.a_(a))return this.h(0,a)
z=b.$0()
this.m(0,a,z)
return z},
aS:function(a,b){if(typeof b==="string")return this.eZ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eZ(this.c,b)
else return this.jk(b)},
jk:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cQ(z,this.cn(a))
x=this.co(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.f2(w)
return w.gbK()},
aQ:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
K:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
eB:function(a,b,c){var z=this.c9(a,b)
if(z==null)this.dS(a,b,this.dJ(b,c))
else z.sbK(c)},
eZ:function(a,b){var z
if(a==null)return
z=this.c9(a,b)
if(z==null)return
this.f2(z)
this.eJ(a,b)
return z.gbK()},
dJ:function(a,b){var z,y
z=new H.kf(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f2:function(a){var z,y
z=a.gi4()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cn:function(a){return J.j(a)&0x3ffffff},
co:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gfp(),b))return y
return-1},
k:function(a){return P.dm(this)},
c9:function(a,b){return a[b]},
cQ:function(a,b){return a[b]},
dS:function(a,b,c){a[b]=c},
eJ:function(a,b){delete a[b]},
eI:function(a,b){return this.c9(a,b)!=null},
dI:function(){var z=Object.create(null)
this.dS(z,"<non-identifier-key>",z)
this.eJ(z,"<non-identifier-key>")
return z},
$isjW:1,
$isD:1,
t:{
eK:function(a,b){return new H.M(0,null,null,null,null,null,0,[a,b])}}},
k8:{"^":"a:0;a",
$1:function(a){return this.a.h(0,a)}},
kf:{"^":"d;fp:a<,bK:b@,c,i4:d<,$ti"},
kg:{"^":"S;a,$ti",
gl:function(a){return this.a.a},
gI:function(a){return this.a.a===0},
gY:function(a){var z,y
z=this.a
y=new H.kh(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Z:function(a,b){return this.a.a_(b)},
K:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
kh:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
eI:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
gi0:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.df(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gi_:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.df(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dW:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.o1(this,b,c)},
dV:function(a,b){return this.dW(a,b,0)},
hL:function(a,b){var z,y
z=this.gi0()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fY(this,y)},
hK:function(a,b){var z,y
z=this.gi_()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fY(this,y)},
fu:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return this.hK(b,c)},
$isdt:1,
t:{
df:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.ez("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fY:{"^":"d;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isb6:1},
o1:{"^":"ct;a,b,c",
gY:function(a){return new H.fO(this.a,this.b,this.c,null)},
$asct:function(){return[P.b6]},
$asx:function(){return[P.b6]}},
fO:{"^":"d;a,b,c,d",
gF:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hL(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fp:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.h(P.bW(b,null,null))
return this.c},
$isb6:1},
p_:{"^":"x;a,b,c",
gY:function(a){return new H.p0(this.a,this.b,this.c,null)},
$asx:function(){return[P.b6]}},
p0:{"^":"d;a,b,c,d",
u:function(){var z,y,x,w,v,u,t
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
this.d=new H.fp(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
qz:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
qW:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
o2:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.pw()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cU(new P.o4(z),1)).observe(y,{childList:true})
return new P.o3(z,y,x)}else if(self.setImmediate!=null)return P.px()
return P.py()},
rP:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cU(new P.o5(a),0))},"$1","pw",2,0,11],
rQ:[function(a){++init.globalState.f.b
self.setImmediate(H.cU(new P.o6(a),0))},"$1","px",2,0,11],
rR:[function(a){P.dH(C.w,a)},"$1","py",2,0,11],
aw:function(a,b){P.dU(null,a)
return b.gfm()},
an:function(a,b){P.dU(a,b)},
av:function(a,b){b.bH(a)},
au:function(a,b){b.e_(H.z(a),H.A(a))},
dU:function(a,b){var z,y,x,w
z=new P.pa(b)
y=new P.pb(b)
x=J.o(a)
if(!!x.$isC)a.dT(z,y)
else if(!!x.$isL)a.ek(z,y)
else{w=new P.C(0,$.n,null,[null])
w.a=4
w.c=a
w.dT(z,null)}},
ao:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.pu(z)},
cP:function(a,b,c){var z,y,x
if(b===0){if(c.ge6())c.c.dZ()
else c.a.b7()
return}else if(b===1){if(c.ge6())c.c.e_(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.dU(z,y)
c.a.b7()}return}if(a instanceof P.bF){if(c.ge6()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aI(c.a,z)
P.ca(new P.p8(b,c))
return}else if(z===1){x=a.a
c.a.iD(x,!1).bL(new P.p9(b,c))
return}}P.dU(a,b)},
pt:function(a){return a.gdn()},
dZ:function(a,b){if(H.ay(a,{func:1,args:[P.ai,P.ai]})){b.toString
return a}else{b.toString
return a}},
ar:function(a){return new P.p1(new P.C(0,$.n,null,[a]),[a])},
pj:function(a,b,c){$.n.toString
a.aY(b,c)},
pn:function(){var z,y
for(;z=$.bi,z!=null;){$.bI=null
y=z.gc_()
$.bi=y
if(y==null)$.bH=null
z.giF().$0()}},
rU:[function(){$.dV=!0
try{P.pn()}finally{$.bI=null
$.dV=!1
if($.bi!=null)$.$get$dL().$1(P.hh())}},"$0","hh",0,0,4],
hb:function(a){var z=new P.fP(a,null)
if($.bi==null){$.bH=z
$.bi=z
if(!$.dV)$.$get$dL().$1(P.hh())}else{$.bH.b=z
$.bH=z}},
ps:function(a){var z,y,x
z=$.bi
if(z==null){P.hb(a)
$.bI=$.bH
return}y=new P.fP(a,null)
x=$.bI
if(x==null){y.b=z
$.bI=y
$.bi=y}else{y.b=x.b
x.b=y
$.bI=y
if(y.b==null)$.bH=y}},
ca:function(a){var z=$.n
if(C.f===z){P.bk(null,null,C.f,a)
return}z.toString
P.bk(null,null,z,z.dX(a,!0))},
rM:function(a,b){return new P.oZ(null,a,!1,[b])},
e_:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.n
w.toString
P.bj(null,null,w,z,y)}},
po:[function(a,b){var z=$.n
z.toString
P.bj(null,null,z,a,b)},function(a){return P.po(a,null)},"$2","$1","pA",2,2,14,0],
rT:[function(){},"$0","pz",0,0,4],
ha:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gb8()
w=t
v=x.gb6()
c.$2(w,v)}}},
pc:function(a,b,c,d){var z=a.bW()
if(!!J.o(z).$isL&&z!==$.$get$b4())z.bM(new P.pe(b,c,d))
else b.aY(c,d)},
h_:function(a,b){return new P.pd(a,b)},
h0:function(a,b,c){var z=a.bW()
if(!!J.o(z).$isL&&z!==$.$get$b4())z.bM(new P.pf(b,c))
else b.aX(c)},
p7:function(a,b,c){$.n.toString
a.bS(b,c)},
nu:function(a,b){var z=$.n
if(z===C.f){z.toString
return P.dH(a,b)}return P.dH(a,z.dX(b,!0))},
dH:function(a,b){var z=C.e.bv(a.a,1000)
return H.nr(z<0?0:z,b)},
nI:function(){return $.n},
bj:function(a,b,c,d,e){var z={}
z.a=d
P.ps(new P.pq(z,e))},
h7:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
h9:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
h8:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
bk:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dX(d,!(!z||!1))
P.hb(d)},
o4:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
o3:{"^":"a:29;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
o5:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
o6:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pa:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
pb:{"^":"a:13;a",
$2:function(a,b){this.a.$2(1,new H.d9(a,b))}},
pu:{"^":"a:45;a",
$2:function(a,b){this.a(a,b)}},
p8:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcp()){z.b=!0
return}this.a.$2(null,0)}},
p9:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
o7:{"^":"d;a,b,c",
gdn:function(){return this.a.gdn()},
gcp:function(){return this.a.gcp()},
ge6:function(){return this.c!=null},
n:function(a,b){return J.aI(this.a,b)},
dU:function(a,b){return this.a.dU(a,b)},
b7:function(){return this.a.b7()},
hs:function(a){var z=new P.oa(a)
this.a=new P.of(null,0,null,new P.oc(z),null,new P.od(this,z),new P.oe(this,a),[null])},
t:{
o8:function(a){var z=new P.o7(null,!1,null)
z.hs(a)
return z}}},
oa:{"^":"a:1;a",
$0:function(){P.ca(new P.ob(this.a))}},
ob:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
oc:{"^":"a:1;a",
$0:function(){this.a.$0()}},
od:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
oe:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjp()){z.c=new P.c1(new P.C(0,$.n,null,[null]),[null])
if(z.b===!0){z.b=!1
P.ca(new P.o9(this.b))}return z.c.gfm()}}},
o9:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bF:{"^":"d;ao:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
t:{
c4:function(a){return new P.bF(a,1)},
aO:function(){return C.a7},
fU:function(a){return new P.bF(a,0)},
aP:function(a){return new P.bF(a,3)}}},
aZ:{"^":"d;a,b,c,d",
gF:function(){var z=this.c
return z==null?this.b:z.gF()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bF){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.af(z)
if(!!w.$isaZ){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
p2:{"^":"ct;a",
gY:function(a){return new P.aZ(this.a(),null,null,null)},
$asct:I.b1,
$asx:I.b1,
t:{
aQ:function(a){return new P.p2(a)}}},
L:{"^":"d;$ti"},
fR:{"^":"d;fm:a<,$ti",
e_:function(a,b){if(a==null)a=new P.cx()
if(this.a.a!==0)throw H.c(new P.F("Future already completed"))
$.n.toString
this.aY(a,b)},
cY:function(a){return this.e_(a,null)}},
c1:{"^":"fR;a,$ti",
bH:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.bh(a)},
dZ:function(){return this.bH(null)},
aY:function(a,b){this.a.eE(a,b)}},
p1:{"^":"fR;a,$ti",
bH:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.aX(a)},
dZ:function(){return this.bH(null)},
aY:function(a,b){this.a.aY(a,b)}},
dQ:{"^":"d;dL:a<,b,c,d,e,$ti",
gio:function(){return this.b.b},
gfo:function(){return(this.c&1)!==0},
gja:function(){return(this.c&2)!==0},
gfn:function(){return this.c===8},
j8:function(a){return this.b.b.ej(this.d,a)},
jz:function(a){if(this.c!==6)return!0
return this.b.b.ej(this.d,a.gb8())},
j4:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.jS(z,a.gb8(),a.gb6())
else return y.ej(z,a.gb8())},
j9:function(){return this.b.b.fN(this.d)}},
C:{"^":"d;cg:a<,b,i9:c<,$ti",
ghV:function(){return this.a===2},
gdH:function(){return this.a>=4},
ek:function(a,b){var z=$.n
if(z!==C.f){z.toString
if(b!=null)b=P.dZ(b,z)}return this.dT(a,b)},
bL:function(a){return this.ek(a,null)},
dT:function(a,b){var z,y
z=new P.C(0,$.n,null,[null])
y=b==null?1:3
this.cL(new P.dQ(null,z,y,a,b,[H.l(this,0),null]))
return z},
bM:function(a){var z,y
z=$.n
y=new P.C(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.l(this,0)
this.cL(new P.dQ(null,y,8,a,null,[z,z]))
return y},
cL:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdH()){y.cL(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bk(null,null,z,new P.op(this,a))}},
eV:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdL()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdH()){v.eV(a)
return}this.a=v.a
this.c=v.c}z.a=this.cS(a)
y=this.b
y.toString
P.bk(null,null,y,new P.ow(z,this))}},
cR:function(){var z=this.c
this.c=null
return this.cS(z)},
cS:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdL()
z.a=y}return y},
aX:function(a){var z,y
z=this.$ti
if(H.aG(a,"$isL",z,"$asL"))if(H.aG(a,"$isC",z,null))P.cN(a,this)
else P.fT(a,this)
else{y=this.cR()
this.a=4
this.c=a
P.bg(this,y)}},
aY:[function(a,b){var z=this.cR()
this.a=8
this.c=new P.ch(a,b)
P.bg(this,z)},function(a){return this.aY(a,null)},"ke","$2","$1","gbF",2,2,14,0],
bh:function(a){var z
if(H.aG(a,"$isL",this.$ti,"$asL")){this.hB(a)
return}this.a=1
z=this.b
z.toString
P.bk(null,null,z,new P.or(this,a))},
hB:function(a){var z
if(H.aG(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bk(null,null,z,new P.ov(this,a))}else P.cN(a,this)
return}P.fT(a,this)},
eE:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bk(null,null,z,new P.oq(this,a,b))},
hu:function(a,b){this.a=4
this.c=a},
$isL:1,
t:{
fT:function(a,b){var z,y,x
b.a=1
try{a.ek(new P.os(b),new P.ot(b))}catch(x){z=H.z(x)
y=H.A(x)
P.ca(new P.ou(b,z,y))}},
cN:function(a,b){var z,y,x
for(;a.ghV();)a=a.c
z=a.gdH()
y=b.c
if(z){b.c=null
x=b.cS(y)
b.a=a.a
b.c=a.c
P.bg(b,x)}else{b.a=2
b.c=a
a.eV(y)}},
bg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gb8()
t=v.gb6()
y.toString
P.bj(null,null,y,u,t)}return}for(;b.gdL()!=null;b=s){s=b.a
b.a=null
P.bg(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfo()||b.gfn()){q=b.gio()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gb8()
t=v.gb6()
y.toString
P.bj(null,null,y,u,t)
return}p=$.n
if(p==null?q!=null:p!==q)$.n=q
else p=null
if(b.gfn())new P.oz(z,x,w,b).$0()
else if(y){if(b.gfo())new P.oy(x,b,r).$0()}else if(b.gja())new P.ox(z,x,b).$0()
if(p!=null)$.n=p
y=x.b
if(!!J.o(y).$isL){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.cS(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cN(y,o)
return}}o=b.b
b=o.cR()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
op:{"^":"a:1;a,b",
$0:function(){P.bg(this.a,this.b)}},
ow:{"^":"a:1;a,b",
$0:function(){P.bg(this.b,this.a.a)}},
os:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.aX(a)}},
ot:{"^":"a:41;a",
$2:function(a,b){this.a.aY(a,b)},
$1:function(a){return this.$2(a,null)}},
ou:{"^":"a:1;a,b,c",
$0:function(){this.a.aY(this.b,this.c)}},
or:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cR()
z.a=4
z.c=this.b
P.bg(z,y)}},
ov:{"^":"a:1;a,b",
$0:function(){P.cN(this.b,this.a)}},
oq:{"^":"a:1;a,b,c",
$0:function(){this.a.aY(this.b,this.c)}},
oz:{"^":"a:4;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.j9()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gb8()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.ch(y,x)
u.a=!0
return}if(!!J.o(z).$isL){if(z instanceof P.C&&z.gcg()>=4){if(z.gcg()===8){v=this.b
v.b=z.gi9()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bL(new P.oA(t))
v.a=!1}}},
oA:{"^":"a:0;a",
$1:function(a){return this.a}},
oy:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.j8(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.ch(z,y)
w.a=!0}}},
ox:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jz(z)===!0&&w.e!=null){v=this.b
v.b=w.j4(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gb8()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.ch(y,x)
s.a=!0}}},
fP:{"^":"d;iF:a<,c_:b@"},
a5:{"^":"d;$ti",
aR:function(a,b){return new P.oO(b,this,[H.v(this,"a5",0),null])},
Z:function(a,b){var z,y
z={}
y=new P.C(0,$.n,null,[P.W])
z.a=null
z.a=this.as(new P.mH(z,this,b,y),!0,new P.mI(y),y.gbF())
return y},
K:function(a,b){var z,y
z={}
y=new P.C(0,$.n,null,[null])
z.a=null
z.a=this.as(new P.mL(z,this,b,y),!0,new P.mM(y),y.gbF())
return y},
gl:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[P.u])
z.a=0
this.as(new P.mR(z),!0,new P.mS(z,y),y.gbF())
return y},
gI:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[P.W])
z.a=null
z.a=this.as(new P.mN(z,y),!0,new P.mO(y),y.gbF())
return y},
c2:function(a){var z,y,x
z=H.v(this,"a5",0)
y=H.t([],[z])
x=new P.C(0,$.n,null,[[P.I,z]])
this.as(new P.mT(this,y),!0,new P.mU(y,x),x.gbF())
return x},
br:function(a){var z,y,x
z=H.v(this,"a5",0)
y=P.T(null,null,null,z)
x=new P.C(0,$.n,null,[[P.bA,z]])
this.as(new P.mV(this,y),!0,new P.mW(y,x),x.gbF())
return x},
gE:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[H.v(this,"a5",0)])
z.a=null
z.b=!1
this.as(new P.mP(z,this),!0,new P.mQ(z,y),y.gbF())
return y}},
mH:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.ha(new P.mF(this.c,a),new P.mG(z,y),P.h_(z.a,y))},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"a5")}},
mF:{"^":"a:1;a,b",
$0:function(){return J.i(this.b,this.a)}},
mG:{"^":"a:23;a,b",
$1:function(a){if(a===!0)P.h0(this.a.a,this.b,!0)}},
mI:{"^":"a:1;a",
$0:function(){this.a.aX(!1)}},
mL:{"^":"a;a,b,c,d",
$1:function(a){P.ha(new P.mJ(this.c,a),new P.mK(),P.h_(this.a.a,this.d))},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"a5")}},
mJ:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
mK:{"^":"a:0;",
$1:function(a){}},
mM:{"^":"a:1;a",
$0:function(){this.a.aX(null)}},
mR:{"^":"a:0;a",
$1:function(a){++this.a.a}},
mS:{"^":"a:1;a,b",
$0:function(){this.b.aX(this.a.a)}},
mN:{"^":"a:0;a,b",
$1:function(a){P.h0(this.a.a,this.b,!1)}},
mO:{"^":"a:1;a",
$0:function(){this.a.aX(!0)}},
mT:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.a,"a5")}},
mU:{"^":"a:1;a,b",
$0:function(){this.b.aX(this.a)}},
mV:{"^":"a;a,b",
$1:function(a){this.b.n(0,a)},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.a,"a5")}},
mW:{"^":"a:1;a,b",
$0:function(){this.b.aX(this.a)}},
mP:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"a5")}},
mQ:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aX(x.a)
return}try{x=H.a9()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.pj(this.b,z,y)}}},
cO:{"^":"d;cg:b<,$ti",
gdn:function(){return new P.cL(this,this.$ti)},
gjp:function(){return(this.b&4)!==0},
gcp:function(){var z=this.b
return(z&1)!==0?this.gbu().geR():(z&2)===0},
gi2:function(){if((this.b&8)===0)return this.a
return this.a.gcD()},
dA:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dS(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcD()==null)y.c=new P.dS(null,null,0,this.$ti)
return y.c},
gbu:function(){if((this.b&8)!==0)return this.a.gcD()
return this.a},
c5:function(){if((this.b&4)!==0)return new P.F("Cannot add event after closing")
return new P.F("Cannot add event while adding a stream")},
iD:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c5())
if((z&2)!==0){z=new P.C(0,$.n,null,[null])
z.bh(null)
return z}z=this.a
y=new P.C(0,$.n,null,[null])
x=a.as(this.ghz(),!1,this.ghA(),this.ghw())
w=this.b
if((w&1)!==0?this.gbu().geR():(w&2)===0)x.cs()
this.a=new P.oV(z,y,x,this.$ti)
this.b|=8
return y},
eL:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b4():new P.C(0,$.n,null,[null])
this.c=z}return z},
n:[function(a,b){if(this.b>=4)throw H.c(this.c5())
this.bE(b)},"$1","gis",2,0,function(){return H.b_(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cO")}],
dU:function(a,b){if(this.b>=4)throw H.c(this.c5())
if(a==null)a=new P.cx()
$.n.toString
this.bS(a,b)},
b7:function(){var z=this.b
if((z&4)!==0)return this.eL()
if(z>=4)throw H.c(this.c5())
z|=4
this.b=z
if((z&1)!==0)this.ce()
else if((z&3)===0)this.dA().n(0,C.u)
return this.eL()},
bE:[function(a){var z=this.b
if((z&1)!==0)this.cd(a)
else if((z&3)===0)this.dA().n(0,new P.dM(a,null,this.$ti))},"$1","ghz",2,0,function(){return H.b_(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cO")}],
bS:[function(a,b){var z=this.b
if((z&1)!==0)this.cf(a,b)
else if((z&3)===0)this.dA().n(0,new P.dN(a,b,null))},"$2","ghw",4,0,26],
ds:[function(){var z=this.a
this.a=z.gcD()
this.b&=4294967287
z.a.bh(null)},"$0","ghA",0,0,4],
ii:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.F("Stream has already been listened to."))
z=$.n
y=d?1:0
x=new P.oj(this,null,null,null,z,y,null,null,this.$ti)
x.eA(a,b,c,d,H.l(this,0))
w=this.gi2()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scD(x)
v.b.cw()}else this.a=x
x.ig(w)
x.dF(new P.oX(this))
return x},
i6:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bW()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.C(0,$.n,null,[null])
u.eE(y,x)
z=u}else z=z.bM(w)
w=new P.oW(this)
if(z!=null)z=z.bM(w)
else w.$0()
return z}},
oX:{"^":"a:1;a",
$0:function(){P.e_(this.a.d)}},
oW:{"^":"a:4;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bh(null)}},
p4:{"^":"d;$ti",
cd:function(a){this.gbu().bE(a)},
cf:function(a,b){this.gbu().bS(a,b)},
ce:function(){this.gbu().ds()}},
og:{"^":"d;$ti",
cd:function(a){this.gbu().bT(new P.dM(a,null,[H.l(this,0)]))},
cf:function(a,b){this.gbu().bT(new P.dN(a,b,null))},
ce:function(){this.gbu().bT(C.u)}},
of:{"^":"cO+og;a,b,c,d,e,f,r,$ti"},
p3:{"^":"cO+p4;a,b,c,d,e,f,r,$ti"},
cL:{"^":"oY;a,$ti",
gA:function(a){return(H.as(this.a)^892482866)>>>0},
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cL))return!1
return b.a===this.a}},
oj:{"^":"c2;x,a,b,c,d,e,f,r,$ti",
dM:function(){return this.x.i6(this)},
dO:[function(){var z=this.x
if((z.b&8)!==0)z.a.cs()
P.e_(z.e)},"$0","gdN",0,0,4],
dQ:[function(){var z=this.x
if((z.b&8)!==0)z.a.cw()
P.e_(z.f)},"$0","gdP",0,0,4]},
o_:{"^":"d;$ti",
cs:function(){this.b.cs()},
cw:function(){this.b.cw()},
bW:function(){var z=this.b.bW()
if(z==null){this.a.bh(null)
return}return z.bM(new P.o0(this))},
dZ:function(){this.a.bh(null)}},
o0:{"^":"a:1;a",
$0:function(){this.a.a.bh(null)}},
oV:{"^":"o_;cD:c@,a,b,$ti"},
c2:{"^":"d;cg:e<,$ti",
ig:function(a){if(a==null)return
this.r=a
if(!a.gI(a)){this.e=(this.e|64)>>>0
this.r.cG(this)}},
jF:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.f9()
if((z&4)===0&&(this.e&32)===0)this.dF(this.gdN())},
cs:function(){return this.jF(null)},
cw:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gI(z)}else z=!1
if(z)this.r.cG(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dF(this.gdP())}}}},
bW:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dt()
z=this.f
return z==null?$.$get$b4():z},
geR:function(){return(this.e&4)!==0},
gcp:function(){return this.e>=128},
dt:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.f9()
if((this.e&32)===0)this.r=null
this.f=this.dM()},
bE:["hi",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cd(a)
else this.bT(new P.dM(a,null,[H.v(this,"c2",0)]))}],
bS:["hj",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cf(a,b)
else this.bT(new P.dN(a,b,null))}],
ds:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ce()
else this.bT(C.u)},
dO:[function(){},"$0","gdN",0,0,4],
dQ:[function(){},"$0","gdP",0,0,4],
dM:function(){return},
bT:function(a){var z,y
z=this.r
if(z==null){z=new P.dS(null,null,0,[H.v(this,"c2",0)])
this.r=z}z.n(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cG(this)}},
cd:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fQ(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dv((z&4)!==0)},
cf:function(a,b){var z,y
z=this.e
y=new P.oi(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dt()
z=this.f
if(!!J.o(z).$isL&&z!==$.$get$b4())z.bM(y)
else y.$0()}else{y.$0()
this.dv((z&4)!==0)}},
ce:function(){var z,y
z=new P.oh(this)
this.dt()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isL&&y!==$.$get$b4())y.bM(z)
else z.$0()},
dF:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dv((z&4)!==0)},
dv:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gI(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gI(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dO()
else this.dQ()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cG(this)},
eA:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.dZ(b==null?P.pA():b,z)
this.c=c==null?P.pz():c}},
oi:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ay(y,{func:1,args:[P.d,P.aN]})
w=z.d
v=this.b
u=z.b
if(x)w.jT(u,v,this.c)
else w.fQ(u,v)
z.e=(z.e&4294967263)>>>0}},
oh:{"^":"a:4;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fO(z.c)
z.e=(z.e&4294967263)>>>0}},
oY:{"^":"a5;$ti",
as:function(a,b,c,d){return this.a.ii(a,d,c,!0===b)},
ec:function(a,b,c){return this.as(a,null,b,c)}},
dO:{"^":"d;c_:a@,$ti"},
dM:{"^":"dO;ao:b<,a,$ti",
ed:function(a){a.cd(this.b)}},
dN:{"^":"dO;b8:b<,b6:c<,a",
ed:function(a){a.cf(this.b,this.c)},
$asdO:I.b1},
ok:{"^":"d;",
ed:function(a){a.ce()},
gc_:function(){return},
sc_:function(a){throw H.c(new P.F("No events after a done."))}},
oQ:{"^":"d;cg:a<,$ti",
cG:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.ca(new P.oR(this,a))
this.a=1},
f9:function(){if(this.a===1)this.a=3}},
oR:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc_()
z.b=w
if(w==null)z.c=null
x.ed(this.b)}},
dS:{"^":"oQ;b,c,a,$ti",
gI:function(a){return this.c==null},
n:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc_(b)
this.c=b}}},
oZ:{"^":"d;a,b,c,$ti"},
pe:{"^":"a:1;a,b,c",
$0:function(){return this.a.aY(this.b,this.c)}},
pd:{"^":"a:13;a,b",
$2:function(a,b){P.pc(this.a,this.b,a,b)}},
pf:{"^":"a:1;a,b",
$0:function(){return this.a.aX(this.b)}},
dP:{"^":"a5;$ti",
as:function(a,b,c,d){return this.hI(a,d,c,!0===b)},
ec:function(a,b,c){return this.as(a,null,b,c)},
hI:function(a,b,c,d){return P.oo(this,a,b,c,d,H.v(this,"dP",0),H.v(this,"dP",1))},
eO:function(a,b){b.bE(a)},
hT:function(a,b,c){c.bS(a,b)},
$asa5:function(a,b){return[b]}},
fS:{"^":"c2;x,y,a,b,c,d,e,f,r,$ti",
bE:function(a){if((this.e&2)!==0)return
this.hi(a)},
bS:function(a,b){if((this.e&2)!==0)return
this.hj(a,b)},
dO:[function(){var z=this.y
if(z==null)return
z.cs()},"$0","gdN",0,0,4],
dQ:[function(){var z=this.y
if(z==null)return
z.cw()},"$0","gdP",0,0,4],
dM:function(){var z=this.y
if(z!=null){this.y=null
return z.bW()}return},
kg:[function(a){this.x.eO(a,this)},"$1","ghQ",2,0,function(){return H.b_(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fS")}],
ki:[function(a,b){this.x.hT(a,b,this)},"$2","ghS",4,0,27],
kh:[function(){this.ds()},"$0","ghR",0,0,4],
ht:function(a,b,c,d,e,f,g){this.y=this.x.a.ec(this.ghQ(),this.ghR(),this.ghS())},
$asc2:function(a,b){return[b]},
t:{
oo:function(a,b,c,d,e,f,g){var z,y
z=$.n
y=e?1:0
y=new P.fS(a,null,null,null,null,z,y,null,null,[f,g])
y.eA(b,c,d,e,g)
y.ht(a,b,c,d,e,f,g)
return y}}},
oO:{"^":"dP;b,a,$ti",
eO:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.p7(b,y,x)
return}b.bE(z)}},
ch:{"^":"d;b8:a<,b6:b<",
k:function(a){return H.b(this.a)},
$isY:1},
p6:{"^":"d;"},
pq:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cx()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.f(y)
throw x}},
oS:{"^":"p6;",
fO:function(a){var z,y,x,w
try{if(C.f===$.n){x=a.$0()
return x}x=P.h7(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bj(null,null,this,z,y)
return x}},
fQ:function(a,b){var z,y,x,w
try{if(C.f===$.n){x=a.$1(b)
return x}x=P.h9(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bj(null,null,this,z,y)
return x}},
jT:function(a,b,c){var z,y,x,w
try{if(C.f===$.n){x=a.$2(b,c)
return x}x=P.h8(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bj(null,null,this,z,y)
return x}},
dX:function(a,b){if(b)return new P.oT(this,a)
else return new P.oU(this,a)},
h:function(a,b){return},
fN:function(a){if($.n===C.f)return a.$0()
return P.h7(null,null,this,a)},
ej:function(a,b){if($.n===C.f)return a.$1(b)
return P.h9(null,null,this,a,b)},
jS:function(a,b,c){if($.n===C.f)return a.$2(b,c)
return P.h8(null,null,this,a,b,c)}},
oT:{"^":"a:1;a,b",
$0:function(){return this.a.fO(this.b)}},
oU:{"^":"a:1;a,b",
$0:function(){return this.a.fN(this.b)}}}],["","",,P,{"^":"",
di:function(a,b){return new H.M(0,null,null,null,null,null,0,[a,b])},
aV:function(){return new H.M(0,null,null,null,null,null,0,[null,null])},
aa:function(a){return H.qA(a,new H.M(0,null,null,null,null,null,0,[null,null]))},
k5:function(a,b,c){var z,y
if(P.dW(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bJ()
y.push(a)
try{P.pm(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fo(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bQ:function(a,b,c){var z,y,x
if(P.dW(a))return b+"..."+c
z=new P.bE(b)
y=$.$get$bJ()
y.push(a)
try{x=z
x.w=P.fo(x.gw(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.w=y.gw()+c
y=z.gw()
return y.charCodeAt(0)==0?y:y},
dW:function(a){var z,y
for(z=0;y=$.$get$bJ(),z<y.length;++z)if(a===y[z])return!0
return!1},
pm:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gY(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.b(z.gF())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.e(b,-1)
v=b.pop()
if(0>=b.length)return H.e(b,-1)
u=b.pop()}else{t=z.gF();++x
if(!z.u()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.e(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gF();++x
for(;z.u();t=s,s=r){r=z.gF();++x
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
ki:function(a,b,c,d,e){return new H.M(0,null,null,null,null,null,0,[d,e])},
bU:function(a,b,c){var z=P.ki(null,null,null,b,c)
a.K(0,new P.pD(z))
return z},
T:function(a,b,c,d){return new P.fV(0,null,null,null,null,null,0,[d])},
aW:function(a,b){var z,y
z=P.T(null,null,null,b)
for(y=J.af(a);y.u();)z.n(0,y.gF())
return z},
dm:function(a){var z,y,x
z={}
if(P.dW(a))return"{...}"
y=new P.bE("")
try{$.$get$bJ().push(a)
x=y
x.w=x.gw()+"{"
z.a=!0
a.K(0,new P.kq(z,y))
z=y
z.w=z.gw()+"}"}finally{z=$.$get$bJ()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gw()
return z.charCodeAt(0)==0?z:z},
fW:{"^":"M;a,b,c,d,e,f,r,$ti",
cn:function(a){return H.qR(a)&0x3ffffff},
co:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfp()
if(x==null?b==null:x===b)return y}return-1},
t:{
bG:function(a,b){return new P.fW(0,null,null,null,null,null,0,[a,b])}}},
fV:{"^":"oB;a,b,c,d,e,f,r,$ti",
dK:function(){return new P.fV(0,null,null,null,null,null,0,this.$ti)},
gY:function(a){var z=new P.am(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gI:function(a){return this.a===0},
gab:function(a){return this.a!==0},
Z:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hG(b)},
hG:function(a){var z=this.d
if(z==null)return!1
return this.cO(z[this.cN(a)],a)>=0},
bZ:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.Z(0,a)?a:null
else return this.hX(a)},
hX:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cN(a)]
x=this.cO(y,a)
if(x<0)return
return J.aq(y,x).geK()},
K:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
gE:function(a){var z=this.f
if(z==null)throw H.c(new P.F("No elements"))
return z.a},
n:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.eF(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eF(x,b)}else return this.aq(b)},
aq:function(a){var z,y,x
z=this.d
if(z==null){z=P.oK()
this.d=z}y=this.cN(a)
x=z[y]
if(x==null)z[y]=[this.dw(a)]
else{if(this.cO(x,a)>=0)return!1
x.push(this.dw(a))}return!0},
aS:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eG(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eG(this.c,b)
else return this.i7(b)},
i7:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cN(a)]
x=this.cO(y,a)
if(x<0)return!1
this.eH(y.splice(x,1)[0])
return!0},
hN:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.aS(0,y)}},
aQ:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eF:function(a,b){if(a[b]!=null)return!1
a[b]=this.dw(b)
return!0},
eG:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eH(z)
delete a[b]
return!0},
dw:function(a){var z,y
z=new P.oJ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eH:function(a){var z,y
z=a.ghF()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cN:function(a){return J.j(a)&0x3ffffff},
cO:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].geK(),b))return y
return-1},
$isbA:1,
$isS:1,
t:{
oK:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
oJ:{"^":"d;eK:a<,b,hF:c<"},
am:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
oB:{"^":"m_;$ti",
br:function(a){var z=this.dK()
z.al(0,this)
return z}},
ct:{"^":"x;$ti"},
pD:{"^":"a:6;a",
$2:function(a,b){this.a.m(0,a,b)}},
eL:{"^":"eQ;$ti"},
eQ:{"^":"d+aX;$ti",$asI:null,$asS:null,$isI:1,$isS:1},
aX:{"^":"d;$ti",
gY:function(a){return new H.dj(this,this.gl(this),0,null,[H.v(this,"aX",0)])},
ag:function(a,b){return this.h(0,b)},
K:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gI:function(a){return this.gl(this)===0},
gab:function(a){return!this.gI(this)},
gE:function(a){if(this.gl(this)===0)throw H.c(H.a9())
return this.h(0,this.gl(this)-1)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.i(this.h(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bV:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bn:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aR:function(a,b){return new H.ah(this,b,[H.v(this,"aX",0),null])},
dl:function(a,b){return H.fq(this,b,null,H.v(this,"aX",0))},
br:function(a){var z,y
z=P.T(null,null,null,H.v(this,"aX",0))
for(y=0;y<this.gl(this);++y)z.n(0,this.h(0,y))
return z},
n:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.m(0,z,b)},
aS:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.i(this.h(0,z),b)){this.aI(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
hM:function(a,b){var z,y,x,w
z=H.t([],[H.v(this,"aX",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.h(0,x)
if(J.i(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.ha(0,0,z.length,z)
this.sl(0,z.length)}},
aI:function(a,b,c,d,e){var z,y,x,w,v
P.cC(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aG(d,"$isI",[H.v(this,"aX",0)],"$asI")){y=e
x=d}else{x=J.hZ(d,e).bq(0,!1)
y=0}w=J.J(x)
if(y+z>w.gl(x))throw H.c(H.eC())
if(y<b)for(v=z-1;v>=0;--v)this.m(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.m(0,b+v,w.h(x,y+v))},
ha:function(a,b,c,d){return this.aI(a,b,c,d,0)},
k:function(a){return P.bQ(this,"[","]")},
$isI:1,
$isS:1},
p5:{"^":"d;$ti",
m:function(a,b,c){throw H.c(new P.N("Cannot modify unmodifiable map"))},
$isD:1},
ko:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
m:function(a,b,c){this.a.m(0,b,c)},
a_:function(a){return this.a.a_(a)},
K:function(a,b){this.a.K(0,b)},
gI:function(a){var z=this.a
return z.gI(z)},
gab:function(a){var z=this.a
return z.gab(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isD:1},
fM:{"^":"ko+p5;a,$ti",$asD:null,$isD:1},
kq:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.w+=", "
z.a=!1
z=this.b
y=z.w+=H.b(a)
z.w=y+": "
z.w+=H.b(b)}},
kj:{"^":"aM;a,b,c,d,$ti",
gY:function(a){return new P.fX(this,this.c,this.d,this.b,null,this.$ti)},
K:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
gI:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gE:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.a9())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
ag:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cr(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
n:function(a,b){this.aq(b)},
al:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aG(b,"$isI",z,"$asI")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.kk(w+(w>>>1))
if(typeof t!=="number")return H.y(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.im(s)
this.a=s
this.b=0
C.a.aI(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aI(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aI(v,z,z+r,b,0)
C.a.aI(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.fX(b,b.c,b.d,b.b,null,[H.l(b,0)]);z.u();)this.aq(z.e)},
aQ:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bQ(this,"{","}")},
f7:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eN();++this.d},
d4:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.a9());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aq:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.eN();++this.d},
eN:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aI(y,0,w,z,x)
C.a.aI(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
im:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aI(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aI(a,0,v,x,z)
C.a.aI(a,v,v+this.c,this.a,0)
return this.c+v}},
hl:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
t:{
aY:function(a,b){var z=new P.kj(null,0,0,0,[b])
z.hl(a,b)
return z},
kk:function(a){var z
a=C.r.er(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
fX:{"^":"d;a,b,c,d,e,$ti",
gF:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.h(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.e(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
m0:{"^":"d;$ti",
gI:function(a){return this.a===0},
gab:function(a){return this.a!==0},
al:function(a,b){var z
for(z=J.af(b);z.u();)this.n(0,z.gF())},
iK:function(a){var z,y
for(z=a.a,y=new P.am(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.Z(0,y.d))return!1
return!0},
bq:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.am(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
c2:function(a){return this.bq(a,!0)},
aR:function(a,b){return new H.bt(this,b,[H.l(this,0),null])},
k:function(a){return P.bQ(this,"{","}")},
K:function(a,b){var z
for(z=new P.am(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
b1:function(a,b,c){var z,y
for(z=new P.am(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.am(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.a9())
do y=z.d
while(z.u())
return y},
bn:function(a,b,c){var z,y
for(z=new P.am(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
aC:function(a,b){var z,y,x,w
for(z=new P.am(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dd())
y=w
x=!0}}if(x)return y
throw H.c(H.a9())},
$isbA:1,
$isS:1},
m_:{"^":"m0;$ti"}}],["","",,P,{"^":"",
cQ:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.oE(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cQ(a[z])
return a},
pp:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.O(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.ez(w,null,null))}w=P.cQ(z)
return w},
rS:[function(a){return a.d7()},"$1","qs",2,0,0],
oE:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.i5(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.c7().length
return z},
gI:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.c7().length
return z===0},
gab:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.c7().length
return z>0},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a_(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.ik().m(0,b,c)},
a_:function(a){if(this.b==null)return this.c.a_(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
K:function(a,b){var z,y,x,w
if(this.b==null)return this.c.K(0,b)
z=this.c7()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cQ(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dm(this)},
c7:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
ik:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.di(P.q,null)
y=this.c7()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
i5:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cQ(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:function(){return[P.q,null]}},
eo:{"^":"d;$ti"},
cn:{"^":"d;$ti"},
dh:{"^":"Y;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
kb:{"^":"dh;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
ka:{"^":"eo;a,b",
iO:function(a,b){var z=P.pp(a,this.giP().a)
return z},
iN:function(a){return this.iO(a,null)},
iX:function(a,b){var z=this.giY()
z=P.oG(a,z.b,z.a)
return z},
fg:function(a){return this.iX(a,null)},
giY:function(){return C.N},
giP:function(){return C.M},
$aseo:function(){return[P.d,P.q]}},
kd:{"^":"cn;a,b",
$ascn:function(){return[P.d,P.q]}},
kc:{"^":"cn;a",
$ascn:function(){return[P.q,P.d]}},
oH:{"^":"d;",
fY:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gl(a)
if(typeof y!=="number")return H.y(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.ck(a,v)
if(u>92)continue
if(u<32){if(v>w)x.w+=C.b.aE(a,w,v)
w=v+1
x.w+=H.ab(92)
switch(u){case 8:x.w+=H.ab(98)
break
case 9:x.w+=H.ab(116)
break
case 10:x.w+=H.ab(110)
break
case 12:x.w+=H.ab(102)
break
case 13:x.w+=H.ab(114)
break
default:x.w+=H.ab(117)
x.w+=H.ab(48)
x.w+=H.ab(48)
t=u>>>4&15
x.w+=H.ab(t<10?48+t:87+t)
t=u&15
x.w+=H.ab(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.w+=C.b.aE(a,w,v)
w=v+1
x.w+=H.ab(92)
x.w+=H.ab(u)}}if(w===0)x.w+=H.b(a)
else if(w<y)x.w+=z.aE(a,w,y)},
du:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.kb(a,null))}z.push(a)},
da:function(a){var z,y,x,w
if(this.fX(a))return
this.du(a)
try{z=this.b.$1(a)
if(!this.fX(z))throw H.c(new P.dh(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dh(a,y))}},
fX:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.w+=C.i.k(a)
return!0}else if(a===!0){this.c.w+="true"
return!0}else if(a===!1){this.c.w+="false"
return!0}else if(a==null){this.c.w+="null"
return!0}else if(typeof a==="string"){z=this.c
z.w+='"'
this.fY(a)
z.w+='"'
return!0}else{z=J.o(a)
if(!!z.$isI){this.du(a)
this.k9(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.du(a)
y=this.ka(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
k9:function(a){var z,y,x
z=this.c
z.w+="["
y=J.J(a)
if(y.gl(a)>0){this.da(y.h(a,0))
for(x=1;x<y.gl(a);++x){z.w+=","
this.da(y.h(a,x))}}z.w+="]"},
ka:function(a){var z,y,x,w,v,u,t
z={}
if(a.gI(a)){this.c.w+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.K(0,new P.oI(z,x))
if(!z.b)return!1
w=this.c
w.w+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.w+=v
this.fY(x[u])
w.w+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.da(x[t])}w.w+="}"
return!0}},
oI:{"^":"a:6;a,b",
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
oF:{"^":"oH;c,a,b",t:{
oG:function(a,b,c){var z,y,x
z=new P.bE("")
y=new P.oF(z,[],P.qs())
y.da(a)
x=z.w
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
rk:[function(a,b){return J.cd(a,b)},"$2","qt",4,0,40],
eu:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.f(a)
if(typeof a==="string")return JSON.stringify(a)
return P.jv(a)},
jv:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cz(a)},
cp:function(a){return new P.on(a)},
U:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.af(a);y.u();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
kl:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
e7:function(a){H.qW(H.b(a))},
ba:function(a,b,c){return new H.eI(a,H.df(a,!1,b,!1),null,null)},
W:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
co:{"^":"d;il:a<,b",
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.co))return!1
return this.a===b.a&&!0},
bl:function(a,b){return C.e.bl(this.a,b.gil())},
gA:function(a){var z=this.a
return(z^C.e.cU(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.j3(H.la(this))
y=P.bO(H.l8(this))
x=P.bO(H.l4(this))
w=P.bO(H.l5(this))
v=P.bO(H.l7(this))
u=P.bO(H.l9(this))
t=P.j4(H.l6(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
n:function(a,b){var z,y
z=this.a+b.gje()
y=new P.co(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.h(P.E(y.gjA()))
return y},
gjA:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.co]},
t:{
j3:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
j4:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bO:function(a){if(a>=10)return""+a
return"0"+a}}},
aH:{"^":"K;",$isQ:1,
$asQ:function(){return[P.K]}},
"+double":0,
aU:{"^":"d;bG:a<",
a4:function(a,b){return new P.aU(this.a+b.gbG())},
aK:function(a,b){return new P.aU(this.a-b.gbG())},
bP:function(a,b){return new P.aU(C.i.ei(this.a*b))},
aH:function(a,b){return C.e.aH(this.a,b.gbG())},
bC:function(a,b){return this.a>b.gbG()},
bO:function(a,b){return C.e.bO(this.a,b.gbG())},
bA:function(a,b){return C.e.bA(this.a,b.gbG())},
gje:function(){return C.e.bv(this.a,1000)},
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.aU))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
bl:function(a,b){return C.e.bl(this.a,b.gbG())},
k:function(a){var z,y,x,w,v
z=new P.je()
y=this.a
if(y<0)return"-"+new P.aU(0-y).k(0)
x=z.$1(C.e.bv(y,6e7)%60)
w=z.$1(C.e.bv(y,1e6)%60)
v=new P.jd().$1(y%1e6)
return""+C.e.bv(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eq:function(a){return new P.aU(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aU]}},
jd:{"^":"a:10;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
je:{"^":"a:10;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Y:{"^":"d;",
gb6:function(){return H.A(this.$thrownJsError)}},
cx:{"^":"Y;",
k:function(a){return"Throw of null."}},
aT:{"^":"Y;a,b,i:c<,d",
gdC:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdB:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdC()+y+x
if(!this.a)return w
v=this.gdB()
u=P.eu(this.b)
return w+v+": "+H.b(u)},
t:{
E:function(a){return new P.aT(!1,null,null,a)},
cg:function(a,b,c){return new P.aT(!0,a,b,c)},
m:function(a){return new P.aT(!1,null,a,"Must not be null")}}},
dx:{"^":"aT;e,f,a,b,c,d",
gdC:function(){return"RangeError"},
gdB:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
t:{
le:function(a){return new P.dx(null,null,!1,null,null,a)},
bW:function(a,b,c){return new P.dx(null,null,!0,a,b,"Value not in range")},
V:function(a,b,c,d,e){return new P.dx(b,c,!0,a,d,"Invalid value")},
lf:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.V(a,b,c,d,e))},
cC:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.V(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.V(b,a,c,"end",f))
return b}}},
jV:{"^":"aT;e,l:f>,a,b,c,d",
gdC:function(){return"RangeError"},
gdB:function(){if(J.cc(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
t:{
cr:function(a,b,c,d,e){var z=e!=null?e:J.aC(b)
return new P.jV(b,z,!0,a,c,"Index out of range")}}},
N:{"^":"Y;a",
k:function(a){return"Unsupported operation: "+this.a}},
ad:{"^":"Y;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
F:{"^":"Y;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"Y;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eu(z))+"."}},
kH:{"^":"d;",
k:function(a){return"Out of Memory"},
gb6:function(){return},
$isY:1},
fg:{"^":"d;",
k:function(a){return"Stack Overflow"},
gb6:function(){return},
$isY:1},
j2:{"^":"Y;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
on:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
ez:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aE(x,0,75)+"..."
return y+"\n"+x}},
jz:{"^":"d;i:a<,eS,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.eS
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.cg(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dw(b,"expando$values")
return y==null?null:H.dw(y,z)},
m:function(a,b,c){var z,y
z=this.eS
if(typeof z!=="string")z.set(b,c)
else{y=H.dw(b,"expando$values")
if(y==null){y=new P.d()
H.eY(b,"expando$values",y)}H.eY(y,z,c)}}},
bv:{"^":"d;"},
u:{"^":"K;",$isQ:1,
$asQ:function(){return[P.K]}},
"+int":0,
x:{"^":"d;$ti",
aR:function(a,b){return H.bw(this,b,H.v(this,"x",0),null)},
bN:["ez",function(a,b){return new H.H(this,b,[H.v(this,"x",0)])}],
Z:function(a,b){var z
for(z=this.gY(this);z.u();)if(J.i(z.gF(),b))return!0
return!1},
K:function(a,b){var z
for(z=this.gY(this);z.u();)b.$1(z.gF())},
b1:function(a,b,c){var z,y
for(z=this.gY(this),y=b;z.u();)y=c.$2(y,z.gF())
return y},
bq:function(a,b){return P.U(this,b,H.v(this,"x",0))},
c2:function(a){return this.bq(a,!0)},
br:function(a){return P.aW(this,H.v(this,"x",0))},
gl:function(a){var z,y
z=this.gY(this)
for(y=0;z.u();)++y
return y},
gI:function(a){return!this.gY(this).u()},
gab:function(a){return!this.gI(this)},
dl:function(a,b){return H.m1(this,b,H.v(this,"x",0))},
gE:function(a){var z,y
z=this.gY(this)
if(!z.u())throw H.c(H.a9())
do y=z.gF()
while(z.u())
return y},
gbR:function(a){var z,y
z=this.gY(this)
if(!z.u())throw H.c(H.a9())
y=z.gF()
if(z.u())throw H.c(H.dd())
return y},
ag:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.m("index"))
if(b<0)H.h(P.V(b,0,null,"index",null))
for(z=this.gY(this),y=0;z.u();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cr(b,this,"index",null,y))},
k:function(a){return P.k5(this,"(",")")}},
cu:{"^":"d;$ti"},
I:{"^":"d;$ti",$isx:1,$isS:1},
"+List":0,
D:{"^":"d;$ti"},
ai:{"^":"d;",
gA:function(a){return P.d.prototype.gA.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isQ:1,
$asQ:function(){return[P.K]}},
"+num":0,
d:{"^":";",
v:function(a,b){return this===b},
gA:function(a){return H.as(this)},
k:function(a){return H.cz(this)},
gbd:function(a){return new H.al(H.hs(this),null)},
toString:function(){return this.k(this)}},
b6:{"^":"d;"},
bA:{"^":"S;$ti"},
aN:{"^":"d;"},
q:{"^":"d;",$isQ:1,
$asQ:function(){return[P.q]},
$isdt:1},
"+String":0,
bE:{"^":"d;w<",
gl:function(a){return this.w.length},
gI:function(a){return this.w.length===0},
gab:function(a){return this.w.length!==0},
k:function(a){var z=this.w
return z.charCodeAt(0)==0?z:z},
t:{
fo:function(a,b,c){var z=J.af(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.u())}else{a+=H.b(z.gF())
for(;z.u();)a=a+c+H.b(z.gF())}return a},
mZ:function(a){return new P.bE(a)}}}}],["","",,P,{"^":"",f6:{"^":"d;"}}],["","",,P,{"^":"",
cA:function(a){return C.F},
oD:{"^":"d;",
aa:function(a){if(a<=0||a>4294967296)throw H.c(P.le("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fA:function(){return Math.random()}}}],["","",,S,{"^":"",iT:{"^":"d;a,b,$ti",
h:function(a,b){return this.b.h(0,b)},
a_:function(a){return this.b.a_(a)},
K:function(a,b){return this.b.K(0,b)},
gI:function(a){var z=this.b
return z.gI(z)},
gab:function(a){var z=this.b
return z.gab(z)},
gl:function(a){var z=this.b
return z.gl(z)},
m:function(a,b,c){this.hH()
this.b.m(0,b,c)},
k:function(a){return J.f(this.b)},
hH:function(){if(!this.a)return
this.a=!1
this.b=P.bU(this.b,H.l(this,0),H.l(this,1))},
$isD:1}}],["","",,A,{"^":"",iU:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
bZ:function(a){return this.b.bZ(a)},
Z:function(a,b){return this.b.Z(0,b)},
K:function(a,b){return this.b.K(0,b)},
gI:function(a){return this.b.a===0},
gab:function(a){return this.b.a!==0},
gY:function(a){var z,y
z=this.b
y=new P.am(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aR:function(a,b){var z=this.b
z.toString
return new H.bt(z,b,[H.l(z,0),null])},
br:function(a){var z,y
z=this.b
y=z.dK()
y.al(0,z)
return y},
n:function(a,b){this.hZ()
return this.b.n(0,b)},
k:function(a){return J.f(this.b)},
hZ:function(){if(!this.a)return
this.a=!1
this.b=P.aW(this.b,H.l(this,0))},
$isbA:1,
$isS:1}}],["","",,S,{"^":"",d4:{"^":"d;eU:a<,b,$ti",
a7:function(a){var z=new S.aL(null,null,this.$ti)
z.aW()
z.p(this)
a.$1(z)
return z.q()},
gA:function(a){var z=this.b
if(z==null){z=X.bn(this.a)
this.b=z}return z},
v:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isd4)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.i(w,x[v]))return!1}return!0},
k:function(a){return J.f(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
gY:function(a){var z=this.a
return new J.bM(z,z.length,0,null,[H.l(z,0)])},
aR:function(a,b){var z=this.a
z.toString
return new H.ah(z,b,[H.l(z,0),null])},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
K:function(a,b){var z=this.a
return(z&&C.a).K(z,b)},
br:function(a){var z=this.a
z.toString
return P.aW(z,H.l(z,0))},
gI:function(a){return this.a.length===0},
gab:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
aW:function(){if(new H.al(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new BuiltList<int>"'))}},aL:{"^":"d;eU:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.d4(z,null,this.$ti)
y.aW()
this.a=z
this.b=y
z=y}return z},
p:function(a){if(H.aG(a,"$isd4",this.$ti,null)){this.a=a.geU()
this.b=a}else{this.a=P.U(a,!0,H.l(this,0))
this.b=null}},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z
if(c==null)H.h(P.E("null element"))
z=this.gf0()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
n:function(a,b){var z
if(b==null)H.h(P.E("null element"))
z=this.gf0();(z&&C.a).n(z,b)},
aR:function(a,b){var z=this.a
z.toString
z=new H.ah(z,b,[H.l(z,0),null]).bq(0,!0)
this.a=z
this.b=null
this.hC(z)},
gf0:function(){if(this.b!=null){this.a=P.U(this.a,!0,H.l(this,0))
this.b=null}return this.a},
aW:function(){if(new H.al(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new ListBuilder<int>"'))},
hC:function(a){var z,y,x,w
for(z=a.length,y=H.l(this,0),x=0;x<a.length;a.length===z||(0,H.ap)(a),++x){w=a[x]
if(!H.cT(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",ck:{"^":"d;hY:a<,b,c,d,$ti",
a7:function(a){var z=new A.dl(null,null,this.$ti)
z.cb()
z.p(this)
a.$1(z)
return z.q()},
B:function(){return new S.iT(!0,this.a,this.$ti)},
gA:function(a){var z=this.b
if(z==null){z=this.a.gbX()
z=H.bw(z,new A.iE(this),H.v(z,"x",0),null)
z=P.U(z,!1,H.v(z,"x",0))
C.a.ev(z)
z=X.bn(z)
this.b=z}return z},
v:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isck)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbX()
this.c=z}z=z.gY(z)
for(;z.u();){v=z.gF()
if(!J.i(y.h(0,v),x.h(0,v)))return!1}return!0},
k:function(a){return J.f(this.a)},
h:function(a,b){return this.a.h(0,b)},
K:function(a,b){this.a.K(0,b)},
gI:function(a){var z=this.a
return z.gI(z)},
gab:function(a){var z=this.a
return z.gab(z)},
gl:function(a){var z=this.a
return z.gl(z)},
cb:function(){if(new H.al(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.al(H.R(H.l(this,1)),null).v(0,C.n))throw H.c(new P.N('explicit value type required, for example "new BuiltMap<int, int>"'))}},iE:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.h(0,a))
return X.cR(X.aR(X.aR(0,J.j(z)),J.j(y)))}},dl:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.ck(this.a,null,null,null,this.$ti)
z.cb()
this.b=z}return z},
p:function(a){var z
if(H.aG(a,"$isck",this.$ti,null)){this.b=a
this.a=a.ghY()}else if(!!a.$isck){z=P.bU(a.a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.bU(a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gbd(a))))},
h:function(a,b){return this.a.h(0,b)},
m:function(a,b,c){if(c==null)H.h(P.E("null value"))
this.gia().m(0,b,c)},
gia:function(){if(this.b!=null){this.a=P.bU(this.a,H.l(this,0),H.l(this,1))
this.b=null}return this.a},
cb:function(){if(new H.al(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.al(H.R(H.l(this,1)),null).v(0,C.n))throw H.c(new P.N('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",d5:{"^":"d;ic:a<,b,$ti",
a7:function(a){var z=new L.bb(null,null,this.$ti)
z.bi()
z.p(this)
a.$1(z)
return z.q()},
gA:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.U(new H.bt(z,new L.iF(),[H.l(z,0),null]),!1,null)
C.a.ev(z)
z=X.bn(z)
this.b=z}return z},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isd5)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gA(b)
x=this.gA(this)
if(z==null?x!=null:z!==x)return!1
return y.iK(b)},
k:function(a){return J.f(this.a)},
gl:function(a){return this.a.a},
bZ:function(a){return this.a.bZ(a)},
gY:function(a){var z,y
z=this.a
y=new P.am(z,z.r,null,null,[null])
y.c=z.e
return y},
aR:function(a,b){var z=this.a
z.toString
return new H.bt(z,b,[H.l(z,0),null])},
Z:function(a,b){return this.a.Z(0,b)},
K:function(a,b){return this.a.K(0,b)},
br:function(a){return new A.iU(!0,this.a,this.$ti)},
gI:function(a){return this.a.a===0},
gab:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
bi:function(){if(new H.al(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new BuiltSet<int>"'))}},iF:{"^":"a:0;",
$1:function(a){return J.j(a)}},bb:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.d5(this.a,null,this.$ti)
z.bi()
this.b=z}return z},
p:function(a){var z,y,x,w
if(H.aG(a,"$isd5",this.$ti,null)){this.a=a.gic()
this.b=a}else{z=H.l(this,0)
y=P.T(null,null,null,z)
for(x=J.af(a);x.u();){w=x.gF()
if(H.cT(w,z))y.n(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
n:function(a,b){if(b==null)H.h(P.E("null element"))
this.gf1().n(0,b)},
aR:function(a,b){var z=this.a
z.toString
z=P.aW(new H.bt(z,b,[H.l(z,0),null]),null)
this.b=null
this.a=z
this.ie(z)},
gf1:function(){if(this.b!=null){this.a=P.aW(this.a,H.l(this,0))
this.b=null}return this.a},
bi:function(){if(new H.al(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new SetBuilder<int>"'))},
ie:function(a){var z,y,x
for(z=new P.am(a,a.r,null,null,[null]),z.c=a.e,y=H.l(this,0);z.u();){x=z.d
if(!H.cT(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.y(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
X:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",lC:{"^":"lA;ch,cx,an:cy@,aV:db@,bg:dx@,b,c,d,e,f,r,x,y,z,Q,a",
fH:function(){var z=$.$get$cb()
z.m(0,"game",this.cx)
z.m(0,"hitpoints",this.cy)
z.m(0,"stamina",this.db)
z.m(0,"gold",this.dx)},
jg:function(){var z,y,x,w
this.cx=null
this.cy=Z.bC("Health",new N.lF(),"#CCCCCC","Your physical state",100,0,!0,P.aH)
z=P.u
this.db=Z.bC("Stamina",new N.lG(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bC("Gold",new N.lH(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bK()
x=this.cy
w=this.db
y=new O.et(N.b5("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.ak(H.t([],[Y.a3]),0,P.aV()),x,w,z,O.r1(),O.r0(),O.r_(),y,this.ghd(),new P.bE(""),!1,null)
y.hb()
this.cx=y
y.x="endGame"
$.$get$c8().n(0,0)},
ho:function(){var z,y
z=new O.cG([[null,P.aa(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.m(0,"start",z)
z.a="start"
z=new O.cG([new N.lE(this),[null,P.aa(["goto","gameLoop"])]],0,null,!1,!1)
y.m(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cG(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.m(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
t:{
lD:function(){var z,y,x,w
z=Z.bC("Health",new N.q6(),"#CCCCCC","Your physical state",100,0,!0,P.aH)
y=P.u
x=Z.bC("Stamina",new N.q7(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bC("Gold",new N.q8(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.lC("net.filiph.edgehead.0.0.1",null,z,x,y,new O.lI(new H.M(0,null,null,null,null,null,0,[w,O.cG])),null,null,null,P.T(null,null,null,w),!1,null,-9999,null,null,null)
z.ho()
return z}}},q6:{"^":"a:15;",
$1:function(a){var z=J.o(a)
if(z.v(a,0))return"\ud83d\udc80"
if(z.bO(a,0.5))return"\ud83d\ude23"
if(z.aH(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},q7:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},q8:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},lE:{"^":"a:16;a",
$0:function(){var z=0,y=P.ar(),x=this
var $async$$0=P.ao(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:z=2
return P.an(x.a.cx.bc(),$async$$0)
case 2:return P.av(null,y)}})
return P.aw($async$$0,y)}},lF:{"^":"a:15;",
$1:function(a){var z=J.o(a)
if(z.v(a,0))return"\ud83d\udc80"
if(z.bO(a,0.5))return"\ud83d\ude23"
if(z.aH(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},lG:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},lH:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bP:{"^":"d;"},jt:{"^":"d;"},nN:{"^":"bP;a,b",
a7:function(a){var z=new M.dJ(null,!1,0)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bP))return!1
return this.a===b.a&&this.b===b.b},
gA:function(a){return Y.X(Y.k(Y.k(0,C.K.gA(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},dJ:{"^":"jt;c,a,b",
gbD:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
p:function(a){this.c=a},
q:function(){var z,y
z=this.c
if(z==null){this.gbD()
y=this.a
this.gbD()
z=new M.nN(y,this.b)}this.p(z)
return z}}}],["","",,O,{"^":"",
rW:[function(a){var z,y
z=a.gbQ()
y=a.gbJ()
if(typeof y!=="number")return H.y(y)
return z-2*y},"$1","cW",2,0,21],
t1:[function(a){var z,y,x
z=a.gbQ()
y=a.gcz()
if(typeof y!=="number")return H.y(y)
x=a.gbJ()
if(typeof x!=="number")return H.y(x)
return z+y-x},"$1","hk",2,0,21],
et:{"^":"kn;y,z,Q,ch,cx,cy,db,dx,dy,bs:fr<,fx,ew:fy<,an:go<,aV:id<,bg:k1<,a,b,c,d,e,f,r,x",
hb:function(){var z,y,x,w,v,u
z=$.$get$b2()
y=$.$get$cV()
this.cy=R.br(1000,"orc",O.cW(),null,new U.c0(!1,10,!0,z,"sword",C.c),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.br(1001,"goblin",O.cW(),null,new U.c0(!1,10,!0,z,"scimitar",C.c),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.aL(null,null,[Q.w])
y.aW()
y.p([new Q.w("start_of_book","","",null)])
this.dx=new K.bY(y.q(),"preStartBook",new O.jl(),new O.jm(),null,null,"ground")
z=R.br(1,"Filip",null,"preStartBook",new U.c0(!1,10,!0,z,"sword",C.c),null,0,2,1000,!0,2,!0,C.z,1,null)
this.ch=z
y=z.r
z=z.cy
if(typeof y!=="number")return y.cF()
if(typeof z!=="number")return H.y(z)
this.go.sao(y/z)
this.id.sao(this.ch.fy)
this.k1.sao(this.ch.x)
this.cx=R.br(100,"Briana",null,this.dx.b,null,this.ch.y,0,2,0,!1,2,!0,C.W,0,null)
this.dy=F.f1(this.dx,!1)
z=K.bY
x=P.U($.$get$hd(),!0,z)
C.a.al(x,[this.dx,$.$get$e2()])
w=new M.dJ(null,!1,0).q()
y=this.ch
v=this.cx
u=this.dy
v=P.aW([y,v],R.P)
y=P.aY(null,O.ce)
u=new A.at(v,P.T(null,null,null,U.dc),w,y,P.aW(x,z),P.U([u],!0,S.a4),0,null)
this.fr=u
z=new Y.ak(H.t([],[Y.a3]),0,P.aV())
z.b=u.r
this.fx=new B.bx(u,null,z,1,1,!0,!1,!1,0)},
cC:function(){var z=0,y=P.ar(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cC=P.ao(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.giW()
if(v.fE(u)){z=1
break}t=w.fr.ad(w.ch.y)
s=t.gan()
r=t.gfw()
if(typeof s!=="number"){x=s.cF()
z=1
break}if(typeof r!=="number"){x=H.y(r)
z=1
break}w.go.sao(s/r)
w.id.sao(t.gaV())
w.k1.sao(t.gbg())
r=w.y
r.fs("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.G(0,"\n\n",!0)
if(w.fr.jb(w.ch.y))v.G(0,"TO BE CONTINUED.",!0)
else v.G(0,"You died.",!0)
w.f.w+=v.ct()
z=1
break}q=C.a.gE(s)
p=q.de(w.fr)
s=w.fr
o=N.b5("ActorPlanner")
n=new H.M(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.ak(H.t([],[Y.a3]),0,P.aV())
k.b=s.r
j=new G.i3(o,l,new B.bx(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.h(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.f(s)+". Situation: "+H.b(s.giM())))
z=3
return P.an(j.jH(),$async$cC)
case 3:if(n.gI(n)){o.en("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.o(s)
s="PlanConsequence<"+l.gA(s)+", "+l.k(s)+", "+C.r.k(null)
o.by(m+(s+", 1, 0, >")+".")}s=Z.kO(n)
i=new Z.kN(new P.fM(n,[null,null]),s)
if(n.gI(n))$.$get$by().en("Created with no recommendations.")
if(s.length===0){r.di("No recommendation for "+H.b(p.gi()))
r.di(new O.jo(w))
w.fr.ff(q.gj());++w.fr.r
z=1
break}z=p.gJ()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.ap)(s),++h);w.f.w+=v.ct()
C.a.sl(v.a,0)
r.by("planner.generateTable for "+H.b(p.gi()))
j.eo().K(0,new O.jp(w))
v=i.fG(q.gfv(),O.hk())
v.toString
g=P.U(v,!1,H.v(v,"x",0))
v=new O.jq(new O.js())
u=g.length-1
if(u-0<=32)H.ff(g,0,u,v)
else H.fe(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ap)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gV(),new O.jr(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfe()
z=7
return P.an(w.c4(i.jG(s==null?O.hk():s),p,v),$async$cC)
case 7:case 5:v.fE(u)
case 1:return P.av(x,y)}})
return P.aw($async$cC,y)},
c4:function(a,b,c){var z=0,y=P.ar(),x,w=this,v,u,t
var $async$c4=P.ao(function(d,e){if(d===1)return P.au(e,y)
while(true)switch(z){case 0:v=a.cV(b,w.fx,w.fr)
u=P.U(v,!0,H.v(v,"x",0))
z=b.gJ()===!0?3:5
break
case 3:z=6
return P.an(w.cM(a,b,u),$async$c4)
case 6:z=4
break
case 5:t=S.lb(new H.ah(u,new O.ji(),[H.l(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.al(c.a,w.fx.gew().a)
w.fr=w.fx.gbs()
v=w.y
v.by(new O.jj(a,b))
v.a5(new O.jk(w,b))
case 1:return P.av(x,y)}})
return P.aw($async$c4,y)},
cM:function(a,b,c){var z=0,y=P.ar(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cM=P.ao(function(d,e){if(d===1)return P.au(e,y)
while(true)switch(z){case 0:w=a.M(b,x.fr)
z=w===1?2:4
break
case 2:x.fx=C.a.gbR(c)
z=3
break
case 4:z=w===0?5:7
break
case 5:x.fx=C.a.gbR(c)
z=6
break
case 7:v=C.a.gE(J.f(a.gO()).split("."))
u=a.ai(b,x.fr)
t=a.gS()&&b.jc(a.gO())
s="use "+H.b(v)
x.eX()
z=8
return P.an(x.e.$4$rerollEffectDescription$rerollable(w,u,s,t),$async$cM)
case 8:r=e
t=new H.H(c,new O.jf(r),[H.l(c,0)])
x.fx=t.gbR(t)
if(r.gk8()===!0){q=A.dI(x.fx.gbs())
q.a3(b.gj(),new O.jg())
u=x.fx
t=u.gf3()
s=H.t([],[Y.a3])
p=new Y.ak(s,0,P.aV())
C.a.al(s,u.c.a)
s=u.d
o=u.e
n=u.f
m=u.r
l=u.x
u=u.y
p.b=q.r
x.fx=new B.bx(q,t,p,s,o,n,m,l,u)}case 6:case 3:return P.av(null,y)}})
return P.aw($async$cM,y)}},
jl:{"^":"a:9;",
$3:function(a,b,c){return c.G(0,"UNUSED because this is the first choice",!0)}},
jm:{"^":"a:9;",
$3:function(a,b,c){return H.h(new P.F("Room isn't to be revisited"))}},
jo:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ah(z,new O.jn(),[H.l(z,0),null]).cq(0," <- ")}},
jn:{"^":"a:0;",
$1:function(a){return a.gb_()}},
jp:{"^":"a:0;a",
$1:function(a){return this.a.y.by(a)}},
js:{"^":"a:30;",
$1:function(a){if(a instanceof Q.G)return H.b(a.b.gi())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
jq:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.cd(z.$1(a),z.$1(b))}},
jr:{"^":"a:16;a,b,c",
$0:function(){var z=0,y=P.ar(),x=this,w
var $async$$0=P.ao(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.an(w.c4(x.c,x.b,w.fy),$async$$0)
case 2:return P.av(null,y)}})
return P.aw($async$$0,y)}},
ji:{"^":"a:0;",
$1:function(a){return a.gjI()}},
jj:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gi())+" selected "+this.a.gi()}},
jk:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ah(z,new O.jh(),[H.l(z,0),null]).cq(0," <- ")
return"- how "+H.b(this.b.gi())+" got here: "+y}},
jh:{"^":"a:0;",
$1:function(a){return a.gb_()}},
jf:{"^":"a:0;a",
$1:function(a){return a.ge8()===this.a.ge8()}},
jg:{"^":"a:0;",
$1:function(a){var z=a.gaV()
if(typeof z!=="number")return z.aK()
a.saV(z-1)
return a}}}],["","",,Q,{"^":"",
ho:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$ho(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.i1(t.aB(y.a,y),new Q.qE(z))
t=J.af(s.a),r=new H.fN(t,s.b,[H.l(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gW()&&!z.e3(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
hp:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hp(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dg((t.length!==0?C.a.gE(t):null).gbm()).gj_().a,t=new J.bM(t,t.length,0,null,[H.l(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
qE:{"^":"a:0;a",
$1:function(a){return!J.i(a,this.a)&&a.gb9()}},
ag:{"^":"d;",
cV:function(a,b,c){var z=this
return P.aQ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cV(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.M(y,x.gbs())
v=s>0?2:3
break
case 2:r=A.dI(w)
v=4
return B.eV(r,x,z,z.hy(r,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dI(w)
v=7
return B.eV(r,x,z,z.hx(r,y,w,z.gP(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aO()
case 1:return P.aP(t)}}})},
eD:function(a,b,c,d,e,f){var z,y,x,w,v,u
a.x=this
z=a.a.aC(0,new Q.i2(b))
y=new O.ee(null,null,null,null,null,null,null,null,null,null,null)
x=this.gi()
y.ga1().c=x
x=b.gj()
y.ga1().f=x
y.ga1().e=C.O
y.ga1().Q=f
y.ga1().z=e
x=this.gW()
y.ga1().y=x
if(!!this.$isG){x=y.ga1()
w=x.r
if(w==null){w=new L.bb(null,null,[P.u])
w.bi()
w.p(C.h)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.h(P.E("null element"))
x.gf1().n(0,w)}v=new Y.ak(H.t([],[Y.a3]),0,P.aV())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gj()
a.gA(a);(x.length!==0?C.a.gE(x):null).fD(a,v)
this.a=d.$3(z,a,v)
if(a.cP(u)!=null)a.ff(u);++a.r
w=a.ep(u)
if(!(w==null))w.fC(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.de(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.i(w==null?w:w.dj(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
C.a.gE(x).b4(a)
C.a.bb(x)}if(this.a==null)H.h(new P.F("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga1().d=x
x=a.r
y.ga1().x=x
a.d.f7(y.q())
return v},
hy:function(a,b,c,d,e){return this.eD(a,b,c,d,!1,e)},
hx:function(a,b,c,d,e){return this.eD(a,b,c,d,e,!1)}},
i2:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.gj())}},
G:{"^":"ag;bJ:b<",
gX:function(){var z=new Y.ak(H.t([],[Y.a3]),0,P.aV())
z.iu(0,this.ga9(),this.b)
return z.ct()},
ai:function(a,b){var z=new Y.ak(H.t([],[Y.a3]),0,P.aV())
z.iy(0,this.ga8(),this.b,a,!0)
return z.ct()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga9()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gi())+">"}},
cq:{"^":"ag;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
lm:{"^":"d;a,b",
k:function(a){return this.b},
t:{"^":"rC<"}}}],["","",,O,{"^":"",ce:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},ke:{"^":"d;a,b",
k:function(a){return this.b}},nJ:{"^":"ce;a,f5:b<,b_:c<,d,ef:e<,ey:f<,T:r<,fV:x<,y,fW:z<",
a7:function(a){var z=new O.ee(null,null,null,null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.ce))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.i(this.e,b.e))if(J.i(this.f,b.f)){z=this.r
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)))},
k:function(a){return"ActionRecord {accomplices="+J.f(this.a)+",\nactionName="+J.f(this.b)+",\ndescription="+H.b(J.f(this.c))+",\nknownTo="+J.f(this.d)+",\nprotagonist="+H.b(J.f(this.e))+",\nsufferers="+J.f(this.f)+",\ntime="+J.f(this.r)+",\nwasAggressive="+J.f(this.x)+",\nwasFailure="+J.f(this.y)+",\nwasSuccess="+J.f(this.z)+",\n}"}},ee:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q",
gf5:function(){return this.ga1().c},
gb_:function(){return this.ga1().d},
gef:function(){return this.ga1().f},
gey:function(){var z,y
z=this.ga1()
y=z.r
if(y==null){y=new L.bb(null,null,[P.u])
y.bi()
y.p(C.h)
z.r=y
z=y}else z=y
return z},
gT:function(){return this.ga1().x},
gfV:function(){return this.ga1().y},
gfW:function(){return this.ga1().Q},
ga1:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bb(null,null,[H.l(z,0)])
y.bi()
y.p(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bb(null,null,[H.l(z,0)])
y.bi()
y.p(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
if(z==null){y=this.ga1()
x=y.b
if(x==null){x=new L.bb(null,null,[P.u])
x.bi()
x.p(C.h)
y.b=x
y=x}else y=x
y=y.q()
x=this.ga1().c
w=this.ga1().d
v=this.ga1().e
u=this.ga1().f
t=this.ga1()
s=t.r
if(s==null){s=new L.bb(null,null,[P.u])
s.bi()
s.p(C.h)
t.r=s
t=s}else t=s
t=t.q()
s=this.ga1().x
r=this.ga1().y
q=this.ga1().z
p=this.ga1().Q
z=new O.nJ(y,x,w,v,u,t,s,r,q,p)
if(y==null)H.h(P.m("accomplices"))
if(x==null)H.h(P.m("actionName"))
if(w==null)H.h(P.m("description"))
if(v==null)H.h(P.m("knownTo"))
if(u==null)H.h(P.m("protagonist"))
if(t==null)H.h(P.m("sufferers"))
if(s==null)H.h(P.m("time"))
if(r==null)H.h(P.m("wasAggressive"))
if(q==null)H.h(P.m("wasFailure"))
if(p==null)H.h(P.m("wasSuccess"))}this.p(z)
return z}}}],["","",,R,{"^":"",
hq:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hq(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.c4(new H.H(u,new R.qF(z),[H.l(u,0)]))
case 3:return P.aO()
case 1:return P.aP(v)}}})},
br:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.ef(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.q1(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.q()},
qF:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfk()
y=this.a.gj()
return z==null?y==null:z===y}},
P:{"^":"kr;",
gbp:function(){var z=this.r
if(typeof z!=="number")return z.bC()
return z>0},
gb2:function(){return this.dy===C.j},
gac:function(){return this.dy===C.l},
gah:function(){return this.dy===C.k},
jc:function(a){var z=this.fy
if(typeof z!=="number")return z.bA()
return z>=1},
e3:function(a,b){return this.fq(a,b)>0},
fq:function(a,b){var z,y
if(this.e7(b)){z=a.gbe()
y=this.go.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hU(a,b,10))return 1
z=a.gbe()
y=this.go.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
e7:function(a){var z,y
z=a.c1("Confuse",this,!0)
if(z==null)return!1
y=a.jV("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cI:function(a){var z,y,x
z=a.ad(this.y)
y=z.gan()
if(typeof y!=="number")return H.y(y)
x=2*y
if(!z.gbp())x-=10
y=a.a
return new A.cf(x,new H.H(y,new R.iy(this),[H.l(y,0)]).b1(0,0,new R.iz()),y.b1(0,0,new R.iA(this,a)))},
aA:function(a){var z=this.e
return z!=null&&z.a===a},
hU:function(a,b,c){var z=b.jW(a,this,!0)
if(z==null)return!1
return z<=c},
$isbu:1},
kr:{"^":"d+d8;"},
q1:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gC().z=this.a
a.gC().dx=this.b
a.gC().dy=this.d
a.gC().fx=this.e
a.gC().f=this.f
a.gC().b=!0
a.gC().c=[]
a.gC().fr=C.k
a.gC().x=this.r
a.gC().db=this.x
a.gC().y=this.Q
a.gC().go=this.y
a.gC().Q=this.z
a.gC().ch=!0
a.gC().cx=this.c
z=P.T(null,null,null,null)
a.gC().cy=z
z=this.cy
if(z!=null){y=new L.be(null,null)
y.p(z)
z=y}else{z=$.$get$hD()
z.toString
y=new L.be(null,null)
y.p(z)
z=y}a.gC().id=z
a.gC().e=this.ch
a.gC().r=this.cx
a.gC().d=this.db
return a}},
iy:{"^":"a:0;a",
$1:function(a){return J.i(a.gbe(),this.a.go)}},
iz:{"^":"a:37;",
$2:function(a,b){var z,y
z=J.a0(a,b.gb9()?2:0)
y=b.gan()
if(typeof y!=="number")return H.y(y)
return J.a0(z,2*y)}},
iA:{"^":"a:39;a,b",
$2:function(a,b){var z,y
z=b.gb9()?1:0
y=b.gan()
if(typeof y!=="number")return H.y(y)
return J.a0(a,(z+y)*this.a.fq(b,this.b))}},
du:{"^":"d;a,b",
k:function(a){return this.b}},
nK:{"^":"P;a,b,fe:c<,bm:d<,a6:e<,fk:f<,an:r<,bg:x<,j:y<,z,e5:Q<,J:ch<,cx,fw:cy<,i:db<,d1:dx<,aj:dy<,H:fr<,fx,aV:fy<,be:go<",
a7:function(a){var z=new R.ef(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.P))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
if(z==null?y==null:z===y){z=this.cx
y=b.cx
if(z==null?y==null:z===y){z=this.cy
y=b.cy
if(z==null?y==null:z===y){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fy
y=b.fy
z=(z==null?y==null:z===y)&&J.i(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),C.r.gA(this.fx)),J.j(this.fy)),J.j(this.go)))},
k:function(a){return"Actor {alreadyMentioned="+J.f(this.a)+",\ncategories="+J.f(this.b)+",\ncombineFunction="+J.f(this.c)+",\ncurrentRoomName="+J.f(this.d)+",\ncurrentWeapon="+J.f(this.e)+",\nfollowingActorId="+J.f(this.f)+",\nhitpoints="+J.f(this.r)+",\ngold="+J.f(this.x)+",\nid="+J.f(this.y)+",\ninitiative="+J.f(this.z)+",\nisActive="+J.f(this.Q)+",\nisPlayer="+J.f(this.ch)+",\nitems="+J.f(this.cx)+",\nmaxHitpoints="+J.f(this.cy)+",\nname="+J.f(this.db)+",\nnameIsProperNoun="+J.f(this.dx)+",\npose="+J.f(this.dy)+",\npronoun="+J.f(this.fr)+",\nshield="+C.r.k(this.fx)+",\nstamina="+J.f(this.fy)+",\nteam="+J.f(this.go)+",\n}"}},
ef:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gfe:function(){return this.gC().d},
gbm:function(){return this.gC().e},
sbm:function(a){this.gC().e=a
return a},
ga6:function(){return this.gC().f},
gfk:function(){return this.gC().r},
gan:function(){return this.gC().x},
san:function(a){this.gC().x=a
return a},
gbg:function(){return this.gC().y},
sbg:function(a){this.gC().y=a
return a},
gj:function(){return this.gC().z},
gJ:function(){return this.gC().cx},
gfw:function(){return this.gC().db},
gi:function(){return this.gC().dx},
si:function(a){this.gC().dx=a
return a},
gd1:function(){return this.gC().dy},
gaj:function(){return this.gC().fr},
saj:function(a){this.gC().fr=a
return a},
gH:function(){return this.gC().fx},
gaV:function(){return this.gC().go},
saV:function(a){this.gC().go=a
return a},
gbe:function(){var z,y
z=this.gC()
y=z.id
if(y==null){y=new L.be(null,null)
z.id=y
z=y}else z=y
return z},
gC:function(){var z,y
z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
this.x=z.r
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.cy=z.cx
this.db=z.cy
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
this.go=z.fy
z=z.go
if(!(z==null)){y=new L.be(null,null)
y.p(z)
z=y}this.id=z
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gC().b
x=this.gC().c
w=this.gC().d
v=this.gC().e
u=this.gC().f
t=this.gC().r
s=this.gC().x
r=this.gC().y
q=this.gC().z
p=this.gC().Q
o=this.gC().ch
n=this.gC().cx
m=this.gC().cy
l=this.gC().db
k=this.gC().dx
j=this.gC().dy
i=this.gC().fr
h=this.gC().fx
g=this.gC().fy
f=this.gC().go
e=this.gC()
d=e.id
if(d==null){d=new L.be(null,null)
e.id=d
e=d}else e=d
z=new R.nK(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.q())
if(y==null)H.h(P.m("alreadyMentioned"))
if(x==null)H.h(P.m("categories"))
if(s==null)H.h(P.m("hitpoints"))
if(r==null)H.h(P.m("gold"))
if(q==null)H.h(P.m("id"))
if(p==null)H.h(P.m("initiative"))
if(o==null)H.h(P.m("isActive"))
if(n==null)H.h(P.m("isPlayer"))
if(m==null)H.h(P.m("items"))
if(l==null)H.h(P.m("maxHitpoints"))
if(k==null)H.h(P.m("name"))
if(j==null)H.h(P.m("nameIsProperNoun"))
if(i==null)H.h(P.m("pose"))
if(h==null)H.h(P.m("pronoun"))
if(f==null)H.h(P.m("stamina"))}this.p(z)
return z}}}],["","",,A,{"^":"",cf:{"^":"d;bQ:a<,cz:b<,bJ:c<",
aK:function(a,b){return new A.a8(this.a-b.gbQ(),J.aB(this.b,b.gcz()),J.aB(this.c,b.gbJ()))},
k:function(a){return"ActorScore<self="+C.i.cA(this.a,2)+",team="+J.bq(this.b,2)+",enemy="+J.bq(this.c,2)+">"}},a8:{"^":"d;bQ:a<,cz:b<,bJ:c<",
gjr:function(){return this.a===-1/0&&J.i(this.b,-1/0)&&J.i(this.c,-1/0)},
bP:function(a,b){return new A.a8(this.a*b,J.bp(this.b,b),J.bp(this.c,b))},
a4:function(a,b){return new A.a8(this.a+b.gbQ(),J.a0(this.b,b.gcz()),J.a0(this.c,b.gbJ()))},
cF:function(a,b){if(typeof b!=="number")return H.y(b)
return new A.a8(this.a/b,J.bo(this.b,b),J.bo(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.i.cA(this.a,2)+",team="+J.bq(this.b,2)+",enemy="+J.bq(this.c,2)+">"},
t:{
ix:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ap)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.y(r)
w+=r
r=s.c
if(typeof r!=="number")return H.y(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.a8(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
rg:function(a){switch(a){case C.H:return"spear"
case C.I:return"branch"
case C.J:return"tent"
case C.c:return"sword"
default:throw H.c(P.E(a))}},
dc:{"^":"ks;em:a<",
gb_:function(){return U.rg(this.a)},
$isbu:1},
ks:{"^":"d+d8;"},
cs:{"^":"d;a,b",
k:function(a){return this.b}},
c0:{"^":"dc;b,c,e5:d<,be:e<,i:f<,a",
gj:function(){return H.as(this)},
gbp:function(){return!1},
gJ:function(){return!1},
gd1:function(){return!1},
gH:function(){return C.p}}}],["","",,G,{"^":"",kn:{"^":"d;",
eX:function(){var z,y
z=this.f
y=z.w
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.w=""}},
kk:[function(a){this.f.w+=a},"$1","giW",2,0,17],
bc:function(){var z=0,y=P.ar(),x,w=this,v,u
var $async$bc=P.ao(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.F("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.w.length===0)){z=4
break}z=5
return P.an(w.cC(),$async$bc)
case 5:z=3
break
case 4:w.eX()
case 1:return P.av(x,y)}})
return P.aw($async$bc,y)}}}],["","",,B,{"^":"",ep:{"^":"d;cH:a<,cZ:b<,cr:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.i.cA(this.b,3)+", score="+this.a.k(0)+">"}},bx:{"^":"d;bs:a<,f3:b<,ew:c<,jI:d<,cZ:e<,f,r,e8:x<,cr:y<",
gA:function(a){return X.bn([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
v:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbx&&this.gA(this)===z.gA(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gA(z)+", "+y.k(z)+", "+J.f(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
t:{
eV:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gcZ()
z=z?0:b.gcr()+1
d.b=a.r
return new B.bx(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",i3:{"^":"d;a,b,c,d,e,f",
iI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.a
z.a5("...")
z.a5("combining scores")
y=H.t([],[A.a8])
x=new G.iq()
for(w=J.af(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gF()
z.a5(new G.io(r))
if(r.gcZ()>0.15)if(s==null){z.a5("    - first _bestCase")
s=r}else if(J.a1(x.$1(r.gcH()),x.$1(s.gcH()))){z.a5("    - new _bestCase")
s=r}q=r.gcH()
p=J.aB(q.b,u)
o=J.aB(q.c,t)
n=r.b
m=new A.a8((q.a-v)*n,J.bp(p,n),J.bp(o,n))
z.a5(new G.ip(m))
y.push(m)}l=A.ix(y)
w=s==null
if(w)k=C.B
else{q=s.gcH()
k=new A.a8(q.a-v,J.aB(q.b,u),J.aB(q.c,t))}w=w?s:s.gcr()
if(typeof w!=="number")return H.y(w)
j=new A.a8(k.a/w,J.bo(k.b,w),J.bo(k.c,w))
z.a5("- uplifts average = "+("ActorScoreChange<self="+C.i.cA(l.a,2)+",team="+J.bq(l.b,2)+",enemy="+J.bq(l.c,2)+">"))
z.a5("- best = "+j.k(0))
i=j.a4(0,l)
z.a5("- result = "+i.k(0))
return i},
eo:function(){var z=this
return P.aQ(function(){var y=0,x=1,w,v,u,t,s
return function $async$eo(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbX(),u=u.gY(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aO()
case 1:return P.aP(w)}}})},
d2:function(a,b,c){var z=0,y=P.ar(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$d2=P.ao(function(d,e){if(d===1)return P.au(e,y)
while(true)switch(z){case 0:w=x.f
w.aQ(0)
v=x.c
u=v.a
t=u.a.aC(0,new G.ir(x))
s=t.cI(u)
r=x.a
r.by("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.aZ(x.dE(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gF()
r.b0(new G.is(t,o))
if(o.L(t,u)!==!0){r.b0(new G.it(o))
z=2
break}z=4
return P.an(x.c8(v,o,b,a,c).c2(0),$async$d2)
case 4:n=e
if(J.ec(n)===!0){r.b0(new G.iu(o))
w.m(0,o,C.C)
z=2
break}r.b0(new G.iv(s,o,n))
m=x.iI(n,s,b)
w.m(0,o,m)
r.b0(new G.iw(o,m))
z=2
break
case 3:x.e=!0
return P.av(null,y)}})
return P.aw($async$d2,y)},
jH:function(){return this.d2(50,10,null)},
dE:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p
return function $async$dE(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.c4((u.length!==0?C.a.gE(u):null).gbj())
case 2:u=(u.length!==0?C.a.gE(u):null).gaZ()
t=u.length
s={func:1,ret:Q.cq,args:[Q.w]}
r={func:1,ret:Q.G,args:[R.P]}
q=0
case 3:if(!(q<u.length)){x=5
break}p=u[q]
x=H.ay(p,r)?6:8
break
case 6:x=9
return P.c4(Q.ho(z,y,p))
case 9:x=7
break
case 8:x=H.ay(p,s)?10:12
break
case 10:x=13
return P.c4(Q.hp(z,y,p))
case 13:x=11
break
case 12:throw H.c(new P.F(p.k(0)+" is not one of the supported ones"))
case 11:case 7:case 4:u.length===t||(0,H.ap)(u),++q
x=3
break
case 5:return P.aO()
case 1:return P.aP(v)}}})},
c8:function(a5,a6,a7,a8,a9){var $async$c8=P.ao(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aC(0,new G.i6(t))
p=t.a
p.b0("=====")
p.b0(new G.i7(a6,q))
p.b0(new G.i8(a6))
if(a6.L(q,r)!==!0){p.b0("- firstAction not applicable")
z=1
break}o=q.cI(r)
p.b0(new G.ie(a5,o))
p.b0(new G.ig(a5))
n=P.aY(null,B.bx)
m=P.T(null,null,null,A.at)
l=J.o(r)
k=l.gA(r)
for(j=new P.aZ(a6.cV(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gF()
if(l.gA(r)!==k)throw H.c(new P.F("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.aq(h)}s.a=0
r=t.b
case 3:if(!!n.gI(n)){z=4
break}++s.a
g=n.d4()
p.a5("----")
p.a5(new G.ih(g))
p.a5(new G.ii(g))
if(g.gcr()>a7||s.a>a8){p.a5(new G.ij(s,a7,g))
p.a5(new G.ik(g))
z=4
break}z=g.gbs().f.length===0?5:6
break
case 5:p.a5("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bn(0,new G.il(t),new G.im())
if(q==null){p.a5("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.ep(q.cI(l),g.e,g.y)
p.a5(new G.i9(f))
z=7
x=[1]
return P.cP(P.fU(f),$async$c8,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gE(j):null).de(l)
j=l.a
i=new H.H(j,new G.ia(t),[H.l(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.F("World has several duplicates of mainActor: "+J.f(l)))
else if(d===0){p.fs("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aC(0,new G.ib(t))
c=J.i(e,q)
p.a5("- actor: "+H.b(e.gi())+" (isMain=="+c+")")
j=q==null
p.a5("- mainActor: "+H.b(j?q:q.gi()))
b=j?q:q.cI(l)
if(b==null)b=C.D
f=new B.ep(b,g.e,g.y)
p.a5(new G.ic(o,f))
p.a5(new G.id(g))
z=8
x=[1]
return P.cP(P.fU(f),$async$c8,y)
case 8:p.a5("- generating all actions for "+H.b(e.gi()))
j=n.c
i=n.b
a=n.a
for(a0=new P.aZ(t.dE(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.L(e,l)!==!0)continue
for(a1=new P.aZ(a2.cV(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(a4.gcZ()<0.05)continue
if(m.Z(0,a4.gbs()))continue
n.aq(a4)}}p.a5("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.n(0,l)
z=3
break
case 4:case 1:return P.cP(null,0,y)
case 2:return P.cP(v,1,y)}})
var z=0,y=P.o8($async$c8),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.pt(y)}},iq:{"^":"a:43;",
$1:function(a){return J.aB(a.b,a.c)}},io:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},ip:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},ir:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},is:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.db)}},it:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},iu:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},iv:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aC(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},iw:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},i6:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},i7:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gi())}},i8:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},ie:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},ig:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bP(" ",z.y)+"- "+J.f(z.b)}},ih:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gf3().gX()+"'"}},ii:{"^":"a:1;a",
$0:function(){var z=this.a.gbs().f
return"- situation: "+H.b(J.hU(z.length!==0?C.a.gE(z):null))}},ij:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcr()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},ik:{"^":"a:1;a",
$0:function(){var z=this.a.gbs().d
return"- how we got here: "+new H.ah(z,new G.i5(),[H.l(z,0),null]).cq(0," <- ")}},i5:{"^":"a:0;",
$1:function(a){return a.gb_()}},il:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},im:{"^":"a:1;",
$0:function(){return}},i9:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},ia:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},ib:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a.b)}},ic:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},id:{"^":"a:1;a",
$0:function(){var z=this.a.gbs().d
return"- how we got here: "+new H.ah(z,new G.i4(),[H.l(z,0),null]).cq(0," <- ")}},i4:{"^":"a:0;",
$1:function(a){return a.gb_()}}}],["","",,Z,{"^":"",kN:{"^":"d;a,b",
gbj:function(){return this.b},
gI:function(a){return this.b.length===0},
fG:function(a,b){var z=this
return P.aQ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fG(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.c4(t)
case 5:w=1
break
case 4:s=z.hO(new Z.kQ())
r=z.dD(new Z.kR(),[s])
q=z.dD(new Z.kS(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$by().by("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$by().by("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$by().by("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cK(t,new Z.kT(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.v(m,s)){w=17
break}if(l.v(m,r)){w=17
break}if(l.v(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ap)(t),++n
w=16
break
case 18:case 1:return P.aO()
case 2:return P.aP(u)}}})},
jG:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbR(y)
C.a.cK(y,new Z.kU(this,a))
x=this.a.a
w=x.gc3().b1(0,1/0,new Z.kV(a))
v=x.gc3().b1(0,-1/0,new Z.kW(a))
x=J.ae(v)
u=J.ae(w)
t=u.aK(w,J.bp(x.aK(v,w),0.1))
z.a=t
if(u.v(w,v)){t=J.aB(t,1)
z.a=t
u=t}else u=t
s=x.aK(v,u)
r=P.kl(y.length,new Z.kX(z,this,a,s),!1,P.K)
q=new H.ah(r,new Z.kY(C.a.b1(r,0,Z.hC())),[H.l(r,0),null]).bq(0,!1)
z=C.a.b1(q,0,Z.hC())
if(typeof z!=="number")return H.y(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.a0(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.lc(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dD:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ap)(z),++u){t=z[u]
if(C.a.Z(b,t))continue
if(w==null||J.a1(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hO:function(a){return this.dD(a,C.h)},
t:{
kO:function(a){var z,y,x
z=a.gbX()
y=H.v(z,"x",0)
x=P.U(new H.H(z,new Z.kP(a),[y]),!1,y)
if(x.length===0)$.$get$by().en("After removing actions scored by undefined, there are no recommendations.")
return x},
rA:[function(a,b){return J.a0(a,b)},"$2","hC",4,0,42]}},kQ:{"^":"a:0;",
$1:function(a){return a.gbQ()}},kR:{"^":"a:0;",
$1:function(a){return J.hQ(a.gbJ())}},kS:{"^":"a:0;",
$1:function(a){return a.gcz()}},kT:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.cd(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},kU:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.cd(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},kV:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.cS(a),H.cS(z))}},kW:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.cS(a),H.cS(z))}},kX:{"^":"a:8;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.bo(J.aB(this.c.$1(z.a.a.h(0,y[a])),this.a.a),this.d)}},kY:{"^":"a:0;a",
$1:function(a){return J.hY(J.bp(J.bo(a,this.a),1000))}},kP:{"^":"a:0;a",
$1:function(a){return!this.a.h(0,a).gjr()}}}],["","",,K,{"^":"",pE:{"^":"a:9;",
$3:function(a,b,c){}},bY:{"^":"d;a,i:b<,c,d,jB:e<,f,bB:r<",
gj_:function(){return this.a},
gA:function(a){return C.b.gA(this.b)},
v:function(a,b){if(b==null)return!1
return b instanceof K.bY&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jC:function(a){return this.e.$1(a)},
t:{
a2:function(a,b,c,d,e,f,g){var z=new S.aL(null,null,[Q.w])
z.aW()
z.p(f)
return new K.bY(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;iV:a<,X:b<,b_:c<,jm:d<"}}],["","",,S,{"^":"",a4:{"^":"d;",
gaZ:function(){return C.h},
gbj:function(){return C.h},
gfv:function(){return 3},
de:function(a){return this.at(this.gT(),a)},
fC:function(a,b){},
fD:function(a,b){},
b4:function(a){},
dj:function(a){return!0}}}],["","",,S,{"^":"",
eZ:function(a){var z=$.$get$b8().aa(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
lb:function(a,b){var z,y,x,w,v
z=$.$get$b8().fA()*b
for(y=new H.dj(a,a.gl(a),0,null,[H.v(a,"aM",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.y(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
lc:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b8().aa(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ap)(a),++v){t=a[v]
if(typeof t!=="number")return H.y(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
cB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bo(a,"{")
if(z!==-1&&z<a.length-1){y=H.t([],[P.u])
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
if(q>1){p=$.$get$b8().aa(q)
o=C.b.aE(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cB(C.b.aE(a,m+1,y[l]))
if(typeof x!=="number")return x.a4()
l+=C.b.aE(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cB(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a4()
v=u+1
return C.b.aE(a,0,v)+S.cB(C.b.bt(a,v))}}else return a},
b9:function(a,b,c,d){switch($.$get$b8().aa(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
ld:function(a){if(a<0||a>1)throw H.c(P.V(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b8().fA()<a}}],["","",,Y,{"^":"",a3:{"^":"d;aJ:a<,aD:b<,ay:c<,fF:d<,e,cW:f@,fI:r<,fz:x<,ex:y<,iZ:z<,hf:Q<,cE:ch<,cx,jq:cy<,T:db<",
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
default:throw H.c(P.E("Invalid key "+H.b(b)+"."))}}},ak:{"^":"d;a,T:b<,c",
ge2:function(){return C.a.bV(this.a,new Y.mz())},
bk:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.i(b,""))return
z=(J.bm(b).e0(b,".")||C.b.e0(b,"!")||C.b.e0(b,"?"))&&C.b.dm(b,P.ba("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a3(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
n:function(a,b){return this.bk(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
G:function(a,b,c){return this.bk(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
iu:function(a,b,c){return this.bk(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
a0:function(a,b,c,d,e,f,g,h,i,j){return this.bk(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
ix:function(a,b,c,d,e){return this.bk(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
iw:function(a,b,c,d){return this.bk(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
f6:function(a,b,c,d){return this.bk(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
iv:function(a,b,c,d){return this.bk(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
iy:function(a,b,c,d,e){return this.bk(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iC:function(){return this.G(0,"\n\n",!0)},
bU:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bo(a,"<owner's> "+b)!==-1||C.b.bo(a,"<ownerPronoun's> "+b)!==-1||C.b.bo(a,"<object-owner's> "+b)!==-1||C.b.bo(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(c.gd1()!==!0){z=this.c
y=z.h(0,c.gj())
if((y==null?-1:y)<e)x=C.b.d5(a,b,"the "+b)
else{x=J.d0(c.gi(),P.ba("[aeiouy]",!1,!1))?C.b.d5(a,b,"an "+b):C.b.d5(a,b,"a "+b)
z.m(0,c.gj(),e)}}else x=null
return x==null?a:x},
e1:function(a,b){var z,y
if(!this.az(a)||!this.az(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaD()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaD()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gay()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gay()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaD().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.i(y,z[b].gay().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gay().gj()
if(b>=z.length)return H.e(z,b)
z=J.i(y,z[b].gaD().gj())}else z=!1
return z},
dd:function(a){var z=this
return P.aQ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dd(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.az(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaD()!=null?3:4
break
case 3:x=5
return t.gaD()
case 5:case 4:x=t.gay()!=null?6:7
break
case 6:x=8
return t.gay()
case 8:case 7:x=t.gfF()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aO()
case 2:return P.aP(v)}}})},
aF:[function(a){var z=J.ae(a)
if(z.aH(a,0)||z.bA(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gay()}},"$1","gay",2,0,18],
jE:function(a,b){var z
if(!this.az(a)||!this.az(b))return!1
if(this.e1(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gex()}return!1},
fE:function(a){var z
for(z=!1;this.ge2();z=!0){a.$1(this.fJ(!0))
this.jM()}return z},
fJ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.b1(z,[],new Y.mA())
C.a.i8(z,new Y.mB(y),!1)
x=a&&this.ge2()?C.a.bo(z,C.a.fj(z,new Y.mC()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.e1(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gcW())n=this.jE(s,p)&&this.he(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcW()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scW(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghf()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].giZ()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcE())if(this.cT(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcW()}else n=!1
n=n||this.jX(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcE()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcE()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.eZ([" but "," but ",", but "])
u=!this.h1(s,s+1)&&!0}else{r+=S.eZ([" and "," and ",", and "])
u=!0}}m=this.dq(s)
p=!v
if(p){n=s-1
if(this.cT(s,n))if(J.d0(this.dq(n),"<subject> "))if(J.d0(m,"<subject> "))m=H.bL(m,"<subject> ","",0)}l=J.hX(m,"<action>",this.dq(s))
n=s-1
k=this.ib(s,n)
if(k)k=!(this.aF(s).gH()===C.p&&this.ae(s).gH()===C.p)
else k=!1
if(k){k=this.aF(s).gH().b
l=H.p(l,"<object-owner's> <object>",k)
k=this.aF(s).gH().b
l=H.p(l,"<object-ownerPronoun's> <object>",k)
k=this.aF(s).gH().b
l=H.p(l,"<object>",k)
k=this.aF(s).gH().c
l=H.p(l,"<object's>",k)}k=this.cT(s,n)
if(k){k=this.ae(s).gH().a
l=H.p(l,"<owner's> <subject>",k)
k=this.ae(s).gH().a
l=H.p(l,"<ownerPronoun's> <subject>",k)
k=this.ae(s).gH().a
l=H.p(l,"<subject>",k)
k=this.ae(s).gH().c
l=H.p(l,"<subject's>",k)}if(this.aF(n)!=null)if(this.ae(s)!=null)if(this.ae(n)!=null){k=this.aF(n)
k=k==null?k:k.gj()
j=this.ae(s)
if(J.i(k,j==null?j:j.gj())){k=this.ae(n)
k=k==null?k:k.gH()
j=this.ae(s)
k=!J.i(k,j==null?j:j.gH())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.ae(s).gH().a
l=H.p(l,"<owner's> <subject>",k)
k=this.ae(s).gH().a
l=H.p(l,"<ownerPronoun's> <subject>",k)
k=this.ae(s).gH().a
l=H.p(l,"<subject>",k)
k=this.ae(s).gH().c
l=H.p(l,"<subject's>",k)}if(this.ae(n)!=null)if(this.aF(s)!=null){k=this.ae(n)
k=k==null?k:k.gj()
j=this.aF(s)
if(J.i(k,j==null?j:j.gj())){n=this.ae(n)
n=n==null?n:n.gH()
k=this.ae(s)
n=!J.i(n,k==null?k:k.gH())}else n=!1}else n=!1
else n=!1
if(n){n=this.aF(s).gH().a
l=H.p(l,"<object-owner's> <object>",n)
n=this.aF(s).gH().a
l=H.p(l,"<object-ownerPronoun's> <object>",n)
n=this.aF(s).gH().b
l=H.p(l,"<object>",n)
n=this.aF(s).gH().c
l=H.p(l,"<object's>",n)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaD()
h=n.gay()
g=n.gfF()
f=n.e
e=S.cB(l)
if(C.b.Z(e,"{")||C.b.Z(e,"}"))$.$get$hw().di('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gJ()===!0){e=H.p(e,"<subject>","you")
e=H.p(e,"<subject's>","your")}if(i.gH()===C.z||i.gH()===C.X){e=H.p(e,"<s>","")
e=H.p(e,"<es>","")
e=H.p(e,"<ies>","y")
e=H.p(e,"<does>","do")
e=H.p(e,"<is>","are")
e=H.p(e,"<has>","have")}else{e=H.p(e,"<s>","s")
e=H.p(e,"<es>","es")
e=H.p(e,"<ies>","ies")
e=H.p(e,"<does>","does")
e=H.p(e,"<is>","is")
e=H.p(e,"<has>","has")}e=H.bL(e,"<subject>","<subjectNoun>",0)
k=i.gH().a
e=H.p(e,"<subject>",k)
k=n.db
e=this.bU(e,"<subjectNoun>",i,g,k)
j=i.gi()
if(typeof j!=="string")H.h(H.O(j))
e=H.bL(e,"<subjectNoun>",j,0)
j=i.gH().a
e=H.p(e,"<subjectPronoun>",j)
if(C.b.Z(l,P.ba("<subject>.+<subject's>",!0,!1))){j=i.gH().c
e=H.p(e,"<subject's>",j)}e=this.bU(e,"<subject's>",i,g,k)
k=H.b(i.gi())+"'s"
e=H.bL(e,"<subject's>",k,0)
k=i.gH().c
e=H.p(e,"<subject's>",k)
k=i.gH().c
e=H.p(e,"<subjectPronoun's>",k)
k=i.gH().d
e=H.p(e,"<subjectPronounSelf>",k)}if(h!=null){if(h.gJ()===!0){e=H.p(e,"<object>","you")
e=H.p(e,"<object's>","your")}else{e=this.bU(e,"<object>",h,f,n.db)
k=h.gi()
if(typeof k!=="string")H.h(H.O(k))
e=H.p(e,"<object>",k)}k=h.gH().b
e=H.p(e,"<objectPronoun>",k)
if(C.b.Z(l,P.ba("<object>.+<object's>",!0,!1))){k=h.gH().c
e=H.p(e,"<object's>",k)}e=this.bU(e,"<object's>",h,f,n.db)
k=H.b(h.gi())+"'s"
e=H.bL(e,"<object's>",k,0)
k=h.gH().c
e=H.p(e,"<object's>",k)
k=h.gH().c
e=H.p(e,"<objectPronoun's>",k)}n=n.db
l=this.eY(f,this.eY(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.my(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcE())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcE()?r+".":r
return H.rb(z.charCodeAt(0)==0?z:z,$.$get$fm(),new Y.mD(),null)},
ct:function(){return this.fJ(!1)},
jM:function(){var z,y
if(!this.ge2()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.bo(z,C.a.fj(z,new Y.mE()))+1
P.cC(0,y,z.length,null,null,null)
z.splice(0,y-0)},
h1:function(a,b){var z,y
if(!this.az(a)||!this.az(b))return!1
if(this.e1(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gex()}if(!this.cT(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfI()){if(b>=z.length)return H.e(z,b)
y=z[b].gfI()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfz()){if(b>=z.length)return H.e(z,b)
z=z[b].gfz()}else z=!1
if(z)return!0
else return!1},
he:function(a,b){var z,y,x,w,v
if(!this.az(a)||!this.az(b))return!1
for(z=new P.aZ(this.dd(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.aZ(this.dd(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gF()
if(J.i(x.gj(),v.gj()))return!0}}return!1},
dq:[function(a){var z=J.ae(a)
if(z.aH(a,0)||z.bA(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaJ()}},"$1","gaJ",2,0,10],
ae:[function(a){var z=J.ae(a)
if(z.aH(a,0)||z.bA(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaD()}},"$1","gaD",2,0,18],
jX:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gT()!=null){y=a-1
if(this.az(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gT()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gT()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gT()
if(typeof y!=="number")return y.aK()
if(typeof x!=="number")return H.y(x)
return y-x}},
k:function(a){return this.ct()},
az:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eY:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gJ()===!0)z=H.p(H.p(b,d,"you"),e,"your")
else{z=this.bU(b,d,a,null,h)
y=a.gi()
H.bl(y)
z=H.p(z,d,y)}z=H.p(z,f,a.gH().a)
z=H.p(H.p(C.b.d5(this.bU(C.b.Z(c,P.ba(d+".+"+e,!0,!1))?H.p(z,e,a.gH().c):z,e,a,null,h),e,H.b(a.gi())+"'s"),e,a.gH().c),g,a.gH().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
ib:function(a,b){var z,y
if(!this.az(a)||!this.az(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gay()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gay()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gay().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gay().gj())},
cT:function(a,b){var z,y
if(!this.az(a)||!this.az(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaD()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaD()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaD().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gaD().gj())},
t:{
my:function(a){var z,y,x
z=!C.b.Z(a,"\n\n")?C.b.k0(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bt(z,1)}}},mz:{"^":"a:0;",
$1:function(a){return J.i(a.gaJ(),"\n\n")}},mA:{"^":"a:46;",
$2:function(a,b){var z,y
z=J.J(a)
y=z.gab(a)?z.gE(a):null
if(y!=null)y.gjq()
z.n(a,b)
return a}},mB:{"^":"a:24;a",
$1:function(a){return J.hR(this.a,a)}},mC:{"^":"a:0;",
$1:function(a){return J.i(a.gaJ(),"\n\n")}},mD:{"^":"a:25;",
$1:function(a){return H.b(a.h(0,1))+H.b(a.h(0,2))+H.b(a.h(0,3))}},mE:{"^":"a:0;",
$1:function(a){return J.i(a.gaJ(),"\n\n")}},bu:{"^":"kt;d1:a<,i:b<,c,be:d<,J:e<,H:f<",
gj:function(){return H.as(this)},
ge5:function(){return!0},
gbp:function(){return!0},
t:{
d7:function(a,b,c,d,e){var z=H.t([],[P.q])
return new Y.bu(c,b,z,e==null?$.$get$b2():e,!1,d)}}},kt:{"^":"d+d8;"},d8:{"^":"d;",
gb9:function(){return this.gbp()&&this.ge5()===!0},
aU:function(a,b,c,d,e,f,g,h,i){a.a0(0,b,c,d,e,f,g,h,H.a_(this,"$isbu"),!1)},
ak:function(a,b){return this.aU(a,b,!1,!1,!1,null,null,!1,!1)},
aT:function(a,b,c,d){return this.aU(a,b,!1,!1,!1,c,null,d,!1)},
aG:function(a,b,c){return this.aU(a,b,!1,!1,!1,c,null,!1,!1)},
cu:function(a,b,c){return this.aU(a,b,!1,!1,!1,null,null,c,!1)},
cv:function(a,b,c,d){return this.aU(a,b,c,!1,!1,d,null,!1,!1)},
eg:function(a,b,c,d){return this.aU(a,b,!1,c,d,null,null,!1,!1)},
bz:function(a,b,c){return this.aU(a,b,!1,!1,c,null,null,!1,!1)},
eg:function(a,b,c,d){return this.aU(a,b,!1,c,d,null,null,!1,!1)},
fL:function(a,b,c,d){return this.aU(a,b,!1,!1,c,d,null,!1,!1)},
jR:function(a,b,c,d){return this.aU(a,b,c,!1,!1,null,null,d,!1)},
jQ:function(a,b,c){return this.aU(a,b,c,!1,!1,null,null,!1,!1)},
fM:function(a,b,c,d){return this.aU(a,b,!1,!1,!1,c,d,!1,!1)}},bV:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",q3:{"^":"a:0;",
$1:function(a){a.gci().b=2
return 2}},q4:{"^":"a:0;",
$1:function(a){a.gci().b=0
return 0}},q2:{"^":"a:0;",
$1:function(a){a.gci().b=1
return 1}},ft:{"^":"d;"},nY:{"^":"ft;j:a<",
a7:function(a){var z=new L.be(null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.ft))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gA:function(a){return Y.X(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.f(this.a)+",\n}"},
t:{
dK:function(a){var z=new L.be(null,null)
a.$1(z)
return z.q()}}},be:{"^":"d;a,b",
gj:function(){return this.gci().b},
gci:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y
z=this.a
if(z==null){y=this.gci().b
z=new L.nY(y)
if(y==null)H.h(P.m("id"))}this.p(z)
return z}}}],["","",,X,{"^":"",
he:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$he(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bM(u,u.length,0,null,[H.l(u,0)])
u=y.a
s=new J.bM(u,u.length,0,null,[H.l(u,0)])
case 2:r=t.u()
q=s.u()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aO()
case 1:return P.aP(v)}}})}}],["","",,A,{"^":"",at:{"^":"d;ir:a<,b,c,d,e,f,T:r<,x",
giM:function(){var z=this.f
return z.length!==0?C.a.gE(z):null},
gA:function(a){var z,y,x,w,v
z=X.bn(this.a)
y=X.bn(this.d)
x=X.bn(this.f)
w=this.r
v=this.c
v=X.cR(X.aR(X.aR(0,C.e.gA(w)),J.j(v)))
return X.cR(X.aR(X.aR(X.aR(X.aR(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
v:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isat&&this.gA(this)===z.gA(b)},
f4:function(a){var z,y
z=this.h0(a,!0)
y=z.gY(z)
if(y.u()){y.gF()
return!0}return!1},
ip:function(a){var z,y
z=this.h_(a)
y=z.gY(z)
if(y.u()){y.gF()
return!0}return!1},
iq:function(a){var z=this.x
if(z==null)return!1
return C.b.Z(z.gi(),a)},
ff:function(a){var z,y,x
z=this.cP(a)
if(z==null)throw H.c(new P.F("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].ax()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
ax:function(){++this.r},
dc:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.ez(0,new A.nz(a))
if(b!=null)z=z.bN(0,new A.nA(b))
if(c!=null)z=z.bN(0,new A.nB(c))
if(e!=null)z=z.bN(0,new A.nC(e))
return d!=null?z.bN(0,new A.nD(d)):z},
h0:function(a,b){return this.dc(a,null,null,null,b)},
h_:function(a){return this.dc(a,null,null,null,null)},
ad:function(a){return this.a.aC(0,new A.nE(a))},
dg:function(a){return this.e.aC(0,new A.nF(a))},
ep:function(a){var z,y
z=this.cP(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ap:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.i(z[y].gi(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
jb:function(a){var z=this.a.bn(0,new A.nG(a),new A.nH())
if(z==null)return!1
return z.gbp()},
ee:function(){var z=this.f
C.a.gE(z).b4(this)
C.a.bb(z)},
c0:function(a){var z=this.f
while(!0){if(!(z.length!==0&&!J.i(C.a.gE(z).gi(),a)))break
C.a.gE(z).b4(this)
C.a.bb(z)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
fK:function(a,b){var z,y
z=this.cP(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
d6:function(a,b,c,d,e){var z,y,x,w
z=this.dc(a,b,c,d,e)
y=z.gY(z)
if(y.u()){x=y.gF()
y=this.r
w=x.gT()
if(typeof w!=="number")return H.y(w)
return y-w}return},
jW:function(a,b,c){return this.d6(null,a,b,c,null)},
c1:function(a,b,c){return this.d6(a,null,b,null,c)},
jV:function(a,b,c){return this.d6(a,b,null,null,c)},
jU:function(a){return this.d6(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.dK()
y.al(0,z)
return"World<"+P.bQ(y,"{","}")+">"},
a3:function(a,b){var z,y,x
z=this.ad(a)
y=z.a7(b)
x=this.a
x.aS(0,z)
x.n(0,y)},
cP:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.i(y[x].gj(),a)){z=x
break}++x}return z},
hr:function(a){this.a.al(0,a.a)
this.d.al(0,a.d)
this.b.al(0,a.b)
this.e.al(0,a.e)
C.a.al(this.f,a.f)
this.r=a.r},
t:{
dI:function(a){var z,y,x,w
z=P.T(null,null,null,R.P)
y=P.aY(null,O.ce)
x=P.T(null,null,null,U.dc)
w=P.T(null,null,null,null)
w=new A.at(z,x,a.c,y,w,[],null,null)
w.hr(a)
return w}}},nz:{"^":"a:0;a",
$1:function(a){return a.gf5()===this.a}},nA:{"^":"a:0;a",
$1:function(a){return J.i(a.gef(),this.a.gj())}},nB:{"^":"a:0;a",
$1:function(a){return a.gey().Z(0,this.a.y)}},nC:{"^":"a:0;a",
$1:function(a){return a.gfW()===this.a}},nD:{"^":"a:0;a",
$1:function(a){return a.gfV()===this.a}},nE:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},nF:{"^":"a:0;a",
$1:function(a){return J.i(a.gi(),this.a)}},nG:{"^":"a:0;a",
$1:function(a){return J.i(a.gj(),this.a)}},nH:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aE:{"^":"ag;"},bB:{"^":"aE;b,X:c<,V:d<,i:e<,a",
U:[function(a,b,c){throw H.c(new P.F("SimpleAction always succeeds"))},"$3","gP",6,0,2],
R:[function(a,b,c){return this.b.$4(a,b,c,this)},"$3","gN",6,0,2],
ai:function(a,b){throw H.c(new P.F("SimpleAction shouldn't have to provide roll reason"))},
M:function(a,b){return 1},
gW:function(){return!1},
L:function(a,b){return!0},
gO:function(){return H.h(new P.F("Not rerollable"))},
gS:function(){return!1}}}],["","",,E,{"^":"",fi:{"^":"G;V:c<,W:d<,b,a",
ga9:function(){return"break <object's> neck"},
gi:function(){return"StartBreakNeckOnGround"},
gS:function(){return!1},
gO:function(){return},
ga8:function(){return},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",z)
b.a3(a.gj(),new E.mn())
y=b.f
C.a.n(y,Y.ek(a,z))
C.a.n(y,S.eU(a,z,C.q))
return H.b(a.gi())+" throws self down on "+H.b(z.gi())+" to break neck"},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.gJ()!==!0&&this.b.gac()},
t:{
rF:[function(a){return new E.fi("This move is hard, but when succesful, it's decisive.",!0,a,null)},"$1","pB",2,0,5]}},mn:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,O,{"^":"",ml:{"^":"fi;S:e<,O:f<,c,d,b,a",
ga8:function(){return"will <subject> succeed?"},
U:[function(a,b,c){this.eC(a,c,b,C.o)
return H.b(a.gi())+" throws self down on "+H.b(this.b.gi())+" to (failed) break neck"},"$3","gP",6,0,2],
R:[function(a,b,c){this.eC(a,c,b,C.m)
return H.b(a.gi())+" throws self down on "+H.b(this.b.gi())+" to (successful) break neck"},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gJ()===!0&&this.b.gac()},
eC:function(a,b,c,d){var z,y
z=this.b
a.aG(b,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",z)
c.a3(a.gj(),new O.mm())
y=c.f
C.a.n(y,Y.ek(a,z))
C.a.n(y,S.eU(a,z,d))},
t:{
rE:[function(a){return new O.ml(!0,C.d,"This move is hard, but when succesful, it's decisive.",!0,a,null)},"$1","pC",2,0,5]}},mm:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,N,{"^":"",iO:{"^":"G;W:c<,V:d<,S:e<,O:f<,b,a",
ga9:function(){return"confuse <object>"},
gi:function(){return"Confuse"},
ga8:function(){return"will <subject> confuse <object>?"},
U:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a0(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.a0(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.b(a.gi())+" fails to confuse "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a0(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.bz(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gi())+" confuses "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 0.6},
L:function(a,b){var z
if(a.gJ()===!0)if(a.gah()){z=b.a
z=new H.H(z,new N.iP(this),[H.l(z,0)])
z=z.gl(z)>=2&&!this.b.e7(b)}else z=!1
else z=!1
return z},
t:{
rl:[function(a){return new N.iO(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.d,a,null)},"$1","qr",2,0,5]}},iP:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbp()){z=a.gbe()
y=this.a.b.gbe()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,F,{"^":"",kM:{"^":"ag;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Stand off."},
gi:function(){return"Pass"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gJ()===!0)a.ak(c,"<subject> stand<s> off")
return H.b(a.gi())+" passes the opportunity"},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
L:function(a,b){return!0}}}],["","",,Y,{"^":"",l_:{"^":"G;S:c<,O:d<,W:e<,V:f<,b,a",
ga9:function(){return"force <object> off balance"},
gi:function(){return"Pound"},
ga8:function(){return"will <subject> force <object> off balance?"},
U:[function(a,b,c){var z=this.b
a.fM(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga6(),z)
z.cu(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gi())+" kicks "+H.b(z.db)+" off balance"},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.fM(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga6(),z)
if(z.gah()){z.fL(c,"<subject> lose<s> <object>",!0,$.$get$e0())
b.a3(z.y,new Y.l0())
C.a.n(b.f,U.ku(z,a))
return H.b(a.gi())+" pounds "+H.b(z.db)+" off balance"}else if(z.gb2()){z.ak(c,"<subject> <is> already off balance")
c.f6(0,"<subject> make<s> <object> fall to the "+H.b(b.ap("FightSituation").gbB()),z,$.$get$hE())
b.a3(z.y,new Y.l1())
return H.b(a.gi())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.F("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,2],
M:function(a,b){var z=a.gah()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
L:function(a,b){var z
if(!a.gac()){z=a.e
if(z!=null&&z.a===C.c){z=this.b
z=z.aA(C.c)&&!z.gac()}else z=!1}else z=!1
return z},
t:{
rB:[function(a){return new Y.l_(!0,C.d,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","qV",2,0,5]}},l0:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return a}},l1:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,B,{"^":"",lk:{"^":"ag;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Regain balance."},
gi:function(){return"RegainBalance"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gJ()===!0)a.aT(c,"<subject> regain<s> <object>",$.$get$e0(),!0)
b.a3(a.gj(),new B.ll())
return H.b(a.gi())+" regains balance"},"$3","gN",6,0,2],
ai:function(a,b){return"Will "+a.gH().a+" regain balance?"},
M:function(a,b){return 1},
L:function(a,b){return a.gb2()}},ll:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,O,{"^":"",lz:{"^":"ag;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Scramble."},
gi:function(){return"Scramble"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gi())+" scrambles on ground"},"$3","gN",6,0,2],
ai:function(a,b){return"Will "+a.gH().a+" crawl out of harm's way?"},
M:function(a,b){return 1},
L:function(a,b){var z,y
if(!a.gac())return!1
z=b.c1("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
y=b.c1("Pound",a,!0)
if(y!=null&&y<=2)return!0
return!1}}}],["","",,Q,{"^":"",mj:{"^":"ag;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Stand up."},
gi:function(){return"StandUp"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.ak(c,"<subject> stand<s> up")
b.a3(a.gj(),new Q.mk())
return H.b(a.gi())+" stands up"},"$3","gN",6,0,2],
ai:function(a,b){return"Will "+a.gH().a+" stand up?"},
M:function(a,b){return 1},
L:function(a,b){var z,y
if(!a.gac())return!1
z=b.c1("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!1
y=b.c1("Pound",a,!0)
if(y!=null&&y<=2)return!1
return!0}},mk:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,G,{"^":"",fj:{"^":"G;V:c<,W:d<,b,a",
gO:function(){return},
gi:function(){return"StartSlash"},
ga9:function(){return"swing at <object>"},
gS:function(){return!1},
ga8:function(){return},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> swing<s> {<subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.q))
return H.b(a.db)+" starts a slash at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.gJ()!==!0&&a.gah()&&!this.b.gac()&&a.aA(C.c)},
t:{
rJ:[function(a){return new G.fj("The basic swordfighting move is also often the most effective.",!0,a,null)},"$1","r4",2,0,5]}}}],["","",,R,{"^":"",fk:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"StartSlashOutOfBalance"},
ga9:function(){return"swing at <object> (while out of balance)"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){var z=this.b
a.fL(c,"<subject> completely miss<es> <object> with <subject's> "+a.ga6().f,!0,z)
return H.b(a.db)+" fails to start an out-of-balance slash at "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> swing<s> {<subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.q))
return H.b(a.db)+" starts an out-of-balance slash at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gJ()!==!0&&a.gb2()&&!this.b.gac()&&a.aA(C.c)},
t:{
rH:[function(a){return new R.fk("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.d,a,null)},"$1","r5",2,0,5]}}}],["","",,T,{"^":"",mo:{"^":"fk;c,d,e,f,b,a",
gi:function(){return"StartSlashOutOfBalancePlayer"},
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> swing<s> {<subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.m))
return H.b(a.db)+" starts an out-of-balance slash at "+H.b(z.gi())},"$3","gN",6,0,2],
L:function(a,b){return a.gJ()===!0&&a.gb2()&&!this.b.gac()&&a.aA(C.c)},
t:{
rG:[function(a){return new T.mo("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.d,a,null)},"$1","r6",2,0,5]}}}],["","",,A,{"^":"",mp:{"^":"fj;S:e<,O:f<,c,d,b,a",
ga8:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> swing<s> {<subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.o))
return H.b(a.db)+" starts a failed slash at "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> swing<s> {<subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.m))
return H.b(a.db)+" starts a successful slash at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gJ()===!0&&a.gah()&&!this.b.gac()&&a.aA(C.c)},
t:{
rI:[function(a){return new A.mp(!0,C.d,"The basic swordfighting move is also often the most effective.",!0,a,null)},"$1","r7",2,0,5]}}}],["","",,D,{"^":"",fl:{"^":"G;V:c<,W:d<,b,a",
gi:function(){return"StartStrikeDown"},
ga9:function(){return"strike down at <object>"},
gS:function(){return!1},
gO:function(){return},
ga8:function(){return},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> strike<s> down {with <subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,D.dE(a,z))
C.a.n(y,V.dq(a,z,C.q))
return H.b(a.db)+" strikes down at "+H.b(z.gi())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.gJ()!==!0&&this.b.gac()&&!a.gac()&&a.aA(C.c)},
t:{
rL:[function(a){return new D.fl("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","r8",2,0,5]}}}],["","",,Q,{"^":"",mq:{"^":"fl;c,d,b,a",
ga9:function(){return"strike down at <object>"},
gS:function(){return!0},
gO:function(){return C.d},
ga8:function(){return"will <subject> hit?"},
U:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> strike<s> down {with <subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,D.dE(a,z))
C.a.n(y,V.dq(a,z,C.o))
return H.b(a.db)+" makes an unsuccessful strike at "+H.b(z.gi())+" on the ground"},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aG(c,"<subject> strike<s> down {with <subject's> "+a.ga6().f+" |}at <object>",z)
y=b.f
C.a.n(y,D.dE(a,z))
C.a.n(y,V.dq(a,z,C.m))
return H.b(a.db)+" makes a successful strike at "+H.b(z.gi())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gJ()===!0&&this.b.gac()&&!a.gac()&&a.aA(C.c)},
t:{
rK:[function(a){return new Q.mq("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","r9",2,0,5]}}}],["","",,B,{"^":"",n0:{"^":"G;S:c<,O:d<,W:e<,V:f<,b,a",
gi:function(){return"SweepOffFeet"},
ga9:function(){return"sweep <object> off <objectPronoun's> feet"},
ga8:function(){return"will <subject> knock <object> down?"},
U:[function(a,b,c){S.b9(new B.n1(this,a,c),new B.n2(this,a,c),null,null)
return H.b(a.gi())+" fails to sweep "+H.b(this.b.gi())+" off feet"},"$3","gP",6,0,2],
R:[function(a,b,c){var z
S.b9(new B.n3(this,a,c),new B.n4(this,a,c,b.ap("FightSituation").gbB()),null,null)
z=this.b
b.a3(z.gj(),new B.n5())
return H.b(a.gi())+" sweeps "+H.b(z.gi())+" off feet"},"$3","gN",6,0,2],
M:function(a,b){var z=a.gah()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
L:function(a,b){return(a.gah()||a.dy===C.j)&&!this.b.gac()},
t:{
rN:[function(a){return new B.n0(!0,C.d,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","rd",2,0,5]}},n1:{"^":"a:1;a,b,c",
$0:function(){var z=this.c
this.b.aG(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.iv(0,"they don't connect",!0,!0)}},n2:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aG(z,"<subject> kick<s> <object's> shin",y)
y.jQ(z,"<subject> <does>n't budge",!0)}},n3:{"^":"a:1;a,b,c",
$0:function(){this.b.aT(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},n4:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aT(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.ak(z,"<subject> {grunt|shriek}<s>")
y.bz(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},n5:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,M,{"^":"",nx:{"^":"ag;V:b<,S:c<,O:d<,W:e<,a",
gX:function(){return"Regain clarity."},
gi:function(){return"Unconfuse"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.ak(c,"<subject> shake<s> <subject's> head violently")
if(a.gJ()===!0)c.n(0,"the {horrible|terrible} spell seems to recede")
c.a0(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.b(a.gi())+" regains clarity"},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
L:function(a,b){var z
if(a.e7(b)){z=b.c1("Confuse",a,!0)
if(typeof z!=="number")return z.bC()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",jL:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"FinishBreakNeck"},
ga9:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a3(z.gj(),new R.jM())
a.aT(c,"<subject> break<s> <object's> neck",z,!0)
X.e8(c,z,b.ap("FightSituation").gbB())
return H.b(a.gi())+" breaks "+H.b(z.gi())+"'s neck on ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return!0},
t:{
rr:[function(a){return new R.jL(null,!0,!0,C.d,a,null)},"$1","qB",2,0,5]}},jM:{"^":"a:0;",
$1:function(a){a.san(0)
return a}}}],["","",,Y,{"^":"",
ek:function(a,b){var z=new Y.d3(null,null,null,null,null)
new Y.qh(a,b).$1(z)
return z.q()},
ej:{"^":"a4;",
gaZ:function(){return[R.qB()]},
gi:function(){return"BreakNeckOnGroundSituation"},
ax:function(){var z=new Y.d3(null,null,null,null,null)
z.p(this)
new Y.iC().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.a)
return},
aB:function(a,b){return new H.H(a,new Y.iD(this),[H.l(a,0)])}},
qh:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gaL().c=z
a.gaL().e=0
z=this.a.gj()
a.gaL().b=z
z=this.b.gj()
a.gaL().d=z
return a}},
iC:{"^":"a:0;",
$1:function(a){var z=a.gaL().e
if(typeof z!=="number")return z.a4()
a.gaL().e=z+1
return a}},
iD:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
nL:{"^":"ej;a,j:b<,c,T:d<",
a7:function(a){var z=new Y.d3(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.ej))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
d3:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaL().c},
gT:function(){return this.gaL().e},
gaL:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaL().b
x=this.gaL().c
w=this.gaL().d
v=this.gaL().e
z=new Y.nL(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,Z,{"^":"",jw:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
ga9:function(){return"evade"},
gi:function(){return"EvadeNeckBreaking"},
ga8:function(){return"will <subject> evade?"},
U:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to evade")
S.b9(new Z.jx(a,c),new Z.jy(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.gi())+" fails to dodge "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.aT(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.c0("FightSituation")
return H.b(a.gi())+" evades "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbw())return 0
if(y.gbx())return 1
x=this.b.ga6()!=null?0.4:0
if(a.gJ()===!0)return 0.6+x
return 0.5+x},
L:function(a,b){return!0},
t:{
rq:[function(a){return new Z.jw("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!0,C.d,a,null)},"$1","qy",2,0,5]}},jx:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a0(0,"<subject> {can't|fail<s>}",!0,!1,!1,null,null,!1,z,!1)
return}},jy:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cv(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
eU:function(a,b,c){var z=new S.dr(null,null,null,null,null,null)
new S.qg(a,b,c).$1(z)
return z.q()},
eT:{"^":"a4;",
gaZ:function(){return[Z.qy()]},
gbw:function(){return this.c===C.m},
gbx:function(){return this.c===C.o},
gi:function(){return"OnGroundWrestleDefenseSituation"},
ax:function(){var z=new S.dr(null,null,null,null,null,null)
z.p(this)
new S.kF().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.d)
return},
aB:function(a,b){return new H.H(a,new S.kG(this),[H.l(a,0)])}},
qg:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gaw().c=z
a.gaw().f=0
z=this.a.gj()
a.gaw().b=z
z=this.b.gj()
a.gaw().e=z
a.gaw().d=this.c
return a}},
kF:{"^":"a:0;",
$1:function(a){var z=a.gaw().f
if(typeof z!=="number")return z.a4()
a.gaw().f=z+1
return a}},
kG:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.d)}},
nR:{"^":"eT;a,j:b<,c,d,T:e<",
a7:function(a){var z=new S.dr(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eT))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+H.b(J.f(this.d))+",\ntime="+J.f(this.e)+",\n}"}},
dr:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaw().c},
gT:function(){return this.gaw().f},
gaw:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaw().b
x=this.gaw().c
w=this.gaw().d
v=this.gaw().e
u=this.gaw().f
z=new S.nR(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("target"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,G,{"^":"",es:{"^":"G;V:c<,W:d<,b,a",
gi:function(){return"CounterSlash"},
gS:function(){return!1},
gO:function(){return},
ga9:function(){return"swing back at <object>"},
ga8:function(){return"will <subject> keep <subject's> balance?"},
U:[function(a,b,c){a.ak(c,"<subject> tr<ies> to swing back")
a.toString
c.a0(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gah()){b.a3(a.y,new G.j_())
c.a0(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dy===C.j){b.a3(a.y,new G.j0())
c.a0(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a0(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.q))
return H.b(a.gi())+" swings back at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return this.b.gah()?0.7:0.9},
L:function(a,b){return a.gJ()!==!0&&a.aA(C.c)&&!a.gac()},
t:{
rn:[function(a){return new G.es("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","qu",2,0,5]}},j_:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return a}},j0:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,D,{"^":"",iX:{"^":"es;c,d,b,a",
gS:function(){return!0},
gO:function(){return C.d},
ga9:function(){return"swing back at <object>"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){a.ak(c,"<subject> tr<ies> to swing back")
a.toString
c.a0(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gah()){b.a3(a.y,new D.iY())
c.a0(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dy===C.j){b.a3(a.y,new D.iZ())
c.a0(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a0(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aT(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.n(y,M.bd(a,z))
C.a.n(y,L.bc(a,z,C.m))
return H.b(a.gi())+" swings successfully back at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return this.b.gah()?0.7:0.9},
L:function(a,b){return a.gJ()===!0&&a.aA(C.c)&&!a.gac()},
t:{
rm:[function(a){return new D.iX("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","qv",2,0,5]}},iY:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return a}},iZ:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,S,{"^":"",
er:function(a,b){var z=new S.d6(null,null,null,null,null)
new S.qc(a,b).$1(z)
return z.q()},
eq:{"^":"a4;",
gaZ:function(){return[G.qu(),D.qv()]},
gbj:function(){return[$.$get$ds()]},
gi:function(){return"CounterAttackSituation"},
ax:function(){var z=new S.d6(null,null,null,null,null)
z.p(this)
new S.iV().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.a)
return},
aB:function(a,b){return new H.H(a,new S.iW(this),[H.l(a,0)])}},
qc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gaM().c=z
a.gaM().e=0
z=this.a.gj()
a.gaM().b=z
z=this.b.gj()
a.gaM().d=z
return a}},
iV:{"^":"a:0;",
$1:function(a){var z=a.gaM().e
if(typeof z!=="number")return z.a4()
a.gaM().e=z+1
return a}},
iW:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
nM:{"^":"eq;a,j:b<,c,T:d<",
a7:function(a){var z=new S.d6(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eq))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
d6:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaM().c},
gT:function(){return this.gaM().e},
gaM:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaM().b
x=this.gaM().c
w=this.gaM().d
v=this.gaM().e
z=new S.nM(y,x,w,v)
if(y==null)H.h(P.m("counterAttacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,X,{"^":"",
e8:function(a,b,c){if(b.gaj()===C.l){b.bz(a,"<subject> stop<s> moving",!0)
a.G(0,"\n\n",!0)
return}switch($.$get$h5().aa(3)){case 0:b.eg(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bz(a,"<subject> fall<s> backward",!0)
a.a0(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b,!1)
a.a0(0,"<subject> hit<s> the "+H.b(c)+" face down",!1,!0,!0,null,null,!1,b,!1)
break
case 2:b.bz(a,"<subject> drop<s> to <subject's> knees",!0)
a.a0(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b,!1)
break}a.G(0,"\n\n",!0)}}],["","",,U,{"^":"",
jA:function(a,b,c,d){var z=new U.da(null,null,null,null,null,null,null,null)
new U.q9(a,b,c,d).$1(z)
return z.q()},
ew:{"^":"a4;",
gaZ:function(){return[N.qr(),Y.qV(),B.rd(),E.pB(),O.pC(),G.r4(),A.r7(),D.r8(),Q.r9(),R.r5(),T.r6()]},
gbj:function(){return H.t([$.$get$f0(),$.$get$fh(),$.$get$f4(),$.$get$fL()],[Q.ag])},
gfv:function(){return 1000},
gi:function(){return"FightSituation"},
dY:function(a,b){var z=a.a
return(z&&C.a).bV(z,new U.jB(b))},
ax:function(){var z=new U.da(null,null,null,null,null,null,null,null)
z.p(this)
new U.jC().$1(z)
return z.q()},
at:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.he(this.e,this.a)
y=H.bw(z,new U.jD(b),H.v(z,"x",0),null)
x=H.v(y,"x",0)
w=P.U(new H.H(y,new U.jE(),[x]),!1,x)
x=H.l(w,0)
v=P.U(new H.H(w,new U.jF(),[x]),!1,x)
u=v.length===1?C.a.gbR(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ap)(w),++r){q=w[r]
p=b.d.bn(0,new U.jG(q),new U.jH())
o=p==null?p:p.gT()
if(o==null)o=-1
x=b.r
if(typeof o!=="number")return H.y(o)
n=x-o
if(q.gJ()===!0)n=C.i.ei(n*1.5)
if(n>t){s=q
t=n}}return s},
aB:function(a,b){return new H.H(a,new U.jI(this),[H.l(a,0)])},
fD:function(a,b){var z,y
if(S.ld(0.25))b.G(0,"\n\n",!0)
z=this.r
y=this.b.a
if(y.a_(z))y.h(0,z).$2(a,b)},
b4:function(a){var z,y
z=this.f
if(z!=null&&!this.dY(this.a,a)){y=a.ep(z)
a.fK(y.gj(),y.a7(new U.jJ()))}},
dj:function(a){var z=this.e
if(this.dY(z,a))if(this.dY(this.a,a)){z=z.a
z=(z&&C.a).bV(z,new U.jK(a))}else z=!1
else z=!1
return z}},
q9:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$a6().aa(1073741823)
a.gaf().e=z
a.gaf().x=0
z=a.gaf()
y=z.f
if(y==null){y=new S.aL(null,null,[P.u])
y.aW()
y.p(C.h)
z.f=y
z=y}else z=y
y=this.a
z.p(new H.cw(y,new U.ph(),[H.l(y,0),null]))
y=a.gaf()
z=y.b
if(z==null){z=new S.aL(null,null,[P.u])
z.aW()
z.p(C.h)
y.b=z}z.p(J.ed(this.b,new U.pi()))
a.gaf().d=this.c
z=this.d.gj()
a.gaf().r=z
return a}},
ph:{"^":"a:0;",
$1:function(a){return a.gj()}},
pi:{"^":"a:0;",
$1:function(a){return a.gj()}},
jB:{"^":"a:0;a",
$1:function(a){return this.a.ad(a).gb9()}},
jC:{"^":"a:0;",
$1:function(a){var z=a.gaf().x
if(typeof z!=="number")return z.a4()
a.gaf().x=z+1
return a}},
jD:{"^":"a:0;a",
$1:function(a){return this.a.ad(a)}},
jE:{"^":"a:0;",
$1:function(a){return a.gb9()}},
jF:{"^":"a:0;",
$1:function(a){return a.gJ()}},
jG:{"^":"a:0;a",
$1:function(a){return J.i(a.gef(),this.a.gj())}},
jH:{"^":"a:1;",
$0:function(){return}},
jI:{"^":"a:19;a",
$1:function(a){var z,y,x
if(a.gb9()){z=this.a
y=a.gj()
x=z.e.a
if(!(x&&C.a).Z(x,y)){y=a.gj()
z=z.a.a
y=(z&&C.a).Z(z,y)
z=y}else z=!0}else z=!1
return z}},
jJ:{"^":"a:0;",
$1:function(a){a.sjD(!1)
return a}},
jK:{"^":"a:28;a",
$1:function(a){var z=this.a.ad(a)
return z.gJ()===!0&&z.gb9()}},
nO:{"^":"ew;a,b,bB:c<,j:d<,e,f,T:r<",
a7:function(a){var z=new U.da(null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.ew))return!1
if(J.i(this.a,b.a))if(J.i(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.i(this.e,b.e)){z=this.f
y=b.f
if(z==null?y==null:z===y){z=this.r
y=b.r
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)))},
k:function(a){return"FightSituation {enemyTeamIds="+J.f(this.a)+",\nevents="+J.f(this.b)+",\ngroundMaterial="+J.f(this.c)+",\nid="+J.f(this.d)+",\nplayerTeamIds="+J.f(this.e)+",\nroomRoamingSituationId="+J.f(this.f)+",\ntime="+J.f(this.r)+",\n}"}},
da:{"^":"d;a,b,c,d,e,f,r,x",
gbB:function(){return this.gaf().d},
gj:function(){return this.gaf().e},
gT:function(){return this.gaf().x},
gaf:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.aL(null,null,[H.l(z,0)])
y.aW()
y.p(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.dl(null,null,[H.l(z,0),H.l(z,1)])
y.cb()
y.p(z)
z=y}this.c=z
z=this.a
this.d=z.c
this.e=z.d
z=z.e
if(!(z==null)){y=new S.aL(null,null,[H.l(z,0)])
y.aW()
y.p(z)
z=y}this.f=z
z=this.a
this.r=z.f
this.x=z.r
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s
z=this.a
if(z==null){y=this.gaf()
x=y.b
if(x==null){x=new S.aL(null,null,[P.u])
x.aW()
x.p(C.h)
y.b=x
y=x}else y=x
y=y.q()
x=this.gaf()
w=x.c
if(w==null){w=new A.dl(null,null,[P.u,{func:1,v:true,args:[A.at,Y.ak]}])
w.cb()
w.p(C.V)
x.c=w
x=w}else x=w
x=x.q()
w=this.gaf().d
v=this.gaf().e
u=this.gaf()
t=u.f
if(t==null){t=new S.aL(null,null,[P.u])
t.aW()
t.p(C.h)
u.f=t
u=t}else u=t
u=u.q()
t=this.gaf().r
s=this.gaf().x
z=new U.nO(y,x,w,v,u,t,s)
if(y==null)H.h(P.m("enemyTeamIds"))
if(x==null)H.h(P.m("events"))
if(w==null)H.h(P.m("groundMaterial"))
if(v==null)H.h(P.m("id"))
if(u==null)H.h(P.m("playerTeamIds"))
if(s==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,A,{"^":"",ky:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"OffBalanceOpportunityThrust"},
ga9:function(){return"stab <object>"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){var z=this.b
a.aG(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.a0(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gi())+" fails to stab "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a3(z.gj(),new A.kz())
if(b.ad(z.gj()).gbp()){a.aT(c,"<subject> thrust<s> {|<subject's> "+a.ga6().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bz(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.aT(c,"<subject> {stab<s>|run<s> <subject's> "+a.ga6().f+" through} <object>",z,!0)
X.e8(c,z,b.ap("FightSituation").gbB())}return H.b(a.gi())+" stabs "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){if(a.gJ()===!0)return 0.6
return 0.5},
L:function(a,b){var z
if(a.gah())if(this.b.gb2()){z=a.e
z=z!=null&&z.a===C.c}else z=!1
else z=!1
return z},
t:{
rw:[function(a){return new A.ky("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.d,a,null)},"$1","qS",2,0,5]}},kz:{"^":"a:0;",
$1:function(a){var z=a.gan()
if(typeof z!=="number")return z.aK()
a.san(z-1)
return a}}}],["","",,U,{"^":"",
ku:function(a,b){var z=new U.dn(null,null,null,null,null)
new U.qi(a,b).$1(z)
return z.q()},
eR:{"^":"a4;",
gaZ:function(){return H.t([A.qS()],[{func:1,ret:Q.G,args:[R.P]}])},
gbj:function(){return[$.$get$ds()]},
gi:function(){return"OffBalanceOpportunitySituation"},
ax:function(){var z=new U.dn(null,null,null,null,null)
z.p(this)
new U.kv().$1(z)
return z.q()},
at:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bC()
if(a>0)return
z=b.ad(this.a)
y=b.a
x=H.l(y,0)
w=P.U(new H.H(y,new U.kw(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gfi(w)
if(v.gah())if(z.gb2()){y=v.e
y=y!=null&&y.a===C.c}else y=!1
else y=!1
if(y)return v
return},
aB:function(a,b){return new H.H(a,new U.kx(b,b.ad(this.a)),[H.l(a,0)])}},
qi:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gaN().d=z
a.gaN().e=0
z=this.a.gj()
a.gaN().b=z
z=this.b
z=z==null?z:z.gj()
a.gaN().c=z
return a}},
kv:{"^":"a:0;",
$1:function(a){var z=a.gaN().e
if(typeof z!=="number")return z.a4()
a.gaN().e=z+1
return a}},
kw:{"^":"a:19;a,b,c",
$1:function(a){var z,y
if(a.gb9())if(a.e3(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
kx:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.i(a,z)||a.e3(z,this.a)}},
nP:{"^":"eR;a,b,j:c<,T:d<",
a7:function(a){var z=new U.dn(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eR))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.f(this.a))+",\nculpritId="+J.f(this.b)+",\nid="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dn:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaN().d},
gT:function(){return this.gaN().e},
gaN:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaN().b
x=this.gaN().c
w=this.gaN().d
v=this.gaN().e
z=new U.nP(y,x,w,v)
if(y==null)H.h(P.m("actorId"))
if(w==null)H.h(P.m("id"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,O,{"^":"",jN:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"FinishSlash"},
ga9:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y,x
z=this.b
b.a3(z.gj(),new O.jQ())
y=b.ad(z.gj()).gbp()
if(y){a.aT(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.bz(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.aT(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.e8(c,z,b.ap("FightSituation").gbB())}x=H.b(a.gi())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.aA(C.c)},
t:{
rt:[function(a){return new O.jN(null,!0,!0,C.d,a,null)},"$1","qC",2,0,5]}},jQ:{"^":"a:0;",
$1:function(a){var z=a.gan()
if(typeof z!=="number")return z.aK()
a.san(z-1)
return a}}}],["","",,X,{"^":"",j5:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"DefensiveParrySlash"},
ga9:function(){return"step back and parry"},
ga8:function(){return"will <subject> parry it?"},
U:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.ga6().f+"|fend it off}")
if(a.gb2())c.a0(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.b9(new X.j6(a,c),new X.j7(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gJ()===!0)a.ak(c,"<subject> {step<s>|take<s> a step} back")
a.cu(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.ga6().f+"|fend<s> it off}",!0)
if(!a.gah()){b.a3(a.y,new X.j8())
if(a.ch===!0)c.a0(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.c0("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gi())},"$3","gN",6,0,2],
M:function(a,b){var z,y
if(a.gJ()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbw())return 0
if(y.gbx())return 1
return 0.5-(a.gah()?0:0.2)},
L:function(a,b){return a.aA(C.c)},
t:{
ro:[function(a){return new X.j5("Stepping back is the safest way to get out of harm's way.",!1,!0,C.d,a,null)},"$1","qw",2,0,5]}},j6:{"^":"a:1;a,b",
$0:function(){this.b.a0(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},j7:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cv(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},j8:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,F,{"^":"",j9:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"DodgeSlash"},
ga9:function(){return"dodge and counter"},
ga8:function(){return"will <subject> dodge?"},
U:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb2())c.a0(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.b9(new F.ja(a,c),new F.jb(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.db)+" fails to dodge "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.aT(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gah()){z.eg(c,"<subject> lose<s> balance because of that",!0,!0)
b.a3(z.y,new F.jc())}b.c0("FightSituation")
if(a.gJ()===!0)c.n(0,"this opens an opportunity for a counter attack")
C.a.n(b.f,S.er(a,z))
return H.b(a.gi())+" dodges "+H.b(z.db)},"$3","gN",6,0,2],
M:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbw())return 0
if(y.gbx())return 1
x=a.gah()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
L:function(a,b){return!a.gac()},
t:{
rp:[function(a){return new F.j9("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.d,a,null)},"$1","qx",2,0,5]}},ja:{"^":"a:1;a,b",
$0:function(){this.b.a0(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},jb:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cv(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},jc:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return C.j}}}],["","",,G,{"^":"",kJ:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"ParrySlash"},
ga9:function(){return"parry and counter"},
ga8:function(){return"will <subject> parry?"},
U:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.ga6().f+"|fend it off}")
if(a.gb2())c.a0(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.b9(new G.kK(a,c),new G.kL(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
if(z.gb2()){c.ix(0,"<subject> <is> out of balance",!0,!0,z)
c.iw(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$hI())
a.cu(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+a.ga6().f+"|fend<s> it off easily}",!0)}else a.cu(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.ga6().f+"|fend<s> it off}",!0)
b.c0("FightSituation")
if(a.gJ()===!0)c.n(0,"this opens an opportunity for a counter attack")
C.a.n(b.f,S.er(a,z))
return H.b(a.gi())+" parries "+H.b(z.db)},"$3","gN",6,0,2],
M:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbw())return 0
if(y.gbx())return 1
x=a.gah()?0:0.2
w=this.b.gb2()?0.3:0
if(a.ch===!0)return 0.6-x+w
return 0.3-x+w},
L:function(a,b){return a.aA(C.c)},
t:{
ry:[function(a){return new G.kJ("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.d,a,null)},"$1","qU",2,0,5]}},kK:{"^":"a:1;a,b",
$0:function(){this.b.a0(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},kL:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cv(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bc:function(a,b,c){var z=new L.dA(null,null,null,null,null,null)
new L.qa(a,b,c).$1(z)
return z.q()},
f8:{"^":"a4;",
gaZ:function(){return[F.qx(),G.qU(),X.qw()]},
gbw:function(){return this.c===C.m},
gbx:function(){return this.c===C.o},
gi:function(){return"SlashDefenseSituation"},
ax:function(){var z=new L.dA(null,null,null,null,null,null)
z.p(this)
new L.m3().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.d)
return},
aB:function(a,b){return new H.H(a,new L.m4(this),[H.l(a,0)])}},
qa:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gav().c=z
a.gav().f=0
z=this.a.gj()
a.gav().b=z
z=this.b.gj()
a.gav().e=z
a.gav().d=this.c
return a}},
m3:{"^":"a:0;",
$1:function(a){var z=a.gav().f
if(typeof z!=="number")return z.a4()
a.gav().f=z+1
return a}},
m4:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.d)}},
nT:{"^":"f8;a,j:b<,c,d,T:e<",
a7:function(a){var z=new L.dA(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.f8))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+H.b(J.f(this.d))+",\ntime="+J.f(this.e)+",\n}"}},
dA:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gav().c},
gT:function(){return this.gav().f},
gav:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gav().b
x=this.gav().c
w=this.gav().d
v=this.gav().e
u=this.gav().f
z=new L.nT(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("target"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,M,{"^":"",
bd:function(a,b){var z=new M.dB(null,null,null,null,null)
new M.qd(a,b).$1(z)
return z.q()},
f9:{"^":"a4;",
gaZ:function(){return[O.qC()]},
gi:function(){return"SlashSituation"},
ax:function(){var z=new M.dB(null,null,null,null,null)
z.p(this)
new M.m5().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.a)
return},
aB:function(a,b){return new H.H(a,new M.m6(this),[H.l(a,0)])}},
qd:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gaO().c=z
a.gaO().e=0
z=this.a.gj()
a.gaO().b=z
z=this.b.gj()
a.gaO().d=z
return a}},
m5:{"^":"a:0;",
$1:function(a){var z=a.gaO().e
if(typeof z!=="number")return z.a4()
a.gaO().e=z+1
return a}},
m6:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
nU:{"^":"f9;a,j:b<,c,T:d<",
a7:function(a){var z=new M.dB(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.f9))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
dB:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaO().c},
gT:function(){return this.gaO().e},
gaO:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaO().b
x=this.gaO().c
w=this.gaO().d
v=this.gaO().e
z=new M.nU(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,Q,{"^":"",jO:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"FinishSlashGroundedEnemy"},
ga9:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a3(z.gj(),new Q.jP())
c.f6(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga6())
z.bz(c,"<subject> die<s>",!0)
c.G(0,"\n\n",!0)
return H.b(a.gi())+" slains "+H.b(z.gi())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return this.b.gac()&&a.aA(C.c)},
t:{
rs:[function(a){return new Q.jO(null,!1,!0,C.d,a,null)},"$1","qD",2,0,5]}},jP:{"^":"a:0;",
$1:function(a){a.san(0)
return a}}}],["","",,K,{"^":"",kC:{"^":"G;W:c<,S:d<,O:e<,V:f<,b,a",
gi:function(){return"OnGroundParry"},
ga9:function(){return"parry it"},
ga8:function(){return"will <subject> parry it?"},
U:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.ga6().f+"}}")
S.b9(new K.kD(a,c),new K.kE(this,a,c),null,null)
return H.b(a.db)+" fails to parry "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){a.cu(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.ga6().f+"}",!0)
b.c0("FightSituation")
return H.b(a.db)+" parries "+H.b(this.b.gi())},"$3","gN",6,0,2],
M:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbw())return 0
if(y.gbx())return 1
if(a.gJ()===!0)return 0.6
return 0.3},
L:function(a,b){return a.aA(C.c)},
t:{
rx:[function(a){return new K.kC(!1,!0,C.d,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","qT",2,0,5]}},kD:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a0(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},kE:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cv(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",ln:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gi:function(){return"RollOutOfWay"},
ga9:function(){return"roll out of way"},
ga8:function(){return"will <subject> evade?"},
U:[function(a,b,c){a.ak(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.a0(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gi())+" fails to roll out of the way"},"$3","gP",6,0,2],
R:[function(a,b,c){a.jR(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gJ()===!0){b.a3(a.gj(),new Y.lo())
c.a0(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.c0("FightSituation")
return H.b(a.gi())+" rolls out of the way of "+H.b(this.b.gi())+"'s strike"},"$3","gN",6,0,2],
M:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbw())return 0
if(y.gbx())return 1
if(a.gJ()===!0)return 1
return 0.5},
L:function(a,b){return!0},
t:{
rD:[function(a){return new Y.ln(null,!1,!0,C.d,a,null)},"$1","qZ",2,0,5]}},lo:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,V,{"^":"",
dq:function(a,b,c){var z=new V.dp(null,null,null,null,null,null)
new V.qe(a,b,c).$1(z)
return z.q()},
eS:{"^":"a4;",
gaZ:function(){return[K.qT(),Y.qZ()]},
gbw:function(){return this.c===C.m},
gbx:function(){return this.c===C.o},
gi:function(){return"OnGroundDefenseSituation"},
ax:function(){var z=new V.dp(null,null,null,null,null,null)
z.p(this)
new V.kA().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.d)
return},
aB:function(a,b){return new H.H(a,new V.kB(this),[H.l(a,0)])}},
qe:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gau().c=z
a.gau().f=0
z=this.a.gj()
a.gau().b=z
z=this.b.gj()
a.gau().e=z
a.gau().d=this.c
return a}},
kA:{"^":"a:0;",
$1:function(a){var z=a.gau().f
if(typeof z!=="number")return z.a4()
a.gau().f=z+1
return a}},
kB:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.d)}},
nQ:{"^":"eS;a,j:b<,c,d,T:e<",
a7:function(a){var z=new V.dp(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.eS))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.i(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntargetOnGround="+H.b(J.f(this.d))+",\ntime="+J.f(this.e)+",\n}"}},
dp:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gau().c},
gT:function(){return this.gau().f},
gau:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gau().b
x=this.gau().c
w=this.gau().d
v=this.gau().e
u=this.gau().f
z=new V.nQ(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("targetOnGround"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,D,{"^":"",
dE:function(a,b){var z=new D.dD(null,null,null,null,null)
new D.qf(a,b).$1(z)
return z.q()},
fn:{"^":"a4;",
gaZ:function(){return[Q.qD()]},
gi:function(){return"StrikeDownSituation"},
ax:function(){var z=new D.dD(null,null,null,null,null)
z.p(this)
new D.mX().$1(z)
return z.q()},
at:function(a,b){if(a===0)return b.ad(this.a)
return},
aB:function(a,b){return new H.H(a,new D.mY(this),[H.l(a,0)])}},
qf:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gaP().c=z
a.gaP().e=0
z=this.a.gj()
a.gaP().b=z
z=this.b.gj()
a.gaP().d=z
return a}},
mX:{"^":"a:0;",
$1:function(a){var z=a.gaP().e
if(typeof z!=="number")return z.a4()
a.gaP().e=z+1
return a}},
mY:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gj(),z.a)||J.i(a.gj(),z.c)}},
nW:{"^":"fn;a,j:b<,c,T:d<",
a7:function(a){var z=new D.dD(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fn))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.i(this.c,b.c)){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntargetOnGround="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
dD:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaP().c},
gT:function(){return this.gaP().e},
gaP:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaP().b
x=this.gaP().c
w=this.gaP().d
v=this.gaP().e
z=new D.nW(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("targetOnGround"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,K,{"^":"",dv:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",m7:{"^":"ag;W:b<,S:c<,O:d<,a",
gX:function(){return""},
gV:function(){return},
gi:function(){return"SlayMonstersAction"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dg(y.gbm())
w=b.a
v=x.jC(b)
w.al(0,v)
C.a.n(z,U.jA(new H.H(w,new D.m8(a,x),[H.l(w,0)]),v,x.r,y))
return H.b(a.gi())+" initiated combat with monsters in "+x.k(0)},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
L:function(a,b){var z=b.f
return H.a_(z.length!==0?C.a.gE(z):null,"$isac").c}},m8:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gb9()){z=a.gbe()
y=this.a.gbe()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbm()
y=this.b.gi()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",n6:{"^":"cq;W:c<,S:d<,O:e<,b,a",
gV:function(){return},
gi:function(){return"TakeExitAction"},
U:[function(a,b,c){throw H.c(new P.ad(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
c.n(0,z.gb_())
y=b.f
H.a_(y.length!==0?C.a.gE(y):null,"$isac").b3(b,a,z.giV(),c)
return H.b(a.gi())+" went through exit to "+z.a},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
L:function(a,b){var z=b.f
if(H.a_(z.length!==0?C.a.gE(z):null,"$isac").c===!0)return!1
this.b.gjm()
return!0},
t:{
rO:[function(a){return new Y.n6(!1,!1,null,a,null)},"$1","re",2,0,44]}}}],["","",,F,{"^":"",
f1:function(a,b){var z=new F.dy(null,null,null,null,null)
new F.q_(a,b).$1(z)
return z.q()},
ac:{"^":"a4;",
gaZ:function(){return[Y.re()]},
gbj:function(){var z=[]
C.a.al(z,$.$get$hc())
z.push($.$get$fa())
return z},
gi:function(){return"RoomRoamingSituation"},
ax:function(){var z=new F.dy(null,null,null,null,null)
z.p(this)
new F.lp().$1(z)
return z.q()},
at:function(a,b){return b.a.bn(0,new F.lq(),new F.lr())},
aB:function(a,b){var z=this.at(null,b)
if(z==null)return[]
return[z]},
fC:function(a,b){a.a.hN(new F.lt(),!0)},
b3:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dg(c)
a.fK(this.b,F.f1(z,z.gjB()!=null))
d.iC()
z.c.$3(b,a,d)
d.G(0,"\n\n",!0)
for(y=R.hq(b,a),y=P.U(y,!0,H.v(y,"x",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ap)(y),++v){u=a.ad(y[v].gj())
t=u.a7(new F.ls(z))
w.aS(0,u)
w.n(0,t)}},
dj:function(a){if(J.i(this.a,$.$get$e2().b))return!1
return!0}},
q_:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.gar().c=z
a.gar().e=0
z=this.a.gi()
a.gar().b=z
a.gar().d=this.b
return a}},
lp:{"^":"a:0;",
$1:function(a){var z=a.gar().e
if(typeof z!=="number")return z.a4()
a.gar().e=z+1
return a}},
lq:{"^":"a:0;",
$1:function(a){return a.gJ()===!0&&a.gb9()}},
lr:{"^":"a:1;",
$0:function(){return}},
lt:{"^":"a:0;",
$1:function(a){return!a.gbp()}},
ls:{"^":"a:0;a",
$1:function(a){a.sbm(this.a.b)
return a}},
nS:{"^":"ac;bm:a<,j:b<,c,T:d<",
a7:function(a){var z=new F.dy(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.ac))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.f(this.a))+",\nid="+J.f(this.b)+",\nmonstersAlive="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dy:{"^":"d;a,b,c,d,e",
gbm:function(){return this.gar().b},
sbm:function(a){this.gar().b=a
return a},
gj:function(){return this.gar().c},
sjD:function(a){this.gar().d=a
return a},
gT:function(){return this.gar().e},
gar:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gar().b
x=this.gar().c
w=this.gar().d
v=this.gar().e
z=new F.nS(y,x,w,v)
if(y==null)H.h(P.m("currentRoomName"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("monstersAlive"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,V,{"^":"",
n8:function(){var z=new V.dF(null,null,null)
new V.ql().$1(z)
return z.q()},
nj:function(){var z=new V.dG(null,null,null)
new V.qk().$1(z)
return z.q()},
mc:function(){var z=new V.dC(null,null,null)
new V.qj().$1(z)
return z.q()},
pY:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The journey from slavery to power begins with a single crack of a skull. Agruth, the orc-slaver, falls to the rock floor. You take his shortsword and with help from another slave, Briana, you move Agruth's body to a shady crevice in the tunnel's wall.\n\n\nYou are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten. [a][b][c][d]\n\n\n<p class=\"meta\">You can use the question mark (?) icons below to learn more about each option.</p>\n",!0)}},
pZ:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
jR:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"start_of_book"))return!1
return!0},
R:[function(a,b,c){c.n(0,'You go to church. Entering the church -- just before "The Church is\u2026"')
b.ap("RoomRoamingSituation").b3(b,N.az(b),"underground_church",c)
return H.b(a.gi())+" successfully performs FleeThroughNecromancersChurch"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,null)
c.n(0,'You go to church but someone notices a shadow (but doesn\'t pursue immediately). Entering the church -- just before "The Church is\u2026"')
N.ea(b,new V.jS())
b.ap("RoomRoamingSituation").b3(b,N.az(b),"underground_church",c)
return H.b(a.gi())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
M:function(a,b){return 0.9},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"The Underground Church is \u2026 It is much less patrolled, so you're more likely to slip through unnoticed. On the other hand, it's unclear who or what lurks there."},
gW:function(){return!1}},
jS:{"^":"a:0;",
$1:function(a){var z
a.gbD()
z=a.b
a.gbD()
a.b=z+1
return a}},
jT:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"start_of_book"))return!1
return!0},
R:[function(a,b,c){c.n(0,'You go to war forgery (some hidden place there). Entering forges -- just before "The Forges are\u2026"')
b.ap("RoomRoamingSituation").b3(b,N.az(b),"war_forge",c)
return H.b(a.gi())+" successfully performs FleeThroughWarForge"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,null)
c.n(0,'You go to war forge but someone notices a shadow (but doesn\'t pursue immediately). Entering forges -- just before "The Forges are\u2026"')
N.ea(b,new V.jU())
b.ap("RoomRoamingSituation").b3(b,N.az(b),"war_forge",c)
return H.b(a.gi())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
M:function(a,b){return 0.7},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"The War Forges are where the war machines are built. It's a place that you are familiar with, and it's a more direct path to freedom. But these parts are also full of orcs."},
gW:function(){return!1}},
jU:{"^":"a:0;",
$1:function(a){var z
a.gbD()
z=a.b
a.gbD()
a.b=z+1
return a}},
lZ:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"start_of_book"))return!1
if(b.ip(this.c))return!1
return!0},
R:[function(a,b,c){c.n(0,"You search pockets and nothing.  There are some noises. You should be going. But the you realize if Agruth had something valuable on him, he would have it well hidden. You quickly check the inside of his vest and find [Blablabla], a drug. It gives extra energy when needed. This will come handy. (Your stamina increases by 1.)")
N.qI(b,1)
return H.b(a.gi())+" successfully performs SearchAgruth"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,null)
c.n(0,"You search but can't find anything. There are some noises. You should be going.")
return H.b(a.gi())+" fails to perform SearchAgruth"},"$3","gP",6,0,2],
M:function(a,b){return 0.1},
gS:function(){return!0},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return C.d},
gV:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gW:function(){return!1}},
pW:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
pX:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pU:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
pV:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pS:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a_(b.c,"$isbP").b>=1)c.G(0,"You hear orders being yelled somewhere behind you.",!0)
c.G(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
pT:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pP:{"^":"a:3;",
$3:function(a,b,c){c.G(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a_(b.c,"$isbP").b>=1)c.G(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.G(0,"\nYou find a corridor to the left. Next to it you spy a crevice apparently leading in the same direction.\n",!0)}},
pR:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pN:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
pO:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pL:{"^":"a:3;",
$3:function(a,b,c){c.G(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
pM:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
pJ:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.iq("sneak_onto_cart"))c.G(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.G(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.G(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
pK:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
pH:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
pI:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
qq:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
pG:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The stone gate looms before you.\n",!0)}},
m9:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"mountain_pass_gate"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.ea(b,new V.ma())
b.ap("RoomRoamingSituation").b3(b,N.az(b),"mountain_pass",c)
return H.b(a.gi())+" successfully performs SneakOntoCart"},"$3","gN",6,0,2],
U:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
M:function(a,b){return 1},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gW:function(){return!1}},
ma:{"^":"a:0;",
$1:function(a){a.gbD()
a.a=!0
return a}},
n7:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"mountain_pass_gate"))return!1
if(b.jU(this.c)!=null)return!1
return!0},
R:[function(a,b,c){c.n(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a3(a.gj(),new V.ng())
return H.b(a.gi())+" successfully performs TakeOutGateGuards"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.n(b.f,V.n8())
return H.b(a.gi())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
M:function(a,b){return 0.5},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gW:function(){return!1}},
ng:{"^":"a:0;",
$1:function(a){var z=a.gbg()
if(typeof z!=="number")return z.a4()
a.sbg(z+10)
return a}},
fr:{"^":"a4;",
gbj:function(){return[new A.bB(new V.nb(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",null),new A.bB(new V.nc(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",null)]},
gi:function(){return"take_out_gate_guards"},
ax:function(){var z=new V.dF(null,null,null)
z.p(this)
new V.nd().$1(z)
return z.q()},
at:function(a,b){if(a!==0)return
return b.a.aC(0,new V.ne())},
aB:function(a,b){return[a.aC(0,new V.nf())]}},
ql:{"^":"a:0;",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
nb:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aI(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a3(a.gj(),new V.n9())
b.a3(a.gj(),new V.na())
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
n9:{"^":"a:0;",
$1:function(a){var z=a.gaV()
if(typeof z!=="number")return z.aK()
a.saV(z-1)
return a}},
na:{"^":"a:0;",
$1:function(a){var z=a.gbg()
if(typeof z!=="number")return z.a4()
a.sbg(z+10)
return a}},
nc:{"^":"a:7;",
$4:function(a,b,c,d){J.aI(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.ee()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
nd:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a4()
a.ga2().c=z+1
return a}},
ne:{"^":"a:0;",
$1:function(a){return a.gJ()}},
nf:{"^":"a:0;",
$1:function(a){return a.gJ()}},
qo:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
qp:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
qm:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
qn:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
nh:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ap("RoomRoamingSituation").b3(b,N.az(b),"mountainside_base",c)
return H.b(a.gi())+" successfully performs ThreatenWingedSerpent"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.n(b.f,V.nj())
return H.b(a.gi())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
M:function(a,b){return 0.3},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gW:function(){return!1}},
fw:{"^":"a4;",
gbj:function(){return[new A.bB(new V.nl(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",null),new A.bB(new V.nm(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",null)]},
gi:function(){return"threaten_winged_serpent"},
ax:function(){var z=new V.dG(null,null,null)
z.p(this)
new V.nn().$1(z)
return z.q()},
at:function(a,b){if(a!==0)return
return b.a.aC(0,new V.no())},
aB:function(a,b){return[a.aC(0,new V.np())]}},
qk:{"^":"a:0;",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
nl:{"^":"a:7;",
$4:function(a,b,c,d){J.aI(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ap("RoomRoamingSituation").b3(b,N.az(b),"mountainside_base",c)
b.ee()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nm:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aI(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.nk())
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
nk:{"^":"a:0;",
$1:function(a){a.san(0)
return a}},
nn:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a4()
a.ga2().c=z+1
return a}},
no:{"^":"a:0;",
$1:function(a){return a.gJ()}},
np:{"^":"a:0;",
$1:function(a){return a.gJ()}},
mb:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ap("RoomRoamingSituation").b3(b,N.az(b),"mountainside_base",c)
return H.b(a.gi())+" successfully performs SootheWingedSerpent"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.n(b.f,V.mc())
return H.b(a.gi())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
M:function(a,b){return 0.8},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gW:function(){return!1}},
fc:{"^":"a4;",
gbj:function(){return[new A.bB(new V.me(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",null),new A.bB(new V.mf(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",null)]},
gi:function(){return"soothe_winged_serpent"},
ax:function(){var z=new V.dC(null,null,null)
z.p(this)
new V.mg().$1(z)
return z.q()},
at:function(a,b){if(a!==0)return
return b.a.aC(0,new V.mh())},
aB:function(a,b){return[a.aC(0,new V.mi())]}},
qj:{"^":"a:0;",
$1:function(a){var z=$.$get$a6().aa(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
me:{"^":"a:7;",
$4:function(a,b,c,d){J.aI(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ap("RoomRoamingSituation").b3(b,N.az(b),"mountainside_base",c)
b.ee()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
mf:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aI(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.md())
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
md:{"^":"a:0;",
$1:function(a){a.san(0)
return a}},
mg:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a4()
a.ga2().c=z+1
return a}},
mh:{"^":"a:0;",
$1:function(a){return a.gJ()}},
mi:{"^":"a:0;",
$1:function(a){return a.gJ()}},
ni:{"^":"aE;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a_(z.length!==0?C.a.gE(z):null,"$isac").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ap("RoomRoamingSituation").b3(b,N.az(b),"mountainside_base",c)
return H.b(a.gi())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gN",6,0,2],
U:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
M:function(a,b){return 1},
gS:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"Perhaps you can divert its attention."},
gW:function(){return!1}},
q0:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
qb:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
pF:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
pQ:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
nX:{"^":"fr;j:a<,T:b<",
a7:function(a){var z=new V.dF(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fr))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dF:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gT:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.nX(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}},
nZ:{"^":"fw;j:a<,T:b<",
a7:function(a){var z=new V.dG(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fw))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dG:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gT:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.nZ(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}},
nV:{"^":"fc;j:a<,T:b<",
a7:function(a){var z=new V.dC(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fc))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dC:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gT:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.nV(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,N,{"^":"",
az:function(a){return a.gir().aC(0,new N.qG())},
dX:function(){return R.br(1000+$.$get$dY().aa(99999),"orc",O.cW(),null,new U.c0(!1,10,!0,$.$get$b2(),"sword",C.c),null,0,2,0,!1,2,!1,C.t,0,$.$get$cV())},
h3:function(){return R.br(1000+$.$get$dY().aa(99999),"goblin",O.cW(),null,new U.c0(!1,10,!0,$.$get$b2(),"scimitar",C.c),null,0,1,0,!1,1,!1,C.t,0,$.$get$cV())},
rY:[function(a){return[N.dX(),N.h3()]},"$1","ri",2,0,22],
t0:[function(a){if(a.f4("take_out_gate_guards")||a.f4("take_out_gate_guards_rescue"))return[N.dX()]
else return[N.dX(),N.h3()]},"$1","rj",2,0,22],
qI:function(a,b){a.a3(N.az(a).gj(),new N.qJ(b))},
ea:function(a,b){var z,y
z=H.a_(a.c,"$isbP")
z.toString
y=new M.dJ(null,!1,0)
y.p(z)
a.c=b.$1(y).q()},
qG:{"^":"a:0;",
$1:function(a){return a.gJ()}},
qJ:{"^":"a:0;a",
$1:function(a){var z=a.gaV()
if(typeof z!=="number")return z.a4()
a.saV(z+this.a)
return a}}}],["","",,O,{"^":"",
rX:[function(a){var z,y
z=$.$get$d_()
y=z.w
if(y.length>0){y+=" "
z.w=y}z.w=y+a},"$1","r0",2,0,12],
rZ:[function(a){$.e5=a},"$1","r1",2,0,12],
hi:[function(a,b,c,d,e,f,g){var z=L.el(a,!1,!1,d,e,f,g)
$.$get$bK().n(0,z)
return z},function(a){return O.hi(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hi(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","r_",2,13,47,0,0,0,1,1,0],
lA:{"^":"lM;",
bf:function(){var z=0,y=P.ar(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bf=P.ao(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cJ){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.D(m.B())
m=t.Q
n=Z.mu()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.B()
m.a.D(l.B())
new P.C(0,$.n,null,[null]).bh(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.D(m.B())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.c2(0)
m.a.D(n.B())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.D(m.B())
w=7
z=10
return P.an(t.ca(),$async$bf)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.ci){r=n
q=H.A(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.r(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.D(l.B())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.r(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.D(l.B())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.i(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.D(m.B())
case 1:return P.av(x,y)
case 2:return P.au(v,y)}})
return P.aw($async$bf,y)},
eh:function(){var z,y
this.eP()
this.f.aQ(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fK(Z.bD())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bD()
z.a.D(y.B())
this.bf()},
kf:[function(a){var z,y
z={}
z.a=null
y=$.$get$bK()
y.K(0,new O.lX(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.f(y)+")"))
this.i3(z)
this.bf()},"$1","ghP",2,0,31],
i3:function(a){var z
if(a.gfh()!=null){z=a.r
$.$get$c7().aq(z)}z=a.x
if(z!=null)this.dR(z)},
ca:function(){var z=0,y=P.ar(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$ca=P.ao(function(a,a0){if(a===1)return P.au(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$c8()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.r(667,null,null,null,null)
q.c="Awarding points."
u.a.D(q.B())
p=r.b.d4()
r=v.Q
q=p.giE()
u=p.b
o=p.c
r.toString
n=new A.r(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.D(n.B())
r=new P.C(0,$.n,null,[null])
r.bh(null)
r.bL(new O.lN(v))
x=!0
z=1
break}m=v.x===v.e.gam().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gam().length){r=v.e.gam()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.e(r,o)
z=1
break}o=!!J.o(r[o]).$isI
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.r(667,null,null,null,null)
k.c=r
o.a.D(k.B())
k=$.$get$bK()
k.hM(new O.lO(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.r(667,null,null,null,null)
o.c="We have choices."
r.a.D(o.B())
o=H.v(k,"aX",0)
o=P.U(new H.H(k,new O.lP(u,l),[o]),!0,o)
r=k.a
H.t([],[L.Z])
j=new L.em(r,o)
if(!j.gI(j)){u=v.Q
r=u.e
if(r!=null){r.cY(new D.bN("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.c1(new P.C(0,$.n,null,[r]),[r])
r=j.d8()
u.a.D(r.B())
u=u.e.a.bL(v.ghP())
i=new O.lQ(v)
r=H.l(u,0)
q=$.n
if(q!==C.f){i=P.dZ(i,q)
q.toString}u.cL(new P.dQ(null,new P.C(0,q,null,[r]),6,new O.lR(),i,[r,r]))
x=!0
z=1
break}else{h=k.bn(0,new O.lS(),new O.lT())
if(h!=null){if(h.gfh()!=null){r=h.r
$.$get$c7().aq(r)}r=h.x
if(r!=null)v.dR(r)
k.aS(0,h)}}}r=$.$get$c7()
o=r.b
g=r.c
z=o!==g?3:4
break
case 3:++r.d
u=r.a
q=u.length
g=(g-1&q-1)>>>0
r.c=g
if(g<0||g>=q){x=H.e(u,g)
z=1
break}f=u[g]
u[g]=null
z=5
return P.an(v.cc(f),$async$ca)
case 5:x=a0
z=1
break
case 4:r=$.e5
if(r!=null){v.dR(r)
$.e5=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gam().length-1
v.x=r}else if($.h6)$.h6=!1
else{++r
v.x=r}u.a=r===v.e.gam().length-1
r="Resolving block: '"+H.b(v.e.gi())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.r(667,null,null,null,null)
o.c=r
q.a.D(o.B())
if(v.x===v.e.gam().length){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="End of book."
u.a.D(r.B())
r=v.Q
u=v.dz()
r.toString
u=u.el(50)
r.a.D(u.B())
v.Q.a.D(new A.r(80,null,null,null,null).B())
x=!0
z=1
break}r=v.e.gam()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gam()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.W
u.f=new P.c1(new P.C(0,$.n,null,[r]),[r])
r=new A.r(30,null,null,null,null)
r.c=q
u.a.D(r.B())
u.f.a.bL(new O.lU(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gam()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.o(r[q]).$isI?9:11
break
case 9:r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.D(q.B())
try{r=v.e.gam()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.iB(r[q])}catch(b){u=H.z(b)
if(u instanceof M.ci){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.r(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.D(q.B())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="- choices added"
r.a.D(q.B())
if(k.bV(0,new O.lV(u,v))&&v.x===v.e.gam().length-1){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.D(r.B())
r=v.Q
u=v.dz()
r.toString
u=u.el(50)
r.a.D(u.B())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gam()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.L,P.ai]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gam().length-1?v.dz():null
q=v.e.gam()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.an(v.cc(H.hn(q[o],r)),$async$ca)
case 15:c=a0
if(k.bV(0,new O.lW(u,v))&&v.x===v.e.gam().length-1){u=v.Q
u.toString
r=d.el(50)
u.a.D(r.B())}x=c
z=1
break
z=13
break
case 14:u=v.e.gam()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.F("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.av(x,y)}})
return P.aw($async$ca,y)},
dR:function(a){var z,y,x,w,v
z=$.$get$cm()
if(z.b.test(H.bl(a))){y=this.d
if(y==null)throw H.c(new P.F("Cannot use ["+J.f(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aK()
w=z-1}else{x=this.b.df(a,this.e.gdh())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.n(0,H.b(z.gi())+">>"+H.b(y.gi()))
this.r=!0}if(this.f.Z(0,H.b(this.e.gi())+">>"+H.b(x.gi()))||x.gfU()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfU()
else z=!1}else z=!1
$.h4=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.D(v.B())
v=this.e
this.d=new O.lB(v,this.x)
this.e=x
this.x=w
v.e=J.a0(v.gd9(),1)},
eP:function(){var z,y,x,w,v,u
this.x=null
$.$get$c7().aQ(0)
$.$get$bK().sl(0,0)
$.pk=null
x=$.$get$cb()
x.aQ(0)
w=$.$get$c8()
x.m(0,"points",w)
w.a=0
w.b.aQ(0)
this.b.iG()
$.hv=!0
try{this.jg()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.D(u.B())
throw H.c(z)}this.fH()
$.hv=!1},
cc:function(a){var z=0,y=P.ar(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$cc=P.ao(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d_()
q.w=""
w=4
z=7
return P.an(a.$0(),$async$cc)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.w+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.f(s)
o=t.e.gi()
n=t.x
throw H.c(new M.ci(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.w.length!==0){t.Q.es(J.f(q)).bL(new O.lY(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.av(x,y)
case 2:return P.au(v,y)}})
return P.aw($async$cc,y)},
hW:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cm().b.test(H.bl(z)))return!1
y=this.b.df(z,this.e.gdh())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.D(w.B())
return!0}y.gk6()
return!1},"$1","geT",2,0,48],
dz:function(){var z,y,x,w,v,u
this.fH()
try{x=this.e.gi()
w=$.$get$cb()
x=new Z.f2(x,this.b.j0(),null,null,null,null)
x.c=H.aA(Z.cF(w),"$isD",[P.q,P.d],"$asD")
x.f=Date.now()
x.e=C.e.k_(H.as(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.D(u.B())
throw H.c(z)}},
ft:function(a,b){var z,y,x
this.eP()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.db("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.D(x.B())
z.jd(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Importing player chronology."
z.a.D(y.B())
this.f.al(0,b)}z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.D(y.B())
y=$.$get$cb()
Z.lx(a,y,P.di(P.q,P.bv))
this.cx=H.a_(y.h(0,"game"),"$iset")
this.cy=H.aA(y.h(0,"hitpoints"),"$isaj",[P.aH],"$asaj")
z=[P.u]
this.db=H.aA(y.h(0,"stamina"),"$isaj",z,"$asaj")
this.dx=H.aA(y.h(0,"gold"),"$isaj",z,"$asaj")
z=this.Q
Z.fK(Z.bD())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bD()
z.a.D(y.B())
y=this.Q
y.toString
z=new A.r(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.D(z.B())
this.bf()},
jw:function(a){return this.ft(a,null)},
dk:[function(a,b,c,d){var z=0,y=P.ar(),x,w=this,v,u,t
var $async$dk=P.ao(function(e,f){if(e===1)return P.au(f,y)
while(true)switch(z){case 0:v=$.$get$d_()
if(v.w.length!==0){w.Q.es(J.f(v))
v.w=""}v=w.Q
v.toString
u=new A.r(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.D(u.B())
u=U.bZ
t=new P.C(0,$.n,null,[u])
v.x=new P.c1(t,[u])
x=t
z=1
break
case 1:return P.av(x,y)}})
return P.aw($async$dk,y)},function(a,b){return this.dk(a,b,null,!1)},"kb","$4$rerollEffectDescription$rerollable","$2","ghd",4,5,33,1,0]},
lX:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.seu(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.D(x.B())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cm().b.test(H.bl(z))?y.d.a:y.b.df(z,y.e.gdh())
if(w!=null){y.f.n(0,H.b(y.e.gi())+">>"+H.b(w.gi()))
y.r=!0}}}}},
lN:{"^":"a:0;a",
$1:function(a){return this.a.bf()}},
lO:{"^":"a:0;a",
$1:function(a){return a.geu()||this.a.hW(a)}},
lP:{"^":"a:34;a,b",
$1:function(a){return a.jn(this.b,this.a.a)}},
lQ:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.D(x.B())
return}},
lR:{"^":"a:0;",
$1:function(a){return a instanceof D.bN}},
lS:{"^":"a:0;",
$1:function(a){return a.gjo()}},
lT:{"^":"a:1;",
$0:function(){return}},
lU:{"^":"a:0;a",
$1:function(a){return this.a.bf()}},
lV:{"^":"a:0;a,b",
$1:function(a){return a.d_(!0,this.a.a,this.b.geT())}},
lW:{"^":"a:0;a,b",
$1:function(a){return a.d_(!0,this.a.a,this.b.geT())}},
lY:{"^":"a:0;a",
$1:function(a){return this.a.bf()}},
kZ:{"^":"d;a,b,fc:c<",
it:function(a,b,c){var z
if(!$.h4){z=J.a0(this.a,b)
this.a=z
this.b.aq(new A.cy(b,z,c))}},
n:function(a,b){return this.it(a,b,null)},
a4:function(a,b){this.n(0,b)
return this},
B:function(){return P.aa(["points",this.a])},
fT:function(a){this.a=a.h(0,"points")
this.b.aQ(0)},
hm:function(){this.b=P.aY(null,A.cy)},
$isdz:1},
cG:{"^":"kI;am:d<,d9:e@,a,b,c",
gfU:function(){return J.a1(this.e,0)}},
lB:{"^":"d;a,b"},
lI:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
df:function(a,b){var z
if(b!=null&&this.a.a_(b+": "+H.b(a)))return this.a.h(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a_(a))return z.h(0,a)
else return}},
m:function(a,b,c){this.a.m(0,b,c)
c.si(b)},
j0:function(){var z=new H.M(0,null,null,null,null,null,0,[P.q,null])
this.a.K(0,new O.lK(z))
return z},
jd:function(a){a.K(0,new O.lL(this))},
iG:function(){this.a.K(0,new O.lJ())}},
lK:{"^":"a:6;a",
$2:function(a,b){this.a.m(0,a,P.aa(["visitCount",b.gd9()]))}},
lL:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.a_(a))z.h(0,a).sd9(J.aq(b,"visitCount"))}},
lJ:{"^":"a:6;",
$2:function(a,b){b.sd9(0)}}}],["","",,M,{"^":"",ci:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
t:{
eg:function(a){return new M.ci(a,null,null)}}}}],["","",,M,{"^":"",lM:{"^":"d;"}}],["","",,Z,{"^":"",f2:{"^":"d;a,b,c,d,e,f",
el:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.r(a,null,null,null,null)
z.c=this.d7()
return z},
d7:function(){var z,y
z=new H.M(0,null,null,null,null,null,0,[P.q,null])
z.m(0,"uid",this.e)
z.m(0,"currentPageName",this.a)
z.m(0,"pageMapState",this.b)
z.m(0,"vars",this.c)
z.m(0,"timestamp",this.f)
y=this.d
if(y!=null)z.m(0,"previousText",y)
return C.v.fg(z)},
k:function(a){return this.d7()},
t:{
f3:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isI||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdz},
cF:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)if(Z.f3(z.h(a,x)))y.push(Z.cF(z.h(a,x)))
return y}else if(!!z.$isD){w=new H.M(0,null,null,null,null,null,0,[null,null])
z.K(a,new Z.lw(a,w))
return w}else if(!!z.$isdz){v=a.B()
v.m(0,"_class",a.gfc())
return Z.cF(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cE:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cE(z.h(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.a_("_class")){v=new H.M(0,null,null,null,null,null,0,[null,null])
z.K(a,new Z.lv(b,v))
return v}else if(w&&a.a_("_class"))if(c!=null){c.fT(a)
return c}else{u=z.h(a,"_class")
if(!b.a_(u))throw H.c(new Z.db("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
lx:function(a,b,c){a.c.K(0,new Z.ly(b,c))}}},lw:{"^":"a:6;a,b",
$2:function(a,b){if(Z.f3(this.a.h(0,a)))this.b.m(0,a,Z.cF(b))}},lv:{"^":"a:6;a,b",
$2:function(a,b){this.b.m(0,a,Z.cE(b,this.a,null))}},ly:{"^":"a:35;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.m(0,a,Z.cE(b,x,null))
else z.m(0,a,Z.cE(b,x,y))}},db:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},jX:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",l3:{"^":"d;"},l2:{"^":"l3;"},k4:{"^":"l2;a,b,c,d,e,f,r,x",
kj:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aA(a,"$isD",n,"$asD")
m=new A.r(a.h(0,"type"),null,null,null,null)
if(a.a_("strContent"))m.c=a.h(0,"strContent")
if(a.a_("listContent"))m.b=a.h(0,"listContent")
if(a.a_("intContent"))m.d=a.h(0,"intContent")
if(a.a_("mapContent"))m.e=H.aA(a.h(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.gem()){case 1070:o=this.e
if(o!=null){o.cY(new D.bN("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.b7()
o.b.b7()
return
case 1000:o=new A.r(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.D(o.B())
n.D(new A.r(10,null,this.c.ch,null,null).B())
return
case 1050:l=z.gjh()
this.e.bH(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.D(o.B())
o=z.gjy()
if(!o.a_("__submitted__"))o.m(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.c5())
n.bE(new G.j1(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.D(o.B())
k=J.aq(z.geb(),0)
j=J.aq(z.geb(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.bH(new U.bZ(C.y[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.D(o.B())
o=this.e
if(o!=null){o.cY(new D.bN("Book Restart before choice was selected."))
this.e=null}try{this.c.eh()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.D(o.B())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bD()
n.D(o.B())
n.D(new A.cy(0,0,null).d8().B())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.D(h.B())
h=this.e
if(h!=null){h.cY(new D.bN("Book Load before choice was selected."))
this.e=null}try{h=z.ghh()
f=new Z.f2(null,null,null,null,null,null)
e=H.aA(C.v.iN(h),"$isD",n,"$asD")
if(!e.a_("currentPageName")||!e.a_("vars"))H.h(new Z.jX("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.aA(e.h(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.aA(e.h(0,"vars"),"$isD",n,"$asD")
if(e.a_("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.aA(J.i0(z.geb()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.ft(w,v)
else o.jw(w)}catch(i){o=H.z(i)
if(o instanceof Z.db){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.D(o.B())
this.c.eh()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.D(o.B())
this.c.eh()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bD()
g.D(o.B())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.D(o.B())
throw H.c(q)}this.c.toString
g.D(new A.cy(0,$.$get$c8().a,null).d8().B())
return
case 1090:this.f.bH(!0)
this.f=null
return
case 1040:this.c.bf()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gem())+"."
this.a.D(o.B())}},"$1","gi1",2,0,17],
es:function(a){var z=P.W
this.f=new P.c1(new P.C(0,$.n,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.D(z.B())
return this.f.a}},bN:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",j1:{"^":"d;a",
B:function(){return P.bU(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;em:a<,eb:b<,hh:c<,jh:d<,jy:e<",
gk5:function(){var z=this.a
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
d7:function(){return C.v.fg(this.B())},
B:function(){var z,y
z=new H.M(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"type",this.a)
y=this.c
if(y!=null)z.m(0,"strContent",y)
y=this.b
if(y!=null)z.m(0,"listContent",y)
y=this.d
if(y!=null)z.m(0,"intContent",y)
y=this.e
if(y!=null)z.m(0,"mapContent",y)
return z},
k:function(a){var z,y,x
z="Message "+this.gk5()
y=this.a
x=J.o(y)
return z+(x.v(y,50)||x.v(y,60)||x.v(y,90)||x.v(y,100)||x.v(y,666)||x.v(y,667)?" (async)":"")}}}],["","",,E,{"^":"",kI:{"^":"d;i:a@,k6:b<",
k:function(a){return this.a},
gdh:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.hV(z,": ")
if(y>0)return J.i_(this.a,0,y)
else return}}}],["","",,A,{"^":"",cy:{"^":"d;iE:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
d8:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",Z:{"^":"d;eu:a@,b,c,d,aJ:e<,V:f<,fh:r<,x,y",
gjo:function(){return this.e.length===0},
d_:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jn:function(a,b){return this.d_(a,b,null)},
jY:function(){return P.aa(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bL:function(a){this.r=a
return this},
bl:function(a,b){return C.b.bl(this.e,b.gaJ())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hk:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bm(a).fR(a)
this.d=C.b.gA(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.Z]},
t:{
el:function(a,b,c,d,e,f,g){var z=new L.Z(!1,null,null,null,null,e,null,d,g)
z.hk(a,!1,!1,d,e,f,g)
return z}}},em:{"^":"eL;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
iB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.aq(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.o(a[0]).$isbv}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eg(J.f(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.L,P.ai]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aq(y,"string")!=null&&!!J.o(J.aq(y,"string")).$isbv)try{x=J.aq(y,"string").$0()}catch(u){w=H.z(u)
v=M.eg(J.f(w))
throw H.c(v)}else x=""
r=x
q=J.aq(y,"goto")
p=H.hn(J.aq(y,"script"),t)
o=new L.Z(!1,null,null,null,null,null,null,q,J.aq(y,"submenu"))
if(r==null)H.h(P.E("String given to choice cannot be null."))
o.e=J.bm(r).fR(r)
o.d=C.b.gA(r)
o.r=p
o.b=!1
o.c=!1
C.a.n(v,o)}},
iz:function(a,b,c,d,e,f,g){if(b instanceof L.Z)C.a.n(this.b,b)
else if(typeof b==="string")C.a.n(this.b,L.el(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
n:function(a,b){return this.iz(a,b,!1,!1,null,null,null)},
jZ:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.l(z,0)
x=P.U(new H.H(z,new L.iH(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.r(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.K(x,new L.iI(w))
return w},
d8:function(){return this.jZ(null,null,null,null)},
k:function(a){var z=this.b
return new H.ah(z,new L.iJ(),[H.l(z,0),null]).cq(0,", ")},
$aseL:function(){return[L.Z]},
$aseQ:function(){return[L.Z]},
$asI:function(){return[L.Z]},
$asS:function(){return[L.Z]}},iH:{"^":"a:0;a,b,c",
$1:function(a){return a.d_(this.b,this.a,this.c)}},iI:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aI(this.a.b,a.jY())
a.a=!0}},iJ:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cH:{"^":"d;cJ:a<,aJ:b<",
B:function(){return P.aa(["show",this.a,"string",this.b])}},mr:{"^":"d;a",
B:function(){var z=new H.M(0,null,null,null,null,null,0,[P.q,P.d])
this.a.K(0,new Z.ms(z))
return z},
K:function(a,b){this.a.K(0,b)}},ms:{"^":"a:36;a",
$2:function(a,b){this.a.m(0,a,b.B())}},fJ:{"^":"d;i:a@,b_:b<,fd:c<,d3:d<,cJ:e<,fB:f<,aJ:r<",t:{
fK:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t(new Array(a.length),[Z.fJ])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ap)(a),++v){u=a[v]
t=J.J(u)
s=t.h(u,"name")
r=t.h(u,"description")
q=t.h(u,"color")
p=t.h(u,"priority")
o=t.h(u,"show")
n=t.h(u,"notifyOnChange")
t=t.h(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fJ(s,r,q,p,o,n,t);++w}C.a.cK(z,new Z.nw())
return z}}},nw:{"^":"a:6;",
$2:function(a,b){return J.aB(b.gd3(),a.gd3())}},aj:{"^":"d;i:a<,b_:b<,c,fd:d<,d3:e<,f,r,fB:x<,fa:y@,fc:z<,$ti",
gao:function(){return this.f},
sao:function(a){if(!J.i(this.f,a)){this.f=a
this.y=!0
$.cJ=!0}},
gcJ:function(){return this.r},
gaJ:function(){return this.c.$1(this.f)},
B:function(){return P.aa(["name",this.a,"value",this.f,"show",this.r])},
fT:function(a){var z
this.sao(H.hH(a.h(0,"value"),H.l(this,0)))
z=a.h(0,"show")
if(!J.i(this.r,z)){this.r=z
this.y=!0
$.cJ=!0}},
$isdz:1,
t:{
bC:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cI()
y=z.a_(a)?H.aA(z.h(0,a),"$isaj",[h],"$asaj"):new Z.aj(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.hH(e,h)
y.r=!0
z.m(0,a,y)
return y},
mu:function(){var z,y
z=new Z.mr(new H.M(0,null,null,null,null,null,0,[P.q,Z.cH]))
y=$.$get$cI().gc3()
new H.H(y,new Z.mv(),[H.v(y,"x",0)]).K(0,new Z.mw(z))
$.cJ=!1
return z},
bD:function(){var z=H.t([],[[P.D,P.q,P.d]])
$.$get$cI().gc3().K(0,new Z.mt(z))
return z}}},mv:{"^":"a:0;",
$1:function(a){return a.gfa()}},mw:{"^":"a:20;a",
$1:function(a){var z,y
z=a.gcJ()
y=a.gaJ()
a.sfa(!1)
this.a.a.m(0,a.a,new Z.cH(z,y))}},mt:{"^":"a:20;a",
$1:function(a){var z=new H.M(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"name",a.gi())
z.m(0,"description",a.gb_())
z.m(0,"color",a.gfd())
z.m(0,"priority",a.gd3())
z.m(0,"show",a.gcJ())
z.m(0,"notifyOnChange",a.gfB())
z.m(0,"string",a.gaJ())
this.a.push(z)}}}],["","",,N,{"^":"",dk:{"^":"d;i:a<,b,c,hD:d<,e,f",
gfl:function(){var z,y,x
z=this.b
y=z==null||J.i(z.gi(),"")
x=this.a
return y?x:z.gfl()+"."+x},
gea:function(){if($.ht){var z=this.b
if(z!=null)return z.gea()}return $.pr},
jx:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gea().b){if(!!J.o(b).$isbv)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.f(b)}else v=null
if(d==null&&x>=$.qY.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.n
x=b
w=this.gfl()
t=c
s=d
r=Date.now()
q=$.eM
$.eM=q+1
p=new N.km(a,x,v,w,new P.co(r,!1),q,t,s,e)
if($.ht)for(o=this;o!=null;){o.eW(p)
o=o.b}else $.$get$eO().eW(p)}},
bY:function(a,b,c,d){return this.jx(a,b,c,d,null)},
j3:function(a,b,c){return this.bY(C.Q,a,b,c)},
a5:function(a){return this.j3(a,null,null)},
j2:function(a,b,c){return this.bY(C.P,a,b,c)},
b0:function(a){return this.j2(a,null,null)},
j1:function(a,b,c){return this.bY(C.R,a,b,c)},
by:function(a){return this.j1(a,null,null)},
jf:function(a,b,c){return this.bY(C.x,a,b,c)},
fs:function(a){return this.jf(a,null,null)},
k7:function(a,b,c){return this.bY(C.U,a,b,c)},
en:function(a){return this.k7(a,null,null)},
hc:function(a,b,c){return this.bY(C.T,a,b,c)},
di:function(a){return this.hc(a,null,null)},
eW:function(a){},
t:{
b5:function(a){return $.$get$eN().jK(a,new N.q5(a))}}},q5:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dm(z,"."))H.h(P.E("name shouldn't start with a '.'"))
y=C.b.ju(z,".")
if(y===-1)x=z!==""?N.b5(""):null
else{x=N.b5(C.b.aE(z,0,y))
z=C.b.bt(z,y+1)}w=new H.M(0,null,null,null,null,null,0,[P.q,N.dk])
w=new N.dk(z,x,null,w,new P.fM(w,[null,null]),null)
if(x!=null)x.ghD().m(0,z,w)
return w}},aK:{"^":"d;i:a<,ao:b<",
v:function(a,b){if(b==null)return!1
return b instanceof N.aK&&this.b===b.b},
aH:function(a,b){return C.e.aH(this.b,b.gao())},
bO:function(a,b){return C.e.bO(this.b,b.gao())},
bC:function(a,b){var z=b.gao()
if(typeof z!=="number")return H.y(z)
return this.b>z},
bA:function(a,b){return this.b>=b.gao()},
bl:function(a,b){var z=b.gao()
if(typeof z!=="number")return H.y(z)
return this.b-z},
gA:function(a){return this.b},
k:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aK]}},km:{"^":"d;ea:a<,b,ay:c<,d,T:e<,f,b8:r<,b6:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bn:function(a){return X.cR(J.hS(a,0,new X.qK()))},
aR:function(a,b){var z=J.a0(a,b)
if(typeof z!=="number")return H.y(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cR:function(a){if(typeof a!=="number")return H.y(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
qK:{"^":"a:6;",
$2:function(a,b){return X.aR(a,J.j(b))}}}],["","",,U,{"^":"",cD:{"^":"d;a,b",
k:function(a){return this.b}},bZ:{"^":"d;a,k8:b<",
ge8:function(){return this.a===C.A},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
v:function(a,b){if(b==null)return!1
return b instanceof U.bZ&&b.a===this.a&&J.i(b.b,this.b)},
gA:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
t_:[function(a,b){var z,y,x,w,v
z=new D.k4(b,null,null,null,null,null,null,null)
y=$.f_
$.f_=y+1
x=new H.bX(y,null,!1)
w=init.globalState.d
w.dr(y,x)
w.cj()
w=new H.lh(x,null)
w.hn(x)
z.b=w
w=w.b
w.toString
new P.cL(w,[H.l(w,0)]).as(z.gi1(),null,null,null)
b.D(new H.c5(z.b.a,init.globalState.d.a))
v=N.lD()
z.c=v
v.Q=z},"$2","hj",4,0,32]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eE.prototype
return J.k6.prototype}if(typeof a=="string")return J.bT.prototype
if(a==null)return J.eF.prototype
if(typeof a=="boolean")return J.eD.prototype
if(a.constructor==Array)return J.bR.prototype
if(!(a instanceof P.d))return J.bf.prototype
return a}
J.aS=function(a){if(a==null)return a
if(a.constructor==Array)return J.bR.prototype
if(!(a instanceof P.d))return J.bf.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.bT.prototype
if(a==null)return a
if(a.constructor==Array)return J.bR.prototype
if(!(a instanceof P.d))return J.bf.prototype
return a}
J.ae=function(a){if(typeof a=="number")return J.bS.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bf.prototype
return a}
J.e4=function(a){if(typeof a=="number")return J.bS.prototype
if(typeof a=="string")return J.bT.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bf.prototype
return a}
J.bm=function(a){if(typeof a=="string")return J.bT.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bf.prototype
return a}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.e4(a).a4(a,b)}
J.bo=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ae(a).cF(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).v(a,b)}
J.a1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ae(a).bC(a,b)}
J.cc=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ae(a).aH(a,b)}
J.bp=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.e4(a).bP(a,b)}
J.hQ=function(a){if(typeof a=="number")return-a
return J.ae(a).eq(a)}
J.aB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ae(a).aK(a,b)}
J.aq=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).h(a,b)}
J.aI=function(a,b){return J.aS(a).n(a,b)}
J.cd=function(a,b){return J.e4(a).bl(a,b)}
J.hR=function(a,b){return J.J(a).Z(a,b)}
J.eb=function(a,b){return J.aS(a).ag(a,b)}
J.hS=function(a,b,c){return J.aS(a).b1(a,b,c)}
J.j=function(a){return J.o(a).gA(a)}
J.ec=function(a){return J.J(a).gI(a)}
J.af=function(a){return J.aS(a).gY(a)}
J.hT=function(a){return J.aS(a).gE(a)}
J.aC=function(a){return J.J(a).gl(a)}
J.hU=function(a){return J.o(a).gbd(a)}
J.hV=function(a,b){return J.J(a).bo(a,b)}
J.ed=function(a,b){return J.aS(a).aR(a,b)}
J.hW=function(a,b,c){return J.bm(a).fu(a,b,c)}
J.hX=function(a,b,c){return J.bm(a).jO(a,b,c)}
J.hY=function(a){return J.ae(a).ei(a)}
J.hZ=function(a,b){return J.aS(a).dl(a,b)}
J.d0=function(a,b){return J.bm(a).dm(a,b)}
J.i_=function(a,b,c){return J.bm(a).aE(a,b,c)}
J.i0=function(a){return J.aS(a).br(a)}
J.f=function(a){return J.o(a).k(a)}
J.bq=function(a,b){return J.ae(a).cA(a,b)}
J.i1=function(a,b){return J.aS(a).bN(a,b)}
I.cY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.G=J.aJ.prototype
C.a=J.bR.prototype
C.K=J.eD.prototype
C.e=J.eE.prototype
C.r=J.eF.prototype
C.i=J.bS.prototype
C.b=J.bT.prototype
C.B=new A.a8(0,0,0)
C.C=new A.a8(-1/0,-1/0,-1/0)
C.D=new A.cf(-10,0,100)
C.E=new P.kH()
C.u=new P.ok()
C.F=new P.oD()
C.f=new P.oS()
C.w=new P.aU(0)
C.H=new U.cs(0,"ItemType.spear")
C.I=new U.cs(1,"ItemType.branch")
C.J=new U.cs(2,"ItemType.tent")
C.c=new U.cs(3,"ItemType.sword")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.ka(null,null)
C.M=new P.kc(null)
C.N=new P.kd(null,null)
C.O=new O.ke(0,"KnownToMode.all")
C.P=new N.aK("FINER",400)
C.Q=new N.aK("FINEST",300)
C.R=new N.aK("FINE",500)
C.x=new N.aK("INFO",800)
C.S=new N.aK("OFF",2000)
C.T=new N.aK("SEVERE",1000)
C.U=new N.aK("WARNING",900)
C.A=new U.cD(0,"Result.success")
C.Y=new U.cD(1,"Result.failure")
C.Z=new U.cD(2,"Result.criticalSuccess")
C.a_=new U.cD(3,"Result.criticalFailure")
C.y=I.cY([C.A,C.Y,C.Z,C.a_])
C.h=I.cY([])
C.V=new H.iS(0,{},C.h,[null,null])
C.k=new R.du(0,"Pose.standing")
C.j=new R.du(1,"Pose.offBalance")
C.l=new R.du(2,"Pose.onGround")
C.q=new K.dv(0,"Predetermination.none")
C.o=new K.dv(1,"Predetermination.successGuaranteed")
C.m=new K.dv(2,"Predetermination.failureGuaranteed")
C.t=new Y.bV("he","him","his","himself")
C.p=new Y.bV("it","it","its","itself")
C.W=new Y.bV("she","her","her","herself")
C.X=new Y.bV("they","them","their","themselves")
C.z=new Y.bV("you","you","your","yourself")
C.d=new Q.lm(0,"Resource.stamina")
C.a0=H.b0("eG")
C.a1=H.b0("ai")
C.a2=H.b0("q")
C.a3=H.b0("W")
C.a4=H.b0("aH")
C.n=H.b0("dynamic")
C.a5=H.b0("u")
C.a6=H.b0("K")
C.a7=new P.bF(null,2)
$.f_=1
$.eW="$cachedFunction"
$.eX="$cachedInvocation"
$.aD=0
$.bs=null
$.eh=null
$.bi=null
$.bH=null
$.bI=null
$.dV=!1
$.n=C.f
$.ev=0
$.e5=null
$.h4=!1
$.pk=null
$.h6=!1
$.hv=!0
$.cJ=!1
$.ht=!1
$.qY=C.S
$.pr=C.x
$.eM=0
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
I.$lazy(y,x,w)}})(["eA","$get$eA",function(){return H.k2()},"eB","$get$eB",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ev
$.ev=z+1
z="expando$key$"+z}return new P.jz(null,z,[P.u])},"fy","$get$fy",function(){return H.aF(H.cK({
toString:function(){return"$receiver$"}}))},"fz","$get$fz",function(){return H.aF(H.cK({$method$:null,
toString:function(){return"$receiver$"}}))},"fA","$get$fA",function(){return H.aF(H.cK(null))},"fB","$get$fB",function(){return H.aF(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fF","$get$fF",function(){return H.aF(H.cK(void 0))},"fG","$get$fG",function(){return H.aF(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fD","$get$fD",function(){return H.aF(H.fE(null))},"fC","$get$fC",function(){return H.aF(function(){try{null.$method$}catch(z){return z.message}}())},"fI","$get$fI",function(){return H.aF(H.fE(void 0))},"fH","$get$fH",function(){return H.aF(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dL","$get$dL",function(){return P.o2()},"b4","$get$b4",function(){var z,y
z=P.ai
y=new P.C(0,P.nI(),null,[z])
y.hu(null,z)
return y},"bJ","$get$bJ",function(){return[]},"by","$get$by",function(){return N.b5("PlannerRecommendation")},"hl","$get$hl",function(){return new K.pE()},"e2","$get$e2",function(){var z=$.$get$hl()
return K.a2("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a6","$get$a6",function(){return P.cA(null)},"b8","$get$b8",function(){return P.cA(null)},"hw","$get$hw",function(){return N.b5("Storyline")},"fm","$get$fm",function(){return P.ba("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cV","$get$cV",function(){return L.dK(new L.q3())},"b2","$get$b2",function(){return L.dK(new L.q4())},"hD","$get$hD",function(){return L.dK(new L.q2())},"ds","$get$ds",function(){return new F.kM("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"e0","$get$e0",function(){return Y.d7(!1,"balance",!0,C.p,$.$get$b2())},"hE","$get$hE",function(){return Y.d7(!1,"pounding",!1,C.p,$.$get$b2())},"f0","$get$f0",function(){return new B.lk("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"f4","$get$f4",function(){return new O.lz(null,!1,!1,null,null)},"fh","$get$fh",function(){return new Q.mj(null,!1,!0,C.d,null)},"fL","$get$fL",function(){return new M.nx("",!0,C.d,!1,null)},"h5","$get$h5",function(){return P.cA(null)},"hI","$get$hI",function(){return Y.d7(!1,"swing",!0,C.p,$.$get$b2())},"fa","$get$fa",function(){return new D.m7(!1,!1,null,null)},"hF","$get$hF",function(){return K.a2("start_of_book",new V.pY(),new V.pZ(),null,null,H.t([],[Q.w]),"ground")},"ex","$get$ex",function(){return new V.jR("Flee through the Underground Church","flee_through_necromancers_church",null)},"ey","$get$ey",function(){return new V.jT("Flee through the War Forges","flee_through_war_forge",null)},"f5","$get$f5",function(){return new V.lZ("Search Agruth","search_agruth",null)},"hJ","$get$hJ",function(){return K.a2("the_shafts",new V.pW(),new V.pX(),null,null,H.t([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"hL","$get$hL",function(){return K.a2("tunnel",new V.pU(),new V.pV(),N.ri(),null,H.t([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"hM","$get$hM",function(){return K.a2("underground_church",new V.pS(),new V.pT(),null,null,H.t([new Q.w("the_shafts","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"hN","$get$hN",function(){return K.a2("war_forge",new V.pP(),new V.pR(),null,null,H.t([new Q.w("the_shafts","Enter the corridor","You enter the corridor.",null),new Q.w("war_forge_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"hO","$get$hO",function(){return K.a2("war_forge_crevice",new V.pN(),new V.pO(),null,null,H.t([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hm","$get$hm",function(){return K.a2("entrance_to_bloodrock",new V.pL(),new V.pM(),null,null,H.t([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"hx","$get$hx",function(){return K.a2("mountain_pass",new V.pJ(),new V.pK(),null,null,H.t([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"hy","$get$hy",function(){return K.a2("mountain_pass_gate",new V.pH(),new V.pI(),null,null,H.t([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"hz","$get$hz",function(){return K.a2("mountain_pass_guard_post",new V.qq(),new V.pG(),N.rj(),null,H.t([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"fb","$get$fb",function(){return new V.m9("Sneak onto the back of the cart","sneak_onto_cart",null)},"fs","$get$fs",function(){return new V.n7("Stealthily take out some of the gate guards","take_out_gate_guards",null)},"hA","$get$hA",function(){return K.a2("mountainside_base",new V.qo(),new V.qp(),null,null,H.t([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"hB","$get$hB",function(){return K.a2("mountainside_path",new V.qm(),new V.qn(),null,null,H.t([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"fx","$get$fx",function(){return new V.nh("Scare off the serpent","threaten_winged_serpent",null)},"fd","$get$fd",function(){return new V.mb("Soothe the serpent","soothe_winged_serpent",null)},"fv","$get$fv",function(){return new V.ni("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",null)},"hP","$get$hP",function(){return K.a2("winged_serpent_nest",new V.q0(),new V.qb(),null,null,H.t([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"hu","$get$hu",function(){return K.a2("ironcast_road",new V.pF(),new V.pQ(),null,null,H.t([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"hd","$get$hd",function(){return H.t([$.$get$hF(),$.$get$hJ(),$.$get$hL(),$.$get$hM(),$.$get$hN(),$.$get$hO(),$.$get$hm(),$.$get$hx(),$.$get$hy(),$.$get$hz(),$.$get$hA(),$.$get$hB(),$.$get$hP(),$.$get$hu()],[K.bY])},"hc","$get$hc",function(){return H.t([$.$get$ex(),$.$get$ey(),$.$get$f5(),$.$get$fb(),$.$get$fs(),$.$get$fx(),$.$get$fd(),$.$get$fv()],[A.aE])},"dY","$get$dY",function(){return P.cA(null)},"d_","$get$d_",function(){return P.mZ("")},"c8","$get$c8",function(){var z=new O.kZ(0,null,"PointsCounter")
z.hm()
return z},"bK","$get$bK",function(){return new L.em(null,H.t([],[L.Z]))},"cb","$get$cb",function(){return H.eK(P.q,P.d)},"c7","$get$c7",function(){return P.aY(null,{func:1,ret:[P.L,P.ai]})},"cm","$get$cm",function(){return P.ba("^\\s*<<<\\s*$",!0,!1)},"cI","$get$cI",function(){return H.eK(P.q,Z.aj)},"eO","$get$eO",function(){return N.b5("")},"eN","$get$eN",function(){return P.di(P.q,N.dk)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.P,A.at,Y.ak]},{func:1,args:[R.P,A.at,Y.ak]},{func:1,v:true},{func:1,ret:Q.G,args:[R.P]},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,args:[,,,]},{func:1,ret:P.q,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.aN]},{func:1,v:true,args:[P.d],opt:[P.aN]},{func:1,args:[P.aH]},{func:1,ret:P.L},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bu,args:[P.u]},{func:1,args:[R.P]},{func:1,args:[Z.aj]},{func:1,ret:P.K,args:[A.a8]},{func:1,ret:[P.x,R.P],args:[A.at]},{func:1,args:[P.W]},{func:1,args:[Y.a3]},{func:1,args:[P.b6]},{func:1,v:true,args:[P.d,P.aN]},{func:1,v:true,args:[,P.aN]},{func:1,ret:P.W,args:[P.u]},{func:1,args:[{func:1,v:true}]},{func:1,ret:P.q,args:[Q.ag]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.I,P.q],P.f6]},{func:1,ret:[P.L,U.bZ],args:[P.aH,P.q],named:{rerollEffectDescription:P.q,rerollable:P.W}},{func:1,args:[L.Z]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cH]},{func:1,args:[P.u,R.P]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[P.K,R.P]},{func:1,ret:P.u,args:[P.Q,P.Q]},{func:1,args:[,],opt:[,]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.K,args:[A.cf]},{func:1,ret:Q.cq,args:[Q.w]},{func:1,args:[P.u,,]},{func:1,args:[[P.I,Y.a3],Y.a3]},{func:1,ret:L.Z,args:[P.q],named:{deferToChoiceList:P.W,deferToEndOfPage:P.W,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.L,P.ai]},submenu:P.q}},{func:1,ret:P.W,args:[L.Z]}]
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
if(x==y)H.rf(d||a)
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
Isolate.cY=a.cY
Isolate.b1=a.b1
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hG(X.hj(),b)},[])
else (function(b){H.hG(X.hj(),b)})([])})})()