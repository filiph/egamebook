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
if(b5.$isaI)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.e_"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.e_"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.e_(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",qZ:{"^":"d;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
aI:{"^":"d;",
w:function(a,b){return a===b},
gB:function(a){return H.ar(a)},
j:function(a){return H.cz(a)},
gb8:function(a){return new H.aj(H.hj(a),null)}},
ey:{"^":"aI;",
j:function(a){return String(a)},
gB:function(a){return a?519018:218159},
gb8:function(a){return C.a3},
$isW:1},
eA:{"^":"aI;",
w:function(a,b){return null==b},
j:function(a){return"null"},
gB:function(a){return 0},
gb8:function(a){return C.a1},
$isae:1},
eE:{"^":"aI;",
gB:function(a){return 0},
gb8:function(a){return C.a0},
j:function(a){return String(a)},
$iseB:1},
r2:{"^":"eE;"},
be:{"^":"eE;"},
bS:{"^":"aI;$ti",
f8:function(a,b){if(!!a.immutable$list)throw H.c(new P.N(b))},
cU:function(a,b){if(!!a.fixed$length)throw H.c(new P.N(b))},
n:function(a,b){this.cU(a,"add")
a.push(b)},
bn:function(a){this.cU(a,"removeLast")
if(a.length===0)throw H.c(H.ax(a,-1))
return a.pop()},
i3:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sk(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bI:function(a,b){return new H.H(a,b,[H.k(a,0)])},
aj:function(a,b){var z
this.cU(a,"addAll")
for(z=J.ab(b);z.u();)a.push(z.d)},
J:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
aM:function(a,b){return new H.ad(a,b,[H.k(a,0),null])},
di:function(a,b){return H.fh(a,b,null,H.k(a,0))},
aW:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
bk:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x)===!0)return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.a7())},
fg:function(a,b){return this.bk(a,b,null)},
ac:function(a,b){if(b>>>0!==b||b>=a.length)return H.e(a,b)
return a[b]},
gff:function(a){if(a.length>0)return a[0]
throw H.c(H.a7())},
gE:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.a7())},
gbN:function(a){var z=a.length
if(z===1){if(0>=z)return H.e(a,0)
return a[0]}if(z===0)throw H.c(H.a7())
throw H.c(H.dc())},
aD:function(a,b,c,d,e){var z,y,x
this.f8(a,"setRange")
P.cC(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.h(P.V(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.ex())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>>>0!==x||x>=d.length)return H.e(d,x)
a[b+y]=d[x]}},
bT:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
cH:function(a,b){var z
this.f8(a,"sort")
z=b==null?P.q2():b
H.c0(a,0,a.length-1,z)},
es:function(a){return this.cH(a,null)},
e1:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.i(a[z],b))return z
return-1},
bl:function(a,b){return this.e1(a,b,0)},
Y:function(a,b){var z
for(z=0;z<a.length;++z)if(J.i(a[z],b))return!0
return!1},
gI:function(a){return a.length===0},
ga8:function(a){return a.length!==0},
j:function(a){return P.bR(a,"[","]")},
bp:function(a){return P.aW(a,H.k(a,0))},
ga_:function(a){return new J.bN(a,a.length,0,null,[H.k(a,0)])},
gB:function(a){return H.ar(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cU(a,"set length")
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
$isG:1,
$isS:1},
qY:{"^":"bS;$ti"},
bN:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ao(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bT:{"^":"aI;",
bi:function(a,b){var z
if(typeof b!=="number")throw H.c(H.O(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcY(b)
if(this.gcY(a)===z)return 0
if(this.gcY(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcY:function(a){return a===0?1/a<0:a<0},
ef:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.N(""+a+".round()"))},
cv:function(a,b){var z
if(b>20)throw H.c(P.V(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gcY(a))return"-"+z
return z},
jU:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.V(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.cg(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.h(new P.N("Unexpected toString result: "+z))
x=J.I(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.bL("0",w)},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
eo:function(a){return-a},
a5:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a+b},
aF:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a-b},
cC:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a/b},
bL:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a*b},
bt:function(a,b){return(a|0)===a?a/b|0:this.ic(a,b)},
ic:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.N("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cR:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aC:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a<b},
bw:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a>b},
bK:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a<=b},
bv:function(a,b){if(typeof b!=="number")throw H.c(H.O(b))
return a>=b},
gb8:function(a){return C.a6},
$isJ:1},
ez:{"^":"bT;",
gb8:function(a){return C.a5},
$isaF:1,
$isJ:1,
$isu:1},
jS:{"^":"bT;",
gb8:function(a){return C.a4},
$isaF:1,
$isJ:1},
bU:{"^":"aI;",
cg:function(a,b){if(b<0)throw H.c(H.ax(a,b))
if(b>=a.length)H.h(H.ax(a,b))
return a.charCodeAt(b)},
c3:function(a,b){if(b>=a.length)throw H.c(H.ax(a,b))
return a.charCodeAt(b)},
dT:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.oD(b,a,c)},
dS:function(a,b){return this.dT(a,b,0)},
fq:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.V(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cg(b,c+y)!==this.c3(a,y))return
return new H.fg(c,b,a)},
a5:function(a,b){if(typeof b!=="string")throw H.c(P.cg(b,null,null))
return a+b},
dY:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.br(a,y-z)},
jI:function(a,b,c){H.bk(c)
return H.q(a,b,c)},
jJ:function(a,b,c,d){H.bk(c)
P.kZ(d,0,a.length,"startIndex",null)
return H.bM(a,b,c,d)},
d2:function(a,b,c){return this.jJ(a,b,c,0)},
hb:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.hO(b,a,c)!=null},
dj:function(a,b){return this.hb(a,b,0)},
ay:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.h(H.O(c))
if(b<0)throw H.c(P.bX(b,null,null))
if(typeof c!=="number")return H.y(c)
if(b>c)throw H.c(P.bX(b,null,null))
if(c>a.length)throw H.c(P.bX(c,null,null))
return a.substring(b,c)},
br:function(a,b){return this.ay(a,b,null)},
fN:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.c3(z,0)===133){x=J.dd(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cg(z,w)===133?J.jT(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jV:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.c3(z,0)===133?J.dd(z,1):0}else{y=J.dd(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
bL:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.E)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
e1:function(a,b,c){var z
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
bl:function(a,b){return this.e1(a,b,0)},
jp:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
jo:function(a,b){return this.jp(a,b,null)},
iD:function(a,b,c){if(b==null)H.h(H.O(b))
if(c>a.length)throw H.c(P.V(c,0,a.length,null,null))
return H.qG(a,b,c)},
Y:function(a,b){return this.iD(a,b,0)},
gI:function(a){return a.length===0},
ga8:function(a){return a.length!==0},
bi:function(a,b){var z
if(typeof b!=="string")throw H.c(H.O(b))
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
gb8:function(a){return C.a2},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.ax(a,b))
if(b>=a.length||b<0)throw H.c(H.ax(a,b))
return a[b]},
$iscv:1,
$ascv:I.b1,
$isp:1,
$isdr:1,
v:{
eC:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dd:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.c3(a,b)
if(y!==32&&y!==13&&!J.eC(y))break;++b}return b},
jT:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.cg(a,z)
if(y!==32&&y!==13&&!J.eC(y))break}return b}}}}],["","",,H,{"^":"",
fT:function(a){return a},
a7:function(){return new P.F("No element")},
dc:function(){return new P.F("Too many elements")},
ex:function(){return new P.F("Too few elements")},
c0:function(a,b,c,d){if(c-b<=32)H.f7(a,b,c,d)
else H.f6(a,b,c,d)},
f7:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.I(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a_(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.m(a,w,y.h(a,v))
w=v}y.m(a,w,x)}},
f6:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.bt(c-b+1,6)
y=b+z
x=c-z
w=C.d.bt(b+c,2)
v=w-z
u=w+z
t=J.I(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a_(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a_(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a_(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a_(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a_(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a_(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a_(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(d.$2(p,o),0)){n=o
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
if(h.w(i,0))continue
if(h.aC(i,0)){if(k!==m){t.m(a,k,t.h(a,m))
t.m(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.aa(i)
if(h.bw(i,0)){--l
continue}else{g=l-1
if(h.aC(i,0)){t.m(a,k,t.h(a,m))
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
t.m(a,m,j)}++m}else if(J.a_(d.$2(j,p),0))for(;!0;)if(J.a_(d.$2(t.h(a,l),p),0)){--l
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
H.c0(a,b,m-2,d)
H.c0(a,l+2,c,d)
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
break}}H.c0(a,m,l,d)}else H.c0(a,m,l,d)},
S:{"^":"x;$ti"},
aL:{"^":"S;$ti",
ga_:function(a){return new H.di(this,this.gk(this),0,null,[H.v(this,"aL",0)])},
J:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.ac(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gI:function(a){return this.gk(this)===0},
gE:function(a){if(this.gk(this)===0)throw H.c(H.a7())
return this.ac(0,this.gk(this)-1)},
Y:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(J.i(this.ac(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bk:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.ac(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
cn:function(a,b){var z,y,x,w
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.ac(0,0))
if(z!==this.gk(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.ac(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.ac(0,w))
if(z!==this.gk(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bI:function(a,b){return this.ex(0,b)},
aM:function(a,b){return new H.ad(this,b,[H.v(this,"aL",0),null])},
aW:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.ac(0,x))
if(z!==this.gk(this))throw H.c(new P.B(this))}return y},
bo:function(a,b){var z,y,x,w
z=[H.v(this,"aL",0)]
if(b){y=H.t([],z)
C.a.sk(y,this.gk(this))}else{x=new Array(this.gk(this))
x.fixed$length=Array
y=H.t(x,z)}for(w=0;w<this.gk(this);++w){z=this.ac(0,w)
if(w>=y.length)return H.e(y,w)
y[w]=z}return y},
c_:function(a){return this.bo(a,!0)},
bp:function(a){var z,y
z=P.T(null,null,null,H.v(this,"aL",0))
for(y=0;y<this.gk(this);++y)z.n(0,this.ac(0,y))
return z}},
mF:{"^":"aL;a,b,c,$ti",
ghE:function(){var z=J.aB(this.a)
return z},
gia:function(){var z,y
z=J.aB(this.a)
y=this.b
if(y>z)return z
return y},
gk:function(a){var z,y
z=J.aB(this.a)
y=this.b
if(y>=z)return 0
return z-y},
ac:function(a,b){var z,y
z=this.gia()+b
if(!(b<0)){y=this.ghE()
if(typeof y!=="number")return H.y(y)
y=z>=y}else y=!0
if(y)throw H.c(P.cr(b,this,"index",null,null))
return J.e8(this.a,z)},
bo:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.I(y)
w=x.gk(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.t([],u)
C.a.sk(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.t(s,u)}for(r=0;r<v;++r){u=x.ac(y,z+r)
if(r>=t.length)return H.e(t,r)
t[r]=u
if(x.gk(y)<w)throw H.c(new P.B(this))}return t},
hk:function(a,b,c,d){var z=this.b
if(z<0)H.h(P.V(z,0,null,"start",null))},
v:{
fh:function(a,b,c,d){var z=new H.mF(a,b,c,[d])
z.hk(a,b,c,d)
return z}}},
di:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.gk(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.ac(0,x);++this.c
return!0}},
cw:{"^":"x;a,b,$ti",
ga_:function(a){return new H.ka(null,J.ab(this.a),this.b,this.$ti)},
gk:function(a){return J.aB(this.a)},
gI:function(a){return J.e9(this.a)},
gE:function(a){return this.b.$1(J.hL(this.a))},
$asx:function(a,b){return[b]},
v:{
bv:function(a,b,c,d){if(!!J.o(a).$isS)return new H.bs(a,b,[c,d])
return new H.cw(a,b,[c,d])}}},
bs:{"^":"cw;a,b,$ti",$isS:1,
$asS:function(a,b){return[b]}},
ka:{"^":"cu;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gF())
return!0}this.a=null
return!1},
gF:function(){return this.a},
$ascu:function(a,b){return[b]}},
ad:{"^":"aL;a,b,$ti",
gk:function(a){return J.aB(this.a)},
ac:function(a,b){return this.b.$1(J.e8(this.a,b))},
$asaL:function(a,b){return[b]},
$asS:function(a,b){return[b]},
$asx:function(a,b){return[b]}},
H:{"^":"x;a,b,$ti",
ga_:function(a){return new H.fE(J.ab(this.a),this.b,this.$ti)},
aM:function(a,b){return new H.cw(this,b,[H.k(this,0),null])}},
fE:{"^":"cu;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gF())===!0)return!0
return!1},
gF:function(){return this.a.gF()}},
f_:{"^":"x;a,b,$ti",
ga_:function(a){return new H.lL(J.ab(this.a),this.b,this.$ti)},
v:{
lK:function(a,b,c){if(!!J.o(a).$isS)return new H.jk(a,H.fT(b),[c])
return new H.f_(a,H.fT(b),[c])}}},
jk:{"^":"f_;a,b,$ti",
gk:function(a){var z=J.aB(this.a)-this.b
if(z>=0)return z
return 0},
$isS:1},
lL:{"^":"cu;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gF:function(){return this.a.gF()}}}],["","",,H,{"^":"",
c6:function(a,b){var z=a.cj(b)
if(!init.globalState.d.cy)init.globalState.f.b7()
return z},
hy:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isG)throw H.c(P.E("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.op(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$ev()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.nZ(P.aY(null,H.c3),0)
x=P.u
y.z=new H.M(0,null,null,null,null,null,0,[x,H.dP])
y.ch=new H.M(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.oo()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.jK,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.oq)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.T(null,null,null,x)
v=new H.bY(0,null,!1)
u=new H.dP(y,new H.M(0,null,null,null,null,null,0,[x,H.bY]),w,init.createNewIsolate(),v,new H.b3(H.cZ()),new H.b3(H.cZ()),!1,!1,[],P.T(null,null,null,null),null,null,!1,!0,P.T(null,null,null,null))
w.n(0,0)
u.dm(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.cj(new H.qy(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.cj(new H.qz(z,a))
else u.cj(a)
init.globalState.f.b7()},
jO:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.jP()
return},
jP:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.N("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.N('Cannot extract URI from "'+z+'"'))},
jK:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cM(!0,[]).bC(b.data)
y=J.I(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cM(!0,[]).bC(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cM(!0,[]).bC(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.u
p=P.T(null,null,null,q)
o=new H.bY(0,null,!1)
n=new H.dP(y,new H.M(0,null,null,null,null,null,0,[q,H.bY]),p,init.createNewIsolate(),o,new H.b3(H.cZ()),new H.b3(H.cZ()),!1,!1,[],P.T(null,null,null,null),null,null,!1,!0,P.T(null,null,null,null))
p.n(0,0)
n.dm(0,o)
init.globalState.f.a.an(new H.c3(n,new H.jL(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b7()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").C(y.h(z,"msg"))
init.globalState.f.b7()
break
case"close":init.globalState.ch.aO(0,$.$get$ew().h(0,a))
a.terminate()
init.globalState.f.b7()
break
case"log":H.jJ(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a8(["command","print","msg",z])
q=new H.bg(!0,P.bH(null,P.u)).b_(q)
y.toString
self.postMessage(q)}else P.e5(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
jJ:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a8(["command","log","msg",a])
x=new H.bg(!0,P.bH(null,P.u)).b_(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.z(w)
z=H.A(w)
y=P.cp(z)
throw H.c(y)}},
jM:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eP=$.eP+("_"+y)
$.eQ=$.eQ+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.C(["spawned",new H.c5(y,x),w,z.r])
x=new H.jN(a,b,c,d,z)
if(e===!0){z.f5(w,w)
init.globalState.f.a.an(new H.c3(z,x,"start isolate"))}else x.$0()},
oU:function(a){return new H.cM(!0,[]).bC(new H.bg(!1,P.bH(null,P.u)).b_(a))},
qy:{"^":"a:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
qz:{"^":"a:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
op:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
oq:function(a){var z=P.a8(["command","print","msg",a])
return new H.bg(!0,P.bH(null,P.u)).b_(z)}}},
dP:{"^":"d;l:a<,b,c,jm:d<,iF:e<,f,r,x,cm:y<,z,Q,ch,cx,cy,db,dx",
f5:function(a,b){if(!this.f.w(0,a))return
if(this.Q.n(0,b)&&!this.y)this.y=!0
this.cf()},
jH:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.aO(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.e(z,-1)
x=z.pop()
init.globalState.f.a.f4(x)}this.y=!1}this.cf()},
iu:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.e(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
jF:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.h(new P.N("removeRange"))
P.cC(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
h4:function(a,b){if(!this.r.w(0,a))return
this.db=b},
j0:function(a,b,c){var z=J.o(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){a.C(c)
return}z=this.cx
if(z==null){z=P.aY(null,null)
this.cx=z}z.an(new H.of(a,c))},
j_:function(a,b){var z
if(!this.r.w(0,a))return
z=J.o(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.e6()
return}z=this.cx
if(z==null){z=P.aY(null,null)
this.cx=z}z.an(this.gjn())},
j1:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.e5(a)
if(b!=null)P.e5(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.f(a)
y[1]=b==null?null:J.f(b)
for(x=new P.ak(z,z.r,null,null,[null]),x.c=z.e;x.u();)x.d.C(y)},
cj:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.z(u)
v=H.A(u)
this.j1(w,v)
if(this.db===!0){this.e6()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjm()
if(this.cx!=null)for(;t=this.cx,!t.gI(t);)this.cx.d1().$0()}return y},
bX:function(a){return this.b.h(0,a)},
dm:function(a,b){var z=this.b
if(z.Z(a))throw H.c(P.cp("Registry: ports must be registered only once."))
z.m(0,a,b)},
cf:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.m(0,this.a,this)
else this.e6()},
e6:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aK(0)
for(z=this.b,y=z.gc0(),y=y.ga_(y);y.u();)y.gF().hz()
z.aK(0)
this.c.aK(0)
init.globalState.z.aO(0,this.a)
this.dx.aK(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.e(z,v)
w.C(z[v])}this.ch=null}},"$0","gjn",0,0,4]},
of:{"^":"a:4;a,b",
$0:function(){this.a.C(this.b)}},
nZ:{"^":"d;a,b",
iK:function(){var z=this.a
if(z.b===z.c)return
return z.d1()},
fL:function(){var z,y,x
z=this.iK()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.Z(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gI(y)}else y=!1
else y=!1
else y=!1
if(y)H.h(P.cp("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gI(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a8(["command","close"])
x=new H.bg(!0,new P.fN(0,null,null,null,null,null,0,[null,P.u])).b_(x)
y.toString
self.postMessage(x)}return!1}z.jD()
return!0},
eX:function(){if(self.window!=null)new H.o_(this).$0()
else for(;this.fL(););},
b7:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eX()
else try{this.eX()}catch(x){z=H.z(x)
y=H.A(x)
w=init.globalState.Q
v=P.a8(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bg(!0,P.bH(null,P.u)).b_(v)
w.toString
self.postMessage(v)}}},
o_:{"^":"a:4;a",
$0:function(){if(!this.a.fL())return
P.n9(C.w,this)}},
c3:{"^":"d;a,b,c",
jD:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cj(this.b)}},
oo:{"^":"d;"},
jL:{"^":"a:1;a,b,c,d,e,f",
$0:function(){H.jM(this.a,this.b,this.c,this.d,this.e,this.f)}},
jN:{"^":"a:4;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cf()}},
fH:{"^":"d;"},
c5:{"^":"fH;b,a",
C:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.geN())return
x=H.oU(a)
if(z.giF()===y){y=J.I(x)
switch(y.h(x,0)){case"pause":z.f5(y.h(x,1),y.h(x,2))
break
case"resume":z.jH(y.h(x,1))
break
case"add-ondone":z.iu(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.jF(y.h(x,1))
break
case"set-errors-fatal":z.h4(y.h(x,1),y.h(x,2))
break
case"ping":z.j0(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.j_(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.n(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aO(0,y)
break}return}init.globalState.f.a.an(new H.c3(z,new H.os(this,x),"receive"))},
w:function(a,b){if(b==null)return!1
return b instanceof H.c5&&J.i(this.b,b.b)},
gB:function(a){return this.b.gdD()}},
os:{"^":"a:1;a,b",
$0:function(){var z=this.a.b
if(!z.geN())z.hq(this.b)}},
dR:{"^":"fH;b,c,a",
C:function(a){var z,y,x
z=P.a8(["command","message","port",this,"msg",a])
y=new H.bg(!0,P.bH(null,P.u)).b_(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.dR&&J.i(this.b,b.b)&&J.i(this.a,b.a)&&J.i(this.c,b.c)},
gB:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.ep()
y=this.a
if(typeof y!=="number")return y.ep()
x=this.c
if(typeof x!=="number")return H.y(x)
return(z<<16^y<<8^x)>>>0}},
bY:{"^":"d;dD:a<,b,eN:c<",
hz:function(){this.c=!0
this.b=null},
b1:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.aO(0,y)
z.c.aO(0,y)
z.cf()},
hq:function(a){if(this.c)return
this.b.$1(a)},
$isl_:1},
l0:{"^":"a4;a,b",
aq:function(a,b,c,d){var z=this.b
z.toString
return new P.cL(z,[H.k(z,0)]).aq(a,b,c,d)},
e9:function(a,b,c){return this.aq(a,null,b,c)},
b1:[function(){this.a.b1()
this.b.b1()},"$0","giB",0,0,4],
hi:function(a){var z=new P.oH(null,0,null,null,null,null,this.giB(),[null])
this.b=z
this.a.b=z.gil(z)},
$asa4:I.b1},
n5:{"^":"d;a,b,c",
hl:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.an(new H.c3(y,new H.n7(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.cU(new H.n8(this,b),0),a)}else throw H.c(new P.N("Timer greater than 0."))},
v:{
n6:function(a,b){var z=new H.n5(!0,!1,null)
z.hl(a,b)
return z}}},
n7:{"^":"a:4;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
n8:{"^":"a:4;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b3:{"^":"d;dD:a<",
gB:function(a){var z=this.a
if(typeof z!=="number")return z.k6()
z=C.i.cR(z,0)^C.i.bt(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b3){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bg:{"^":"d;a,b",
b_:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.m(0,a,z.gk(z))
z=J.o(a)
if(!!z.$iscv)return this.h0(a)
if(!!z.$isjH){x=this.gfY()
z=a.gbV()
z=H.bv(z,x,H.v(z,"x",0),null)
z=P.U(z,!0,H.v(z,"x",0))
w=a.gc0()
w=H.bv(w,x,H.v(w,"x",0),null)
return["map",z,P.U(w,!0,H.v(w,"x",0))]}if(!!z.$iseB)return this.h1(a)
if(!!z.$isaI)this.fO(a)
if(!!z.$isl_)this.cw(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isc5)return this.h2(a)
if(!!z.$isdR)return this.h3(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cw(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb3)return["capability",a.a]
if(!(a instanceof P.d))this.fO(a)
return["dart",init.classIdExtractor(a),this.h_(init.classFieldsExtractor(a))]},"$1","gfY",2,0,0],
cw:function(a,b){throw H.c(new P.N((b==null?"Can't transmit:":b)+" "+H.b(a)))},
fO:function(a){return this.cw(a,null)},
h0:function(a){var z=this.fZ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cw(a,"Can't serialize indexable: ")},
fZ:function(a){var z,y,x
z=[]
C.a.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.b_(a[y])
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
h_:function(a){var z
for(z=0;z<a.length;++z)C.a.m(a,z,this.b_(a[z]))
return a},
h1:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.cw(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.b_(a[z[x]])
if(x>=y.length)return H.e(y,x)
y[x]=w}return["js-object",z,y]},
h3:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
h2:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gdD()]
return["raw sendport",a]}},
cM:{"^":"d;a,b",
bC:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.E("Bad serialized message: "+H.b(a)))
switch(C.a.gff(a)){case"ref":if(1>=a.length)return H.e(a,1)
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
y=H.t(this.ci(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return H.t(this.ci(x),[null])
case"mutable":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return this.ci(x)
case"const":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
y=H.t(this.ci(x),[null])
y.fixed$length=Array
return y
case"map":return this.iN(a)
case"sendport":return this.iO(a)
case"raw sendport":if(1>=a.length)return H.e(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.iM(a)
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
this.ci(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","giL",2,0,0],
ci:function(a){var z,y,x
z=J.I(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.y(x)
if(!(y<x))break
z.m(a,y,this.bC(z.h(a,y)));++y}return a},
iN:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w=P.aV()
this.b.push(w)
y=J.ea(y,this.giL()).c_(0)
for(z=J.I(y),v=J.I(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.e(y,u)
w.m(0,y[u],this.bC(v.h(x,u)))}return w},
iO:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
if(3>=z)return H.e(a,3)
w=a[3]
if(J.i(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bX(w)
if(u==null)return
t=new H.c5(u,x)}else t=new H.dR(y,w,x)
this.b.push(t)
return t},
iM:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.e(a,1)
y=a[1]
if(2>=z)return H.e(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.I(y)
v=J.I(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.y(t)
if(!(u<t))break
w[z.h(y,u)]=this.bC(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
iH:function(){throw H.c(new P.N("Cannot modify unmodifiable Map"))},
qe:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.f(a)
if(typeof z!=="string")throw H.c(H.O(a))
return z},
ar:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
by:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.G||!!J.o(a).$isbe){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.c3(w,0)===36)w=C.b.br(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cX(H.c9(a),0,null),init.mangledGlobalNames)},
cz:function(a){return"Instance of '"+H.by(a)+"'"},
a9:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.d.cR(z,10))>>>0,56320|z&1023)}throw H.c(P.V(a,0,1114111,null,null))},
b7:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
kU:function(a){var z=H.b7(a).getFullYear()+0
return z},
kS:function(a){var z=H.b7(a).getMonth()+1
return z},
kO:function(a){var z=H.b7(a).getDate()+0
return z},
kP:function(a){var z=H.b7(a).getHours()+0
return z},
kR:function(a){var z=H.b7(a).getMinutes()+0
return z},
kT:function(a){var z=H.b7(a).getSeconds()+0
return z},
kQ:function(a){var z=H.b7(a).getMilliseconds()+0
return z},
du:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.O(a))
return a[b]},
eR:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.O(a))
a[b]=c},
y:function(a){throw H.c(H.O(a))},
e:function(a,b){if(a==null)J.aB(a)
throw H.c(H.ax(a,b))},
ax:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aT(!0,b,"index",null)
z=J.aB(a)
if(!(b<0)){if(typeof z!=="number")return H.y(z)
y=b>=z}else y=!0
if(y)return P.cr(b,a,"index",null,z)
return P.bX(b,"index",null)},
O:function(a){return new P.aT(!0,a,null,null)},
cS:function(a){if(typeof a!=="number")throw H.c(H.O(a))
return a},
bk:function(a){if(typeof a!=="string")throw H.c(H.O(a))
return a},
c:function(a){var z
if(a==null)a=new P.cx()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hC})
z.name=""}else z.toString=H.hC
return z},
hC:function(){return J.f(this.dartException)},
h:function(a){throw H.c(a)},
ao:function(a){throw H.c(new P.B(a))},
z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.qN(a)
if(a==null)return
if(a instanceof H.d8)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.cR(x,16)&8191)===10)switch(w){case 438:return z.$1(H.df(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.eK(v,null))}}if(a instanceof TypeError){u=$.$get$fp()
t=$.$get$fq()
s=$.$get$fr()
r=$.$get$fs()
q=$.$get$fw()
p=$.$get$fx()
o=$.$get$fu()
$.$get$ft()
n=$.$get$fz()
m=$.$get$fy()
l=u.b4(y)
if(l!=null)return z.$1(H.df(y,l))
else{l=t.b4(y)
if(l!=null){l.method="call"
return z.$1(H.df(y,l))}else{l=s.b4(y)
if(l==null){l=r.b4(y)
if(l==null){l=q.b4(y)
if(l==null){l=p.b4(y)
if(l==null){l=o.b4(y)
if(l==null){l=r.b4(y)
if(l==null){l=n.b4(y)
if(l==null){l=m.b4(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eK(y,l==null?null:l.method))}}return z.$1(new H.nd(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.f8()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aT(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.f8()
return a},
A:function(a){var z
if(a instanceof H.d8)return a.b
if(a==null)return new H.fQ(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fQ(a,null)},
qm:function(a){if(a==null||typeof a!='object')return J.j(a)
else return H.ar(a)},
q8:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.m(0,a[y],a[x])}return b},
qg:function(a,b,c,d,e,f,g){switch(c){case 0:return H.c6(b,new H.qh(a))
case 1:return H.c6(b,new H.qi(a,d))
case 2:return H.c6(b,new H.qj(a,d,e))
case 3:return H.c6(b,new H.qk(a,d,e,f))
case 4:return H.c6(b,new H.ql(a,d,e,f,g))}throw H.c(P.cp("Unsupported number of arguments for wrapped closure"))},
cU:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.qg)
a.$identity=z
return z},
iD:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isG){z.$reflectionInfo=c
x=H.l2(z).r}else x=c
w=d?Object.create(new H.mc().constructor.prototype):Object.create(new H.d1(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aC
$.aC=J.Z(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.ei(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.qe,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.ef:H.d2
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ei(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
iA:function(a,b,c,d){var z=H.d2
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ei:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.iC(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.iA(y,!w,z,b)
if(y===0){w=$.aC
$.aC=J.Z(w,1)
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.br
if(v==null){v=H.cj("self")
$.br=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aC
$.aC=J.Z(w,1)
t+=H.b(w)
w="return function("+t+"){return this."
v=$.br
if(v==null){v=H.cj("self")
$.br=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
iB:function(a,b,c,d){var z,y
z=H.d2
y=H.ef
switch(b?-1:a){case 0:throw H.c(new H.ld("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
iC:function(a,b){var z,y,x,w,v,u,t,s
z=H.it()
y=$.ee
if(y==null){y=H.cj("receiver")
$.ee=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.iB(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aC
$.aC=J.Z(u,1)
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aC
$.aC=J.Z(u,1)
return new Function(y+H.b(u)+"}")()},
e_:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isG){c.fixed$length=Array
z=c}else z=c
return H.iD(a,b,z,!!d,e,f)},
qs:function(a,b){var z=J.I(b)
throw H.c(H.cl(H.by(a),z.ay(b,3,z.gk(b))))},
a2:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.qs(a,b)},
e1:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.e1(a)
return z==null?!1:H.e4(z,b)},
he:function(a,b){var z,y
if(a==null)return a
if(H.ay(a,b))return a
z=H.R(b,null)
y=H.e1(a)
throw H.c(H.cl(y!=null?H.R(y,null):H.by(a),z))},
qL:function(a){throw H.c(new P.iT(a))},
cZ:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
b0:function(a){return new H.aj(a,null)},
t:function(a,b){a.$ti=b
return a},
c9:function(a){if(a==null)return
return a.$ti},
hi:function(a,b){return H.e6(a["$as"+H.b(b)],H.c9(a))},
v:function(a,b,c){var z=H.hi(a,b)
return z==null?null:z[c]},
k:function(a,b){var z=H.c9(a)
return z==null?null:z[b]},
R:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cX(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.R(z,b)
return H.oZ(a,b)}return"unknown-reified-type"},
oZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.R(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.R(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.R(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.q7(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.R(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
cX:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bE("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.t=v+", "
u=a[y]
if(u!=null)w=!1
v=z.t+=H.R(u,c)}return w?"":"<"+z.j(0)+">"},
hj:function(a){var z,y
if(a instanceof H.a){z=H.e1(a)
if(z!=null)return H.R(z,null)}y=J.o(a).constructor.builtin$cls
if(a==null)return y
return y+H.cX(a.$ti,0,null)},
e6:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aE:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.c9(a)
y=J.o(a)
if(y[b]==null)return!1
return H.h7(H.e6(y[d],z),c)},
az:function(a,b,c,d){if(a==null)return a
if(H.aE(a,b,c,d))return a
throw H.c(H.cl(H.by(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.cX(c,0,null),init.mangledGlobalNames)))},
h7:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a5(a[y],b[y]))return!1
return!0},
b_:function(a,b,c){return a.apply(b,H.hi(b,c))},
cT:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ae"
if(b==null)return!0
z=H.c9(a)
a=J.o(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.e4(x.apply(a,null),b)}return H.a5(y,b)},
hz:function(a,b){if(a!=null&&!H.cT(a,b))throw H.c(H.cl(H.by(a),H.R(b,null)))
return a},
a5:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ae")return!0
if('func' in b)return H.e4(a,b)
if('func' in a)return b.builtin$cls==="bu"||b.builtin$cls==="d"
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
return H.h7(H.e6(u,z),x)},
h6:function(a,b,c){var z,y,x,w,v
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
p8:function(a,b){var z,y,x,w,v,u
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
e4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.h6(x,w,!1))return!1
if(!H.h6(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a5(o,n)||H.a5(n,o)))return!1}}return H.p8(a.named,b.named)},
qG:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.o(b)
if(!!z.$iseD){z=C.b.br(a,c)
return b.b.test(z)}else{z=z.dS(b,C.b.br(a,c))
return!z.gI(z)}}},
q:function(a,b,c){var z,y,x
H.bk(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
rm:[function(a){return a},"$1","fU",2,0,38],
qH:function(a,b,c,d){var z,y,x,w,v,u
z=J.o(b)
if(!z.$isdr)throw H.c(P.cg(b,"pattern","is not a Pattern"))
for(z=z.dS(b,a),z=new H.fF(z.a,z.b,z.c,null),y=0,x="";z.u();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.fU().$1(C.b.ay(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.fU().$1(C.b.br(a,y)))
return z.charCodeAt(0)==0?z:z},
bM:function(a,b,c,d){var z=a.indexOf(b,d)
if(z<0)return a
return H.qI(a,z,z+b.length,c)},
qI:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
iG:{"^":"d;$ti",
gI:function(a){return this.gk(this)===0},
ga8:function(a){return this.gk(this)!==0},
j:function(a){return P.dl(this)},
m:function(a,b,c){return H.iH()},
$isD:1},
iI:{"^":"iG;a,b,c,$ti",
gk:function(a){return this.a},
Z:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.Z(b))return
return this.eJ(b)},
eJ:function(a){return this.b[a]},
J:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eJ(w))}}},
l1:{"^":"d;a,b,c,d,e,f,r,x",v:{
l2:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.l1(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
na:{"^":"d;a,b,c,d,e,f",
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
aD:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.na(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cK:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fv:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eK:{"^":"X;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+H.b(z)+"' on null"}},
jV:{"^":"X;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
v:{
df:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.jV(a,y,z?null:b.receiver)}}},
nd:{"^":"X;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
d8:{"^":"d;a,b0:b<"},
qN:{"^":"a:0;a",
$1:function(a){if(!!J.o(a).$isX)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fQ:{"^":"d;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
qh:{"^":"a:1;a",
$0:function(){return this.a.$0()}},
qi:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
qj:{"^":"a:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
qk:{"^":"a:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ql:{"^":"a:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
j:function(a){return"Closure '"+H.by(this).trim()+"'"},
gfV:function(){return this},
$isbu:1,
gfV:function(){return this}},
fl:{"^":"a;"},
mc:{"^":"fl;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d1:{"^":"fl;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d1))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.ar(this.a)
else y=typeof z!=="object"?J.j(z):H.ar(z)
z=H.ar(this.b)
if(typeof y!=="number")return y.k7()
return(y^z)>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cz(z)},
v:{
d2:function(a){return a.a},
ef:function(a){return a.c},
it:function(){var z=$.br
if(z==null){z=H.cj("self")
$.br=z}return z},
cj:function(a){var z,y,x,w,v
z=new H.d1("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iw:{"^":"X;a",
j:function(a){return this.a},
v:{
cl:function(a,b){return new H.iw("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ld:{"^":"X;a",
j:function(a){return"RuntimeError: "+H.b(this.a)}},
aj:{"^":"d;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.j(this.a)},
w:function(a,b){if(b==null)return!1
return b instanceof H.aj&&J.i(this.a,b.a)}},
M:{"^":"d;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gI:function(a){return this.a===0},
ga8:function(a){return!this.gI(this)},
gbV:function(){return new H.k1(this,[H.k(this,0)])},
gc0:function(){return H.bv(this.gbV(),new H.jU(this),H.k(this,0),H.k(this,1))},
Z:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.eF(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.eF(y,a)}else return this.jc(a)},
jc:function(a){var z=this.d
if(z==null)return!1
return this.cl(this.cN(z,this.ck(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c6(z,b)
return y==null?null:y.gbE()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c6(x,b)
return y==null?null:y.gbE()}else return this.jd(b)},
jd:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cN(z,this.ck(a))
x=this.cl(y,a)
if(x<0)return
return y[x].gbE()},
m:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dF()
this.b=z}this.ez(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dF()
this.c=y}this.ez(y,b,c)}else this.jf(b,c)},
jf:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dF()
this.d=z}y=this.ck(a)
x=this.cN(z,y)
if(x==null)this.dP(z,y,[this.dG(a,b)])
else{w=this.cl(x,a)
if(w>=0)x[w].sbE(b)
else x.push(this.dG(a,b))}},
jE:function(a,b){var z
if(this.Z(a))return this.h(0,a)
z=b.$0()
this.m(0,a,z)
return z},
aO:function(a,b){if(typeof b==="string")return this.eW(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eW(this.c,b)
else return this.je(b)},
je:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cN(z,this.ck(a))
x=this.cl(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.f_(w)
return w.gbE()},
aK:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
J:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
ez:function(a,b,c){var z=this.c6(a,b)
if(z==null)this.dP(a,b,this.dG(b,c))
else z.sbE(c)},
eW:function(a,b){var z
if(a==null)return
z=this.c6(a,b)
if(z==null)return
this.f_(z)
this.eG(a,b)
return z.gbE()},
dG:function(a,b){var z,y
z=new H.k0(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
f_:function(a){var z,y
z=a.gi_()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ck:function(a){return J.j(a)&0x3ffffff},
cl:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].gfm(),b))return y
return-1},
j:function(a){return P.dl(this)},
c6:function(a,b){return a[b]},
cN:function(a,b){return a[b]},
dP:function(a,b,c){a[b]=c},
eG:function(a,b){delete a[b]},
eF:function(a,b){return this.c6(a,b)!=null},
dF:function(){var z=Object.create(null)
this.dP(z,"<non-identifier-key>",z)
this.eG(z,"<non-identifier-key>")
return z},
$isjH:1,
$isD:1,
v:{
eF:function(a,b){return new H.M(0,null,null,null,null,null,0,[a,b])}}},
jU:{"^":"a:0;a",
$1:function(a){return this.a.h(0,a)}},
k0:{"^":"d;fm:a<,bE:b@,c,i_:d<,$ti"},
k1:{"^":"S;a,$ti",
gk:function(a){return this.a.a},
gI:function(a){return this.a.a===0},
ga_:function(a){var z,y
z=this.a
y=new H.k2(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Y:function(a,b){return this.a.Z(b)},
J:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
k2:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
eD:{"^":"d;a,b,c,d",
j:function(a){return"RegExp/"+this.a+"/"},
ghW:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.de(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghV:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.de(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
dT:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return new H.nF(this,b,c)},
dS:function(a,b){return this.dT(a,b,0)},
hG:function(a,b){var z,y
z=this.ghW()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.fP(this,y)},
hF:function(a,b){var z,y
z=this.ghV()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.e(y,-1)
if(y.pop()!=null)return
return new H.fP(this,y)},
fq:function(a,b,c){if(c>b.length)throw H.c(P.V(c,0,b.length,null,null))
return this.hF(b,c)},
$isdr:1,
v:{
de:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eu("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
fP:{"^":"d;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
$isb6:1},
nF:{"^":"ct;a,b,c",
ga_:function(a){return new H.fF(this.a,this.b,this.c,null)},
$asct:function(){return[P.b6]},
$asx:function(){return[P.b6]}},
fF:{"^":"d;a,b,c,d",
gF:function(){return this.d},
u:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hG(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fg:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.h(P.bX(b,null,null))
return this.c},
$isb6:1},
oD:{"^":"x;a,b,c",
ga_:function(a){return new H.oE(this.a,this.b,this.c,null)},
$asx:function(){return[P.b6]}},
oE:{"^":"d;a,b,c,d",
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
this.d=new H.fg(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gF:function(){return this.d}}}],["","",,H,{"^":"",
q7:function(a){var z=H.t(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
qr:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
nG:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.p9()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.cU(new P.nI(z),1)).observe(y,{childList:true})
return new P.nH(z,y,x)}else if(self.setImmediate!=null)return P.pa()
return P.pb()},
rg:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.cU(new P.nJ(a),0))},"$1","p9",2,0,11],
rh:[function(a){++init.globalState.f.b
self.setImmediate(H.cU(new P.nK(a),0))},"$1","pa",2,0,11],
ri:[function(a){P.dF(C.w,a)},"$1","pb",2,0,11],
aw:function(a,b){P.dS(null,a)
return b.gfj()},
al:function(a,b){P.dS(a,b)},
av:function(a,b){b.bB(a)},
au:function(a,b){b.dX(H.z(a),H.A(a))},
dS:function(a,b){var z,y,x,w
z=new P.oO(b)
y=new P.oP(b)
x=J.o(a)
if(!!x.$isC)a.dQ(z,y)
else if(!!x.$isL)a.eh(z,y)
else{w=new P.C(0,$.n,null,[null])
w.a=4
w.c=a
w.dQ(z,null)}},
an:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.p7(z)},
cP:function(a,b,c){var z,y,x
if(b===0){if(c.ge3())c.c.dW()
else c.a.b1()
return}else if(b===1){if(c.ge3())c.c.dX(H.z(a),H.A(a))
else{z=H.z(a)
y=H.A(a)
c.a.dR(z,y)
c.a.b1()}return}if(a instanceof P.bG){if(c.ge3()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.aH(c.a,z)
P.ca(new P.oM(b,c))
return}else if(z===1){x=a.a
c.a.ix(x,!1).bG(new P.oN(b,c))
return}}P.dS(a,b)},
p6:function(a){return a.gdk()},
dX:function(a,b){if(H.ay(a,{func:1,args:[P.ae,P.ae]})){b.toString
return a}else{b.toString
return a}},
aq:function(a){return new P.oF(new P.C(0,$.n,null,[a]),[a])},
oX:function(a,b,c){$.n.toString
a.aT(b,c)},
p0:function(){var z,y
for(;z=$.bh,z!=null;){$.bJ=null
y=z.gbY()
$.bh=y
if(y==null)$.bI=null
z.giz().$0()}},
rl:[function(){$.dT=!0
try{P.p0()}finally{$.bJ=null
$.dT=!1
if($.bh!=null)$.$get$dJ().$1(P.h8())}},"$0","h8",0,0,4],
h2:function(a){var z=new P.fG(a,null)
if($.bh==null){$.bI=z
$.bh=z
if(!$.dT)$.$get$dJ().$1(P.h8())}else{$.bI.b=z
$.bI=z}},
p5:function(a){var z,y,x
z=$.bh
if(z==null){P.h2(a)
$.bJ=$.bI
return}y=new P.fG(a,null)
x=$.bJ
if(x==null){y.b=z
$.bJ=y
$.bh=y}else{y.b=x.b
x.b=y
$.bJ=y
if(y.b==null)$.bI=y}},
ca:function(a){var z=$.n
if(C.f===z){P.bj(null,null,C.f,a)
return}z.toString
P.bj(null,null,z,z.dU(a,!0))},
rd:function(a,b){return new P.oC(null,a,!1,[b])},
dY:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.z(x)
y=H.A(x)
w=$.n
w.toString
P.bi(null,null,w,z,y)}},
p1:[function(a,b){var z=$.n
z.toString
P.bi(null,null,z,a,b)},function(a){return P.p1(a,null)},"$2","$1","pd",2,2,14,0],
rk:[function(){},"$0","pc",0,0,4],
h1:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.z(u)
y=H.A(u)
$.n.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gb2()
w=t
v=x.gb0()
c.$2(w,v)}}},
oQ:function(a,b,c,d){var z=a.bU()
if(!!J.o(z).$isL&&z!==$.$get$b4())z.bH(new P.oS(b,c,d))
else b.aT(c,d)},
fR:function(a,b){return new P.oR(a,b)},
fS:function(a,b,c){var z=a.bU()
if(!!J.o(z).$isL&&z!==$.$get$b4())z.bH(new P.oT(b,c))
else b.aS(c)},
oL:function(a,b,c){$.n.toString
a.bO(b,c)},
n9:function(a,b){var z=$.n
if(z===C.f){z.toString
return P.dF(a,b)}return P.dF(a,z.dU(b,!0))},
dF:function(a,b){var z=C.d.bt(a.a,1000)
return H.n6(z<0?0:z,b)},
nn:function(){return $.n},
bi:function(a,b,c,d,e){var z={}
z.a=d
P.p5(new P.p3(z,e))},
fZ:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
h0:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
h_:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
bj:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dU(d,!(!z||!1))
P.h2(d)},
nI:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
nH:{"^":"a:29;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
nJ:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
nK:{"^":"a:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
oO:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
oP:{"^":"a:13;a",
$2:function(a,b){this.a.$2(1,new H.d8(a,b))}},
p7:{"^":"a:45;a",
$2:function(a,b){this.a(a,b)}},
oM:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gcm()){z.b=!0
return}this.a.$2(null,0)}},
oN:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
nL:{"^":"d;a,b,c",
gdk:function(){return this.a.gdk()},
gcm:function(){return this.a.gcm()},
ge3:function(){return this.c!=null},
n:function(a,b){return J.aH(this.a,b)},
dR:function(a,b){return this.a.dR(a,b)},
b1:function(){return this.a.b1()},
hn:function(a){var z=new P.nO(a)
this.a=new P.nT(null,0,null,new P.nQ(z),null,new P.nR(this,z),new P.nS(this,a),[null])},
v:{
nM:function(a){var z=new P.nL(null,!1,null)
z.hn(a)
return z}}},
nO:{"^":"a:1;a",
$0:function(){P.ca(new P.nP(this.a))}},
nP:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
nQ:{"^":"a:1;a",
$0:function(){this.a.$0()}},
nR:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
nS:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gjj()){z.c=new P.c1(new P.C(0,$.n,null,[null]),[null])
if(z.b===!0){z.b=!1
P.ca(new P.nN(this.b))}return z.c.gfj()}}},
nN:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bG:{"^":"d;am:a<,b",
j:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
v:{
c4:function(a){return new P.bG(a,1)},
aO:function(){return C.a7},
fL:function(a){return new P.bG(a,0)},
aP:function(a){return new P.bG(a,3)}}},
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
if(y instanceof P.bG){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ab(z)
if(!!w.$isaZ){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
oG:{"^":"ct;a",
ga_:function(a){return new P.aZ(this.a(),null,null,null)},
$asct:I.b1,
$asx:I.b1,
v:{
aQ:function(a){return new P.oG(a)}}},
L:{"^":"d;$ti"},
fI:{"^":"d;fj:a<,$ti",
dX:function(a,b){if(a==null)a=new P.cx()
if(this.a.a!==0)throw H.c(new P.F("Future already completed"))
$.n.toString
this.aT(a,b)},
cV:function(a){return this.dX(a,null)}},
c1:{"^":"fI;a,$ti",
bB:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.bd(a)},
dW:function(){return this.bB(null)},
aT:function(a,b){this.a.eB(a,b)}},
oF:{"^":"fI;a,$ti",
bB:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.F("Future already completed"))
z.aS(a)},
dW:function(){return this.bB(null)},
aT:function(a,b){this.a.aT(a,b)}},
dO:{"^":"d;dI:a<,b,c,d,e,$ti",
gii:function(){return this.b.b},
gfl:function(){return(this.c&1)!==0},
gj4:function(){return(this.c&2)!==0},
gfk:function(){return this.c===8},
j2:function(a){return this.b.b.eg(this.d,a)},
jt:function(a){if(this.c!==6)return!0
return this.b.b.eg(this.d,a.gb2())},
iZ:function(a){var z,y
z=this.e
y=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return y.jM(z,a.gb2(),a.gb0())
else return y.eg(z,a.gb2())},
j3:function(){return this.b.b.fJ(this.d)}},
C:{"^":"d;cd:a<,b,i4:c<,$ti",
ghQ:function(){return this.a===2},
gdE:function(){return this.a>=4},
eh:function(a,b){var z=$.n
if(z!==C.f){z.toString
if(b!=null)b=P.dX(b,z)}return this.dQ(a,b)},
bG:function(a){return this.eh(a,null)},
dQ:function(a,b){var z,y
z=new P.C(0,$.n,null,[null])
y=b==null?1:3
this.cI(new P.dO(null,z,y,a,b,[H.k(this,0),null]))
return z},
bH:function(a){var z,y
z=$.n
y=new P.C(0,z,null,this.$ti)
if(z!==C.f)z.toString
z=H.k(this,0)
this.cI(new P.dO(null,y,8,a,null,[z,z]))
return y},
cI:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gdE()){y.cI(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bj(null,null,z,new P.o2(this,a))}},
eS:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gdI()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gdE()){v.eS(a)
return}this.a=v.a
this.c=v.c}z.a=this.cP(a)
y=this.b
y.toString
P.bj(null,null,y,new P.o9(z,this))}},
cO:function(){var z=this.c
this.c=null
return this.cP(z)},
cP:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gdI()
z.a=y}return y},
aS:function(a){var z,y
z=this.$ti
if(H.aE(a,"$isL",z,"$asL"))if(H.aE(a,"$isC",z,null))P.cN(a,this)
else P.fK(a,this)
else{y=this.cO()
this.a=4
this.c=a
P.bf(this,y)}},
aT:[function(a,b){var z=this.cO()
this.a=8
this.c=new P.ch(a,b)
P.bf(this,z)},function(a){return this.aT(a,null)},"k8","$2","$1","gbz",2,2,14,0],
bd:function(a){var z
if(H.aE(a,"$isL",this.$ti,"$asL")){this.hw(a)
return}this.a=1
z=this.b
z.toString
P.bj(null,null,z,new P.o4(this,a))},
hw:function(a){var z
if(H.aE(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bj(null,null,z,new P.o8(this,a))}else P.cN(a,this)
return}P.fK(a,this)},
eB:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bj(null,null,z,new P.o3(this,a,b))},
hp:function(a,b){this.a=4
this.c=a},
$isL:1,
v:{
fK:function(a,b){var z,y,x
b.a=1
try{a.eh(new P.o5(b),new P.o6(b))}catch(x){z=H.z(x)
y=H.A(x)
P.ca(new P.o7(b,z,y))}},
cN:function(a,b){var z,y,x
for(;a.ghQ();)a=a.c
z=a.gdE()
y=b.c
if(z){b.c=null
x=b.cP(y)
b.a=a.a
b.c=a.c
P.bf(b,x)}else{b.a=2
b.c=a
a.eS(y)}},
bf:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.gb2()
t=v.gb0()
y.toString
P.bi(null,null,y,u,t)}return}for(;b.gdI()!=null;b=s){s=b.a
b.a=null
P.bf(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gfl()||b.gfk()){q=b.gii()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=v.gb2()
t=v.gb0()
y.toString
P.bi(null,null,y,u,t)
return}p=$.n
if(p==null?q!=null:p!==q)$.n=q
else p=null
if(b.gfk())new P.oc(z,x,w,b).$0()
else if(y){if(b.gfl())new P.ob(x,b,r).$0()}else if(b.gj4())new P.oa(z,x,b).$0()
if(p!=null)$.n=p
y=x.b
if(!!J.o(y).$isL){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.cP(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cN(y,o)
return}}o=b.b
b=o.cO()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
o2:{"^":"a:1;a,b",
$0:function(){P.bf(this.a,this.b)}},
o9:{"^":"a:1;a,b",
$0:function(){P.bf(this.b,this.a.a)}},
o5:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.aS(a)}},
o6:{"^":"a:41;a",
$2:function(a,b){this.a.aT(a,b)},
$1:function(a){return this.$2(a,null)}},
o7:{"^":"a:1;a,b,c",
$0:function(){this.a.aT(this.b,this.c)}},
o4:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a
y=z.cO()
z.a=4
z.c=this.b
P.bf(z,y)}},
o8:{"^":"a:1;a,b",
$0:function(){P.cN(this.b,this.a)}},
o3:{"^":"a:1;a,b,c",
$0:function(){this.a.aT(this.b,this.c)}},
oc:{"^":"a:4;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.j3()}catch(w){y=H.z(w)
x=H.A(w)
if(this.c){v=this.a.a.c.gb2()
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.ch(y,x)
u.a=!0
return}if(!!J.o(z).$isL){if(z instanceof P.C&&z.gcd()>=4){if(z.gcd()===8){v=this.b
v.b=z.gi4()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bG(new P.od(t))
v.a=!1}}},
od:{"^":"a:0;a",
$1:function(a){return this.a}},
ob:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.j2(this.c)}catch(x){z=H.z(x)
y=H.A(x)
w=this.a
w.b=new P.ch(z,y)
w.a=!0}}},
oa:{"^":"a:4;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.jt(z)===!0&&w.e!=null){v=this.b
v.b=w.iZ(z)
v.a=!1}}catch(u){y=H.z(u)
x=H.A(u)
w=this.a
v=w.a.c.gb2()
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.ch(y,x)
s.a=!0}}},
fG:{"^":"d;iz:a<,bY:b@"},
a4:{"^":"d;$ti",
aM:function(a,b){return new P.or(b,this,[H.v(this,"a4",0),null])},
Y:function(a,b){var z,y
z={}
y=new P.C(0,$.n,null,[P.W])
z.a=null
z.a=this.aq(new P.mm(z,this,b,y),!0,new P.mn(y),y.gbz())
return y},
J:function(a,b){var z,y
z={}
y=new P.C(0,$.n,null,[null])
z.a=null
z.a=this.aq(new P.mq(z,this,b,y),!0,new P.mr(y),y.gbz())
return y},
gk:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[P.u])
z.a=0
this.aq(new P.mw(z),!0,new P.mx(z,y),y.gbz())
return y},
gI:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[P.W])
z.a=null
z.a=this.aq(new P.ms(z,y),!0,new P.mt(y),y.gbz())
return y},
c_:function(a){var z,y,x
z=H.v(this,"a4",0)
y=H.t([],[z])
x=new P.C(0,$.n,null,[[P.G,z]])
this.aq(new P.my(this,y),!0,new P.mz(y,x),x.gbz())
return x},
bp:function(a){var z,y,x
z=H.v(this,"a4",0)
y=P.T(null,null,null,z)
x=new P.C(0,$.n,null,[[P.bA,z]])
this.aq(new P.mA(this,y),!0,new P.mB(y,x),x.gbz())
return x},
gE:function(a){var z,y
z={}
y=new P.C(0,$.n,null,[H.v(this,"a4",0)])
z.a=null
z.b=!1
this.aq(new P.mu(z,this),!0,new P.mv(z,y),y.gbz())
return y}},
mm:{"^":"a;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.h1(new P.mk(this.c,a),new P.ml(z,y),P.fR(z.a,y))},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"a4")}},
mk:{"^":"a:1;a,b",
$0:function(){return J.i(this.b,this.a)}},
ml:{"^":"a:23;a,b",
$1:function(a){if(a===!0)P.fS(this.a.a,this.b,!0)}},
mn:{"^":"a:1;a",
$0:function(){this.a.aS(!1)}},
mq:{"^":"a;a,b,c,d",
$1:function(a){P.h1(new P.mo(this.c,a),new P.mp(),P.fR(this.a.a,this.d))},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"a4")}},
mo:{"^":"a:1;a,b",
$0:function(){return this.a.$1(this.b)}},
mp:{"^":"a:0;",
$1:function(a){}},
mr:{"^":"a:1;a",
$0:function(){this.a.aS(null)}},
mw:{"^":"a:0;a",
$1:function(a){++this.a.a}},
mx:{"^":"a:1;a,b",
$0:function(){this.b.aS(this.a.a)}},
ms:{"^":"a:0;a,b",
$1:function(a){P.fS(this.a.a,this.b,!1)}},
mt:{"^":"a:1;a",
$0:function(){this.a.aS(!0)}},
my:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.a,"a4")}},
mz:{"^":"a:1;a,b",
$0:function(){this.b.aS(this.a)}},
mA:{"^":"a;a,b",
$1:function(a){this.b.n(0,a)},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.a,"a4")}},
mB:{"^":"a:1;a,b",
$0:function(){this.b.aS(this.a)}},
mu:{"^":"a;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$S:function(){return H.b_(function(a){return{func:1,args:[a]}},this.b,"a4")}},
mv:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.aS(x.a)
return}try{x=H.a7()
throw H.c(x)}catch(w){z=H.z(w)
y=H.A(w)
P.oX(this.b,z,y)}}},
cO:{"^":"d;cd:b<,$ti",
gdk:function(){return new P.cL(this,this.$ti)},
gjj:function(){return(this.b&4)!==0},
gcm:function(){var z=this.b
return(z&1)!==0?this.gbs().geO():(z&2)===0},
ghY:function(){if((this.b&8)===0)return this.a
return this.a.gcA()},
dv:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.dQ(null,null,0,this.$ti)
this.a=z}return z}y=this.a
if(y.gcA()==null)y.c=new P.dQ(null,null,0,this.$ti)
return y.c},
gbs:function(){if((this.b&8)!==0)return this.a.gcA()
return this.a},
c2:function(){if((this.b&4)!==0)return new P.F("Cannot add event after closing")
return new P.F("Cannot add event while adding a stream")},
ix:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.c2())
if((z&2)!==0){z=new P.C(0,$.n,null,[null])
z.bd(null)
return z}z=this.a
y=new P.C(0,$.n,null,[null])
x=a.aq(this.ghu(),!1,this.ghv(),this.ghr())
w=this.b
if((w&1)!==0?this.gbs().geO():(w&2)===0)x.cp()
this.a=new P.oy(z,y,x,this.$ti)
this.b|=8
return y},
eI:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b4():new P.C(0,$.n,null,[null])
this.c=z}return z},
n:[function(a,b){if(this.b>=4)throw H.c(this.c2())
this.by(b)},"$1","gil",2,0,function(){return H.b_(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cO")}],
dR:function(a,b){if(this.b>=4)throw H.c(this.c2())
if(a==null)a=new P.cx()
$.n.toString
this.bO(a,b)},
b1:function(){var z=this.b
if((z&4)!==0)return this.eI()
if(z>=4)throw H.c(this.c2())
z|=4
this.b=z
if((z&1)!==0)this.cb()
else if((z&3)===0)this.dv().n(0,C.u)
return this.eI()},
by:[function(a){var z=this.b
if((z&1)!==0)this.ca(a)
else if((z&3)===0)this.dv().n(0,new P.dK(a,null,this.$ti))},"$1","ghu",2,0,function(){return H.b_(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cO")}],
bO:[function(a,b){var z=this.b
if((z&1)!==0)this.cc(a,b)
else if((z&3)===0)this.dv().n(0,new P.dL(a,b,null))},"$2","ghr",4,0,26],
dn:[function(){var z=this.a
this.a=z.gcA()
this.b&=4294967287
z.a.bd(null)},"$0","ghv",0,0,4],
ib:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.F("Stream has already been listened to."))
z=$.n
y=d?1:0
x=new P.nX(this,null,null,null,z,y,null,null,this.$ti)
x.ey(a,b,c,d,H.k(this,0))
w=this.ghY()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scA(x)
v.b.ct()}else this.a=x
x.i9(w)
x.dC(new P.oA(this))
return x},
i1:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bU()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.z(v)
x=H.A(v)
u=new P.C(0,$.n,null,[null])
u.eB(y,x)
z=u}else z=z.bH(w)
w=new P.oz(this)
if(z!=null)z=z.bH(w)
else w.$0()
return z}},
oA:{"^":"a:1;a",
$0:function(){P.dY(this.a.d)}},
oz:{"^":"a:4;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bd(null)}},
oI:{"^":"d;$ti",
ca:function(a){this.gbs().by(a)},
cc:function(a,b){this.gbs().bO(a,b)},
cb:function(){this.gbs().dn()}},
nU:{"^":"d;$ti",
ca:function(a){this.gbs().bP(new P.dK(a,null,[H.k(this,0)]))},
cc:function(a,b){this.gbs().bP(new P.dL(a,b,null))},
cb:function(){this.gbs().bP(C.u)}},
nT:{"^":"cO+nU;a,b,c,d,e,f,r,$ti"},
oH:{"^":"cO+oI;a,b,c,d,e,f,r,$ti"},
cL:{"^":"oB;a,$ti",
gB:function(a){return(H.ar(this.a)^892482866)>>>0},
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cL))return!1
return b.a===this.a}},
nX:{"^":"c2;x,a,b,c,d,e,f,r,$ti",
dJ:function(){return this.x.i1(this)},
dL:[function(){var z=this.x
if((z.b&8)!==0)z.a.cp()
P.dY(z.e)},"$0","gdK",0,0,4],
dN:[function(){var z=this.x
if((z.b&8)!==0)z.a.ct()
P.dY(z.f)},"$0","gdM",0,0,4]},
nD:{"^":"d;$ti",
cp:function(){this.b.cp()},
ct:function(){this.b.ct()},
bU:function(){var z=this.b.bU()
if(z==null){this.a.bd(null)
return}return z.bH(new P.nE(this))},
dW:function(){this.a.bd(null)}},
nE:{"^":"a:1;a",
$0:function(){this.a.a.bd(null)}},
oy:{"^":"nD;cA:c@,a,b,$ti"},
c2:{"^":"d;cd:e<,$ti",
i9:function(a){if(a==null)return
this.r=a
if(!a.gI(a)){this.e=(this.e|64)>>>0
this.r.cD(this)}},
jz:function(a){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.f6()
if((z&4)===0&&(this.e&32)===0)this.dC(this.gdK())},
cp:function(){return this.jz(null)},
ct:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gI(z)}else z=!1
if(z)this.r.cD(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dC(this.gdM())}}}},
bU:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dq()
z=this.f
return z==null?$.$get$b4():z},
geO:function(){return(this.e&4)!==0},
gcm:function(){return this.e>=128},
dq:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.f6()
if((this.e&32)===0)this.r=null
this.f=this.dJ()},
by:["hd",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.ca(a)
else this.bP(new P.dK(a,null,[H.v(this,"c2",0)]))}],
bO:["he",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cc(a,b)
else this.bP(new P.dL(a,b,null))}],
dn:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cb()
else this.bP(C.u)},
dL:[function(){},"$0","gdK",0,0,4],
dN:[function(){},"$0","gdM",0,0,4],
dJ:function(){return},
bP:function(a){var z,y
z=this.r
if(z==null){z=new P.dQ(null,null,0,[H.v(this,"c2",0)])
this.r=z}z.n(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cD(this)}},
ca:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fM(this.a,a)
this.e=(this.e&4294967263)>>>0
this.ds((z&4)!==0)},
cc:function(a,b){var z,y
z=this.e
y=new P.nW(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dq()
z=this.f
if(!!J.o(z).$isL&&z!==$.$get$b4())z.bH(y)
else y.$0()}else{y.$0()
this.ds((z&4)!==0)}},
cb:function(){var z,y
z=new P.nV(this)
this.dq()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.o(y).$isL&&y!==$.$get$b4())y.bH(z)
else z.$0()},
dC:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.ds((z&4)!==0)},
ds:function(a){var z,y
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
if(y)this.dL()
else this.dN()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cD(this)},
ey:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.dX(b==null?P.pd():b,z)
this.c=c==null?P.pc():c}},
nW:{"^":"a:4;a,b,c",
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
if(x)w.jN(u,v,this.c)
else w.fM(u,v)
z.e=(z.e&4294967263)>>>0}},
nV:{"^":"a:4;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fK(z.c)
z.e=(z.e&4294967263)>>>0}},
oB:{"^":"a4;$ti",
aq:function(a,b,c,d){return this.a.ib(a,d,c,!0===b)},
e9:function(a,b,c){return this.aq(a,null,b,c)}},
dM:{"^":"d;bY:a@,$ti"},
dK:{"^":"dM;am:b<,a,$ti",
ea:function(a){a.ca(this.b)}},
dL:{"^":"dM;b2:b<,b0:c<,a",
ea:function(a){a.cc(this.b,this.c)},
$asdM:I.b1},
nY:{"^":"d;",
ea:function(a){a.cb()},
gbY:function(){return},
sbY:function(a){throw H.c(new P.F("No events after a done."))}},
ot:{"^":"d;cd:a<,$ti",
cD:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.ca(new P.ou(this,a))
this.a=1},
f6:function(){if(this.a===1)this.a=3}},
ou:{"^":"a:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbY()
z.b=w
if(w==null)z.c=null
x.ea(this.b)}},
dQ:{"^":"ot;b,c,a,$ti",
gI:function(a){return this.c==null},
n:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbY(b)
this.c=b}}},
oC:{"^":"d;a,b,c,$ti"},
oS:{"^":"a:1;a,b,c",
$0:function(){return this.a.aT(this.b,this.c)}},
oR:{"^":"a:13;a,b",
$2:function(a,b){P.oQ(this.a,this.b,a,b)}},
oT:{"^":"a:1;a,b",
$0:function(){return this.a.aS(this.b)}},
dN:{"^":"a4;$ti",
aq:function(a,b,c,d){return this.hD(a,d,c,!0===b)},
e9:function(a,b,c){return this.aq(a,null,b,c)},
hD:function(a,b,c,d){return P.o1(this,a,b,c,d,H.v(this,"dN",0),H.v(this,"dN",1))},
eL:function(a,b){b.by(a)},
hO:function(a,b,c){c.bO(a,b)},
$asa4:function(a,b){return[b]}},
fJ:{"^":"c2;x,y,a,b,c,d,e,f,r,$ti",
by:function(a){if((this.e&2)!==0)return
this.hd(a)},
bO:function(a,b){if((this.e&2)!==0)return
this.he(a,b)},
dL:[function(){var z=this.y
if(z==null)return
z.cp()},"$0","gdK",0,0,4],
dN:[function(){var z=this.y
if(z==null)return
z.ct()},"$0","gdM",0,0,4],
dJ:function(){var z=this.y
if(z!=null){this.y=null
return z.bU()}return},
ka:[function(a){this.x.eL(a,this)},"$1","ghL",2,0,function(){return H.b_(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fJ")}],
kc:[function(a,b){this.x.hO(a,b,this)},"$2","ghN",4,0,27],
kb:[function(){this.dn()},"$0","ghM",0,0,4],
ho:function(a,b,c,d,e,f,g){this.y=this.x.a.e9(this.ghL(),this.ghM(),this.ghN())},
$asc2:function(a,b){return[b]},
v:{
o1:function(a,b,c,d,e,f,g){var z,y
z=$.n
y=e?1:0
y=new P.fJ(a,null,null,null,null,z,y,null,null,[f,g])
y.ey(b,c,d,e,g)
y.ho(a,b,c,d,e,f,g)
return y}}},
or:{"^":"dN;b,a,$ti",
eL:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.z(w)
x=H.A(w)
P.oL(b,y,x)
return}b.by(z)}},
ch:{"^":"d;b2:a<,b0:b<",
j:function(a){return H.b(this.a)},
$isX:1},
oK:{"^":"d;"},
p3:{"^":"a:1;a,b",
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
ov:{"^":"oK;",
fK:function(a){var z,y,x,w
try{if(C.f===$.n){x=a.$0()
return x}x=P.fZ(null,null,this,a)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bi(null,null,this,z,y)
return x}},
fM:function(a,b){var z,y,x,w
try{if(C.f===$.n){x=a.$1(b)
return x}x=P.h0(null,null,this,a,b)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bi(null,null,this,z,y)
return x}},
jN:function(a,b,c){var z,y,x,w
try{if(C.f===$.n){x=a.$2(b,c)
return x}x=P.h_(null,null,this,a,b,c)
return x}catch(w){z=H.z(w)
y=H.A(w)
x=P.bi(null,null,this,z,y)
return x}},
dU:function(a,b){if(b)return new P.ow(this,a)
else return new P.ox(this,a)},
h:function(a,b){return},
fJ:function(a){if($.n===C.f)return a.$0()
return P.fZ(null,null,this,a)},
eg:function(a,b){if($.n===C.f)return a.$1(b)
return P.h0(null,null,this,a,b)},
jM:function(a,b,c){if($.n===C.f)return a.$2(b,c)
return P.h_(null,null,this,a,b,c)}},
ow:{"^":"a:1;a,b",
$0:function(){return this.a.fK(this.b)}},
ox:{"^":"a:1;a,b",
$0:function(){return this.a.fJ(this.b)}}}],["","",,P,{"^":"",
dh:function(a,b){return new H.M(0,null,null,null,null,null,0,[a,b])},
aV:function(){return new H.M(0,null,null,null,null,null,0,[null,null])},
a8:function(a){return H.q8(a,new H.M(0,null,null,null,null,null,0,[null,null]))},
jR:function(a,b,c){var z,y
if(P.dU(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bK()
y.push(a)
try{P.p_(a,z)}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=P.ff(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bR:function(a,b,c){var z,y,x
if(P.dU(a))return b+"..."+c
z=new P.bE(b)
y=$.$get$bK()
y.push(a)
try{x=z
x.t=P.ff(x.gt(),a,", ")}finally{if(0>=y.length)return H.e(y,-1)
y.pop()}y=z
y.t=y.gt()+c
y=z.gt()
return y.charCodeAt(0)==0?y:y},
dU:function(a){var z,y
for(z=0;y=$.$get$bK(),z<y.length;++z)if(a===y[z])return!0
return!1},
p_:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga_(a)
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
k3:function(a,b,c,d,e){return new H.M(0,null,null,null,null,null,0,[d,e])},
bV:function(a,b,c){var z=P.k3(null,null,null,b,c)
a.J(0,new P.pe(z))
return z},
T:function(a,b,c,d){return new P.fM(0,null,null,null,null,null,0,[d])},
aW:function(a,b){var z,y
z=P.T(null,null,null,b)
for(y=J.ab(a);y.u();)z.n(0,y.gF())
return z},
dl:function(a){var z,y,x
z={}
if(P.dU(a))return"{...}"
y=new P.bE("")
try{$.$get$bK().push(a)
x=y
x.t=x.gt()+"{"
z.a=!0
a.J(0,new P.kb(z,y))
z=y
z.t=z.gt()+"}"}finally{z=$.$get$bK()
if(0>=z.length)return H.e(z,-1)
z.pop()}z=y.gt()
return z.charCodeAt(0)==0?z:z},
fN:{"^":"M;a,b,c,d,e,f,r,$ti",
ck:function(a){return H.qm(a)&0x3ffffff},
cl:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfm()
if(x==null?b==null:x===b)return y}return-1},
v:{
bH:function(a,b){return new P.fN(0,null,null,null,null,null,0,[a,b])}}},
fM:{"^":"oe;a,b,c,d,e,f,r,$ti",
dH:function(){return new P.fM(0,null,null,null,null,null,0,this.$ti)},
ga_:function(a){var z=new P.ak(this,this.r,null,null,[null])
z.c=this.e
return z},
gk:function(a){return this.a},
gI:function(a){return this.a===0},
ga8:function(a){return this.a!==0},
Y:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hB(b)},
hB:function(a){var z=this.d
if(z==null)return!1
return this.cL(z[this.cK(a)],a)>=0},
bX:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.Y(0,a)?a:null
else return this.hS(a)},
hS:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cK(a)]
x=this.cL(y,a)
if(x<0)return
return J.ap(y,x).geH()},
J:function(a,b){var z,y
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
z=y}return this.eC(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.eC(x,b)}else return this.an(b)},
an:function(a){var z,y,x
z=this.d
if(z==null){z=P.on()
this.d=z}y=this.cK(a)
x=z[y]
if(x==null)z[y]=[this.dt(a)]
else{if(this.cL(x,a)>=0)return!1
x.push(this.dt(a))}return!0},
aO:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.eD(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eD(this.c,b)
else return this.i2(b)},
i2:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cK(a)]
x=this.cL(y,a)
if(x<0)return!1
this.eE(y.splice(x,1)[0])
return!0},
hI:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.aO(0,y)}},
aK:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
eC:function(a,b){if(a[b]!=null)return!1
a[b]=this.dt(b)
return!0},
eD:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.eE(z)
delete a[b]
return!0},
dt:function(a){var z,y
z=new P.om(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eE:function(a){var z,y
z=a.ghA()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cK:function(a){return J.j(a)&0x3ffffff},
cL:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.i(a[y].geH(),b))return y
return-1},
$isbA:1,
$isS:1,
v:{
on:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
om:{"^":"d;eH:a<,b,hA:c<"},
ak:{"^":"d;a,b,c,d,$ti",
gF:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
oe:{"^":"lI;$ti",
bp:function(a){var z=this.dH()
z.aj(0,this)
return z}},
ct:{"^":"x;$ti"},
pe:{"^":"a:6;a",
$2:function(a,b){this.a.m(0,a,b)}},
eG:{"^":"eL;$ti"},
eL:{"^":"d+aX;$ti",$asG:null,$asS:null,$isG:1,$isS:1},
aX:{"^":"d;$ti",
ga_:function(a){return new H.di(this,this.gk(this),0,null,[H.v(this,"aX",0)])},
ac:function(a,b){return this.h(0,b)},
J:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gk(this))throw H.c(new P.B(this))}},
gI:function(a){return this.gk(this)===0},
ga8:function(a){return!this.gI(this)},
gE:function(a){if(this.gk(this)===0)throw H.c(H.a7())
return this.h(0,this.gk(this)-1)},
Y:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<this.gk(this);++y){if(J.i(this.h(0,y),b))return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bT:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y))===!0)return!0
if(z!==this.gk(this))throw H.c(new P.B(this))}return!1},
bk:function(a,b,c){var z,y,x
z=this.gk(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x)===!0)return x
if(z!==this.gk(this))throw H.c(new P.B(this))}return c.$0()},
aM:function(a,b){return new H.ad(this,b,[H.v(this,"aX",0),null])},
di:function(a,b){return H.fh(this,b,null,H.v(this,"aX",0))},
bp:function(a){var z,y
z=P.T(null,null,null,H.v(this,"aX",0))
for(y=0;y<this.gk(this);++y)z.n(0,this.h(0,y))
return z},
n:function(a,b){var z=this.gk(this)
this.sk(0,z+1)
this.m(0,z,b)},
aO:function(a,b){var z
for(z=0;z<this.gk(this);++z)if(J.i(this.h(0,z),b)){this.aD(0,z,this.gk(this)-1,this,z+1)
this.sk(0,this.gk(this)-1)
return!0}return!1},
hH:function(a,b){var z,y,x,w
z=H.t([],[H.v(this,"aX",0)])
y=this.gk(this)
for(x=0;x<y;++x){w=this.h(0,x)
if(J.i(a.$1(w),b))z.push(w)
if(y!==this.gk(this))throw H.c(new P.B(this))}if(z.length!==this.gk(this)){this.h5(0,0,z.length,z)
this.sk(0,z.length)}},
aD:function(a,b,c,d,e){var z,y,x,w,v
P.cC(b,c,this.gk(this),null,null,null)
z=c-b
if(z===0)return
if(H.aE(d,"$isG",[H.v(this,"aX",0)],"$asG")){y=e
x=d}else{x=J.hR(d,e).bo(0,!1)
y=0}w=J.I(x)
if(y+z>w.gk(x))throw H.c(H.ex())
if(y<b)for(v=z-1;v>=0;--v)this.m(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.m(0,b+v,w.h(x,y+v))},
h5:function(a,b,c,d){return this.aD(a,b,c,d,0)},
j:function(a){return P.bR(this,"[","]")},
$isG:1,
$isS:1},
oJ:{"^":"d;$ti",
m:function(a,b,c){throw H.c(new P.N("Cannot modify unmodifiable map"))},
$isD:1},
k9:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
m:function(a,b,c){this.a.m(0,b,c)},
Z:function(a){return this.a.Z(a)},
J:function(a,b){this.a.J(0,b)},
gI:function(a){var z=this.a
return z.gI(z)},
ga8:function(a){var z=this.a
return z.ga8(z)},
gk:function(a){var z=this.a
return z.gk(z)},
j:function(a){return this.a.j(0)},
$isD:1},
fD:{"^":"k9+oJ;a,$ti",$asD:null,$isD:1},
kb:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.t+=", "
z.a=!1
z=this.b
y=z.t+=H.b(a)
z.t=y+": "
z.t+=H.b(b)}},
k4:{"^":"aL;a,b,c,d,$ti",
ga_:function(a){return new P.fO(this,this.c,this.d,this.b,null,this.$ti)},
J:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.e(x,y)
b.$1(x[y])
if(z!==this.d)H.h(new P.B(this))}},
gI:function(a){return this.b===this.c},
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
ac:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.h(P.cr(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.e(y,w)
return y[w]},
n:function(a,b){this.an(b)},
aj:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.$ti
if(H.aE(b,"$isG",z,"$asG")){y=b.gk(b)
x=this.gk(this)
w=x+y
v=this.a
u=v.length
if(w>=u){t=P.k5(w+(w>>>1))
if(typeof t!=="number")return H.y(t)
v=new Array(t)
v.fixed$length=Array
s=H.t(v,z)
this.c=this.ih(s)
this.a=s
this.b=0
C.a.aD(s,x,w,b,0)
this.c+=y}else{z=this.c
r=u-z
if(y<r){C.a.aD(v,z,z+y,b,0)
this.c+=y}else{q=y-r
C.a.aD(v,z,z+r,b,0)
C.a.aD(this.a,0,q,b,r)
this.c=q}}++this.d}else for(z=new P.fO(b,b.c,b.d,b.b,null,[H.k(b,0)]);z.u();)this.an(z.e)},
aK:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.e(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
j:function(a){return P.bR(this,"{","}")},
f4:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.e(y,z)
y[z]=a
if(z===this.c)this.eK();++this.d},
d1:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.a7());++this.d
y=this.a
x=y.length
if(z>=x)return H.e(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
an:function(a){var z,y,x
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
C.a.aD(y,0,w,z,x)
C.a.aD(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ih:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aD(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aD(a,0,v,x,z)
C.a.aD(a,v,v+this.c,this.a,0)
return this.c+v}},
hg:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.t(z,[b])},
v:{
aY:function(a,b){var z=new P.k4(null,0,0,0,[b])
z.hg(a,b)
return z},
k5:function(a){var z
a=C.p.ep(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
fO:{"^":"d;a,b,c,d,e,$ti",
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
lJ:{"^":"d;$ti",
gI:function(a){return this.a===0},
ga8:function(a){return this.a!==0},
aj:function(a,b){var z
for(z=J.ab(b);z.u();)this.n(0,z.gF())},
iE:function(a){var z,y
for(z=a.a,y=new P.ak(z,z.r,null,null,[null]),y.c=z.e;y.u();)if(!this.Y(0,y.d))return!1
return!0},
bo:function(a,b){var z,y,x,w,v
z=H.t([],this.$ti)
C.a.sk(z,this.a)
for(y=new P.ak(this,this.r,null,null,[null]),y.c=this.e,x=0;y.u();x=v){w=y.d
v=x+1
if(x>=z.length)return H.e(z,x)
z[x]=w}return z},
c_:function(a){return this.bo(a,!0)},
aM:function(a,b){return new H.bs(this,b,[H.k(this,0),null])},
j:function(a){return P.bR(this,"{","}")},
J:function(a,b){var z
for(z=new P.ak(this,this.r,null,null,[null]),z.c=this.e;z.u();)b.$1(z.d)},
aW:function(a,b,c){var z,y
for(z=new P.ak(this,this.r,null,null,[null]),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
gE:function(a){var z,y
z=new P.ak(this,this.r,null,null,[null])
z.c=this.e
if(!z.u())throw H.c(H.a7())
do y=z.d
while(z.u())
return y},
bk:function(a,b,c){var z,y
for(z=new P.ak(this,this.r,null,null,[null]),z.c=this.e;z.u();){y=z.d
if(b.$1(y)===!0)return y}return c.$0()},
aw:function(a,b){var z,y,x,w
for(z=new P.ak(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.u();){w=z.d
if(b.$1(w)===!0){if(x)throw H.c(H.dc())
y=w
x=!0}}if(x)return y
throw H.c(H.a7())},
$isbA:1,
$isS:1},
lI:{"^":"lJ;$ti"}}],["","",,P,{"^":"",
cQ:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.oh(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cQ(a[z])
return a},
p2:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.O(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.z(x)
w=String(y)
throw H.c(new P.eu(w,null,null))}w=P.cQ(z)
return w},
rj:[function(a){return a.d5()},"$1","q1",2,0,0],
oh:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.i0(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c4().length
return z},
gI:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c4().length
return z===0},
ga8:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.c4().length
return z>0},
m:function(a,b,c){var z,y
if(this.b==null)this.c.m(0,b,c)
else if(this.Z(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.ie().m(0,b,c)},
Z:function(a){if(this.b==null)return this.c.Z(a)
if(typeof a!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,a)},
J:function(a,b){var z,y,x,w
if(this.b==null)return this.c.J(0,b)
z=this.c4()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cQ(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
j:function(a){return P.dl(this)},
c4:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
ie:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dh(P.p,null)
y=this.c4()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.m(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
i0:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cQ(this.a[a])
return this.b[a]=z},
$isD:1,
$asD:function(){return[P.p,null]}},
ej:{"^":"d;$ti"},
cn:{"^":"d;$ti"},
dg:{"^":"X;a,b",
j:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
jX:{"^":"dg;a,b",
j:function(a){return"Cyclic error in JSON stringify"}},
jW:{"^":"ej;a,b",
iI:function(a,b){var z=P.p2(a,this.giJ().a)
return z},
iH:function(a){return this.iI(a,null)},
iR:function(a,b){var z=this.giS()
z=P.oj(a,z.b,z.a)
return z},
fd:function(a){return this.iR(a,null)},
giS:function(){return C.N},
giJ:function(){return C.M},
$asej:function(){return[P.d,P.p]}},
jZ:{"^":"cn;a,b",
$ascn:function(){return[P.d,P.p]}},
jY:{"^":"cn;a",
$ascn:function(){return[P.p,P.d]}},
ok:{"^":"d;",
fU:function(a){var z,y,x,w,v,u,t
z=J.I(a)
y=z.gk(a)
if(typeof y!=="number")return H.y(y)
x=this.c
w=0
v=0
for(;v<y;++v){u=z.cg(a,v)
if(u>92)continue
if(u<32){if(v>w)x.t+=C.b.ay(a,w,v)
w=v+1
x.t+=H.a9(92)
switch(u){case 8:x.t+=H.a9(98)
break
case 9:x.t+=H.a9(116)
break
case 10:x.t+=H.a9(110)
break
case 12:x.t+=H.a9(102)
break
case 13:x.t+=H.a9(114)
break
default:x.t+=H.a9(117)
x.t+=H.a9(48)
x.t+=H.a9(48)
t=u>>>4&15
x.t+=H.a9(t<10?48+t:87+t)
t=u&15
x.t+=H.a9(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.t+=C.b.ay(a,w,v)
w=v+1
x.t+=H.a9(92)
x.t+=H.a9(u)}}if(w===0)x.t+=H.b(a)
else if(w<y)x.t+=z.ay(a,w,y)},
dr:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.jX(a,null))}z.push(a)},
d8:function(a){var z,y,x,w
if(this.fT(a))return
this.dr(a)
try{z=this.b.$1(a)
if(!this.fT(z))throw H.c(new P.dg(a,null))
x=this.a
if(0>=x.length)return H.e(x,-1)
x.pop()}catch(w){y=H.z(w)
throw H.c(new P.dg(a,y))}},
fT:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.t+=C.i.j(a)
return!0}else if(a===!0){this.c.t+="true"
return!0}else if(a===!1){this.c.t+="false"
return!0}else if(a==null){this.c.t+="null"
return!0}else if(typeof a==="string"){z=this.c
z.t+='"'
this.fU(a)
z.t+='"'
return!0}else{z=J.o(a)
if(!!z.$isG){this.dr(a)
this.k_(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return!0}else if(!!z.$isD){this.dr(a)
y=this.k0(a)
z=this.a
if(0>=z.length)return H.e(z,-1)
z.pop()
return y}else return!1}},
k_:function(a){var z,y,x
z=this.c
z.t+="["
y=J.I(a)
if(y.gk(a)>0){this.d8(y.h(a,0))
for(x=1;x<y.gk(a);++x){z.t+=","
this.d8(y.h(a,x))}}z.t+="]"},
k0:function(a){var z,y,x,w,v,u,t
z={}
if(a.gI(a)){this.c.t+="{}"
return!0}y=a.gk(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.J(0,new P.ol(z,x))
if(!z.b)return!1
w=this.c
w.t+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.t+=v
this.fU(x[u])
w.t+='":'
t=u+1
if(t>=y)return H.e(x,t)
this.d8(x[t])}w.t+="}"
return!0}},
ol:{"^":"a:6;a,b",
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
oi:{"^":"ok;c,a,b",v:{
oj:function(a,b,c){var z,y,x
z=new P.bE("")
y=new P.oi(z,[],P.q1())
y.d8(a)
x=z.t
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
qQ:[function(a,b){return J.cd(a,b)},"$2","q2",4,0,40],
ep:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.f(a)
if(typeof a==="string")return JSON.stringify(a)
return P.jl(a)},
jl:function(a){var z=J.o(a)
if(!!z.$isa)return z.j(a)
return H.cz(a)},
cp:function(a){return new P.o0(a)},
U:function(a,b,c){var z,y
z=H.t([],[c])
for(y=J.ab(a);y.u();)z.push(y.gF())
if(b)return z
z.fixed$length=Array
return z},
k6:function(a,b,c,d){var z,y,x
z=H.t(new Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.e(z,y)
z[y]=x}return z},
e5:function(a){H.qr(H.b(a))},
b9:function(a,b,c){return new H.eD(a,H.de(a,!1,b,!1),null,null)},
W:{"^":"d;"},
"+bool":0,
Q:{"^":"d;$ti"},
co:{"^":"d;ig:a<,b",
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.co))return!1
return this.a===b.a&&!0},
bi:function(a,b){return C.d.bi(this.a,b.gig())},
gB:function(a){var z=this.a
return(z^C.d.cR(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t,s
z=P.iU(H.kU(this))
y=P.bP(H.kS(this))
x=P.bP(H.kO(this))
w=P.bP(H.kP(this))
v=P.bP(H.kR(this))
u=P.bP(H.kT(this))
t=P.iV(H.kQ(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
n:function(a,b){var z,y
z=this.a+b.gj8()
y=new P.co(z,!1)
if(!(Math.abs(z)>864e13))z=!1
else z=!0
if(z)H.h(P.E(y.gju()))
return y},
gju:function(){return this.a},
$isQ:1,
$asQ:function(){return[P.co]},
v:{
iU:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.b(z)
if(z>=10)return y+"00"+H.b(z)
return y+"000"+H.b(z)},
iV:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bP:function(a){if(a>=10)return""+a
return"0"+a}}},
aF:{"^":"J;",$isQ:1,
$asQ:function(){return[P.J]}},
"+double":0,
aU:{"^":"d;bA:a<",
a5:function(a,b){return new P.aU(this.a+b.gbA())},
aF:function(a,b){return new P.aU(this.a-b.gbA())},
bL:function(a,b){return new P.aU(C.i.ef(this.a*b))},
aC:function(a,b){return C.d.aC(this.a,b.gbA())},
bw:function(a,b){return this.a>b.gbA()},
bK:function(a,b){return C.d.bK(this.a,b.gbA())},
bv:function(a,b){return C.d.bv(this.a,b.gbA())},
gj8:function(){return C.d.bt(this.a,1000)},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.aU))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
bi:function(a,b){return C.d.bi(this.a,b.gbA())},
j:function(a){var z,y,x,w,v
z=new P.j4()
y=this.a
if(y<0)return"-"+new P.aU(0-y).j(0)
x=z.$1(C.d.bt(y,6e7)%60)
w=z.$1(C.d.bt(y,1e6)%60)
v=new P.j3().$1(y%1e6)
return""+C.d.bt(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
eo:function(a){return new P.aU(0-this.a)},
$isQ:1,
$asQ:function(){return[P.aU]}},
j3:{"^":"a:10;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
j4:{"^":"a:10;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
X:{"^":"d;",
gb0:function(){return H.A(this.$thrownJsError)}},
cx:{"^":"X;",
j:function(a){return"Throw of null."}},
aT:{"^":"X;a,b,i:c<,d",
gdz:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdw:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdz()+y+x
if(!this.a)return w
v=this.gdw()
u=P.ep(this.b)
return w+v+": "+H.b(u)},
v:{
E:function(a){return new P.aT(!1,null,null,a)},
cg:function(a,b,c){return new P.aT(!0,a,b,c)},
m:function(a){return new P.aT(!1,null,a,"Must not be null")}}},
dv:{"^":"aT;e,f,a,b,c,d",
gdz:function(){return"RangeError"},
gdw:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
v:{
kY:function(a){return new P.dv(null,null,!1,null,null,a)},
bX:function(a,b,c){return new P.dv(null,null,!0,a,b,"Value not in range")},
V:function(a,b,c,d,e){return new P.dv(b,c,!0,a,d,"Invalid value")},
kZ:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.V(a,b,c,d,e))},
cC:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.V(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.V(b,a,c,"end",f))
return b}}},
jG:{"^":"aT;e,k:f>,a,b,c,d",
gdz:function(){return"RangeError"},
gdw:function(){if(J.cc(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
v:{
cr:function(a,b,c,d,e){var z=e!=null?e:J.aB(b)
return new P.jG(b,z,!0,a,c,"Index out of range")}}},
N:{"^":"X;a",
j:function(a){return"Unsupported operation: "+this.a}},
as:{"^":"X;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
F:{"^":"X;a",
j:function(a){return"Bad state: "+this.a}},
B:{"^":"X;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.ep(z))+"."}},
kq:{"^":"d;",
j:function(a){return"Out of Memory"},
gb0:function(){return},
$isX:1},
f8:{"^":"d;",
j:function(a){return"Stack Overflow"},
gb0:function(){return},
$isX:1},
iT:{"^":"X;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.b(z)+"' during its initialization"}},
o0:{"^":"d;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eu:{"^":"d;a,b,c",
j:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.ay(x,0,75)+"..."
return y+"\n"+x}},
jm:{"^":"d;i:a<,eP,$ti",
j:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.eP
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.h(P.cg(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.du(b,"expando$values")
return y==null?null:H.du(y,z)},
m:function(a,b,c){var z,y
z=this.eP
if(typeof z!=="string")z.set(b,c)
else{y=H.du(b,"expando$values")
if(y==null){y=new P.d()
H.eR(b,"expando$values",y)}H.eR(y,z,c)}}},
bu:{"^":"d;"},
u:{"^":"J;",$isQ:1,
$asQ:function(){return[P.J]}},
"+int":0,
x:{"^":"d;$ti",
aM:function(a,b){return H.bv(this,b,H.v(this,"x",0),null)},
bI:["ex",function(a,b){return new H.H(this,b,[H.v(this,"x",0)])}],
Y:function(a,b){var z
for(z=this.ga_(this);z.u();)if(J.i(z.gF(),b))return!0
return!1},
J:function(a,b){var z
for(z=this.ga_(this);z.u();)b.$1(z.gF())},
aW:function(a,b,c){var z,y
for(z=this.ga_(this),y=b;z.u();)y=c.$2(y,z.gF())
return y},
bo:function(a,b){return P.U(this,b,H.v(this,"x",0))},
c_:function(a){return this.bo(a,!0)},
bp:function(a){return P.aW(this,H.v(this,"x",0))},
gk:function(a){var z,y
z=this.ga_(this)
for(y=0;z.u();)++y
return y},
gI:function(a){return!this.ga_(this).u()},
ga8:function(a){return!this.gI(this)},
di:function(a,b){return H.lK(this,b,H.v(this,"x",0))},
gE:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.a7())
do y=z.gF()
while(z.u())
return y},
gbN:function(a){var z,y
z=this.ga_(this)
if(!z.u())throw H.c(H.a7())
y=z.gF()
if(z.u())throw H.c(H.dc())
return y},
ac:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(P.m("index"))
if(b<0)H.h(P.V(b,0,null,"index",null))
for(z=this.ga_(this),y=0;z.u();){x=z.gF()
if(b===y)return x;++y}throw H.c(P.cr(b,this,"index",null,y))},
j:function(a){return P.jR(this,"(",")")}},
cu:{"^":"d;$ti"},
G:{"^":"d;$ti",$isx:1,$isS:1},
"+List":0,
D:{"^":"d;$ti"},
ae:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
J:{"^":"d;",$isQ:1,
$asQ:function(){return[P.J]}},
"+num":0,
d:{"^":";",
w:function(a,b){return this===b},
gB:function(a){return H.ar(this)},
j:function(a){return H.cz(this)},
gb8:function(a){return new H.aj(H.hj(this),null)},
toString:function(){return this.j(this)}},
b6:{"^":"d;"},
bA:{"^":"S;$ti"},
aN:{"^":"d;"},
p:{"^":"d;",$isQ:1,
$asQ:function(){return[P.p]},
$isdr:1},
"+String":0,
bE:{"^":"d;t<",
gk:function(a){return this.t.length},
gI:function(a){return this.t.length===0},
ga8:function(a){return this.t.length!==0},
j:function(a){var z=this.t
return z.charCodeAt(0)==0?z:z},
v:{
ff:function(a,b,c){var z=J.ab(b)
if(!z.u())return a
if(c.length===0){do a+=H.b(z.gF())
while(z.u())}else{a+=H.b(z.gF())
for(;z.u();)a=a+c+H.b(z.gF())}return a},
mE:function(a){return new P.bE(a)}}}}],["","",,P,{"^":"",eZ:{"^":"d;"}}],["","",,P,{"^":"",
cA:function(a){return C.F},
og:{"^":"d;",
ae:function(a){if(a<=0||a>4294967296)throw H.c(P.kY("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
fu:function(){return Math.random()}}}],["","",,S,{"^":"",iJ:{"^":"d;a,b,$ti",
h:function(a,b){return this.b.h(0,b)},
Z:function(a){return this.b.Z(a)},
J:function(a,b){return this.b.J(0,b)},
gI:function(a){var z=this.b
return z.gI(z)},
ga8:function(a){var z=this.b
return z.ga8(z)},
gk:function(a){var z=this.b
return z.gk(z)},
m:function(a,b,c){this.hC()
this.b.m(0,b,c)},
j:function(a){return J.f(this.b)},
hC:function(){if(!this.a)return
this.a=!1
this.b=P.bV(this.b,H.k(this,0),H.k(this,1))},
$isD:1}}],["","",,A,{"^":"",iK:{"^":"d;a,b,$ti",
gk:function(a){return this.b.a},
bX:function(a){return this.b.bX(a)},
Y:function(a,b){return this.b.Y(0,b)},
J:function(a,b){return this.b.J(0,b)},
gI:function(a){return this.b.a===0},
ga8:function(a){return this.b.a!==0},
ga_:function(a){var z,y
z=this.b
y=new P.ak(z,z.r,null,null,[null])
y.c=z.e
return y},
gE:function(a){var z=this.b
return z.gE(z)},
aM:function(a,b){var z=this.b
z.toString
return new H.bs(z,b,[H.k(z,0),null])},
bp:function(a){var z,y
z=this.b
y=z.dH()
y.aj(0,z)
return y},
n:function(a,b){this.hU()
return this.b.n(0,b)},
j:function(a){return J.f(this.b)},
hU:function(){if(!this.a)return
this.a=!1
this.b=P.aW(this.b,H.k(this,0))},
$isbA:1,
$isS:1}}],["","",,S,{"^":"",d3:{"^":"d;eR:a<,b,$ti",
a7:function(a){var z=new S.aK(null,null,this.$ti)
z.aR()
z.p(this)
a.$1(z)
return z.q()},
gB:function(a){var z=this.b
if(z==null){z=X.bm(this.a)
this.b=z}return z},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isd3)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.i(w,x[v]))return!1}return!0},
j:function(a){return J.f(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gk:function(a){return this.a.length},
ga_:function(a){var z=this.a
return new J.bN(z,z.length,0,null,[H.k(z,0)])},
aM:function(a,b){var z=this.a
z.toString
return new H.ad(z,b,[H.k(z,0),null])},
Y:function(a,b){var z=this.a
return(z&&C.a).Y(z,b)},
J:function(a,b){var z=this.a
return(z&&C.a).J(z,b)},
bp:function(a){var z=this.a
z.toString
return P.aW(z,H.k(z,0))},
gI:function(a){return this.a.length===0},
ga8:function(a){return this.a.length!==0},
gE:function(a){var z=this.a
return(z&&C.a).gE(z)},
aR:function(){if(new H.aj(H.R(H.k(this,0)),null).w(0,C.l))throw H.c(new P.N('explicit element type required, for example "new BuiltList<int>"'))}},aK:{"^":"d;eR:a<,b,$ti",
q:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.d3(z,null,this.$ti)
y.aR()
this.a=z
this.b=y
z=y}return z},
p:function(a){if(H.aE(a,"$isd3",this.$ti,null)){this.a=a.geR()
this.b=a}else{this.a=P.U(a,!0,H.k(this,0))
this.b=null}},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z
if(c==null)H.h(P.E("null element"))
z=this.geY()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
n:function(a,b){var z
if(b==null)H.h(P.E("null element"))
z=this.geY();(z&&C.a).n(z,b)},
aM:function(a,b){var z=this.a
z.toString
z=new H.ad(z,b,[H.k(z,0),null]).bo(0,!0)
this.a=z
this.b=null
this.hx(z)},
geY:function(){if(this.b!=null){this.a=P.U(this.a,!0,H.k(this,0))
this.b=null}return this.a},
aR:function(){if(new H.aj(H.R(H.k(this,0)),null).w(0,C.l))throw H.c(new P.N('explicit element type required, for example "new ListBuilder<int>"'))},
hx:function(a){var z,y,x,w
for(z=a.length,y=H.k(this,0),x=0;x<a.length;a.length===z||(0,H.ao)(a),++x){w=a[x]
if(!H.cT(w,y))throw H.c(P.E("invalid element: "+H.b(w)))}}}}],["","",,A,{"^":"",ck:{"^":"d;hT:a<,b,c,d,$ti",
a7:function(a){var z=new A.dk(null,null,this.$ti)
z.c8()
z.p(this)
a.$1(z)
return z.q()},
A:function(){return new S.iJ(!0,this.a,this.$ti)},
gB:function(a){var z=this.b
if(z==null){z=this.a.gbV()
z=H.bv(z,new A.iu(this),H.v(z,"x",0),null)
z=P.U(z,!1,H.v(z,"x",0))
C.a.es(z)
z=X.bm(z)
this.b=z}return z},
w:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isck)return!1
y=b.a
x=this.a
if(y.gk(y)!==x.gk(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbV()
this.c=z}z=z.ga_(z)
for(;z.u();){v=z.gF()
if(!J.i(y.h(0,v),x.h(0,v)))return!1}return!0},
j:function(a){return J.f(this.a)},
h:function(a,b){return this.a.h(0,b)},
J:function(a,b){this.a.J(0,b)},
gI:function(a){var z=this.a
return z.gI(z)},
ga8:function(a){var z=this.a
return z.ga8(z)},
gk:function(a){var z=this.a
return z.gk(z)},
c8:function(){if(new H.aj(H.R(H.k(this,0)),null).w(0,C.l))throw H.c(new P.N('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aj(H.R(H.k(this,1)),null).w(0,C.l))throw H.c(new P.N('explicit value type required, for example "new BuiltMap<int, int>"'))}},iu:{"^":"a:0;a",
$1:function(a){var z,y
z=J.j(a)
y=J.j(this.a.a.h(0,a))
return X.cR(X.aR(X.aR(0,J.j(z)),J.j(y)))}},dk:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new A.ck(this.a,null,null,null,this.$ti)
z.c8()
this.b=z}return z},
p:function(a){var z
if(H.aE(a,"$isck",this.$ti,null)){this.b=a
this.a=a.ghT()}else if(!!a.$isck){z=P.bV(a.a,H.k(this,0),H.k(this,1))
this.b=null
this.a=z}else if(!!a.$isD){z=P.bV(a,H.k(this,0),H.k(this,1))
this.b=null
this.a=z}else throw H.c(P.E("expected Map or BuiltMap, got "+H.b(a.gb8(a))))},
h:function(a,b){return this.a.h(0,b)},
m:function(a,b,c){if(c==null)H.h(P.E("null value"))
this.gi5().m(0,b,c)},
gi5:function(){if(this.b!=null){this.a=P.bV(this.a,H.k(this,0),H.k(this,1))
this.b=null}return this.a},
c8:function(){if(new H.aj(H.R(H.k(this,0)),null).w(0,C.l))throw H.c(new P.N('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aj(H.R(H.k(this,1)),null).w(0,C.l))throw H.c(new P.N('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",d4:{"^":"d;i7:a<,b,$ti",
a7:function(a){var z=new L.ba(null,null,this.$ti)
z.be()
z.p(this)
a.$1(z)
return z.q()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.U(new H.bs(z,new L.iv(),[H.k(z,0),null]),!1,null)
C.a.es(z)
z=X.bm(z)
this.b=z}return z},
w:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.o(b)
if(!z.$isd4)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gB(b)
x=this.gB(this)
if(z==null?x!=null:z!==x)return!1
return y.iE(b)},
j:function(a){return J.f(this.a)},
gk:function(a){return this.a.a},
bX:function(a){return this.a.bX(a)},
ga_:function(a){var z,y
z=this.a
y=new P.ak(z,z.r,null,null,[null])
y.c=z.e
return y},
aM:function(a,b){var z=this.a
z.toString
return new H.bs(z,b,[H.k(z,0),null])},
Y:function(a,b){return this.a.Y(0,b)},
J:function(a,b){return this.a.J(0,b)},
bp:function(a){return new A.iK(!0,this.a,this.$ti)},
gI:function(a){return this.a.a===0},
ga8:function(a){return this.a.a!==0},
gE:function(a){var z=this.a
return z.gE(z)},
be:function(){if(new H.aj(H.R(H.k(this,0)),null).w(0,C.l))throw H.c(new P.N('explicit element type required, for example "new BuiltSet<int>"'))}},iv:{"^":"a:0;",
$1:function(a){return J.j(a)}},ba:{"^":"d;a,b,$ti",
q:function(){var z=this.b
if(z==null){z=new L.d4(this.a,null,this.$ti)
z.be()
this.b=z}return z},
p:function(a){var z,y,x,w
if(H.aE(a,"$isd4",this.$ti,null)){this.a=a.gi7()
this.b=a}else{z=H.k(this,0)
y=P.T(null,null,null,z)
for(x=J.ab(a);x.u();){w=x.gF()
if(H.cT(w,z))y.n(0,w)
else throw H.c(P.E("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
n:function(a,b){if(b==null)H.h(P.E("null element"))
this.geZ().n(0,b)},
aM:function(a,b){var z=this.a
z.toString
z=P.aW(new H.bs(z,b,[H.k(z,0),null]),null)
this.b=null
this.a=z
this.i8(z)},
geZ:function(){if(this.b!=null){this.a=P.aW(this.a,H.k(this,0))
this.b=null}return this.a},
be:function(){if(new H.aj(H.R(H.k(this,0)),null).w(0,C.l))throw H.c(new P.N('explicit element type required, for example "new SetBuilder<int>"'))},
i8:function(a){var z,y,x
for(z=new P.ak(a,a.r,null,null,[null]),z.c=a.e,y=H.k(this,0);z.u();){x=z.d
if(!H.cT(x,y))throw H.c(P.E("invalid element: "+H.b(x)))}}}}],["","",,Y,{"^":"",
l:function(a,b){if(typeof b!=="number")return H.y(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
a0:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",ll:{"^":"lj;ch,cx,ap:cy@,bc:db@,bb:dx@,b,c,d,e,f,r,x,y,z,Q,a",
fD:function(){var z=$.$get$cb()
z.m(0,"game",this.cx)
z.m(0,"hitpoints",this.cy)
z.m(0,"stamina",this.db)
z.m(0,"gold",this.dx)},
ja:function(){var z,y,x,w
this.cx=null
this.cy=Z.bC("Health",new N.lo(),"#CCCCCC","Your physical state",100,0,!0,P.aF)
z=P.u
this.db=Z.bC("Stamina",new N.lp(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bC("Gold",new N.lq(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bL()
x=this.cy
w=this.db
y=new O.eo(N.b5("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.ai(H.t([],[Y.a3]),0,P.aV()),x,w,z,O.qx(),O.qw(),O.qv(),y,this.gh8(),new P.bE(""),!1,null)
y.h6()
this.cx=y
y.x="endGame"
$.$get$c8().n(0,0)},
hj:function(){var z,y
z=new O.cG([[null,P.a8(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.m(0,"start",z)
z.a="start"
z=new O.cG([new N.ln(this),[null,P.a8(["goto","gameLoop"])]],0,null,!1,!1)
y.m(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cG(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.m(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
v:{
lm:function(){var z,y,x,w
z=Z.bC("Health",new N.pI(),"#CCCCCC","Your physical state",100,0,!0,P.aF)
y=P.u
x=Z.bC("Stamina",new N.pJ(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bC("Gold",new N.pK(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.p
z=new N.ll("net.filiph.edgehead.0.0.1",null,z,x,y,new O.lr(new H.M(0,null,null,null,null,null,0,[w,O.cG])),null,null,null,P.T(null,null,null,w),!1,null,-9999,null,null,null)
z.hj()
return z}}},pI:{"^":"a:15;",
$1:function(a){var z=J.o(a)
if(z.w(a,0))return"\ud83d\udc80"
if(z.bK(a,0.5))return"\ud83d\ude23"
if(z.aC(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},pJ:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},pK:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},ln:{"^":"a:16;a",
$0:function(){var z=0,y=P.aq(),x=this
var $async$$0=P.an(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:z=2
return P.al(x.a.cx.b7(),$async$$0)
case 2:return P.av(null,y)}})
return P.aw($async$$0,y)}},lo:{"^":"a:15;",
$1:function(a){var z=J.o(a)
if(z.w(a,0))return"\ud83d\udc80"
if(z.bK(a,0.5))return"\ud83d\ude23"
if(z.aC(a,1))return"\ud83d\ude27"
return"\ud83d\ude10"}},lp:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},lq:{"^":"a:8;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",bQ:{"^":"d;"},jj:{"^":"d;"},nr:{"^":"bQ;a,b",
a7:function(a){var z=new M.dH(null,!1,0)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.bQ))return!1
return this.a===b.a&&this.b===b.b},
gB:function(a){return Y.a0(Y.l(Y.l(0,C.K.gB(this.a)),this.b&0x1FFFFFFF))},
j:function(a){return"EdgeheadGlobalState {hasKegOfBeer="+String(this.a)+",\nbloodrockFollowers="+C.d.j(this.b)+",\n}"}},dH:{"^":"jj;c,a,b",
gbx:function(){var z=this.c
if(z!=null){this.a=z.a
this.b=this.c.b
this.c=null}return this},
p:function(a){this.c=a},
q:function(){var z,y
z=this.c
if(z==null){this.gbx()
y=this.a
this.gbx()
z=new M.nr(y,this.b)}this.p(z)
return z}}}],["","",,O,{"^":"",
rn:[function(a){var z,y
z=a.gbM()
y=a.gbD()
if(typeof y!=="number")return H.y(y)
return z-2*y},"$1","cW",2,0,21],
rt:[function(a){var z,y,x
z=a.gbM()
y=a.gcu()
if(typeof y!=="number")return H.y(y)
x=a.gbD()
if(typeof x!=="number")return H.y(x)
return z+y-x},"$1","hb",2,0,21],
eo:{"^":"k8;y,z,Q,ch,cx,cy,db,dx,dy,bq:fr<,fx,eu:fy<,ap:go<,bc:id<,bb:k1<,a,b,c,d,e,f,r,x",
h6:function(){var z,y,x,w,v,u
z=$.$get$b2()
y=$.$get$cV()
this.cy=R.bq(1000,"orc",O.cW(),null,new U.bF(!1,10,!0,z,"sword",C.c),null,0,2,0,!1,2,!1,C.t,0,y)
this.db=R.bq(1001,"goblin",O.cW(),null,new U.bF(!1,10,!0,z,"scimitar",C.c),null,0,1,0,!1,1,!1,C.t,0,y)
y=new S.aK(null,null,[Q.w])
y.aR()
y.p([new Q.w("start_of_book","","",null)])
this.dx=new K.bZ(y.q(),"preStartBook",new O.jb(),new O.jc(),null,null,"ground")
y=R.bq(1,"Filip",null,"preStartBook",new U.bF(!1,10,!0,z,"sword",C.c),null,0,2,1000,!0,2,!1,C.z,1,null)
this.ch=y
x=y.r
y=y.cy
if(typeof x!=="number")return x.cC()
if(typeof y!=="number")return H.y(y)
this.go.sam(x/y)
this.id.sam(this.ch.fy)
this.k1.sam(this.ch.x)
this.cx=R.bq(100,"Briana",null,this.dx.b,new U.bF(!1,10,!0,z,"longsword",C.c),this.ch.y,0,2,0,!1,2,!1,C.W,0,null)
this.dy=F.eV(this.dx,!1)
z=K.bZ
w=P.U($.$get$h4(),!0,z)
C.a.aj(w,[this.dx,$.$get$e0()])
v=new M.dH(null,!1,0).q()
y=this.ch
x=this.cx
u=this.dy
x=P.aW([y,x],R.P)
y=P.aY(null,O.ce)
u=new A.at(x,P.T(null,null,null,U.db),v,y,P.aW(w,z),P.U([u],!0,S.ag),0,null)
this.fr=u
z=new Y.ai(H.t([],[Y.a3]),0,P.aV())
z.b=u.r
this.fx=new B.bw(u,null,z,1,1,!0,!1,!1,0)},
cz:function(){var z=0,y=P.aq(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$cz=P.an(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.giQ()
if(v.fA(u)){z=1
break}t=w.fr.ah(w.ch.y)
s=t.gap()
r=t.gfs()
if(typeof s!=="number"){x=s.cC()
z=1
break}if(typeof r!=="number"){x=H.y(r)
z=1
break}w.go.sam(s/r)
w.id.sam(t.gbc())
w.k1.sam(t.gbb())
r=w.y
r.fo("update() for world at time "+w.fr.r)
s=w.fr.f
if(s.length===0){w.r=!0
v.G(0,"\n\n",!0)
if(w.fr.j5(w.ch.y))v.G(0,"TO BE CONTINUED.",!0)
else v.G(0,"You died.",!0)
w.f.t+=v.cr()
z=1
break}q=C.a.gE(s)
p=q.da(w.fr)
s=w.fr
o=N.b5("ActorPlanner")
n=new H.M(0,null,null,null,null,null,0,[null,null])
m=p==null
l=m?p:p.gl()
k=new Y.ai(H.t([],[Y.a3]),0,P.aV())
k.b=s.r
j=new G.hW(o,l,new B.bw(s,null,k,1,1,!0,!1,!1,0),0,!1,n)
if(m)H.h(P.E("Called ActorPlanner with actor == null. That may mean that a Situation returns getCurrentActor as null. Some action that you added should make sure it removes the Situation. World: "+J.f(s)+". Situation: "+H.b(s.giG())))
z=3
return P.al(j.jB(),$async$cz)
case 3:if(n.gI(n)){o.ek("There are no actions available for actorId="+H.b(l)+".")
m="Actions not available for "+H.b(l)+" and "
l=J.o(s)
s="PlanConsequence<"+l.gB(s)+", "+l.j(s)+", "+C.p.j(null)
o.bu(m+(s+", 1, 0, >")+".")}s=Z.kx(n)
i=new Z.kw(new P.fD(n,[null,null]),s)
if(n.gI(n))$.$get$bx().ek("Created with no recommendations.")
if(s.length===0){r.df("No recommendation for "+H.b(p.gi()))
r.df(new O.je(w))
w.fr.fc(q.gl());++w.fr.r
z=1
break}z=p.gK()===!0?4:6
break
case 4:u=s.length
if(u>1)for(h=0;o=s.length,h<o;o===u||(0,H.ao)(s),++h);w.f.t+=v.cr()
C.a.sk(v.a,0)
r.bu("planner.generateTable for "+H.b(p.gi()))
j.el().J(0,new O.jf(w))
v=i.fC(6,O.hb())
v.toString
g=P.U(v,!1,H.v(v,"x",0))
v=new O.jg(new O.ji())
u=g.length-1
if(u-0<=32)H.f7(g,0,u,v)
else H.f6(g,0,u,v)
for(v=g.length,u=w.c,h=0;h<g.length;g.length===v||(0,H.ao)(g),++h){f=g[h]
u.$3$helpMessage$script(f.gX(),f.gV(),new O.jh(w,p,f))}z=1
break
z=5
break
case 6:s=p.gfb()
z=7
return P.al(w.c1(i.jA(s==null?O.hb():s),p,v),$async$cz)
case 7:case 5:v.fA(u)
case 1:return P.av(x,y)}})
return P.aw($async$cz,y)},
c1:function(a,b,c){var z=0,y=P.aq(),x,w=this,v,u,t
var $async$c1=P.an(function(d,e){if(d===1)return P.au(e,y)
while(true)switch(z){case 0:v=a.cS(b,w.fx,w.fr)
u=P.U(v,!0,H.v(v,"x",0))
z=b.gK()===!0?3:5
break
case 3:z=6
return P.al(w.cJ(a,b,u),$async$c1)
case 6:z=4
break
case 5:t=S.kV(new H.ad(u,new O.j8(),[H.k(u,0),null]),1)
if(t>=u.length){x=H.e(u,t)
z=1
break}w.fx=u[t]
case 4:C.a.aj(c.a,w.fx.geu().a)
w.fr=w.fx.gbq()
v=w.y
v.bu(new O.j9(a,b))
v.a3(new O.ja(w,b))
case 1:return P.av(x,y)}})
return P.aw($async$c1,y)},
cJ:function(a,b,c){var z=0,y=P.aq(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cJ=P.an(function(d,e){if(d===1)return P.au(e,y)
while(true)switch(z){case 0:w=a.M(b,x.fr)
z=w===1?2:4
break
case 2:x.fx=C.a.gbN(c)
z=3
break
case 4:z=w===0?5:7
break
case 5:x.fx=C.a.gbN(c)
z=6
break
case 7:v=C.a.gE(J.f(a.gS()).split("."))
u=a.ai(b,x.fr)
t=a.gT()&&b.j6(a.gS())
s="use "+H.b(v)
x.eU()
z=8
return P.al(x.e.$4$rerollEffectDescription$rerollable(w,u,s,t),$async$cJ)
case 8:r=e
t=new H.H(c,new O.j5(r),[H.k(c,0)])
x.fx=t.gbN(t)
if(r.gjZ()===!0){q=A.dG(x.fx.gbq())
q.a6(b.gl(),new O.j6())
u=x.fx
t=u.gf0()
s=H.t([],[Y.a3])
p=new Y.ai(s,0,P.aV())
C.a.aj(s,u.c.a)
s=u.d
o=u.e
n=u.f
m=u.r
l=u.x
u=u.y
p.b=q.r
x.fx=new B.bw(q,t,p,s,o,n,m,l,u)}case 6:case 3:return P.av(null,y)}})
return P.aw($async$cJ,y)}},
jb:{"^":"a:9;",
$3:function(a,b,c){return c.G(0,"UNUSED because this is the first choice",!0)}},
jc:{"^":"a:9;",
$3:function(a,b,c){return H.h(new P.F("Room isn't to be revisited"))}},
je:{"^":"a:1;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.ad(z,new O.jd(),[H.k(z,0),null]).cn(0," <- ")}},
jd:{"^":"a:0;",
$1:function(a){return a.gaU()}},
jf:{"^":"a:0;a",
$1:function(a){return this.a.y.bu(a)}},
ji:{"^":"a:30;",
$1:function(a){if(a instanceof Q.K)return H.b(a.b.gi())+" "+a.gX()
return"ZZZZZZ "+a.gX()}},
jg:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.cd(z.$1(a),z.$1(b))}},
jh:{"^":"a:16;a,b,c",
$0:function(){var z=0,y=P.aq(),x=this,w
var $async$$0=P.an(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.al(w.c1(x.c,x.b,w.fy),$async$$0)
case 2:return P.av(null,y)}})
return P.aw($async$$0,y)}},
j8:{"^":"a:0;",
$1:function(a){return a.gjC()}},
j9:{"^":"a:1;a,b",
$0:function(){return H.b(this.b.gi())+" selected "+this.a.gi()}},
ja:{"^":"a:1;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.ad(z,new O.j7(),[H.k(z,0),null]).cn(0," <- ")
return"- how "+H.b(this.b.gi())+" got here: "+y}},
j7:{"^":"a:0;",
$1:function(a){return a.gaU()}},
j5:{"^":"a:0;a",
$1:function(a){return a.ge5()===this.a.ge5()}},
j6:{"^":"a:0;",
$1:function(a){var z=a.gbc()
if(typeof z!=="number")return z.aF()
a.sbc(z-1)
return a}}}],["","",,Q,{"^":"",
hf:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$hf(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gE(t):null
s=J.hU(t.aQ(y.a,y),new Q.qb(z))
t=J.ab(s.a),r=new H.fE(t,s.b,[H.k(s,0)])
case 2:if(!r.u()){w=3
break}q=t.gF()
p=x.$1(q)
if(p.gW()&&!z.e0(q,y)){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
hg:function(a,b,c){return P.aQ(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$hg(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dd((t.length!==0?C.a.gE(t):null).gbj()).giU().a,t=new J.bN(t,t.length,0,null,[H.k(t,0)])
case 2:if(!t.u()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aO()
case 1:return P.aP(u)}}})},
qb:{"^":"a:0;a",
$1:function(a){return!J.i(a,this.a)&&a.gb3()}},
ac:{"^":"d;",
cS:function(a,b,c){var z=this
return P.aQ(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cS(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.M(y,x.gbq())
v=s>0?2:3
break
case 2:r=A.dG(w)
v=4
return B.eO(r,x,z,z.ht(r,y,w,z.gN(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dG(w)
v=7
return B.eO(r,x,z,z.hs(r,y,w,z.gP(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aO()
case 1:return P.aP(t)}}})},
eA:function(a,b,c,d,e,f){var z,y,x,w,v,u
a.x=this
z=a.a.aw(0,new Q.hV(b))
y=new O.eb(null,null,null,null,null,null,null,null,null,null,null)
x=this.gi()
y.ga1().c=x
x=b.gl()
y.ga1().f=x
y.ga1().e=C.O
y.ga1().Q=f
y.ga1().z=e
x=this.gW()
y.ga1().y=x
if(!!this.$isK){x=y.ga1()
w=x.r
if(w==null){w=new L.ba(null,null,[P.u])
w.be()
w.p(C.h)
x.r=w
x=w}else x=w
w=this.b.gl()
if(w==null)H.h(P.E("null element"))
x.geZ().n(0,w)}v=new Y.ai(H.t([],[Y.a3]),0,P.aV())
x=a.f
u=(x.length!==0?C.a.gE(x):null).gl()
a.gB(a);(x.length!==0?C.a.gE(x):null).fz(a,v)
this.a=d.$3(z,a,v)
if(a.cM(u)!=null)a.fc(u);++a.r
w=a.en(u)
if(!(w==null))w.fw(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gE(x):null
if((w==null?w:w.da(a))!=null){w=x.length!==0?C.a.gE(x):null
w=!J.i(w==null?w:w.dg(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gE(x):null)==null)break
C.a.gE(x).b5(a)
C.a.bn(x)}if(this.a==null)H.h(new P.F("No description given when executing "+this.j(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga1().d=x
x=a.r
y.ga1().x=x
a.d.f4(y.q())
return v},
ht:function(a,b,c,d,e){return this.eA(a,b,c,d,!1,e)},
hs:function(a,b,c,d,e){return this.eA(a,b,c,d,e,!1)}},
hV:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a.gl())}},
K:{"^":"ac;bD:b<",
gX:function(){var z=new Y.ai(H.t([],[Y.a3]),0,P.aV())
z.io(0,this.gab(),this.b)
return z.cr()},
ai:function(a,b){var z=new Y.ai(H.t([],[Y.a3]),0,P.aV())
z.is(0,this.gaf(),this.b,a,!0)
return z.cr()},
j:function(a){var z=this.b
return"EnemyTargetAction<"+this.gab()+"::enemy="+H.b(z.gl())+"/"+H.b(z.gi())+">"}},
cq:{"^":"ac;",
gX:function(){return this.b.gX()},
j:function(a){return"ExitAction<"+this.b.gX()+">"}},
l5:{"^":"d;a,b",
j:function(a){return this.b},
v:{"^":"r5<"}}}],["","",,O,{"^":"",ce:{"^":"d;",
j:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.c)+">"}},k_:{"^":"d;a,b",
j:function(a){return this.b}},no:{"^":"ce;a,f2:b<,aU:c<,d,ec:e<,ew:f<,O:r<,fR:x<,y,fS:z<",
a7:function(a){var z=new O.eb(null,null,null,null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)))},
j:function(a){return"ActionRecord {accomplices="+J.f(this.a)+",\nactionName="+J.f(this.b)+",\ndescription="+H.b(J.f(this.c))+",\nknownTo="+J.f(this.d)+",\nprotagonist="+H.b(J.f(this.e))+",\nsufferers="+J.f(this.f)+",\ntime="+J.f(this.r)+",\nwasAggressive="+J.f(this.x)+",\nwasFailure="+J.f(this.y)+",\nwasSuccess="+J.f(this.z)+",\n}"}},eb:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q",
gf2:function(){return this.ga1().c},
gaU:function(){return this.ga1().d},
gec:function(){return this.ga1().f},
gew:function(){var z,y
z=this.ga1()
y=z.r
if(y==null){y=new L.ba(null,null,[P.u])
y.be()
y.p(C.h)
z.r=y
z=y}else z=y
return z},
gO:function(){return this.ga1().x},
gfR:function(){return this.ga1().y},
gfS:function(){return this.ga1().Q},
ga1:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.ba(null,null,[H.k(z,0)])
y.be()
y.p(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new L.ba(null,null,[H.k(z,0)])
y.be()
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
if(x==null){x=new L.ba(null,null,[P.u])
x.be()
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
if(s==null){s=new L.ba(null,null,[P.u])
s.be()
s.p(C.h)
t.r=s
t=s}else t=s
t=t.q()
s=this.ga1().x
r=this.ga1().y
q=this.ga1().z
p=this.ga1().Q
z=new O.no(y,x,w,v,u,t,s,r,q,p)
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
hh:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$hh(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.c4(new H.H(u,new R.qc(z),[H.k(u,0)]))
case 3:return P.aO()
case 1:return P.aP(v)}}})},
bq:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var z=new R.ec(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.pD(a,b,j,!1,m,e,h,k,n,i,g,d,f,o,c).$1(z)
return z.q()},
qc:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gfh()
y=this.a.gl()
return z==null?y==null:z===y}},
P:{"^":"kc;",
gbm:function(){var z=this.r
if(typeof z!=="number")return z.bw()
return z>0},
gaX:function(){return this.dy===C.j},
gag:function(){return this.dy===C.o},
gad:function(){return this.dy===C.k},
j6:function(a){var z=this.fy
if(typeof z!=="number")return z.bv()
return z>=1},
e0:function(a,b){return this.fn(a,b)>0},
fn:function(a,b){var z,y
if(this.e4(b)){z=a.gb9()
y=this.go.a
z=z.gl()
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hP(a,b,10))return 1
z=a.gb9()
y=this.go.a
z=z.gl()
return(y==null?z!=null:y!==z)?1:0},
e4:function(a){var z,y
z=a.bZ("Confuse",this,!0)
if(z==null)return!1
y=a.jP("Unconfuse",this,!0)
if(y==null)return!0
return y<z},
cF:function(a){var z,y,x
z=a.ah(this.y)
y=z.gap()
if(typeof y!=="number")return H.y(y)
x=2*y
if(!z.gbm())x-=10
y=a.a
return new A.cf(x,new H.H(y,new R.iq(this),[H.k(y,0)]).aW(0,0,new R.ir()),y.aW(0,0,new R.is(this,a)))},
aA:function(a){var z=this.e
return z!=null&&z.a===a},
hP:function(a,b,c){var z=b.jQ(a,this,!0)
if(z==null)return!1
return z<=c},
$isbt:1},
kc:{"^":"d+d7;"},
pD:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
$1:function(a){var z,y
a.gD().z=this.a
a.gD().dx=this.b
a.gD().dy=this.d
a.gD().fx=this.e
a.gD().f=this.f
a.gD().b=!0
a.gD().c=[]
a.gD().fr=C.k
a.gD().x=this.r
a.gD().db=this.x
a.gD().y=this.Q
a.gD().go=this.y
a.gD().Q=this.z
a.gD().ch=!0
a.gD().cx=this.c
z=P.T(null,null,null,null)
a.gD().cy=z
z=this.cy
if(z!=null){y=new L.bd(null,null)
y.p(z)
z=y}else{z=$.$get$hu()
z.toString
y=new L.bd(null,null)
y.p(z)
z=y}a.gD().id=z
a.gD().e=this.ch
a.gD().r=this.cx
a.gD().d=this.db
return a}},
iq:{"^":"a:0;a",
$1:function(a){return J.i(a.gb9(),this.a.go)}},
ir:{"^":"a:37;",
$2:function(a,b){var z,y
z=J.Z(a,b.gb3()?2:0)
y=b.gap()
if(typeof y!=="number")return H.y(y)
return J.Z(z,2*y)}},
is:{"^":"a:39;a,b",
$2:function(a,b){var z,y
z=b.gb3()?1:0
y=b.gap()
if(typeof y!=="number")return H.y(y)
return J.Z(a,(z+y)*this.a.fn(b,this.b))}},
ds:{"^":"d;a,b",
j:function(a){return this.b}},
np:{"^":"P;a,b,fb:c<,bj:d<,a4:e<,fh:f<,ap:r<,bb:x<,l:y<,z,e2:Q<,K:ch<,cx,fs:cy<,i:db<,cZ:dx<,dy,H:fr<,fx,bc:fy<,b9:go<",
a7:function(a){var z=new R.ec(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)),J.j(this.x)),J.j(this.y)),J.j(this.z)),J.j(this.Q)),J.j(this.ch)),J.j(this.cx)),J.j(this.cy)),J.j(this.db)),J.j(this.dx)),J.j(this.dy)),J.j(this.fr)),C.p.gB(this.fx)),J.j(this.fy)),J.j(this.go)))},
j:function(a){return"Actor {alreadyMentioned="+J.f(this.a)+",\ncategories="+J.f(this.b)+",\ncombineFunction="+J.f(this.c)+",\ncurrentRoomName="+J.f(this.d)+",\ncurrentWeapon="+J.f(this.e)+",\nfollowingActorId="+J.f(this.f)+",\nhitpoints="+J.f(this.r)+",\ngold="+J.f(this.x)+",\nid="+J.f(this.y)+",\ninitiative="+J.f(this.z)+",\nisActive="+J.f(this.Q)+",\nisPlayer="+J.f(this.ch)+",\nitems="+J.f(this.cx)+",\nmaxHitpoints="+J.f(this.cy)+",\nname="+J.f(this.db)+",\nnameIsProperNoun="+J.f(this.dx)+",\npose="+J.f(this.dy)+",\npronoun="+J.f(this.fr)+",\nshield="+C.p.j(this.fx)+",\nstamina="+J.f(this.fy)+",\nteam="+J.f(this.go)+",\n}"}},
ec:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gfb:function(){return this.gD().d},
gbj:function(){return this.gD().e},
sbj:function(a){this.gD().e=a
return a},
ga4:function(){return this.gD().f},
gfh:function(){return this.gD().r},
gap:function(){return this.gD().x},
sap:function(a){this.gD().x=a
return a},
gbb:function(){return this.gD().y},
sbb:function(a){this.gD().y=a
return a},
gl:function(){return this.gD().z},
gK:function(){return this.gD().cx},
gfs:function(){return this.gD().db},
gi:function(){return this.gD().dx},
si:function(a){this.gD().dx=a
return a},
gcZ:function(){return this.gD().dy},
saN:function(a){this.gD().fr=a
return a},
gH:function(){return this.gD().fx},
gbc:function(){return this.gD().go},
sbc:function(a){this.gD().go=a
return a},
gb9:function(){var z,y
z=this.gD()
y=z.id
if(y==null){y=new L.bd(null,null)
z.id=y
z=y}else z=y
return z},
gD:function(){var z,y
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
if(!(z==null)){y=new L.bd(null,null)
y.p(z)
z=y}this.id=z
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gD().b
x=this.gD().c
w=this.gD().d
v=this.gD().e
u=this.gD().f
t=this.gD().r
s=this.gD().x
r=this.gD().y
q=this.gD().z
p=this.gD().Q
o=this.gD().ch
n=this.gD().cx
m=this.gD().cy
l=this.gD().db
k=this.gD().dx
j=this.gD().dy
i=this.gD().fr
h=this.gD().fx
g=this.gD().fy
f=this.gD().go
e=this.gD()
d=e.id
if(d==null){d=new L.bd(null,null)
e.id=d
e=d}else e=d
z=new R.np(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e.q())
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
return z}}}],["","",,A,{"^":"",cf:{"^":"d;bM:a<,cu:b<,bD:c<",
aF:function(a,b){return new A.a6(this.a-b.gbM(),J.aA(this.b,b.gcu()),J.aA(this.c,b.gbD()))},
j:function(a){return"ActorScore<self="+C.i.cv(this.a,2)+",team="+J.bp(this.b,2)+",enemy="+J.bp(this.c,2)+">"}},a6:{"^":"d;bM:a<,cu:b<,bD:c<",
gjl:function(){return this.a===-1/0&&J.i(this.b,-1/0)&&J.i(this.c,-1/0)},
bL:function(a,b){return new A.a6(this.a*b,J.bo(this.b,b),J.bo(this.c,b))},
a5:function(a,b){return new A.a6(this.a+b.gbM(),J.Z(this.b,b.gcu()),J.Z(this.c,b.gbD()))},
cC:function(a,b){if(typeof b!=="number")return H.y(b)
return new A.a6(this.a/b,J.bn(this.b,b),J.bn(this.c,b))},
j:function(a){return"ActorScoreChange<self="+C.i.cv(this.a,2)+",team="+J.bp(this.b,2)+",enemy="+J.bp(this.c,2)+">"},
v:{
ip:function(a){var z,y,x,w,v,u,t,s,r
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.ao)(a),++u){s=a[u];++y
x+=s.a
r=s.b
if(typeof r!=="number")return H.y(r)
w+=r
r=s.c
if(typeof r!=="number")return H.y(r)
v+=r}if(y===0)throw H.c(P.E("Cannot average empty iterable"))
return new A.a6(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
qM:function(a){switch(a){case C.H:return"spear"
case C.I:return"branch"
case C.J:return"tent"
case C.c:return"sword"
default:throw H.c(P.E(a))}},
db:{"^":"kd;ej:a<",
gaU:function(){return U.qM(this.a)},
$isbt:1},
kd:{"^":"d+d7;"},
cs:{"^":"d;a,b",
j:function(a){return this.b}},
bF:{"^":"db;b,c,e2:d<,b9:e<,i:f<,a",
gl:function(){return H.ar(this)},
gbm:function(){return!1},
gK:function(){return!1},
gcZ:function(){return!1},
gH:function(){return C.n}}}],["","",,G,{"^":"",k8:{"^":"d;",
eU:function(){var z,y
z=this.f
y=z.t
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.t=""}},
ke:[function(a){this.f.t+=a},"$1","giQ",2,0,17],
b7:function(){var z=0,y=P.aq(),x,w=this,v,u
var $async$b7=P.an(function(a,b){if(a===1)return P.au(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.F("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sk(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gk(v)===0&&u.t.length===0)){z=4
break}z=5
return P.al(w.cz(),$async$b7)
case 5:z=3
break
case 4:w.eU()
case 1:return P.av(x,y)}})
return P.aw($async$b7,y)}}}],["","",,B,{"^":"",ek:{"^":"d;cE:a<,cW:b<,co:c<",
j:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.i.cv(this.b,3)+", score="+this.a.j(0)+">"}},bw:{"^":"d;bq:a<,f0:b<,eu:c<,jC:d<,cW:e<,f,r,e5:x<,co:y<",
gB:function(a){return X.bm([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
w:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isbw&&this.gB(this)===z.gB(b)},
j:function(a){var z,y
z=this.a
y=J.o(z)
z="PlanConsequence<"+y.gB(z)+", "+y.j(z)+", "+J.f(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
v:{
eO:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.gcW()
z=z?0:b.gco()+1
d.b=a.r
return new B.bw(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",hW:{"^":"d;a,b,c,d,e,f",
iC:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.a
z.a3("...")
z.a3("combining scores")
y=H.t([],[A.a6])
x=new G.ih()
for(w=J.ab(a),v=b.a,u=b.b,t=b.c,s=null;w.u();){r=w.gF()
z.a3(new G.ie(r))
if(r.gcW()>0.15)if(s==null){z.a3("    - first _bestCase")
s=r}else if(J.a_(x.$1(r.gcE()),x.$1(s.gcE()))){z.a3("    - new _bestCase")
s=r}q=r.gcE()
p=J.aA(q.b,u)
o=J.aA(q.c,t)
n=r.b
m=new A.a6((q.a-v)*n,J.bo(p,n),J.bo(o,n))
z.a3(new G.ig(m))
y.push(m)}l=A.ip(y)
w=s==null
if(w)k=C.B
else{q=s.gcE()
k=new A.a6(q.a-v,J.aA(q.b,u),J.aA(q.c,t))}w=w?s:s.gco()
if(typeof w!=="number")return H.y(w)
j=new A.a6(k.a/w,J.bn(k.b,w),J.bn(k.c,w))
z.a3("- uplifts average = "+("ActorScoreChange<self="+C.i.cv(l.a,2)+",team="+J.bp(l.b,2)+",enemy="+J.bp(l.c,2)+">"))
z.a3("- best = "+j.j(0))
i=j.a5(0,l)
z.a3("- result = "+i.j(0))
return i},
el:function(){var z=this
return P.aQ(function(){var y=0,x=1,w,v,u,t,s
return function $async$el(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbV(),u=u.ga_(u),t=1
case 2:if(!u.u()){y=3
break}s=u.gF()
y=4
return""+t+") "+s.gX()+"\t"+H.b(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aO()
case 1:return P.aP(w)}}})},
d_:function(a,b,c){var z=0,y=P.aq(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$d_=P.an(function(d,e){if(d===1)return P.au(e,y)
while(true)switch(z){case 0:w=x.f
w.aK(0)
v=x.c
u=v.a
t=u.a.aw(0,new G.ii(x))
s=t.cF(u)
r=x.a
r.bu("Planning for "+H.b(t.db)+", initialScore="+s.j(0))
q=new P.aZ(x.dB(t,u).a(),null,null,null)
case 2:if(!q.u()){z=3
break}p=q.c
o=p==null?q.b:p.gF()
r.aV(new G.ij(t,o))
if(o.L(t,u)!==!0){r.aV(new G.ik(o))
z=2
break}z=4
return P.al(x.c5(v,o,b,a,c).c_(0),$async$d_)
case 4:n=e
if(J.e9(n)===!0){r.aV(new G.il(o))
w.m(0,o,C.C)
z=2
break}r.aV(new G.im(s,o,n))
m=x.iC(n,s,b)
w.m(0,o,m)
r.aV(new G.io(o,m))
z=2
break
case 3:x.e=!0
return P.av(null,y)}})
return P.aw($async$d_,y)},
jB:function(){return this.d_(50,10,null)},
dB:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p
return function $async$dB(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.c4((u.length!==0?C.a.gE(u):null).gbg())
case 2:u=(u.length!==0?C.a.gE(u):null).gbf()
t=u.length
s={func:1,ret:Q.cq,args:[Q.w]}
r={func:1,ret:Q.K,args:[R.P]}
q=0
case 3:if(!(q<u.length)){x=5
break}p=u[q]
x=H.ay(p,r)?6:8
break
case 6:x=9
return P.c4(Q.hf(z,y,p))
case 9:x=7
break
case 8:x=H.ay(p,s)?10:12
break
case 10:x=13
return P.c4(Q.hg(z,y,p))
case 13:x=11
break
case 12:throw H.c(new P.F(p.j(0)+" is not one of the supported ones"))
case 11:case 7:case 4:u.length===t||(0,H.ao)(u),++q
x=3
break
case 5:return P.aO()
case 1:return P.aP(v)}}})},
c5:function(a5,a6,a7,a8,a9){var $async$c5=P.an(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.aw(0,new G.hZ(t))
p=t.a
p.aV("=====")
p.aV(new G.i_(a6,q))
p.aV(new G.i0(a6))
if(a6.L(q,r)!==!0){p.aV("- firstAction not applicable")
z=1
break}o=q.cF(r)
p.aV(new G.i6(a5,o))
p.aV(new G.i7(a5))
n=P.aY(null,B.bw)
m=P.T(null,null,null,A.at)
l=J.o(r)
k=l.gB(r)
for(j=new P.aZ(a6.cS(q,a5,r).a(),null,null,null);j.u();){i=j.c
h=i==null?j.b:i.gF()
if(l.gB(r)!==k)throw H.c(new P.F("Action "+a6.j(0)+" modified world state when producing "+H.b(h)+"."))
n.an(h)}s.a=0
r=t.b
case 3:if(!!n.gI(n)){z=4
break}++s.a
g=n.d1()
p.a3("----")
p.a3(new G.i8(g))
p.a3(new G.i9(g))
if(g.gco()>a7||s.a>a8){p.a3(new G.ia(s,a7,g))
p.a3(new G.ib(g))
z=4
break}z=g.gbq().f.length===0?5:6
break
case 5:p.a3("- leaf node: world.situations is empty (end of book)")
l=g.a
q=l.a.bk(0,new G.ic(t),new G.id())
if(q==null){p.a3("- this actor ("+H.b(r)+") has been removed")
z=3
break}f=new B.ek(q.cF(l),g.e,g.y)
p.a3(new G.i1(f))
z=7
x=[1]
return P.cP(P.fL(f),$async$c5,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
e=(j.length!==0?C.a.gE(j):null).da(l)
j=l.a
i=new H.H(j,new G.i2(t),[H.k(j,0)])
d=i.gk(i)
if(d>1)throw H.c(new P.F("World has several duplicates of mainActor: "+J.f(l)))
else if(d===0){p.fo("mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead")
q=null}else q=j.aw(0,new G.i3(t))
c=J.i(e,q)
p.a3("- actor: "+H.b(e.gi())+" (isMain=="+c+")")
j=q==null
p.a3("- mainActor: "+H.b(j?q:q.gi()))
b=j?q:q.cF(l)
if(b==null)b=C.D
f=new B.ek(b,g.e,g.y)
p.a3(new G.i4(o,f))
p.a3(new G.i5(g))
z=8
x=[1]
return P.cP(P.fL(f),$async$c5,y)
case 8:p.a3("- generating all actions for "+H.b(e.gi()))
j=n.c
i=n.b
a=n.a
for(a0=new P.aZ(t.dB(e,l).a(),null,null,null);a0.u();){a1=a0.c
a2=a1==null?a0.b:a1.gF()
if(a2.L(e,l)!==!0)continue
for(a1=new P.aZ(a2.cS(e,g,l).a(),null,null,null);a1.u();){a3=a1.c
a4=a3==null?a1.b:a3.gF();++t.d
if(a4.gcW()<0.05)continue
if(m.Y(0,a4.gbq()))continue
n.an(a4)}}p.a3("- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences")
m.n(0,l)
z=3
break
case 4:case 1:return P.cP(null,0,y)
case 2:return P.cP(v,1,y)}})
var z=0,y=P.nM($async$c5),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.p6(y)}},ih:{"^":"a:43;",
$1:function(a){return J.aA(a.b,a.c)}},ie:{"^":"a:1;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},ig:{"^":"a:1;a",
$0:function(){return"    - uplift = "+this.a.j(0)}},ii:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a.b)}},ij:{"^":"a:1;a,b",
$0:function(){return"Evaluating action '"+this.b.gX()+"' for "+H.b(this.a.db)}},ik:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' isn't applicable"}},il:{"^":"a:1;a",
$0:function(){return"- action '"+this.a.gX()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},im:{"^":"a:1;a,b,c",
$0:function(){return"- action '"+this.b.gX()+"' leads to "+H.b(J.aB(this.c))+" different ConsequenceStats, initialScore="+this.a.j(0)}},io:{"^":"a:1;a,b",
$0:function(){return"- action '"+this.a.gX()+"' was scored "+H.b(this.b)}},hZ:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a.b)}},i_:{"^":"a:1;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gX()+"' of "+H.b(this.b.gi())}},i0:{"^":"a:1;a",
$0:function(){return"- firstAction == "+H.b(this.a)}},i6:{"^":"a:1;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.j(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},i7:{"^":"a:1;a",
$0:function(){var z=this.a
return"- initial action: "+C.b.bL(" ",z.y)+"- "+J.f(z.b)}},i8:{"^":"a:1;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.gf0().gX()+"'"}},i9:{"^":"a:1;a",
$0:function(){var z=this.a.gbq().f
return"- situation: "+H.b(J.hM(z.length!==0?C.a.gE(z):null))}},ia:{"^":"a:1;a,b,c",
$0:function(){return"- order ("+this.c.gco()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},ib:{"^":"a:1;a",
$0:function(){var z=this.a.gbq().d
return"- how we got here: "+new H.ad(z,new G.hY(),[H.k(z,0),null]).cn(0," <- ")}},hY:{"^":"a:0;",
$1:function(a){return a.gaU()}},ic:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a.b)}},id:{"^":"a:1;",
$0:function(){return}},i1:{"^":"a:1;a",
$0:function(){return"- "+this.a.j(0)}},i2:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a.b)}},i3:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a.b)}},i4:{"^":"a:1;a,b",
$0:function(){return"- mainActor's score == "+this.b.j(0)+" (initial="+this.a.j(0)+")"}},i5:{"^":"a:1;a",
$0:function(){var z=this.a.gbq().d
return"- how we got here: "+new H.ad(z,new G.hX(),[H.k(z,0),null]).cn(0," <- ")}},hX:{"^":"a:0;",
$1:function(a){return a.gaU()}}}],["","",,Z,{"^":"",kw:{"^":"d;a,b",
gbg:function(){return this.b},
gI:function(a){return this.b.length===0},
fC:function(a,b){var z=this
return P.aQ(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fC(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.c4(t)
case 5:w=1
break
case 4:s=z.hJ(new Z.kz())
r=z.dA(new Z.kA(),[s])
q=z.dA(new Z.kB(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bx().bu("best self preserving: "+H.b(s))
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bx().bu("best enemy damaging: "+H.b(r))
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bx().bu("best team preserving: "+H.b(q))
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.cH(t,new Z.kC(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.o(m)
if(l.w(m,s)){w=17
break}if(l.w(m,r)){w=17
break}if(l.w(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.ao)(t),++n
w=16
break
case 18:case 1:return P.aO()
case 2:return P.aP(u)}}})},
jA:function(a){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=this.b
if(y.length===1)return C.a.gbN(y)
C.a.cH(y,new Z.kD(this,a))
x=this.a.a
w=x.gc0().aW(0,1/0,new Z.kE(a))
v=x.gc0().aW(0,-1/0,new Z.kF(a))
x=J.aa(v)
u=J.aa(w)
t=u.aF(w,J.bo(x.aF(v,w),0.1))
z.a=t
if(u.w(w,v)){t=J.aA(t,1)
z.a=t
u=t}else u=t
s=x.aF(v,u)
r=P.k6(y.length,new Z.kG(z,this,a,s),!1,P.J)
q=new H.ad(r,new Z.kH(C.a.aW(r,0,Z.ht())),[H.k(r,0),null]).bo(0,!1)
z=C.a.aW(q,0,Z.ht())
if(typeof z!=="number")return H.y(z)
u=q.length
x=u-1
if(x<0)return H.e(q,x)
z=J.Z(q[x],1000-z)
if(x>=q.length)return H.e(q,x)
q[x]=z
p=S.kW(q,1000)
if(p>=y.length)return H.e(y,p)
return y[p]},
dA:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.ao)(z),++u){t=z[u]
if(C.a.Y(b,t))continue
if(w==null||J.a_(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hJ:function(a){return this.dA(a,C.h)},
v:{
kx:function(a){var z,y,x
z=a.gbV()
y=H.v(z,"x",0)
x=P.U(new H.H(z,new Z.ky(a),[y]),!1,y)
if(x.length===0)$.$get$bx().ek("After removing actions scored by undefined, there are no recommendations.")
return x},
r3:[function(a,b){return J.Z(a,b)},"$2","ht",4,0,42]}},kz:{"^":"a:0;",
$1:function(a){return a.gbM()}},kA:{"^":"a:0;",
$1:function(a){return J.hI(a.gbD())}},kB:{"^":"a:0;",
$1:function(a){return a.gcu()}},kC:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.cd(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},kD:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.cd(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},kE:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.cS(a),H.cS(z))}},kF:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.cS(a),H.cS(z))}},kG:{"^":"a:8;a,b,c,d",
$1:function(a){var z,y
z=this.b
y=z.b
if(a>=y.length)return H.e(y,a)
return J.bn(J.aA(this.c.$1(z.a.a.h(0,y[a])),this.a.a),this.d)}},kH:{"^":"a:0;a",
$1:function(a){return J.hQ(J.bo(J.bn(a,this.a),1000))}},ky:{"^":"a:0;a",
$1:function(a){return!this.a.h(0,a).gjl()}}}],["","",,K,{"^":"",pf:{"^":"a:9;",
$3:function(a,b,c){}},bZ:{"^":"d;a,i:b<,c,d,jv:e<,f,bJ:r<",
giU:function(){return this.a},
gB:function(a){return C.b.gB(this.b)},
w:function(a,b){if(b==null)return!1
return b instanceof K.bZ&&b.b===this.b},
j:function(a){return"Room<"+this.b+">"},
jw:function(a){return this.e.$1(a)},
v:{
a1:function(a,b,c,d,e,f,g){var z=new S.aK(null,null,[Q.w])
z.aR()
z.p(f)
return new K.bZ(z.q(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",w:{"^":"d;iP:a<,X:b<,aU:c<,jg:d<"}}],["","",,S,{"^":"",ag:{"^":"d;",
gbf:function(){return C.h},
gbg:function(){return C.h},
da:function(a){return this.aB(this.gO(),a)},
fw:function(a,b){},
fz:function(a,b){},
b5:function(a){},
dg:function(a){return!0}}}],["","",,S,{"^":"",
eS:function(a){var z=$.$get$b8().ae(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
kV:function(a,b){var z,y,x,w,v
z=$.$get$b8().fu()*b
for(y=new H.di(a,a.gk(a),0,null,[H.v(a,"aL",0)]),x=0,w=0;y.u();){v=y.d
if(typeof v!=="number")return H.y(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
kW:function(a,b){var z,y,x,w,v,u,t
z=$.$get$b8().ae(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ao)(a),++v){t=a[v]
if(typeof t!=="number")return H.y(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.E("The weights do not add up to total="+b))},
cB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.b.bl(a,"{")
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
if(q>1){p=$.$get$b8().ae(q)
o=C.b.ay(a,0,z)
n=y.length
if(p<0||p>=n)return H.e(y,p)
m=y[p]
l=p+1
if(l>=n)return H.e(y,l)
l=o+S.cB(C.b.ay(a,m+1,y[l]))
if(typeof x!=="number")return x.a5()
l+=C.b.ay(a,x+1,v)
o=l.charCodeAt(0)==0?l:l
if(u===v-1)return o
else return S.cB(o)}else if(u===v-1)return a
else{if(typeof u!=="number")return u.a5()
v=u+1
return C.b.ay(a,0,v)+S.cB(C.b.br(a,v))}}else return a},
bz:function(a,b,c,d){switch($.$get$b8().ae(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}},
kX:function(a){if(a<0||a>1)throw H.c(P.V(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$b8().fu()<a}}],["","",,Y,{"^":"",a3:{"^":"d;aE:a<,ax:b<,au:c<,fB:d<,e,cT:f@,fE:r<,ft:x<,ev:y<,iT:z<,ha:Q<,cB:ch<,cx,jk:cy<,O:db<",
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
default:throw H.c(P.E("Invalid key "+H.b(b)+"."))}}},ai:{"^":"d;a,O:b<,c",
ge_:function(){return C.a.bT(this.a,new Y.me())},
bh:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||J.i(b,""))return
z=(J.bl(b).dY(b,".")||C.b.dY(b,"!")||C.b.dY(b,"?"))&&C.b.dj(b,P.b9("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.a3(b,m,h,j,i,d,k,g,!1,e,l,z,c,!1,y))},
n:function(a,b){return this.bh(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
G:function(a,b,c){return this.bh(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
io:function(a,b,c){return this.bh(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
a0:function(a,b,c,d,e,f,g,h,i,j){return this.bh(a,b,null,c,d,!1,e,f,g,null,h,!1,i,j,null,!1)},
ir:function(a,b,c,d,e){return this.bh(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
iq:function(a,b,c,d){return this.bh(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
f3:function(a,b,c,d){return this.bh(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
ip:function(a,b,c,d){return this.bh(a,b,null,c,d,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
is:function(a,b,c,d,e){return this.bh(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
iw:function(){return this.G(0,"\n\n",!0)},
bS:function(a,b,c,d,e){var z,y,x
if(d!=null)z=C.b.bl(a,"<owner's> "+b)!==-1||C.b.bl(a,"<ownerPronoun's> "+b)!==-1||C.b.bl(a,"<object-owner's> "+b)!==-1||C.b.bl(a,"<object-ownerPronoun's> "+b)!==-1
else z=!1
if(z)return a
if(c.gcZ()!==!0){z=this.c
y=z.h(0,c.gl())
if((y==null?-1:y)<e)x=C.b.d2(a,b,"the "+b)
else{x=J.d0(c.gi(),P.b9("[aeiouy]",!1,!1))?C.b.d2(a,b,"an "+b):C.b.d2(a,b,"a "+b)
z.m(0,c.gl(),e)}}else x=null
return x==null?a:x},
dZ:function(a,b){var z,y
if(!this.av(a)||!this.av(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gax()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gax()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gau()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gau()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gax().gl()
if(b<0||b>=z.length)return H.e(z,b)
if(J.i(y,z[b].gau().gl())){if(a>=z.length)return H.e(z,a)
y=z[a].gau().gl()
if(b>=z.length)return H.e(z,b)
z=J.i(y,z[b].gax().gl())}else z=!1
return z},
d9:function(a){var z=this
return P.aQ(function(){var y=a
var x=0,w=2,v,u,t
return function $async$d9(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.av(y)){x=1
break}u=z.a
if(y<0||y>=u.length)H.e(u,y)
t=u[y]
x=t.gax()!=null?3:4
break
case 3:x=5
return t.gax()
case 5:case 4:x=t.gau()!=null?6:7
break
case 6:x=8
return t.gau()
case 8:case 7:x=t.gfB()!=null?9:10
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
az:[function(a){var z=J.aa(a)
if(z.aC(a,0)||z.bv(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gau()}},"$1","gau",2,0,18],
jy:function(a,b){var z
if(!this.av(a)||!this.av(b))return!1
if(this.dZ(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gev()}return!1},
fA:function(a){var z
for(z=!1;this.ge_();z=!0){a.$1(this.fF(!0))
this.jG()}return z},
fF:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.aW(z,[],new Y.mf())
C.a.i3(z,new Y.mg(y),!1)
x=a&&this.ge_()?C.a.bl(z,C.a.fg(z,new Y.mh()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dZ(p,s)
if(s>=z.length)return H.e(z,s)
if(!z[s].gcT())n=this.jy(s,p)&&this.h9(s,p)
else n=!0
if(n){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcT()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scT(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
if(!z[s].gha()){if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].giT()){if(s>=z.length)return H.e(z,s)
if(!z[s].gcB())if(this.cQ(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcT()}else n=!1
n=n||this.jR(s)>4}else n=!0
else n=!0
else n=!0}else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gcB()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gcB()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.eS([" but "," but ",", but "])
u=!this.fX(s,s+1)&&!0}else{r+=S.eS([" and "," and ",", and "])
u=!0}}m=this.dl(s)
p=!v
if(p){n=s-1
if(this.cQ(s,n))if(J.d0(this.dl(n),"<subject> "))if(J.d0(m,"<subject> "))m=H.bM(m,"<subject> ","",0)}l=J.hP(m,"<action>",this.dl(s))
n=s-1
k=this.i6(s,n)
if(k)k=!(this.az(s).gH()===C.n&&this.a9(s).gH()===C.n)
else k=!1
if(k){k=this.az(s).gH().b
l=H.q(l,"<object-owner's> <object>",k)
k=this.az(s).gH().b
l=H.q(l,"<object-ownerPronoun's> <object>",k)
k=this.az(s).gH().b
l=H.q(l,"<object>",k)
k=this.az(s).gH().c
l=H.q(l,"<object's>",k)}k=this.cQ(s,n)
if(k){k=this.a9(s).gH().a
l=H.q(l,"<owner's> <subject>",k)
k=this.a9(s).gH().a
l=H.q(l,"<ownerPronoun's> <subject>",k)
k=this.a9(s).gH().a
l=H.q(l,"<subject>",k)
k=this.a9(s).gH().c
l=H.q(l,"<subject's>",k)}if(this.az(n)!=null)if(this.a9(s)!=null)if(this.a9(n)!=null){k=this.az(n)
k=k==null?k:k.gl()
j=this.a9(s)
if(J.i(k,j==null?j:j.gl())){k=this.a9(n)
k=k==null?k:k.gH()
j=this.a9(s)
k=!J.i(k,j==null?j:j.gH())}else k=!1}else k=!1
else k=!1
else k=!1
if(k){k=this.a9(s).gH().a
l=H.q(l,"<owner's> <subject>",k)
k=this.a9(s).gH().a
l=H.q(l,"<ownerPronoun's> <subject>",k)
k=this.a9(s).gH().a
l=H.q(l,"<subject>",k)
k=this.a9(s).gH().c
l=H.q(l,"<subject's>",k)}if(this.a9(n)!=null)if(this.az(s)!=null){k=this.a9(n)
k=k==null?k:k.gl()
j=this.az(s)
if(J.i(k,j==null?j:j.gl())){n=this.a9(n)
n=n==null?n:n.gH()
k=this.a9(s)
n=!J.i(n,k==null?k:k.gH())}else n=!1}else n=!1
else n=!1
if(n){n=this.az(s).gH().a
l=H.q(l,"<object-owner's> <object>",n)
n=this.az(s).gH().a
l=H.q(l,"<object-ownerPronoun's> <object>",n)
n=this.az(s).gH().b
l=H.q(l,"<object>",n)
n=this.az(s).gH().c
l=H.q(l,"<object's>",n)}if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gax()
h=n.gau()
g=n.gfB()
f=n.e
e=S.cB(l)
if(C.b.Y(e,"{")||C.b.Y(e,"}"))$.$get$hn().df('Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+l+'""" Output = """'+e+'"""')
if(i!=null){if(i.gK()===!0){e=H.q(e,"<subject>","you")
e=H.q(e,"<subject's>","your")}if(i.gH()===C.z||i.gH()===C.X){e=H.q(e,"<s>","")
e=H.q(e,"<es>","")
e=H.q(e,"<ies>","y")
e=H.q(e,"<does>","do")
e=H.q(e,"<is>","are")
e=H.q(e,"<has>","have")}else{e=H.q(e,"<s>","s")
e=H.q(e,"<es>","es")
e=H.q(e,"<ies>","ies")
e=H.q(e,"<does>","does")
e=H.q(e,"<is>","is")
e=H.q(e,"<has>","has")}e=H.bM(e,"<subject>","<subjectNoun>",0)
k=i.gH().a
e=H.q(e,"<subject>",k)
k=n.db
e=this.bS(e,"<subjectNoun>",i,g,k)
j=i.gi()
if(typeof j!=="string")H.h(H.O(j))
e=H.bM(e,"<subjectNoun>",j,0)
j=i.gH().a
e=H.q(e,"<subjectPronoun>",j)
if(C.b.Y(l,P.b9("<subject>.+<subject's>",!0,!1))){j=i.gH().c
e=H.q(e,"<subject's>",j)}e=this.bS(e,"<subject's>",i,g,k)
k=H.b(i.gi())+"'s"
e=H.bM(e,"<subject's>",k,0)
k=i.gH().c
e=H.q(e,"<subject's>",k)
k=i.gH().c
e=H.q(e,"<subjectPronoun's>",k)}if(h!=null){if(h.gK()===!0){e=H.q(e,"<object>","you")
e=H.q(e,"<object's>","your")}else{e=this.bS(e,"<object>",h,f,n.db)
k=h.gi()
if(typeof k!=="string")H.h(H.O(k))
e=H.q(e,"<object>",k)}k=h.gH().b
e=H.q(e,"<objectPronoun>",k)
if(C.b.Y(l,P.b9("<object>.+<object's>",!0,!1))){k=h.gH().c
e=H.q(e,"<object's>",k)}e=this.bS(e,"<object's>",h,f,n.db)
k=H.b(h.gi())+"'s"
e=H.bM(e,"<object's>",k,0)
k=h.gH().c
e=H.q(e,"<object's>",k)
k=h.gH().c
e=H.q(e,"<objectPronoun's>",k)}n=n.db
l=this.eV(f,this.eV(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.md(l):l
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gcB())u=!0}q=x-1
if(q>=z.length)return H.e(z,q)
z=!z[q].gcB()?r+".":r
return H.qH(z.charCodeAt(0)==0?z:z,$.$get$fd(),new Y.mi(),null)},
cr:function(){return this.fF(!1)},
jG:function(){var z,y
if(!this.ge_()){C.a.sk(this.a,0)
return}z=this.a
y=C.a.bl(z,C.a.fg(z,new Y.mj()))+1
P.cC(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fX:function(a,b){var z,y
if(!this.av(a)||!this.av(b))return!1
if(this.dZ(a,b)){z=this.a
if(a>=z.length)return H.e(z,a)
z[a].gev()}if(!this.cQ(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gfE()){if(b>=z.length)return H.e(z,b)
y=z[b].gfE()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gft()){if(b>=z.length)return H.e(z,b)
z=z[b].gft()}else z=!1
if(z)return!0
else return!1},
h9:function(a,b){var z,y,x,w,v
if(!this.av(a)||!this.av(b))return!1
for(z=new P.aZ(this.d9(a).a(),null,null,null);z.u();){y=z.c
x=y==null?z.b:y.gF()
for(y=new P.aZ(this.d9(b).a(),null,null,null);y.u();){w=y.c
v=w==null?y.b:w.gF()
if(J.i(x.gl(),v.gl()))return!0}}return!1},
dl:[function(a){var z=J.aa(a)
if(z.aC(a,0)||z.bv(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaE()}},"$1","gaE",2,0,10],
a9:[function(a){var z=J.aa(a)
if(z.aC(a,0)||z.bv(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gax()}},"$1","gax",2,0,18],
jR:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gO()!=null){y=a-1
if(this.av(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gO()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gO()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gO()
if(typeof y!=="number")return y.aF()
if(typeof x!=="number")return H.y(x)
return y-x}},
j:function(a){return this.cr()},
av:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eV:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.gK()===!0)z=H.q(H.q(b,d,"you"),e,"your")
else{z=this.bS(b,d,a,null,h)
y=a.gi()
H.bk(y)
z=H.q(z,d,y)}z=H.q(z,f,a.gH().a)
z=H.q(H.q(C.b.d2(this.bS(C.b.Y(c,P.b9(d+".+"+e,!0,!1))?H.q(z,e,a.gH().c):z,e,a,null,h),e,H.b(a.gi())+"'s"),e,a.gH().c),g,a.gH().c)}else z=H.q(H.q(H.q(H.q(b,d,""),e,""),f,""),g,"")
return z},
i6:function(a,b){var z,y
if(!this.av(a)||!this.av(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gau()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gau()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gau().gl()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gau().gl())},
cQ:function(a,b){var z,y
if(!this.av(a)||!this.av(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gax()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gax()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=z[a].gax().gl()
if(b<0||b>=z.length)return H.e(z,b)
return J.i(y,z[b].gax().gl())},
v:{
md:function(a){var z,y,x
z=!C.b.Y(a,"\n\n")?C.b.jV(a):a
y=z.length
if(y===0)return z
if(0>=y)return H.e(z,0)
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.b.br(z,1)}}},me:{"^":"a:0;",
$1:function(a){return J.i(a.gaE(),"\n\n")}},mf:{"^":"a:46;",
$2:function(a,b){var z,y
z=J.I(a)
y=z.ga8(a)?z.gE(a):null
if(y!=null)y.gjk()
z.n(a,b)
return a}},mg:{"^":"a:24;a",
$1:function(a){return J.hJ(this.a,a)}},mh:{"^":"a:0;",
$1:function(a){return J.i(a.gaE(),"\n\n")}},mi:{"^":"a:25;",
$1:function(a){return H.b(a.h(0,1))+H.b(a.h(0,2))+H.b(a.h(0,3))}},mj:{"^":"a:0;",
$1:function(a){return J.i(a.gaE(),"\n\n")}},bt:{"^":"ke;cZ:a<,i:b<,c,b9:d<,K:e<,H:f<",
gl:function(){return H.ar(this)},
ge2:function(){return!0},
gbm:function(){return!0},
v:{
d6:function(a,b,c,d,e){var z=H.t([],[P.p])
return new Y.bt(c,b,z,e==null?$.$get$b2():e,!1,d)}}},ke:{"^":"d+d7;"},d7:{"^":"d;",
gb3:function(){return this.gbm()&&this.ge2()===!0},
aP:function(a,b,c,d,e,f,g,h,i){a.a0(0,b,c,d,e,f,g,h,H.a2(this,"$isbt"),!1)},
al:function(a,b){return this.aP(a,b,!1,!1,!1,null,null,!1,!1)},
b6:function(a,b,c,d){return this.aP(a,b,!1,!1,!1,c,null,d,!1)},
aZ:function(a,b,c){return this.aP(a,b,!1,!1,!1,c,null,!1,!1)},
cs:function(a,b,c){return this.aP(a,b,!1,!1,!1,null,null,c,!1)},
d3:function(a,b,c,d){return this.aP(a,b,c,!1,!1,d,null,!1,!1)},
ed:function(a,b,c,d){return this.aP(a,b,!1,c,d,null,null,!1,!1)},
bF:function(a,b,c){return this.aP(a,b,!1,!1,c,null,null,!1,!1)},
ed:function(a,b,c,d){return this.aP(a,b,!1,c,d,null,null,!1,!1)},
fH:function(a,b,c,d){return this.aP(a,b,!1,!1,c,d,null,!1,!1)},
jL:function(a,b,c,d){return this.aP(a,b,c,!1,!1,null,null,d,!1)},
jK:function(a,b,c){return this.aP(a,b,c,!1,!1,null,null,!1,!1)},
fI:function(a,b,c,d){return this.aP(a,b,!1,!1,!1,c,d,!1,!1)}},bW:{"^":"d;a,b,c,d",
j:function(a){return this.a}}}],["","",,L,{"^":"",pF:{"^":"a:0;",
$1:function(a){a.gce().b=2
return 2}},pG:{"^":"a:0;",
$1:function(a){a.gce().b=0
return 0}},pE:{"^":"a:0;",
$1:function(a){a.gce().b=1
return 1}},fk:{"^":"d;"},nB:{"^":"fk;l:a<",
a7:function(a){var z=new L.bd(null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fk))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.a0(Y.l(0,J.j(this.a)))},
j:function(a){return"Team {id="+J.f(this.a)+",\n}"},
v:{
dI:function(a){var z=new L.bd(null,null)
a.$1(z)
return z.q()}}},bd:{"^":"d;a,b",
gl:function(){return this.gce().b},
gce:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y
z=this.a
if(z==null){y=this.gce().b
z=new L.nB(y)
if(y==null)H.h(P.m("id"))}this.p(z)
return z}}}],["","",,X,{"^":"",
h5:function(a,b){return P.aQ(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$h5(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bN(u,u.length,0,null,[H.k(u,0)])
u=y.a
s=new J.bN(u,u.length,0,null,[H.k(u,0)])
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
case 1:return P.aP(v)}}})}}],["","",,A,{"^":"",at:{"^":"d;ik:a<,b,c,d,e,f,O:r<,x",
giG:function(){var z=this.f
return z.length!==0?C.a.gE(z):null},
gB:function(a){var z,y,x,w,v
z=X.bm(this.a)
y=X.bm(this.d)
x=X.bm(this.f)
w=this.r
v=this.c
v=X.cR(X.aR(X.aR(0,C.d.gB(w)),J.j(v)))
return X.cR(X.aR(X.aR(X.aR(X.aR(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
w:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isat&&this.gB(this)===z.gB(b)},
f1:function(a){var z,y
z=this.fW(a,!0)
y=z.ga_(z)
if(y.u()){y.gF()
return!0}return!1},
ij:function(a){var z=this.x
if(z==null)return!1
return C.b.Y(z.gi(),a)},
fc:function(a){var z,y,x
z=this.cM(a)
if(z==null)throw H.c(new P.F("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].aL()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
aL:function(){++this.r},
em:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.ex(0,new A.ne(a))
if(b!=null)z=z.bI(0,new A.nf(b))
if(c!=null)z=z.bI(0,new A.ng(c))
if(e!=null)z=z.bI(0,new A.nh(e))
return d!=null?z.bI(0,new A.ni(d)):z},
fW:function(a,b){return this.em(a,null,null,null,b)},
ah:function(a){return this.a.aw(0,new A.nj(a))},
dd:function(a){return this.e.aw(0,new A.nk(a))},
en:function(a){var z,y
z=this.cM(a)
if(z==null)return
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
ar:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y){if(y>=z.length)return H.e(z,y)
if(J.i(z[y].gi(),a)){if(y>=z.length)return H.e(z,y)
return z[y]}}throw H.c(P.E("No situation with name="+a+" found."))},
j5:function(a){var z=this.a.bk(0,new A.nl(a),new A.nm())
if(z==null)return!1
return z.gbm()},
eb:function(){var z=this.f
C.a.gE(z).b5(this)
C.a.bn(z)},
cq:function(a){var z=this.f
while(!0){if(!(z.length!==0&&!J.i(C.a.gE(z).gi(),a)))break
C.a.gE(z).b5(this)
C.a.bn(z)}if(z.length===0)throw H.c(P.E("Tried to pop situations until "+a+" but none was found in stack."))},
fG:function(a,b){var z,y
z=this.cM(a)
if(z==null)throw H.c(P.E("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
y=this.f
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=b},
d4:function(a,b,c,d,e){var z,y,x,w
z=this.em(a,b,c,d,e)
y=z.ga_(z)
if(y.u()){x=y.gF()
y=this.r
w=x.gO()
if(typeof w!=="number")return H.y(w)
return y-w}return},
jQ:function(a,b,c){return this.d4(null,a,b,c,null)},
bZ:function(a,b,c){return this.d4(a,null,b,null,c)},
jP:function(a,b,c){return this.d4(a,b,null,null,c)},
jO:function(a){return this.d4(a,null,null,null,null)},
j:function(a){var z,y
z=this.a
y=z.dH()
y.aj(0,z)
return"World<"+P.bR(y,"{","}")+">"},
a6:function(a,b){var z,y,x
z=this.ah(a)
y=z.a7(b)
x=this.a
x.aO(0,z)
x.n(0,y)},
cM:function(a){var z,y,x
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.i(y[x].gl(),a)){z=x
break}++x}return z},
hm:function(a){this.a.aj(0,a.a)
this.d.aj(0,a.d)
this.b.aj(0,a.b)
this.e.aj(0,a.e)
C.a.aj(this.f,a.f)
this.r=a.r},
v:{
dG:function(a){var z,y,x,w
z=P.T(null,null,null,R.P)
y=P.aY(null,O.ce)
x=P.T(null,null,null,U.db)
w=P.T(null,null,null,null)
w=new A.at(z,x,a.c,y,w,[],null,null)
w.hm(a)
return w}}},ne:{"^":"a:0;a",
$1:function(a){return a.gf2()===this.a}},nf:{"^":"a:0;a",
$1:function(a){return J.i(a.gec(),this.a.gl())}},ng:{"^":"a:0;a",
$1:function(a){return a.gew().Y(0,this.a.y)}},nh:{"^":"a:0;a",
$1:function(a){return a.gfS()===this.a}},ni:{"^":"a:0;a",
$1:function(a){return a.gfR()===this.a}},nj:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a)}},nk:{"^":"a:0;a",
$1:function(a){return J.i(a.gi(),this.a)}},nl:{"^":"a:0;a",
$1:function(a){return J.i(a.gl(),this.a)}},nm:{"^":"a:1;",
$0:function(){return}}}],["","",,A,{"^":"",aM:{"^":"ac;"},bB:{"^":"aM;b,X:c<,V:d<,i:e<,a",
U:[function(a,b,c){throw H.c(new P.F("SimpleAction always succeeds"))},"$3","gP",6,0,2],
R:[function(a,b,c){return this.b.$4(a,b,c,this)},"$3","gN",6,0,2],
ai:function(a,b){throw H.c(new P.F("SimpleAction shouldn't have to provide roll reason"))},
M:function(a,b){return 1},
gW:function(){return!1},
L:function(a,b){return!0},
gS:function(){return H.h(new P.F("Not rerollable"))},
gT:function(){return!1}}}],["","",,N,{"^":"",iE:{"^":"K;W:c<,V:d<,T:e<,S:f<,b,a",
gab:function(){return"confuse <object>"},
gi:function(){return"Confuse"},
gaf:function(){return"will <subject> confuse <object>?"},
U:[function(a,b,c){var z
a.al(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a0(0,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!1,a,!1)
c.a0(0,"<subject> fail<s>",!0,!1,!0,null,null,!1,a,!1)
return H.b(a.gi())+" fails to confuse "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z
a.al(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.toString
c.a0(0,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",!1,!1,!1,z,null,!0,a,!1)
z.bF(c,"<subject's> eyes go wide with terror",!0)
return H.b(a.gi())+" confuses "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 0.6},
L:function(a,b){var z
if(a.gK()===!0)if(a.gad()){z=b.a
z=new H.H(z,new N.iF(this),[H.k(z,0)])
z=z.gk(z)>=2&&!this.b.e4(b)}else z=!1
else z=!1
return z},
v:{
qR:[function(a){return new N.iE(!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","q0",2,0,5]}},iF:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gbm()){z=a.gb9()
y=this.a.b.gb9()
z=z.a
y=y.gl()
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,F,{"^":"",kv:{"^":"ac;V:b<,W:c<,T:d<,S:e<,a",
gX:function(){return"Stand off."},
gi:function(){return"Pass"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gK()===!0)a.al(c,"<subject> stand<s> off")
return H.b(a.gi())+" passes the opportunity"},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
L:function(a,b){return!0}}}],["","",,Y,{"^":"",kJ:{"^":"K;T:c<,S:d<,W:e<,V:f<,b,a",
gab:function(){return"force <object> off balance"},
gi:function(){return"Pound"},
gaf:function(){return"will <subject> force <object> off balance?"},
U:[function(a,b,c){var z=this.b
a.fI(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga4(),z)
z.cs(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.gi())+" kicks "+H.b(z.db)+" off balance"},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.fI(c,"<subject> {fiercely|violently} {pound<s>|strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.ga4(),z)
if(z.gad()){z.fH(c,"<subject> lose<s> <object>",!0,$.$get$dZ())
b.a6(z.y,new Y.kK())
C.a.n(b.f,U.kf(z,a))
return H.b(a.gi())+" pounds "+H.b(z.db)+" off balance"}else if(z.gaX()){z.al(c,"<subject> <is> already off balance")
c.f3(0,"<subject> make<s> <object> fall to the "+H.b(b.ar("FightSituation").gbJ()),z,$.$get$hv())
b.a6(z.y,new Y.kL())
return H.b(a.gi())+" pounds "+H.b(z.db)+" to the ground"}throw H.c(new P.F("enemy pose must be either standing or off-balance"))},"$3","gN",6,0,2],
M:function(a,b){var z=a.gad()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
L:function(a,b){var z
if(!a.gag()){z=a.e
z=z!=null&&z.a===C.c&&!this.b.gag()}else z=!1
return z},
v:{
r4:[function(a){return new Y.kJ(!0,C.e,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","qq",2,0,5]}},kK:{"^":"a:0;",
$1:function(a){a.saN(C.j)
return a}},kL:{"^":"a:0;",
$1:function(a){a.saN(C.o)
return a}}}],["","",,B,{"^":"",l3:{"^":"ac;V:b<,W:c<,T:d<,S:e<,a",
gX:function(){return"Regain balance."},
gi:function(){return"RegainBalance"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gK()===!0)a.b6(c,"<subject> regain<s> <object>",$.$get$dZ(),!0)
b.a6(a.gl(),new B.l4())
return H.b(a.gi())+" regains balance"},"$3","gN",6,0,2],
ai:function(a,b){return"Will "+a.gH().a+" regain balance?"},
M:function(a,b){return 1},
L:function(a,b){return a.gaX()}},l4:{"^":"a:0;",
$1:function(a){a.saN(C.k)
return C.k}}}],["","",,O,{"^":"",li:{"^":"ac;V:b<,W:c<,T:d<,S:e<,a",
gX:function(){return"Scramble."},
gi:function(){return"Scramble"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.al(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.gi())+" scrambles on ground"},"$3","gN",6,0,2],
ai:function(a,b){return"Will "+a.gH().a+" crawl out of harm's way?"},
M:function(a,b){return 1},
L:function(a,b){var z,y
if(!a.gag())return!1
z=b.bZ("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!0
y=b.bZ("Pound",a,!0)
if(y!=null&&y<=2)return!0
return!1}}}],["","",,Q,{"^":"",m1:{"^":"ac;V:b<,W:c<,T:d<,S:e<,a",
gX:function(){return"Stand up."},
gi:function(){return"StandUp"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.al(c,"<subject> stand<s> up")
b.a6(a.gl(),new Q.m2())
return H.b(a.gi())+" stands up"},"$3","gN",6,0,2],
ai:function(a,b){return"Will "+a.gH().a+" stand up?"},
M:function(a,b){return 1},
L:function(a,b){var z,y
if(!a.gag())return!1
z=b.bZ("SweepOffFeet",a,!0)
if(z!=null&&z<=2)return!1
y=b.bZ("Pound",a,!0)
if(y!=null&&y<=2)return!1
return!0}},m2:{"^":"a:0;",
$1:function(a){a.saN(C.k)
return C.k}}}],["","",,G,{"^":"",fa:{"^":"K;V:c<,W:d<,S:e<,b,a",
gi:function(){return"StartSlash"},
gab:function(){return"swing at <object>"},
gT:function(){return!1},
gaf:function(){return},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> swing<s> {<subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.q))
return H.b(a.db)+" starts a slash at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.gK()!==!0&&a.gad()&&!this.b.gag()&&a.aA(C.c)},
v:{
ra:[function(a){return new G.fa("The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","qA",2,0,5]}}}],["","",,R,{"^":"",fb:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"StartSlashOutOfBalance"},
gab:function(){return"swing at <object> (while out of balance)"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){var z=this.b
a.fH(c,"<subject> completely miss<es> <object> with <subject's> "+a.ga4().f,!0,z)
return H.b(a.db)+" fails to start an out-of-balance slash at "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> swing<s> {<subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.q))
return H.b(a.db)+" starts an out-of-balance slash at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gK()!==!0&&a.gaX()&&!this.b.gag()&&a.aA(C.c)},
v:{
r8:[function(a){return new R.fb("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","qB",2,0,5]}}}],["","",,T,{"^":"",m3:{"^":"fb;c,d,e,f,b,a",
gi:function(){return"StartSlashOutOfBalancePlayer"},
R:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> swing<s> {<subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.m))
return H.b(a.db)+" starts an out-of-balance slash at "+H.b(z.gi())},"$3","gN",6,0,2],
L:function(a,b){return a.gK()===!0&&a.gaX()&&!this.b.gag()&&a.aA(C.c)},
v:{
r7:[function(a){return new T.m3("It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,C.e,a,null)},"$1","qC",2,0,5]}}}],["","",,A,{"^":"",m4:{"^":"fa;T:f<,c,d,e,b,a",
gaf:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> swing<s> {<subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.r))
return H.b(a.db)+" starts a failed slash at "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> swing<s> {<subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.m))
return H.b(a.db)+" starts a successful slash at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gK()===!0&&a.gad()&&!this.b.gag()&&a.aA(C.c)},
v:{
r9:[function(a){return new A.m4(!0,"The basic swordfighting move is also often the most effective.",!0,C.e,a,null)},"$1","qD",2,0,5]}}}],["","",,D,{"^":"",fc:{"^":"K;V:c<,W:d<,b,a",
gi:function(){return"StartStrikeDown"},
gab:function(){return"strike down at <object>"},
gT:function(){return!1},
gS:function(){return},
gaf:function(){return},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> strike<s> down {with <subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,D.dC(a,z))
C.a.n(y,V.dp(a,z,C.q))
return H.b(a.db)+" strikes down at "+H.b(z.gi())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.gK()!==!0&&this.b.gag()&&!a.gag()&&a.aA(C.c)},
v:{
rc:[function(a){return new D.fc("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","qE",2,0,5]}}}],["","",,Q,{"^":"",m5:{"^":"fc;c,d,b,a",
gab:function(){return"strike down at <object>"},
gT:function(){return!0},
gS:function(){return C.e},
gaf:function(){return"will <subject> hit?"},
U:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> strike<s> down {with <subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,D.dC(a,z))
C.a.n(y,V.dp(a,z,C.r))
return H.b(a.db)+" makes an unsuccessful strike at "+H.b(z.gi())+" on the ground"},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.aZ(c,"<subject> strike<s> down {with <subject's> "+a.ga4().f+" |}at <object>",z)
y=b.f
C.a.n(y,D.dC(a,z))
C.a.n(y,V.dp(a,z,C.m))
return H.b(a.db)+" makes a successful strike at "+H.b(z.gi())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 0.7},
L:function(a,b){return a.gK()===!0&&this.b.gag()&&!a.gag()&&a.aA(C.c)},
v:{
rb:[function(a){return new Q.m5("Opponents on the ground are often the most vulnerable.",!0,a,null)},"$1","qF",2,0,5]}}}],["","",,B,{"^":"",mG:{"^":"K;T:c<,S:d<,W:e<,V:f<,b,a",
gi:function(){return"SweepOffFeet"},
gab:function(){return"sweep <object> off <objectPronoun's> feet"},
gaf:function(){return"will <subject> knock <object> down?"},
U:[function(a,b,c){S.bz(new B.mH(this,a,c),new B.mI(this,a,c),null,null)
return H.b(a.gi())+" fails to sweep "+H.b(this.b.gi())+" off feet"},"$3","gP",6,0,2],
R:[function(a,b,c){var z
S.bz(new B.mJ(this,a,c),new B.mK(this,a,c,b.ar("FightSituation").gbJ()),null,null)
z=this.b
b.a6(z.gl(),new B.mL())
return H.b(a.gi())+" sweeps "+H.b(z.gi())+" off feet"},"$3","gN",6,0,2],
M:function(a,b){var z=a.gad()?0:0.2
if(a.ch===!0)return 0.7-z
return 0.5-z},
L:function(a,b){return(a.gad()||a.dy===C.j)&&!this.b.gag()},
v:{
re:[function(a){return new B.mG(!0,C.e,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","qJ",2,0,5]}},mH:{"^":"a:1;a,b,c",
$0:function(){var z=this.c
this.b.aZ(z,"<subject> sweep<s> <subject's> legs at <object's> feet",this.a.b)
z.ip(0,"they don't connect",!0,!0)}},mI:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.aZ(z,"<subject> kick<s> <object's> shin",y)
y.jK(z,"<subject> <does>n't budge",!0)}},mJ:{"^":"a:1;a,b,c",
$0:function(){this.b.b6(this.c,"<subject> sweep<s> <object> off <object's> feet",this.a.b,!0)}},mK:{"^":"a:1;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b6(z,"<subject> kick<s> <object's> {right|left} ankle",y,!0)
y.al(z,"<subject> {grunt|shriek}<s>")
y.bF(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},mL:{"^":"a:0;",
$1:function(a){a.saN(C.o)
return a}}}],["","",,M,{"^":"",nc:{"^":"ac;V:b<,T:c<,S:d<,W:e<,a",
gX:function(){return"Regain clarity."},
gi:function(){return"Unconfuse"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){a.al(c,"<subject> shake<s> <subject's> head violently")
if(a.gK()===!0)c.n(0,"the {horrible|terrible} spell seems to recede")
c.a0(0,"<subject's> eyes regain focus and clarity",!1,!0,!1,null,null,!0,a,!1)
return H.b(a.gi())+" regains clarity"},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING this shouldn't be user-visible"},
M:function(a,b){return 1},
L:function(a,b){var z
if(a.e4(b)){z=b.bZ("Confuse",a,!0)
if(typeof z!=="number")return z.bw()
z=z>4}else z=!1
return z}}}],["","",,G,{"^":"",en:{"^":"K;V:c<,W:d<,b,a",
gi:function(){return"CounterSlash"},
gT:function(){return!1},
gS:function(){return},
gab:function(){return"swing back at <object>"},
gaf:function(){return"will <subject> keep <subject's> balance?"},
U:[function(a,b,c){a.al(c,"<subject> tr<ies> to swing back")
a.toString
c.a0(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gad()){b.a6(a.y,new G.iQ())
c.a0(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dy===C.j){b.a6(a.y,new G.iR())
c.a0(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a0(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.b6(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.q))
return H.b(a.gi())+" swings back at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return this.b.gad()?0.7:0.9},
L:function(a,b){return a.gK()!==!0&&a.aA(C.c)&&!a.gag()},
v:{
qT:[function(a){return new G.en("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","q3",2,0,5]}},iQ:{"^":"a:0;",
$1:function(a){a.saN(C.j)
return a}},iR:{"^":"a:0;",
$1:function(a){a.saN(C.o)
return a}}}],["","",,D,{"^":"",iN:{"^":"en;c,d,b,a",
gT:function(){return!0},
gS:function(){return C.e},
gab:function(){return"swing back at <object>"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){a.al(c,"<subject> tr<ies> to swing back")
a.toString
c.a0(0,"<subject> {go<es> wide|miss<es>}",!0,!1,!0,null,null,!1,a,!1)
if(a.gad()){b.a6(a.y,new D.iO())
c.a0(0,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a,!1)}else if(a.dy===C.j){b.a6(a.y,new D.iP())
c.a0(0,"<subject> lose<s> balance because of that",!1,!1,!0,null,null,!1,a,!1)
c.a0(0,"<subject> fall<s> to the ground",!1,!0,!0,null,null,!1,a,!1)}return H.b(a.db)+" fails to swing back at "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
a.b6(c,"<subject> swing<s> back at <object>",z,!0)
y=b.f
C.a.n(y,M.bc(a,z))
C.a.n(y,L.bb(a,z,C.m))
return H.b(a.gi())+" swings successfully back at "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return this.b.gad()?0.7:0.9},
L:function(a,b){return a.gK()===!0&&a.aA(C.c)&&!a.gag()},
v:{
qS:[function(a){return new D.iN("You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,a,null)},"$1","q4",2,0,5]}},iO:{"^":"a:0;",
$1:function(a){a.saN(C.j)
return a}},iP:{"^":"a:0;",
$1:function(a){a.saN(C.o)
return a}}}],["","",,S,{"^":"",
em:function(a,b){var z=new S.d5(null,null,null,null,null)
new S.pO(a,b).$1(z)
return z.q()},
el:{"^":"ag;",
gbf:function(){return[G.q3(),D.q4()]},
gbg:function(){return[$.$get$dq()]},
gi:function(){return"CounterAttackSituation"},
aL:function(){var z=new S.d5(null,null,null,null,null)
z.p(this)
new S.iL().$1(z)
return z.q()},
aB:function(a,b){if(a===0)return b.ah(this.a)
return},
aQ:function(a,b){return new H.H(a,new S.iM(this),[H.k(a,0)])}},
pO:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gaG().c=z
a.gaG().e=0
z=this.a.gl()
a.gaG().b=z
z=this.b.gl()
a.gaG().d=z
return a}},
iL:{"^":"a:0;",
$1:function(a){var z=a.gaG().e
if(typeof z!=="number")return z.a5()
a.gaG().e=z+1
return a}},
iM:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gl(),z.a)||J.i(a.gl(),z.c)}},
nq:{"^":"el;a,l:b<,c,O:d<",
a7:function(a){var z=new S.d5(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.el))return!1
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
j:function(a){return"CounterAttackSituation {counterAttacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
d5:{"^":"d;a,b,c,d,e",
gl:function(){return this.gaG().c},
gO:function(){return this.gaG().e},
gaG:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaG().b
x=this.gaG().c
w=this.gaG().d
v=this.gaG().e
z=new S.nq(y,x,w,v)
if(y==null)H.h(P.m("counterAttacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,X,{"^":"",
hw:function(a,b,c){switch($.$get$fX().ae(3)){case 0:b.ed(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bF(a,"<subject> fall<s> backward",!0)
b.toString
a.a0(0,"<subject> twist<s>",!1,!1,!0,null,null,!1,b,!1)
a.a0(0,"<subject> hit<s> the "+H.b(c)+" face down",!1,!0,!0,null,null,!1,b,!1)
break
case 2:b.bF(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
a.a0(0,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b,!1)
break}a.G(0,"\n\n",!0)}}],["","",,U,{"^":"",
jn:function(a,b,c,d){var z=new U.d9(null,null,null,null,null,null,null,null)
new U.pL(a,b,c,d).$1(z)
return z.q()},
er:{"^":"ag;",
gbf:function(){return[N.q0(),Y.qq(),B.qJ(),G.qA(),A.qD(),D.qE(),Q.qF(),R.qB(),T.qC()]},
gbg:function(){return H.t([$.$get$eU(),$.$get$f9(),$.$get$eY(),$.$get$fC()],[Q.ac])},
gi:function(){return"FightSituation"},
aL:function(){var z=new U.d9(null,null,null,null,null,null,null,null)
z.p(this)
new U.jp().$1(z)
return z.q()},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.h5(this.f,this.a)
y=H.bv(z,new U.jq(b),H.v(z,"x",0),null)
x=H.v(y,"x",0)
w=P.U(new H.H(y,new U.jr(),[x]),!1,x)
x=H.k(w,0)
v=P.U(new H.H(w,new U.js(),[x]),!1,x)
u=v.length===1?C.a.gbN(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.ao)(w),++r){q=w[r]
p=b.d.bk(0,new U.jt(q),new U.ju())
o=p==null?p:p.gO()
if(o==null)o=-1
x=b.r
if(typeof o!=="number")return H.y(o)
n=x-o
if(q.gK()===!0)n=C.i.ef(n*1.5)
if(n>t){s=q
t=n}}return s},
aQ:function(a,b){return new H.H(a,new U.jv(this),[H.k(a,0)])},
fz:function(a,b){var z,y
if(S.kX(0.25))b.G(0,"\n\n",!0)
z=this.r
y=this.b.a
if(y.Z(z))y.h(0,z).$2(a,b)},
b5:function(a){var z,y
z=this.c
if(z!=null&&!this.dV(this.a,a)){y=a.en(z)
a.fG(y.gl(),y.a7(new U.jw()))}},
dg:function(a){var z=this.f
if(this.dV(z,a))if(this.dV(this.a,a)){z=z.a
z=(z&&C.a).bT(z,new U.jx(a))}else z=!1
else z=!1
return z},
dV:function(a,b){var z=a.a
return(z&&C.a).bT(z,new U.jo(b))}},
pL:{"^":"a:0;a,b,c,d",
$1:function(a){var z,y
z=$.$get$am().ae(1073741823)
a.gaa().f=z
a.gaa().x=0
z=a.gaa()
y=z.r
if(y==null){y=new S.aK(null,null,[P.u])
y.aR()
y.p(C.h)
z.r=y
z=y}else z=y
y=this.a
z.p(new H.cw(y,new U.oV(),[H.k(y,0),null]))
y=a.gaa()
z=y.b
if(z==null){z=new S.aK(null,null,[P.u])
z.aR()
z.p(C.h)
y.b=z}z.p(J.ea(this.b,new U.oW()))
a.gaa().e=this.c
z=this.d.gl()
a.gaa().d=z
return a}},
oV:{"^":"a:0;",
$1:function(a){return a.gl()}},
oW:{"^":"a:0;",
$1:function(a){return a.gl()}},
jp:{"^":"a:0;",
$1:function(a){var z=a.gaa().x
if(typeof z!=="number")return z.a5()
a.gaa().x=z+1
return a}},
jq:{"^":"a:0;a",
$1:function(a){return this.a.ah(a)}},
jr:{"^":"a:0;",
$1:function(a){return a.gb3()}},
js:{"^":"a:0;",
$1:function(a){return a.gK()}},
jt:{"^":"a:0;a",
$1:function(a){return J.i(a.gec(),this.a.gl())}},
ju:{"^":"a:1;",
$0:function(){return}},
jv:{"^":"a:19;a",
$1:function(a){var z,y,x
if(a.gb3()){z=this.a
y=a.gl()
x=z.f.a
if(!(x&&C.a).Y(x,y)){y=a.gl()
z=z.a.a
y=(z&&C.a).Y(z,y)
z=y}else z=!0}else z=!1
return z}},
jw:{"^":"a:0;",
$1:function(a){a.sjx(!1)
return a}},
jx:{"^":"a:28;a",
$1:function(a){var z=this.a.ah(a)
return z.gK()===!0&&z.gb3()}},
jo:{"^":"a:0;a",
$1:function(a){return this.a.ah(a).gb3()}},
ns:{"^":"er;a,b,c,bJ:d<,l:e<,f,O:r<",
a7:function(a){var z=new U.d9(null,null,null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.er))return!1
if(J.i(this.a,b.a))if(J.i(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.i(this.f,b.f)){z=this.r
y=b.r
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z},
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)),J.j(this.f)),J.j(this.r)))},
j:function(a){return"FightSituation {enemyTeamIds="+J.f(this.a)+",\nevents="+J.f(this.b)+",\nroomRoamingSituationId="+J.f(this.c)+",\ngroundMaterial="+J.f(this.d)+",\nid="+J.f(this.e)+",\nplayerTeamIds="+J.f(this.f)+",\ntime="+J.f(this.r)+",\n}"}},
d9:{"^":"d;a,b,c,d,e,f,r,x",
gbJ:function(){return this.gaa().e},
gl:function(){return this.gaa().f},
gO:function(){return this.gaa().x},
gaa:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.aK(null,null,[H.k(z,0)])
y.aR()
y.p(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.dk(null,null,[H.k(z,0),H.k(z,1)])
y.c8()
y.p(z)
z=y}this.c=z
z=this.a
this.d=z.c
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.aK(null,null,[H.k(z,0)])
y.aR()
y.p(z)
z=y}this.r=z
this.x=this.a.r
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u,t,s
z=this.a
if(z==null){y=this.gaa()
x=y.b
if(x==null){x=new S.aK(null,null,[P.u])
x.aR()
x.p(C.h)
y.b=x
y=x}else y=x
y=y.q()
x=this.gaa()
w=x.c
if(w==null){w=new A.dk(null,null,[P.u,{func:1,v:true,args:[A.at,Y.ai]}])
w.c8()
w.p(C.V)
x.c=w
x=w}else x=w
x=x.q()
w=this.gaa().d
v=this.gaa().e
u=this.gaa().f
t=this.gaa()
s=t.r
if(s==null){s=new S.aK(null,null,[P.u])
s.aR()
s.p(C.h)
t.r=s
t=s}else t=s
t=t.q()
s=this.gaa().x
z=new U.ns(y,x,w,v,u,t,s)
if(y==null)H.h(P.m("enemyTeamIds"))
if(x==null)H.h(P.m("events"))
if(v==null)H.h(P.m("groundMaterial"))
if(u==null)H.h(P.m("id"))
if(t==null)H.h(P.m("playerTeamIds"))
if(s==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,A,{"^":"",kj:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"OffBalanceOpportunityThrust"},
gab:function(){return"stab <object>"},
gaf:function(){return"will <subject> hit <objectPronoun>?"},
U:[function(a,b,c){var z=this.b
a.aZ(c,"<subject> tr<ies> to stab <object>",z)
a.toString
c.a0(0,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gi())+" fails to stab "+H.b(z.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a6(z.gl(),new A.kk())
if(b.ah(z.gl()).gbm()){a.b6(c,"<subject> thrust<s> {|<subject's> "+a.ga4().f+"} deep into <object's> {shoulder|hip|thigh}",z,!0)
z.bF(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b6(c,"<subject> {stab<s>|run<s> <subject's> "+a.ga4().f+" through} <object>",z,!0)
X.hw(c,z,b.ar("FightSituation").gbJ())}return H.b(a.gi())+" stabs "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){if(a.gK()===!0)return 0.6
return 0.5},
L:function(a,b){var z
if(a.gad())if(this.b.gaX()){z=a.e
z=z!=null&&z.a===C.c}else z=!1
else z=!1
return z},
v:{
r_:[function(a){return new A.kj("When an opponent is out of balance they are the most vulnerable.",!0,!0,C.e,a,null)},"$1","qn",2,0,5]}},kk:{"^":"a:0;",
$1:function(a){var z=a.gap()
if(typeof z!=="number")return z.aF()
a.sap(z-1)
return a}}}],["","",,U,{"^":"",
kf:function(a,b){var z=new U.dm(null,null,null,null,null)
new U.pS(a,b).$1(z)
return z.q()},
eM:{"^":"ag;",
gbf:function(){return H.t([A.qn()],[{func:1,ret:Q.K,args:[R.P]}])},
gbg:function(){return[$.$get$dq()]},
gi:function(){return"OffBalanceOpportunitySituation"},
aL:function(){var z=new U.dm(null,null,null,null,null)
z.p(this)
new U.kg().$1(z)
return z.q()},
aB:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.bw()
if(a>0)return
z=b.ah(this.a)
y=b.a
x=H.k(y,0)
w=P.U(new H.H(y,new U.kh(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gff(w)
if(v.gad())if(z.gaX()){y=v.e
y=y!=null&&y.a===C.c}else y=!1
else y=!1
if(y)return v
return},
aQ:function(a,b){return new H.H(a,new U.ki(b,b.ah(this.a)),[H.k(a,0)])}},
pS:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gaH().d=z
a.gaH().e=0
z=this.a.gl()
a.gaH().b=z
z=this.b
z=z==null?z:z.gl()
a.gaH().c=z
return a}},
kg:{"^":"a:0;",
$1:function(a){var z=a.gaH().e
if(typeof z!=="number")return z.a5()
a.gaH().e=z+1
return a}},
kh:{"^":"a:19;a,b,c",
$1:function(a){var z,y
if(a.gb3())if(a.e0(this.c,this.b)){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
ki:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.i(a,z)||a.e0(z,this.a)}},
nt:{"^":"eM;a,b,l:c<,O:d<",
a7:function(a){var z=new U.dm(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.eM))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
j:function(a){return"OffBalanceOpportunitySituation {actorId="+H.b(J.f(this.a))+",\nculpritId="+J.f(this.b)+",\nid="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dm:{"^":"d;a,b,c,d,e",
gl:function(){return this.gaH().d},
gO:function(){return this.gaH().e},
gaH:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaH().b
x=this.gaH().c
w=this.gaH().d
v=this.gaH().e
z=new U.nt(y,x,w,v)
if(y==null)H.h(P.m("actorId"))
if(w==null)H.h(P.m("id"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,O,{"^":"",jy:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"FinishSlash"},
gab:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y,x
z=this.b
b.a6(z.gl(),new O.jB())
y=b.ah(z.gl()).gbm()
if(y){a.b6(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",z,!0)
z.bF(c,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.b6(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",z,!0)
X.hw(c,z,b.ar("FightSituation").gbJ())}x=H.b(a.gi())+" slashes"
return x+(!y?" (and kills)":"")+" "+H.b(z.gi())},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return a.aA(C.c)},
v:{
qX:[function(a){return new O.jy(null,!0,!0,C.e,a,null)},"$1","q9",2,0,5]}},jB:{"^":"a:0;",
$1:function(a){var z=a.gap()
if(typeof z!=="number")return z.aF()
a.sap(z-1)
return a}}}],["","",,X,{"^":"",iW:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"DefensiveParrySlash"},
gab:function(){return"step back and parry"},
gaf:function(){return"will <subject> parry it?"},
U:[function(a,b,c){var z
a.al(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.ga4().f+"|fend it off}")
if(a.gaX())c.a0(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bz(new X.iX(a,c),new X.iY(this,a,c),null,null)
z=b.f
C.a.gE(z).b5(b)
C.a.bn(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){if(a.gK()===!0)a.al(c,"<subject> {step<s>|take<s> a step} back")
a.cs(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.ga4().f+"|fend<s> it off}",!0)
if(!a.gad()){b.a6(a.y,new X.iZ())
if(a.ch===!0)c.a0(0,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a,!1)}b.cq("FightSituation")
return H.b(a.db)+" steps back and parries "+H.b(this.b.gi())},"$3","gN",6,0,2],
M:function(a,b){var z,y
if(a.gK()===!0)return 1
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbQ())return 0
if(y.gbR())return 1
return 0.5-(a.gad()?0:0.2)},
L:function(a,b){return a.aA(C.c)},
v:{
qU:[function(a){return new X.iW("Stepping back is the safest way to get out of harm's way.",!1,!0,C.e,a,null)},"$1","q5",2,0,5]}},iX:{"^":"a:1;a,b",
$0:function(){this.b.a0(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},iY:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d3(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},iZ:{"^":"a:0;",
$1:function(a){a.saN(C.k)
return a}}}],["","",,F,{"^":"",j_:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"DodgeSlash"},
gab:function(){return"dodge and counter"},
gaf:function(){return"will <subject> dodge?"},
U:[function(a,b,c){var z
a.al(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gaX())c.a0(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bz(new F.j0(a,c),new F.j1(this,a,c),null,null)
z=b.f
C.a.gE(z).b5(b)
C.a.bn(z)
return H.b(a.db)+" fails to dodge "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
a.b6(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.gad()){z.ed(c,"<subject> lose<s> balance because of that",!0,!0)
b.a6(z.y,new F.j2())}b.cq("FightSituation")
if(a.gK()===!0)c.n(0,"this opens an opportunity for a counter attack")
C.a.n(b.f,S.em(a,z))
return H.b(a.gi())+" dodges "+H.b(z.db)},"$3","gN",6,0,2],
M:function(a,b){var z,y,x
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbQ())return 0
if(y.gbR())return 1
x=a.gad()?0:0.2
if(a.ch===!0)return 0.7-x
return 0.4-x},
L:function(a,b){return!a.gag()},
v:{
qV:[function(a){return new F.j_("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!0,C.e,a,null)},"$1","q6",2,0,5]}},j0:{"^":"a:1;a,b",
$0:function(){this.b.a0(0,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},j1:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d3(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},j2:{"^":"a:0;",
$1:function(a){a.saN(C.j)
return C.j}}}],["","",,G,{"^":"",ks:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"ParrySlash"},
gab:function(){return"parry and counter"},
gaf:function(){return"will <subject> parry?"},
U:[function(a,b,c){var z
a.al(c,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.ga4().f+"|fend it off}")
if(a.gaX())c.a0(0,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a,!1)
else S.bz(new G.kt(a,c),new G.ku(this,a,c),null,null)
z=b.f
C.a.gE(z).b5(b)
C.a.bn(z)
return H.b(a.db)+" fails to parry "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
if(z.gaX()){c.ir(0,"<subject> <is> out of balance",!0,!0,z)
c.iq(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$hA())
a.cs(c,"<subject> {parr<ies> it easily|easily meet<s> it with <subject's> "+a.ga4().f+"|fend<s> it off easily}",!0)}else a.cs(c,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.ga4().f+"|fend<s> it off}",!0)
b.cq("FightSituation")
if(a.gK()===!0)c.n(0,"this opens an opportunity for a counter attack")
C.a.n(b.f,S.em(a,z))
return H.b(a.gi())+" parries "+H.b(z.db)},"$3","gN",6,0,2],
M:function(a,b){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbQ())return 0
if(y.gbR())return 1
x=a.gad()?0:0.2
w=this.b.gaX()?0.3:0
if(a.ch===!0)return 0.6-x+w
return 0.3-x+w},
L:function(a,b){return a.aA(C.c)},
v:{
r1:[function(a){return new G.ks("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!0,C.e,a,null)},"$1","qp",2,0,5]}},kt:{"^":"a:1;a,b",
$0:function(){this.b.a0(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a,!1)
return}},ku:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d3(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
bb:function(a,b,c){var z=new L.dy(null,null,null,null,null,null)
new L.pM(a,b,c).$1(z)
return z.q()},
f0:{"^":"ag;",
gbf:function(){return[F.q6(),G.qp(),X.q5()]},
gbQ:function(){return this.c===C.m},
gbR:function(){return this.c===C.r},
gi:function(){return"SlashDefenseSituation"},
aL:function(){var z=new L.dy(null,null,null,null,null,null)
z.p(this)
new L.lM().$1(z)
return z.q()},
aB:function(a,b){if(a===0)return b.ah(this.d)
return},
aQ:function(a,b){return new H.H(a,new L.lN(this),[H.k(a,0)])}},
pM:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gat().c=z
a.gat().f=0
z=this.a.gl()
a.gat().b=z
z=this.b.gl()
a.gat().e=z
a.gat().d=this.c
return a}},
lM:{"^":"a:0;",
$1:function(a){var z=a.gat().f
if(typeof z!=="number")return z.a5()
a.gat().f=z+1
return a}},
lN:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gl(),z.a)||J.i(a.gl(),z.d)}},
nw:{"^":"f0;a,l:b<,c,d,O:e<",
a7:function(a){var z=new L.dy(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.f0))return!1
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
j:function(a){return"SlashDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+H.b(J.f(this.d))+",\ntime="+J.f(this.e)+",\n}"}},
dy:{"^":"d;a,b,c,d,e,f",
gl:function(){return this.gat().c},
gO:function(){return this.gat().f},
gat:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gat().b
x=this.gat().c
w=this.gat().d
v=this.gat().e
u=this.gat().f
z=new L.nw(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("target"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,M,{"^":"",
bc:function(a,b){var z=new M.dz(null,null,null,null,null)
new M.pP(a,b).$1(z)
return z.q()},
f1:{"^":"ag;",
gbf:function(){return[O.q9()]},
gi:function(){return"SlashSituation"},
aL:function(){var z=new M.dz(null,null,null,null,null)
z.p(this)
new M.lO().$1(z)
return z.q()},
aB:function(a,b){if(a===0)return b.ah(this.a)
return},
aQ:function(a,b){return new H.H(a,new M.lP(this),[H.k(a,0)])}},
pP:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gaI().c=z
a.gaI().e=0
z=this.a.gl()
a.gaI().b=z
z=this.b.gl()
a.gaI().d=z
return a}},
lO:{"^":"a:0;",
$1:function(a){var z=a.gaI().e
if(typeof z!=="number")return z.a5()
a.gaI().e=z+1
return a}},
lP:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gl(),z.a)||J.i(a.gl(),z.c)}},
nx:{"^":"f1;a,l:b<,c,O:d<",
a7:function(a){var z=new M.dz(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.f1))return!1
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
j:function(a){return"SlashSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
dz:{"^":"d;a,b,c,d,e",
gl:function(){return this.gaI().c},
gO:function(){return this.gaI().e},
gaI:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaI().b
x=this.gaI().c
w=this.gaI().d
v=this.gaI().e
z=new M.nx(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("target"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,Q,{"^":"",jz:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"FinishSlashGroundedEnemy"},
gab:function(){return""},
gaf:function(){return"(WARNING should not be user-visible)"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z=this.b
b.a6(z.gl(),new Q.jA())
c.f3(0,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",z,a.ga4())
z.bF(c,"<subject> die<s>",!0)
c.G(0,"\n\n",!0)
return H.b(a.gi())+" slains "+H.b(z.gi())+" on the ground"},"$3","gN",6,0,2],
M:function(a,b){return 1},
L:function(a,b){return this.b.gag()&&a.aA(C.c)},
v:{
qW:[function(a){return new Q.jz(null,!1,!0,C.e,a,null)},"$1","qa",2,0,5]}},jA:{"^":"a:0;",
$1:function(a){a.sap(0)
return a}}}],["","",,K,{"^":"",kn:{"^":"K;W:c<,T:d<,S:e<,V:f<,b,a",
gi:function(){return"OnGroundParry"},
gab:function(){return"parry it"},
gaf:function(){return"will <subject> parry it?"},
U:[function(a,b,c){a.al(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.ga4().f+"}}")
S.bz(new K.ko(a,c),new K.kp(this,a,c),null,null)
return H.b(a.db)+" fails to parry "+H.b(this.b.gi())},"$3","gP",6,0,2],
R:[function(a,b,c){a.cs(c,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.ga4().f+"}",!0)
b.cq("FightSituation")
return H.b(a.db)+" parries "+H.b(this.b.gi())},"$3","gN",6,0,2],
M:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbQ())return 0
if(y.gbR())return 1
if(a.gK()===!0)return 0.6
return 0.3},
L:function(a,b){return a.aA(C.c)},
v:{
r0:[function(a){return new K.kn(!1,!0,C.e,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",a,null)},"$1","qo",2,0,5]}},ko:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
this.b.a0(0,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z,!1)
return}},kp:{"^":"a:1;a,b,c",
$0:function(){return this.a.b.d3(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",l6:{"^":"K;V:c<,W:d<,T:e<,S:f<,b,a",
gi:function(){return"RollOutOfWay"},
gab:function(){return"roll out of way"},
gaf:function(){return"will <subject> evade?"},
U:[function(a,b,c){a.al(c,"<subject> tr<ies> to roll out of the way")
a.toString
c.a0(0,"<subject> can't",!0,!1,!1,null,null,!1,a,!1)
return H.b(a.gi())+" fails to roll out of the way"},"$3","gP",6,0,2],
R:[function(a,b,c){a.jL(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gK()===!0){b.a6(a.gl(),new Y.l7())
c.a0(0,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a,!1)}b.cq("FightSituation")
return H.b(a.gi())+" rolls out of the way of "+H.b(this.b.gi())+"'s strike"},"$3","gN",6,0,2],
M:function(a,b){var z,y
z=b.f
y=z.length!==0?C.a.gE(z):null
if(y.gbQ())return 0
if(y.gbR())return 1
if(a.gK()===!0)return 1
return 0.5},
L:function(a,b){return!0},
v:{
r6:[function(a){return new Y.l6(null,!1,!0,C.e,a,null)},"$1","qu",2,0,5]}},l7:{"^":"a:0;",
$1:function(a){a.saN(C.k)
return a}}}],["","",,V,{"^":"",
dp:function(a,b,c){var z=new V.dn(null,null,null,null,null,null)
new V.pQ(a,b,c).$1(z)
return z.q()},
eN:{"^":"ag;",
gbf:function(){return[K.qo(),Y.qu()]},
gbQ:function(){return this.c===C.m},
gbR:function(){return this.c===C.r},
gi:function(){return"OnGroundDefenseSituation"},
aL:function(){var z=new V.dn(null,null,null,null,null,null)
z.p(this)
new V.kl().$1(z)
return z.q()},
aB:function(a,b){if(a===0)return b.ah(this.d)
return},
aQ:function(a,b){return new H.H(a,new V.km(this),[H.k(a,0)])}},
pQ:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gas().c=z
a.gas().f=0
z=this.a.gl()
a.gas().b=z
z=this.b.gl()
a.gas().e=z
a.gas().d=this.c
return a}},
kl:{"^":"a:0;",
$1:function(a){var z=a.gas().f
if(typeof z!=="number")return z.a5()
a.gas().f=z+1
return a}},
km:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gl(),z.a)||J.i(a.gl(),z.d)}},
nu:{"^":"eN;a,l:b<,c,d,O:e<",
a7:function(a){var z=new V.dn(null,null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.eN))return!1
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)),J.j(this.e)))},
j:function(a){return"OnGroundDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntargetOnGround="+H.b(J.f(this.d))+",\ntime="+J.f(this.e)+",\n}"}},
dn:{"^":"d;a,b,c,d,e,f",
gl:function(){return this.gas().c},
gO:function(){return this.gas().f},
gas:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gas().b
x=this.gas().c
w=this.gas().d
v=this.gas().e
u=this.gas().f
z=new V.nu(y,x,w,v,u)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("predeterminedResult"))
if(v==null)H.h(P.m("targetOnGround"))
if(u==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,D,{"^":"",
dC:function(a,b){var z=new D.dB(null,null,null,null,null)
new D.pR(a,b).$1(z)
return z.q()},
fe:{"^":"ag;",
gbf:function(){return[Q.qa()]},
gi:function(){return"StrikeDownSituation"},
aL:function(){var z=new D.dB(null,null,null,null,null)
z.p(this)
new D.mC().$1(z)
return z.q()},
aB:function(a,b){if(a===0)return b.ah(this.a)
return},
aQ:function(a,b){return new H.H(a,new D.mD(this),[H.k(a,0)])}},
pR:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gaJ().c=z
a.gaJ().e=0
z=this.a.gl()
a.gaJ().b=z
z=this.b.gl()
a.gaJ().d=z
return a}},
mC:{"^":"a:0;",
$1:function(a){var z=a.gaJ().e
if(typeof z!=="number")return z.a5()
a.gaJ().e=z+1
return a}},
mD:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.i(a.gl(),z.a)||J.i(a.gl(),z.c)}},
nz:{"^":"fe;a,l:b<,c,O:d<",
a7:function(a){var z=new D.dB(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fe))return!1
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
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
j:function(a){return"StrikeDownSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntargetOnGround="+H.b(J.f(this.c))+",\ntime="+J.f(this.d)+",\n}"}},
dB:{"^":"d;a,b,c,d,e",
gl:function(){return this.gaJ().c},
gO:function(){return this.gaJ().e},
gaJ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaJ().b
x=this.gaJ().c
w=this.gaJ().d
v=this.gaJ().e
z=new D.nz(y,x,w,v)
if(y==null)H.h(P.m("attacker"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("targetOnGround"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,K,{"^":"",dt:{"^":"d;a,b",
j:function(a){return this.b}}}],["","",,D,{"^":"",lQ:{"^":"ac;W:b<,T:c<,S:d<,a",
gX:function(){return""},
gV:function(){return},
gi:function(){return"SlayMonstersAction"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y,x,w,v
z=b.f
y=z.length!==0?C.a.gE(z):null
x=b.dd(y.gbj())
w=b.a
v=x.jw(b)
w.aj(0,v)
C.a.n(z,U.jn(new H.H(w,new D.lR(a,x),[H.k(w,0)]),v,x.r,y))
return H.b(a.gi())+" initiated combat with monsters in "+x.j(0)},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
L:function(a,b){var z=b.f
return H.a2(z.length!==0?C.a.gE(z):null,"$isaf").c}},lR:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gb3()){z=a.gb9()
y=this.a.gb9()
z=z.a
y=y.gl()
if(z==null?y==null:z===y){z=a.gbj()
y=this.b.gi()
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
return z}}}],["","",,Y,{"^":"",mM:{"^":"cq;W:c<,T:d<,S:e<,b,a",
gV:function(){return},
gi:function(){return"TakeExitAction"},
U:[function(a,b,c){throw H.c(new P.as(null))},"$3","gP",6,0,2],
R:[function(a,b,c){var z,y
z=this.b
c.n(0,z.gaU())
y=b.f
H.a2(y.length!==0?C.a.gE(y):null,"$isaf").aY(b,a,z.giP(),c)
return H.b(a.gi())+" went through exit to "+z.a},"$3","gN",6,0,2],
ai:function(a,b){return"WARNING should not be user-visible"},
M:function(a,b){return 1},
L:function(a,b){var z=b.f
if(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").c===!0)return!1
this.b.gjg()
return!0},
v:{
rf:[function(a){return new Y.mM(!1,!1,null,a,null)},"$1","qK",2,0,44]}}}],["","",,F,{"^":"",
eV:function(a,b){var z=new F.dw(null,null,null,null,null)
new F.pB(a,b).$1(z)
return z.q()},
af:{"^":"ag;",
gbf:function(){return[Y.qK()]},
gbg:function(){var z=[]
C.a.aj(z,$.$get$h3())
z.push($.$get$f2())
return z},
gi:function(){return"RoomRoamingSituation"},
aL:function(){var z=new F.dw(null,null,null,null,null)
z.p(this)
new F.l8().$1(z)
return z.q()},
aB:function(a,b){return b.a.bk(0,new F.l9(),new F.la())},
aQ:function(a,b){var z=this.aB(null,b)
if(z==null)return[]
return[z]},
fw:function(a,b){a.a.hI(new F.lc(),!0)},
aY:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.dd(c)
a.fG(this.b,F.eV(z,z.gjv()!=null))
d.iw()
z.c.$3(b,a,d)
d.G(0,"\n\n",!0)
for(y=R.hh(b,a),y=P.U(y,!0,H.v(y,"x",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.ao)(y),++v){u=a.ah(y[v].gl())
t=u.a7(new F.lb(z))
w.aO(0,u)
w.n(0,t)}},
dg:function(a){if(J.i(this.a,$.$get$e0().b))return!1
return!0}},
pB:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.gao().c=z
a.gao().e=0
z=this.a.gi()
a.gao().b=z
a.gao().d=this.b
return a}},
l8:{"^":"a:0;",
$1:function(a){var z=a.gao().e
if(typeof z!=="number")return z.a5()
a.gao().e=z+1
return a}},
l9:{"^":"a:0;",
$1:function(a){return a.gK()===!0&&a.gb3()}},
la:{"^":"a:1;",
$0:function(){return}},
lc:{"^":"a:0;",
$1:function(a){return!a.gbm()}},
lb:{"^":"a:0;a",
$1:function(a){a.sbj(this.a.b)
return a}},
nv:{"^":"af;bj:a<,l:b<,c,O:d<",
a7:function(a){var z=new F.dw(null,null,null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.af))return!1
if(J.i(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.a0(Y.l(Y.l(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)),J.j(this.c)),J.j(this.d)))},
j:function(a){return"RoomRoamingSituation {currentRoomName="+H.b(J.f(this.a))+",\nid="+J.f(this.b)+",\nmonstersAlive="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dw:{"^":"d;a,b,c,d,e",
gbj:function(){return this.gao().b},
sbj:function(a){this.gao().b=a
return a},
gl:function(){return this.gao().c},
sjx:function(a){this.gao().d=a
return a},
gO:function(){return this.gao().e},
gao:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gao().b
x=this.gao().c
w=this.gao().d
v=this.gao().e
z=new F.nv(y,x,w,v)
if(y==null)H.h(P.m("currentRoomName"))
if(x==null)H.h(P.m("id"))
if(w==null)H.h(P.m("monstersAlive"))
if(v==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,V,{"^":"",
mO:function(){var z=new V.dD(null,null,null)
new V.pV().$1(z)
return z.q()},
mZ:function(){var z=new V.dE(null,null,null)
new V.pU().$1(z)
return z.q()},
lV:function(){var z=new V.dA(null,null,null)
new V.pT().$1(z)
return z.q()},
pz:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The journey from slavery to power begins with a single crack of a skull. Agruth, the orc-slaver, falls to the rock floor. You take his shortsword and with help from another slave, Briana, you move Agruth's body to a shady crevice in the tunnel's wall.\n\n\nYou are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the barbed whip of Agruth. Your past live is almost forgotten. [a][b][c][d]\n\n\n<p class=\"meta\">You can use the question mark (?) icons below to learn more about each option.</p>\n",!0)}},
pA:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
jC:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"start_of_book"))return!1
return!0},
R:[function(a,b,c){c.n(0,'You go to church. Entering the church -- just before "The Church is\u2026"')
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"underground_church",c)
return H.b(a.gi())+" successfully performs FleeThroughNecromancersChurch"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,null)
c.n(0,'You go to church but someone notices a shadow (but doesn\'t pursue immediately). Entering the church -- just before "The Church is\u2026"')
N.e7(b,new V.jD())
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"underground_church",c)
return H.b(a.gi())+" fails to perform FleeThroughNecromancersChurch"},"$3","gP",6,0,2],
M:function(a,b){return 0.9},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"The Underground Church is \u2026 It is much less patroled, so you're more likely to slip unnoticed. On the other hand, it's unclear who or what lurks there."},
gW:function(){return!1}},
jD:{"^":"a:0;",
$1:function(a){var z
a.gbx()
z=a.b
a.gbx()
a.b=z+1
return a}},
jE:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"start_of_book"))return!1
return!0},
R:[function(a,b,c){c.n(0,'You go to war forgery (some hidden place there). Entering forges -- just before "The Forges are\u2026"')
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"war_forge",c)
return H.b(a.gi())+" successfully performs FleeThroughWarForge"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,null)
c.n(0,'You go to war forgery but someone notices a shadow (but doesn\'t pursue immediately). Entering forges -- just before "The Forges are\u2026"')
N.e7(b,new V.jF())
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"war_forge",c)
return H.b(a.gi())+" fails to perform FleeThroughWarForge"},"$3","gP",6,0,2],
M:function(a,b){return 0.7},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"The War Forges are where the war machines are built. It's a place that you are familiar with, and it's a more direct path to freedom. But these parts are also full of orcs."},
gW:function(){return!1}},
jF:{"^":"a:0;",
$1:function(a){var z
a.gbx()
z=a.b
a.gbx()
a.b=z+1
return a}},
px:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
py:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pv:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.\n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n",!0)}},
pw:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pt:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Underground Church is a dark, long, tall cave. In the distance, you see the altar. It's glowing. There are unnatural noises.\n\n\n\n\n",!0)
if(H.a2(b.c,"$isbQ").b>=1)c.G(0,"You hear orders being yelled somewhere behind you.",!0)
c.G(0,"\nAfter a bit of searching, you find a twisty passage going from the right hand side of the Church.\n",!0)}},
pu:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pq:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"As you enter, you are greeted by a blast of smoke and heat. The clanging sound of metal on metal and the baking heat draws your attention to the far wall. There, scores of orcs shovel coal into a giant furnace. You have reached the war forges.\n\n\nYou and Briana take a moment to stare at the vast chamber. Likely no other human has seen this and lived. Orc teams grunt as they tilt huge kettles of molten steel into molds for axes, war hammers, and greatswords. As you watch, you notice they move strangely, as if in a dream. None of them complain or even utter a word as they work. Unusual. \n\n\nYou motion for Briana to follow as you duck behind some carts full of iron ore. As you make your way towards what seems to be an exit, you hear strange whispering. You crane your neck and spot a dark robed figure--a priest?--chanting softly to himself by the forge. Despite the whispering quality of his voice, you hear him quite well. His words crawl through your mind with spider-legs:\n\n\n> \u201cThe Dead Prince commands. He sees. He watches through your eyes. Slow work is suffering. Hard work is safety. Death is no escape. The Dead Prince commands.\u201d \n\n\n",!0)
if(H.a2(b.c,"$isbQ").b>=1)c.G(0,"Somewhere behind you, a gutteral tongue bellows a string of orders. You must get moving.",!0)
c.G(0,"\nAfter a bit of searching, you find a corridor to the left. Next to it you spy a crevice apparently leading in the same direction.\n",!0)}},
ps:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
po:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The crevice is small.\n",!0)}},
pp:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
pm:{"^":"a:3;",
$3:function(a,b,c){c.G(0,'You emerge into blinding sunlight. You moan and cover your eyes as the world spins around you and your ears ring like glass chimes. \n\n\nBriana steadies you as sway on your feet. \u201cNow is absolutely the worst time to faint.\u201d\n\n\n\u201cI\u2019m fine,\u201d you mutter. \u201cIt\u2019s just\u2026the sun\u2026been so long\u2026\u201d\n\n\nShe guides you forward and you touch the cliff wall. \u201cI don\u2019t mean to rush you, this being your big reunion with fresh air and all, but we can\u2019t stay. Orcs will be coming through here any moment, and we\'re in no shape to face them. Look at us. We should run as far from this cursed mountain as possible."\n\n\n"I\'m going to the Fort and not a step further," you say, blinking tears from your eyes.\n\n\n"Are you crazy?" She looks at you, then at the cave, then in the direction of Fort Ironcast, a few miles down the mountain slope. "You saw what\'s in the mountain. The Fort has no chance of withstanding a force that size. It will fall within a day!"\n\n\n"If the Fort falls, there\'s no place far enough from here to be safe. You know that."\n\n\nBriana frowns. "I don\'t, actually." There\'s an orcish war cry coming from somewhere down the cave. The Orcs are coming out. Briana\u2019s frown deepens to a scowl. "We\'re losing time. We may never even make it to the Fort, and here we are talking about where to go from there. Well, I see two ways out. Which way do you think we should go?\u201d \n\n\nBlinking hard, you make out your surroundings. Before you lies the winding, beaten path that leads down the mountain. Seems simple enough, but that way inevitably means more orcs.\nBut Briana points you to the edge of a nearby cliff. You peer over the edge and study the descent. Without proper gear it\u2019s a difficult climb down, but not too sheer, and likely no resistance. Perhaps you could chance it?\n',!0)}},
pn:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The cavern entrance to Mt. Bloodrock yawns before you. The wind issuing from its depths gives you the disturbing impression that it\u2019s breathing.\n",!0)}},
pk:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock Pass winds down the slope of mountain. Though the weather-beaten path looks well-traveled, you thankfully come across no patrols at this time. \n\n\n",!0)
if(b.ij("sneak_onto_cart"))c.G(0,"You and Briana stay quiet and still in your hiding spot. An hour later, you peek out of the cart and see that you have reached level ground. You sneak off the cart and hide behind some rocks as it drives away.",!0)
else c.G(0,"You run down the mountain side as fast as your legs can carry you. When you pause, gulping for air, you find you have nearly reached the bottom.",!0)
c.G(0,"\nA few miles further down and you will reach Fort Ironcast.\n",!0)}},
pl:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock pass flows snakelike down the mountain.\n",!0)}},
pi:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The pass slopes down a short way before bending to the left. You inch forward and peer around the corner. Several feet away, a stone gate looms over the pass, flanked on both sides with thick walls too high to climb. An iron gate bearing the insignia of the many-eyed octopus lies between you and freedom. \n\n\nYou spy only two pairs of orc guards standing by the gate. An ox cart is parked before them, the rider apparently negotiating passage with the keepers. From your knowledge of orcish, you can tell that the guards are demanding the driver leave them some food.\n\n\n\u201cLooks like a supply cart,\u201d Briana says. \u201cAnd likely our way out of here. We can sneak onto the back while they\u2019re distracted.\u201d\n\n\nYou don\u2019t answer. With only four distracted orcs and the cart driver, you may be able to take them by surprise.\n\n\nBriana seems to sense what you\u2019re thinking. \u201cA direct attack sounds risky. If they have an alarm, they can bring reinforcements here in a matter of moments.\u201d\n",!0)}},
pj:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The Bloodrock stone gate looms ahead of you.\n",!0)}},
q_:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The orcish guards see you approaching and raise their weapons. One of them smirks.\n\n\n\u201cWe\u2019re lucky, Ruglag!\u201d he says in a rumbling voice. \u201cToday we kill human.\u201d\n",!0)}},
ph:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The stone gate looms before you.\n",!0)}},
lS:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"mountain_pass_gate"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You squeeze through the burlap sacks and hide under some rags. The orcs conclude their negotiations as the driver hurls a bag of turnips to a guard. The gates split open to the rattle of chains and the ominous creak of metal hinges. The ox cart lurches forward into the mountain pass.\nIn the cart you find a small keg of beer. You decide it is worth taking.")
N.e7(b,new V.lT())
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"mountain_pass",c)
return H.b(a.gi())+" successfully performs SneakOntoCart"},"$3","gN",6,0,2],
U:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
M:function(a,b){return 1},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"With the guards distracted, it should be a simple matter to squeeze through the burlap sacks and hide under some rags."},
gW:function(){return!1}},
lT:{"^":"a:0;",
$1:function(a){a.gbx()
a.a=!0
return a}},
mN:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"mountain_pass_gate"))return!1
if(b.jO(this.c)!=null)return!1
return!0},
R:[function(a,b,c){c.n(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of the rock. With a vicious twist you snap one orc\u2019s neck while Briana digs her knife into the other guard\u2019s gullet. You drag them behind the rock, out of sight. In one guard\u2019s pouch you find 10 gold coins. You also take an orcish shield. \n\n\nOnce done, you sneak back away from the gate.")
b.a6(a.gl(),new V.mW())
return H.b(a.gi())+" successfully performs TakeOutGateGuards"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,"You sneak forward as close as you can. There are four guards in total. Two of them are distracted with talking to the cart merchant. But the other two are on the other side of the road, leaning against a large rock. They\u2019re paying attention to the argument and not much else.\n\n\nYou and Briana successfully make it to the other side of that rock. As luck would have it, though, the two orcs decide to look around at that very moment. You dive behind the rock and hope they didn\u2019t see you.")
C.a.n(b.f,V.mO())
return H.b(a.gi())+" fails to perform TakeOutGateGuards"},"$3","gP",6,0,2],
M:function(a,b){return 0.5},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"Two of the orcs seem distracted. You're not particularly good at camouflage but you can still try."},
gW:function(){return!1}},
mW:{"^":"a:0;",
$1:function(a){var z=a.gbb()
if(typeof z!=="number")return z.a5()
a.sbb(z+10)
return a}},
fi:{"^":"ag;",
gbg:function(){return[new A.bB(new V.mR(),"Take the guards out","You decide to finish the job, however improbable it seems that you\u2019ll succeed.","take_out_gate_guards_rescue",null),new A.bB(new V.mS(),"Sneak away","It\u2019s too risky.","take_out_gate_guards_continuation_of_failure",null)]},
gi:function(){return"take_out_gate_guards"},
aL:function(){var z=new V.dD(null,null,null)
z.p(this)
new V.mT().$1(z)
return z.q()},
aB:function(a,b){if(a!==0)return
return b.a.aw(0,new V.mU())},
aQ:function(a,b){return[a.aw(0,new V.mV())]}},
pV:{"^":"a:0;",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
mR:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aH(c,"Suspicious, the orcs come close to investigate the disturbance. You let one pass behind the rock, then grab the other by the throat and into a choke hold. Briana takes the other one out silently with a knife in the back. You drag them to the other side of the rock, out of sight.\n\n\nYou find 10 gold coins in a pouch attached to one of the orcs\u2019 belt. You also take an orcish shield. Then, you sneak back away from the gate.")
b.a6(a.gl(),new V.mP())
b.a6(a.gl(),new V.mQ())
z=b.f
C.a.gE(z).b5(b)
C.a.bn(z)
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Take the guards out)"}},
mP:{"^":"a:0;",
$1:function(a){var z=a.gbc()
if(typeof z!=="number")return z.aF()
a.sbc(z-1)
return a}},
mQ:{"^":"a:0;",
$1:function(a){var z=a.gbb()
if(typeof z!=="number")return z.a5()
a.sbb(z+10)
return a}},
mS:{"^":"a:7;",
$4:function(a,b,c,d){J.aH(c,"Seeing that the window of opportunity has passed, you sneak away from the rock.")
b.eb()
return"TakeOutGateGuardsRescueSituation resolved with rescue/continuation (Sneak away)"}},
mT:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a5()
a.ga2().c=z+1
return a}},
mU:{"^":"a:0;",
$1:function(a){return a.gK()}},
mV:{"^":"a:0;",
$1:function(a){return a.gK()}},
pY:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"After hours of climbing with several stops on the way, you make it all the way down to the base of the mountain. Thankfully, there are no wandering orc patrols here or any other dangers, so you decide to camp behind some rocks and rest for a few hours. Briana takes the watch.\n\n\nWhen it is your turn to go on watch, you see something that you haven\u2019t noticed before. Carved onto the rock face is what appears to be an enormous door; cunning craftsmanship has disguised it to look like part of the mountainside. You point it out to Briana when she awakens and the two of you inspect it more closely. It seems tall enough for a giant and wide enough for a herd of cattle to pass through. Yet you find no indication that is has been opened in many years. And try as you might, neither of you can find a mechanism for opening it.\n\n\nYou give up after an hour\u2019s work of inspection and leave it alone for now. Fort Ironcast still awaits you.\n",!0)}},
pZ:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The great stone doors still stands unopened on the mountainside.\n",!0)}},
pW:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"You and Briana tie yourselves together with some rope. Then, with a deep breath you swing yourself over the side and gently find a toehold with your foot. You lower yourself to the next. And the next. \n\n\nOver the next agonizing hour, you inch your way down the mountainside. You keep looking down to see how much further is left before the slope becomes gentler, but it seems you are hardly making progress.\n\n\n\u201cRemind me again why we decided to go down this way?\u201d Briana grouses. You decide to save your breath. There\u2019s still a ways to go.\n",!0)}},
pX:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"",!0)}},
mX:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"Intimidated by your weapon, the winged serpent abandons its nest and flees to the mountaintop.")
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"mountainside_base",c)
return H.b(a.gi())+" successfully performs ThreatenWingedSerpent"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,"The serpent does not even look at your sword as you swing it wildly. Its reptilian eyes glitter as it opens its jaws wide.")
C.a.n(b.f,V.mZ())
return H.b(a.gi())+" fails to perform ThreatenWingedSerpent"},"$3","gP",6,0,2],
M:function(a,b){return 0.3},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"You have a disadvantage this high up with your backs to the mountainside."},
gW:function(){return!1}},
fn:{"^":"ag;",
gbg:function(){return[new A.bB(new V.n0(),"Get Briana\u2019s help","Maybe your companion has an answer.","threaten_winged_serpent_rescue",null),new A.bB(new V.n1(),"Face the winged serpent head on","You will attack the creature straight on.","threaten_winged_serpent_continuation_of_failure",null)]},
gi:function(){return"threaten_winged_serpent"},
aL:function(){var z=new V.dE(null,null,null)
z.p(this)
new V.n2().$1(z)
return z.q()},
aB:function(a,b){if(a!==0)return
return b.a.aw(0,new V.n3())},
aQ:function(a,b){return[a.aw(0,new V.n4())]}},
pU:{"^":"a:0;",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
n0:{"^":"a:7;",
$4:function(a,b,c,d){J.aH(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"mountainside_base",c)
b.eb()
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
n1:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aH(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a6(a.gl(),new V.n_())
z=b.f
C.a.gE(z).b5(b)
C.a.bn(z)
return"ThreatenWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
n_:{"^":"a:0;",
$1:function(a){a.sap(0)
return a}},
n2:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a5()
a.ga2().c=z+1
return a}},
n3:{"^":"a:0;",
$1:function(a){return a.gK()}},
n4:{"^":"a:0;",
$1:function(a){return a.gK()}},
lU:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"Your sibilant words reach the winged serpent\u2019s ears. It coils in the air for a while longer, then whips towards its nest to clutch possessively at its eggs. You decide it\u2019s time to move on.")
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"mountainside_base",c)
return H.b(a.gi())+" successfully performs SootheWingedSerpent"},"$3","gN",6,0,2],
U:[function(a,b,c){c.n(0,"The serpent sways at your hissing, but is otherwise unimpressed as it opens its jaws menacingly.")
C.a.n(b.f,V.lV())
return H.b(a.gi())+" fails to perform SootheWingedSerpent"},"$3","gP",6,0,2],
M:function(a,b){return 0.8},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"The creature is only defending its nest\u2014maybe you can convince it that you mean no harm."},
gW:function(){return!1}},
f4:{"^":"ag;",
gbg:function(){return[new A.bB(new V.lX(),"Get Briana\u2019s help","Maybe your companion has an answer.","soothe_winged_serpent_rescue",null),new A.bB(new V.lY(),"Face the winged serpent head on","You will attack the creature straight on.","soothe_winged_serpent_continuation_of_failure",null)]},
gi:function(){return"soothe_winged_serpent"},
aL:function(){var z=new V.dA(null,null,null)
z.p(this)
new V.lZ().$1(z)
return z.q()},
aB:function(a,b){if(a!==0)return
return b.a.aw(0,new V.m_())},
aQ:function(a,b){return[a.aw(0,new V.m0())]}},
pT:{"^":"a:0;",
$1:function(a){var z=$.$get$am().ae(1073741823)
a.ga2().b=z
a.ga2().c=0
return a}},
lX:{"^":"a:7;",
$4:function(a,b,c,d){J.aH(c,"Just as the serpent strikes, Briana hurls her dagger at its wing. The weapon grazes the creature\u2019s wing just enough to keep it from directly biting you. Still, one poisoned fang grazes your skin.")
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"mountainside_base",c)
b.eb()
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Get Briana\u2019s help)"}},
lY:{"^":"a:7;",
$4:function(a,b,c,d){var z
J.aH(c,"You slash at the serpent\u2019s head as it moves in to strike you!\n\n\nBut the sky is the creature\u2019s domain, and it easily weaves away from your blows before coiling itself around your sword arm. Before you can react it bites deeply into your neck. You topple over the edge of the mountain. It\u2019s now a matter of what kills you first: the fall or the venom.")
b.a6(a.gl(),new V.lW())
z=b.f
C.a.gE(z).b5(b)
C.a.bn(z)
return"SootheWingedSerpentRescueSituation resolved with rescue/continuation (Face the winged serpent head on)"}},
lW:{"^":"a:0;",
$1:function(a){a.sap(0)
return a}},
lZ:{"^":"a:0;",
$1:function(a){var z=a.ga2().c
if(typeof z!=="number")return z.a5()
a.ga2().c=z+1
return a}},
m_:{"^":"a:0;",
$1:function(a){return a.gK()}},
m0:{"^":"a:0;",
$1:function(a){return a.gK()}},
mY:{"^":"aM;X:b<,i:c<,a",
L:function(a,b){var z=b.f
if(!J.i(H.a2(z.length!==0?C.a.gE(z):null,"$isaf").a,"winged_serpent_nest"))return!1
return!0},
R:[function(a,b,c){c.n(0,"You grab one of the eggs from the nest and hold over the edge. The serpent hovers in place, hissing loudly, but otherwise holding off its attack. \n\n\n\n\nYou grin at it as you juggle the egg from one hand to the other. With one smooth motion you cock your arm back and throw. The serpent gives a piercing cry, then launches itself after its precious offspring.\n\n\n\n\n\u201cGood thinking, throwing that egg,\u201d said Briana.\n\n\n\n\n\u201cYes, well, I just had to make it think I threw it,\u201d you say, and show her the serpent egg in your hand. \u201cI just threw the rock I had in my other hand.\u201d\n\n\n\n\nBriana whistled. \u201cThat should fetch some coin from the right merchants. Now, let\u2019s get out of here before that thing comes back.\u201d")
b.ar("RoomRoamingSituation").aY(b,N.aG(b),"mountainside_base",c)
return H.b(a.gi())+" successfully performs ThreatenWingedSerpentEggs"},"$3","gN",6,0,2],
U:[function(a,b,c){throw H.c(new P.F("Success chance is 100%"))},"$3","gP",6,0,2],
M:function(a,b){return 1},
gT:function(){return!1},
ai:function(a,b){return"Will you be successful?"},
gS:function(){return},
gV:function(){return"Perhaps you can divert its attention."},
gW:function(){return!1}},
pC:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"After an hour, you find yourself at the limit of your endurance. Thankfully, you find a narrow ledge just a few feet below you. You lower yourself onto the edge and sit, leaning gratefully against the rock face. \n\n\nA few dozen feet below, you can see where the mountainside starts to slope less steeply. Perhaps you have another hour in the descent before you could rest again. \n\n\nBriana joins you, breathing hard from the exertion. \n\n\n\u201cI\u2019d rather the orcs kill us than do it ourselves,\u201d she says when she catches her breath. \u201cI\u2019d also like to stay on this ledge forever, if you don\u2019t mind.\u201d\n\n\nBefore you can reply, you spy something at the corner of your vision. Poking out from a crevice in the cliff side wall are dead leaves, branches, and dry grass. Your exhausted mind wonders about what these would be doing this far up, so you move in to investigate. \n\n\n\u201cIt\u2019s\u2026a nest?\u201d Briana says as you both peer into the crevice. Inside is a clutch of six leathery eggs.\n\n\nWhat manner of creature would build a nest here? You ask yourself. And the answer comes to you at the same time as a loud hissing noise fills the air. \n\n\nA large moss-green serpent adorned with black feathered wings hovers above you. It gives one more warning hiss, then dives to attack.\n\n\nYou must defend yourselves.\n",!0)}},
pN:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"The sheer cliff of the mountainside impedes your progress.\n",!0)}},
pg:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"You leave the dust of the Bloodrock mountain pass for the gentler plateaus of the Aelphremede mountain range. The road crawls along the spine of the mountains all the way to Fort Ironcast, which sits on the horizon like a sleeping sentinel.\n\n\nThe last time you saw this path you were still a child, shaking and crying, being led in chains through the grass by your orc captors. The lights from the distant Fort Ironcast may as well have been on the other side of the world. \n\n\nAnd now you are trudging the opposite way, in a bid to save the people who once failed to save you. \n\n\nA movement to your left catches your eye. You are aghast to see an orc patrol fanning out across the grasslands. \n\n\nWith only moments to act, you and Briana drop down to the grass. The patrol nears you, seemingly unconcerned with their proximity to the Fort. In a few moments they will be upon you.\n\n\nAnd right then you are seized by the presence of an alien power. Your vision blanks out as a dark and terrible voice, sonorous as a cathedral music, speaks in your mind.\n\n\n\u201cStand up.\u201d  \n\n\nYou grit your teeth and moan as the pain explodes in your skull. \u201cAren?\u201d hisses Briana. \u201cAren, what\u2019s wrong?\u201d \n\n\n\u201cGet out of my head!\u201d you moan, clutching at your head even as your legs start to lift you upright. Only Briana\u2019s death grip on your arm keeps you low in the grass. \n\n\nAnd still the voice speaks again, relentless as the sea. \u201cYou are mine,\u201d it says. \u201cYour flesh, your thoughts. Your very desires. You have run a long way, but now you will return home. Now I bid you: stand!\u201d \n\n\n\u201cNo!\u201d Yet another voice pierces your mind: Briana\u2019s. Her word cuts through the haze in your vision like a sunray. The dark voice retreats from your brain. When you come to, you are lying flat on the grass. Briana\u2019s hand is still on your arm, radiating a strange, soothing warmth that leaves you at peace.\n\n\n\u201cWhat did you...\u201d you began, but she clamps her other hand on your mouth. You peers through the grass and see the party of orcs that were passing just a few feet away. Thankfully, none of them have noticed you.\n\n\nWhen they leave, you turn to Briana. \u201cIt\u2019s a gift we fae have,\u201d she said. \u201cWe can sense possession and abjure it, at least temporarily. Seems even half-breeds like me have some talent with it. You feeling better yet?\u201d\n\n\n\u201cMuch,\u201d you reply. \u201cBriana...thanks.\u201d\n\n\n\u201cDon\u2019t mention it. You mind telling me what that...thing in your head was?\u201d\n\n\n\u201cAnother time.\u201d You get up and pull her along. \u201cRun now, talk later. Let\u2019s get to safety.\u201d\n\n\nTogether you jog all the way to the every growing silhouette of Fort Ironcast.\n",!0)}},
pr:{"^":"a:3;",
$3:function(a,b,c){c.G(0,"A dirt road streaks through the grass. In the distance, a stone fort looms.\n",!0)}},
nA:{"^":"fi;l:a<,O:b<",
a7:function(a){var z=new V.dD(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fi))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.a0(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)))},
j:function(a){return"TakeOutGateGuardsRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dD:{"^":"d;a,b,c",
gl:function(){return this.ga2().b},
gO:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.nA(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}},
nC:{"^":"fn;l:a<,O:b<",
a7:function(a){var z=new V.dE(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fn))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.a0(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)))},
j:function(a){return"ThreatenWingedSerpentRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dE:{"^":"d;a,b,c",
gl:function(){return this.ga2().b},
gO:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.nC(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}},
ny:{"^":"f4;l:a<,O:b<",
a7:function(a){var z=new V.dA(null,null,null)
z.p(this)
a.$1(z)
return z.q()},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f4))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.a0(Y.l(Y.l(0,J.j(this.a)),J.j(this.b)))},
j:function(a){return"SootheWingedSerpentRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dA:{"^":"d;a,b,c",
gl:function(){return this.ga2().b},
gO:function(){return this.ga2().c},
ga2:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
p:function(a){this.a=a},
q:function(){var z,y,x
z=this.a
if(z==null){y=this.ga2().b
x=this.ga2().c
z=new V.ny(y,x)
if(y==null)H.h(P.m("id"))
if(x==null)H.h(P.m("time"))}this.p(z)
return z}}}],["","",,N,{"^":"",
aG:function(a){return a.gik().aw(0,new N.qd())},
dV:function(){return R.bq(1000+$.$get$dW().ae(99999),"orc",O.cW(),null,new U.bF(!1,10,!0,$.$get$b2(),"sword",C.c),null,0,2,0,!1,2,!1,C.t,0,$.$get$cV())},
fV:function(){return R.bq(1000+$.$get$dW().ae(99999),"goblin",O.cW(),null,new U.bF(!1,10,!0,$.$get$b2(),"scimitar",C.c),null,0,1,0,!1,1,!1,C.t,0,$.$get$cV())},
rp:[function(a){return[N.dV(),N.fV()]},"$1","qO",2,0,22],
rs:[function(a){if(a.f1("take_out_gate_guards")||a.f1("take_out_gate_guards_rescue"))return[N.dV()]
else return[N.dV(),N.fV()]},"$1","qP",2,0,22],
e7:function(a,b){var z,y
z=H.a2(a.c,"$isbQ")
z.toString
y=new M.dH(null,!1,0)
y.p(z)
a.c=b.$1(y).q()},
qd:{"^":"a:0;",
$1:function(a){return a.gK()}}}],["","",,O,{"^":"",
ro:[function(a){var z,y
z=$.$get$d_()
y=z.t
if(y.length>0){y+=" "
z.t=y}z.t=y+a},"$1","qw",2,0,12],
rq:[function(a){$.e3=a},"$1","qx",2,0,12],
h9:[function(a,b,c,d,e,f,g){var z=L.eg(a,!1,!1,d,e,f,g)
$.$get$bL().n(0,z)
return z},function(a){return O.h9(a,!1,!1,null,null,null,null)},function(a,b,c){return O.h9(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","qv",2,13,47,0,0,0,1,1,0],
lj:{"^":"lv;",
ba:function(){var z=0,y=P.aq(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$ba=P.an(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.cJ){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Sending updated stats."
n.a.C(m.A())
m=t.Q
n=Z.m9()
m.toString
l=new A.r(100,null,null,null,null)
l.e=n.A()
m.a.C(l.A())
new P.C(0,$.n,null,[null]).bd(!0)}if(t.r){n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Saving player chronology."
n.a.C(m.A())
t.r=!1
m=t.Q
m.toString
n=new A.r(60,null,null,null,null)
n.b=t.f.c_(0)
m.a.C(n.A())}s=null
case 3:n=t.Q
n.toString
m=new A.r(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.C(m.A())
w=7
z=10
return P.al(t.c7(),$async$ba)
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
n.a.C(l.A())
z=1
break}else{p=n
o=H.A(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.r(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.C(l.A())
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
n.a.C(m.A())
case 1:return P.av(x,y)
case 2:return P.au(v,y)}})
return P.aw($async$ba,y)},
ee:function(){var z,y
this.eM()
this.f.aK(0)
this.r=!0
this.e=this.c
z=this.Q
Z.fB(Z.bD())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bD()
z.a.C(y.A())
this.ba()},
k9:[function(a){var z,y
z={}
z.a=null
y=$.$get$bL()
y.J(0,new O.lG(z,this,a))
z=z.a
if(z==null)throw H.c(P.E("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.f(y)+")"))
this.hZ(z)
this.ba()},"$1","ghK",2,0,31],
hZ:function(a){var z
if(a.gfe()!=null){z=a.r
$.$get$c7().an(z)}z=a.x
if(z!=null)this.dO(z)},
c7:function(){var z=0,y=P.aq(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$c7=P.an(function(a,a0){if(a===1)return P.au(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$c8()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.r(667,null,null,null,null)
q.c="Awarding points."
u.a.C(q.A())
p=r.b.d1()
r=v.Q
q=p.giy()
u=p.b
o=p.c
r.toString
n=new A.r(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.C(n.A())
r=new P.C(0,$.n,null,[null])
r.bd(null)
r.bG(new O.lw(v))
x=!0
z=1
break}m=v.x===v.e.gak().length-1||v.x===v.y
u.a=m
r=v.x
q=v.y
if(r!==q)if(r!=null){if(r<v.e.gak().length){r=v.e.gak()
o=v.x
if(o>>>0!==o||o>=r.length){x=H.e(r,o)
z=1
break}o=!!J.o(r[o]).$isG
r=o}else r=!1
l=r}else l=!1
else l=!1
r="atEndOfPage = "+m+", atStaticChoiceList = "+l
o=v.Q
o.toString
k=new A.r(667,null,null,null,null)
k.c=r
o.a.C(k.A())
k=$.$get$bL()
k.hH(new O.lx(v),!1)
if(k.gk(k)!==0){r=v.Q
r.toString
o=new A.r(667,null,null,null,null)
o.c="We have choices."
r.a.C(o.A())
o=H.v(k,"aX",0)
o=P.U(new H.H(k,new O.ly(u,l),[o]),!0,o)
r=k.a
H.t([],[L.Y])
j=new L.eh(r,o)
if(!j.gI(j)){u=v.Q
r=u.e
if(r!=null){r.cV(new D.bO("Showing new choice before previous one was selected."))
u.e=null}r=P.u
u.e=new P.c1(new P.C(0,$.n,null,[r]),[r])
r=j.d6()
u.a.C(r.A())
u=u.e.a.bG(v.ghK())
i=new O.lz(v)
r=H.k(u,0)
q=$.n
if(q!==C.f){i=P.dX(i,q)
q.toString}u.cI(new P.dO(null,new P.C(0,q,null,[r]),6,new O.lA(),i,[r,r]))
x=!0
z=1
break}else{h=k.bk(0,new O.lB(),new O.lC())
if(h!=null){if(h.gfe()!=null){r=h.r
$.$get$c7().an(r)}r=h.x
if(r!=null)v.dO(r)
k.aO(0,h)}}}r=$.$get$c7()
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
return P.al(v.c9(f),$async$c7)
case 5:x=a0
z=1
break
case 4:r=$.e3
if(r!=null){v.dO(r)
$.e3=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===q){r=v.e.gak().length-1
v.x=r}else if($.fY)$.fY=!1
else{++r
v.x=r}u.a=r===v.e.gak().length-1
r="Resolving block: '"+H.b(v.e.gi())+"' block "+H.b(v.x)+"."
q=v.Q
q.toString
o=new A.r(667,null,null,null,null)
o.c=r
q.a.C(o.A())
if(v.x===v.e.gak().length){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="End of book."
u.a.C(r.A())
r=v.Q
u=v.du()
r.toString
u=u.ei(50)
r.a.C(u.A())
v.Q.a.C(new A.r(80,null,null,null,null).A())
x=!0
z=1
break}r=v.e.gak()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
z=typeof q==="string"?6:8
break
case 6:u=v.Q
r=v.e.gak()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r=P.W
u.f=new P.c1(new P.C(0,$.n,null,[r]),[r])
r=new A.r(30,null,null,null,null)
r.c=q
u.a.C(r.A())
u.f.a.bG(new O.lD(v))
x=!0
z=1
break
z=7
break
case 8:r=v.e.gak()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}z=!!J.o(r[q]).$isG?9:11
break
case 9:r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.C(q.A())
try{r=v.e.gak()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}k.iv(r[q])}catch(b){u=H.z(b)
if(u instanceof M.ci){t=u
s=H.A(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.r(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.C(q.A())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.r(667,null,null,null,null)
q.c="- choices added"
r.a.C(q.A())
if(k.bT(0,new O.lE(u,v))&&v.x===v.e.gak().length-1){u=v.Q
u.toString
r=new A.r(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.C(r.A())
r=v.Q
u=v.du()
r.toString
u=u.ei(50)
r.a.C(u.A())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:r=v.e.gak()
q=v.x
if(q>>>0!==q||q>=r.length){x=H.e(r,q)
z=1
break}q=r[q]
r={func:1,ret:[P.L,P.ae]}
z=H.ay(q,r)?12:14
break
case 12:d=v.x===v.e.gak().length-1?v.du():null
q=v.e.gak()
o=v.x
if(o>>>0!==o||o>=q.length){x=H.e(q,o)
z=1
break}z=15
return P.al(v.c9(H.he(q[o],r)),$async$c7)
case 15:c=a0
if(k.bT(0,new O.lF(u,v))&&v.x===v.e.gak().length-1){u=v.Q
u.toString
r=d.ei(50)
u.a.C(r.A())}x=c
z=1
break
z=13
break
case 14:u=v.e.gak()
r=v.x
if(r>>>0!==r||r>=u.length){x=H.e(u,r)
z=1
break}throw H.c(new P.F("Invalid block: "+H.b(u[r])))
case 13:case 10:case 7:case 1:return P.av(x,y)}})
return P.aw($async$c7,y)},
dO:function(a){var z,y,x,w,v
z=$.$get$cm()
if(z.b.test(H.bk(a))){y=this.d
if(y==null)throw H.c(new P.F("Cannot use ["+J.f(z)+"] when there is no _preGotoPosition."))
x=y.a
z=y.b
if(typeof z!=="number")return z.aF()
w=z-1}else{x=this.b.dc(a,this.e.gde())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.n(0,H.b(z.gi())+">>"+H.b(y.gi()))
this.r=!0}if(this.f.Y(0,H.b(this.e.gi())+">>"+H.b(x.gi()))||x.gfQ()){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!(y?null:z.a).gfQ()
else z=!1}else z=!1
$.fW=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.r(667,null,null,null,null)
v.c=z
y.a.C(v.A())
v=this.e
this.d=new O.lk(v,this.x)
this.e=x
this.x=w
v.e=J.Z(v.gd7(),1)},
eM:function(){var z,y,x,w,v,u
this.x=null
$.$get$c7().aK(0)
$.$get$bL().sk(0,0)
$.oY=null
x=$.$get$cb()
x.aK(0)
w=$.$get$c8()
x.m(0,"points",w)
w.a=0
w.b.aK(0)
this.b.iA()
$.hm=!0
try{this.ja()}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.C(u.A())
throw H.c(z)}this.fD()
$.hm=!1},
c9:function(a){var z=0,y=P.aq(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$c9=P.an(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$d_()
q.t=""
w=4
z=7
return P.al(a.$0(),$async$c9)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.z(m)
r=H.A(m)
q.t+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.f(s)
o=t.e.gi()
n=t.x
throw H.c(new M.ci(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.t.length!==0){t.Q.eq(J.f(q)).bG(new O.lH(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.av(x,y)
case 2:return P.au(v,y)}})
return P.aw($async$c9,y)},
hR:[function(a){var z,y,x,w
z=a.x
if(z==null)return!1
if($.$get$cm().b.test(H.bk(z)))return!1
y=this.b.dc(z,this.e.gde())
if(y==null){z="Target page '"+H.b(z)+"' was not found."
x=this.Q
x.toString
w=new A.r(667,null,null,null,null)
w.c=z
x.a.C(w.A())
return!0}y.gjX()
return!1},"$1","geQ",2,0,48],
du:function(){var z,y,x,w,v,u
this.fD()
try{x=this.e.gi()
w=$.$get$cb()
x=new Z.eW(x,this.b.iV(),null,null,null,null)
x.c=H.az(Z.cF(w),"$isD",[P.p,P.d],"$asD")
x.f=Date.now()
x.e=C.d.jU(H.ar(x),16)
return x}catch(v){z=H.z(v)
y=H.A(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.r(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.C(u.A())
throw H.c(z)}},
fp:function(a,b){var z,y,x
this.eM()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.da("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.C(x.A())
z.j7(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Importing player chronology."
z.a.C(y.A())
this.f.aj(0,b)}z=this.Q
z.toString
y=new A.r(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.C(y.A())
y=$.$get$cb()
Z.lg(a,y,P.dh(P.p,P.bu))
this.cx=H.a2(y.h(0,"game"),"$iseo")
this.cy=H.az(y.h(0,"hitpoints"),"$isah",[P.aF],"$asah")
z=[P.u]
this.db=H.az(y.h(0,"stamina"),"$isah",z,"$asah")
this.dx=H.az(y.h(0,"gold"),"$isah",z,"$asah")
z=this.Q
Z.fB(Z.bD())
z.toString
y=new A.r(90,null,null,null,null)
y.b=Z.bD()
z.a.C(y.A())
y=this.Q
y.toString
z=new A.r(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.C(z.A())
this.ba()},
jq:function(a){return this.fp(a,null)},
dh:[function(a,b,c,d){var z=0,y=P.aq(),x,w=this,v,u,t
var $async$dh=P.an(function(e,f){if(e===1)return P.au(f,y)
while(true)switch(z){case 0:v=$.$get$d_()
if(v.t.length!==0){w.Q.eq(J.f(v))
v.t=""}v=w.Q
v.toString
u=new A.r(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.C(u.A())
u=U.c_
t=new P.C(0,$.n,null,[u])
v.x=new P.c1(t,[u])
x=t
z=1
break
case 1:return P.av(x,y)}})
return P.aw($async$dh,y)},function(a,b){return this.dh(a,b,null,!1)},"k5","$4$rerollEffectDescription$rerollable","$2","gh8",4,5,33,1,0]},
lG:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.ser(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.C(x.A())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cm().b.test(H.bk(z))?y.d.a:y.b.dc(z,y.e.gde())
if(w!=null){y.f.n(0,H.b(y.e.gi())+">>"+H.b(w.gi()))
y.r=!0}}}}},
lw:{"^":"a:0;a",
$1:function(a){return this.a.ba()}},
lx:{"^":"a:0;a",
$1:function(a){return a.ger()||this.a.hR(a)}},
ly:{"^":"a:34;a,b",
$1:function(a){return a.jh(this.b,this.a.a)}},
lz:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.r(667,null,null,null,null)
x.c=z
y.a.C(x.A())
return}},
lA:{"^":"a:0;",
$1:function(a){return a instanceof D.bO}},
lB:{"^":"a:0;",
$1:function(a){return a.gji()}},
lC:{"^":"a:1;",
$0:function(){return}},
lD:{"^":"a:0;a",
$1:function(a){return this.a.ba()}},
lE:{"^":"a:0;a,b",
$1:function(a){return a.cX(!0,this.a.a,this.b.geQ())}},
lF:{"^":"a:0;a,b",
$1:function(a){return a.cX(!0,this.a.a,this.b.geQ())}},
lH:{"^":"a:0;a",
$1:function(a){return this.a.ba()}},
kI:{"^":"d;a,b,f9:c<",
im:function(a,b,c){var z
if(!$.fW){z=J.Z(this.a,b)
this.a=z
this.b.an(new A.cy(b,z,c))}},
n:function(a,b){return this.im(a,b,null)},
a5:function(a,b){this.n(0,b)
return this},
A:function(){return P.a8(["points",this.a])},
fP:function(a){this.a=a.h(0,"points")
this.b.aK(0)},
hh:function(){this.b=P.aY(null,A.cy)},
$isdx:1},
cG:{"^":"kr;ak:d<,d7:e@,a,b,c",
gfQ:function(){return J.a_(this.e,0)}},
lk:{"^":"d;a,b"},
lr:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
dc:function(a,b){var z
if(b!=null&&this.a.Z(b+": "+H.b(a)))return this.a.h(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.Z(a))return z.h(0,a)
else return}},
m:function(a,b,c){this.a.m(0,b,c)
c.si(b)},
iV:function(){var z=new H.M(0,null,null,null,null,null,0,[P.p,null])
this.a.J(0,new O.lt(z))
return z},
j7:function(a){a.J(0,new O.lu(this))},
iA:function(){this.a.J(0,new O.ls())}},
lt:{"^":"a:6;a",
$2:function(a,b){this.a.m(0,a,P.a8(["visitCount",b.gd7()]))}},
lu:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.Z(a))z.h(0,a).sd7(J.ap(b,"visitCount"))}},
ls:{"^":"a:6;",
$2:function(a,b){b.sd7(0)}}}],["","",,M,{"^":"",ci:{"^":"d;a,b,c",
j:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
v:{
ed:function(a){return new M.ci(a,null,null)}}}}],["","",,M,{"^":"",lv:{"^":"d;"}}],["","",,Z,{"^":"",eW:{"^":"d;a,b,c,d,e,f",
ei:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.r(a,null,null,null,null)
z.c=this.d5()
return z},
d5:function(){var z,y
z=new H.M(0,null,null,null,null,null,0,[P.p,null])
z.m(0,"uid",this.e)
z.m(0,"currentPageName",this.a)
z.m(0,"pageMapState",this.b)
z.m(0,"vars",this.c)
z.m(0,"timestamp",this.f)
y=this.d
if(y!=null)z.m(0,"previousText",y)
return C.v.fd(z)},
j:function(a){return this.d5()},
v:{
eX:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.o(a)
z=!!z.$isG||!!z.$isD}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.o(a).$isdx},
cF:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isG){y=[]
for(x=0;x<z.gk(a);++x)if(Z.eX(z.h(a,x)))y.push(Z.cF(z.h(a,x)))
return y}else if(!!z.$isD){w=new H.M(0,null,null,null,null,null,0,[null,null])
z.J(a,new Z.lf(a,w))
return w}else if(!!z.$isdx){v=a.A()
v.m(0,"_class",a.gf9())
return Z.cF(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cE:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.o(a)
if(!!z.$isG){y=[]
for(x=0;x<z.gk(a);++x)y.push(Z.cE(z.h(a,x),b,null))
return y}else{w=!!z.$isD
if(w&&!a.Z("_class")){v=new H.M(0,null,null,null,null,null,0,[null,null])
z.J(a,new Z.le(b,v))
return v}else if(w&&a.Z("_class"))if(c!=null){c.fP(a)
return c}else{u=z.h(a,"_class")
if(!b.Z(u))throw H.c(new Z.da("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
lg:function(a,b,c){a.c.J(0,new Z.lh(b,c))}}},lf:{"^":"a:6;a,b",
$2:function(a,b){if(Z.eX(this.a.h(0,a)))this.b.m(0,a,Z.cF(b))}},le:{"^":"a:6;a,b",
$2:function(a,b){this.b.m(0,a,Z.cE(b,this.a,null))}},lh:{"^":"a:35;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.m(0,a,Z.cE(b,x,null))
else z.m(0,a,Z.cE(b,x,y))}},da:{"^":"d;a",
j:function(a){return"IncompatibleSavegameException: "+this.a}},jI:{"^":"d;a",
j:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",kN:{"^":"d;"},kM:{"^":"kN;"},jQ:{"^":"kM;a,b,c,d,e,f,r,x",
kd:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.p
n=[o,P.d]
H.az(a,"$isD",n,"$asD")
m=new A.r(a.h(0,"type"),null,null,null,null)
if(a.Z("strContent"))m.c=a.h(0,"strContent")
if(a.Z("listContent"))m.b=a.h(0,"listContent")
if(a.Z("intContent"))m.d=a.h(0,"intContent")
if(a.Z("mapContent"))m.e=H.az(a.h(0,"mapContent"),"$isD",n,"$asD")
z=m
switch(z.gej()){case 1070:o=this.e
if(o!=null){o.cV(new D.bO("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.b1()
o.b.b1()
return
case 1000:o=new A.r(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.C(o.A())
n.C(new A.r(10,null,this.c.ch,null,null).A())
return
case 1050:l=z.gjb()
this.e.bB(l)
this.e=null
return
case 1060:o=new A.r(667,null,null,null,null)
o.c="New form state from player received."
this.a.C(o.A())
o=z.gjs()
if(!o.Z("__submitted__"))o.m(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.h(n.c2())
n.by(new G.iS(o))
return
case 1080:o=new A.r(667,null,null,null,null)
o.c="Received slot machine result."
this.a.C(o.A())
k=J.ap(z.ge8(),0)
j=J.ap(z.ge8(),1)
o=this.x
if(k>>>0!==k||k>=4)return H.e(C.y,k)
o.bB(new U.c_(C.y[k],j))
this.x=null
return
case 1010:o=new A.r(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.C(o.A())
o=this.e
if(o!=null){o.cV(new D.bO("Book Restart before choice was selected."))
this.e=null}try{this.c.ee()}catch(i){y=H.z(i)
x=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.C(o.A())
throw H.c(y)}o=new A.r(90,null,null,null,null)
o.b=Z.bD()
n.C(o.A())
n.C(new A.cy(0,0,null).d6().A())
return
case 1020:h=new A.r(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.C(h.A())
h=this.e
if(h!=null){h.cV(new D.bO("Book Load before choice was selected."))
this.e=null}try{h=z.ghc()
f=new Z.eW(null,null,null,null,null,null)
e=H.az(C.v.iH(h),"$isD",n,"$asD")
if(!e.Z("currentPageName")||!e.Z("vars"))H.h(new Z.jI("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.az(e.h(0,"pageMapState"),"$isD",n,"$asD")
f.c=H.az(e.h(0,"vars"),"$isD",n,"$asD")
if(e.Z("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.az(J.hT(z.ge8()),"$isbA",[o],"$asbA")
o=this.c
if(v!=null)o.fp(w,v)
else o.jq(w)}catch(i){o=H.z(i)
if(o instanceof Z.da){u=o
t=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.C(o.A())
this.c.ee()}else{s=o
r=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.C(o.A())
this.c.ee()}}try{o=new A.r(90,null,null,null,null)
o.b=Z.bD()
g.C(o.A())}catch(i){q=H.z(i)
p=H.A(i)
o=new A.r(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.C(o.A())
throw H.c(q)}this.c.toString
g.C(new A.cy(0,$.$get$c8().a,null).d6().A())
return
case 1090:this.f.bB(!0)
this.f=null
return
case 1040:this.c.ba()
return
default:o=new A.r(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gej())+"."
this.a.C(o.A())}},"$1","ghX",2,0,17],
eq:function(a){var z=P.W
this.f=new P.c1(new P.C(0,$.n,null,[z]),[z])
z=new A.r(30,null,null,null,null)
z.c=a
this.a.C(z.A())
return this.f.a}},bO:{"^":"d;a",
j:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",iS:{"^":"d;a",
A:function(){return P.bV(this.a,null,null)},
j:function(a){return"<CurrentState submitted="+H.b(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",r:{"^":"d;ej:a<,e8:b<,hc:c<,jb:d<,js:e<",
gjW:function(){var z=this.a
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
d5:function(){return C.v.fd(this.A())},
A:function(){var z,y
z=new H.M(0,null,null,null,null,null,0,[P.p,P.d])
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
j:function(a){var z,y,x
z="Message "+this.gjW()
y=this.a
x=J.o(y)
return z+(x.w(y,50)||x.w(y,60)||x.w(y,90)||x.w(y,100)||x.w(y,666)||x.w(y,667)?" (async)":"")}}}],["","",,E,{"^":"",kr:{"^":"d;i:a@,jX:b<",
j:function(a){return this.a},
gde:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=J.hN(z,": ")
if(y>0)return J.hS(this.a,0,y)
else return}}}],["","",,A,{"^":"",cy:{"^":"d;iy:a<,b,c",
j:function(a){var z="Score +"+H.b(this.a)+"."
return z},
d6:function(){var z=new A.r(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",Y:{"^":"d;er:a@,b,c,d,aE:e<,V:f<,fe:r<,x,y",
gji:function(){return this.e.length===0},
cX:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this)===!0)return!1
return!0},
jh:function(a,b){return this.cX(a,b,null)},
jS:function(){return P.a8(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bG:function(a){this.r=a
return this},
bi:function(a,b){return C.b.bi(this.e,b.gaE())},
j:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
hf:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.E("String given to choice cannot be null."))
this.e=J.bl(a).fN(a)
this.d=C.b.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isQ:1,
$asQ:function(){return[L.Y]},
v:{
eg:function(a,b,c,d,e,f,g){var z=new L.Y(!1,null,null,null,null,e,null,d,g)
z.hf(a,!1,!1,d,e,f,g)
return z}}},eh:{"^":"eG;a,b",
gk:function(a){return this.b.length},
sk:function(a,b){C.a.sk(this.b,b)
return b},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
m:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
iv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if(J.ap(a,0)!=null){if(0>=a.length)return H.e(a,0)
v=!!J.o(a[0]).$isbu}else v=!1
if(v)try{if(0>=a.length)return H.e(a,0)
this.a=a[0].$0()}catch(u){z=H.z(u)
v=M.ed(J.f(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.L,P.ae]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.ap(y,"string")!=null&&!!J.o(J.ap(y,"string")).$isbu)try{x=J.ap(y,"string").$0()}catch(u){w=H.z(u)
v=M.ed(J.f(w))
throw H.c(v)}else x=""
r=x
q=J.ap(y,"goto")
p=H.he(J.ap(y,"script"),t)
o=new L.Y(!1,null,null,null,null,null,null,q,J.ap(y,"submenu"))
if(r==null)H.h(P.E("String given to choice cannot be null."))
o.e=J.bl(r).fN(r)
o.d=C.b.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.n(v,o)}},
it:function(a,b,c,d,e,f,g){if(b instanceof L.Y)C.a.n(this.b,b)
else if(typeof b==="string")C.a.n(this.b,L.eg(b,!1,!1,e,null,f,g))
else throw H.c(P.E("To add a choice to choices, one must provide either a new Choice element or a String."))},
n:function(a,b){return this.it(a,b,!1,!1,null,null,null)},
jT:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.k(z,0)
x=P.U(new H.H(z,new L.ix(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.r(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.J(x,new L.iy(w))
return w},
d6:function(){return this.jT(null,null,null,null)},
j:function(a){var z=this.b
return new H.ad(z,new L.iz(),[H.k(z,0),null]).cn(0,", ")},
$aseG:function(){return[L.Y]},
$aseL:function(){return[L.Y]},
$asG:function(){return[L.Y]},
$asS:function(){return[L.Y]}},ix:{"^":"a:0;a,b,c",
$1:function(a){return a.cX(this.b,this.a,this.c)}},iy:{"^":"a:0;a",
$1:function(a){H.b(a)
J.aH(this.a.b,a.jS())
a.a=!0}},iz:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cH:{"^":"d;cG:a<,aE:b<",
A:function(){return P.a8(["show",this.a,"string",this.b])}},m6:{"^":"d;a",
A:function(){var z=new H.M(0,null,null,null,null,null,0,[P.p,P.d])
this.a.J(0,new Z.m7(z))
return z},
J:function(a,b){this.a.J(0,b)}},m7:{"^":"a:36;a",
$2:function(a,b){this.a.m(0,a,b.A())}},fA:{"^":"d;i:a@,aU:b<,fa:c<,d0:d<,cG:e<,fv:f<,aE:r<",v:{
fB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.t(new Array(a.length),[Z.fA])
for(y=a.length,x=z.length,w=0,v=0;v<a.length;a.length===y||(0,H.ao)(a),++v){u=a[v]
t=J.I(u)
s=t.h(u,"name")
r=t.h(u,"description")
q=t.h(u,"color")
p=t.h(u,"priority")
o=t.h(u,"show")
n=t.h(u,"notifyOnChange")
t=t.h(u,"string")
if(w>=x)return H.e(z,w)
z[w]=new Z.fA(s,r,q,p,o,n,t);++w}C.a.cH(z,new Z.nb())
return z}}},nb:{"^":"a:6;",
$2:function(a,b){return J.aA(b.gd0(),a.gd0())}},ah:{"^":"d;i:a<,aU:b<,c,fa:d<,d0:e<,f,r,fv:x<,f7:y@,f9:z<,$ti",
gam:function(){return this.f},
sam:function(a){if(!J.i(this.f,a)){this.f=a
this.y=!0
$.cJ=!0}},
gcG:function(){return this.r},
gaE:function(){return this.c.$1(this.f)},
A:function(){return P.a8(["name",this.a,"value",this.f,"show",this.r])},
fP:function(a){var z
this.sam(H.hz(a.h(0,"value"),H.k(this,0)))
z=a.h(0,"show")
if(!J.i(this.r,z)){this.r=z
this.y=!0
$.cJ=!0}},
$isdx:1,
v:{
bC:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cI()
y=z.Z(a)?H.az(z.h(0,a),"$isah",[h],"$asah"):new Z.ah(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.hz(e,h)
y.r=!0
z.m(0,a,y)
return y},
m9:function(){var z,y
z=new Z.m6(new H.M(0,null,null,null,null,null,0,[P.p,Z.cH]))
y=$.$get$cI().gc0()
new H.H(y,new Z.ma(),[H.v(y,"x",0)]).J(0,new Z.mb(z))
$.cJ=!1
return z},
bD:function(){var z=H.t([],[[P.D,P.p,P.d]])
$.$get$cI().gc0().J(0,new Z.m8(z))
return z}}},ma:{"^":"a:0;",
$1:function(a){return a.gf7()}},mb:{"^":"a:20;a",
$1:function(a){var z,y
z=a.gcG()
y=a.gaE()
a.sf7(!1)
this.a.a.m(0,a.a,new Z.cH(z,y))}},m8:{"^":"a:20;a",
$1:function(a){var z=new H.M(0,null,null,null,null,null,0,[P.p,P.d])
z.m(0,"name",a.gi())
z.m(0,"description",a.gaU())
z.m(0,"color",a.gfa())
z.m(0,"priority",a.gd0())
z.m(0,"show",a.gcG())
z.m(0,"notifyOnChange",a.gfv())
z.m(0,"string",a.gaE())
this.a.push(z)}}}],["","",,N,{"^":"",dj:{"^":"d;i:a<,b,c,hy:d<,e,f",
gfi:function(){var z,y,x
z=this.b
y=z==null||J.i(z.gi(),"")
x=this.a
return y?x:z.gfi()+"."+x},
ge7:function(){if($.hk){var z=this.b
if(z!=null)return z.ge7()}return $.p4},
jr:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=this.ge7().b){if(!!J.o(b).$isbu)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.f(b)}else v=null
if(d==null&&x>=$.qt.b)try{x="autogenerated stack trace for "+a.j(0)+" "+H.b(b)
throw H.c(x)}catch(u){z=H.z(u)
y=H.A(u)
d=y
if(c==null)c=z}e=$.n
x=b
w=this.gfi()
t=c
s=d
r=Date.now()
q=$.eH
$.eH=q+1
p=new N.k7(a,x,v,w,new P.co(r,!1),q,t,s,e)
if($.hk)for(o=this;o!=null;){o.eT(p)
o=o.b}else $.$get$eJ().eT(p)}},
bW:function(a,b,c,d){return this.jr(a,b,c,d,null)},
iY:function(a,b,c){return this.bW(C.Q,a,b,c)},
a3:function(a){return this.iY(a,null,null)},
iX:function(a,b,c){return this.bW(C.P,a,b,c)},
aV:function(a){return this.iX(a,null,null)},
iW:function(a,b,c){return this.bW(C.R,a,b,c)},
bu:function(a){return this.iW(a,null,null)},
j9:function(a,b,c){return this.bW(C.x,a,b,c)},
fo:function(a){return this.j9(a,null,null)},
jY:function(a,b,c){return this.bW(C.U,a,b,c)},
ek:function(a){return this.jY(a,null,null)},
h7:function(a,b,c){return this.bW(C.T,a,b,c)},
df:function(a){return this.h7(a,null,null)},
eT:function(a){},
v:{
b5:function(a){return $.$get$eI().jE(a,new N.pH(a))}}},pH:{"^":"a:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.b.dj(z,"."))H.h(P.E("name shouldn't start with a '.'"))
y=C.b.jo(z,".")
if(y===-1)x=z!==""?N.b5(""):null
else{x=N.b5(C.b.ay(z,0,y))
z=C.b.br(z,y+1)}w=new H.M(0,null,null,null,null,null,0,[P.p,N.dj])
w=new N.dj(z,x,null,w,new P.fD(w,[null,null]),null)
if(x!=null)x.ghy().m(0,z,w)
return w}},aJ:{"^":"d;i:a<,am:b<",
w:function(a,b){if(b==null)return!1
return b instanceof N.aJ&&this.b===b.b},
aC:function(a,b){return C.d.aC(this.b,b.gam())},
bK:function(a,b){return C.d.bK(this.b,b.gam())},
bw:function(a,b){var z=b.gam()
if(typeof z!=="number")return H.y(z)
return this.b>z},
bv:function(a,b){return this.b>=b.gam()},
bi:function(a,b){var z=b.gam()
if(typeof z!=="number")return H.y(z)
return this.b-z},
gB:function(a){return this.b},
j:function(a){return this.a},
$isQ:1,
$asQ:function(){return[N.aJ]}},k7:{"^":"d;e7:a<,b,au:c<,d,O:e<,f,b2:r<,b0:x<,y",
j:function(a){return"["+this.a.a+"] "+this.d+": "+H.b(this.b)}}}],["","",,X,{"^":"",
bm:function(a){return X.cR(J.hK(a,0,new X.qf()))},
aR:function(a,b){var z=J.Z(a,b)
if(typeof z!=="number")return H.y(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cR:function(a){if(typeof a!=="number")return H.y(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
qf:{"^":"a:6;",
$2:function(a,b){return X.aR(a,J.j(b))}}}],["","",,U,{"^":"",cD:{"^":"d;a,b",
j:function(a){return this.b}},c_:{"^":"d;a,jZ:b<",
ge5:function(){return this.a===C.A},
j:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
w:function(a,b){if(b==null)return!1
return b instanceof U.c_&&b.a===this.a&&J.i(b.b,this.b)},
gB:function(a){return(this.b===!0?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
rr:[function(a,b){var z,y,x,w,v
z=new D.jQ(b,null,null,null,null,null,null,null)
y=$.eT
$.eT=y+1
x=new H.bY(y,null,!1)
w=init.globalState.d
w.dm(y,x)
w.cf()
w=new H.l0(x,null)
w.hi(x)
z.b=w
w=w.b
w.toString
new P.cL(w,[H.k(w,0)]).aq(z.ghX(),null,null,null)
b.C(new H.c5(z.b.a,init.globalState.d.a))
v=N.lm()
z.c=v
v.Q=z},"$2","ha",4,0,32]},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ez.prototype
return J.jS.prototype}if(typeof a=="string")return J.bU.prototype
if(a==null)return J.eA.prototype
if(typeof a=="boolean")return J.ey.prototype
if(a.constructor==Array)return J.bS.prototype
if(!(a instanceof P.d))return J.be.prototype
return a}
J.aS=function(a){if(a==null)return a
if(a.constructor==Array)return J.bS.prototype
if(!(a instanceof P.d))return J.be.prototype
return a}
J.I=function(a){if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(a.constructor==Array)return J.bS.prototype
if(!(a instanceof P.d))return J.be.prototype
return a}
J.aa=function(a){if(typeof a=="number")return J.bT.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.be.prototype
return a}
J.e2=function(a){if(typeof a=="number")return J.bT.prototype
if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.be.prototype
return a}
J.bl=function(a){if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.be.prototype
return a}
J.Z=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.e2(a).a5(a,b)}
J.bn=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aa(a).cC(a,b)}
J.i=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).w(a,b)}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aa(a).bw(a,b)}
J.cc=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aa(a).aC(a,b)}
J.bo=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.e2(a).bL(a,b)}
J.hI=function(a){if(typeof a=="number")return-a
return J.aa(a).eo(a)}
J.aA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aa(a).aF(a,b)}
J.ap=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.I(a).h(a,b)}
J.aH=function(a,b){return J.aS(a).n(a,b)}
J.cd=function(a,b){return J.e2(a).bi(a,b)}
J.hJ=function(a,b){return J.I(a).Y(a,b)}
J.e8=function(a,b){return J.aS(a).ac(a,b)}
J.hK=function(a,b,c){return J.aS(a).aW(a,b,c)}
J.j=function(a){return J.o(a).gB(a)}
J.e9=function(a){return J.I(a).gI(a)}
J.ab=function(a){return J.aS(a).ga_(a)}
J.hL=function(a){return J.aS(a).gE(a)}
J.aB=function(a){return J.I(a).gk(a)}
J.hM=function(a){return J.o(a).gb8(a)}
J.hN=function(a,b){return J.I(a).bl(a,b)}
J.ea=function(a,b){return J.aS(a).aM(a,b)}
J.hO=function(a,b,c){return J.bl(a).fq(a,b,c)}
J.hP=function(a,b,c){return J.bl(a).jI(a,b,c)}
J.hQ=function(a){return J.aa(a).ef(a)}
J.hR=function(a,b){return J.aS(a).di(a,b)}
J.d0=function(a,b){return J.bl(a).dj(a,b)}
J.hS=function(a,b,c){return J.bl(a).ay(a,b,c)}
J.hT=function(a){return J.aS(a).bp(a)}
J.f=function(a){return J.o(a).j(a)}
J.bp=function(a,b){return J.aa(a).cv(a,b)}
J.hU=function(a,b){return J.aS(a).bI(a,b)}
I.cY=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.G=J.aI.prototype
C.a=J.bS.prototype
C.K=J.ey.prototype
C.d=J.ez.prototype
C.p=J.eA.prototype
C.i=J.bT.prototype
C.b=J.bU.prototype
C.B=new A.a6(0,0,0)
C.C=new A.a6(-1/0,-1/0,-1/0)
C.D=new A.cf(-10,0,100)
C.E=new P.kq()
C.u=new P.nY()
C.F=new P.og()
C.f=new P.ov()
C.w=new P.aU(0)
C.H=new U.cs(0,"ItemType.spear")
C.I=new U.cs(1,"ItemType.branch")
C.J=new U.cs(2,"ItemType.tent")
C.c=new U.cs(3,"ItemType.sword")
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.v=new P.jW(null,null)
C.M=new P.jY(null)
C.N=new P.jZ(null,null)
C.O=new O.k_(0,"KnownToMode.all")
C.P=new N.aJ("FINER",400)
C.Q=new N.aJ("FINEST",300)
C.R=new N.aJ("FINE",500)
C.x=new N.aJ("INFO",800)
C.S=new N.aJ("OFF",2000)
C.T=new N.aJ("SEVERE",1000)
C.U=new N.aJ("WARNING",900)
C.A=new U.cD(0,"Result.success")
C.Y=new U.cD(1,"Result.failure")
C.Z=new U.cD(2,"Result.criticalSuccess")
C.a_=new U.cD(3,"Result.criticalFailure")
C.y=I.cY([C.A,C.Y,C.Z,C.a_])
C.h=I.cY([])
C.V=new H.iI(0,{},C.h,[null,null])
C.k=new R.ds(0,"Pose.standing")
C.j=new R.ds(1,"Pose.offBalance")
C.o=new R.ds(2,"Pose.onGround")
C.q=new K.dt(0,"Predetermination.none")
C.r=new K.dt(1,"Predetermination.successGuaranteed")
C.m=new K.dt(2,"Predetermination.failureGuaranteed")
C.t=new Y.bW("he","him","his","himself")
C.n=new Y.bW("it","it","its","itself")
C.W=new Y.bW("she","her","her","herself")
C.X=new Y.bW("they","them","their","themselves")
C.z=new Y.bW("you","you","your","yourself")
C.e=new Q.l5(0,"Resource.stamina")
C.a0=H.b0("eB")
C.a1=H.b0("ae")
C.a2=H.b0("p")
C.a3=H.b0("W")
C.a4=H.b0("aF")
C.l=H.b0("dynamic")
C.a5=H.b0("u")
C.a6=H.b0("J")
C.a7=new P.bG(null,2)
$.eT=1
$.eP="$cachedFunction"
$.eQ="$cachedInvocation"
$.aC=0
$.br=null
$.ee=null
$.bh=null
$.bI=null
$.bJ=null
$.dT=!1
$.n=C.f
$.eq=0
$.e3=null
$.fW=!1
$.oY=null
$.fY=!1
$.hm=!0
$.cJ=!1
$.hk=!1
$.qt=C.S
$.p4=C.x
$.eH=0
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
I.$lazy(y,x,w)}})(["ev","$get$ev",function(){return H.jO()},"ew","$get$ew",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eq
$.eq=z+1
z="expando$key$"+z}return new P.jm(null,z,[P.u])},"fp","$get$fp",function(){return H.aD(H.cK({
toString:function(){return"$receiver$"}}))},"fq","$get$fq",function(){return H.aD(H.cK({$method$:null,
toString:function(){return"$receiver$"}}))},"fr","$get$fr",function(){return H.aD(H.cK(null))},"fs","$get$fs",function(){return H.aD(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fw","$get$fw",function(){return H.aD(H.cK(void 0))},"fx","$get$fx",function(){return H.aD(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fu","$get$fu",function(){return H.aD(H.fv(null))},"ft","$get$ft",function(){return H.aD(function(){try{null.$method$}catch(z){return z.message}}())},"fz","$get$fz",function(){return H.aD(H.fv(void 0))},"fy","$get$fy",function(){return H.aD(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dJ","$get$dJ",function(){return P.nG()},"b4","$get$b4",function(){var z,y
z=P.ae
y=new P.C(0,P.nn(),null,[z])
y.hp(null,z)
return y},"bK","$get$bK",function(){return[]},"bx","$get$bx",function(){return N.b5("PlannerRecommendation")},"hc","$get$hc",function(){return new K.pf()},"e0","$get$e0",function(){var z=$.$get$hc()
return K.a1("__END_OF_ROAM__",z,z,null,null,[],"ground")},"am","$get$am",function(){return P.cA(null)},"b8","$get$b8",function(){return P.cA(null)},"hn","$get$hn",function(){return N.b5("Storyline")},"fd","$get$fd",function(){return P.b9("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"cV","$get$cV",function(){return L.dI(new L.pF())},"b2","$get$b2",function(){return L.dI(new L.pG())},"hu","$get$hu",function(){return L.dI(new L.pE())},"dq","$get$dq",function(){return new F.kv("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!1,null,null)},"dZ","$get$dZ",function(){return Y.d6(!1,"balance",!0,C.n,$.$get$b2())},"hv","$get$hv",function(){return Y.d6(!1,"pounding",!1,C.n,$.$get$b2())},"eU","$get$eU",function(){return new B.l3("Most moves are easier and more effective when you are firmly in balance.",!1,!1,null,null)},"eY","$get$eY",function(){return new O.li(null,!1,!1,null,null)},"f9","$get$f9",function(){return new Q.m1(null,!1,!0,C.e,null)},"fC","$get$fC",function(){return new M.nc("",!0,C.e,!1,null)},"fX","$get$fX",function(){return P.cA(null)},"hA","$get$hA",function(){return Y.d6(!1,"swing",!0,C.n,$.$get$b2())},"f2","$get$f2",function(){return new D.lQ(!1,!1,null,null)},"hx","$get$hx",function(){return K.a1("start_of_book",new V.pz(),new V.pA(),null,null,H.t([],[Q.w]),"ground")},"es","$get$es",function(){return new V.jC("Flee through the Underground Church","flee_through_necromancers_church",null)},"et","$get$et",function(){return new V.jE("Flee through the War Forges","flee_through_war_forge",null)},"hB","$get$hB",function(){return K.a1("the_shafts",new V.px(),new V.py(),null,null,H.t([new Q.w("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.w]),"ground")},"hD","$get$hD",function(){return K.a1("tunnel",new V.pv(),new V.pw(),N.qO(),null,H.t([new Q.w("entrance_to_bloodrock","Start running again","You finally arrive to the cave's entrance.",null)],[Q.w]),"ground")},"hE","$get$hE",function(){return K.a1("underground_church",new V.pt(),new V.pu(),null,null,H.t([new Q.w("the_shafts","Enter the small passage","You enter the passage and go a long way.",null)],[Q.w]),"ground")},"hF","$get$hF",function(){return K.a1("war_forge",new V.pq(),new V.ps(),null,null,H.t([new Q.w("the_shafts","Enter the corridor","You enter the corridor.",null),new Q.w("war_forge_crevice","Enter the crevice","You take the crevice.",null)],[Q.w]),"ground")},"hG","$get$hG",function(){return K.a1("war_forge_crevice",new V.po(),new V.pp(),null,null,H.t([new Q.w("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.w]),"ground")},"hd","$get$hd",function(){return K.a1("entrance_to_bloodrock",new V.pm(),new V.pn(),null,null,H.t([new Q.w("mountainside_path","Climb down the cliff","You decide to risk the mountainside. With a deep breath, you swing your leg over the edge, find a foothold, and lower yourself down.",null),new Q.w("mountain_pass_gate","Use the path","You steel yourself and trudge down the mountain pass.",null)],[Q.w]),"ground")},"ho","$get$ho",function(){return K.a1("mountain_pass",new V.pk(),new V.pl(),null,null,H.t([new Q.w("ironcast_road","Go to Fort Ironcast","You continue towards the fort.",null)],[Q.w]),"ground")},"hp","$get$hp",function(){return K.a1("mountain_pass_gate",new V.pi(),new V.pj(),null,null,H.t([new Q.w("mountain_pass_guard_post","Go to the gate","You unsheathe your weapon and start towards the guards.",null)],[Q.w]),"ground")},"hq","$get$hq",function(){return K.a1("mountain_pass_guard_post",new V.q_(),new V.ph(),N.qP(),null,H.t([new Q.w("mountain_pass","Go through the gate","You release the winch holding the gate closed. The gate swings ponderously outward, just enough for you and Briana to squeeze through to freedom.",null)],[Q.w]),"ground")},"f3","$get$f3",function(){return new V.lS("Sneak onto the back of the cart","sneak_onto_cart",null)},"fj","$get$fj",function(){return new V.mN("Stealthily take out some of the gate guards","take_out_gate_guards",null)},"hr","$get$hr",function(){return K.a1("mountainside_base",new V.pY(),new V.pZ(),null,null,H.t([new Q.w("ironcast_road","Go to Fort Ironcast","The Fort awaits, so you press on to only road to and from Mt. Bloodrock.",null)],[Q.w]),"ground")},"hs","$get$hs",function(){return K.a1("mountainside_path",new V.pW(),new V.pX(),null,null,H.t([new Q.w("winged_serpent_nest","Continue down","You find a ledge you might rest on for a bit.",null)],[Q.w]),"ground")},"fo","$get$fo",function(){return new V.mX("Scare off the serpent","threaten_winged_serpent",null)},"f5","$get$f5",function(){return new V.lU("Soothe the serpent","soothe_winged_serpent",null)},"fm","$get$fm",function(){return new V.mY("Threaten the serpent\u2019s eggs","threaten_winged_serpent_eggs",null)},"hH","$get$hH",function(){return K.a1("winged_serpent_nest",new V.pC(),new V.pN(),null,null,H.t([new Q.w("mountainside_base","Continue down","You continue your descent to level ground. Thankfully, the end is in sight.",null)],[Q.w]),"ground")},"hl","$get$hl",function(){return K.a1("ironcast_road",new V.pg(),new V.pr(),null,null,H.t([new Q.w("__END_OF_ROAM__","Go to Fort Ironcast (UNIMPLEMENTED)","You make your way closer to the fort.",null)],[Q.w]),"ground")},"h4","$get$h4",function(){return H.t([$.$get$hx(),$.$get$hB(),$.$get$hD(),$.$get$hE(),$.$get$hF(),$.$get$hG(),$.$get$hd(),$.$get$ho(),$.$get$hp(),$.$get$hq(),$.$get$hr(),$.$get$hs(),$.$get$hH(),$.$get$hl()],[K.bZ])},"h3","$get$h3",function(){return H.t([$.$get$es(),$.$get$et(),$.$get$f3(),$.$get$fj(),$.$get$fo(),$.$get$f5(),$.$get$fm()],[A.aM])},"dW","$get$dW",function(){return P.cA(null)},"d_","$get$d_",function(){return P.mE("")},"c8","$get$c8",function(){var z=new O.kI(0,null,"PointsCounter")
z.hh()
return z},"bL","$get$bL",function(){return new L.eh(null,H.t([],[L.Y]))},"cb","$get$cb",function(){return H.eF(P.p,P.d)},"c7","$get$c7",function(){return P.aY(null,{func:1,ret:[P.L,P.ae]})},"cm","$get$cm",function(){return P.b9("^\\s*<<<\\s*$",!0,!1)},"cI","$get$cI",function(){return H.eF(P.p,Z.ah)},"eJ","$get$eJ",function(){return N.b5("")},"eI","$get$eI",function(){return P.dh(P.p,N.dj)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1},{func:1,ret:P.p,args:[R.P,A.at,Y.ai]},{func:1,args:[R.P,A.at,Y.ai]},{func:1,v:true},{func:1,ret:Q.K,args:[R.P]},{func:1,args:[,,]},{func:1,args:[,,,,]},{func:1,args:[P.u]},{func:1,args:[,,,]},{func:1,ret:P.p,args:[P.u]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.p]},{func:1,args:[,P.aN]},{func:1,v:true,args:[P.d],opt:[P.aN]},{func:1,args:[P.aF]},{func:1,ret:P.L},{func:1,v:true,args:[P.d]},{func:1,ret:Y.bt,args:[P.u]},{func:1,args:[R.P]},{func:1,args:[Z.ah]},{func:1,ret:P.J,args:[A.a6]},{func:1,ret:[P.x,R.P],args:[A.at]},{func:1,args:[P.W]},{func:1,args:[Y.a3]},{func:1,args:[P.b6]},{func:1,v:true,args:[P.d,P.aN]},{func:1,v:true,args:[,P.aN]},{func:1,ret:P.W,args:[P.u]},{func:1,args:[{func:1,v:true}]},{func:1,ret:P.p,args:[Q.ac]},{func:1,v:true,args:[P.u]},{func:1,v:true,args:[[P.G,P.p],P.eZ]},{func:1,ret:[P.L,U.c_],args:[P.aF,P.p],named:{rerollEffectDescription:P.p,rerollable:P.W}},{func:1,args:[L.Y]},{func:1,args:[P.p,,]},{func:1,args:[P.p,Z.cH]},{func:1,args:[P.u,R.P]},{func:1,ret:P.p,args:[P.p]},{func:1,args:[P.J,R.P]},{func:1,ret:P.u,args:[P.Q,P.Q]},{func:1,args:[,],opt:[,]},{func:1,ret:P.J,args:[P.J,P.J]},{func:1,ret:P.J,args:[A.cf]},{func:1,ret:Q.cq,args:[Q.w]},{func:1,args:[P.u,,]},{func:1,args:[[P.G,Y.a3],Y.a3]},{func:1,ret:L.Y,args:[P.p],named:{deferToChoiceList:P.W,deferToEndOfPage:P.W,goto:P.p,helpMessage:P.p,script:{func:1,ret:[P.L,P.ae]},submenu:P.p}},{func:1,ret:P.W,args:[L.Y]}]
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
if(x==y)H.qL(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hy(X.ha(),b)},[])
else (function(b){H.hy(X.ha(),b)})([])})})()