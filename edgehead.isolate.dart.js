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
if(b5.$isaN)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.e2"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.e2"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.e2(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b2=function(){}
var dart=[["","",,H,{"^":"",rC:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aN:{"^":"d;",
v:function(a,b){return a===b},
gA:function(a){return H.au(a)},
k:function(a){return H.cC(a)},
gbe:function(a){return new H.am(H.hu(a),null)}},
eE:{"^":"aN;",
k:function(a){return String(a)},
gA:function(a){return a?519018:218159},
gbe:function(a){return C.a3},
$isW:1},
eG:{"^":"aN;",
v:function(a,b){return null==b},
k:function(a){return"null"},
gA:function(a){return 0},
gbe:function(a){return C.a1},
$isak:1},
eK:{"^":"aN;",
gA:function(a){return 0},
gbe:function(a){return C.a0},
k:function(a){return String(a)},
$iseH:1},
rG:{"^":"eK;"},
bg:{"^":"eK;"},
bU:{"^":"aN;$ti",
fe:function(a,b){if(!!a.immutable$list)throw H.c(new P.N(b))},
cm:function(a,b){if(!!a.fixed$length)throw H.c(new P.N(b))},
n:function(a,b){this.cm(a,"add")
a.push(b)},
bb:function(a){this.cm(a,"removeLast")
if(a.length===0)throw H.c(H.az(a,-1))
return a.pop()},
ap:function(a,b){var z
this.cm(a,"remove")
for(z=0;z<a.length;++z)if(J.f(a[z],b)){a.splice(z,1)
return!0}return!1},
ia:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sl(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bO:function(a,b){return new H.H(a,b,[H.l(a,0)])},
am:function(a,b){var z
this.cm(a,"addAll")
for(z=J.ai(b);z.u();)a.push(z.d)},
L:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aT:function(a,b){return new H.aj(a,b,[H.l(a,0),null])},
dr:function(a,b){return H.fr(a,b,null,H.l(a,0))},
b1:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bo:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.ab())},
fm:function(a,b){return this.bo(a,b,null)},
ah:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gfl:function(a){if(a.length>0)return a[0]
throw H.c(H.ab())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.ab())},
gbS:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.ab())
throw H.c(H.de())},
aK:function(a,b,c,d,e){var z,y,x
this.fe(a,"setRange")
P.cF(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.V(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eD())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bW:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cM:function(a,b){var z
this.fe(a,"sort")
z=b==null?P.qy():b
H.c2(a,0,a.length-1,z)},
ey:function(a){return this.cM(a,null)},
e9:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.f(a[z],b))return z
return-1},
bp:function(a,b){return this.e9(a,b,0)},
Z:function(a,b){var z
for(z=0;z<a.length;++z)if(J.f(a[z],b))return!0
return!1},
gJ:function(a){return a.length===0},
gac:function(a){return a.length!==0},
k:function(a){return P.bT(a,"[","]")},
bs:function(a){return P.aX(a,H.l(a,0))},
gY:function(a){return new J.bO(a,a.length,0,null,[H.l(a,0)])},
gA:function(a){return H.au(a)},
gl:function(a){return a.length},
sl:function(a,b){this.cm(a,"set length")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.ci(b,"newLength",null))
if(b<0)throw H.c(P.V(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
m:function(a,b,c){if(!!a.immutable$list)H.h(new P.N("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
a[b]=c},
$iscy:1,
$ascy:I.b2,
$isI:1,
$isS:1},
rB:{"^":"bU;$ti"},
bO:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ar(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bV:{"^":"aN;",
bm:function(a,b){var z
if(typeof b!=="number")throw H.c(H.O(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd2(b)
if(this.gd2(a)===z)return 0
if(this.gd2(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd2:function(a){return a===0?1/a<0:a<0},
em:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.N(""+a+".round()"))},
cC:function(a,b){var z
if(b>20)throw H.c(P.V(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd2(a))return"-"+z
return z},
k0:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.V(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cn(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.N("Unexpected toString result: "+z))
x=J.J(y)
z=x.i(y,1)
w=+x.i(y,3)
if(x.i(y,2)!=null){z+=x.i(y,2)
w-=x.i(y,2).length}return z+C.b.bQ("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
eu:function(a){return-a},
a5:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a+b},
aM:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a-b},
cH:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a/b},
bQ:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a*b},
bw:function(a,b){return(a|0)===a?a/b|0:this.il(a,b)},
il:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.N("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cW:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aJ:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a<b},
bC:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a>b},
bP:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a<=b},
bA:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a>=b},
gbe:function(a){return C.a6},
$isK:1},
eF:{"^":"bV;",
gbe:function(a){return C.a5},
$isaL:1,
$isK:1,
$isu:1},
k8:{"^":"bV;",
gbe:function(a){return C.a4},
$isaL:1,
$isK:1},
bW:{"^":"aN;",
cn:function(a,b){if(b<0)throw H.c(H.az(a,b))
if(b>=a.length)H.h(H.az(a,b))
return a.charCodeAt(b)},
c8:function(a,b){if(b>=a.length)throw H.c(H.az(a,b))
return a.charCodeAt(b)},
e0:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.p4(b,a,c)},
e_:function(a,b){return this.e0(a,b,0)},
fz:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.V(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cn(b,c+y)!==this.c8(a,y))return
return new H.fq(c,b,a)},
a5:function(a,b){if(typeof b!=="string")throw H.c(P.ci(b,null,null))
return a+b},
e5:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bu(a,y-z)},
jP:function(a,b,c){H.bm(c)
return H.p(a,b,c)},
jQ:function(a,b,c,d){H.bm(c)
P.lh(d,0,a.length,"startIndex",null)
return H.bN(a,b,c,d)},
d7:function(a,b,c){return this.jQ(a,b,c,0)},
hi:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.hY(b,a,c)!=null},
ds:function(a,b){return this.hi(a,b,0)},
aH:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.O(c))
if(b<0)throw H.c(P.bZ(b,null,null))
if(typeof c!=="number")return H.y(c)
if(b>c)throw H.c(P.bZ(b,null,null))
if(c>a.length)throw H.c(P.bZ(c,null,null))
return a.substring(b,c)},
bu:function(a,b){return this.aH(a,b,null)},
fT:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.c8(z,0)===133){x=J.df(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cn(z,w)===133?J.k9(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
k5:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.c8(z,0)===133?J.df(z,1):0}else{y=J.df(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bQ:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.E)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e9:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bp:function(a,b){return this.e9(a,b,0)},
jw:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jv:function(a,b){return this.jw(a,b,null)},
iK:function(a,b,c){if(b==null)H.h(H.O(b))
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return H.rg(a,b,c)},
Z:function(a,b){return this.iK(a,b,0)},
gJ:function(a){return a.length===0},
gac:function(a){return a.length!==0},
bm:function(a,b){var z
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
gbe:function(a){return C.a2},
gl:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.az(a,b))
if(b>=a.length||b<0)throw H.c(H.az(a,b))
return a[b]},
$iscy:1,
$ascy:I.b2,
$isq:1,
$isdu:1,
t:{
eI:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
df:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.c8(a,b)
if(y!==32&&y!==13&&!J.eI(y))break;++b}return b},
k9:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cn(a,z)
if(y!==32&&y!==13&&!J.eI(y))break}return b}}}}],["","",,H,{"^":"",
h2:function(a){return a},
ab:function(){return new P.F("No element")},
de:function(){return new P.F("Too many elements")},
eD:function(){return new P.F("Too few elements")},
c2:function(a,b,c,d){if(c-b<=32)H.fg(a,b,c,d)
else H.ff(a,b,c,d)},
fg:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a1(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.i(a,v))
w=v}y.m(a,w,x)}},
ff:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.e.bw(c-b+1,6)
y=b+z
x=c-z
w=C.e.bw(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
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
t.m(a,v,t.i(a,b))
t.m(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.f(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.o(i)
if(h.v(i,0))continue
if(h.aJ(i,0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.ah(i)
if(h.bC(i,0)){--l
continue}else{g=l-1
if(h.aJ(i,0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
l=g
m=f
break}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(J.ce(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else if(J.a1(d.$2(j,p),0))for(;!0;)if(J.a1(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.ce(d.$2(t.i(a,l),r),0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)}l=g
break}}e=!1}h=m-1
t.m(a,b,t.i(a,h))
t.m(a,h,r)
h=l+1
t.m(a,c,t.i(a,h))
t.m(a,h,p)
H.c2(a,b,m-2,d)
H.c2(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.f(d.$2(t.i(a,m),r),0);)++m
for(;J.f(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.f(d.$2(j,r),0)){if(k!==m){t.m(a,k,t.i(a,m))
t.m(a,m,j)}++m}else if(J.f(d.$2(j,p),0))for(;!0;)if(J.f(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.ce(d.$2(t.i(a,l),r),0)){t.m(a,k,t.i(a,m))
f=m+1
t.m(a,m,t.i(a,l))
t.m(a,l,j)
m=f}else{t.m(a,k,t.i(a,l))
t.m(a,l,j)}l=g
break}}H.c2(a,m,l,d)}else H.c2(a,m,l,d)},
S:{"^":"x;$ti"},
aR:{"^":"S;$ti",
gY:function(a){return new H.dk(this,this.gl(this),0,null,[H.v(this,"aR",0)])},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.ah(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gJ:function(a){return this.gl(this)===0},
gE:function(a){if(this.gl(this)===0)throw H.c(H.ab())
return this.ah(0,this.gl(this)-1)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(J.f(this.ah(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bo:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.ah(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
ct:function(a,b){var z,y,x,w
z=this.gl(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ah(0,0))
if(z!==this.gl(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ah(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ah(0,w))
if(z!==this.gl(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bO:function(a,b){return this.eC(0,b)},
aT:function(a,b){return new H.aj(this,b,[H.v(this,"aR",0),null])},
b1:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ah(0,x))
if(z!==this.gl(this))throw H.c(new P.B(this))}return y},
br:function(a,b){var z,y,x,w
z=[H.v(this,"aR",0)]
if(b){y=H.t([],z)
C.a.sl(y,this.gl(this))}else{x=new Array(this.gl(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gl(this);++w){z=this.ah(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
c4:function(a){return this.br(a,!0)},
bs:function(a){var z,y
z=P.T(null,null,null,H.v(this,"aR",0))
for(y=0;y<this.gl(this);++y)z.n(0,this.ah(0,y))
return z}},
n1:{"^":"aR;a,b,c,$ti",
ghL:function(){var z=J.aD(this.a)
return z},
gij:function(){var z,y
z=J.aD(this.a)
y=this.b
if(y>z)return z
return y},
gl:function(a){var z,y
z=J.aD(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ah:function(a,b){var z,y
z=this.gij()+b
if(!(b<0)){y=this.ghL()
if(typeof y!=="number")return H.y(y)
y=z>=y}else y=!0
if(y)throw H.c(P.ct(b,this,"index",null,null))
return J.ec(this.a,z)},
br:function(a,b){var z,y,x,w,v,u,t,s,r
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
t=H.t(s,u)}for(r=0;r<v;++r){u=x.ah(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gl(y)<w)throw H.c(new P.B(this))}return t},
hr:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.V(z,0,null,"start",null))},
t:{
fr:function(a,b,c,d){var z=new H.n1(a,b,c,[d])
z.hr(a,b,c,d)
return z}}},
dk:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gl(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ah(0,x);++this.c
return!0}},
cz:{"^":"x;a,b,$ti",
gY:function(a){return new H.kr(null,J.ai(this.a),this.b,this.$ti)},
gl:function(a){return J.aD(this.a)},
gJ:function(a){return J.ed(this.a)},
gE:function(a){return this.b.$1(J.hV(this.a))},
$asx:function(a,b){return[b]},
t:{
bx:function(a,b,c,d){if(!!J.o(a).$isS)return new H.bu(a,b,[c,d])
return new H.cz(a,b,[c,d])}}},
bu:{"^":"cz;a,b,$ti",$isS:1,
$asS:function(a,b){return[b]}},
kr:{"^":"cx;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascx:function(a,b){return[b]}},
aj:{"^":"aR;a,b,$ti",
gl:function(a){return J.aD(this.a)},
ah:function(a,b){return this.b.$1(J.ec(this.a,b))},
$asaR:function(a,b){return[b]},
$asS:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
H:{"^":"x;a,b,$ti",
gY:function(a){return new H.fO(J.ai(this.a),this.b,this.$ti)},
aT:function(a,b){return new H.cz(this,b,[H.l(this,0),null])}},
fO:{"^":"cx;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
f8:{"^":"x;a,b,$ti",
gY:function(a){return new H.m4(J.ai(this.a),this.b,this.$ti)},
t:{
m3:function(a,b,c){if(!!J.o(a).$isS)return new H.jw(a,H.h2(b),[c])
return new H.f8(a,H.h2(b),[c])}}},
jw:{"^":"f8;a,b,$ti",
gl:function(a){var z=J.aD(this.a)-this.b
if(z>=0)return z
return 0},
$isS:1},
m4:{"^":"cx;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
c8:function(a,b){var z=a.cp(b)
if(!init.globalState.d.cy)init.globalState.f.bd()
return z},
hI:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isI)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.oR(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eB()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.oq(P.aZ(null,H.c6),0)
x=P.u
y.z=new H.M(0,null,null,null,null,null,0,[x,H.dS])
y.ch=new H.M(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.oQ()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.k0,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.oS)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.T(null,null,null,x)
v=new H.c_(0,null,!1)
u=new H.dS(y,new H.M(0,null,null,null,null,null,0,[x,H.c_]),w,init.createNewIsolate(),v,new H.b4(H.d1()),new H.b4(H.d1()),!1,!1,[],P.T(null,null,null,null),null,null,!1,!0,P.T(null,null,null,null))
w.n(0,0)
u.dv(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.aq(a,{func:1,args:[,]}))u.cp(new H.r8(z,a))
else if(H.aq(a,{func:1,args:[,,]}))u.cp(new H.r9(z,a))
else u.cp(a)
init.globalState.f.bd()},
k4:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.k5()
return},
k5:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.N("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.N('Cannot extract URI from "'+z+'"'))},
k0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cP(!0,[]).bI(b.data)
y=J.J(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.cP(!0,[]).bI(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.cP(!0,[]).bI(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.T(null,null,null,q)
o=new H.c_(0,null,!1)
n=new H.dS(y,new H.M(0,null,null,null,null,null,0,[q,H.c_]),p,init.createNewIsolate(),o,new H.b4(H.d1()),new H.b4(H.d1()),!1,!1,[],P.T(null,null,null,null),null,null,!1,!0,P.T(null,null,null,null))
p.n(0,0)
n.dv(0,o)
init.globalState.f.a.ar(new H.c6(n,new H.k1(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bd()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)y.i(z,"port").D(y.i(z,"msg"))
init.globalState.f.bd()
break
case"close":init.globalState.ch.ap(0,$.$get$eC().i(0,a))
a.terminate()
init.globalState.f.bd()
break
case"log":H.k_(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.ac(["command","print","msg",z])
q=new H.bi(!0,P.bI(null,P.u)).b5(q)
y.toString
self.postMessage(q)}else P.e9(y.i(z,"msg"))
break
case"error":throw H.c(y.i(z,"msg"))}},
k_:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.ac(["command","log","msg",a])
x=new H.bi(!0,P.bI(null,P.u)).b5(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cr(z)
throw H.c(y)}},
k2:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eX=$.eX+("_"+y)
$.eY=$.eY+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.D(["spawned",new H.c7(y,x),w,z.r])
x=new H.k3(a,b,c,d,z)
if(e===!0){z.fb(w,w)
init.globalState.f.a.ar(new H.c6(z,x,"start isolate"))}else x.$0()},
pl:function(a){return new H.cP(!0,[]).bI(new H.bi(!1,P.bI(null,P.u)).b5(a))},
r8:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
r9:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
oR:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",t:{
oS:function(a){var z=P.ac(["command","print","msg",a])
return new H.bi(!0,P.bI(null,P.u)).b5(z)}}},
dS:{"^":"d;j:a<,b,c,jt:d<,iM:e<,f,r,x,cs:y<,z,Q,ch,cx,cy,db,dx",
fb:function(a,b){if(!this.f.v(0,a))return
if(this.Q.n(0,b)&&!this.y)this.y=!0
this.cl()},
jO:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.ap(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.fa(x)}this.y=!1}this.cl()},
iB:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jM:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.v(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.N("removeRange"))
P.cF(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hb:function(a,b){if(!this.r.v(0,a))return
this.db=b},
j7:function(a,b,c){var z=J.o(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){a.D(c)
return}z=this.cx
if(z==null){z=P.aZ(null,null)
this.cx=z}z.ar(new H.oH(a,c))},
j6:function(a,b){var z
if(!this.r.v(0,a))return
z=J.o(b)
if(!z.v(b,0))z=z.v(b,1)&&!this.cy
else z=!0
if(z){this.ee()
return}z=this.cx
if(z==null){z=P.aZ(null,null)
this.cx=z}z.ar(this.gju())},
j8:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.e9(a)
if(b!=null)P.e9(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.i(a)
y[1]=b==null?null:J.i(b)
for(x=new P.an(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.D(y)},
cp:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.j8(w,v)
if(this.db===!0){this.ee()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjt()
if(this.cx!=null)for(;t=this.cx,!t.gJ(t);)this.cx.d6().$0()}return y},
c_:function(a){return this.b.i(0,a)},
dv:function(a,b){var z=this.b
if(z.a_(a))throw H.c(P.cr("Registry: ports must be registered only once."))
z.m(0,a,b)},
cl:function(){var z=this.b
if(z.gl(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.ee()},
ee:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aS(0)
for(z=this.b,y=z.gc5(),y=y.gY(y);y.u();)y.gF().hG()
z.aS(0)
this.c.aS(0)
init.globalState.z.ap(0,this.a)
this.dx.aS(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.D(z[v])}this.ch=null}},"$0","gju",0,0,4]},
oH:{"^":"a:4;a,b",
$0:function(){this.a.D(this.b)}},
oq:{"^":"d;a,b",
iR:function(){var z=this.a
if(z.b===z.c)return
return z.d6()},
fR:function(){var z,y,x
z=this.iR()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a_(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gJ(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cr("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gJ(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.ac(["command","close"])
x=new H.bi(!0,new P.fX(0,null,null,null,null,null,0,[null,P.u])).b5(x)
y.toString
self.postMessage(x)}return!1}z.jK()
return!0},
f2:function(){if(self.window!=null)new H.or(this).$0()
else for(;this.fR(););},
bd:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.f2()
else try{this.f2()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.ac(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bi(!0,P.bI(null,P.u)).b5(v)
w.toString
self.postMessage(v)}}},
or:{"^":"a:4;a",
$0:function(){if(!this.a.fR())return
P.nz(C.w,this)}},
c6:{"^":"d;a,b,c",
jK:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cp(this.b)}},
oQ:{"^":"d;"},
k1:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.k2(this.a,this.b,this.c,this.d,this.e,this.f)}},
k3:{"^":"a:4;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.aq(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.aq(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cl()}},
fR:{"^":"d;"},
c7:{"^":"fR;b,a",
D:function(a){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.geT())return
x=H.pl(a)
if(z.giM()===y){y=J.J(x)
switch(y.i(x,0)){case"pause":z.fb(y.i(x,1),y.i(x,2))
break
case"resume":z.jO(y.i(x,1))
break
case"add-ondone":z.iB(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.jM(y.i(x,1))
break
case"set-errors-fatal":z.hb(y.i(x,1),y.i(x,2))
break
case"ping":z.j7(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.j6(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.n(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.ap(0,y)
break}return}init.globalState.f.a.ar(new H.c6(z,new H.oU(this,x),"receive"))},
v:function(a,b){if(b==null)return!1
return b instanceof H.c7&&J.f(this.b,b.b)},
gA:function(a){return this.b.gdK()}},
oU:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.geT())z.hx(this.b)}},
dU:{"^":"fR;b,c,a",
D:function(a){var z,y,x
z=P.ac(["command","message","port",this,"msg",a])
y=new H.bi(!0,P.bI(null,P.u)).b5(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
v:function(a,b){if(b==null)return!1
return b instanceof H.dU&&J.f(this.b,b.b)&&J.f(this.a,b.a)&&J.f(this.c,b.c)},
gA:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ev()
y=this.a
if(typeof y!=="number")return y.ev()
x=this.c
if(typeof x!=="number")return H.y(x)
return(z<<16^y<<8^x)>>>0}},
c_:{"^":"d;dK:a<,b,eT:c<",
hG:function(){this.c=!0
this.b=null},
b7:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.ap(0,y)
z.c.ap(0,y)
z.cl()},
hx:function(a){if(this.c)return
this.b.$1(a)},
$isli:1},
lj:{"^":"a6;a,b",
au:function(a,b,c,d){var z=this.b
z.toString
return new P.cO(z,[H.l(z,0)]).au(a,b,c,d)},
eh:function(a,b,c){return this.au(a,null,b,c)},
b7:[function(){this.a.b7()
this.b.b7()},"$0","giI",0,0,4],
hp:function(a){var z=new P.p8(null,0,null,null,null,null,this.giI(),[null])
this.b=z
this.a.b=z.giu(z)},
$asa6:I.b2},
nv:{"^":"d;a,b,c",
hs:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ar(new H.c6(y,new H.nx(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cX(new H.ny(this,b),0),a)}else throw H.c(new P.N("Timer greater than 0."))},
t:{
nw:function(a,b){var z=new H.nv(!0,!1,null)
z.hs(a,b)
return z}}},
nx:{"^":"a:4;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
ny:{"^":"a:4;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b4:{"^":"d;dK:a<",
gA:function(a){var z=this.a
if(typeof z!=="number")return z.kd()
z=C.i.cW(z,0)^C.i.bw(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b4){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bi:{"^":"d;a,b",
b5:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gl(z))
z=J.o(a)
if(!!z.$iscy)return this.h7(a)
if(!!z.$isjY){x=this.gh4()
z=a.gbY()
z=H.bx(z,x,H.v(z,"x",0),null)
z=P.U(z,!0,H.v(z,"x",0))
w=a.gc5()
w=H.bx(w,x,H.v(w,"x",0),null)
return["map",z,P.U(w,!0,H.v(w,"x",0))]}if(!!z.$iseH)return this.h8(a)
if(!!z.$isaN)this.fU(a)
if(!!z.$isli)this.cD(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isc7)return this.h9(a)
if(!!z.$isdU)return this.ha(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cD(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb4)return["capability",a.a]
if(!(a instanceof P.d))this.fU(a)
return["dart",init.classIdExtractor(a),this.h6(init.classFieldsExtractor(a))]},"$1","gh4",2,0,0],
cD:function(a,b){throw H.c(new P.N((b==null?"Can't transmit:":b)+" "+H.b(a)))},
fU:function(a){return this.cD(a,null)},
h7:function(a){var z=this.h5(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cD(a,"Can't serialize indexable: ")},
h5:function(a){var z,y,x
z=[]
C.a.sl(z,a.length)
for(y=0;y<a.length;++y){x=this.b5(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
h6:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.b5(a[z]))
return a},
h8:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cD(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sl(y,z.length)
for(x=0;x<z.length;++x){w=this.b5(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
ha:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
h9:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdK()]
return["raw sendport",a]}},
cP:{"^":"d;a,b",
bI:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.b(a)))
switch(C.a.gfl(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.t(this.co(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.co(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.co(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.co(x),[null])
y.fixed$length=Array
return y
case"map":return this.iU(a)
case"sendport":return this.iV(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iT(a)
case"function":if(1>=a.length)return H.e(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.e(a,1)
return new H.b4(a[1])
case"dart":y=a.length
if(1>=y)return H.e(a,1)
w=a[1]
if(2>=y)return H.e(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.co(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","giS",2,0,0],
co:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gl(a)
if(typeof x!=="number")return H.y(x)
if(!(y<x))break
z.m(a,y,this.bI(z.i(a,y)));++y}return a},
iU:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aQ()
this.b.push(w)
y=J.ee(y,this.giS()).c4(0)
for(z=J.J(y),v=J.J(x),u=0;u<z.gl(y);++u){if(u>=y.length)return H.e(y,u)
w.m(0,y[u],this.bI(v.i(x,u)))}return w},
iV:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.f(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.c_(w)
if(u==null)return
t=new H.c7(u,x)}else t=new H.dU(y,w,x)
this.b.push(t)
return t},
iT:function(a){var z,y,x,w,v,u,t
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
w[z.i(y,u)]=this.bI(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
iT:function(){throw H.c(new P.N("Cannot modify unmodifiable Map"))},
qM:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.i(a)
if(typeof z!=="string")throw H.c(H.O(a))
return z},
au:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bA:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.G||!!J.o(a).$isbg){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.c8(w,0)===36)w=C.b.bu(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d_(H.cb(a),0,null),init.mangledGlobalNames)},
cC:function(a){return"Instance of '"+H.bA(a)+"'"},
ae:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.e.cW(z,10))>>>0,56320|z&1023)}throw H.c(P.V(a,0,1114111,null,null))},
b8:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
lc:function(a){var z=H.b8(a).getFullYear()+0
return z},
la:function(a){var z=H.b8(a).getMonth()+1
return z},
l6:function(a){var z=H.b8(a).getDate()+0
return z},
l7:function(a){var z=H.b8(a).getHours()+0
return z},
l9:function(a){var z=H.b8(a).getMinutes()+0
return z},
lb:function(a){var z=H.b8(a).getSeconds()+0
return z},
l8:function(a){var z=H.b8(a).getMilliseconds()+0
return z},
dx:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.O(a))
return a[b]},
eZ:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.O(a))
a[b]=c},
y:function(a){throw H.c(H.O(a))},
e:function(a,b){if(a==null)J.aD(a)
throw H.c(H.az(a,b))},
az:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aV(!0,b,"index",null)
z=J.aD(a)
if(!(b<0)){if(typeof z!=="number")return H.y(z)
y=b>=z}else y=!0
if(y)return P.ct(b,a,"index",null,z)
return P.bZ(b,"index",null)},
O:function(a){return new P.aV(!0,a,null,null)},
cV:function(a){if(typeof a!=="number")throw H.c(H.O(a))
return a},
bm:function(a){if(typeof a!=="string")throw H.c(H.O(a))
return a},
c:function(a){var z
if(a==null)a=new P.cA()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hM})
z.name=""}else z.toString=H.hM
return z},
hM:function(){return J.i(this.dartException)},
h:function(a){throw H.c(a)},
ar:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ro(a)
if(a==null)return
if(a instanceof H.dc)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.cW(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dh(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.eQ(v,null))}}if(a instanceof TypeError){u=$.$get$fz()
t=$.$get$fA()
s=$.$get$fB()
r=$.$get$fC()
q=$.$get$fG()
p=$.$get$fH()
o=$.$get$fE()
$.$get$fD()
n=$.$get$fJ()
m=$.$get$fI()
l=u.ba(y)
if(l!=null)return z.$1(H.dh(y,l))
else{l=t.ba(y)
if(l!=null){l.method="call"
return z.$1(H.dh(y,l))}else{l=s.ba(y)
if(l==null){l=r.ba(y)
if(l==null){l=q.ba(y)
if(l==null){l=p.ba(y)
if(l==null){l=o.ba(y)
if(l==null){l=r.ba(y)
if(l==null){l=n.ba(y)
if(l==null){l=m.ba(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eQ(y,l==null?null:l.method))}}return z.$1(new H.nD(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fh()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aV(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fh()
return a},
A:function(a){var z
if(a instanceof H.dc)return a.b
if(a==null)return new H.h_(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.h_(a,null)},
qX:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.au(a)},
qF:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
qQ:function(a,b,c,d,e,f,g){switch(c){case 0:return H.c8(b,new H.qR(a))
case 1:return H.c8(b,new H.qS(a,d))
case 2:return H.c8(b,new H.qT(a,d,e))
case 3:return H.c8(b,new H.qU(a,d,e,f))
case 4:return H.c8(b,new H.qV(a,d,e,f,g))}throw H.c(P.cr("Unsupported number of arguments for wrapped closure"))},
cX:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.qQ)
a.$identity=z
return z},
iP:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isI){z.$reflectionInfo=c
x=H.ll(z).r}else x=c
w=d?Object.create(new H.mz().constructor.prototype):Object.create(new H.d4(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aE
$.aE=J.a0(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eo(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.qM,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.ej:H.d5
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eo(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
iM:function(a,b,c,d){var z=H.d5
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eo:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.iO(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.iM(y,!w,z,b)
if(y===0){w=$.aE
$.aE=J.a0(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bt
if(v==null){v=H.cl("self")
$.bt=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aE
$.aE=J.a0(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bt
if(v==null){v=H.cl("self")
$.bt=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
iN:function(a,b,c,d){var z,y
z=H.d5
y=H.ej
switch(b?-1:a){case 0:throw H.c(new H.lw("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
iO:function(a,b){var z,y,x,w,v,u,t,s
z=H.iD()
y=$.ei
if(y==null){y=H.cl("receiver")
$.ei=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.iN(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aE
$.aE=J.a0(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aE
$.aE=J.a0(u,1)
return new Function(y+H.b(u)+"}")()},
e2:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isI){c.fixed$length=Array
z=c}else z=c
return H.iP(a,b,z,!!d,e,f)},
r2:function(a,b){var z=J.J(b)
throw H.c(H.cn(H.bA(a),z.aH(b,3,z.gl(b))))},
a_:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.r2(a,b)},
e4:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
aq:function(a,b){var z
if(a==null)return!1
z=H.e4(a)
return z==null?!1:H.e7(z,b)},
ho:function(a,b){var z,y
if(a==null)return a
if(H.aq(a,b))return a
z=H.R(b,null)
y=H.e4(a)
throw H.c(H.cn(y!=null?H.R(y,null):H.bA(a),z))},
rm:function(a){throw H.c(new P.j4(a))},
d1:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b1:function(a){return new H.am(a,null)},
t:function(a,b){a.$ti=b
return a},
cb:function(a){if(a==null)return
return a.$ti},
ht:function(a,b){return H.ea(a["$as"+H.b(b)],H.cb(a))},
v:function(a,b,c){var z=H.ht(a,b)
return z==null?null:z[c]},
l:function(a,b){var z=H.cb(a)
return z==null?null:z[b]},
R:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d_(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.R(z,b)
return H.pq(a,b)}return"unknown-reified-type"},
pq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.R(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.R(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.R(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.qE(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.R(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d_:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bF("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.w=v+", "
u=a[y]
if(u!=null)w=!1
v=z.w+=H.R(u,c)}return w?"":"<"+z.k(0)+">"},
hu:function(a){var z,y
if(a instanceof H.a){z=H.e4(a)
if(z!=null)return H.R(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.d_(a.$ti,0,null)},
ea:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aK:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cb(a)
y=J.o(a)
if(y[b]==null)return!1
return H.hh(H.ea(y[d],z),c)},
aB:function(a,b,c,d){if(a==null)return a
if(H.aK(a,b,c,d))return a
throw H.c(H.cn(H.bA(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d_(c,0,null),init.mangledGlobalNames)))},
hh:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a8(a[y],b[y]))return!1
return!0},
b0:function(a,b,c){return a.apply(b,H.ht(b,c))},
cW:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ak"
if(b==null)return!0
z=H.cb(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.e7(x.apply(a,null),b)}return H.a8(y,b)},
hJ:function(a,b){if(a!=null&&!H.cW(a,b))throw H.c(H.cn(H.bA(a),H.R(b,null)))
return a},
a8:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ak")return!0
if('func' in b)return H.e7(a,b)
if('func' in a)return b.builtin$cls==="bw"||b.builtin$cls==="d"
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
return H.hh(H.ea(u,z),x)},
hg:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a8(z,v)||H.a8(v,z)))return!1}return!0},
pA:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a8(v,u)||H.a8(u,v)))return!1}return!0},
e7:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a8(z,y)||H.a8(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hg(x,w,!1))return!1
if(!H.hg(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a8(o,n)||H.a8(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a8(o,n)||H.a8(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a8(o,n)||H.a8(n,o)))return!1}}return H.pA(a.named,b.named)},
rg:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$iseJ){z=C.b.bu(a,c)
return b.b.test(z)}else{z=z.e_(b,C.b.bu(a,c))
return!z.gJ(z)}}},
p:function(a,b,c){var z,y,x
H.bm(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
t2:[function(a){return a},"$1","h3",2,0,39],
rh:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdu)throw H.c(P.ci(b,"pattern","is not a Pattern"))
for(z=z.e_(b,a),z=new H.fP(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.h3().$1(C.b.aH(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.h3().$1(C.b.bu(a,y)))
return z.charCodeAt(0)==0?z:z},
bN:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.ri(a,z,z+b.length,c)},
ri:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
iS:{"^":"d;$ti",
gJ:function(a){return this.gl(this)===0},
gac:function(a){return this.gl(this)!==0},
k:function(a){return P.dn(this)},
m:function(a,b,c){return H.iT()},
$isD:1},
iU:{"^":"iS;a,b,c,$ti",
gl:function(a){return this.a},
a_:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
i:function(a,b){if(!this.a_(b))return
return this.eP(b)},
eP:function(a){return this.b[a]},
L:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eP(w))}}},
lk:{"^":"d;a,b,c,d,e,f,r,x",t:{
ll:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.lk(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
nA:{"^":"d;a,b,c,d,e,f",
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
aG:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.nA(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cN:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fF:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eQ:{"^":"Y;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
kb:{"^":"Y;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
t:{
dh:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.kb(a,y,z?null:b.receiver)}}},
nD:{"^":"Y;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dc:{"^":"d;a,b6:b<"},
ro:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isY)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
h_:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
qR:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
qS:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
qT:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
qU:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
qV:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
k:function(a){return"Closure '"+H.bA(this).trim()+"'"},
gh0:function(){return this},
$isbw:1,
gh0:function(){return this}},
fv:{"^":"a;"},
mz:{"^":"fv;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d4:{"^":"fv;a,b,c,d",
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d4))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.au(this.a)
else y=typeof z!=="object"?J.j(z):H.au(z)
z=H.au(this.b)
if(typeof y!=="number")return y.ke()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cC(z)},
t:{
d5:function(a){return a.a},
ej:function(a){return a.c},
iD:function(){var z=$.bt
if(z==null){z=H.cl("self")
$.bt=z}return z},
cl:function(a){var z,y,x,w,v
z=new H.d4("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iI:{"^":"Y;a",
k:function(a){return this.a},
t:{
cn:function(a,b){return new H.iI("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
lw:{"^":"Y;a",
k:function(a){return"RuntimeError: "+H.b(this.a)}},
am:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gA:function(a){return J.j(this.a)},
v:function(a,b){if(b==null)return!1
return b instanceof H.am&&J.f(this.a,b.a)}},
M:{"^":"d;a,b,c,d,e,f,r,$ti",
gl:function(a){return this.a},
gJ:function(a){return this.a===0},
gac:function(a){return!this.gJ(this)},
gbY:function(){return new H.ki(this,[H.l(this,0)])},
gc5:function(){return H.bx(this.gbY(),new H.ka(this),H.l(this,0),H.l(this,1))},
a_:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eL(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eL(y,a)}else return this.jj(a)},
jj:function(a){var z=this.d
if(z==null)return!1
return this.cr(this.cS(z,this.cq(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.cb(z,b)
return y==null?null:y.gbK()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.cb(x,b)
return y==null?null:y.gbK()}else return this.jk(b)},
jk:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cS(z,this.cq(a))
x=this.cr(y,a)
if(x<0)return
return y[x].gbK()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dM()
this.b=z}this.eE(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dM()
this.c=y}this.eE(y,b,c)}else this.jm(b,c)},
jm:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dM()
this.d=z}y=this.cq(a)
x=this.cS(z,y)
if(x==null)this.dX(z,y,[this.dN(a,b)])
else{w=this.cr(x,a)
if(w>=0)x[w].sbK(b)
else x.push(this.dN(a,b))}},
jL:function(a,b){var z
if(this.a_(a))return this.i(0,a)
z=b.$0()
this.m(0,a,z)
return z},
ap:function(a,b){if(typeof b==="string")return this.f1(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.f1(this.c,b)
else return this.jl(b)},
jl:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cS(z,this.cq(a))
x=this.cr(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.f4(w)
return w.gbK()},
aS:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
L:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
eE:function(a,b,c){var z=this.cb(a,b)
if(z==null)this.dX(a,b,this.dN(b,c))
else z.sbK(c)},
f1:function(a,b){var z
if(a==null)return
z=this.cb(a,b)
if(z==null)return
this.f4(z)
this.eM(a,b)
return z.gbK()},
dN:function(a,b){var z,y
z=new H.kh(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f4:function(a){var z,y
z=a.gi6()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
cq:function(a){return J.j(a)&0x3ffffff},
cr:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].gft(),b))return y
return-1},
k:function(a){return P.dn(this)},
cb:function(a,b){return a[b]},
cS:function(a,b){return a[b]},
dX:function(a,b,c){a[b]=c},
eM:function(a,b){delete a[b]},
eL:function(a,b){return this.cb(a,b)!=null},
dM:function(){var z=Object.create(null)
this.dX(z,"<non-identifier-key>",z)
this.eM(z,"<non-identifier-key>")
return z},
$isjY:1,
$isD:1,
t:{
eL:function(a,b){return new H.M(0,null,null,null,null,null,0,[a,b])}}},
ka:{"^":"a:0;a",
$1:function(a){return this.a.i(0,a)}},
kh:{"^":"d;ft:a<,bK:b@,c,i6:d<,$ti"},
ki:{"^":"S;a,$ti",
gl:function(a){return this.a.a},
gJ:function(a){return this.a.a===0},
gY:function(a){var z,y
z=this.a
y=new H.kj(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Z:function(a,b){return this.a.a_(b)},
L:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
kj:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
eJ:{"^":"d;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
gi2:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dg(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gi1:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dg(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
e0:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.o6(this,b,c)},
e_:function(a,b){return this.e0(a,b,0)},
hN:function(a,b){var z,y
z=this.gi2()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fZ(this,y)},
hM:function(a,b){var z,y
z=this.gi1()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fZ(this,y)},
fz:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return this.hM(b,c)},
$isdu:1,
t:{
dg:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eA("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fZ:{"^":"d;a,b",
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isb7:1},
o6:{"^":"cw;a,b,c",
gY:function(a){return new H.fP(this.a,this.b,this.c,null)},
$ascw:function(){return[P.b7]},
$asx:function(){return[P.b7]}},
fP:{"^":"d;a,b,c,d",
gF:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hN(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fq:{"^":"d;a,b,c",
i:function(a,b){if(b!==0)H.h(P.bZ(b,null,null))
return this.c},
$isb7:1},
p4:{"^":"x;a,b,c",
gY:function(a){return new H.p5(this.a,this.b,this.c,null)},
$asx:function(){return[P.b7]}},
p5:{"^":"d;a,b,c,d",
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
this.d=new H.fq(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
qE:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
r1:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
o7:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.pB()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cX(new P.o9(z),1)).observe(y,{childList:true})
return new P.o8(z,y,x)}else if(self.setImmediate!=null)return P.pC()
return P.pD()},
rX:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cX(new P.oa(a),0))},"$1","pB",2,0,11],
rY:[function(a){++init.globalState.f.b
self.setImmediate(H.cX(new P.ob(a),0))},"$1","pC",2,0,11],
rZ:[function(a){P.dI(C.w,a)},"$1","pD",2,0,11],
ay:function(a,b){P.dV(null,a)
return b.gfp()},
ao:function(a,b){P.dV(a,b)},
ax:function(a,b){b.bH(a)},
aw:function(a,b){b.e4(H.z(a),H.A(a))},
dV:function(a,b){var z,y,x,w
z=new P.pf(b)
y=new P.pg(b)
x=J.o(a)
if(!!x.$isC)a.dY(z,y)
else if(!!x.$isL)a.eo(z,y)
else{w=new P.C(0,$.n,null,[null])
w.a=4
w.c=a
w.dY(z,null)}},
ap:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.pz(z)},
cS:function(a,b,c){var z,y,x
if(b===0){if(c.geb())c.c.e3()
else c.a.b7()
return}else if(b===1){if(c.geb())c.c.e4(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.dZ(z,y)
c.a.b7()}return}if(a instanceof P.bG){if(c.geb()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aM(c.a,z)
P.cc(new P.pd(b,c))
return}else if(z===1){x=a.a
c.a.iE(x,!1).bL(new P.pe(b,c))
return}}P.dV(a,b)},
py:function(a){return a.gdt()},
e_:function(a,b){if(H.aq(a,{func:1,args:[P.ak,P.ak]})){b.toString
return a}else{b.toString
return a}},
at:function(a){return new P.p6(new P.C(0,$.n,null,[a]),[a])},
po:function(a,b,c){$.n.toString
a.aY(b,c)},
ps:function(){var z,y
for(;z=$.bj,z!=null;){$.bK=null
y=z.gc0()
$.bj=y
if(y==null)$.bJ=null
z.giG().$0()}},
t1:[function(){$.dW=!0
try{P.ps()}finally{$.bK=null
$.dW=!1
if($.bj!=null)$.$get$dM().$1(P.hi())}},"$0","hi",0,0,4],
hc:function(a){var z=new P.fQ(a,null)
if($.bj==null){$.bJ=z
$.bj=z
if(!$.dW)$.$get$dM().$1(P.hi())}else{$.bJ.b=z
$.bJ=z}},
px:function(a){var z,y,x
z=$.bj
if(z==null){P.hc(a)
$.bK=$.bJ
return}y=new P.fQ(a,null)
x=$.bK
if(x==null){y.b=z
$.bK=y
$.bj=y}else{y.b=x.b
x.b=y
$.bK=y
if(y.b==null)$.bJ=y}},
cc:function(a){var z=$.n
if(C.h===z){P.bl(null,null,C.h,a)
return}z.toString
P.bl(null,null,z,z.e1(a,!0))},
rT:function(a,b){return new P.p3(null,a,!1,[b])},
e0:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.n
w.toString
P.bk(null,null,w,z,y)}},
pt:[function(a,b){var z=$.n
z.toString
P.bk(null,null,z,a,b)},function(a){return P.pt(a,null)},"$2","$1","pF",2,2,14,0],
t0:[function(){},"$0","pE",0,0,4],
hb:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gb8()
w=t
v=x.gb6()
c.$2(w,v)}}},
ph:function(a,b,c,d){var z=a.bX()
if(!!J.o(z).$isL&&z!==$.$get$b5())z.bN(new P.pj(b,c,d))
else b.aY(c,d)},
h0:function(a,b){return new P.pi(a,b)},
h1:function(a,b,c){var z=a.bX()
if(!!J.o(z).$isL&&z!==$.$get$b5())z.bN(new P.pk(b,c))
else b.aX(c)},
pc:function(a,b,c){$.n.toString
a.bT(b,c)},
nz:function(a,b){var z=$.n
if(z===C.h){z.toString
return P.dI(a,b)}return P.dI(a,z.e1(b,!0))},
dI:function(a,b){var z=C.e.bw(a.a,1000)
return H.nw(z<0?0:z,b)},
nN:function(){return $.n},
bk:function(a,b,c,d,e){var z={}
z.a=d
P.px(new P.pv(z,e))},
h8:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
ha:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
h9:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
bl:function(a,b,c,d){var z=C.h!==c
if(z)d=c.e1(d,!(!z||!1))
P.hc(d)},
o9:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
o8:{"^":"a:28;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
oa:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ob:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pf:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
pg:{"^":"a:13;a",
$2:function(a,b){this.a.$2(1,new H.dc(a,b))}},
pz:{"^":"a:40;a",
$2:function(a,b){this.a(a,b)}},
pd:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcs()){z.b=!0
return}this.a.$2(null,0)}},
pe:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
oc:{"^":"d;a,b,c",
gdt:function(){return this.a.gdt()},
gcs:function(){return this.a.gcs()},
geb:function(){return this.c!=null},
n:function(a,b){return J.aM(this.a,b)},
dZ:function(a,b){return this.a.dZ(a,b)},
b7:function(){return this.a.b7()},
hu:function(a){var z=new P.of(a)
this.a=new P.ok(null,0,null,new P.oh(z),null,new P.oi(this,z),new P.oj(this,a),[null])},
t:{
od:function(a){var z=new P.oc(null,!1,null)
z.hu(a)
return z}}},
of:{"^":"a:1;a",
$0:function(){P.cc(new P.og(this.a))}},
og:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
oh:{"^":"a:1;a",
$0:function(){this.a.$0()}},
oi:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
oj:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjq()){z.c=new P.c4(new P.C(0,$.n,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cc(new P.oe(this.b))}return z.c.gfp()}}},
oe:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bG:{"^":"d;aq:a<,b",
k:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
t:{
bH:function(a){return new P.bG(a,1)},
aH:function(){return C.a7},
fV:function(a){return new P.bG(a,0)},
aI:function(a){return new P.bG(a,3)}}},
b_:{"^":"d;a,b,c,d",
gF:function(){var z=this.c
return z==null?this.b:z.gF()},
u:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.u())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bG){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ai(z)
if(!!w.$isb_){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
p7:{"^":"cw;a",
gY:function(a){return new P.b_(this.a(),null,null,null)},
$ascw:I.b2,
$asx:I.b2,
t:{
aJ:function(a){return new P.p7(a)}}},
L:{"^":"d;$ti"},
fS:{"^":"d;fp:a<,$ti",
e4:function(a,b){if(a==null)a=new P.cA()
if(this.a.a!==0)throw H.c(new P.F("Future already completed"))
$.n.toString
this.aY(a,b)},
cZ:function(a){return this.e4(a,null)}},
c4:{"^":"fS;a,$ti",
bH:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.bi(a)},
e3:function(){return this.bH(null)},
aY:function(a,b){this.a.eH(a,b)}},
p6:{"^":"fS;a,$ti",
bH:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.aX(a)},
e3:function(){return this.bH(null)},
aY:function(a,b){this.a.aY(a,b)}},
dR:{"^":"d;dP:a<,b,c,d,e,$ti",
giq:function(){return this.b.b},
gfs:function(){return(this.c&1)!==0},
gjb:function(){return(this.c&2)!==0},
gfq:function(){return this.c===8},
j9:function(a){return this.b.b.en(this.d,a)},
jA:function(a){if(this.c!==6)return!0
return this.b.b.en(this.d,a.gb8())},
j5:function(a){var z,y
z=this.e
y=this.b.b
if(H.aq(z,{func:1,args:[,,]}))return y.jT(z,a.gb8(),a.gb6())
else return y.en(z,a.gb8())},
ja:function(){return this.b.b.fP(this.d)}},
C:{"^":"d;cj:a<,b,ib:c<,$ti",
ghX:function(){return this.a===2},
gdL:function(){return this.a>=4},
eo:function(a,b){var z=$.n
if(z!==C.h){z.toString
if(b!=null)b=P.e_(b,z)}return this.dY(a,b)},
bL:function(a){return this.eo(a,null)},
dY:function(a,b){var z,y
z=new P.C(0,$.n,null,[null])
y=b==null?1:3
this.cN(new P.dR(null,z,y,a,b,[H.l(this,0),null]))
return z},
bN:function(a){var z,y
z=$.n
y=new P.C(0,z,null,this.$ti)
if(z!==C.h)z.toString
z=H.l(this,0)
this.cN(new P.dR(null,y,8,a,null,[z,z]))
return y},
cN:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdL()){y.cN(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bl(null,null,z,new P.ou(this,a))}},
eY:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdP()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdL()){v.eY(a)
return}this.a=v.a
this.c=v.c}z.a=this.cU(a)
y=this.b
y.toString
P.bl(null,null,y,new P.oB(z,this))}},
cT:function(){var z=this.c
this.c=null
return this.cU(z)},
cU:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdP()
z.a=y}return y},
aX:function(a){var z,y
z=this.$ti
if(H.aK(a,"$isL",z,"$asL"))if(H.aK(a,"$isC",z,null))P.cQ(a,this)
else P.fU(a,this)
else{y=this.cT()
this.a=4
this.c=a
P.bh(this,y)}},
aY:[function(a,b){var z=this.cT()
this.a=8
this.c=new P.cj(a,b)
P.bh(this,z)},function(a){return this.aY(a,null)},"kf","$2","$1","gbF",2,2,14,0],
bi:function(a){var z
if(H.aK(a,"$isL",this.$ti,"$asL")){this.hD(a)
return}this.a=1
z=this.b
z.toString
P.bl(null,null,z,new P.ow(this,a))},
hD:function(a){var z
if(H.aK(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bl(null,null,z,new P.oA(this,a))}else P.cQ(a,this)
return}P.fU(a,this)},
eH:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bl(null,null,z,new P.ov(this,a,b))},
hw:function(a,b){this.a=4
this.c=a},
$isL:1,
t:{
fU:function(a,b){var z,y,x
b.a=1
try{a.eo(new P.ox(b),new P.oy(b))}catch(x){z=H.z(x)
y=H.A(x)
P.cc(new P.oz(b,z,y))}},
cQ:function(a,b){var z,y,x
for(;a.ghX();)a=a.c
z=a.gdL()
y=b.c
if(z){b.c=null
x=b.cU(y)
b.a=a.a
b.c=a.c
P.bh(b,x)}else{b.a=2
b.c=a
a.eY(y)}},
bh:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gb8()
t=v.gb6()
y.toString
P.bk(null,null,y,u,t)}return}for(;b.gdP()!=null;b=s){s=b.a
b.a=null
P.bh(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfs()||b.gfq()){q=b.giq()
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
P.bk(null,null,y,u,t)
return}p=$.n
if(p==null?q!=null:p!==q)$.n=q
else p=null
if(b.gfq())new P.oE(z,x,w,b).$0()
else if(y){if(b.gfs())new P.oD(x,b,r).$0()}else if(b.gjb())new P.oC(z,x,b).$0()
if(p!=null)$.n=p
y=x.b
if(!!J.o(y).$isL){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.cU(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cQ(y,o)
return}}o=b.b
b=o.cT()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
ou:{"^":"a:1;a,b",
$0:function(){P.bh(this.a,this.b)}},
oB:{"^":"a:1;a,b",
$0:function(){P.bh(this.b,this.a.a)}},
ox:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.aX(a)}},
oy:{"^":"a:30;a",
$2:function(a,b){this.a.aY(a,b)},
$1:function(a){return this.$2(a,null)}},
oz:{"^":"a:1;a,b,c",
$0:function(){this.a.aY(this.b,this.c)}},
ow:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cT()
z.a=4
z.c=this.b
P.bh(z,y)}},
oA:{"^":"a:1;a,b",
$0:function(){P.cQ(this.b,this.a)}},
ov:{"^":"a:1;a,b,c",
$0:function(){this.a.aY(this.b,this.c)}},
oE:{"^":"a:4;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.ja()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gb8()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cj(y,x)
u.a=!0
return}if(!!J.o(z).$isL){if(z instanceof P.C&&z.gcj()>=4){if(z.gcj()===8){v=this.b
v.b=z.gib()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bL(new P.oF(t))
v.a=!1}}},
oF:{"^":"a:0;a",
$1:function(a){return this.a}},
oD:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.j9(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.cj(z,y)
w.a=!0}}},
oC:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jA(z)===!0&&w.e!=null){v=this.b
v.b=w.j5(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gb8()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cj(y,x)
s.a=!0}}},
fQ:{"^":"d;iG:a<,c0:b@"},
a6:{"^":"d;$ti",
aT:function(a,b){return new P.oT(b,this,[H.v(this,"a6",0),null])},
Z:function(a,b){var z,y
z={}
y=new P.C(0,$.n,null,[P.W])
z.a=null
z.a=this.au(new P.mJ(z,this,b,y),!0,new P.mK(y),y.gbF())
return y},
L:function(a,b){var z,y
z={}
y=new P.C(0,$.n,null,[null])
z.a=null
z.a=this.au(new P.mN(z,this,b,y),!0,new P.mO(y),y.gbF())
return y},
gl:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[P.u])
z.a=0
this.au(new P.mT(z),!0,new P.mU(z,y),y.gbF())
return y},
gJ:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[P.W])
z.a=null
z.a=this.au(new P.mP(z,y),!0,new P.mQ(y),y.gbF())
return y},
c4:function(a){var z,y,x
z=H.v(this,"a6",0)
y=H.t([],[z])
x=new P.C(0,$.n,null,[[P.I,z]])
this.au(new P.mV(this,y),!0,new P.mW(y,x),x.gbF())
return x},
bs:function(a){var z,y,x
z=H.v(this,"a6",0)
y=P.T(null,null,null,z)
x=new P.C(0,$.n,null,[[P.bB,z]])
this.au(new P.mX(this,y),!0,new P.mY(y,x),x.gbF())
return x},
gE:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[H.v(this,"a6",0)])
z.a=null
z.b=!1
this.au(new P.mR(z,this),!0,new P.mS(z,y),y.gbF())
return y}},
mJ:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hb(new P.mH(this.c,a),new P.mI(z,y),P.h0(z.a,y))},
$S:function(){return H.b0(function(a){return{func:1,args:[a]}},this.b,"a6")}},
mH:{"^":"a:1;a,b",
$0:function(){return J.f(this.b,this.a)}},
mI:{"^":"a:50;a,b",
$1:function(a){if(a===!0)P.h1(this.a.a,this.b,!0)}},
mK:{"^":"a:1;a",
$0:function(){this.a.aX(!1)}},
mN:{"^":"a;a,b,c,d",
$1:function(a){P.hb(new P.mL(this.c,a),new P.mM(),P.h0(this.a.a,this.d))},
$S:function(){return H.b0(function(a){return{func:1,args:[a]}},this.b,"a6")}},
mL:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
mM:{"^":"a:0;",
$1:function(a){}},
mO:{"^":"a:1;a",
$0:function(){this.a.aX(null)}},
mT:{"^":"a:0;a",
$1:function(a){++this.a.a}},
mU:{"^":"a:1;a,b",
$0:function(){this.b.aX(this.a.a)}},
mP:{"^":"a:0;a,b",
$1:function(a){P.h1(this.a.a,this.b,!1)}},
mQ:{"^":"a:1;a",
$0:function(){this.a.aX(!0)}},
mV:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b0(function(a){return{func:1,args:[a]}},this.a,"a6")}},
mW:{"^":"a:1;a,b",
$0:function(){this.b.aX(this.a)}},
mX:{"^":"a;a,b",
$1:function(a){this.b.n(0,a)},
$S:function(){return H.b0(function(a){return{func:1,args:[a]}},this.a,"a6")}},
mY:{"^":"a:1;a,b",
$0:function(){this.b.aX(this.a)}},
mR:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b0(function(a){return{func:1,args:[a]}},this.b,"a6")}},
mS:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aX(x.a)
return}try{x=H.ab()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.po(this.b,z,y)}}},
cR:{"^":"d;cj:b<,$ti",
gdt:function(){return new P.cO(this,this.$ti)},
gjq:function(){return(this.b&4)!==0},
gcs:function(){var z=this.b
return(z&1)!==0?this.gbv().geU():(z&2)===0},
gi4:function(){if((this.b&8)===0)return this.a
return this.a.gcF()},
dE:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dT(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcF()==null)y.c=new P.dT(null,null,0,this.$ti)
return y.c},
gbv:function(){if((this.b&8)!==0)return this.a.gcF()
return this.a},
c7:function(){if((this.b&4)!==0)return new P.F("Cannot add event after closing")
return new P.F("Cannot add event while adding a stream")},
iE:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c7())
if((z&2)!==0){z=new P.C(0,$.n,null,[null])
z.bi(null)
return z}z=this.a
y=new P.C(0,$.n,null,[null])
x=a.au(this.ghB(),!1,this.ghC(),this.ghy())
w=this.b
if((w&1)!==0?this.gbv().geU():(w&2)===0)x.cv()
this.a=new P.p_(z,y,x,this.$ti)
this.b|=8
return y},
eO:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b5():new P.C(0,$.n,null,[null])
this.c=z}return z},
n:[function(a,b){if(this.b>=4)throw H.c(this.c7())
this.bE(b)},"$1","giu",2,0,function(){return H.b0(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cR")}],
dZ:function(a,b){if(this.b>=4)throw H.c(this.c7())
if(a==null)a=new P.cA()
$.n.toString
this.bT(a,b)},
b7:function(){var z=this.b
if((z&4)!==0)return this.eO()
if(z>=4)throw H.c(this.c7())
z|=4
this.b=z
if((z&1)!==0)this.cg()
else if((z&3)===0)this.dE().n(0,C.u)
return this.eO()},
bE:[function(a){var z=this.b
if((z&1)!==0)this.cf(a)
else if((z&3)===0)this.dE().n(0,new P.dN(a,null,this.$ti))},"$1","ghB",2,0,function(){return H.b0(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cR")}],
bT:[function(a,b){var z=this.b
if((z&1)!==0)this.ci(a,b)
else if((z&3)===0)this.dE().n(0,new P.dO(a,b,null))},"$2","ghy",4,0,47],
dw:[function(){var z=this.a
this.a=z.gcF()
this.b&=4294967287
z.a.bi(null)},"$0","ghC",0,0,4],
ik:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.F("Stream has already been listened to."))
z=$.n
y=d?1:0
x=new P.oo(this,null,null,null,z,y,null,null,this.$ti)
x.eD(a,b,c,d,H.l(this,0))
w=this.gi4()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scF(x)
v.b.cA()}else this.a=x
x.ii(w)
x.dJ(new P.p1(this))
return x},
i8:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bX()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.C(0,$.n,null,[null])
u.eH(y,x)
z=u}else z=z.bN(w)
w=new P.p0(this)
if(z!=null)z=z.bN(w)
else w.$0()
return z}},
p1:{"^":"a:1;a",
$0:function(){P.e0(this.a.d)}},
p0:{"^":"a:4;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bi(null)}},
p9:{"^":"d;$ti",
cf:function(a){this.gbv().bE(a)},
ci:function(a,b){this.gbv().bT(a,b)},
cg:function(){this.gbv().dw()}},
ol:{"^":"d;$ti",
cf:function(a){this.gbv().bU(new P.dN(a,null,[H.l(this,0)]))},
ci:function(a,b){this.gbv().bU(new P.dO(a,b,null))},
cg:function(){this.gbv().bU(C.u)}},
ok:{"^":"cR+ol;a,b,c,d,e,f,r,$ti"},
p8:{"^":"cR+p9;a,b,c,d,e,f,r,$ti"},
cO:{"^":"p2;a,$ti",
gA:function(a){return(H.au(this.a)^892482866)>>>0},
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cO))return!1
return b.a===this.a}},
oo:{"^":"c5;x,a,b,c,d,e,f,r,$ti",
dQ:function(){return this.x.i8(this)},
dS:[function(){var z=this.x
if((z.b&8)!==0)z.a.cv()
P.e0(z.e)},"$0","gdR",0,0,4],
dU:[function(){var z=this.x
if((z.b&8)!==0)z.a.cA()
P.e0(z.f)},"$0","gdT",0,0,4]},
o4:{"^":"d;$ti",
cv:function(){this.b.cv()},
cA:function(){this.b.cA()},
bX:function(){var z=this.b.bX()
if(z==null){this.a.bi(null)
return}return z.bN(new P.o5(this))},
e3:function(){this.a.bi(null)}},
o5:{"^":"a:1;a",
$0:function(){this.a.a.bi(null)}},
p_:{"^":"o4;cF:c@,a,b,$ti"},
c5:{"^":"d;cj:e<,$ti",
ii:function(a){if(a==null)return
this.r=a
if(!a.gJ(a)){this.e=(this.e|64)>>>0
this.r.cI(this)}},
jG:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.fc()
if((z&4)===0&&(this.e&32)===0)this.dJ(this.gdR())},
cv:function(){return this.jG(null)},
cA:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gJ(z)}else z=!1
if(z)this.r.cI(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dJ(this.gdT())}}}},
bX:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dz()
z=this.f
return z==null?$.$get$b5():z},
geU:function(){return(this.e&4)!==0},
gcs:function(){return this.e>=128},
dz:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.fc()
if((this.e&32)===0)this.r=null
this.f=this.dQ()},
bE:["hk",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cf(a)
else this.bU(new P.dN(a,null,[H.v(this,"c5",0)]))}],
bT:["hl",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ci(a,b)
else this.bU(new P.dO(a,b,null))}],
dw:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cg()
else this.bU(C.u)},
dS:[function(){},"$0","gdR",0,0,4],
dU:[function(){},"$0","gdT",0,0,4],
dQ:function(){return},
bU:function(a){var z,y
z=this.r
if(z==null){z=new P.dT(null,null,0,[H.v(this,"c5",0)])
this.r=z}z.n(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cI(this)}},
cf:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fS(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dB((z&4)!==0)},
ci:function(a,b){var z,y
z=this.e
y=new P.on(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dz()
z=this.f
if(!!J.o(z).$isL&&z!==$.$get$b5())z.bN(y)
else y.$0()}else{y.$0()
this.dB((z&4)!==0)}},
cg:function(){var z,y
z=new P.om(this)
this.dz()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isL&&y!==$.$get$b5())y.bN(z)
else z.$0()},
dJ:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dB((z&4)!==0)},
dB:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gJ(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gJ(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dS()
else this.dU()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cI(this)},
eD:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.e_(b==null?P.pF():b,z)
this.c=c==null?P.pE():c}},
on:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aq(y,{func:1,args:[P.d,P.aS]})
w=z.d
v=this.b
u=z.b
if(x)w.jU(u,v,this.c)
else w.fS(u,v)
z.e=(z.e&4294967263)>>>0}},
om:{"^":"a:4;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fQ(z.c)
z.e=(z.e&4294967263)>>>0}},
p2:{"^":"a6;$ti",
au:function(a,b,c,d){return this.a.ik(a,d,c,!0===b)},
eh:function(a,b,c){return this.au(a,null,b,c)}},
dP:{"^":"d;c0:a@,$ti"},
dN:{"^":"dP;aq:b<,a,$ti",
ei:function(a){a.cf(this.b)}},
dO:{"^":"dP;b8:b<,b6:c<,a",
ei:function(a){a.ci(this.b,this.c)},
$asdP:I.b2},
op:{"^":"d;",
ei:function(a){a.cg()},
gc0:function(){return},
sc0:function(a){throw H.c(new P.F("No events after a done."))}},
oV:{"^":"d;cj:a<,$ti",
cI:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cc(new P.oW(this,a))
this.a=1},
fc:function(){if(this.a===1)this.a=3}},
oW:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gc0()
z.b=w
if(w==null)z.c=null
x.ei(this.b)}},
dT:{"^":"oV;b,c,a,$ti",
gJ:function(a){return this.c==null},
n:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sc0(b)
this.c=b}}},
p3:{"^":"d;a,b,c,$ti"},
pj:{"^":"a:1;a,b,c",
$0:function(){return this.a.aY(this.b,this.c)}},
pi:{"^":"a:13;a,b",
$2:function(a,b){P.ph(this.a,this.b,a,b)}},
pk:{"^":"a:1;a,b",
$0:function(){return this.a.aX(this.b)}},
dQ:{"^":"a6;$ti",
au:function(a,b,c,d){return this.hK(a,d,c,!0===b)},
eh:function(a,b,c){return this.au(a,null,b,c)},
hK:function(a,b,c,d){return P.ot(this,a,b,c,d,H.v(this,"dQ",0),H.v(this,"dQ",1))},
eR:function(a,b){b.bE(a)},
hV:function(a,b,c){c.bT(a,b)},
$asa6:function(a,b){return[b]}},
fT:{"^":"c5;x,y,a,b,c,d,e,f,r,$ti",
bE:function(a){if((this.e&2)!==0)return
this.hk(a)},
bT:function(a,b){if((this.e&2)!==0)return
this.hl(a,b)},
dS:[function(){var z=this.y
if(z==null)return
z.cv()},"$0","gdR",0,0,4],
dU:[function(){var z=this.y
if(z==null)return
z.cA()},"$0","gdT",0,0,4],
dQ:function(){var z=this.y
if(z!=null){this.y=null
return z.bX()}return},
kh:[function(a){this.x.eR(a,this)},"$1","ghS",2,0,function(){return H.b0(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fT")}],
kj:[function(a,b){this.x.hV(a,b,this)},"$2","ghU",4,0,26],
ki:[function(){this.dw()},"$0","ghT",0,0,4],
hv:function(a,b,c,d,e,f,g){this.y=this.x.a.eh(this.ghS(),this.ghT(),this.ghU())},
$asc5:function(a,b){return[b]},
t:{
ot:function(a,b,c,d,e,f,g){var z,y
z=$.n
y=e?1:0
y=new P.fT(a,null,null,null,null,z,y,null,null,[f,g])
y.eD(b,c,d,e,g)
y.hv(a,b,c,d,e,f,g)
return y}}},
oT:{"^":"dQ;b,a,$ti",
eR:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.pc(b,y,x)
return}b.bE(z)}},
cj:{"^":"d;b8:a<,b6:b<",
k:function(a){return H.b(this.a)},
$isY:1},
pb:{"^":"d;"},
pv:{"^":"a:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cA()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.i(y)
throw x}},
oX:{"^":"pb;",
fQ:function(a){var z,y,x,w
try{if(C.h===$.n){x=a.$0()
return x}x=P.h8(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bk(null,null,this,z,y)
return x}},
fS:function(a,b){var z,y,x,w
try{if(C.h===$.n){x=a.$1(b)
return x}x=P.ha(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bk(null,null,this,z,y)
return x}},
jU:function(a,b,c){var z,y,x,w
try{if(C.h===$.n){x=a.$2(b,c)
return x}x=P.h9(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bk(null,null,this,z,y)
return x}},
e1:function(a,b){if(b)return new P.oY(this,a)
else return new P.oZ(this,a)},
i:function(a,b){return},
fP:function(a){if($.n===C.h)return a.$0()
return P.h8(null,null,this,a)},
en:function(a,b){if($.n===C.h)return a.$1(b)
return P.ha(null,null,this,a,b)},
jT:function(a,b,c){if($.n===C.h)return a.$2(b,c)
return P.h9(null,null,this,a,b,c)}},
oY:{"^":"a:1;a,b",
$0:function(){return this.a.fQ(this.b)}},
oZ:{"^":"a:1;a,b",
$0:function(){return this.a.fP(this.b)}}}],["","",,P,{"^":"",
dj:function(a,b){return new H.M(0,null,null,null,null,null,0,[a,b])},
aQ:function(){return new H.M(0,null,null,null,null,null,0,[null,null])},
ac:function(a){return H.qF(a,new H.M(0,null,null,null,null,null,0,[null,null]))},
k7:function(a,b,c){var z,y
if(P.dX(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bL()
y.push(a)
try{P.pr(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.fp(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bT:function(a,b,c){var z,y,x
if(P.dX(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$bL()
y.push(a)
try{x=z
x.w=P.fp(x.gw(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.w=y.gw()+c
y=z.gw()
return y.charCodeAt(0)==0?y:y},
dX:function(a){var z,y
for(z=0;y=$.$get$bL(),z<y.length;++z)if(a===y[z])return!0
return!1},
pr:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
kk:function(a,b,c,d,e){return new H.M(0,null,null,null,null,null,0,[d,e])},
bX:function(a,b,c){var z=P.kk(null,null,null,b,c)
a.L(0,new P.pI(z))
return z},
T:function(a,b,c,d){return new P.fW(0,null,null,null,null,null,0,[d])},
aX:function(a,b){var z,y
z=P.T(null,null,null,b)
for(y=J.ai(a);y.u();)z.n(0,y.gF())
return z},
dn:function(a){var z,y,x
z={}
if(P.dX(a))return"{...}"
y=new P.bF("")
try{$.$get$bL().push(a)
x=y
x.w=x.gw()+"{"
z.a=!0
a.L(0,new P.ks(z,y))
z=y
z.w=z.gw()+"}"}finally{z=$.$get$bL()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gw()
return z.charCodeAt(0)==0?z:z},
fX:{"^":"M;a,b,c,d,e,f,r,$ti",
cq:function(a){return H.qX(a)&0x3ffffff},
cr:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gft()
if(x==null?b==null:x===b)return y}return-1},
t:{
bI:function(a,b){return new P.fX(0,null,null,null,null,null,0,[a,b])}}},
fW:{"^":"oG;a,b,c,d,e,f,r,$ti",
dO:function(){return new P.fW(0,null,null,null,null,null,0,this.$ti)},
gY:function(a){var z=new P.an(this,this.r,null,null,[null])
z.c=this.e
return z},
gl:function(a){return this.a},
gJ:function(a){return this.a===0},
gac:function(a){return this.a!==0},
Z:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hI(b)},
hI:function(a){var z=this.d
if(z==null)return!1
return this.cQ(z[this.cP(a)],a)>=0},
c_:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.Z(0,a)?a:null
else return this.hZ(a)},
hZ:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cP(a)]
x=this.cQ(y,a)
if(x<0)return
return J.as(y,x).geN()},
L:function(a,b){var z,y
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
z=y}return this.eI(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eI(x,b)}else return this.ar(b)},
ar:function(a){var z,y,x
z=this.d
if(z==null){z=P.oP()
this.d=z}y=this.cP(a)
x=z[y]
if(x==null)z[y]=[this.dC(a)]
else{if(this.cQ(x,a)>=0)return!1
x.push(this.dC(a))}return!0},
ap:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eJ(this.c,b)
else return this.i9(b)},
i9:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cP(a)]
x=this.cQ(y,a)
if(x<0)return!1
this.eK(y.splice(x,1)[0])
return!0},
hP:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.ap(0,y)}},
aS:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eI:function(a,b){if(a[b]!=null)return!1
a[b]=this.dC(b)
return!0},
eJ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eK(z)
delete a[b]
return!0},
dC:function(a){var z,y
z=new P.oO(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eK:function(a){var z,y
z=a.ghH()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cP:function(a){return J.j(a)&0x3ffffff},
cQ:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.f(a[y].geN(),b))return y
return-1},
$isbB:1,
$isS:1,
t:{
oP:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
oO:{"^":"d;eN:a<,b,hH:c<"},
an:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
oG:{"^":"m1;$ti",
bs:function(a){var z=this.dO()
z.am(0,this)
return z}},
cw:{"^":"x;$ti"},
pI:{"^":"a:6;a",
$2:function(a,b){this.a.m(0,a,b)}},
eM:{"^":"eR;$ti"},
eR:{"^":"d+aY;$ti",$asI:null,$asS:null,$isI:1,$isS:1},
aY:{"^":"d;$ti",
gY:function(a){return new H.dk(this,this.gl(this),0,null,[H.v(this,"aY",0)])},
ah:function(a,b){return this.i(0,b)},
L:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){b.$1(this.i(0,y))
if(z!==this.gl(this))throw H.c(new P.B(this))}},
gJ:function(a){return this.gl(this)===0},
gac:function(a){return!this.gJ(this)},
gE:function(a){if(this.gl(this)===0)throw H.c(H.ab())
return this.i(0,this.gl(this)-1)},
Z:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<this.gl(this);++y){if(J.f(this.i(0,y),b))return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bW:function(a,b){var z,y
z=this.gl(this)
for(y=0;y<z;++y){if(b.$1(this.i(0,y))===!0)return!0
if(z!==this.gl(this))throw H.c(new P.B(this))}return!1},
bo:function(a,b,c){var z,y,x
z=this.gl(this)
for(y=0;y<z;++y){x=this.i(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gl(this))throw H.c(new P.B(this))}return c.$0()},
aT:function(a,b){return new H.aj(this,b,[H.v(this,"aY",0),null])},
dr:function(a,b){return H.fr(this,b,null,H.v(this,"aY",0))},
bs:function(a){var z,y
z=P.T(null,null,null,H.v(this,"aY",0))
for(y=0;y<this.gl(this);++y)z.n(0,this.i(0,y))
return z},
n:function(a,b){var z=this.gl(this)
this.sl(0,z+1)
this.m(0,z,b)},
ap:function(a,b){var z
for(z=0;z<this.gl(this);++z)if(J.f(this.i(0,z),b)){this.aK(0,z,this.gl(this)-1,this,z+1)
this.sl(0,this.gl(this)-1)
return!0}return!1},
hO:function(a,b){var z,y,x,w
z=H.t([],[H.v(this,"aY",0)])
y=this.gl(this)
for(x=0;x<y;++x){w=this.i(0,x)
if(J.f(a.$1(w),b))z.push(w)
if(y!==this.gl(this))throw H.c(new P.B(this))}if(z.length!==this.gl(this)){this.hc(0,0,z.length,z)
this.sl(0,z.length)}},
aK:function(a,b,c,d,e){var z,y,x,w,v
P.cF(b,c,this.gl(this),null,null,null)
z=c-b
if(z===0)return
if(H.aK(d,"$isI",[H.v(this,"aY",0)],"$asI")){y=e
x=d}else{x=J.i0(d,e).br(0,!1)
y=0}w=J.J(x)
if(y+z>w.gl(x))throw H.c(H.eD())
if(y<b)for(v=z-1;v>=0;--v)this.m(0,b+v,w.i(x,y+v))
else for(v=0;v<z;++v)this.m(0,b+v,w.i(x,y+v))},
hc:function(a,b,c,d){return this.aK(a,b,c,d,0)},
k:function(a){return P.bT(this,"[","]")},
$isI:1,
$isS:1},
pa:{"^":"d;$ti",
m:function(a,b,c){throw H.c(new P.N("Cannot modify unmodifiable map"))},
$isD:1},
kq:{"^":"d;$ti",
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){this.a.m(0,b,c)},
a_:function(a){return this.a.a_(a)},
L:function(a,b){this.a.L(0,b)},
gJ:function(a){var z=this.a
return z.gJ(z)},
gac:function(a){var z=this.a
return z.gac(z)},
gl:function(a){var z=this.a
return z.gl(z)},
k:function(a){return this.a.k(0)},
$isD:1},
fN:{"^":"kq+pa;a,$ti",$asD:null,$isD:1},
ks:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.w+=", "
z.a=!1
z=this.b
y=z.w+=H.b(a)
z.w=y+": "
z.w+=H.b(b)}},
kl:{"^":"aR;a,b,c,d,$ti",
gY:function(a){return new P.fY(this,this.c,this.d,this.b,null,this.$ti)},
L:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
gJ:function(a){return this.b===this.c},
gl:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gE:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.c(H.ab())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.e(z,y)
return z[y]},
ah:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.ct(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
n:function(a,b){this.ar(b)},
am:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aK(b,"$isI",z,"$asI")){y=b.gl(b)
x=this.gl(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.km(w+(w>>>1))
if(typeof t!=="number")return H.y(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.ip(s)
this.a=s
this.b=0
C.a.aK(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aK(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aK(v,z,z+r,b,0)
C.a.aK(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.fY(b,b.c,b.d,b.b,null,[H.l(b,0)]);z.u();)this.ar(z.e)},
aS:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bT(this,"{","}")},
fa:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eQ();++this.d},
d6:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.ab());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ar:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.e(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.eQ();++this.d},
eQ:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.t(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aK(y,0,w,z,x)
C.a.aK(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ip:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aK(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aK(a,0,v,x,z)
C.a.aK(a,v,v+this.c,this.a,0)
return this.c+v}},
hn:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
t:{
aZ:function(a,b){var z=new P.kl(null,0,0,0,[b])
z.hn(a,b)
return z},
km:function(a){var z
a=C.r.ev(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
fY:{"^":"d;a,b,c,d,e,$ti",
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
m2:{"^":"d;$ti",
gJ:function(a){return this.a===0},
gac:function(a){return this.a!==0},
am:function(a,b){var z
for(z=J.ai(b);z.u();)this.n(0,z.gF())},
iL:function(a){var z,y
for(z=a.a,y=new P.an(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.Z(0,y.d))return!1
return!0},
br:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sl(z,this.a)
for(y=new P.an(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
c4:function(a){return this.br(a,!0)},
aT:function(a,b){return new H.bu(this,b,[H.l(this,0),null])},
k:function(a){return P.bT(this,"{","}")},
L:function(a,b){var z
for(z=new P.an(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
b1:function(a,b,c){var z,y
for(z=new P.an(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.an(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.ab())
do y=z.d
while(z.u())
return y},
bo:function(a,b,c){var z,y
for(z=new P.an(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
aF:function(a,b){var z,y,x,w
for(z=new P.an(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.de())
y=w
x=!0}}if(x)return y
throw H.c(H.ab())},
$isbB:1,
$isS:1},
m1:{"^":"m2;$ti"}}],["","",,P,{"^":"",
cT:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.oJ(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cT(a[z])
return a},
pu:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.O(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eA(w,null,null))}w=P.cT(z)
return w},
t_:[function(a){return a.dc()},"$1","qx",2,0,0],
oJ:{"^":"d;a,b,c",
i:function(a,b){var z,y
z=this.b
if(z==null)return this.c.i(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.i7(b):y}},
gl:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.c9().length
return z},
gJ:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.c9().length
return z===0},
gac:function(a){var z
if(this.b==null){z=this.c
z=z.gl(z)}else z=this.c9().length
return z>0},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.a_(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.im().m(0,b,c)},
a_:function(a){if(this.b==null)return this.c.a_(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
L:function(a,b){var z,y,x,w
if(this.b==null)return this.c.L(0,b)
z=this.c9()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cT(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
k:function(a){return P.dn(this)},
c9:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
im:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dj(P.q,null)
y=this.c9()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.i(0,v))}if(w===0)y.push(null)
else C.a.sl(y,0)
this.b=null
this.a=null
this.c=z
return z},
i7:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cT(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:function(){return[P.q,null]}},
ep:{"^":"d;$ti"},
cp:{"^":"d;$ti"},
di:{"^":"Y;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
kd:{"^":"di;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
kc:{"^":"ep;a,b",
iP:function(a,b){var z=P.pu(a,this.giQ().a)
return z},
iO:function(a){return this.iP(a,null)},
iY:function(a,b){var z=this.giZ()
z=P.oL(a,z.b,z.a)
return z},
fj:function(a){return this.iY(a,null)},
giZ:function(){return C.N},
giQ:function(){return C.M},
$asep:function(){return[P.d,P.q]}},
kf:{"^":"cp;a,b",
$ascp:function(){return[P.d,P.q]}},
ke:{"^":"cp;a",
$ascp:function(){return[P.q,P.d]}},
oM:{"^":"d;",
h_:function(a){var z,y,x,w,v,u,t
z=J.J(a)
y=z.gl(a)
if(typeof y!=="number")return H.y(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cn(a,v)
if(u>92)continue
if(u<32){if(v>w)x.w+=C.b.aH(a,w,v)
w=v+1
x.w+=H.ae(92)
switch(u){case 8:x.w+=H.ae(98)
break
case 9:x.w+=H.ae(116)
break
case 10:x.w+=H.ae(110)
break
case 12:x.w+=H.ae(102)
break
case 13:x.w+=H.ae(114)
break
default:x.w+=H.ae(117)
x.w+=H.ae(48)
x.w+=H.ae(48)
t=u>>>4&15
x.w+=H.ae(t<10?48+t:87+t)
t=u&15
x.w+=H.ae(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.w+=C.b.aH(a,w,v)
w=v+1
x.w+=H.ae(92)
x.w+=H.ae(u)}}if(w===0)x.w+=H.b(a)
else if(w<y)x.w+=z.aH(a,w,y)},
dA:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.kd(a,null))}z.push(a)},
df:function(a){var z,y,x,w
if(this.fZ(a))return
this.dA(a)
try{z=this.b.$1(a)
if(!this.fZ(z))throw H.c(new P.di(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.di(a,y))}},
fZ:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.w+=C.i.k(a)
return!0}else if(a===!0){this.c.w+="true"
return!0}else if(a===!1){this.c.w+="false"
return!0}else if(a==null){this.c.w+="null"
return!0}else if(typeof a==="string"){z=this.c
z.w+='"'
this.h_(a)
z.w+='"'
return!0}else{z=J.o(a)
if(!!z.$isI){this.dA(a)
this.ka(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.dA(a)
y=this.kb(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
ka:function(a){var z,y,x
z=this.c
z.w+="["
y=J.J(a)
if(y.gl(a)>0){this.df(y.i(a,0))
for(x=1;x<y.gl(a);++x){z.w+=","
this.df(y.i(a,x))}}z.w+="]"},
kb:function(a){var z,y,x,w,v,u,t
z={}
if(a.gJ(a)){this.c.w+="{}"
return!0}y=a.gl(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.L(0,new P.oN(z,x))
if(!z.b)return!1
w=this.c
w.w+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.w+=v
this.h_(x[u])
w.w+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.df(x[t])}w.w+="}"
return!0}},
oN:{"^":"a:6;a,b",
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
oK:{"^":"oM;c,a,b",t:{
oL:function(a,b,c){var z,y,x
z=new P.bF("")
y=new P.oK(z,[],P.qx())
y.df(a)
x=z.w
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
rr:[function(a,b){return J.cf(a,b)},"$2","qy",4,0,41],
ev:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.i(a)
if(typeof a==="string")return JSON.stringify(a)
return P.jx(a)},
jx:function(a){var z=J.o(a)
if(!!z.$isa)return z.k(a)
return H.cC(a)},
cr:function(a){return new P.os(a)},
U:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.ai(a);y.u();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
kn:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
e9:function(a){H.r1(H.b(a))},
bb:function(a,b,c){return new H.eJ(a,H.dg(a,!1,b,!1),null,null)},
W:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
cq:{"^":"d;io:a<,b",
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.cq))return!1
return this.a===b.a&&!0},
bm:function(a,b){return C.e.bm(this.a,b.gio())},
gA:function(a){var z=this.a
return(z^C.e.cW(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.j5(H.lc(this))
y=P.bQ(H.la(this))
x=P.bQ(H.l6(this))
w=P.bQ(H.l7(this))
v=P.bQ(H.l9(this))
u=P.bQ(H.lb(this))
t=P.j6(H.l8(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
n:function(a,b){var z,y
z=this.a+b.gjf()
y=new P.cq(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.h(P.E(y.gjB()))
return y},
gjB:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.cq]},
t:{
j5:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
j6:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bQ:function(a){if(a>=10)return""+a
return"0"+a}}},
aL:{"^":"K;",$isQ:1,
$asQ:function(){return[P.K]}},
"+double":0,
aW:{"^":"d;bG:a<",
a5:function(a,b){return new P.aW(this.a+b.gbG())},
aM:function(a,b){return new P.aW(this.a-b.gbG())},
bQ:function(a,b){return new P.aW(C.i.em(this.a*b))},
aJ:function(a,b){return C.e.aJ(this.a,b.gbG())},
bC:function(a,b){return this.a>b.gbG()},
bP:function(a,b){return C.e.bP(this.a,b.gbG())},
bA:function(a,b){return C.e.bA(this.a,b.gbG())},
gjf:function(){return C.e.bw(this.a,1000)},
v:function(a,b){if(b==null)return!1
if(!(b instanceof P.aW))return!1
return this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
bm:function(a,b){return C.e.bm(this.a,b.gbG())},
k:function(a){var z,y,x,w,v
z=new P.jg()
y=this.a
if(y<0)return"-"+new P.aW(0-y).k(0)
x=z.$1(C.e.bw(y,6e7)%60)
w=z.$1(C.e.bw(y,1e6)%60)
v=new P.jf().$1(y%1e6)
return""+C.e.bw(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eu:function(a){return new P.aW(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aW]}},
jf:{"^":"a:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
jg:{"^":"a:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Y:{"^":"d;",
gb6:function(){return H.A(this.$thrownJsError)}},
cA:{"^":"Y;",
k:function(a){return"Throw of null."}},
aV:{"^":"Y;a,b,h:c<,d",
gdG:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdF:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdG()+y+x
if(!this.a)return w
v=this.gdF()
u=P.ev(this.b)
return w+v+": "+H.b(u)},
t:{
E:function(a){return new P.aV(!1,null,null,a)},
ci:function(a,b,c){return new P.aV(!0,a,b,c)},
m:function(a){return new P.aV(!1,null,a,"Must not be null")}}},
dy:{"^":"aV;e,f,a,b,c,d",
gdG:function(){return"RangeError"},
gdF:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
t:{
lg:function(a){return new P.dy(null,null,!1,null,null,a)},
bZ:function(a,b,c){return new P.dy(null,null,!0,a,b,"Value not in range")},
V:function(a,b,c,d,e){return new P.dy(b,c,!0,a,d,"Invalid value")},
lh:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.V(a,b,c,d,e))},
cF:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.V(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.V(b,a,c,"end",f))
return b}}},
jX:{"^":"aV;e,l:f>,a,b,c,d",
gdG:function(){return"RangeError"},
gdF:function(){if(J.ce(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
t:{
ct:function(a,b,c,d,e){var z=e!=null?e:J.aD(b)
return new P.jX(b,z,!0,a,c,"Index out of range")}}},
N:{"^":"Y;a",
k:function(a){return"Unsupported operation: "+this.a}},
a4:{"^":"Y;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
F:{"^":"Y;a",
k:function(a){return"Bad state: "+this.a}},
B:{"^":"Y;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.ev(z))+"."}},
kJ:{"^":"d;",
k:function(a){return"Out of Memory"},
gb6:function(){return},
$isY:1},
fh:{"^":"d;",
k:function(a){return"Stack Overflow"},
gb6:function(){return},
$isY:1},
j4:{"^":"Y;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
os:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eA:{"^":"d;a,b,c",
k:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.aH(x,0,75)+"..."
return y+"\n"+x}},
jB:{"^":"d;h:a<,eV,$ti",
k:function(a){return"Expando:"+H.b(this.a)},
i:function(a,b){var z,y
z=this.eV
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.ci(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dx(b,"expando$values")
return y==null?null:H.dx(y,z)},
m:function(a,b,c){var z,y
z=this.eV
if(typeof z!=="string")z.set(b,c)
else{y=H.dx(b,"expando$values")
if(y==null){y=new P.d()
H.eZ(b,"expando$values",y)}H.eZ(y,z,c)}}},
bw:{"^":"d;"},
u:{"^":"K;",$isQ:1,
$asQ:function(){return[P.K]}},
"+int":0,
x:{"^":"d;$ti",
aT:function(a,b){return H.bx(this,b,H.v(this,"x",0),null)},
bO:["eC",function(a,b){return new H.H(this,b,[H.v(this,"x",0)])}],
Z:function(a,b){var z
for(z=this.gY(this);z.u();)if(J.f(z.gF(),b))return!0
return!1},
L:function(a,b){var z
for(z=this.gY(this);z.u();)b.$1(z.gF())},
b1:function(a,b,c){var z,y
for(z=this.gY(this),y=b;z.u();)y=c.$2(y,z.gF())
return y},
br:function(a,b){return P.U(this,b,H.v(this,"x",0))},
c4:function(a){return this.br(a,!0)},
bs:function(a){return P.aX(this,H.v(this,"x",0))},
gl:function(a){var z,y
z=this.gY(this)
for(y=0;z.u();)++y
return y},
gJ:function(a){return!this.gY(this).u()},
gac:function(a){return!this.gJ(this)},
dr:function(a,b){return H.m3(this,b,H.v(this,"x",0))},
gE:function(a){var z,y
z=this.gY(this)
if(!z.u())throw H.c(H.ab())
do y=z.gF()
while(z.u())
return y},
gbS:function(a){var z,y
z=this.gY(this)
if(!z.u())throw H.c(H.ab())
y=z.gF()
if(z.u())throw H.c(H.de())
return y},
ah:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.m("index"))
if(b<0)H.h(P.V(b,0,null,"index",null))
for(z=this.gY(this),y=0;z.u();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.ct(b,this,"index",null,y))},
k:function(a){return P.k7(this,"(",")")}},
cx:{"^":"d;$ti"},
I:{"^":"d;$ti",$isx:1,$isS:1},
"+List":0,
D:{"^":"d;$ti"},
ak:{"^":"d;",
gA:function(a){return P.d.prototype.gA.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isQ:1,
$asQ:function(){return[P.K]}},
"+num":0,
d:{"^":";",
v:function(a,b){return this===b},
gA:function(a){return H.au(this)},
k:function(a){return H.cC(this)},
gbe:function(a){return new H.am(H.hu(this),null)},
toString:function(){return this.k(this)}},
b7:{"^":"d;"},
bB:{"^":"S;$ti"},
aS:{"^":"d;"},
q:{"^":"d;",$isQ:1,
$asQ:function(){return[P.q]},
$isdu:1},
"+String":0,
bF:{"^":"d;w<",
gl:function(a){return this.w.length},
gJ:function(a){return this.w.length===0},
gac:function(a){return this.w.length!==0},
k:function(a){var z=this.w
return z.charCodeAt(0)==0?z:z},
t:{
fp:function(a,b,c){var z=J.ai(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.u())}else{a+=H.b(z.gF())
for(;z.u();)a=a+c+H.b(z.gF())}return a},
n0:function(a){return new P.bF(a)}}}}],["","",,P,{"^":"",f7:{"^":"d;"}}],["","",,P,{"^":"",
cD:function(a){return C.F},
oI:{"^":"d;",
ab:function(a){if(a<=0||a>4294967296)throw H.c(P.lg("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fD:function(){return Math.random()}}}],["","",,S,{"^":"",iV:{"^":"d;a,b,$ti",
i:function(a,b){return this.b.i(0,b)},
a_:function(a){return this.b.a_(a)},
L:function(a,b){return this.b.L(0,b)},
gJ:function(a){var z=this.b
return z.gJ(z)},
gac:function(a){var z=this.b
return z.gac(z)},
gl:function(a){var z=this.b
return z.gl(z)},
m:function(a,b,c){this.hJ()
this.b.m(0,b,c)},
k:function(a){return J.i(this.b)},
hJ:function(){if(!this.a)return
this.a=!1
this.b=P.bX(this.b,H.l(this,0),H.l(this,1))},
$isD:1}}],["","",,A,{"^":"",iW:{"^":"d;a,b,$ti",
gl:function(a){return this.b.a},
c_:function(a){return this.b.c_(a)},
Z:function(a,b){return this.b.Z(0,b)},
L:function(a,b){return this.b.L(0,b)},
gJ:function(a){return this.b.a===0},
gac:function(a){return this.b.a!==0},
gY:function(a){var z,y
z=this.b
y=new P.an(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aT:function(a,b){var z=this.b
z.toString
return new H.bu(z,b,[H.l(z,0),null])},
bs:function(a){var z,y
z=this.b
y=z.dO()
y.am(0,z)
return y},
n:function(a,b){this.i0()
return this.b.n(0,b)},
k:function(a){return J.i(this.b)},
i0:function(){if(!this.a)return
this.a=!1
this.b=P.aX(this.b,H.l(this,0))},
$isbB:1,
$isS:1}}],["","",,S,{"^":"",d7:{"^":"d;eX:a<,b,$ti",
a7:function(a){var z=new S.ad(null,null,this.$ti)
z.as()
z.p(this)
a.$1(z)
return z.q()},
gA:function(a){var z=this.b
if(z==null){z=X.bo(this.a)
this.b=z}return z},
v:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isd7)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
k:function(a){return J.i(this.a)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gl:function(a){return this.a.length},
gY:function(a){var z=this.a
return new J.bO(z,z.length,0,null,[H.l(z,0)])},
aT:function(a,b){var z=this.a
z.toString
return new H.aj(z,b,[H.l(z,0),null])},
Z:function(a,b){var z=this.a
return(z&&C.a).Z(z,b)},
L:function(a,b){var z=this.a
return(z&&C.a).L(z,b)},
bs:function(a){var z=this.a
z.toString
return P.aX(z,H.l(z,0))},
gJ:function(a){return this.a.length===0},
gac:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
as:function(){if(new H.am(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new BuiltList<int>"'))}},ad:{"^":"d;eX:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.d7(z,null,this.$ti)
y.as()
this.a=z
this.b=y
z=y}return z},
p:function(a){if(H.aK(a,"$isd7",this.$ti,null)){this.a=a.geX()
this.b=a}else{this.a=P.U(a,!0,H.l(this,0))
this.b=null}},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z
if(c==null)H.h(P.E("null element"))
z=this.gdW()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
n:function(a,b){var z
if(b==null)H.h(P.E("null element"))
z=this.gdW();(z&&C.a).n(z,b)},
ap:function(a,b){var z=this.gdW();(z&&C.a).ap(z,b)},
aT:function(a,b){var z=this.a
z.toString
z=new H.aj(z,b,[H.l(z,0),null]).br(0,!0)
this.a=z
this.b=null
this.hE(z)},
gdW:function(){if(this.b!=null){this.a=P.U(this.a,!0,H.l(this,0))
this.b=null}return this.a},
as:function(){if(new H.am(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new ListBuilder<int>"'))},
hE:function(a){var z,y,x,w
for(z=a.length,y=H.l(this,0),x=0;x<a.length;a.length===z||(0,H.ar)(a),++x){w=a[x]
if(!H.cW(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",cm:{"^":"d;i_:a<,b,c,d,$ti",
a7:function(a){var z=new A.dm(null,null,this.$ti)
z.cd()
z.p(this)
a.$1(z)
return z.q()},
C:function(){return new S.iV(!0,this.a,this.$ti)},
gA:function(a){var z=this.b
if(z==null){z=this.a.gbY()
z=H.bx(z,new A.iG(this),H.v(z,"x",0),null)
z=P.U(z,!1,H.v(z,"x",0))
C.a.ey(z)
z=X.bo(z)
this.b=z}return z},
v:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$iscm)return!1
y=b.a
x=this.a
if(y.gl(y)!==x.gl(x))return!1
z=z.gA(b)
w=this.gA(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbY()
this.c=z}z=z.gY(z)
for(;z.u();){v=z.gF()
if(!J.f(y.i(0,v),x.i(0,v)))return!1}return!0},
k:function(a){return J.i(this.a)},
i:function(a,b){return this.a.i(0,b)},
L:function(a,b){this.a.L(0,b)},
gJ:function(a){var z=this.a
return z.gJ(z)},
gac:function(a){var z=this.a
return z.gac(z)},
gl:function(a){var z=this.a
return z.gl(z)},
cd:function(){if(new H.am(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.am(H.R(H.l(this,1)),null).v(0,C.n))throw H.c(new P.N('explicit value type required, for example "new BuiltMap<int, int>"'))}},iG:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.i(0,a))
return X.cU(X.aT(X.aT(0,J.j(z)),J.j(y)))}},dm:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.cm(this.a,null,null,null,this.$ti)
z.cd()
this.b=z}return z},
p:function(a){var z
if(H.aK(a,"$iscm",this.$ti,null)){this.b=a
this.a=a.gi_()}else if(!!a.$iscm){z=P.bX(a.a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.bX(a,H.l(this,0),H.l(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gbe(a))))},
i:function(a,b){return this.a.i(0,b)},
m:function(a,b,c){if(c==null)H.h(P.E("null value"))
this.gic().m(0,b,c)},
gic:function(){if(this.b!=null){this.a=P.bX(this.a,H.l(this,0),H.l(this,1))
this.b=null}return this.a},
cd:function(){if(new H.am(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.am(H.R(H.l(this,1)),null).v(0,C.n))throw H.c(new P.N('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",d8:{"^":"d;ig:a<,b,$ti",
a7:function(a){var z=new L.bc(null,null,this.$ti)
z.bj()
z.p(this)
a.$1(z)
return z.q()},
gA:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.U(new H.bu(z,new L.iH(),[H.l(z,0),null]),!1,null)
C.a.ey(z)
z=X.bo(z)
this.b=z}return z},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isd8)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gA(b)
x=this.gA(this)
if(z==null?x!=null:z!==x)return!1
return y.iL(b)},
k:function(a){return J.i(this.a)},
gl:function(a){return this.a.a},
c_:function(a){return this.a.c_(a)},
gY:function(a){var z,y
z=this.a
y=new P.an(z,z.r,null,null,[null])
y.c=z.e
return y},
aT:function(a,b){var z=this.a
z.toString
return new H.bu(z,b,[H.l(z,0),null])},
Z:function(a,b){return this.a.Z(0,b)},
L:function(a,b){return this.a.L(0,b)},
bs:function(a){return new A.iW(!0,this.a,this.$ti)},
gJ:function(a){return this.a.a===0},
gac:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
bj:function(){if(new H.am(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new BuiltSet<int>"'))}},iH:{"^":"a:0;",
$1:function(a){return J.j(a)}},bc:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.d8(this.a,null,this.$ti)
z.bj()
this.b=z}return z},
p:function(a){var z,y,x,w
if(H.aK(a,"$isd8",this.$ti,null)){this.a=a.gig()
this.b=a}else{z=H.l(this,0)
y=P.T(null,null,null,z)
for(x=J.ai(a);x.u();){w=x.gF()
if(H.cW(w,z))y.n(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
n:function(a,b){if(b==null)H.h(P.E("null element"))
this.gf3().n(0,b)},
aT:function(a,b){var z=this.a
z.toString
z=P.aX(new H.bu(z,b,[H.l(z,0),null]),null)
this.b=null
this.a=z
this.ih(z)},
gf3:function(){if(this.b!=null){this.a=P.aX(this.a,H.l(this,0))
this.b=null}return this.a},
bj:function(){if(new H.am(H.R(H.l(this,0)),null).v(0,C.n))throw H.c(new P.N('explicit element type required, for example "new SetBuilder<int>"'))},
ih:function(a){var z,y,x
for(z=new P.an(a,a.r,null,null,[null]),z.c=a.e,y=H.l(this,0);z.u();){x=z.d
if(!H.cW(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
k:function(a,b){if(typeof b!=="number")return H.y(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
X:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",lE:{"^":"lC;ch,cx,ao:cy@,aW:db@,bh:dx@,b,c,d,e,f,r,x,y,z,Q,a",
fK:function(){var z=$.$get$cd()
z.m(0,"game",this.cx)
z.m(0,"hitpoints",this.cy)
z.m(0,"stamina",this.db)
z.m(0,"gold",this.dx)},
jh:function(){var z,y,x,w
this.cx=null
this.cy=Z.bD("Health",new N.lH(),"#CCCCCC","Your physical state",100,0,!0,P.aL)
z=P.u
this.db=Z.bD("Stamina",new N.lI(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bD("Gold",new N.lJ(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bM()
x=this.cy
w=this.db
y=new O.eu(N.b6("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.ag(H.t([],[Y.a2]),0,P.aQ()),x,w,z,O.r7(),O.r6(),O.r5(),y,this.ghf(),new P.bF(""),!1,null)
y.hd()
this.cx=y
y.x="endGame"
$.$get$ca().n(0,0)},
hq:function(){var z,y
z=new O.cJ([[null,P.ac(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.m(0,"start",z)
z.a="start"
z=new O.cJ([new N.lG(this),[null,P.ac(["goto","gameLoop"])]],0,null,!1,!1)
y.m(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cJ(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.m(0,"endGame",z)
z.a="endGame"
this.c=y.i(0,"start")},
t:{
lF:function(){var z,y,x,w
z=Z.bD("Health",new N.qb(),"#CCCCCC","Your physical state",100,0,!0,P.aL)
y=P.u
x=Z.bD("Stamina",new N.qc(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bD("Gold",new N.qd(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.q
z=new N.lE("net.filiph.edgehead.0.0.1",null,z,x,y,new O.lK(new H.M(0,null,null,null,null,null,0,[w,O.cJ])),null,null,null,P.T(null,null,null,w),!1,null,-9999,null,null,null)
z.hq()
return z}}},qb:{"^":"a:16;",
$1:function(a){var z=J.o(a)
if(z.v(a,0))return"\ud83d\udc80"
if(z.bP(a,0.5))return"\ud83d\ude23"
if(z.aJ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},qc:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},qd:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},lG:{"^":"a:17;a",
$0:function(){var z=0,y=P.at(),x=this
var $async$$0=P.ap(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:z=2
return P.ao(x.a.cx.bd(),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},lH:{"^":"a:16;",
$1:function(a){var z=J.o(a)
if(z.v(a,0))return"\ud83d\udc80"
if(z.bP(a,0.5))return"\ud83d\ude23"
if(z.aJ(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},lI:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},lJ:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bR:{"^":"d;"},jv:{"^":"d;"},nS:{"^":"bR;a,b",
a7:function(a){var z=new M.dK(null,!1,0)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bR))return!1
return this.a===b.a&&this.b===b.b},
gA:function(a){return Y.X(Y.k(Y.k(0,C.K.gA(this.a)),this.b&0x1FFFFFFF))},
k:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.e.k(this.b)+",\n}"}},dK:{"^":"jv;c,a,b",
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
z=new M.nS(y,this.b)}this.p(z)
return z}}}],["","",,O,{"^":"",
t3:[function(a){var z,y
z=a.gbR()
y=a.gbJ()
if(typeof y!=="number")return H.y(y)
return z-2*y},"$1","cZ",2,0,15],
t9:[function(a){var z,y,x
z=a.gbR()
y=a.gcB()
if(typeof y!=="number")return H.y(y)
x=a.gbJ()
if(typeof x!=="number")return H.y(x)
return z+y-x},"$1","hl",2,0,15],
eu:{"^":"kp;y,z,Q,ch,cx,cy,db,dx,dy,bt:fr<,fx,ez:fy<,ao:go<,aW:id<,bh:k1<,a,b,c,d,e,f,r,x",
hd:function(){var z,y,x,w,v,u
z=$.$get$b3()
y=$.$get$cY()
this.cy=R.bs(1000,"orc",O.cZ(),null,new U.c3(!1,10,!0,z,"sword",C.c),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.bs(1001,"goblin",O.cZ(),null,new U.c3(!1,10,!0,z,"scimitar",C.c),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.ad(null,null,[Q.w])
y.as()
y.p([new Q.w("start_of_book","","",null)])
this.dx=new K.c0(y.q(),"preStartBook",new O.jn(),new O.jo(),null,null,"ground")
z=R.bs(1,"Filip",null,"preStartBook",new U.c3(!1,10,!0,z,"sword",C.c),null,0,2,1000,!0,2,!0,C.z,1,null)
this.ch=z
y=z.r
z=z.cy
if(typeof y!=="number")return y.cH()
if(typeof z!=="number")return H.y(z)
this.go.saq(y/z)
this.id.saq(this.ch.fy)
this.k1.saq(this.ch.x)
this.cx=R.bs(100,"Briana",null,this.dx.b,null,this.ch.y,0,2,0,!1,2,!0,C.W,0,null)
this.dy=F.f2(this.dx,!1)
z=K.c0
x=P.U($.$get$he(),!0,z)
C.a.am(x,[this.dx,$.$get$e3()])
w=new M.dK(null,!1,0).q()
y=this.ch
v=this.cx
u=this.dy
v=P.aX([y,v],R.P)
y=P.aZ(null,O.cg)
u=new A.av(v,P.T(null,null,null,U.aO),w,y,P.aX(x,z),P.U([u],!0,S.a5),0,null)
this.fr=u
z=new Y.ag(H.t([],[Y.a2]),0,P.aQ())
z.b=u.r
this.fx=new B.by(u,null,z,1,1,!0,!1,!1,0)},
cE:function(){var z=0,y=P.at(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cE=P.ap(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.giX()
if(v.fH(u)){z=1
break}t=w.fr.ae(w.ch.y)
s=t.gao()
r=t.gfB()
if(typeof s!=="number"){x=s.cH()
z=1
break}if(typeof r!=="number"){x=H.y(r)
z=1
break}w.go.saq(s/r)
w.id.saq(t.gaW())
w.k1.saq(t.gbh())
r=w.y
r.fv("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.G(0,"\n\n",!0)
if(w.fr.jc(w.ch.y))v.G(0,"TO BE CONTINUED.",!0)
else v.G(0,"You died.",!0)
w.f.w+=v.c2()
z=1
break}q=C.a.gE(s)
p=q.di(w.fr)
s=w.fr
o=N.b6("ActorPlanner")
n=new H.M(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gj()
k=new Y.ag(H.t([],[Y.a2]),0,P.aQ())
k.b=s.r
j=new G.i5(o,l,new B.by(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.h(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.i(s)+". Situation: "+H.b(s.giN())))
z=3
return P.ao(j.jI(),$async$cE)
case 3:if(n.gJ(n)){o.eq("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.o(s)
s="PlanConsequence<"+l.gA(s)+", "+l.k(s)+", "+C.r.k(null)
o.bz(m+(s+", 1, 0, >")+".")}s=Z.kQ(n)
i=new Z.kP(new P.fN(n,[null,null]),s)
if(n.gJ(n))$.$get$bz().eq("Created with no recommendations.")
if(s.length===0){r.dm("No recommendation for "+H.b(p.gh()))
r.dm(new O.jq(w))
w.fr.fi(q.gj());++w.fr.r
z=1
break}z=p.gK()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.ar)(s),++h);w.f.w+=v.c2()
C.a.sl(v.a,0)
r.bz("planner.generateTable for "+H.b(p.gh()))
j.er().L(0,new O.jr(w))
v=i.fJ(q.gfA(),O.hl())
v.toString
g=P.U(v,!1,H.v(v,"x",0))
v=new O.js(new O.ju())
u=g.length-1
if(u-0<=32)H.fg(g,0,u,v)
else H.ff(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ar)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gV(),new O.jt(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfh()
z=7
return P.ao(w.c6(i.jH(s==null?O.hl():s),p,v),$async$cE)
case 7:case 5:v.fH(u)
case 1:return P.ax(x,y)}})
return P.ay($async$cE,y)},
c6:function(a,b,c){var z=0,y=P.at(),x,w=this,v,u,t
var $async$c6=P.ap(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:v=a.cX(b,w.fx,w.fr)
u=P.U(v,!0,H.v(v,"x",0))
z=b.gK()===!0?3:5
break
case 3:z=6
return P.ao(w.cO(a,b,u),$async$c6)
case 6:z=4
break
case 5:t=S.ld(new H.aj(u,new O.jk(),[H.l(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.am(c.a,w.fx.gez().a)
w.fr=w.fx.gbt()
v=w.y
v.bz(new O.jl(a,b))
v.a6(new O.jm(w,b))
case 1:return P.ax(x,y)}})
return P.ay($async$c6,y)},
cO:function(a,b,c){var z=0,y=P.at(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cO=P.ap(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=a.M(b,x.fr)
z=w===1?2:4
break
case 2:x.fx=C.a.gbS(c)
z=3
break
case 4:z=w===0?5:7
break
case 5:x.fx=C.a.gbS(c)
z=6
break
case 7:v=C.a.gE(J.i(a.gO()).split("."))
u=a.af(b,x.fr)
t=a.gS()&&b.jd(a.gO())
s="use "+H.b(v)
x.f_()
z=8
return P.ao(x.e.$4$rerollEffectDescription$rerollable(w,u,s,t),$async$cO)
case 8:r=e
t=new H.H(c,new O.jh(r),[H.l(c,0)])
x.fx=t.gbS(t)
if(r.gk9()===!0){q=A.dJ(x.fx.gbt())
q.a3(b.gj(),new O.ji())
u=x.fx
t=u.gf5()
s=H.t([],[Y.a2])
p=new Y.ag(s,0,P.aQ())
C.a.am(s,u.c.a)
s=u.d
o=u.e
n=u.f
m=u.r
l=u.x
u=u.y
p.b=q.r
x.fx=new B.by(q,t,p,s,o,n,m,l,u)}case 6:case 3:return P.ax(null,y)}})
return P.ay($async$cO,y)}},
jn:{"^":"a:10;",
$3:function(a,b,c){return c.G(0,"UNUSED because this is the first choice",!0)}},
jo:{"^":"a:10;",
$3:function(a,b,c){return H.h(new P.F("Room isn't to be revisited"))}},
jq:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.aj(z,new O.jp(),[H.l(z,0),null]).ct(0," <- ")}},
jp:{"^":"a:0;",
$1:function(a){return a.gb_()}},
jr:{"^":"a:0;a",
$1:function(a){return this.a.y.bz(a)}},
ju:{"^":"a:23;",
$1:function(a){if(a instanceof Q.G)return H.b(a.b.gh())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
js:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.cf(z.$1(a),z.$1(b))}},
jt:{"^":"a:17;a,b,c",
$0:function(){var z=0,y=P.at(),x=this,w
var $async$$0=P.ap(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ao(w.c6(x.c,x.b,w.fy),$async$$0)
case 2:return P.ax(null,y)}})
return P.ay($async$$0,y)}},
jk:{"^":"a:0;",
$1:function(a){return a.gjJ()}},
jl:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gh())+" selected "+this.a.gh()}},
jm:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.aj(z,new O.jj(),[H.l(z,0),null]).ct(0," <- ")
return"- how "+H.b(this.b.gh())+" got here: "+y}},
jj:{"^":"a:0;",
$1:function(a){return a.gb_()}},
jh:{"^":"a:0;a",
$1:function(a){return a.ged()===this.a.ged()}},
ji:{"^":"a:0;",
$1:function(a){var z=a.gaW()
if(typeof z!=="number")return z.aM()
a.saW(z-1)
return a}}}],["","",,Q,{"^":"",
hp:function(a,b,c){return P.aJ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hp(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.i3(t.aE(y.a,y),new Q.qJ(z))
t=J.ai(s.a),r=new H.fO(t,s.b,[H.l(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gW()&&!z.e8(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aH()
case 1:return P.aI(u)}}})},
hq:function(a,b,c){return P.aJ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hq(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dk((t.length!==0?C.a.gE(t):null).gbn()).gj0().a,t=new J.bO(t,t.length,0,null,[H.l(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aH()
case 1:return P.aI(u)}}})},
hr:function(a,b,c){return P.aJ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hr(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gE(t):null).gd0(),t=t.gY(t)
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aH()
case 1:return P.aI(u)}}})},
qJ:{"^":"a:0;a",
$1:function(a){return!J.f(a,this.a)&&a.gb9()}},
a9:{"^":"d;",
cX:function(a,b,c){var z=this
return P.aJ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cX(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.M(y,x.gbt())
v=s>0?2:3
break
case 2:r=A.dJ(w)
v=4
return B.eW(r,x,z,z.hA(r,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dJ(w)
v=7
return B.eW(r,x,z,z.hz(r,y,w,z.gP(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aH()
case 1:return P.aI(t)}}})},
eG:function(a,b,c,d,e,f){var z,y,x,w,v,u
a.x=this
z=a.a.aF(0,new Q.i4(b))
y=new O.ef(null,null,null,null,null,null,null,null,null,null,null)
x=this.gh()
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
if(w==null){w=new L.bc(null,null,[P.u])
w.bj()
w.p(C.f)
x.r=w
x=w}else x=w
w=this.b.gj()
if(w==null)H.h(P.E("null element"))
x.gf3().n(0,w)}v=new Y.ag(H.t([],[Y.a2]),0,P.aQ())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gj()
a.gA(a);(x.length!==0?C.a.gE(x):null).fG(a,v)
this.a=d.$3(z,a,v)
if(a.cR(u)!=null)a.fi(u);++a.r
w=a.es(u)
if(!(w==null))w.fF(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.di(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.f(w==null?w:w.dn(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
C.a.gE(x).b4(a)
C.a.bb(x)}if(this.a==null)H.h(new P.F("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga1().d=x
x=a.r
y.ga1().x=x
a.d.fa(y.q())
return v},
hA:function(a,b,c,d,e){return this.eG(a,b,c,d,!1,e)},
hz:function(a,b,c,d,e){return this.eG(a,b,c,d,e,!1)}},
i4:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.gj())}},
G:{"^":"a9;bJ:b<",
gX:function(){var z=new Y.ag(H.t([],[Y.a2]),0,P.aQ())
z.f8(0,this.gaa(),this.b)
return z.c2()},
af:function(a,b){var z=new Y.ag(H.t([],[Y.a2]),0,P.aQ())
z.iz(0,this.ga8(),this.b,a,!0)
return z.c2()},
k:function(a){var z=this.b
return"EnemyTargetAction<"+this.gaa()+"::enemy="+H.b(z.gj())+"/"+H.b(z.gh())+">"}},
cs:{"^":"a9;",
gX:function(){return this.b.gX()},
k:function(a){return"ExitAction<"+this.b.gX()+">"}},
cu:{"^":"a9;",
gX:function(){var z=new Y.ag(H.t([],[Y.a2]),0,P.aQ())
z.f8(0,"pick up <object>",this.b)
return z.c2()},
k:function(a){return"ItemAction<"+this.gX()+">"}},
lo:{"^":"d;a,b",
k:function(a){return this.b},
t:{"^":"rJ<"}}}],["","",,O,{"^":"",cg:{"^":"d;",
k:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},kg:{"^":"d;a,b",
k:function(a){return this.b}},nO:{"^":"cg;a,f7:b<,b_:c<,d,ek:e<,eB:f<,U:r<,fX:x<,y,fY:z<",
a7:function(a){var z=new O.ef(null,null,null,null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cg))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)))},
k:function(a){return"ActionRecord {accomplices="+J.i(this.a)+",\nactionName="+J.i(this.b)+",\ndescription="+H.b(J.i(this.c))+",\nknownTo="+J.i(this.d)+",\nprotagonist="+H.b(J.i(this.e))+",\nsufferers="+J.i(this.f)+",\ntime="+J.i(this.r)+",\nwasAggressive="+J.i(this.x)+",\nwasFailure="+J.i(this.y)+",\nwasSuccess="+J.i(this.z)+",\n}"}},ef:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q",
gf7:function(){return this.ga1().c},
gb_:function(){return this.ga1().d},
gek:function(){return this.ga1().f},
geB:function(){var z,y
z=this.ga1()
y=z.r
if(y==null){y=new L.bc(null,null,[P.u])
y.bj()
y.p(C.f)
z.r=y
z=y}else z=y
return z},
gU:function(){return this.ga1().x},
gfX:function(){return this.ga1().y},
gfY:function(){return this.ga1().Q},
ga1:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.bc(null,null,[H.l(z,0)])
y.bj()
y.p(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.bc(null,null,[H.l(z,0)])
y.bj()
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
if(x==null){x=new L.bc(null,null,[P.u])
x.bj()
x.p(C.f)
y.b=x
y=x}else y=x
y=y.q()
x=this.ga1().c
w=this.ga1().d
v=this.ga1().e
u=this.ga1().f
t=this.ga1()
s=t.r
if(s==null){s=new L.bc(null,null,[P.u])
s.bj()
s.p(C.f)
t.r=s
t=s}else t=s
t=t.q()
s=this.ga1().x
r=this.ga1().y
q=this.ga1().z
p=this.ga1().Q
z=new O.nO(y,x,w,v,u,t,s,r,q,p)
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
hs:function(a,b){return P.aJ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hs(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bH(new H.H(u,new R.qK(z),[H.l(u,0)]))
case 3:return P.aH()
case 1:return P.aI(v)}}})},
bs:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.eg(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.q6(a,b,j,l,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.q()},
qK:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfn()
y=this.a.gj()
return z==null?y==null:z===y}},
P:{"^":"kt;",
gbq:function(){var z=this.r
if(typeof z!=="number")return z.bC()
return z>0},
gb2:function(){return this.dy===C.j},
gad:function(){return this.dy===C.l},
gai:function(){return this.dy===C.k},
jd:function(a){var z=this.fy
if(typeof z!=="number")return z.bA()
return z>=1},
e8:function(a,b){return this.fu(a,b)>0},
fu:function(a,b){var z,y
if(this.ec(b)){z=a.gbf()
y=this.go.a
z=z.gj()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hW(a,b,10))return 1
z=a.gbf()
y=this.go.a
z=z.gj()
return(y==null?z!=null:y!==z)?1:0},
ec:function(a){var z,y
z=a.c3("Confuse",this,!0)
if(z==null)return!1
y=a.jW("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cK:function(a){var z,y,x
z=a.ae(this.y)
y=z.gao()
if(typeof y!=="number")return H.y(y)
x=2*y
if(!z.gbq())x-=10
if(z.e!=null)x+=4
y=a.a
return new A.ch(x,new H.H(y,new R.iA(this),[H.l(y,0)]).b1(0,0,new R.iB()),y.b1(0,0,new R.iC(this,a)))},
aD:function(a){var z=this.e
return z!=null&&J.f(z.gbM(),a)},
hW:function(a,b,c){var z=b.jX(a,this,!0)
if(z==null)return!1
return z<=c},
$isbv:1},
kt:{"^":"d+db;"},
q6:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gB().z=this.a
a.gB().dx=this.b
a.gB().dy=this.d
a.gB().fx=this.e
a.gB().f=this.f
a.gB().b=!0
a.gB().c=[]
a.gB().fr=C.k
a.gB().x=this.r
a.gB().db=this.x
a.gB().y=this.Q
a.gB().go=this.y
a.gB().Q=this.z
a.gB().ch=!0
a.gB().cx=this.c
z=P.T(null,null,null,null)
a.gB().cy=z
z=this.cy
if(z!=null){y=new L.bf(null,null)
y.p(z)
z=y}else{z=$.$get$hF()
z.toString
y=new L.bf(null,null)
y.p(z)
z=y}a.gB().id=z
a.gB().e=this.ch
a.gB().r=this.cx
a.gB().d=this.db
return a}},
iA:{"^":"a:0;a",
$1:function(a){return J.f(a.gbf(),this.a.go)}},
iB:{"^":"a:31;",
$2:function(a,b){var z,y
z=J.a0(a,b.gb9()?2:0)
y=b.gao()
if(typeof y!=="number")return H.y(y)
return J.a0(z,2*y)}},
iC:{"^":"a:38;a,b",
$2:function(a,b){var z,y
z=b.gb9()?1:0
y=b.gao()
if(typeof y!=="number")return H.y(y)
return J.a0(a,(z+y)*this.a.fu(b,this.b))}},
dv:{"^":"d;a,b",
k:function(a){return this.b}},
nP:{"^":"P;a,b,fh:c<,bn:d<,a0:e<,fn:f<,ao:r<,bh:x<,j:y<,z,ea:Q<,K:ch<,cx,fB:cy<,h:db<,d3:dx<,aj:dy<,H:fr<,fx,aW:fy<,bf:go<",
a7:function(a){var z=new R.eg(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
if(z==null?y==null:z===y)if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y)if(J.f(this.e,b.e)){z=this.f
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
z=(z==null?y==null:z===y)&&J.f(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1
else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),C.r.gA(this.fx)),J.j(this.fy)),J.j(this.go)))},
k:function(a){return"Actor {alreadyMentioned="+J.i(this.a)+",\ncategories="+J.i(this.b)+",\ncombineFunction="+J.i(this.c)+",\ncurrentRoomName="+J.i(this.d)+",\ncurrentWeapon="+H.b(J.i(this.e))+",\nfollowingActorId="+J.i(this.f)+",\nhitpoints="+J.i(this.r)+",\ngold="+J.i(this.x)+",\nid="+J.i(this.y)+",\ninitiative="+J.i(this.z)+",\nisActive="+J.i(this.Q)+",\nisPlayer="+J.i(this.ch)+",\nitems="+J.i(this.cx)+",\nmaxHitpoints="+J.i(this.cy)+",\nname="+J.i(this.db)+",\nnameIsProperNoun="+J.i(this.dx)+",\npose="+J.i(this.dy)+",\npronoun="+J.i(this.fr)+",\nshield="+C.r.k(this.fx)+",\nstamina="+J.i(this.fy)+",\nteam="+J.i(this.go)+",\n}"}},
eg:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gfh:function(){return this.gB().d},
gbn:function(){return this.gB().e},
sbn:function(a){this.gB().e=a
return a},
ga0:function(){return this.gB().f},
sa0:function(a){this.gB().f=a
return a},
gfn:function(){return this.gB().r},
gao:function(){return this.gB().x},
sao:function(a){this.gB().x=a
return a},
gbh:function(){return this.gB().y},
sbh:function(a){this.gB().y=a
return a},
gj:function(){return this.gB().z},
gK:function(){return this.gB().cx},
gfB:function(){return this.gB().db},
gh:function(){return this.gB().dx},
sh:function(a){this.gB().dx=a
return a},
gd3:function(){return this.gB().dy},
gaj:function(){return this.gB().fr},
saj:function(a){this.gB().fr=a
return a},
gH:function(){return this.gB().fx},
gaW:function(){return this.gB().go},
saW:function(a){this.gB().go=a
return a},
gbf:function(){var z,y
z=this.gB()
y=z.id
if(y==null){y=new L.bf(null,null)
z.id=y
z=y}else z=y
return z},
gB:function(){var z,y
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
if(!(z==null)){y=new L.bf(null,null)
y.p(z)
z=y}this.id=z
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gB().b
x=this.gB().c
w=this.gB().d
v=this.gB().e
u=this.gB().f
t=this.gB().r
s=this.gB().x
r=this.gB().y
q=this.gB().z
p=this.gB().Q
o=this.gB().ch
n=this.gB().cx
m=this.gB().cy
l=this.gB().db
k=this.gB().dx
j=this.gB().dy
i=this.gB().fr
h=this.gB().fx
g=this.gB().fy
f=this.gB().go
e=this.gB()
d=e.id
if(d==null){d=new L.bf(null,null)
e.id=d
e=d}else e=d
z=new R.nP(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.q())
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
return z}}}],["","",,A,{"^":"",ch:{"^":"d;bR:a<,cB:b<,bJ:c<",
aM:function(a,b){return new A.aa(this.a-b.gbR(),J.aC(this.b,b.gcB()),J.aC(this.c,b.gbJ()))},
k:function(a){return"ActorScore<self="+C.i.cC(this.a,2)+",team="+J.br(this.b,2)+",enemy="+J.br(this.c,2)+">"}},aa:{"^":"d;bR:a<,cB:b<,bJ:c<",
gjs:function(){return this.a===-1/0&&J.f(this.b,-1/0)&&J.f(this.c,-1/0)},
bQ:function(a,b){return new A.aa(this.a*b,J.bq(this.b,b),J.bq(this.c,b))},
a5:function(a,b){return new A.aa(this.a+b.gbR(),J.a0(this.b,b.gcB()),J.a0(this.c,b.gbJ()))},
cH:function(a,b){if(typeof b!=="number")return H.y(b)
return new A.aa(this.a/b,J.bp(this.b,b),J.bp(this.c,b))},
k:function(a){return"ActorScoreChange<self="+C.i.cC(this.a,2)+",team="+J.br(this.b,2)+",enemy="+J.br(this.c,2)+">"},
t:{
iz:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ar)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.y(r)
w+=r
r=s.c
if(typeof r!=="number")return H.y(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.aa(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
rn:function(a){switch(a){case C.H:return"spear"
case C.I:return"branch"
case C.J:return"tent"
case C.c:return"sword"
default:throw H.c(P.E(a))}},
aO:{"^":"ku;bM:a<",
gb_:function(){return U.rn(this.a)},
$isbv:1},
ku:{"^":"d+db;"},
cv:{"^":"d;a,b",
k:function(a){return this.b}},
c3:{"^":"aO;b,c,ea:d<,bf:e<,h:f<,a",
gj:function(){return H.au(this)},
gbq:function(){return!1},
gK:function(){return!1},
gd3:function(){return!1},
gH:function(){return C.p}}}],["","",,G,{"^":"",kp:{"^":"d;",
f_:function(){var z,y
z=this.f
y=z.w
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.w=""}},
kl:[function(a){this.f.w+=a},"$1","giX",2,0,18],
bd:function(){var z=0,y=P.at(),x,w=this,v,u
var $async$bd=P.ap(function(a,b){if(a===1)return P.aw(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.F("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sl(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gl(v)===0&&u.w.length===0)){z=4
break}z=5
return P.ao(w.cE(),$async$bd)
case 5:z=3
break
case 4:w.f_()
case 1:return P.ax(x,y)}})
return P.ay($async$bd,y)}}}],["","",,B,{"^":"",eq:{"^":"d;cJ:a<,d_:b<,cu:c<",
k:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.i.cC(this.b,3)+", score="+this.a.k(0)+">"}},by:{"^":"d;bt:a<,f5:b<,ez:c<,jJ:d<,d_:e<,f,r,ed:x<,cu:y<",
gA:function(a){return X.bo([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
v:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isby&&this.gA(this)===z.gA(b)},
k:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gA(z)+", "+y.k(z)+", "+J.i(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
t:{
eW:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gd_()
z=z?0:b.gcu()+1
d.b=a.r
return new B.by(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",i5:{"^":"d;a,b,c,d,e,f",
iJ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.a
z.a6("...")
z.a6("combining scores")
y=H.t([],[A.aa])
x=new G.is()
for(w=J.ai(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gF()
z.a6(new G.iq(r))
if(r.gd_()>0.15)if(s==null){z.a6("    - first _bestCase")
s=r}else if(J.a1(x.$1(r.gcJ()),x.$1(s.gcJ()))){z.a6("    - new _bestCase")
s=r}q=r.gcJ()
p=J.aC(q.b,u)
o=J.aC(q.c,t)
n=r.b
m=new A.aa((q.a-v)*n,J.bq(p,n),J.bq(o,n))
z.a6(new G.ir(m))
y.push(m)}l=A.iz(y)
w=s==null
if(w)k=C.B
else{q=s.gcJ()
k=new A.aa(q.a-v,J.aC(q.b,u),J.aC(q.c,t))}w=w?s:s.gcu()
if(typeof w!=="number")return H.y(w)
j=new A.aa(k.a/w,J.bp(k.b,w),J.bp(k.c,w))
z.a6("- uplifts average = "+("ActorScoreChange<self="+C.i.cC(l.a,2)+",team="+J.br(l.b,2)+",enemy="+J.br(l.c,2)+">"))
z.a6("- best = "+j.k(0))
i=j.a5(0,l)
z.a6("- result = "+i.k(0))
return i},
er:function(){var z=this
return P.aJ(function(){var y=0,x=1,w,v,u,t,s
return function $async$er(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbY(),u=u.gY(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.i(0,s))
case 4:++t
y=2
break
case 3:return P.aH()
case 1:return P.aI(w)}}})},
d4:function(a,b,c){var z=0,y=P.at(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$d4=P.ap(function(d,e){if(d===1)return P.aw(e,y)
while(true)switch(z){case 0:w=x.f
w.aS(0)
v=x.c
u=v.a
t=u.a.aF(0,new G.it(x))
s=t.cK(u)
r=x.a
r.bz("Planning for "+H.b(t.db)+", initialScore="+s.k(0))
q=new P.b_(x.dI(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gF()
r.b0(new G.iu(t,o))
if(o.I(t,u)!==!0){r.b0(new G.iv(o))
z=2
break}z=4
return P.ao(x.ca(v,o,b,a,c).c4(0),$async$d4)
case 4:n=e
if(J.ed(n)===!0){r.b0(new G.iw(o))
w.m(0,o,C.C)
z=2
break}r.b0(new G.ix(s,o,n))
m=x.iJ(n,s,b)
w.m(0,o,m)
r.b0(new G.iy(o,m))
z=2
break
case 3:x.e=!0
return P.ax(null,y)}})
return P.ay($async$d4,y)},
jI:function(){return this.d4(50,10,null)},
dI:function(a,b){return P.aJ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dI(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bH((u.length!==0?C.a.gE(u):null).gbk())
case 2:u=(u.length!==0?C.a.gE(u):null).gaZ()
t=u.length
s={func:1,ret:Q.cu,args:[U.aO]}
r={func:1,ret:Q.cs,args:[Q.w]}
q={func:1,ret:Q.G,args:[R.P]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.aq(o,q)?6:8
break
case 6:x=9
return P.bH(Q.hp(z,y,o))
case 9:x=7
break
case 8:x=H.aq(o,r)?10:12
break
case 10:x=13
return P.bH(Q.hq(z,y,o))
case 13:x=11
break
case 12:x=H.aq(o,s)?14:16
break
case 14:x=17
return P.bH(Q.hr(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.F(o.k(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.ar)(u),++p
x=3
break
case 5:return P.aH()
case 1:return P.aI(v)}}})},
ca:function(a5,a6,a7,a8,a9){var $async$ca=P.ap(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aF(0,new G.i8(t))
p=t.a
p.b0("=====")
p.b0(new G.i9(a6,q))
p.b0(new G.ia(a6))
if(a6.I(q,r)!==!0){p.b0("- firstAction not applicable")
z=1
break}o=q.cK(r)
p.b0(new G.ih(a5,o))
p.b0(new G.ii(a5))
n=P.aZ(null,B.by)
m=P.T(null,null,null,A.av)
l=J.o(r)
k=l.gA(r)
for(j=new P.b_(a6.cX(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gF()
if(l.gA(r)!==k)throw H.c(new P.F("Action "+a6.k(0)+" modified world state when producing "+H.b(h)+"."))
n.ar(h)}s.a=0
r=t.b
case 3:if(!!n.gJ(n)){z=4
break}++s.a
g=n.d6()
p.a6("----")
p.a6(new G.ij(g))
p.a6(new G.ik(g))
if(g.gcu()>a7||s.a>a8){p.a6(new G.il(s,a7,g))
p.a6(new G.im(g))
z=4
break}z=g.gbt().f.length===0?5:6
break
case 5:p.a6("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bo(0,new G.io(t),new G.ip())
if(q==null){p.a6("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.eq(q.cK(l),g.e,g.y)
p.a6(new G.ib(f))
z=7
x=[1]
return P.cS(P.fV(f),$async$ca,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gE(j):null).di(l)
j=l.a
i=new H.H(j,new G.ic(t),[H.l(j,0)])
d=i.gl(i)
if(d>1)throw H.c(new P.F("World has several duplicates of mainActor: "+J.i(l)))
else if(d===0){p.fv("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aF(0,new G.id(t))
c=J.f(e,q)
p.a6("- actor: "+H.b(e.gh())+" (isMain=="+c+")")
j=q==null
p.a6("- mainActor: "+H.b(j?q:q.gh()))
b=j?q:q.cK(l)
if(b==null)b=C.D
f=new B.eq(b,g.e,g.y)
p.a6(new G.ie(o,f))
p.a6(new G.ig(g))
z=8
x=[1]
return P.cS(P.fV(f),$async$ca,y)
case 8:p.a6("- generating all actions for "+H.b(e.gh()))
j=n.c
i=n.b
a=n.a
for(a0=new P.b_(t.dI(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.I(e,l)!==!0)continue
for(a1=new P.b_(a2.cX(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(a4.gd_()<0.05)continue
if(m.Z(0,a4.gbt()))continue
n.ar(a4)}}p.a6("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.n(0,l)
z=3
break
case 4:case 1:return P.cS(null,0,y)
case 2:return P.cS(v,1,y)}})
var z=0,y=P.od($async$ca),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.py(y)}},is:{"^":"a:44;",
$1:function(a){return J.aC(a.b,a.c)}},iq:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},ir:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.k(0)}},it:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},iu:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.db)}},iv:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},iw:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},ix:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aD(this.c))+" different ConsequenceStats, initialScore="+this.a.k(0)}},iy:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},i8:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},i9:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gh())}},ia:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},ih:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.k(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},ii:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bQ(" ",z.y)+"- "+J.i(z.b)}},ij:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gf5().gX()+"'"}},ik:{"^":"a:1;a",
$0:function(){var z=this.a.gbt().f
return"- situation: "+H.b(J.hW(z.length!==0?C.a.gE(z):null))}},il:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gcu()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},im:{"^":"a:1;a",
$0:function(){var z=this.a.gbt().d
return"- how we got here: "+new H.aj(z,new G.i7(),[H.l(z,0),null]).ct(0," <- ")}},i7:{"^":"a:0;",
$1:function(a){return a.gb_()}},io:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},ip:{"^":"a:1;",
$0:function(){return}},ib:{"^":"a:1;a",
$0:function(){return"- "+this.a.k(0)}},ic:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},id:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a.b)}},ie:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.k(0)+" (initial="+this.a.k(0)+")"}},ig:{"^":"a:1;a",
$0:function(){var z=this.a.gbt().d
return"- how we got here: "+new H.aj(z,new G.i6(),[H.l(z,0),null]).ct(0," <- ")}},i6:{"^":"a:0;",
$1:function(a){return a.gb_()}}}],["","",,Z,{"^":"",kP:{"^":"d;a,b",
gbk:function(){return this.b},
gJ:function(a){return this.b.length===0},
fJ:function(a,b){var z=this
return P.aJ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fJ(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bH(t)
case 5:w=1
break
case 4:s=z.hQ(new Z.kS())
r=z.dH(new Z.kT(),[s])
q=z.dH(new Z.kU(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bz().bz("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bz().bz("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bz().bz("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cM(t,new Z.kV(z,x))
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
break}case 17:t.length===o||(0,H.ar)(t),++n
w=16
break
case 18:case 1:return P.aH()
case 2:return P.aI(u)}}})},
jH:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbS(y)
C.a.cM(y,new Z.kW(this,a))
x=this.a.a
w=x.gc5().b1(0,1/0,new Z.kX(a))
v=x.gc5().b1(0,-1/0,new Z.kY(a))
x=J.ah(v)
u=J.ah(w)
t=u.aM(w,J.bq(x.aM(v,w),0.1))
z.a=t
if(u.v(w,v)){t=J.aC(t,1)
z.a=t
u=t}else u=t
s=x.aM(v,u)
r=P.kn(y.length,new Z.kZ(z,this,a,s),!1,P.K)
q=new H.aj(r,new Z.l_(C.a.b1(r,0,Z.hE())),[H.l(r,0),null]).br(0,!1)
z=C.a.b1(q,0,Z.hE())
if(typeof z!=="number")return H.y(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.a0(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.le(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dH:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ar)(z),++u){t=z[u]
if(C.a.Z(b,t))continue
if(w==null||J.a1(a.$1(x.i(0,t)),v)){v=a.$1(x.i(0,t))
w=t
continue}}return w},
hQ:function(a){return this.dH(a,C.f)},
t:{
kQ:function(a){var z,y,x
z=a.gbY()
y=H.v(z,"x",0)
x=P.U(new H.H(z,new Z.kR(a),[y]),!1,y)
if(x.length===0)$.$get$bz().eq("After removing actions scored by undefined, there are no recommendations.")
return x},
rH:[function(a,b){return J.a0(a,b)},"$2","hE",4,0,43]}},kS:{"^":"a:0;",
$1:function(a){return a.gbR()}},kT:{"^":"a:0;",
$1:function(a){return J.hS(a.gbJ())}},kU:{"^":"a:0;",
$1:function(a){return a.gcB()}},kV:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.cf(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},kW:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.cf(z.$1(y.i(0,a)),z.$1(y.i(0,b)))}},kX:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.cV(a),H.cV(z))}},kY:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.cV(a),H.cV(z))}},kZ:{"^":"a:8;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.bp(J.aC(this.c.$1(z.a.a.i(0,y[a])),this.a.a),this.d)}},l_:{"^":"a:0;a",
$1:function(a){return J.i_(J.bq(J.bp(a,this.a),1000))}},kR:{"^":"a:0;a",
$1:function(a){return!this.a.i(0,a).gjs()}}}],["","",,K,{"^":"",pJ:{"^":"a:10;",
$3:function(a,b,c){}},c0:{"^":"d;a,h:b<,c,d,jC:e<,f,bB:r<",
gj0:function(){return this.a},
gA:function(a){return C.b.gA(this.b)},
v:function(a,b){if(b==null)return!1
return b instanceof K.c0&&b.b===this.b},
k:function(a){return"Room<"+this.b+">"},
jD:function(a){return this.e.$1(a)},
t:{
a3:function(a,b,c,d,e,f,g){var z=new S.ad(null,null,[Q.w])
z.as()
z.p(f)
return new K.c0(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;iW:a<,X:b<,b_:c<,jn:d<"}}],["","",,S,{"^":"",a5:{"^":"d;",
gaZ:function(){return C.f},
gbk:function(){return C.f},
gfA:function(){return 3},
di:function(a){return this.av(this.gU(),a)},
fF:function(a,b){},
fG:function(a,b){},
b4:function(a){},
dn:function(a){return!0}}}],["","",,S,{"^":"",
f_:function(a){var z=$.$get$b9().ab(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
ld:function(a,b){var z,y,x,w,v
z=$.$get$b9().fD()*b
for(y=new H.dk(a,a.gl(a),0,null,[H.v(a,"aR",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.y(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
le:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b9().ab(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ar)(a),++v){t=a[v]
if(typeof t!=="number")return H.y(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
cE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bp(a,"{")
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
if(q>1){p=$.$get$b9().ab(q)
o=C.b.aH(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cE(C.b.aH(a,m+1,y[l]))
if(typeof x!=="number")return x.a5()
l+=C.b.aH(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cE(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a5()
v=u+1
return C.b.aH(a,0,v)+S.cE(C.b.bu(a,v))}}else return a},
ba:function(a,b,c,d){switch($.$get$b9().ab(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
lf:function(a){if(a<0||a>1)throw H.c(P.V(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b9().fD()<a}}],["","",,Y,{"^":"",a2:{"^":"d;aL:a<,aG:b<,aA:c<,fI:d<,e,cY:f@,fL:r<,fC:x<,eA:y<,j_:z<,hh:Q<,cG:ch<,cx,jr:cy<,U:db<",
i:function(a,b){switch(b){case"string":return this.a
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
default:throw H.c(P.E("Invalid key "+H.b(b)+"."))}}},ag:{"^":"d;a,U:b<,c",
ge7:function(){return C.a.bW(this.a,new Y.mB())},
bl:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.f(b,""))return
z=(J.bn(b).e5(b,".")||C.b.e5(b,"!")||C.b.e5(b,"?"))&&C.b.ds(b,P.bb("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a2(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
n:function(a,b){return this.bl(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
G:function(a,b,c){return this.bl(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
f8:function(a,b,c){return this.bl(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
a4:function(a,b,c,d,e,f,g,h,i,j){return this.bl(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
iy:function(a,b,c,d,e){return this.bl(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
ix:function(a,b,c,d){return this.bl(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
f9:function(a,b,c,d){return this.bl(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
iw:function(a,b,c,d){return this.bl(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
iz:function(a,b,c,d,e){return this.bl(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iD:function(){return this.G(0,"\n\n",!0)},
bV:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bp(a,"<owner's> "+b)!==-1||C.b.bp(a,"<ownerPronoun's> "+b)!==-1||C.b.bp(a,"<object-owner's> "+b)!==-1||C.b.bp(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(c.gd3()!==!0){z=this.c
y=z.i(0,c.gj())
if((y==null?-1:y)<e)x=C.b.d7(a,b,"the "+b)
else{x=J.d3(c.gh(),P.bb("[aeiouy]",!1,!1))?C.b.d7(a,b,"an "+b):C.b.d7(a,b,"a "+b)
z.m(0,c.gj(),e)}}else x=null
return x==null?a:x},
e6:function(a,b){var z,y
if(!this.aC(a)||!this.aC(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gaG()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaG()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaA()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaA()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaG().gj()
if(b<0||b>=z.length)return H.e(z,b)
if(J.f(y,z[b].gaA().gj())){if(a>=z.length)return H.e(z,a)
y=z[a].gaA().gj()
if(b>=z.length)return H.e(z,b)
z=J.f(y,z[b].gaG().gj())}else z=!1
return z},
dh:function(a){var z=this
return P.aJ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$dh(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aC(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gaG()!=null?3:4
break
case 3:x=5
return t.gaG()
case 5:case 4:x=t.gaA()!=null?6:7
break
case 6:x=8
return t.gaA()
case 8:case 7:x=t.gfI()!=null?9:10
break
case 9:x=11
return t.d
case 11:case 10:u=t.e
x=u!=null?12:13
break
case 12:x=14
return u
case 14:case 13:case 1:return P.aH()
case 2:return P.aI(v)}}})},
aI:[function(a){var z=J.ah(a)
if(z.aJ(a,0)||z.bA(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaA()}},"$1","gaA",2,0,19],
jF:function(a,b){var z
if(!this.aC(a)||!this.aC(b))return!1
if(this.e6(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geA()}return!1},
fH:function(a){var z
for(z=!1;this.ge7();z=!0){a.$1(this.fM(!0))
this.jN()}return z},
fM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.b1(z,[],new Y.mC())
C.a.ia(z,new Y.mD(y),!1)
x=a&&this.ge7()?C.a.bp(z,C.a.fm(z,new Y.mE()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.e6(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gcY())n=this.jF(s,p)&&this.hg(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcY()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scY(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].ghh()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gj_()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcG())if(this.cV(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcY()}else n=!1
n=n||this.jY(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcG()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcG()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.f_([" but "," but ",", but "])
u=!this.h3(s,s+1)&&!0}else{r+=S.f_([" and "," and ",", and "])
u=!0}}m=this.du(s)
p=!v
if(p){n=s-1
if(this.cV(s,n))if(J.d3(this.du(n),"<subject> "))if(J.d3(m,"<subject> "))m=H.bN(m,"<subject> ","",0)}l=J.hZ(m,"<action>",this.du(s))
n=s-1
k=this.ie(s,n)
if(k)k=!(this.aI(s).gH()===C.p&&this.ag(s).gH()===C.p)
else k=!1
if(k){k=this.aI(s).gH().b
l=H.p(l,"<object-owner's> <object>",k)
k=this.aI(s).gH().b
l=H.p(l,"<object-ownerPronoun's> <object>",k)
k=this.aI(s).gH().b
l=H.p(l,"<object>",k)
k=this.aI(s).gH().c
l=H.p(l,"<object's>",k)}k=this.cV(s,n)
if(k){k=this.ag(s).gH().a
l=H.p(l,"<owner's> <subject>",k)
k=this.ag(s).gH().a
l=H.p(l,"<ownerPronoun's> <subject>",k)
k=this.ag(s).gH().a
l=H.p(l,"<subject>",k)
k=this.ag(s).gH().c
l=H.p(l,"<subject's>",k)}if(this.aI(n)!=null)if(this.ag(s)!=null)if(this.ag(n)!=null){k=this.aI(n)
k=k==null?k:k.gj()
j=this.ag(s)
if(J.f(k,j==null?j:j.gj())){k=this.ag(n)
k=k==null?k:k.gH()
j=this.ag(s)
k=!J.f(k,j==null?j:j.gH())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.ag(s).gH().a
l=H.p(l,"<owner's> <subject>",k)
k=this.ag(s).gH().a
l=H.p(l,"<ownerPronoun's> <subject>",k)
k=this.ag(s).gH().a
l=H.p(l,"<subject>",k)
k=this.ag(s).gH().c
l=H.p(l,"<subject's>",k)}if(this.ag(n)!=null)if(this.aI(s)!=null){k=this.ag(n)
k=k==null?k:k.gj()
j=this.aI(s)
if(J.f(k,j==null?j:j.gj())){n=this.ag(n)
n=n==null?n:n.gH()
k=this.ag(s)
n=!J.f(n,k==null?k:k.gH())}else n=!1}else n=!1
else n=!1
if(n){n=this.aI(s).gH().a
l=H.p(l,"<object-owner's> <object>",n)
n=this.aI(s).gH().a
l=H.p(l,"<object-ownerPronoun's> <object>",n)
n=this.aI(s).gH().b
l=H.p(l,"<object>",n)
n=this.aI(s).gH().c
l=H.p(l,"<object's>",n)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gaG()
h=n.gaA()
g=n.gfI()
f=n.e
e=S.cE(l)
if(C.b.Z(e,"{")||C.b.Z(e,"}"))$.$get$hy().dm('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gK()===!0){e=H.p(e,"<subject>","you")
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
e=H.p(e,"<has>","has")}e=H.bN(e,"<subject>","<subjectNoun>",0)
k=i.gH().a
e=H.p(e,"<subject>",k)
k=n.db
e=this.bV(e,"<subjectNoun>",i,g,k)
j=i.gh()
if(typeof j!=="string")H.h(H.O(j))
e=H.bN(e,"<subjectNoun>",j,0)
j=i.gH().a
e=H.p(e,"<subjectPronoun>",j)
if(C.b.Z(l,P.bb("<subject>.+<subject's>",!0,!1))){j=i.gH().c
e=H.p(e,"<subject's>",j)}e=this.bV(e,"<subject's>",i,g,k)
k=H.b(i.gh())+"'s"
e=H.bN(e,"<subject's>",k,0)
k=i.gH().c
e=H.p(e,"<subject's>",k)
k=i.gH().c
e=H.p(e,"<subjectPronoun's>",k)
k=i.gH().d
e=H.p(e,"<subjectPronounSelf>",k)}if(h!=null){if(h.gK()===!0){e=H.p(e,"<object>","you")
e=H.p(e,"<object's>","your")}else{e=this.bV(e,"<object>",h,f,n.db)
k=h.gh()
if(typeof k!=="string")H.h(H.O(k))
e=H.p(e,"<object>",k)}k=h.gH().b
e=H.p(e,"<objectPronoun>",k)
if(C.b.Z(l,P.bb("<object>.+<object's>",!0,!1))){k=h.gH().c
e=H.p(e,"<object's>",k)}e=this.bV(e,"<object's>",h,f,n.db)
k=H.b(h.gh())+"'s"
e=H.bN(e,"<object's>",k,0)
k=h.gH().c
e=H.p(e,"<object's>",k)
k=h.gH().c
e=H.p(e,"<objectPronoun's>",k)}n=n.db
l=this.f0(f,this.f0(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.mA(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcG())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcG()?r+".":r
return H.rh(z.charCodeAt(0)==0?z:z,$.$get$fn(),new Y.mF(),null)},
c2:function(){return this.fM(!1)},
jN:function(){var z,y
if(!this.ge7()){C.a.sl(this.a,0)
return}z=this.a
y=C.a.bp(z,C.a.fm(z,new Y.mG()))+1
P.cF(0,y,z.length,null,null,null)
z.splice(0,y-0)},
h3:function(a,b){var z,y
if(!this.aC(a)||!this.aC(b))return!1
if(this.e6(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].geA()}if(!this.cV(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfL()){if(b>=z.length)return H.e(z,b)
y=z[b].gfL()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gfC()){if(b>=z.length)return H.e(z,b)
z=z[b].gfC()}else z=!1
if(z)return!0
else return!1},
hg:function(a,b){var z,y,x,w,v
if(!this.aC(a)||!this.aC(b))return!1
for(z=new P.b_(this.dh(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.b_(this.dh(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gF()
if(J.f(x.gj(),v.gj()))return!0}}return!1},
du:[function(a){var z=J.ah(a)
if(z.aJ(a,0)||z.bA(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaL()}},"$1","gaL",2,0,9],
ag:[function(a){var z=J.ah(a)
if(z.aJ(a,0)||z.bA(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaG()}},"$1","gaG",2,0,19],
jY:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gU()!=null){y=a-1
if(this.aC(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gU()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gU()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gU()
if(typeof y!=="number")return y.aM()
if(typeof x!=="number")return H.y(x)
return y-x}},
k:function(a){return this.c2()},
aC:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
f0:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gK()===!0)z=H.p(H.p(b,d,"you"),e,"your")
else{z=this.bV(b,d,a,null,h)
y=a.gh()
H.bm(y)
z=H.p(z,d,y)}z=H.p(z,f,a.gH().a)
z=H.p(H.p(C.b.d7(this.bV(C.b.Z(c,P.bb(d+".+"+e,!0,!1))?H.p(z,e,a.gH().c):z,e,a,null,h),e,H.b(a.gh())+"'s"),e,a.gH().c),g,a.gH().c)}else z=H.p(H.p(H.p(H.p(b,d,""),e,""),f,""),g,"")
return z},
ie:function(a,b){var z,y
if(!this.aC(a)||!this.aC(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaA()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaA()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaA().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaA().gj())},
cV:function(a,b){var z,y
if(!this.aC(a)||!this.aC(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaG()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaG()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gaG().gj()
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,z[b].gaG().gj())},
t:{
mA:function(a){var z,y,x
z=!C.b.Z(a,"\n\n")?C.b.k5(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.bu(z,1)}}},mB:{"^":"a:0;",
$1:function(a){return J.f(a.gaL(),"\n\n")}},mC:{"^":"a:48;",
$2:function(a,b){var z,y
z=J.J(a)
y=z.gac(a)?z.gE(a):null
if(y!=null)y.gjr()
z.n(a,b)
return a}},mD:{"^":"a:24;a",
$1:function(a){return J.hT(this.a,a)}},mE:{"^":"a:0;",
$1:function(a){return J.f(a.gaL(),"\n\n")}},mF:{"^":"a:25;",
$1:function(a){return H.b(a.i(0,1))+H.b(a.i(0,2))+H.b(a.i(0,3))}},mG:{"^":"a:0;",
$1:function(a){return J.f(a.gaL(),"\n\n")}},bv:{"^":"kv;d3:a<,h:b<,c,bf:d<,K:e<,H:f<",
gj:function(){return H.au(this)},
gea:function(){return!0},
gbq:function(){return!0},
t:{
da:function(a,b,c,d,e){var z=H.t([],[P.q])
return new Y.bv(c,b,z,e==null?$.$get$b3():e,!1,d)}}},kv:{"^":"d+db;"},db:{"^":"d;",
gb9:function(){return this.gbq()&&this.gea()===!0},
aV:function(a,b,c,d,e,f,g,h,i){a.a4(0,b,c,d,e,f,g,h,H.a_(this,"$isbv"),!1)},
ak:function(a,b){return this.aV(a,b,!1,!1,!1,null,null,!1,!1)},
aU:function(a,b,c,d){return this.aV(a,b,!1,!1,!1,c,null,d,!1)},
aB:function(a,b,c){return this.aV(a,b,!1,!1,!1,c,null,!1,!1)},
cw:function(a,b,c){return this.aV(a,b,!1,!1,!1,null,null,c,!1)},
cz:function(a,b,c,d){return this.aV(a,b,c,!1,!1,d,null,!1,!1)},
d9:function(a,b,c,d){return this.aV(a,b,!1,c,d,null,null,!1,!1)},
bc:function(a,b,c){return this.aV(a,b,!1,!1,c,null,null,!1,!1)},
d9:function(a,b,c,d){return this.aV(a,b,!1,c,d,null,null,!1,!1)},
fN:function(a,b,c,d){return this.aV(a,b,!1,!1,c,d,null,!1,!1)},
jS:function(a,b,c,d){return this.aV(a,b,c,!1,!1,null,null,d,!1)},
jR:function(a,b,c){return this.aV(a,b,c,!1,!1,null,null,!1,!1)},
fO:function(a,b,c,d){return this.aV(a,b,!1,!1,!1,c,d,!1,!1)}},bY:{"^":"d;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",q8:{"^":"a:0;",
$1:function(a){a.gck().b=2
return 2}},q9:{"^":"a:0;",
$1:function(a){a.gck().b=0
return 0}},q7:{"^":"a:0;",
$1:function(a){a.gck().b=1
return 1}},fu:{"^":"d;"},o2:{"^":"fu;j:a<",
a7:function(a){var z=new L.bf(null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fu))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gA:function(a){return Y.X(Y.k(0,J.j(this.a)))},
k:function(a){return"Team {id="+J.i(this.a)+",\n}"},
t:{
dL:function(a){var z=new L.bf(null,null)
a.$1(z)
return z.q()}}},bf:{"^":"d;a,b",
gj:function(){return this.gck().b},
gck:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y
z=this.a
if(z==null){y=this.gck().b
z=new L.o2(y)
if(y==null)H.h(P.m("id"))}this.p(z)
return z}}}],["","",,X,{"^":"",
hf:function(a,b){return P.aJ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hf(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bO(u,u.length,0,null,[H.l(u,0)])
u=y.a
s=new J.bO(u,u.length,0,null,[H.l(u,0)])
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
break}case 4:return P.aH()
case 1:return P.aI(v)}}})}}],["","",,A,{"^":"",av:{"^":"d;it:a<,b,c,d,e,f,U:r<,x",
giN:function(){var z=this.f
return z.length!==0?C.a.gE(z):null},
gA:function(a){var z,y,x,w,v
z=X.bo(this.a)
y=X.bo(this.d)
x=X.bo(this.f)
w=this.r
v=this.c
v=X.cU(X.aT(X.aT(0,C.e.gA(w)),J.j(v)))
return X.cU(X.aT(X.aT(X.aT(X.aT(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
v:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isav&&this.gA(this)===z.gA(b)},
f6:function(a){var z,y
z=this.h2(a,!0)
y=z.gY(z)
if(y.u()){y.gF()
return!0}return!1},
ir:function(a){var z,y
z=this.h1(a)
y=z.gY(z)
if(y.u()){y.gF()
return!0}return!1},
is:function(a){var z=this.x
if(z==null)return!1
return C.b.Z(z.gh(),a)},
fi:function(a){var z,y,x
z=this.cR(a)
if(z==null)throw H.c(new P.F("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].az()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
az:function(){++this.r},
dg:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.eC(0,new A.nE(a))
if(b!=null)z=z.bO(0,new A.nF(b))
if(c!=null)z=z.bO(0,new A.nG(c))
if(e!=null)z=z.bO(0,new A.nH(e))
return d!=null?z.bO(0,new A.nI(d)):z},
h2:function(a,b){return this.dg(a,null,null,null,b)},
h1:function(a){return this.dg(a,null,null,null,null)},
ae:function(a){return this.a.aF(0,new A.nJ(a))},
dk:function(a){return this.e.aF(0,new A.nK(a))},
es:function(a){var z,y
z=this.cR(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
al:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.f(z[y].gh(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
jc:function(a){var z=this.a.bo(0,new A.nL(a),new A.nM())
if(z==null)return!1
return z.gbq()},
ej:function(){var z=this.f
C.a.gE(z).b4(this)
C.a.bb(z)},
c1:function(a){var z=this.f
while(!0){if(!(z.length!==0&&!J.f(C.a.gE(z).gh(),a)))break
C.a.gE(z).b4(this)
C.a.bb(z)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
d8:function(a,b){var z,y
z=this.cR(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
da:function(a,b,c,d,e){var z,y,x,w
z=this.dg(a,b,c,d,e)
y=z.gY(z)
if(y.u()){x=y.gF()
y=this.r
w=x.gU()
if(typeof w!=="number")return H.y(w)
return y-w}return},
jX:function(a,b,c){return this.da(null,a,b,c,null)},
c3:function(a,b,c){return this.da(a,null,b,null,c)},
jW:function(a,b,c){return this.da(a,b,null,null,c)},
jV:function(a){return this.da(a,null,null,null,null)},
k:function(a){var z,y
z=this.a
y=z.dO()
y.am(0,z)
return"World<"+P.bT(y,"{","}")+">"},
a3:function(a,b){var z,y,x
z=this.ae(a)
y=z.a7(b)
x=this.a
x.ap(0,z)
x.n(0,y)},
cR:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(y[x].gj(),a)){z=x
break}++x}return z},
ht:function(a){this.a.am(0,a.a)
this.d.am(0,a.d)
this.b.am(0,a.b)
this.e.am(0,a.e)
C.a.am(this.f,a.f)
this.r=a.r},
t:{
dJ:function(a){var z,y,x,w
z=P.T(null,null,null,R.P)
y=P.aZ(null,O.cg)
x=P.T(null,null,null,U.aO)
w=P.T(null,null,null,null)
w=new A.av(z,x,a.c,y,w,[],null,null)
w.ht(a)
return w}}},nE:{"^":"a:0;a",
$1:function(a){return a.gf7()===this.a}},nF:{"^":"a:0;a",
$1:function(a){return J.f(a.gek(),this.a.gj())}},nG:{"^":"a:0;a",
$1:function(a){return a.geB().Z(0,this.a.y)}},nH:{"^":"a:0;a",
$1:function(a){return a.gfY()===this.a}},nI:{"^":"a:0;a",
$1:function(a){return a.gfX()===this.a}},nJ:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},nK:{"^":"a:0;a",
$1:function(a){return J.f(a.gh(),this.a)}},nL:{"^":"a:0;a",
$1:function(a){return J.f(a.gj(),this.a)}},nM:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aF:{"^":"a9;"},bC:{"^":"aF;b,X:c<,V:d<,h:e<,a",
T:[function(a,b,c){throw H.c(new P.F("SimpleAction always succeeds"))},"$3","gP",6,0,2],
R:[function(a,b,c){return this.b.$4(a,b,c,this)},"$3","gN",6,0,2],
af:function(a,b){throw H.c(new P.F("SimpleAction shouldn't have to provide roll reason"))},
M:function(a,b){return 1},
gW:function(){return!1},
I:function(a,b){return!0},
gO:function(){return H.h(new P.F("Not rerollable"))},
gS:function(){return!1}}}],["","",,E,{"^":"",fj:{"^":"G;V:c<,W:d<,b,a",
gaa:function(){return"break <object's> neck"},
gh:function(){return"StartBreakNeckOnGround"},
gS:function(){return!1},
gO:function(){return},
ga8:function(){return},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",z)
b.a3(a.gj(),new E.mp())
y=b.f
C.a.n(y,Y.el(a,z))
C.a.n(y,S.eV(a,z,C.q))
return H.b(a.gh())+" throws self down on "+H.b(z.gh())+" to break neck"},"$3","gN",6,0,2],
M:function(a,b){return 1},
I:function(a,b){return a.gK()!==!0&&this.b.gad()},
t:{
rM:[function(a){return new E.fj("This move is hard, but when succesful, it's decisive.",!0,a,null)},"$1","pG",2,0,5]}},mp:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,O,{"^":"",mn:{"^":"fj;S:e<,O:f<,c,d,b,a",
ga8:function(){return"will <subject> succeed?"},
T:[function(a,b,c){this.eF(a,c,b,C.o)
return H.b(a.gh())+" throws self down on "+H.b(this.b.gh())+" to (failed) break neck"},"$3","gP",6,0,2],
R:[function(a,b,c){this.eF(a,c,b,C.m)
return H.b(a.gh())+" throws self down on "+H.b(this.b.gh())+" to (successful) break neck"},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
I:function(a,b){return a.gK()===!0&&this.b.gad()},
eF:function(a,b,c,d){var z,y
z=this.b
a.aB(b,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",z)
c.a3(a.gj(),new O.mo())
y=c.f
C.a.n(y,Y.el(a,z))
C.a.n(y,S.eV(a,z,d))},
t:{
rL:[function(a){return new O.mn(!0,C.d,"This move is hard, but when succesful, it's decisive.",!0,a,null)},"$1","pH",2,0,5]}},mo:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,N,{"^":"",iQ:{"^":"G;W:c<,V:d<,S:e<,O:f<,b,a",
gaa:function(){return"confuse <object>"},
gh:function(){return"Confuse"},
ga8:function(){return"will <subject> confuse <object>?"},
T:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a4(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.a4(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.b(a.gh())+" fails to confuse "+H.b(z.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z
a.ak(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a4(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.bc(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gh())+" confuses "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return 0.6},
I:function(a,b){var z
if(a.gK()===!0)if(a.gai()){z=b.a
z=new H.H(z,new N.iR(this),[H.l(z,0)])
z=z.gl(z)>=2&&!this.b.ec(b)}else z=!1
else z=!1
return z},
t:{
rs:[function(a){return new N.iQ(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.d,a,null)},"$1","qw",2,0,5]}},iR:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbq()){z=a.gbf()
y=this.a.b.gbf()
z=z.a
y=y.gj()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,F,{"^":"",kO:{"^":"a9;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Stand off."},
gh:function(){return"Pass"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gK()===!0)a.ak(c,"<subject> stand<s> off")
return H.b(a.gh())+" passes the opportunity"},"$3","gN",6,0,2],
af:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
I:function(a,b){return!0}}}],["","",,Y,{"^":"",l1:{"^":"G;S:c<,O:d<,W:e<,V:f<,b,a",
gaa:function(){return"force <object> off balance"},
gh:function(){return"Pound"},
ga8:function(){return"will <subject> force <object> off balance?"},
T:[function(a,b,c){var z=this.b
a.fO(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga0(),z)
z.cw(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gh())+" kicks "+H.b(z.db)+" off balance"},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.fO(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga0(),z)
if(z.gai()){z.fN(c,"<subject> lose<s> <object>",!0,$.$get$e1())
b.a3(z.y,new Y.l2())
C.a.n(b.f,U.kw(z,a))
return H.b(a.gh())+" pounds "+H.b(z.db)+" off balance"}else if(z.gb2()){z.ak(c,"<subject> <is> already off balance")
c.f9(0,"<subject> make<s> <object> fall to the "+H.b(b.al("FightSituation").gbB()),z,$.$get$hG())
b.a3(z.y,new Y.l3())
return H.b(a.gh())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.F("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,2],
M:function(a,b){var z=a.gai()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){var z
if(!a.gad()){z=a.e
if(z!=null&&J.f(z.gbM(),C.c)){z=this.b
z=z.aD(C.c)&&!z.gad()}else z=!1}else z=!1
return z},
t:{
rI:[function(a){return new Y.l1(!0,C.d,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","r0",2,0,5]}},l2:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return a}},l3:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,B,{"^":"",lm:{"^":"a9;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Regain balance."},
gh:function(){return"RegainBalance"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gK()===!0)a.aU(c,"<subject> regain<s> <object>",$.$get$e1(),!0)
b.a3(a.gj(),new B.ln())
return H.b(a.gh())+" regains balance"},"$3","gN",6,0,2],
af:function(a,b){return"Will "+a.gH().a+" regain balance?"},
M:function(a,b){return 1},
I:function(a,b){return a.gb2()}},ln:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,O,{"^":"",lB:{"^":"a9;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Scramble."},
gh:function(){return"Scramble"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gh())+" scrambles on ground"},"$3","gN",6,0,2],
af:function(a,b){return"Will "+a.gH().a+" crawl out of harm's way?"},
M:function(a,b){return 1},
I:function(a,b){var z,y
if(!a.gad())return!1
z=b.c3("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
y=b.c3("Pound",a,!0)
if(y!=null&&y<=2)return!0
return!1}}}],["","",,Q,{"^":"",ml:{"^":"a9;V:b<,W:c<,S:d<,O:e<,a",
gX:function(){return"Stand up."},
gh:function(){return"StandUp"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.ak(c,"<subject> stand<s> up")
b.a3(a.gj(),new Q.mm())
return H.b(a.gh())+" stands up"},"$3","gN",6,0,2],
af:function(a,b){return"Will "+a.gH().a+" stand up?"},
M:function(a,b){return 1},
I:function(a,b){var z,y
if(!a.gad())return!1
z=b.c3("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!1
y=b.c3("Pound",a,!0)
if(y!=null&&y<=2)return!1
return!0}},mm:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return C.k}}}],["","",,G,{"^":"",fk:{"^":"G;V:c<,W:d<,b,a",
gO:function(){return},
gh:function(){return"StartSlash"},
gaa:function(){return"swing at <object>"},
gS:function(){return!1},
ga8:function(){return},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> swing<s> {<subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.q))
return H.b(a.db)+" starts a slash at "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return 1},
I:function(a,b){return a.gK()!==!0&&a.gai()&&!this.b.gad()&&a.aD(C.c)},
t:{
rQ:[function(a){return new G.fk("The basic swordfighting move is also often the most effective.",!0,a,null)},"$1","ra",2,0,5]}}}],["","",,R,{"^":"",fl:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"StartSlashOutOfBalance"},
gaa:function(){return"swing at <object> (while out of balance)"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){var z=this.b
a.fN(c,"<subject> completely miss<es> <object> with <subject's> "+H.b(a.ga0().gh()),!0,z)
return H.b(a.db)+" fails to start an out-of-balance slash at "+H.b(z.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> swing<s> {<subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.q))
return H.b(a.db)+" starts an out-of-balance slash at "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
I:function(a,b){return a.gK()!==!0&&a.gb2()&&!this.b.gad()&&a.aD(C.c)},
t:{
rO:[function(a){return new R.fl("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.d,a,null)},"$1","rb",2,0,5]}}}],["","",,T,{"^":"",mq:{"^":"fl;c,d,e,f,b,a",
gh:function(){return"StartSlashOutOfBalancePlayer"},
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> swing<s> {<subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.m))
return H.b(a.db)+" starts an out-of-balance slash at "+H.b(z.gh())},"$3","gN",6,0,2],
I:function(a,b){return a.gK()===!0&&a.gb2()&&!this.b.gad()&&a.aD(C.c)},
t:{
rN:[function(a){return new T.mq("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.d,a,null)},"$1","rc",2,0,5]}}}],["","",,A,{"^":"",mr:{"^":"fk;S:e<,O:f<,c,d,b,a",
ga8:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> swing<s> {<subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.o))
return H.b(a.db)+" starts a failed slash at "+H.b(z.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> swing<s> {<subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.m))
return H.b(a.db)+" starts a successful slash at "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
I:function(a,b){return a.gK()===!0&&a.gai()&&!this.b.gad()&&a.aD(C.c)},
t:{
rP:[function(a){return new A.mr(!0,C.d,"The basic swordfighting move is also often the most effective.",!0,a,null)},"$1","rd",2,0,5]}}}],["","",,D,{"^":"",fm:{"^":"G;V:c<,W:d<,b,a",
gh:function(){return"StartStrikeDown"},
gaa:function(){return"strike down at <object>"},
gS:function(){return!1},
gO:function(){return},
ga8:function(){return},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> strike<s> down {with <subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,D.dF(a,z))
C.a.n(y,V.dr(a,z,C.q))
return H.b(a.db)+" strikes down at "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
I:function(a,b){return a.gK()!==!0&&this.b.gad()&&!a.gad()&&a.aD(C.c)},
t:{
rS:[function(a){return new D.fm("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","re",2,0,5]}}}],["","",,Q,{"^":"",ms:{"^":"fm;c,d,b,a",
gaa:function(){return"strike down at <object>"},
gS:function(){return!0},
gO:function(){return C.d},
ga8:function(){return"will <subject> hit?"},
T:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> strike<s> down {with <subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,D.dF(a,z))
C.a.n(y,V.dr(a,z,C.o))
return H.b(a.db)+" makes an unsuccessful strike at "+H.b(z.gh())+" on the ground"},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aB(c,"<subject> strike<s> down {with <subject's> "+H.b(a.ga0().gh())+" |}at <object>",z)
y=b.f
C.a.n(y,D.dF(a,z))
C.a.n(y,V.dr(a,z,C.m))
return H.b(a.db)+" makes a successful strike at "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
I:function(a,b){return a.gK()===!0&&this.b.gad()&&!a.gad()&&a.aD(C.c)},
t:{
rR:[function(a){return new Q.ms("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","rf",2,0,5]}}}],["","",,B,{"^":"",n2:{"^":"G;S:c<,O:d<,W:e<,V:f<,b,a",
gh:function(){return"SweepOffFeet"},
gaa:function(){return"sweep <object> off <objectPronoun's> feet"},
ga8:function(){return"will <subject> knock <object> down?"},
T:[function(a,b,c){S.ba(new B.n3(this,a,c),new B.n4(this,a,c),null,null)
return H.b(a.gh())+" fails to sweep "+H.b(this.b.gh())+" off feet"},"$3","gP",6,0,2],
R:[function(a,b,c){var z
S.ba(new B.n5(this,a,c),new B.n6(this,a,c,b.al("FightSituation").gbB()),null,null)
z=this.b
b.a3(z.gj(),new B.n7())
return H.b(a.gh())+" sweeps "+H.b(z.gh())+" off feet"},"$3","gN",6,0,2],
M:function(a,b){var z=a.gai()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
I:function(a,b){return(a.gai()||a.dy===C.j)&&!this.b.gad()},
t:{
rU:[function(a){return new B.n2(!0,C.d,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","rj",2,0,5]}},n3:{"^":"a:1;a,b,c",
$0:function(){var z=this.c
this.b.aB(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.iw(0,"they don't connect",!0,!0)}},n4:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aB(z,"<subject> kick<s> <object's> shin",y)
y.jR(z,"<subject> <does>n't budge",!0)}},n5:{"^":"a:1;a,b,c",
$0:function(){this.b.aU(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},n6:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aU(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.ak(z,"<subject> {grunt|shriek}<s>")
y.bc(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},n7:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,Y,{"^":"",n8:{"^":"cu;b,a",
gV:function(){return"A different weapon might change the battle."},
gW:function(){return!1},
gh:function(){return"TakeDroppedItem"},
gS:function(){return!1},
gO:function(){return},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
b.d8(y.gj(),y.a7(new Y.n9(this)))
b.a3(a.gj(),new Y.na(this))
z=this.b
a.aB(c,"<subject> pick<s> up <object>",z)
return H.b(a.gh())+" picks up "+H.b(z.gh())},"$3","gN",6,0,2],
af:function(a,b){return H.h(new P.a4(null))},
M:function(a,b){return 1},
I:function(a,b){return!0},
t:{
rV:[function(a){return new Y.n8(a,null)},"$1","rk",2,0,45]}},n9:{"^":"a:27;a",
$1:function(a){a.gd0().ap(0,this.a.b)
return a}},na:{"^":"a:0;a",
$1:function(a){a.sa0(this.a.b)
return a}}}],["","",,M,{"^":"",nC:{"^":"a9;V:b<,S:c<,O:d<,W:e<,a",
gX:function(){return"Regain clarity."},
gh:function(){return"Unconfuse"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.ak(c,"<subject> shake<s> <subject's> head violently")
if(a.gK()===!0)c.n(0,"the {horrible|terrible} spell seems to recede")
c.a4(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.b(a.gh())+" regains clarity"},"$3","gN",6,0,2],
af:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
I:function(a,b){var z
if(a.ec(b)){z=b.c3("Confuse",a,!0)
if(typeof z!=="number")return z.bC()
z=z>4}else z=!1
return z}}}],["","",,R,{"^":"",jN:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"FinishBreakNeck"},
gaa:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a3(z.gj(),new R.jO())
a.aU(c,"<subject> break<s> <object's> neck",z,!0)
X.e8(c,b,z,b.al("FightSituation").gbB())
return H.b(a.gh())+" breaks "+H.b(z.gh())+"'s neck on ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
I:function(a,b){return!0},
t:{
ry:[function(a){return new R.jN(null,!0,!0,C.d,a,null)},"$1","qG",2,0,5]}},jO:{"^":"a:0;",
$1:function(a){a.sao(0)
return a}}}],["","",,Y,{"^":"",
el:function(a,b){var z=new Y.d6(null,null,null,null,null)
new Y.qm(a,b).$1(z)
return z.q()},
ek:{"^":"a5;",
gaZ:function(){return[R.qG()]},
gh:function(){return"BreakNeckOnGroundSituation"},
az:function(){var z=new Y.d6(null,null,null,null,null)
z.p(this)
new Y.iE().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.a)
return},
aE:function(a,b){return new H.H(a,new Y.iF(this),[H.l(a,0)])}},
qm:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gaN().c=z
a.gaN().e=0
z=this.a.gj()
a.gaN().b=z
z=this.b.gj()
a.gaN().d=z
return a}},
iE:{"^":"a:0;",
$1:function(a){var z=a.gaN().e
if(typeof z!=="number")return z.a5()
a.gaN().e=z+1
return a}},
iF:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
nQ:{"^":"ek;a,j:b<,c,U:d<",
a7:function(a){var z=new Y.d6(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.ek))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"BreakNeckOnGroundSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
d6:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaN().c},
gU:function(){return this.gaN().e},
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
z=new Y.nQ(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,Z,{"^":"",jy:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gaa:function(){return"evade"},
gh:function(){return"EvadeNeckBreaking"},
ga8:function(){return"will <subject> evade?"},
T:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to evade")
S.ba(new Z.jz(a,c),new Z.jA(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.gh())+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.aU(c,"<subject> {dodge<s>|evade<s>} it",z,!0)
b.c1("FightSituation")
return H.b(a.gh())+" evades "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbx())return 0
if(y.gby())return 1
x=this.b.ga0()!=null?0.4:0
if(a.gK()===!0)return 0.6+x
return 0.5+x},
I:function(a,b){return!0},
t:{
rx:[function(a){return new Z.jy("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!0,C.d,a,null)},"$1","qD",2,0,5]}},jz:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a4(0,"<subject> {can't|fail<s>}",!0,!1,!1,null,null,!1,z,!1)
return}},jA:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cz(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
eV:function(a,b,c){var z=new S.ds(null,null,null,null,null,null)
new S.ql(a,b,c).$1(z)
return z.q()},
eU:{"^":"a5;",
gaZ:function(){return[Z.qD()]},
gbx:function(){return this.c===C.m},
gby:function(){return this.c===C.o},
gh:function(){return"OnGroundWrestleDefenseSituation"},
az:function(){var z=new S.ds(null,null,null,null,null,null)
z.p(this)
new S.kH().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.d)
return},
aE:function(a,b){return new H.H(a,new S.kI(this),[H.l(a,0)])}},
ql:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.gj()
a.gay().b=z
z=this.b.gj()
a.gay().e=z
a.gay().d=this.c
return a}},
kH:{"^":"a:0;",
$1:function(a){var z=a.gay().f
if(typeof z!=="number")return z.a5()
a.gay().f=z+1
return a}},
kI:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.d)}},
nW:{"^":"eU;a,j:b<,c,d,U:e<",
a7:function(a){var z=new S.ds(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eU))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundWrestleDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
ds:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gay().c},
gU:function(){return this.gay().f},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
u=this.gay().f
z=new S.nW(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("target"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,G,{"^":"",et:{"^":"G;V:c<,W:d<,b,a",
gh:function(){return"CounterSlash"},
gS:function(){return!1},
gO:function(){return},
gaa:function(){return"swing back at <object>"},
ga8:function(){return"will <subject> keep <subject's> balance?"},
T:[function(a,b,c){a.ak(c,"<subject> tr<ies> to swing back")
a.toString
c.a4(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gai()){b.a3(a.y,new G.j1())
c.a4(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dy===C.j){b.a3(a.y,new G.j2())
c.a4(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a4(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aU(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.q))
return H.b(a.gh())+" swings back at "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return this.b.gai()?0.7:0.9},
I:function(a,b){return a.gK()!==!0&&a.aD(C.c)&&!a.gad()},
t:{
ru:[function(a){return new G.et("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","qz",2,0,5]}},j1:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return a}},j2:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,D,{"^":"",iZ:{"^":"et;c,d,b,a",
gS:function(){return!0},
gO:function(){return C.d},
gaa:function(){return"swing back at <object>"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){a.ak(c,"<subject> tr<ies> to swing back")
a.toString
c.a4(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gai()){b.a3(a.y,new D.j_())
c.a4(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dy===C.j){b.a3(a.y,new D.j0())
c.a4(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a4(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aU(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.n(y,M.be(a,z))
C.a.n(y,L.bd(a,z,C.m))
return H.b(a.gh())+" swings successfully back at "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return this.b.gai()?0.7:0.9},
I:function(a,b){return a.gK()===!0&&a.aD(C.c)&&!a.gad()},
t:{
rt:[function(a){return new D.iZ("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","qA",2,0,5]}},j_:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return a}},j0:{"^":"a:0;",
$1:function(a){a.saj(C.l)
return a}}}],["","",,S,{"^":"",
es:function(a,b){var z=new S.d9(null,null,null,null,null)
new S.qh(a,b).$1(z)
return z.q()},
er:{"^":"a5;",
gaZ:function(){return[G.qz(),D.qA()]},
gbk:function(){return[$.$get$dt()]},
gh:function(){return"CounterAttackSituation"},
az:function(){var z=new S.d9(null,null,null,null,null)
z.p(this)
new S.iX().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.a)
return},
aE:function(a,b){return new H.H(a,new S.iY(this),[H.l(a,0)])}},
qh:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gaO().c=z
a.gaO().e=0
z=this.a.gj()
a.gaO().b=z
z=this.b.gj()
a.gaO().d=z
return a}},
iX:{"^":"a:0;",
$1:function(a){var z=a.gaO().e
if(typeof z!=="number")return z.a5()
a.gaO().e=z+1
return a}},
iY:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
nR:{"^":"er;a,j:b<,c,U:d<",
a7:function(a){var z=new S.d9(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.er))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
d9:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaO().c},
gU:function(){return this.gaO().e},
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
z=new S.nR(y,x,w,v)
if(y==null)H.h(P.m("counterAttacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,X,{"^":"",
e8:function(a,b,c,d){var z=b.al("FightSituation")
b.d8(z.gj(),z.a7(new X.qW(c)))
if(c.gaj()===C.l){c.bc(a,"<subject> stop<s> moving",!0)
a.G(0,"\n\n",!0)
return}switch($.$get$h6().ab(3)){case 0:c.d9(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.bc(a,"<subject> fall<s> backward",!0)
c.bc(a,"<subject> twist<s>",!0)
c.d9(a,"<subject> hit<s> the "+H.b(d)+" face down",!0,!0)
break
case 2:c.bc(a,"<subject> drop<s> to <subject's> knees",!0)
c.bc(a,"<subject> keel<s> over",!0)
break}a.G(0,"\n\n",!0)},
qW:{"^":"a:0;a",
$1:function(a){var z=this.a
if(z.ga0()!=null)a.gd0().n(0,z.ga0())
return a}}}],["","",,U,{"^":"",
jC:function(a,b,c,d){var z=new U.bS(null,null,null,null,null,null,null,null,null)
new U.qe(a,b,c,d).$1(z)
return z.q()},
ex:{"^":"a5;",
gaZ:function(){return[N.qw(),Y.r0(),B.rj(),E.pG(),O.pH(),G.ra(),A.rd(),D.re(),Q.rf(),R.rb(),T.rc(),Y.rk()]},
gbk:function(){return H.t([$.$get$f1(),$.$get$fi(),$.$get$f5(),$.$get$fM()],[Q.a9])},
gfA:function(){return 1000},
gh:function(){return"FightSituation"},
e2:function(a,b){var z=a.a
return(z&&C.a).bW(z,new U.jD(b))},
az:function(){var z=new U.bS(null,null,null,null,null,null,null,null,null)
z.p(this)
new U.jE().$1(z)
return z.q()},
av:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.hf(this.f,this.b)
y=H.bx(z,new U.jF(b),H.v(z,"x",0),null)
x=H.v(y,"x",0)
w=P.U(new H.H(y,new U.jG(),[x]),!1,x)
x=H.l(w,0)
v=P.U(new H.H(w,new U.jH(),[x]),!1,x)
u=v.length===1?C.a.gbS(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ar)(w),++r){q=w[r]
p=b.d.bo(0,new U.jI(q),new U.jJ())
o=p==null?p:p.gU()
if(o==null)o=-1
x=b.r
if(typeof o!=="number")return H.y(o)
n=x-o
if(q.gK()===!0)n=C.i.em(n*1.5)
if(n>t){s=q
t=n}}return s},
aE:function(a,b){return new H.H(a,new U.jK(this),[H.l(a,0)])},
fG:function(a,b){var z,y
if(S.lf(0.25))b.G(0,"\n\n",!0)
z=this.x
y=this.c.a
if(y.a_(z))y.i(0,z).$2(a,b)},
b4:function(a){var z,y
z=this.r
if(z!=null&&!this.e2(this.b,a)){y=a.es(z)
a.d8(y.gj(),y.a7(new U.jL()))}},
dn:function(a){var z=this.f
if(this.e2(z,a))if(this.e2(this.b,a)){z=z.a
z=(z&&C.a).bW(z,new U.jM(a))}else z=!1
else z=!1
return z}},
qe:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$a7().ab(1073741823)
a.ga9().f=z
a.ga9().y=0
z=a.ga9()
y=z.r
if(y==null){y=new S.ad(null,null,[P.u])
y.as()
y.p(C.f)
z.r=y
z=y}else z=y
y=this.a
z.p(new H.cz(y,new U.pm(),[H.l(y,0),null]))
y=a.ga9()
z=y.c
if(z==null){z=new S.ad(null,null,[P.u])
z.as()
z.p(C.f)
y.c=z}z.p(J.ee(this.b,new U.pn()))
a.ga9().e=this.c
z=new S.ad(null,null,[U.aO])
z.as()
z.p(C.f)
a.ga9().b=z
z=this.d.gj()
a.ga9().x=z
return a}},
pm:{"^":"a:0;",
$1:function(a){return a.gj()}},
pn:{"^":"a:0;",
$1:function(a){return a.gj()}},
jD:{"^":"a:0;a",
$1:function(a){return this.a.ae(a).gb9()}},
jE:{"^":"a:0;",
$1:function(a){var z=a.ga9().y
if(typeof z!=="number")return z.a5()
a.ga9().y=z+1
return a}},
jF:{"^":"a:0;a",
$1:function(a){return this.a.ae(a)}},
jG:{"^":"a:0;",
$1:function(a){return a.gb9()}},
jH:{"^":"a:0;",
$1:function(a){return a.gK()}},
jI:{"^":"a:0;a",
$1:function(a){return J.f(a.gek(),this.a.gj())}},
jJ:{"^":"a:1;",
$0:function(){return}},
jK:{"^":"a:20;a",
$1:function(a){var z,y,x
if(a.gb9()){z=this.a
y=a.gj()
x=z.f.a
if(!(x&&C.a).Z(x,y)){y=a.gj()
z=z.b.a
y=(z&&C.a).Z(z,y)
z=y}else z=!0}else z=!1
return z}},
jL:{"^":"a:0;",
$1:function(a){a.sjE(!1)
return a}},
jM:{"^":"a:29;a",
$1:function(a){var z=this.a.ae(a)
return z.gK()===!0&&z.gb9()}},
nT:{"^":"ex;d0:a<,b,c,bB:d<,j:e<,f,r,U:x<",
a7:function(a){var z=new U.bS(null,null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.ex))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b))if(J.f(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.f(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)))},
k:function(a){return"FightSituation {droppedItems="+J.i(this.a)+",\nenemyTeamIds="+J.i(this.b)+",\nevents="+J.i(this.c)+",\ngroundMaterial="+J.i(this.d)+",\nid="+J.i(this.e)+",\nplayerTeamIds="+J.i(this.f)+",\nroomRoamingSituationId="+J.i(this.r)+",\ntime="+J.i(this.x)+",\n}"}},
bS:{"^":"d;a,b,c,d,e,f,r,x,y",
gd0:function(){var z,y
z=this.ga9()
y=z.b
if(y==null){y=new S.ad(null,null,[U.aO])
y.as()
y.p(C.f)
z.b=y
z=y}else z=y
return z},
gbB:function(){return this.ga9().e},
gj:function(){return this.ga9().f},
gU:function(){return this.ga9().y},
ga9:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.ad(null,null,[H.l(z,0)])
y.as()
y.p(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.ad(null,null,[H.l(z,0)])
y.as()
y.p(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.dm(null,null,[H.l(z,0),H.l(z,1)])
y.cd()
y.p(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.ad(null,null,[H.l(z,0)])
y.as()
y.p(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.ga9()
x=y.b
if(x==null){x=new S.ad(null,null,[U.aO])
x.as()
x.p(C.f)
y.b=x
y=x}else y=x
y=y.q()
x=this.ga9()
w=x.c
if(w==null){w=new S.ad(null,null,[P.u])
w.as()
w.p(C.f)
x.c=w
x=w}else x=w
x=x.q()
w=this.ga9()
v=w.d
if(v==null){v=new A.dm(null,null,[P.u,{func:1,v:true,args:[A.av,Y.ag]}])
v.cd()
v.p(C.V)
w.d=v
w=v}else w=v
w=w.q()
v=this.ga9().e
u=this.ga9().f
t=this.ga9()
s=t.r
if(s==null){s=new S.ad(null,null,[P.u])
s.as()
s.p(C.f)
t.r=s
t=s}else t=s
t=t.q()
s=this.ga9().x
r=this.ga9().y
z=new U.nT(y,x,w,v,u,t,s,r)
if(y==null)H.h(P.m("droppedItems"))
if(x==null)H.h(P.m("enemyTeamIds"))
if(w==null)H.h(P.m("events"))
if(v==null)H.h(P.m("groundMaterial"))
if(u==null)H.h(P.m("id"))
if(t==null)H.h(P.m("playerTeamIds"))
if(r==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,A,{"^":"",kA:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"OffBalanceOpportunityThrust"},
gaa:function(){return"stab <object>"},
ga8:function(){return"will <subject> hit <objectPronoun>?"},
T:[function(a,b,c){var z=this.b
a.aB(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.a4(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gh())+" fails to stab "+H.b(z.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a3(z.gj(),new A.kB())
if(b.ae(z.gj()).gbq()){a.aU(c,"<subject> thrust<s> {|<subject's> "+H.b(a.ga0().gh())+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bc(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.aU(c,"<subject> {stab<s>|run<s> <subject's> "+H.b(a.ga0().gh())+" through} <object>",z,!0)
X.e8(c,b,z,b.al("FightSituation").gbB())}return H.b(a.gh())+" stabs "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){if(a.gK()===!0)return 0.6
return 0.5},
I:function(a,b){var z
if(a.gai())if(this.b.gb2()){z=a.e
z=z!=null&&J.f(z.gbM(),C.c)}else z=!1
else z=!1
return z},
t:{
rD:[function(a){return new A.kA("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.d,a,null)},"$1","qY",2,0,5]}},kB:{"^":"a:0;",
$1:function(a){var z=a.gao()
if(typeof z!=="number")return z.aM()
a.sao(z-1)
return a}}}],["","",,U,{"^":"",
kw:function(a,b){var z=new U.dp(null,null,null,null,null)
new U.qn(a,b).$1(z)
return z.q()},
eS:{"^":"a5;",
gaZ:function(){return H.t([A.qY()],[{func:1,ret:Q.G,args:[R.P]}])},
gbk:function(){return[$.$get$dt()]},
gh:function(){return"OffBalanceOpportunitySituation"},
az:function(){var z=new U.dp(null,null,null,null,null)
z.p(this)
new U.kx().$1(z)
return z.q()},
av:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bC()
if(a>0)return
z=b.ae(this.a)
y=b.a
x=H.l(y,0)
w=P.U(new H.H(y,new U.ky(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gfl(w)
if(v.gai())if(z.gb2()){y=v.e
y=y!=null&&J.f(y.gbM(),C.c)}else y=!1
else y=!1
if(y)return v
return},
aE:function(a,b){return new H.H(a,new U.kz(b,b.ae(this.a)),[H.l(a,0)])}},
qn:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gaP().d=z
a.gaP().e=0
z=this.a.gj()
a.gaP().b=z
z=this.b
z=z==null?z:z.gj()
a.gaP().c=z
return a}},
kx:{"^":"a:0;",
$1:function(a){var z=a.gaP().e
if(typeof z!=="number")return z.a5()
a.gaP().e=z+1
return a}},
ky:{"^":"a:20;a,b,c",
$1:function(a){var z,y
if(a.gb9())if(a.e8(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
kz:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.f(a,z)||a.e8(z,this.a)}},
nU:{"^":"eS;a,b,j:c<,U:d<",
a7:function(a){var z=new U.dp(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eS))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.i(this.a))+",\nculpritId="+J.i(this.b)+",\nid="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dp:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaP().d},
gU:function(){return this.gaP().e},
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
z=new U.nU(y,x,w,v)
if(y==null)H.h(P.m("actorId"))
if(w==null)H.h(P.m("id"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,O,{"^":"",jP:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"FinishSlash"},
gaa:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y,x
z=this.b
b.a3(z.gj(),new O.jS())
y=b.ae(z.gj()).gbq()
if(y){a.aU(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.bc(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.aU(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.e8(c,b,z,b.al("FightSituation").gbB())}x=H.b(a.gh())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.b(z.gh())},"$3","gN",6,0,2],
M:function(a,b){return 1},
I:function(a,b){return a.aD(C.c)},
t:{
rA:[function(a){return new O.jP(null,!0,!0,C.d,a,null)},"$1","qH",2,0,5]}},jS:{"^":"a:0;",
$1:function(a){var z=a.gao()
if(typeof z!=="number")return z.aM()
a.sao(z-1)
return a}}}],["","",,X,{"^":"",j7:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"DefensiveParrySlash"},
gaa:function(){return"step back and parry"},
ga8:function(){return"will <subject> parry it?"},
T:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga0().gh())+"|fend it off}")
if(a.gb2())c.a4(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.ba(new X.j8(a,c),new X.j9(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gK()===!0)a.ak(c,"<subject> {step<s>|take<s> a step} back")
a.cw(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+H.b(a.ga0().gh())+"|fend<s> it off}",!0)
if(!a.gai()){b.a3(a.y,new X.ja())
if(a.ch===!0)c.a4(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.c1("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gh())},"$3","gN",6,0,2],
M:function(a,b){var z,y
if(a.gK()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbx())return 0
if(y.gby())return 1
return 0.5-(a.gai()?0:0.2)},
I:function(a,b){return a.aD(C.c)},
t:{
rv:[function(a){return new X.j7("Stepping back is the safest way to get out of harm's way.",!1,!0,C.d,a,null)},"$1","qB",2,0,5]}},j8:{"^":"a:1;a,b",
$0:function(){this.b.a4(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},j9:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cz(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ja:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,F,{"^":"",jb:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"DodgeSlash"},
gaa:function(){return"dodge and counter"},
ga8:function(){return"will <subject> dodge?"},
T:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gb2())c.a4(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.ba(new F.jc(a,c),new F.jd(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.db)+" fails to dodge "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.aU(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gai()){z.d9(c,"<subject> lose<s> balance because of that",!0,!0)
b.a3(z.y,new F.je())}b.c1("FightSituation")
if(a.gK()===!0)c.n(0,"this opens an opportunity for a counter attack")
C.a.n(b.f,S.es(a,z))
return H.b(a.gh())+" dodges "+H.b(z.db)},"$3","gN",6,0,2],
M:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbx())return 0
if(y.gby())return 1
x=a.gai()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
I:function(a,b){return!a.gad()},
t:{
rw:[function(a){return new F.jb("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.d,a,null)},"$1","qC",2,0,5]}},jc:{"^":"a:1;a,b",
$0:function(){this.b.a4(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},jd:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cz(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},je:{"^":"a:0;",
$1:function(a){a.saj(C.j)
return C.j}}}],["","",,G,{"^":"",kL:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"ParrySlash"},
gaa:function(){return"parry and counter"},
ga8:function(){return"will <subject> parry?"},
T:[function(a,b,c){var z
a.ak(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+H.b(a.ga0().gh())+"|fend it off}")
if(a.gb2())c.a4(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.ba(new G.kM(a,c),new G.kN(this,a,c),null,null)
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
if(z.gb2()){c.iy(0,"<subject> <is> out of balance",!0,!0,z)
c.ix(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$hK())
a.cw(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+H.b(a.ga0().gh())+"|fend<s> it off easily}",!0)}else a.cw(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+H.b(a.ga0().gh())+"|fend<s> it off}",!0)
b.c1("FightSituation")
if(a.gK()===!0)c.n(0,"this opens an opportunity for a counter attack")
C.a.n(b.f,S.es(a,z))
return H.b(a.gh())+" parries "+H.b(z.db)},"$3","gN",6,0,2],
M:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbx())return 0
if(y.gby())return 1
x=a.gai()?0:0.2
w=this.b.gb2()?0.3:0
if(a.ch===!0)return 0.6-x+w
return 0.3-x+w},
I:function(a,b){return a.aD(C.c)},
t:{
rF:[function(a){return new G.kL("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.d,a,null)},"$1","r_",2,0,5]}},kM:{"^":"a:1;a,b",
$0:function(){this.b.a4(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},kN:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cz(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bd:function(a,b,c){var z=new L.dB(null,null,null,null,null,null)
new L.qf(a,b,c).$1(z)
return z.q()},
f9:{"^":"a5;",
gaZ:function(){return[F.qC(),G.r_(),X.qB()]},
gbx:function(){return this.c===C.m},
gby:function(){return this.c===C.o},
gh:function(){return"SlashDefenseSituation"},
az:function(){var z=new L.dB(null,null,null,null,null,null)
z.p(this)
new L.m5().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.d)
return},
aE:function(a,b){return new H.H(a,new L.m6(this),[H.l(a,0)])}},
qf:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gax().c=z
a.gax().f=0
z=this.a.gj()
a.gax().b=z
z=this.b.gj()
a.gax().e=z
a.gax().d=this.c
return a}},
m5:{"^":"a:0;",
$1:function(a){var z=a.gax().f
if(typeof z!=="number")return z.a5()
a.gax().f=z+1
return a}},
m6:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.d)}},
nY:{"^":"f9;a,j:b<,c,d,U:e<",
a7:function(a){var z=new L.dB(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.f9))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"SlashDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntarget="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dB:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gax().c},
gU:function(){return this.gax().f},
gax:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gax().b
x=this.gax().c
w=this.gax().d
v=this.gax().e
u=this.gax().f
z=new L.nY(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("target"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,M,{"^":"",
be:function(a,b){var z=new M.dC(null,null,null,null,null)
new M.qi(a,b).$1(z)
return z.q()},
fa:{"^":"a5;",
gaZ:function(){return[O.qH()]},
gh:function(){return"SlashSituation"},
az:function(){var z=new M.dC(null,null,null,null,null)
z.p(this)
new M.m7().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.a)
return},
aE:function(a,b){return new H.H(a,new M.m8(this),[H.l(a,0)])}},
qi:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gaQ().c=z
a.gaQ().e=0
z=this.a.gj()
a.gaQ().b=z
z=this.b.gj()
a.gaQ().d=z
return a}},
m7:{"^":"a:0;",
$1:function(a){var z=a.gaQ().e
if(typeof z!=="number")return z.a5()
a.gaQ().e=z+1
return a}},
m8:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
nZ:{"^":"fa;a,j:b<,c,U:d<",
a7:function(a){var z=new M.dC(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fa))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"SlashSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntarget="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dC:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaQ().c},
gU:function(){return this.gaQ().e},
gaQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
z=new M.nZ(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,Q,{"^":"",jQ:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"FinishSlashGroundedEnemy"},
gaa:function(){return""},
ga8:function(){return"(WARNING should not be user-visible)"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a3(z.gj(),new Q.jR())
c.f9(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga0())
z.bc(c,"<subject> die<s>",!0)
c.G(0,"\n\n",!0)
return H.b(a.gh())+" slains "+H.b(z.gh())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
I:function(a,b){return this.b.gad()&&a.aD(C.c)},
t:{
rz:[function(a){return new Q.jQ(null,!1,!0,C.d,a,null)},"$1","qI",2,0,5]}},jR:{"^":"a:0;",
$1:function(a){a.sao(0)
return a}}}],["","",,K,{"^":"",kE:{"^":"G;W:c<,S:d<,O:e<,V:f<,b,a",
gh:function(){return"OnGroundParry"},
gaa:function(){return"parry it"},
ga8:function(){return"will <subject> parry it?"},
T:[function(a,b,c){a.ak(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+H.b(a.ga0().gh())+"}}")
S.ba(new K.kF(a,c),new K.kG(this,a,c),null,null)
return H.b(a.db)+" fails to parry "+H.b(this.b.gh())},"$3","gP",6,0,2],
R:[function(a,b,c){a.cw(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+H.b(a.ga0().gh())+"}",!0)
b.c1("FightSituation")
return H.b(a.db)+" parries "+H.b(this.b.gh())},"$3","gN",6,0,2],
M:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbx())return 0
if(y.gby())return 1
if(a.gK()===!0)return 0.6
return 0.3},
I:function(a,b){return a.aD(C.c)},
t:{
rE:[function(a){return new K.kE(!1,!0,C.d,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","qZ",2,0,5]}},kF:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a4(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},kG:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.cz(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",lp:{"^":"G;V:c<,W:d<,S:e<,O:f<,b,a",
gh:function(){return"RollOutOfWay"},
gaa:function(){return"roll out of way"},
ga8:function(){return"will <subject> evade?"},
T:[function(a,b,c){a.ak(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.a4(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gh())+" fails to roll out of the way"},"$3","gP",6,0,2],
R:[function(a,b,c){a.jS(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gK()===!0){b.a3(a.gj(),new Y.lq())
c.a4(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.c1("FightSituation")
return H.b(a.gh())+" rolls out of the way of "+H.b(this.b.gh())+"'s strike"},"$3","gN",6,0,2],
M:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbx())return 0
if(y.gby())return 1
if(a.gK()===!0)return 1
return 0.5},
I:function(a,b){return!0},
t:{
rK:[function(a){return new Y.lp(null,!1,!0,C.d,a,null)},"$1","r4",2,0,5]}},lq:{"^":"a:0;",
$1:function(a){a.saj(C.k)
return a}}}],["","",,V,{"^":"",
dr:function(a,b,c){var z=new V.dq(null,null,null,null,null,null)
new V.qj(a,b,c).$1(z)
return z.q()},
eT:{"^":"a5;",
gaZ:function(){return[K.qZ(),Y.r4()]},
gbx:function(){return this.c===C.m},
gby:function(){return this.c===C.o},
gh:function(){return"OnGroundDefenseSituation"},
az:function(){var z=new V.dq(null,null,null,null,null,null)
z.p(this)
new V.kC().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.d)
return},
aE:function(a,b){return new H.H(a,new V.kD(this),[H.l(a,0)])}},
qj:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gaw().c=z
a.gaw().f=0
z=this.a.gj()
a.gaw().b=z
z=this.b.gj()
a.gaw().e=z
a.gaw().d=this.c
return a}},
kC:{"^":"a:0;",
$1:function(a){var z=a.gaw().f
if(typeof z!=="number")return z.a5()
a.gaw().f=z+1
return a}},
kD:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.d)}},
nV:{"^":"eT;a,j:b<,c,d,U:e<",
a7:function(a){var z=new V.dq(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.eT))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\npredeterminedResult="+J.i(this.c)+",\ntargetOnGround="+H.b(J.i(this.d))+",\ntime="+J.i(this.e)+",\n}"}},
dq:{"^":"d;a,b,c,d,e,f",
gj:function(){return this.gaw().c},
gU:function(){return this.gaw().f},
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
z=new V.nV(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("targetOnGround"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,D,{"^":"",
dF:function(a,b){var z=new D.dE(null,null,null,null,null)
new D.qk(a,b).$1(z)
return z.q()},
fo:{"^":"a5;",
gaZ:function(){return[Q.qI()]},
gh:function(){return"StrikeDownSituation"},
az:function(){var z=new D.dE(null,null,null,null,null)
z.p(this)
new D.mZ().$1(z)
return z.q()},
av:function(a,b){if(a===0)return b.ae(this.a)
return},
aE:function(a,b){return new H.H(a,new D.n_(this),[H.l(a,0)])}},
qk:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gaR().c=z
a.gaR().e=0
z=this.a.gj()
a.gaR().b=z
z=this.b.gj()
a.gaR().d=z
return a}},
mZ:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
if(typeof z!=="number")return z.a5()
a.gaR().e=z+1
return a}},
n_:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a.gj(),z.a)||J.f(a.gj(),z.c)}},
o0:{"^":"fo;a,j:b<,c,U:d<",
a7:function(a){var z=new D.dE(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fo))return!1
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
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+J.i(this.a)+",\nid="+J.i(this.b)+",\ntargetOnGround="+H.b(J.i(this.c))+",\ntime="+J.i(this.d)+",\n}"}},
dE:{"^":"d;a,b,c,d,e",
gj:function(){return this.gaR().c},
gU:function(){return this.gaR().e},
gaR:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaR().b
x=this.gaR().c
w=this.gaR().d
v=this.gaR().e
z=new D.o0(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("targetOnGround"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,K,{"^":"",dw:{"^":"d;a,b",
k:function(a){return this.b}}}],["","",,D,{"^":"",m9:{"^":"a9;W:b<,S:c<,O:d<,a",
gX:function(){return""},
gV:function(){return},
gh:function(){return"SlayMonstersAction"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dk(y.gbn())
w=b.a
v=x.jD(b)
w.am(0,v)
C.a.n(z,U.jC(new H.H(w,new D.ma(a,x),[H.l(w,0)]),v,x.r,y))
return H.b(a.gh())+" initiated combat with monsters in "+x.k(0)},"$3","gN",6,0,2],
af:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
I:function(a,b){var z=b.f
return H.a_(z.length!==0?C.a.gE(z):null,"$isaf").c}},ma:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gb9()){z=a.gbf()
y=this.a.gbf()
z=z.a
y=y.gj()
if(z==null?y==null:z===y){z=a.gbn()
y=this.b.gh()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",nb:{"^":"cs;W:c<,S:d<,O:e<,b,a",
gV:function(){return},
gh:function(){return"TakeExitAction"},
T:[function(a,b,c){throw H.c(new P.a4(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
c.n(0,z.gb_())
y=b.f
H.a_(y.length!==0?C.a.gE(y):null,"$isaf").b3(b,a,z.giW(),c)
return H.b(a.gh())+" went through exit to "+z.a},"$3","gN",6,0,2],
af:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
I:function(a,b){var z=b.f
if(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").c===!0)return!1
this.b.gjn()
return!0},
t:{
rW:[function(a){return new Y.nb(!1,!1,null,a,null)},"$1","rl",2,0,46]}}}],["","",,F,{"^":"",
f2:function(a,b){var z=new F.dz(null,null,null,null,null)
new F.q4(a,b).$1(z)
return z.q()},
af:{"^":"a5;",
gaZ:function(){return[Y.rl()]},
gbk:function(){var z=[]
C.a.am(z,$.$get$hd())
z.push($.$get$fb())
return z},
gh:function(){return"RoomRoamingSituation"},
az:function(){var z=new F.dz(null,null,null,null,null)
z.p(this)
new F.lr().$1(z)
return z.q()},
av:function(a,b){return b.a.bo(0,new F.ls(),new F.lt())},
aE:function(a,b){var z=this.av(null,b)
if(z==null)return[]
return[z]},
fF:function(a,b){a.a.hP(new F.lv(),!0)},
b3:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dk(c)
a.d8(this.b,F.f2(z,z.gjC()!=null))
d.iD()
z.c.$3(b,a,d)
d.G(0,"\n\n",!0)
for(y=R.hs(b,a),y=P.U(y,!0,H.v(y,"x",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ar)(y),++v){u=a.ae(y[v].gj())
t=u.a7(new F.lu(z))
w.ap(0,u)
w.n(0,t)}},
dn:function(a){if(J.f(this.a,$.$get$e3().b))return!1
return!0}},
q4:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.gat().c=z
a.gat().e=0
z=this.a.gh()
a.gat().b=z
a.gat().d=this.b
return a}},
lr:{"^":"a:0;",
$1:function(a){var z=a.gat().e
if(typeof z!=="number")return z.a5()
a.gat().e=z+1
return a}},
ls:{"^":"a:0;",
$1:function(a){return a.gK()===!0&&a.gb9()}},
lt:{"^":"a:1;",
$0:function(){return}},
lv:{"^":"a:0;",
$1:function(a){return!a.gbq()}},
lu:{"^":"a:0;a",
$1:function(a){a.sbn(this.a.b)
return a}},
nX:{"^":"af;bn:a<,j:b<,c,U:d<",
a7:function(a){var z=new F.dz(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.af))return!1
if(J.f(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
k:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.i(this.a))+",\nid="+J.i(this.b)+",\nmonstersAlive="+J.i(this.c)+",\ntime="+J.i(this.d)+",\n}"}},
dz:{"^":"d;a,b,c,d,e",
gbn:function(){return this.gat().b},
sbn:function(a){this.gat().b=a
return a},
gj:function(){return this.gat().c},
sjE:function(a){this.gat().d=a
return a},
gU:function(){return this.gat().e},
gat:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gat().b
x=this.gat().c
w=this.gat().d
v=this.gat().e
z=new F.nX(y,x,w,v)
if(y==null)H.h(P.m("currentRoomName"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("monstersAlive"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,V,{"^":"",
nd:function(){var z=new V.dG(null,null,null)
new V.qq().$1(z)
return z.q()},
no:function(){var z=new V.dH(null,null,null)
new V.qp().$1(z)
return z.q()},
me:function(){var z=new V.dD(null,null,null)
new V.qo().$1(z)
return z.q()},
q2:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The journey from slavery to power begins with a single crack of a skull. Agruth, the orc-slaver, falls to the rock floor. You take his shortsword and with help from another slave, Briana, you move Agruth's body to a shady crevice in the tunnel's wall.\n\n\nYou are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past life is almost forgotten. [a][b][c][d]\n\n\n<p class=\"meta\">You can use the question mark (?) icons below to learn more about each option.</p>\n",!0)}},
q3:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
jT:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"start_of_book"))return!1
return!0},
R:[function(a,b,c){c.n(0,'You go to church. Entering the church -- just before "The Church is\u2026"')
b.al("RoomRoamingSituation").b3(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" successfully performs FleeThroughNecromancersChurch"},"$3","gN",6,0,2],
T:[function(a,b,c){c.n(0,null)
c.n(0,'You go to church but someone notices a shadow (but doesn\'t pursue immediately). Entering the church -- just before "The Church is\u2026"')
N.eb(b,new V.jU())
b.al("RoomRoamingSituation").b3(b,N.aA(b),"underground_church",c)
return H.b(a.gh())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
M:function(a,b){return 0.9},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"The Underground Church is \u2026 It is much less patrolled, so you're more likely to slip through unnoticed. On the other hand, it's unclear who or what lurks there."},
gW:function(){return!1}},
jU:{"^":"a:0;",
$1:function(a){var z
a.gbD()
z=a.b
a.gbD()
a.b=z+1
return a}},
jV:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"start_of_book"))return!1
return!0},
R:[function(a,b,c){c.n(0,'You go to war forgery (some hidden place there). Entering forges -- just before "The Forges are\u2026"')
b.al("RoomRoamingSituation").b3(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" successfully performs FleeThroughWarForge"},"$3","gN",6,0,2],
T:[function(a,b,c){c.n(0,null)
c.n(0,'You go to war forge but someone notices a shadow (but doesn\'t pursue immediately). Entering forges -- just before "The Forges are\u2026"')
N.eb(b,new V.jW())
b.al("RoomRoamingSituation").b3(b,N.aA(b),"war_forge",c)
return H.b(a.gh())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
M:function(a,b){return 0.7},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"The War Forges are where the war machines are built. It's a place that you are familiar with, and it's a more direct path to freedom. But these parts are also full of orcs."},
gW:function(){return!1}},
jW:{"^":"a:0;",
$1:function(a){var z
a.gbD()
z=a.b
a.gbD()
a.b=z+1
return a}},
m0:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"start_of_book"))return!1
if(b.ir(this.c))return!1
return!0},
R:[function(a,b,c){c.n(0,"You search pockets and nothing.  There are some noises. You should be going. But the you realize if Agruth had something valuable on him, he would have it well hidden. You quickly check the inside of his vest and find [Blablabla], a drug. It gives extra energy when needed. This will come handy. (Your stamina increases by 1.)")
N.qN(b,1)
return H.b(a.gh())+" successfully performs SearchAgruth"},"$3","gN",6,0,2],
T:[function(a,b,c){c.n(0,null)
c.n(0,"You search but can't find anything. There are some noises. You should be going.")
return H.b(a.gh())+" fails to perform SearchAgruth"},"$3","gP",6,0,2],
M:function(a,b){return 0.1},
gS:function(){return!0},
af:function(a,b){return"Will you be successful?"},
gO:function(){return C.d},
gV:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gW:function(){return!1}},
q0:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
q1:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pZ:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
q_:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pX:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a_(b.c,"$isbR").b>=1)c.G(0,"You hear orders being yelled somewhere behind you.",!0)
c.G(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
pY:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pU:{"^":"a:3;",
$3:function(a,b,c){c.G(0,'A blast of smoke and heat greets you as you enter this vast room. The roaring fire and the clanging of metal draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace. These are the war forges.\n\n\nYou and Briana take a moment to stare; likely no living human has seen this. Orc teams tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. They move as if in a trance, without a single complaint as they work. Strange. \n\n\nYou and Briana duck behind some carts. As you head towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark-robed figure\u2014a priest?\u2014chanting softly to himself by the forge. Despite his whispering, his words crawl through your mind like a spider:\n\n\n> "_Pwarfa n\u2019ngen aradra._ The slow suffer. _Madraga n\u2019ngen nach santutra._ Only the hard-working prosper. _Nfarfi Arach m\u2019marrash._ The Dead Prince sees all."\n\n\n',!0)
if(H.a_(b.c,"$isbR").b>=1)c.G(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.G(0,"\nYou find a corridor to the left. Next to it you spy a crevice apparently leading in the same direction.\n",!0)}},
pW:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pS:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
pT:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pQ:{"^":"a:3;",
$3:function(a,b,c){c.G(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
pR:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
pO:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.is("sneak_onto_cart"))c.G(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.G(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.G(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
pP:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
pM:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
pN:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
qv:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
pL:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The stone gate looms before you.\n",!0)}},
mb:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"mountain_pass_gate"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.eb(b,new V.mc())
b.al("RoomRoamingSituation").b3(b,N.aA(b),"mountain_pass",c)
return H.b(a.gh())+" successfully performs SneakOntoCart"},"$3","gN",6,0,2],
T:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
M:function(a,b){return 1},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gW:function(){return!1}},
mc:{"^":"a:0;",
$1:function(a){a.gbD()
a.a=!0
return a}},
nc:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"mountain_pass_gate"))return!1
if(b.jV(this.c)!=null)return!1
return!0},
R:[function(a,b,c){c.n(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a3(a.gj(),new V.nl())
return H.b(a.gh())+" successfully performs TakeOutGateGuards"},"$3","gN",6,0,2],
T:[function(a,b,c){c.n(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.n(b.f,V.nd())
return H.b(a.gh())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
M:function(a,b){return 0.5},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gW:function(){return!1}},
nl:{"^":"a:0;",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.a5()
a.sbh(z+10)
return a}},
fs:{"^":"a5;",
gbk:function(){return[new A.bC(new V.ng(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",null),new A.bC(new V.nh(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",null)]},
gh:function(){return"take_out_gate_guards"},
az:function(){var z=new V.dG(null,null,null)
z.p(this)
new V.ni().$1(z)
return z.q()},
av:function(a,b){if(a!==0)return
return b.a.aF(0,new V.nj())},
aE:function(a,b){return[a.aF(0,new V.nk())]}},
qq:{"^":"a:0;",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
ng:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aM(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a3(a.gj(),new V.ne())
b.a3(a.gj(),new V.nf())
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
ne:{"^":"a:0;",
$1:function(a){var z=a.gaW()
if(typeof z!=="number")return z.aM()
a.saW(z-1)
return a}},
nf:{"^":"a:0;",
$1:function(a){var z=a.gbh()
if(typeof z!=="number")return z.a5()
a.sbh(z+10)
return a}},
nh:{"^":"a:7;",
$4:function(a,b,c,d){J.aM(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.ej()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
ni:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a5()
a.ga2().c=z+1
return a}},
nj:{"^":"a:0;",
$1:function(a){return a.gK()}},
nk:{"^":"a:0;",
$1:function(a){return a.gK()}},
qt:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
qu:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
qr:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
qs:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
nm:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.al("RoomRoamingSituation").b3(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpent"},"$3","gN",6,0,2],
T:[function(a,b,c){c.n(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.n(b.f,V.no())
return H.b(a.gh())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
M:function(a,b){return 0.3},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gW:function(){return!1}},
fx:{"^":"a5;",
gbk:function(){return[new A.bC(new V.nq(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",null),new A.bC(new V.nr(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",null)]},
gh:function(){return"threaten_winged_serpent"},
az:function(){var z=new V.dH(null,null,null)
z.p(this)
new V.ns().$1(z)
return z.q()},
av:function(a,b){if(a!==0)return
return b.a.aF(0,new V.nt())},
aE:function(a,b){return[a.aF(0,new V.nu())]}},
qp:{"^":"a:0;",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
nq:{"^":"a:7;",
$4:function(a,b,c,d){J.aM(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.al("RoomRoamingSituation").b3(b,N.aA(b),"mountainside_base",c)
b.ej()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
nr:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aM(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.np())
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
np:{"^":"a:0;",
$1:function(a){a.sao(0)
return a}},
ns:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a5()
a.ga2().c=z+1
return a}},
nt:{"^":"a:0;",
$1:function(a){return a.gK()}},
nu:{"^":"a:0;",
$1:function(a){return a.gK()}},
md:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.al("RoomRoamingSituation").b3(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs SootheWingedSerpent"},"$3","gN",6,0,2],
T:[function(a,b,c){c.n(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.n(b.f,V.me())
return H.b(a.gh())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
M:function(a,b){return 0.8},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gW:function(){return!1}},
fd:{"^":"a5;",
gbk:function(){return[new A.bC(new V.mg(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",null),new A.bC(new V.mh(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",null)]},
gh:function(){return"soothe_winged_serpent"},
az:function(){var z=new V.dD(null,null,null)
z.p(this)
new V.mi().$1(z)
return z.q()},
av:function(a,b){if(a!==0)return
return b.a.aF(0,new V.mj())},
aE:function(a,b){return[a.aF(0,new V.mk())]}},
qo:{"^":"a:0;",
$1:function(a){var z=$.$get$a7().ab(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
mg:{"^":"a:7;",
$4:function(a,b,c,d){J.aM(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.al("RoomRoamingSituation").b3(b,N.aA(b),"mountainside_base",c)
b.ej()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
mh:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aM(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a3(a.gj(),new V.mf())
z=b.f
C.a.gE(z).b4(b)
C.a.bb(z)
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
mf:{"^":"a:0;",
$1:function(a){a.sao(0)
return a}},
mi:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a5()
a.ga2().c=z+1
return a}},
mj:{"^":"a:0;",
$1:function(a){return a.gK()}},
mk:{"^":"a:0;",
$1:function(a){return a.gK()}},
nn:{"^":"aF;X:b<,h:c<,a",
I:function(a,b){var z=b.f
if(!J.f(H.a_(z.length!==0?C.a.gE(z):null,"$isaf").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.al("RoomRoamingSituation").b3(b,N.aA(b),"mountainside_base",c)
return H.b(a.gh())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gN",6,0,2],
T:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
M:function(a,b){return 1},
gS:function(){return!1},
af:function(a,b){return"Will you be successful?"},
gO:function(){return},
gV:function(){return"Perhaps you can divert its attention."},
gW:function(){return!1}},
q5:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
qg:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
pK:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
pV:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
o1:{"^":"fs;j:a<,U:b<",
a7:function(a){var z=new V.dG(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fs))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dG:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gU:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.o1(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}},
o3:{"^":"fx;j:a<,U:b<",
a7:function(a){var z=new V.dH(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fx))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dH:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gU:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.o3(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}},
o_:{"^":"fd;j:a<,U:b<",
a7:function(a){var z=new V.dD(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
v:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fd))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gA:function(a){return Y.X(Y.k(Y.k(0,J.j(this.a)),J.j(this.b)))},
k:function(a){return"SootheWingedSerpentRescueSituation {id="+J.i(this.a)+",\ntime="+J.i(this.b)+",\n}"}},
dD:{"^":"d;a,b,c",
gj:function(){return this.ga2().b},
gU:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.o_(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,N,{"^":"",
aA:function(a){return a.git().aF(0,new N.qL())},
dY:function(){return R.bs(1000+$.$get$dZ().ab(99999),"orc",O.cZ(),null,new U.c3(!1,10,!0,$.$get$b3(),"sword",C.c),null,0,2,0,!1,2,!1,C.t,0,$.$get$cY())},
h4:function(){return R.bs(1000+$.$get$dZ().ab(99999),"goblin",O.cZ(),null,new U.c3(!1,10,!0,$.$get$b3(),"scimitar",C.c),null,0,1,0,!1,1,!1,C.t,0,$.$get$cY())},
t5:[function(a){return[N.dY(),N.h4()]},"$1","rp",2,0,22],
t8:[function(a){if(a.f6("take_out_gate_guards")||a.f6("take_out_gate_guards_rescue"))return[N.dY()]
else return[N.dY(),N.h4()]},"$1","rq",2,0,22],
qN:function(a,b){a.a3(N.aA(a).gj(),new N.qO(b))},
eb:function(a,b){var z,y
z=H.a_(a.c,"$isbR")
z.toString
y=new M.dK(null,!1,0)
y.p(z)
a.c=b.$1(y).q()},
qL:{"^":"a:0;",
$1:function(a){return a.gK()}},
qO:{"^":"a:0;a",
$1:function(a){var z=a.gaW()
if(typeof z!=="number")return z.a5()
a.saW(z+this.a)
return a}}}],["","",,O,{"^":"",
t4:[function(a){var z,y
z=$.$get$d2()
y=z.w
if(y.length>0){y+=" "
z.w=y}z.w=y+a},"$1","r6",2,0,12],
t6:[function(a){$.e6=a},"$1","r7",2,0,12],
hj:[function(a,b,c,d,e,f,g){var z=L.em(a,!1,!1,d,e,f,g)
$.$get$bM().n(0,z)
return z},function(a){return O.hj(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hj(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","r5",2,13,49,0,0,0,1,1,0],
lC:{"^":"lO;",
bg:function(){var z=0,y=P.at(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$bg=P.ap(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cM){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.D(m.C())
m=t.Q
n=Z.mw()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.C()
m.a.D(l.C())
new P.C(0,$.n,null,[null]).bi(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.D(m.C())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.c4(0)
m.a.D(n.C())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.D(m.C())
w=7
z=10
return P.ao(t.cc(),$async$bg)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.z(j)
if(n instanceof M.ck){r=n
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
case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$bg,y)},
el:function(){var z,y
this.eS()
this.f.aS(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fL(Z.bE())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.C())
this.bg()},
kg:[function(a){var z,y
z={}
z.a=null
y=$.$get$bM()
y.L(0,new O.lZ(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.i(y)+")"))
this.i5(z)
this.bg()},"$1","ghR",2,0,32],
i5:function(a){var z
if(a.gfk()!=null){z=a.r
$.$get$c9().ar(z)}z=a.x
if(z!=null)this.dV(z)},
cc:function(){var z=0,y=P.at(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$cc=P.ap(function(a,a0){if(a===1)return P.aw(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$ca()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.r(667,null,null,null,null)
q.c="Awarding points."
u.a.D(q.C())
p=r.b.d6()
r=v.Q
q=p.giF()
u=p.b
o=p.c
r.toString
n=new A.r(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.D(n.C())
r=new P.C(0,$.n,null,[null])
r.bi(null)
r.bL(new O.lP(v))
x=!0
z=1
break}m=v.x===v.e.gan().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gan().length){r=v.e.gan()
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
o.a.D(k.C())
k=$.$get$bM()
k.hO(new O.lQ(v),!1)
if(k.gl(k)!==0){r=v.Q
r.toString
o=new A.r(667,null,null,null,null)
o.c="We have choices."
r.a.D(o.C())
o=H.v(k,"aY",0)
o=P.U(new H.H(k,new O.lR(u,l),[o]),!0,o)
r=k.a
H.t([],[L.Z])
j=new L.en(r,o)
if(!j.gJ(j)){u=v.Q
r=u.e
if(r!=null){r.cZ(new D.bP("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.c4(new P.C(0,$.n,null,[r]),[r])
r=j.dd()
u.a.D(r.C())
u=u.e.a.bL(v.ghR())
i=new O.lS(v)
r=H.l(u,0)
q=$.n
if(q!==C.h){i=P.e_(i,q)
q.toString}u.cN(new P.dR(null,new P.C(0,q,null,[r]),6,new O.lT(),i,[r,r]))
x=!0
z=1
break}else{h=k.bo(0,new O.lU(),new O.lV())
if(h!=null){if(h.gfk()!=null){r=h.r
$.$get$c9().ar(r)}r=h.x
if(r!=null)v.dV(r)
k.ap(0,h)}}}r=$.$get$c9()
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
return P.ao(v.ce(f),$async$cc)
case 5:x=a0
z=1
break
case 4:r=$.e6
if(r!=null){v.dV(r)
$.e6=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gan().length-1
v.x=r}else if($.h7)$.h7=!1
else{++r
v.x=r}u.a=r===v.e.gan().length-1
r="Resolving block: '"+H.b(v.e.gh())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.r(667,null,null,null,null)
o.c=r
q.a.D(o.C())
if(v.x===v.e.gan().length){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="End of book."
u.a.D(r.C())
r=v.Q
u=v.dD()
r.toString
u=u.ep(50)
r.a.D(u.C())
v.Q.a.D(new A.r(80,null,null,null,null).C())
x=!0
z=1
break}r=v.e.gan()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gan()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.W
u.f=new P.c4(new P.C(0,$.n,null,[r]),[r])
r=new A.r(30,null,null,null,null)
r.c=q
u.a.D(r.C())
u.f.a.bL(new O.lW(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gan()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.o(r[q]).$isI?9:11
break
case 9:r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.D(q.C())
try{r=v.e.gan()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.iC(r[q])}catch(b){u=H.z(b)
if(u instanceof M.ck){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.r(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.D(q.C())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="- choices added"
r.a.D(q.C())
if(k.bW(0,new O.lX(u,v))&&v.x===v.e.gan().length-1){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.D(r.C())
r=v.Q
u=v.dD()
r.toString
u=u.ep(50)
r.a.D(u.C())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gan()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.L,P.ak]}
z=H.aq(q,r)?12:14
break
case 12:d=v.x===v.e.gan().length-1?v.dD():null
q=v.e.gan()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.ao(v.ce(H.ho(q[o],r)),$async$cc)
case 15:c=a0
if(k.bW(0,new O.lY(u,v))&&v.x===v.e.gan().length-1){u=v.Q
u.toString
r=d.ep(50)
u.a.D(r.C())}x=c
z=1
break
z=13
break
case 14:u=v.e.gan()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.F("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.ax(x,y)}})
return P.ay($async$cc,y)},
dV:function(a){var z,y,x,w,v
z=$.$get$co()
if(z.b.test(H.bm(a))){y=this.d
if(y==null)throw H.c(new P.F("Cannot use ["+J.i(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aM()
w=z-1}else{x=this.b.dj(a,this.e.gdl())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.n(0,H.b(z.gh())+">>"+H.b(y.gh()))
this.r=!0}if(this.f.Z(0,H.b(this.e.gh())+">>"+H.b(x.gh()))||x.gfW()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfW()
else z=!1}else z=!1
$.h5=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.D(v.C())
v=this.e
this.d=new O.lD(v,this.x)
this.e=x
this.x=w
v.e=J.a0(v.gde(),1)},
eS:function(){var z,y,x,w,v,u
this.x=null
$.$get$c9().aS(0)
$.$get$bM().sl(0,0)
$.pp=null
x=$.$get$cd()
x.aS(0)
w=$.$get$ca()
x.m(0,"points",w)
w.a=0
w.b.aS(0)
this.b.iH()
$.hx=!0
try{this.jh()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.D(u.C())
throw H.c(z)}this.fK()
$.hx=!1},
ce:function(a){var z=0,y=P.at(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$ce=P.ap(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d2()
q.w=""
w=4
z=7
return P.ao(a.$0(),$async$ce)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.w+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.i(s)
o=t.e.gh()
n=t.x
throw H.c(new M.ck(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.w.length!==0){t.Q.ew(J.i(q)).bL(new O.m_(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.ax(x,y)
case 2:return P.aw(v,y)}})
return P.ay($async$ce,y)},
hY:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$co().b.test(H.bm(z)))return!1
y=this.b.dj(z,this.e.gdl())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.D(w.C())
return!0}y.gk7()
return!1},"$1","geW",2,0,42],
dD:function(){var z,y,x,w,v,u
this.fK()
try{x=this.e.gh()
w=$.$get$cd()
x=new Z.f3(x,this.b.j1(),null,null,null,null)
x.c=H.aB(Z.cI(w),"$isD",[P.q,P.d],"$asD")
x.f=Date.now()
x.e=C.e.k0(H.au(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.D(u.C())
throw H.c(z)}},
fw:function(a,b){var z,y,x
this.eS()
z=this.b
y=z.a
if(y.i(0,a.a)==null)throw H.c(new Z.dd("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.i(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.D(x.C())
z.je(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Importing player chronology."
z.a.D(y.C())
this.f.am(0,b)}z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.D(y.C())
y=$.$get$cd()
Z.lz(a,y,P.dj(P.q,P.bw))
this.cx=H.a_(y.i(0,"game"),"$iseu")
this.cy=H.aB(y.i(0,"hitpoints"),"$isal",[P.aL],"$asal")
z=[P.u]
this.db=H.aB(y.i(0,"stamina"),"$isal",z,"$asal")
this.dx=H.aB(y.i(0,"gold"),"$isal",z,"$asal")
z=this.Q
Z.fL(Z.bE())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bE()
z.a.D(y.C())
y=this.Q
y.toString
z=new A.r(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.D(z.C())
this.bg()},
jx:function(a){return this.fw(a,null)},
dq:[function(a,b,c,d){var z=0,y=P.at(),x,w=this,v,u,t
var $async$dq=P.ap(function(e,f){if(e===1)return P.aw(f,y)
while(true)switch(z){case 0:v=$.$get$d2()
if(v.w.length!==0){w.Q.ew(J.i(v))
v.w=""}v=w.Q
v.toString
u=new A.r(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.D(u.C())
u=U.c1
t=new P.C(0,$.n,null,[u])
v.x=new P.c4(t,[u])
x=t
z=1
break
case 1:return P.ax(x,y)}})
return P.ay($async$dq,y)},function(a,b){return this.dq(a,b,null,!1)},"kc","$4$rerollEffectDescription$rerollable","$2","ghf",4,5,34,1,0]},
lZ:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sex(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.D(x.C())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$co().b.test(H.bm(z))?y.d.a:y.b.dj(z,y.e.gdl())
if(w!=null){y.f.n(0,H.b(y.e.gh())+">>"+H.b(w.gh()))
y.r=!0}}}}},
lP:{"^":"a:0;a",
$1:function(a){return this.a.bg()}},
lQ:{"^":"a:0;a",
$1:function(a){return a.gex()||this.a.hY(a)}},
lR:{"^":"a:35;a,b",
$1:function(a){return a.jo(this.b,this.a.a)}},
lS:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.D(x.C())
return}},
lT:{"^":"a:0;",
$1:function(a){return a instanceof D.bP}},
lU:{"^":"a:0;",
$1:function(a){return a.gjp()}},
lV:{"^":"a:1;",
$0:function(){return}},
lW:{"^":"a:0;a",
$1:function(a){return this.a.bg()}},
lX:{"^":"a:0;a,b",
$1:function(a){return a.d1(!0,this.a.a,this.b.geW())}},
lY:{"^":"a:0;a,b",
$1:function(a){return a.d1(!0,this.a.a,this.b.geW())}},
m_:{"^":"a:0;a",
$1:function(a){return this.a.bg()}},
l0:{"^":"d;a,b,ff:c<",
iv:function(a,b,c){var z
if(!$.h5){z=J.a0(this.a,b)
this.a=z
this.b.ar(new A.cB(b,z,c))}},
n:function(a,b){return this.iv(a,b,null)},
a5:function(a,b){this.n(0,b)
return this},
C:function(){return P.ac(["points",this.a])},
fV:function(a){this.a=a.i(0,"points")
this.b.aS(0)},
ho:function(){this.b=P.aZ(null,A.cB)},
$isdA:1},
cJ:{"^":"kK;an:d<,de:e@,a,b,c",
gfW:function(){return J.a1(this.e,0)}},
lD:{"^":"d;a,b"},
lK:{"^":"d;a",
i:function(a,b){return this.a.i(0,b)},
dj:function(a,b){var z
if(b!=null&&this.a.a_(b+": "+H.b(a)))return this.a.i(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a_(a))return z.i(0,a)
else return}},
m:function(a,b,c){this.a.m(0,b,c)
c.sh(b)},
j1:function(){var z=new H.M(0,null,null,null,null,null,0,[P.q,null])
this.a.L(0,new O.lM(z))
return z},
je:function(a){a.L(0,new O.lN(this))},
iH:function(){this.a.L(0,new O.lL())}},
lM:{"^":"a:6;a",
$2:function(a,b){this.a.m(0,a,P.ac(["visitCount",b.gde()]))}},
lN:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.a_(a))z.i(0,a).sde(J.as(b,"visitCount"))}},
lL:{"^":"a:6;",
$2:function(a,b){b.sde(0)}}}],["","",,M,{"^":"",ck:{"^":"d;a,b,c",
k:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
t:{
eh:function(a){return new M.ck(a,null,null)}}}}],["","",,M,{"^":"",lO:{"^":"d;"}}],["","",,Z,{"^":"",f3:{"^":"d;a,b,c,d,e,f",
ep:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.r(a,null,null,null,null)
z.c=this.dc()
return z},
dc:function(){var z,y
z=new H.M(0,null,null,null,null,null,0,[P.q,null])
z.m(0,"uid",this.e)
z.m(0,"currentPageName",this.a)
z.m(0,"pageMapState",this.b)
z.m(0,"vars",this.c)
z.m(0,"timestamp",this.f)
y=this.d
if(y!=null)z.m(0,"previousText",y)
return C.v.fj(z)},
k:function(a){return this.dc()},
t:{
f4:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isI||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdA},
cI:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)if(Z.f4(z.i(a,x)))y.push(Z.cI(z.i(a,x)))
return y}else if(!!z.$isD){w=new H.M(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.ly(a,w))
return w}else if(!!z.$isdA){v=a.C()
v.m(0,"_class",a.gff())
return Z.cI(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cH:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isI){y=[]
for(x=0;x<z.gl(a);++x)y.push(Z.cH(z.i(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.a_("_class")){v=new H.M(0,null,null,null,null,null,0,[null,null])
z.L(a,new Z.lx(b,v))
return v}else if(w&&a.a_("_class"))if(c!=null){c.fV(a)
return c}else{u=z.i(a,"_class")
if(!b.a_(u))throw H.c(new Z.dd("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.i(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
lz:function(a,b,c){a.c.L(0,new Z.lA(b,c))}}},ly:{"^":"a:6;a,b",
$2:function(a,b){if(Z.f4(this.a.i(0,a)))this.b.m(0,a,Z.cI(b))}},lx:{"^":"a:6;a,b",
$2:function(a,b){this.b.m(0,a,Z.cH(b,this.a,null))}},lA:{"^":"a:36;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.i(0,a)
x=this.b
if(y==null)z.m(0,a,Z.cH(b,x,null))
else z.m(0,a,Z.cH(b,x,y))}},dd:{"^":"d;a",
k:function(a){return"IncompatibleSavegameException: "+this.a}},jZ:{"^":"d;a",
k:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",l5:{"^":"d;"},l4:{"^":"l5;"},k6:{"^":"l4;a,b,c,d,e,f,r,x",
kk:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.q
n=[o,P.d]
H.aB(a,"$isD",n,"$asD")
m=new A.r(a.i(0,"type"),null,null,null,null)
if(a.a_("strContent"))m.c=a.i(0,"strContent")
if(a.a_("listContent"))m.b=a.i(0,"listContent")
if(a.a_("intContent"))m.d=a.i(0,"intContent")
if(a.a_("mapContent"))m.e=H.aB(a.i(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.gbM()){case 1070:o=this.e
if(o!=null){o.cZ(new D.bP("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.b7()
o.b.b7()
return
case 1000:o=new A.r(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.D(o.C())
n.D(new A.r(10,null,this.c.ch,null,null).C())
return
case 1050:l=z.gji()
this.e.bH(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.D(o.C())
o=z.gjz()
if(!o.a_("__submitted__"))o.m(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.c7())
n.bE(new G.j3(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.D(o.C())
k=J.as(z.geg(),0)
j=J.as(z.geg(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.bH(new U.c1(C.y[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.D(o.C())
o=this.e
if(o!=null){o.cZ(new D.bP("Book Restart before choice was selected."))
this.e=null}try{this.c.el()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.D(o.C())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bE()
n.D(o.C())
n.D(new A.cB(0,0,null).dd().C())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.D(h.C())
h=this.e
if(h!=null){h.cZ(new D.bP("Book Load before choice was selected."))
this.e=null}try{h=z.ghj()
f=new Z.f3(null,null,null,null,null,null)
e=H.aB(C.v.iO(h),"$isD",n,"$asD")
if(!e.a_("currentPageName")||!e.a_("vars"))H.h(new Z.jZ("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.i(0,"uid")
f.a=e.i(0,"currentPageName")
f.f=e.i(0,"timestamp")
f.b=H.aB(e.i(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.aB(e.i(0,"vars"),"$isD",n,"$asD")
if(e.a_("previousText"))f.d=e.i(0,"previousText")
w=f
v=H.aB(J.i2(z.geg()),"$isbB",[o],"$asbB")
o=this.c
if(v!=null)o.fw(w,v)
else o.jx(w)}catch(i){o=H.z(i)
if(o instanceof Z.dd){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.D(o.C())
this.c.el()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.D(o.C())
this.c.el()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bE()
g.D(o.C())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.D(o.C())
throw H.c(q)}this.c.toString
g.D(new A.cB(0,$.$get$ca().a,null).dd().C())
return
case 1090:this.f.bH(!0)
this.f=null
return
case 1040:this.c.bg()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gbM())+"."
this.a.D(o.C())}},"$1","gi3",2,0,18],
ew:function(a){var z=P.W
this.f=new P.c4(new P.C(0,$.n,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.D(z.C())
return this.f.a}},bP:{"^":"d;a",
k:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",j3:{"^":"d;a",
C:function(){return P.bX(this.a,null,null)},
k:function(a){return"<CurrentState submitted="+H.b(this.a.i(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;bM:a<,eg:b<,hj:c<,ji:d<,jz:e<",
gk6:function(){var z=this.a
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
dc:function(){return C.v.fj(this.C())},
C:function(){var z,y
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
z="Message "+this.gk6()
y=this.a
x=J.o(y)
return z+(x.v(y,50)||x.v(y,60)||x.v(y,90)||x.v(y,100)||x.v(y,666)||x.v(y,667)?" (async)":"")}}}],["","",,E,{"^":"",kK:{"^":"d;h:a@,k7:b<",
k:function(a){return this.a},
gdl:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.hX(z,": ")
if(y>0)return J.i1(this.a,0,y)
else return}}}],["","",,A,{"^":"",cB:{"^":"d;iF:a<,b,c",
k:function(a){var z="Score +"+H.b(this.a)+"."
return z},
dd:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",Z:{"^":"d;ex:a@,b,c,d,aL:e<,V:f<,fk:r<,x,y",
gjp:function(){return this.e.length===0},
d1:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jo:function(a,b){return this.d1(a,b,null)},
jZ:function(){return P.ac(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bL:function(a){this.r=a
return this},
bm:function(a,b){return C.b.bm(this.e,b.gaL())},
k:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hm:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bn(a).fT(a)
this.d=C.b.gA(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.Z]},
t:{
em:function(a,b,c,d,e,f,g){var z=new L.Z(!1,null,null,null,null,e,null,d,g)
z.hm(a,!1,!1,d,e,f,g)
return z}}},en:{"^":"eM;a,b",
gl:function(a){return this.b.length},
sl:function(a,b){C.a.sl(this.b,b)
return b},
i:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
iC:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.as(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.o(a[0]).$isbw}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.eh(J.i(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.L,P.ak]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.as(y,"string")!=null&&!!J.o(J.as(y,"string")).$isbw)try{x=J.as(y,"string").$0()}catch(u){w=H.z(u)
v=M.eh(J.i(w))
throw H.c(v)}else x=""
r=x
q=J.as(y,"goto")
p=H.ho(J.as(y,"script"),t)
o=new L.Z(!1,null,null,null,null,null,null,q,J.as(y,"submenu"))
if(r==null)H.h(P.E("String given to choice cannot be null."))
o.e=J.bn(r).fT(r)
o.d=C.b.gA(r)
o.r=p
o.b=!1
o.c=!1
C.a.n(v,o)}},
iA:function(a,b,c,d,e,f,g){if(b instanceof L.Z)C.a.n(this.b,b)
else if(typeof b==="string")C.a.n(this.b,L.em(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
n:function(a,b){return this.iA(a,b,!1,!1,null,null,null)},
k_:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.l(z,0)
x=P.U(new H.H(z,new L.iJ(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.r(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.L(x,new L.iK(w))
return w},
dd:function(){return this.k_(null,null,null,null)},
k:function(a){var z=this.b
return new H.aj(z,new L.iL(),[H.l(z,0),null]).ct(0,", ")},
$aseM:function(){return[L.Z]},
$aseR:function(){return[L.Z]},
$asI:function(){return[L.Z]},
$asS:function(){return[L.Z]}},iJ:{"^":"a:0;a,b,c",
$1:function(a){return a.d1(this.b,this.a,this.c)}},iK:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aM(this.a.b,a.jZ())
a.a=!0}},iL:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cK:{"^":"d;cL:a<,aL:b<",
C:function(){return P.ac(["show",this.a,"string",this.b])}},mt:{"^":"d;a",
C:function(){var z=new H.M(0,null,null,null,null,null,0,[P.q,P.d])
this.a.L(0,new Z.mu(z))
return z},
L:function(a,b){this.a.L(0,b)}},mu:{"^":"a:37;a",
$2:function(a,b){this.a.m(0,a,b.C())}},fK:{"^":"d;h:a@,b_:b<,fg:c<,d5:d<,cL:e<,fE:f<,aL:r<",t:{
fL:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t(new Array(a.length),[Z.fK])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ar)(a),++v){u=a[v]
t=J.J(u)
s=t.i(u,"name")
r=t.i(u,"description")
q=t.i(u,"color")
p=t.i(u,"priority")
o=t.i(u,"show")
n=t.i(u,"notifyOnChange")
t=t.i(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fK(s,r,q,p,o,n,t);++w}C.a.cM(z,new Z.nB())
return z}}},nB:{"^":"a:6;",
$2:function(a,b){return J.aC(b.gd5(),a.gd5())}},al:{"^":"d;h:a<,b_:b<,c,fg:d<,d5:e<,f,r,fE:x<,fd:y@,ff:z<,$ti",
gaq:function(){return this.f},
saq:function(a){if(!J.f(this.f,a)){this.f=a
this.y=!0
$.cM=!0}},
gcL:function(){return this.r},
gaL:function(){return this.c.$1(this.f)},
C:function(){return P.ac(["name",this.a,"value",this.f,"show",this.r])},
fV:function(a){var z
this.saq(H.hJ(a.i(0,"value"),H.l(this,0)))
z=a.i(0,"show")
if(!J.f(this.r,z)){this.r=z
this.y=!0
$.cM=!0}},
$isdA:1,
t:{
bD:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cL()
y=z.a_(a)?H.aB(z.i(0,a),"$isal",[h],"$asal"):new Z.al(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.hJ(e,h)
y.r=!0
z.m(0,a,y)
return y},
mw:function(){var z,y
z=new Z.mt(new H.M(0,null,null,null,null,null,0,[P.q,Z.cK]))
y=$.$get$cL().gc5()
new H.H(y,new Z.mx(),[H.v(y,"x",0)]).L(0,new Z.my(z))
$.cM=!1
return z},
bE:function(){var z=H.t([],[[P.D,P.q,P.d]])
$.$get$cL().gc5().L(0,new Z.mv(z))
return z}}},mx:{"^":"a:0;",
$1:function(a){return a.gfd()}},my:{"^":"a:21;a",
$1:function(a){var z,y
z=a.gcL()
y=a.gaL()
a.sfd(!1)
this.a.a.m(0,a.a,new Z.cK(z,y))}},mv:{"^":"a:21;a",
$1:function(a){var z=new H.M(0,null,null,null,null,null,0,[P.q,P.d])
z.m(0,"name",a.gh())
z.m(0,"description",a.gb_())
z.m(0,"color",a.gfg())
z.m(0,"priority",a.gd5())
z.m(0,"show",a.gcL())
z.m(0,"notifyOnChange",a.gfE())
z.m(0,"string",a.gaL())
this.a.push(z)}}}],["","",,N,{"^":"",dl:{"^":"d;h:a<,b,c,hF:d<,e,f",
gfo:function(){var z,y,x
z=this.b
y=z==null||J.f(z.gh(),"")
x=this.a
return y?x:z.gfo()+"."+x},
gef:function(){if($.hv){var z=this.b
if(z!=null)return z.gef()}return $.pw},
jy:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.gef().b){if(!!J.o(b).$isbw)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.i(b)}else v=null
if(d==null&&x>=$.r3.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.n
x=b
w=this.gfo()
t=c
s=d
r=Date.now()
q=$.eN
$.eN=q+1
p=new N.ko(a,x,v,w,new P.cq(r,!1),q,t,s,e)
if($.hv)for(o=this;o!=null;){o.eZ(p)
o=o.b}else $.$get$eP().eZ(p)}},
bZ:function(a,b,c,d){return this.jy(a,b,c,d,null)},
j4:function(a,b,c){return this.bZ(C.Q,a,b,c)},
a6:function(a){return this.j4(a,null,null)},
j3:function(a,b,c){return this.bZ(C.P,a,b,c)},
b0:function(a){return this.j3(a,null,null)},
j2:function(a,b,c){return this.bZ(C.R,a,b,c)},
bz:function(a){return this.j2(a,null,null)},
jg:function(a,b,c){return this.bZ(C.x,a,b,c)},
fv:function(a){return this.jg(a,null,null)},
k8:function(a,b,c){return this.bZ(C.U,a,b,c)},
eq:function(a){return this.k8(a,null,null)},
he:function(a,b,c){return this.bZ(C.T,a,b,c)},
dm:function(a){return this.he(a,null,null)},
eZ:function(a){},
t:{
b6:function(a){return $.$get$eO().jL(a,new N.qa(a))}}},qa:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.ds(z,"."))H.h(P.E("name shouldn't start with a '.'"))
y=C.b.jv(z,".")
if(y===-1)x=z!==""?N.b6(""):null
else{x=N.b6(C.b.aH(z,0,y))
z=C.b.bu(z,y+1)}w=new H.M(0,null,null,null,null,null,0,[P.q,N.dl])
w=new N.dl(z,x,null,w,new P.fN(w,[null,null]),null)
if(x!=null)x.ghF().m(0,z,w)
return w}},aP:{"^":"d;h:a<,aq:b<",
v:function(a,b){if(b==null)return!1
return b instanceof N.aP&&this.b===b.b},
aJ:function(a,b){return C.e.aJ(this.b,b.gaq())},
bP:function(a,b){return C.e.bP(this.b,b.gaq())},
bC:function(a,b){var z=b.gaq()
if(typeof z!=="number")return H.y(z)
return this.b>z},
bA:function(a,b){return this.b>=b.gaq()},
bm:function(a,b){var z=b.gaq()
if(typeof z!=="number")return H.y(z)
return this.b-z},
gA:function(a){return this.b},
k:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aP]}},ko:{"^":"d;ef:a<,b,aA:c<,d,U:e<,f,b8:r<,b6:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bo:function(a){return X.cU(J.hU(a,0,new X.qP()))},
aT:function(a,b){var z=J.a0(a,b)
if(typeof z!=="number")return H.y(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cU:function(a){if(typeof a!=="number")return H.y(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
qP:{"^":"a:6;",
$2:function(a,b){return X.aT(a,J.j(b))}}}],["","",,U,{"^":"",cG:{"^":"d;a,b",
k:function(a){return this.b}},c1:{"^":"d;a,k9:b<",
ged:function(){return this.a===C.A},
k:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
v:function(a,b){if(b==null)return!1
return b instanceof U.c1&&b.a===this.a&&J.f(b.b,this.b)},
gA:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
t7:[function(a,b){var z,y,x,w,v
z=new D.k6(b,null,null,null,null,null,null,null)
y=$.f0
$.f0=y+1
x=new H.c_(y,null,!1)
w=init.globalState.d
w.dv(y,x)
w.cl()
w=new H.lj(x,null)
w.hp(x)
z.b=w
w=w.b
w.toString
new P.cO(w,[H.l(w,0)]).au(z.gi3(),null,null,null)
b.D(new H.c7(z.b.a,init.globalState.d.a))
v=N.lF()
z.c=v
v.Q=z},"$2","hk",4,0,33]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eF.prototype
return J.k8.prototype}if(typeof a=="string")return J.bW.prototype
if(a==null)return J.eG.prototype
if(typeof a=="boolean")return J.eE.prototype
if(a.constructor==Array)return J.bU.prototype
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.aU=function(a){if(a==null)return a
if(a.constructor==Array)return J.bU.prototype
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.J=function(a){if(typeof a=="string")return J.bW.prototype
if(a==null)return a
if(a.constructor==Array)return J.bU.prototype
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.ah=function(a){if(typeof a=="number")return J.bV.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.e5=function(a){if(typeof a=="number")return J.bV.prototype
if(typeof a=="string")return J.bW.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.bn=function(a){if(typeof a=="string")return J.bW.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bg.prototype
return a}
J.a0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.e5(a).a5(a,b)}
J.bp=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.ah(a).cH(a,b)}
J.f=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).v(a,b)}
J.a1=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ah(a).bC(a,b)}
J.ce=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ah(a).aJ(a,b)}
J.bq=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.e5(a).bQ(a,b)}
J.hS=function(a){if(typeof a=="number")return-a
return J.ah(a).eu(a)}
J.aC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.ah(a).aM(a,b)}
J.as=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).i(a,b)}
J.aM=function(a,b){return J.aU(a).n(a,b)}
J.cf=function(a,b){return J.e5(a).bm(a,b)}
J.hT=function(a,b){return J.J(a).Z(a,b)}
J.ec=function(a,b){return J.aU(a).ah(a,b)}
J.hU=function(a,b,c){return J.aU(a).b1(a,b,c)}
J.j=function(a){return J.o(a).gA(a)}
J.ed=function(a){return J.J(a).gJ(a)}
J.ai=function(a){return J.aU(a).gY(a)}
J.hV=function(a){return J.aU(a).gE(a)}
J.aD=function(a){return J.J(a).gl(a)}
J.hW=function(a){return J.o(a).gbe(a)}
J.hX=function(a,b){return J.J(a).bp(a,b)}
J.ee=function(a,b){return J.aU(a).aT(a,b)}
J.hY=function(a,b,c){return J.bn(a).fz(a,b,c)}
J.hZ=function(a,b,c){return J.bn(a).jP(a,b,c)}
J.i_=function(a){return J.ah(a).em(a)}
J.i0=function(a,b){return J.aU(a).dr(a,b)}
J.d3=function(a,b){return J.bn(a).ds(a,b)}
J.i1=function(a,b,c){return J.bn(a).aH(a,b,c)}
J.i2=function(a){return J.aU(a).bs(a)}
J.i=function(a){return J.o(a).k(a)}
J.br=function(a,b){return J.ah(a).cC(a,b)}
J.i3=function(a,b){return J.aU(a).bO(a,b)}
I.d0=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.G=J.aN.prototype
C.a=J.bU.prototype
C.K=J.eE.prototype
C.e=J.eF.prototype
C.r=J.eG.prototype
C.i=J.bV.prototype
C.b=J.bW.prototype
C.B=new A.aa(0,0,0)
C.C=new A.aa(-1/0,-1/0,-1/0)
C.D=new A.ch(-10,0,100)
C.E=new P.kJ()
C.u=new P.op()
C.F=new P.oI()
C.h=new P.oX()
C.w=new P.aW(0)
C.H=new U.cv(0,"ItemType.spear")
C.I=new U.cv(1,"ItemType.branch")
C.J=new U.cv(2,"ItemType.tent")
C.c=new U.cv(3,"ItemType.sword")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.kc(null,null)
C.M=new P.ke(null)
C.N=new P.kf(null,null)
C.O=new O.kg(0,"KnownToMode.all")
C.P=new N.aP("FINER",400)
C.Q=new N.aP("FINEST",300)
C.R=new N.aP("FINE",500)
C.x=new N.aP("INFO",800)
C.S=new N.aP("OFF",2000)
C.T=new N.aP("SEVERE",1000)
C.U=new N.aP("WARNING",900)
C.A=new U.cG(0,"Result.success")
C.Y=new U.cG(1,"Result.failure")
C.Z=new U.cG(2,"Result.criticalSuccess")
C.a_=new U.cG(3,"Result.criticalFailure")
C.y=I.d0([C.A,C.Y,C.Z,C.a_])
C.f=I.d0([])
C.V=new H.iU(0,{},C.f,[null,null])
C.k=new R.dv(0,"Pose.standing")
C.j=new R.dv(1,"Pose.offBalance")
C.l=new R.dv(2,"Pose.onGround")
C.q=new K.dw(0,"Predetermination.none")
C.o=new K.dw(1,"Predetermination.successGuaranteed")
C.m=new K.dw(2,"Predetermination.failureGuaranteed")
C.t=new Y.bY("he","him","his","himself")
C.p=new Y.bY("it","it","its","itself")
C.W=new Y.bY("she","her","her","herself")
C.X=new Y.bY("they","them","their","themselves")
C.z=new Y.bY("you","you","your","yourself")
C.d=new Q.lo(0,"Resource.stamina")
C.a0=H.b1("eH")
C.a1=H.b1("ak")
C.a2=H.b1("q")
C.a3=H.b1("W")
C.a4=H.b1("aL")
C.n=H.b1("dynamic")
C.a5=H.b1("u")
C.a6=H.b1("K")
C.a7=new P.bG(null,2)
$.f0=1
$.eX="$cachedFunction"
$.eY="$cachedInvocation"
$.aE=0
$.bt=null
$.ei=null
$.bj=null
$.bJ=null
$.bK=null
$.dW=!1
$.n=C.h
$.ew=0
$.e6=null
$.h5=!1
$.pp=null
$.h7=!1
$.hx=!0
$.cM=!1
$.hv=!1
$.r3=C.S
$.pw=C.x
$.eN=0
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
I.$lazy(y,x,w)}})(["eB","$get$eB",function(){return H.k4()},"eC","$get$eC",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ew
$.ew=z+1
z="expando$key$"+z}return new P.jB(null,z,[P.u])},"fz","$get$fz",function(){return H.aG(H.cN({
toString:function(){return"$receiver$"}}))},"fA","$get$fA",function(){return H.aG(H.cN({$method$:null,
toString:function(){return"$receiver$"}}))},"fB","$get$fB",function(){return H.aG(H.cN(null))},"fC","$get$fC",function(){return H.aG(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fG","$get$fG",function(){return H.aG(H.cN(void 0))},"fH","$get$fH",function(){return H.aG(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fE","$get$fE",function(){return H.aG(H.fF(null))},"fD","$get$fD",function(){return H.aG(function(){try{null.$method$}catch(z){return z.message}}())},"fJ","$get$fJ",function(){return H.aG(H.fF(void 0))},"fI","$get$fI",function(){return H.aG(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dM","$get$dM",function(){return P.o7()},"b5","$get$b5",function(){var z,y
z=P.ak
y=new P.C(0,P.nN(),null,[z])
y.hw(null,z)
return y},"bL","$get$bL",function(){return[]},"bz","$get$bz",function(){return N.b6("PlannerRecommendation")},"hm","$get$hm",function(){return new K.pJ()},"e3","$get$e3",function(){var z=$.$get$hm()
return K.a3("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a7","$get$a7",function(){return P.cD(null)},"b9","$get$b9",function(){return P.cD(null)},"hy","$get$hy",function(){return N.b6("Storyline")},"fn","$get$fn",function(){return P.bb("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cY","$get$cY",function(){return L.dL(new L.q8())},"b3","$get$b3",function(){return L.dL(new L.q9())},"hF","$get$hF",function(){return L.dL(new L.q7())},"dt","$get$dt",function(){return new F.kO("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"e1","$get$e1",function(){return Y.da(!1,"balance",!0,C.p,$.$get$b3())},"hG","$get$hG",function(){return Y.da(!1,"pounding",!1,C.p,$.$get$b3())},"f1","$get$f1",function(){return new B.lm("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"f5","$get$f5",function(){return new O.lB(null,!1,!1,null,null)},"fi","$get$fi",function(){return new Q.ml(null,!1,!0,C.d,null)},"fM","$get$fM",function(){return new M.nC("",!0,C.d,!1,null)},"h6","$get$h6",function(){return P.cD(null)},"hK","$get$hK",function(){return Y.da(!1,"swing",!0,C.p,$.$get$b3())},"fb","$get$fb",function(){return new D.m9(!1,!1,null,null)},"hH","$get$hH",function(){return K.a3("start_of_book",new V.q2(),new V.q3(),null,null,H.t([],[Q.w]),"ground")},"ey","$get$ey",function(){return new V.jT("Flee through the Underground Church","flee_through_necromancers_church",null)},"ez","$get$ez",function(){return new V.jV("Flee through the War Forges","flee_through_war_forge",null)},"f6","$get$f6",function(){return new V.m0("Search Agruth","search_agruth",null)},"hL","$get$hL",function(){return K.a3("the_shafts",new V.q0(),new V.q1(),null,null,H.t([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"hN","$get$hN",function(){return K.a3("tunnel",new V.pZ(),new V.q_(),N.rp(),null,H.t([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"hO","$get$hO",function(){return K.a3("underground_church",new V.pX(),new V.pY(),null,null,H.t([new Q.w("the_shafts","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"hP","$get$hP",function(){return K.a3("war_forge",new V.pU(),new V.pW(),null,null,H.t([new Q.w("the_shafts","Enter the corridor","You enter the corridor.",null),new Q.w("war_forge_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"hQ","$get$hQ",function(){return K.a3("war_forge_crevice",new V.pS(),new V.pT(),null,null,H.t([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hn","$get$hn",function(){return K.a3("entrance_to_bloodrock",new V.pQ(),new V.pR(),null,null,H.t([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"hz","$get$hz",function(){return K.a3("mountain_pass",new V.pO(),new V.pP(),null,null,H.t([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"hA","$get$hA",function(){return K.a3("mountain_pass_gate",new V.pM(),new V.pN(),null,null,H.t([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"hB","$get$hB",function(){return K.a3("mountain_pass_guard_post",new V.qv(),new V.pL(),N.rq(),null,H.t([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"fc","$get$fc",function(){return new V.mb("Sneak onto the back of the cart","sneak_onto_cart",null)},"ft","$get$ft",function(){return new V.nc("Stealthily take out some of the gate guards","take_out_gate_guards",null)},"hC","$get$hC",function(){return K.a3("mountainside_base",new V.qt(),new V.qu(),null,null,H.t([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"hD","$get$hD",function(){return K.a3("mountainside_path",new V.qr(),new V.qs(),null,null,H.t([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"fy","$get$fy",function(){return new V.nm("Scare off the serpent","threaten_winged_serpent",null)},"fe","$get$fe",function(){return new V.md("Soothe the serpent","soothe_winged_serpent",null)},"fw","$get$fw",function(){return new V.nn("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",null)},"hR","$get$hR",function(){return K.a3("winged_serpent_nest",new V.q5(),new V.qg(),null,null,H.t([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"hw","$get$hw",function(){return K.a3("ironcast_road",new V.pK(),new V.pV(),null,null,H.t([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"he","$get$he",function(){return H.t([$.$get$hH(),$.$get$hL(),$.$get$hN(),$.$get$hO(),$.$get$hP(),$.$get$hQ(),$.$get$hn(),$.$get$hz(),$.$get$hA(),$.$get$hB(),$.$get$hC(),$.$get$hD(),$.$get$hR(),$.$get$hw()],[K.c0])},"hd","$get$hd",function(){return H.t([$.$get$ey(),$.$get$ez(),$.$get$f6(),$.$get$fc(),$.$get$ft(),$.$get$fy(),$.$get$fe(),$.$get$fw()],[A.aF])},"dZ","$get$dZ",function(){return P.cD(null)},"d2","$get$d2",function(){return P.n0("")},"ca","$get$ca",function(){var z=new O.l0(0,null,"PointsCounter")
z.ho()
return z},"bM","$get$bM",function(){return new L.en(null,H.t([],[L.Z]))},"cd","$get$cd",function(){return H.eL(P.q,P.d)},"c9","$get$c9",function(){return P.aZ(null,{func:1,ret:[P.L,P.ak]})},"co","$get$co",function(){return P.bb("^\\s*<<<\\s*$",!0,!1)},"cL","$get$cL",function(){return H.eL(P.q,Z.al)},"eP","$get$eP",function(){return N.b6("")},"eO","$get$eO",function(){return P.dj(P.q,N.dl)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.q,args:[R.P,A.av,Y.ag]},{func:1,args:[R.P,A.av,Y.ag]},{func:1,v:true},{func:1,ret:Q.G,args:[R.P]},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,ret:P.q,args:[P.u]},{func:1,args:[,,,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.q]},{func:1,args:[,P.aS]},{func:1,v:true,args:[P.d],opt:[P.aS]},{func:1,ret:P.K,args:[A.aa]},{func:1,args:[P.aL]},{func:1,ret:P.L},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bv,args:[P.u]},{func:1,args:[R.P]},{func:1,args:[Z.al]},{func:1,ret:[P.x,R.P],args:[A.av]},{func:1,ret:P.q,args:[Q.a9]},{func:1,args:[Y.a2]},{func:1,args:[P.b7]},{func:1,v:true,args:[,P.aS]},{func:1,args:[U.bS]},{func:1,args:[{func:1,v:true}]},{func:1,ret:P.W,args:[P.u]},{func:1,args:[,],opt:[,]},{func:1,args:[P.u,R.P]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.I,P.q],P.f7]},{func:1,ret:[P.L,U.c1],args:[P.aL,P.q],named:{rerollEffectDescription:P.q,rerollable:P.W}},{func:1,args:[L.Z]},{func:1,args:[P.q,,]},{func:1,args:[P.q,Z.cK]},{func:1,args:[P.K,R.P]},{func:1,ret:P.q,args:[P.q]},{func:1,args:[P.u,,]},{func:1,ret:P.u,args:[P.Q,P.Q]},{func:1,ret:P.W,args:[L.Z]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.K,args:[A.ch]},{func:1,ret:Q.cu,args:[U.aO]},{func:1,ret:Q.cs,args:[Q.w]},{func:1,v:true,args:[P.d,P.aS]},{func:1,args:[[P.I,Y.a2],Y.a2]},{func:1,ret:L.Z,args:[P.q],named:{deferToChoiceList:P.W,deferToEndOfPage:P.W,goto:P.q,helpMessage:P.q,script:{func:1,ret:[P.L,P.ak]},submenu:P.q}},{func:1,args:[P.W]}]
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
if(x==y)H.rm(d||a)
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
Isolate.d0=a.d0
Isolate.b2=a.b2
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hI(X.hk(),b)},[])
else (function(b){H.hI(X.hk(),b)})([])})})()