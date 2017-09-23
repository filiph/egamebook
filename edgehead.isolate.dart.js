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
if(b5.$isaT)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
if(a0==="A"){processStatics(init.statics[b1]=b2.A,b3)
delete b2.A}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.eh"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.eh"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.eh(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ba=function(){}
var dart=[["","",,H,{"^":"",wN:{"^":"d;a"}}],["","",,J,{"^":"",
p:function(a){return void 0},
aT:{"^":"d;",
R:function(a,b){return a===b},
gB:function(a){return H.ay(a)},
j:function(a){return H.cM(a)}},
f_:{"^":"aT;",
j:function(a){return String(a)},
gB:function(a){return a?519018:218159},
$isad:1},
f1:{"^":"aT;",
R:function(a,b){return null==b},
j:function(a){return"null"},
gB:function(a){return 0},
geb:function(a){return C.a8},
$isap:1},
f4:{"^":"aT;",
gB:function(a){return 0},
j:function(a){return String(a)},
$islO:1},
wU:{"^":"f4;"},
bl:{"^":"f4;"},
c4:{"^":"aT;$ti",
eZ:function(a,b){if(!!a.immutable$list)throw H.c(new P.R(b))},
ck:function(a,b){if(!!a.fixed$length)throw H.c(new P.R(b))},
u:function(a,b){this.ck(a,"add")
a.push(b)},
fn:function(a){this.ck(a,"removeLast")
if(a.length===0)throw H.c(H.b9(a,-1))
return a.pop()},
Z:function(a,b){var z
this.ck(a,"remove")
for(z=0;z<a.length;++z)if(J.u(a[z],b)){a.splice(z,1)
return!0}return!1},
hK:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(!b.$1(w)===c)z.push(w)
if(a.length!==y)throw H.c(new P.B(a))}v=z.length
if(v===y)return
this.sq(a,v)
for(x=0;x<z.length;++x)a[x]=z[x]},
bH:function(a,b){return new H.I(a,b,[H.k(a,0)])},
au:function(a,b){var z
this.ck(a,"addAll")
for(z=J.ah(b);z.v();)a.push(z.d)},
Y:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.B(a))}},
bn:function(a,b){return new H.aj(a,b,[H.k(a,0),null])},
dj:function(a,b){return H.fX(a,b,null,H.k(a,0))},
b6:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.B(a))}return y},
aW:function(a,b,c){var z,y,x
z=a.length
for(y=0;y<z;++y){x=a[y]
if(b.$1(x))return x
if(a.length!==z)throw H.c(new P.B(a))}throw H.c(H.aI())},
cX:function(a,b){return this.aW(a,b,null)},
aq:function(a,b){return a[b]},
gdW:function(a){if(a.length>0)return a[0]
throw H.c(H.aI())},
gD:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.aI())},
gbK:function(a){var z=a.length
if(z===1)return a[0]
if(z===0)throw H.c(H.aI())
throw H.c(H.dn())},
aM:function(a,b,c,d,e){var z,y
this.eZ(a,"setRange")
P.ca(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.e(P.a6(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.c(H.eZ())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
b5:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.c(new P.B(a))}return!1},
bL:function(a,b){var z
this.eZ(a,"sort")
z=b==null?P.tl():b
H.ce(a,0,a.length-1,z)},
eo:function(a){return this.bL(a,null)},
dY:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.u(a[z],b))return z
return-1},
b_:function(a,b){return this.dY(a,b,0)},
ad:function(a,b){var z
for(z=0;z<a.length;++z)if(J.u(a[z],b))return!0
return!1},
ga_:function(a){return a.length===0},
gdZ:function(a){return a.length!==0},
j:function(a){return P.cG(a,"[","]")},
ef:function(a){return P.c7(a,H.k(a,0))},
ga0:function(a){return new J.b2(a,a.length,0,null,[H.k(a,0)])},
gB:function(a){return H.ay(a)},
gq:function(a){return a.length},
sq:function(a,b){this.ck(a,"set length")
if(b<0)throw H.c(P.a6(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.b9(a,b))
if(b>=a.length||b<0)throw H.c(H.b9(a,b))
return a[b]},
t:function(a,b,c){if(!!a.immutable$list)H.e(new P.R("indexed set"))
if(b>=a.length||b<0)throw H.c(H.b9(a,b))
a[b]=c},
$iscI:1,
$ascI:I.ba,
$isL:1,
$isaa:1},
wM:{"^":"c4;$ti"},
b2:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.au(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
c5:{"^":"aT;",
bw:function(a,b){var z
if(typeof b!=="number")throw H.c(H.a3(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gd_(b)
if(this.gd_(a)===z)return 0
if(this.gd_(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gd_:function(a){return a===0?1/a<0:a<0},
jf:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.R(""+a+".round()"))},
b9:function(a,b){var z
if(b>20)throw H.c(P.a6(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gd_(a))return"-"+z
return z},
jm:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.c(P.a6(b,2,36,"radix",null))
z=a.toString(b)
if(C.c.cV(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.e(new P.R("Unexpected toString result: "+z))
x=J.V(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.c.c0("0",w)},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
aK:function(a,b){if(typeof b!=="number")throw H.c(H.a3(b))
return a+b},
c1:function(a,b){if(typeof b!=="number")throw H.c(H.a3(b))
return a-b},
eh:function(a,b){if(typeof b!=="number")throw H.c(H.a3(b))
return a/b},
c0:function(a,b){if(typeof b!=="number")throw H.c(H.a3(b))
return a*b},
bs:function(a,b){return(a|0)===a?a/b|0:this.hQ(a,b)},
hQ:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.R("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
cR:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bJ:function(a,b){if(typeof b!=="number")throw H.c(H.a3(b))
return a<b},
cB:function(a,b){if(typeof b!=="number")throw H.c(H.a3(b))
return a>b},
$isK:1},
f0:{"^":"c5;",$isaX:1,$isK:1,$ist:1},
lN:{"^":"c5;",$isaX:1,$isK:1},
c6:{"^":"aT;",
cV:function(a,b){if(b<0)throw H.c(H.b9(a,b))
if(b>=a.length)H.e(H.b9(a,b))
return a.charCodeAt(b)},
bP:function(a,b){if(b>=a.length)throw H.c(H.b9(a,b))
return a.charCodeAt(b)},
cS:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.qI(b,a,c)},
dN:function(a,b){return this.cS(a,b,0)},
fd:function(a,b,c){var z,y
if(c<0||c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
z=a.length
if(c+z>b.length)return
for(y=0;y<z;++y)if(this.cV(b,c+y)!==this.bP(a,y))return
return new H.fW(c,b,a)},
aK:function(a,b){if(typeof b!=="string")throw H.c(P.dc(b,null,null))
return a+b},
dT:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.be(a,y-z)},
j7:function(a,b,c,d){H.cl(c)
P.n9(d,0,a.length,"startIndex",null)
return H.b_(a,b,c,d)},
j6:function(a,b,c){return this.j7(a,b,c,0)},
h0:function(a,b,c){var z
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
if(typeof b==="string"){z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)}return J.iI(b,a,c)!=null},
cF:function(a,b){return this.h0(a,b,0)},
av:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.c9(b,null,null))
if(b>c)throw H.c(P.c9(b,null,null))
if(c>a.length)throw H.c(P.c9(c,null,null))
return a.substring(b,c)},
be:function(a,b){return this.av(a,b,null)},
dc:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.bP(z,0)===133){x=J.dp(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cV(z,w)===133?J.lP(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
jn:function(a){var z,y
if(typeof a.trimLeft!="undefined"){z=a.trimLeft()
if(z.length===0)return z
y=this.bP(z,0)===133?J.dp(z,1):0}else{y=J.dp(a,0)
z=a}if(y===0)return z
if(y===z.length)return""
return z.substring(y)},
c0:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.c(C.O)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
dY:function(a,b,c){var z
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
b_:function(a,b){return this.dY(a,b,0)},
iP:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
iO:function(a,b){return this.iP(a,b,null)},
ib:function(a,b,c){if(b==null)H.e(H.a3(b))
if(c>a.length)throw H.c(P.a6(c,0,a.length,null,null))
return H.wf(a,b,c)},
ad:function(a,b){return this.ib(a,b,0)},
ga_:function(a){return a.length===0},
bw:function(a,b){var z
if(typeof b!=="string")throw H.c(H.a3(b))
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
gq:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.c(H.b9(a,b))
return a[b]},
$iscI:1,
$ascI:I.ba,
$ism:1,
$isdI:1,
A:{
f2:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dp:function(a,b){var z,y
for(z=a.length;b<z;){y=C.c.bP(a,b)
if(y!==32&&y!==13&&!J.f2(y))break;++b}return b},
lP:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.c.cV(a,z)
if(y!==32&&y!==13&&!J.f2(y))break}return b}}}}],["","",,H,{"^":"",
hx:function(a){return a},
aI:function(){return new P.v("No element")},
dn:function(){return new P.v("Too many elements")},
eZ:function(){return new P.v("Too few elements")},
ce:function(a,b,c,d){if(c-b<=32)H.fQ(a,b,c,d)
else H.fP(a,b,c,d)},
fQ:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.V(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.ao(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.t(a,w,y.h(a,v))
w=v}y.t(a,w,x)}},
fP:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.i.bs(c-b+1,6)
y=b+z
x=c-z
w=C.i.bs(b+c,2)
v=w-z
u=w+z
t=J.V(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.ao(d.$2(s,r),0)){n=r
r=s
s=n}if(J.ao(d.$2(p,o),0)){n=o
o=p
p=n}if(J.ao(d.$2(s,q),0)){n=q
q=s
s=n}if(J.ao(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ao(d.$2(s,p),0)){n=p
p=s
s=n}if(J.ao(d.$2(q,p),0)){n=p
p=q
q=n}if(J.ao(d.$2(r,o),0)){n=o
o=r
r=n}if(J.ao(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ao(d.$2(p,o),0)){n=o
o=p
p=n}t.t(a,y,s)
t.t(a,w,q)
t.t(a,x,o)
t.t(a,v,t.h(a,b))
t.t(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.u(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.t(a,k,t.h(a,m))
t.t(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.t(a,k,t.h(a,m))
g=m+1
t.t(a,m,t.h(a,l))
t.t(a,l,j)
l=h
m=g
break}else{t.t(a,k,t.h(a,l))
t.t(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.t(a,k,t.h(a,m))
t.t(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.t(a,k,t.h(a,m))
g=m+1
t.t(a,m,t.h(a,l))
t.t(a,l,j)
m=g}else{t.t(a,k,t.h(a,l))
t.t(a,l,j)}l=h
break}}f=!1}e=m-1
t.t(a,b,t.h(a,e))
t.t(a,e,r)
e=l+1
t.t(a,c,t.h(a,e))
t.t(a,e,p)
H.ce(a,b,m-2,d)
H.ce(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.u(d.$2(t.h(a,m),r),0);)++m
for(;J.u(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.t(a,k,t.h(a,m))
t.t(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.t(a,k,t.h(a,m))
g=m+1
t.t(a,m,t.h(a,l))
t.t(a,l,j)
m=g}else{t.t(a,k,t.h(a,l))
t.t(a,l,j)}l=h
break}}H.ce(a,m,l,d)}else H.ce(a,m,l,d)},
aa:{"^":"y;$ti"},
b4:{"^":"aa;$ti",
ga0:function(a){return new H.dx(this,this.gq(this),0,null,[H.z(this,"b4",0)])},
Y:function(a,b){var z,y
z=this.gq(this)
for(y=0;y<z;++y){b.$1(this.aq(0,y))
if(z!==this.gq(this))throw H.c(new P.B(this))}},
ga_:function(a){return this.gq(this)===0},
b5:function(a,b){var z,y
z=this.gq(this)
for(y=0;y<z;++y){if(b.$1(this.aq(0,y)))return!0
if(z!==this.gq(this))throw H.c(new P.B(this))}return!1},
aW:function(a,b,c){var z,y,x
z=this.gq(this)
for(y=0;y<z;++y){x=this.aq(0,y)
if(b.$1(x))return x
if(z!==this.gq(this))throw H.c(new P.B(this))}return c.$0()},
cq:function(a,b){var z,y,x,w
z=this.gq(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.aq(0,0))
if(z!==this.gq(this))throw H.c(new P.B(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.aq(0,w))
if(z!==this.gq(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.aq(0,w))
if(z!==this.gq(this))throw H.c(new P.B(this))}return x.charCodeAt(0)==0?x:x}},
bH:function(a,b){return this.cG(0,b)},
bn:function(a,b){return new H.aj(this,b,[H.z(this,"b4",0),null])},
b6:function(a,b,c){var z,y,x
z=this.gq(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.aq(0,x))
if(z!==this.gq(this))throw H.c(new P.B(this))}return y},
br:function(a,b){var z,y,x,w
z=[H.z(this,"b4",0)]
if(b){y=H.n([],z)
C.a.sq(y,this.gq(this))}else{x=new Array(this.gq(this))
x.fixed$length=Array
y=H.n(x,z)}for(w=0;w<this.gq(this);++w)y[w]=this.aq(0,w)
return y},
bZ:function(a){return this.br(a,!0)}},
oK:{"^":"b4;a,b,c,$ti",
ghq:function(){var z=J.aS(this.a)
return z},
ghO:function(){var z,y
z=J.aS(this.a)
y=this.b
if(y>z)return z
return y},
gq:function(a){var z,y
z=J.aS(this.a)
y=this.b
if(y>=z)return 0
return z-y},
aq:function(a,b){var z=this.ghO()+b
if(b<0||z>=this.ghq())throw H.c(P.cF(b,this,"index",null,null))
return J.ey(this.a,z)},
br:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.V(y)
w=x.gq(y)
v=w-z
if(v<0)v=0
u=this.$ti
if(b){t=H.n([],u)
C.a.sq(t,v)}else{s=new Array(v)
s.fixed$length=Array
t=H.n(s,u)}for(r=0;r<v;++r){t[r]=x.aq(y,z+r)
if(x.gq(y)<w)throw H.c(new P.B(this))}return t},
h8:function(a,b,c,d){var z=this.b
if(z<0)H.e(P.a6(z,0,null,"start",null))},
A:{
fX:function(a,b,c,d){var z=new H.oK(a,b,c,[d])
z.h8(a,b,c,d)
return z}}},
dx:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.gq(z)
if(this.b!==y)throw H.c(new P.B(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z.aq(0,x);++this.c
return!0}},
dA:{"^":"y;a,b,$ti",
ga0:function(a){return new H.mi(null,J.ah(this.a),this.b,this.$ti)},
gq:function(a){return J.aS(this.a)},
ga_:function(a){return J.ez(this.a)},
$asy:function(a,b){return[b]},
A:{
bB:function(a,b,c,d){if(!!J.p(a).$isaa)return new H.cC(a,b,[c,d])
return new H.dA(a,b,[c,d])}}},
cC:{"^":"dA;a,b,$ti",$isaa:1,
$asaa:function(a,b){return[b]}},
mi:{"^":"cH;a,b,c,$ti",
v:function(){var z=this.b
if(z.v()){this.a=this.c.$1(z.gS())
return!0}this.a=null
return!1},
gS:function(){return this.a},
$ascH:function(a,b){return[b]}},
aj:{"^":"b4;a,b,$ti",
gq:function(a){return J.aS(this.a)},
aq:function(a,b){return this.b.$1(J.ey(this.a,b))},
$asb4:function(a,b){return[b]},
$asaa:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
I:{"^":"y;a,b,$ti",
ga0:function(a){return new H.bM(J.ah(this.a),this.b,this.$ti)},
bn:function(a,b){return new H.dA(this,b,[H.k(this,0),null])}},
bM:{"^":"cH;a,b,$ti",
v:function(){var z,y
for(z=this.a,y=this.b;z.v();)if(y.$1(z.gS()))return!0
return!1},
gS:function(){return this.a.gS()}},
fH:{"^":"y;a,b,$ti",
ga0:function(a){return new H.o2(J.ah(this.a),this.b,this.$ti)},
A:{
o1:function(a,b,c){if(!!J.p(a).$isaa)return new H.kN(a,H.hx(b),[c])
return new H.fH(a,H.hx(b),[c])}}},
kN:{"^":"fH;a,b,$ti",
gq:function(a){var z=J.aS(this.a)-this.b
if(z>=0)return z
return 0},
$isaa:1},
o2:{"^":"cH;a,b,$ti",
v:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.v()
this.b=0
return z.v()},
gS:function(){return this.a.gS()}},
kO:{"^":"d;$ti",
v:function(){return!1},
gS:function(){return}}}],["","",,H,{"^":"",
ci:function(a,b){var z=a.cm(b)
if(!init.globalState.d.cy)init.globalState.f.b8()
return z},
ij:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isL)throw H.c(P.F("Arguments to main must be a List: "+H.b(y)))
init.globalState=new H.qv(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eX()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.q5(P.b6(null,H.cg),0)
x=P.t
y.z=new H.P(0,null,null,null,null,null,0,[x,H.e4])
y.ch=new H.P(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.qu()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.lF,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.qw)}if(init.globalState.x)return
y=init.globalState.a++
w=P.af(null,null,null,x)
v=new H.cb(0,null,!1)
u=new H.e4(y,new H.P(0,null,null,null,null,null,0,[x,H.cb]),w,init.createNewIsolate(),v,new H.bc(H.d9()),new H.bc(H.d9()),!1,!1,[],P.af(null,null,null,null),null,null,!1,!0,P.af(null,null,null,null))
w.u(0,0)
u.dm(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.at(a,{func:1,args:[,]}))u.cm(new H.vk(z,a))
else if(H.at(a,{func:1,args:[,,]}))u.cm(new H.vl(z,a))
else u.cm(a)
init.globalState.f.b8()},
lJ:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.lK()
return},
lK:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.R("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.R('Cannot extract URI from "'+z+'"'))},
lF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cX(!0,[]).bz(b.data)
y=J.V(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cX(!0,[]).bz(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cX(!0,[]).bz(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.t
p=P.af(null,null,null,q)
o=new H.cb(0,null,!1)
n=new H.e4(y,new H.P(0,null,null,null,null,null,0,[q,H.cb]),p,init.createNewIsolate(),o,new H.bc(H.d9()),new H.bc(H.d9()),!1,!1,[],P.af(null,null,null,null),null,null,!1,!0,P.af(null,null,null,null))
p.u(0,0)
n.dm(0,o)
init.globalState.f.a.aw(new H.cg(n,new H.lG(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b8()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").E(y.h(z,"msg"))
init.globalState.f.b8()
break
case"close":init.globalState.ch.Z(0,$.$get$eY().h(0,a))
a.terminate()
init.globalState.f.b8()
break
case"log":H.lE(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.a_(["command","print","msg",z])
q=new H.bn(!0,P.bP(null,P.t)).b2(q)
y.toString
self.postMessage(q)}else P.eo(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
lE:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.a_(["command","log","msg",a])
x=new H.bn(!0,P.bP(null,P.t)).b2(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.C(w)
z=H.E(w)
y=P.cD(z)
throw H.c(y)}},
lH:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.fs=$.fs+("_"+y)
$.ft=$.ft+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(["spawned",new H.ch(y,x),w,z.r])
x=new H.lI(a,b,c,d,z)
if(e){z.eY(w,w)
init.globalState.f.a.aw(new H.cg(z,x,"start isolate"))}else x.$0()},
qZ:function(a){return new H.cX(!0,[]).bz(new H.bn(!1,P.bP(null,P.t)).b2(a))},
vk:{"^":"a:2;a,b",
$0:function(){this.b.$1(this.a.a)}},
vl:{"^":"a:2;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
qv:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",A:{
qw:function(a){var z=P.a_(["command","print","msg",a])
return new H.bn(!0,P.bP(null,P.t)).b2(z)}}},
e4:{"^":"d;p:a<,b,c,iM:d<,ie:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
eY:function(a,b){if(!this.f.R(0,a))return
if(this.Q.u(0,b)&&!this.y)this.y=!0
this.cf()},
j5:function(a){var z,y
if(!this.y)return
z=this.Q
z.Z(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
init.globalState.f.a.eX(y)}this.y=!1}this.cf()},
i1:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.R(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
j3:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.R(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.e(new P.R("removeRange"))
P.ca(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fV:function(a,b){if(!this.r.R(0,a))return
this.db=b},
iy:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.E(c)
return}z=this.cx
if(z==null){z=P.b6(null,null)
this.cx=z}z.aw(new H.ql(a,c))},
ix:function(a,b){var z
if(!this.r.R(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.e1()
return}z=this.cx
if(z==null){z=P.b6(null,null)
this.cx=z}z.aw(this.giN())},
iz:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.eo(a)
if(b!=null)P.eo(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.f(a)
y[1]=b==null?null:b.j(0)
for(x=new P.ac(z,z.r,null,null,[null]),x.c=z.e;x.v();)x.d.E(y)},
cm:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.C(u)
v=H.E(u)
this.iz(w,v)
if(this.db){this.e1()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.giM()
if(this.cx!=null)for(;t=this.cx,!t.ga_(t);)this.cx.d4().$0()}return y},
d0:function(a){return this.b.h(0,a)},
dm:function(a,b){var z=this.b
if(z.a9(a))throw H.c(P.cD("Registry: ports must be registered only once."))
z.t(0,a,b)},
cf:function(){var z=this.b
if(z.gq(z)-this.c.a>0||this.y||!this.x)init.globalState.z.t(0,this.a,this)
else this.e1()},
e1:[function(){var z,y,x
z=this.cx
if(z!=null)z.aV(0)
for(z=this.b,y=z.gc_(),y=y.ga0(y);y.v();)y.gS().hl()
z.aV(0)
this.c.aV(0)
init.globalState.z.Z(0,this.a)
this.dx.aV(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].E(z[x+1])
this.ch=null}},"$0","giN",0,0,7]},
ql:{"^":"a:7;a,b",
$0:function(){this.a.E(this.b)}},
q5:{"^":"d;a,b",
ik:function(){var z=this.a
if(z.b===z.c)return
return z.d4()},
fv:function(){var z,y,x
z=this.ik()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.a9(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.ga_(y)}else y=!1
else y=!1
else y=!1
if(y)H.e(P.cD("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.ga_(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a_(["command","close"])
x=new H.bn(!0,new P.ht(0,null,null,null,null,null,0,[null,P.t])).b2(x)
y.toString
self.postMessage(x)}return!1}z.j1()
return!0},
eT:function(){if(self.window!=null)new H.q6(this).$0()
else for(;this.fv(););},
b8:function(){var z,y,x,w,v
if(!init.globalState.x)this.eT()
else try{this.eT()}catch(x){z=H.C(x)
y=H.E(x)
w=init.globalState.Q
v=P.a_(["command","error","msg",H.b(z)+"\n"+H.b(y)])
v=new H.bn(!0,P.bP(null,P.t)).b2(v)
w.toString
self.postMessage(v)}}},
q6:{"^":"a:7;a",
$0:function(){if(!this.a.fv())return
P.p6(C.E,this)}},
cg:{"^":"d;a,b,c",
j1:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.cm(this.b)}},
qu:{"^":"d;"},
lG:{"^":"a:2;a,b,c,d,e,f",
$0:function(){H.lH(this.a,this.b,this.c,this.d,this.e,this.f)}},
lI:{"^":"a:7;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.at(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.at(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.cf()}},
ho:{"^":"d;"},
ch:{"^":"ho;b,a",
E:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.qZ(a)
if(z.gie()===y){y=J.V(x)
switch(y.h(x,0)){case"pause":z.eY(y.h(x,1),y.h(x,2))
break
case"resume":z.j5(y.h(x,1))
break
case"add-ondone":z.i1(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.j3(y.h(x,1))
break
case"set-errors-fatal":z.fV(y.h(x,1),y.h(x,2))
break
case"ping":z.iy(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ix(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.u(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.Z(0,y)
break}return}init.globalState.f.a.aw(new H.cg(z,new H.qx(this,x),"receive"))},
R:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.ch){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return this.b.a}},
qx:{"^":"a:2;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.he(this.b)}},
e7:{"^":"ho;b,c,a",
E:function(a){var z,y,x
z=P.a_(["command","message","port",this,"msg",a])
y=new H.bn(!0,P.bP(null,P.t)).b2(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
R:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.e7){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
cb:{"^":"d;a,b,c",
hl:function(){this.c=!0
this.b=null},
bk:function(){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.Z(0,y)
z.c.Z(0,y)
z.cf()},
he:function(a){if(this.c)return
this.b.$1(a)},
$isna:1},
nb:{"^":"bK;a,b",
bm:function(a,b,c,d){var z=this.b
z.toString
return new P.cW(z,[H.k(z,0)]).bm(a,b,c,d)},
bk:[function(){this.a.bk()
this.b.bk()},"$0","gi9",0,0,7],
h6:function(a){var z=new P.qL(null,0,null,null,null,null,this.gi9(),[null])
this.b=z
this.a.b=z.ghU(z)},
$asbK:I.ba},
p2:{"^":"d;a,b,c",
h9:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aw(new H.cg(y,new H.p4(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.d4(new H.p5(this,b),0),a)}else throw H.c(new P.R("Timer greater than 0."))},
A:{
p3:function(a,b){var z=new H.p2(!0,!1,null)
z.h9(a,b)
return z}}},
p4:{"^":"a:7;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
p5:{"^":"a:7;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
bc:{"^":"d;a",
gB:function(a){var z=this.a
z=C.i.cR(z,0)^C.i.bs(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.bc){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
bn:{"^":"d;a,b",
b2:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.t(0,a,z.gq(z))
z=J.p(a)
if(!!z.$iscI)return this.fR(a)
if(!!z.$islC){x=this.gfO()
z=a.gbU()
z=H.bB(z,x,H.z(z,"y",0),null)
z=P.N(z,!0,H.z(z,"y",0))
w=a.gc_()
w=H.bB(w,x,H.z(w,"y",0),null)
return["map",z,P.N(w,!0,H.z(w,"y",0))]}if(!!z.$islO)return this.fS(a)
if(!!z.$isaT)this.fC(a)
if(!!z.$isna)this.cu(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isch)return this.fT(a)
if(!!z.$ise7)return this.fU(a)
if(!!z.$isa){v=a.$static_name
if(v==null)this.cu(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isbc)return["capability",a.a]
if(!(a instanceof P.d))this.fC(a)
return["dart",init.classIdExtractor(a),this.fQ(init.classFieldsExtractor(a))]},"$1","gfO",2,0,0],
cu:function(a,b){throw H.c(new P.R((b==null?"Can't transmit:":b)+" "+H.b(a)))},
fC:function(a){return this.cu(a,null)},
fR:function(a){var z=this.fP(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.cu(a,"Can't serialize indexable: ")},
fP:function(a){var z,y
z=[]
C.a.sq(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.b2(a[y])
return z},
fQ:function(a){var z
for(z=0;z<a.length;++z)C.a.t(a,z,this.b2(a[z]))
return a},
fS:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.cu(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sq(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.b2(a[z[x]])
return["js-object",z,y]},
fU:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fT:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
cX:{"^":"d;a,b",
bz:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.F("Bad serialized message: "+H.b(a)))
switch(C.a.gdW(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.n(this.cl(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.n(this.cl(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.cl(z)
case"const":z=a[1]
this.b.push(z)
y=H.n(this.cl(z),[null])
y.fixed$length=Array
return y
case"map":return this.io(a)
case"sendport":return this.ip(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.im(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.bc(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.cl(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.c("couldn't deserialize: "+H.b(a))}},"$1","gil",2,0,0],
cl:function(a){var z
for(z=0;z<a.length;++z)C.a.t(a,z,this.bz(a[z]))
return a},
io:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.aV()
this.b.push(x)
z=J.eA(z,this.gil()).bZ(0)
for(w=J.V(y),v=0;v<z.length;++v)x.t(0,z[v],this.bz(w.h(y,v)))
return x},
ip:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.d0(x)
if(u==null)return
t=new H.ch(u,y)}else t=new H.e7(z,x,y)
this.b.push(t)
return t},
im:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.V(z),v=J.V(y),u=0;u<w.gq(z);++u)x[w.h(z,u)]=this.bz(v.h(y,u))
return x}}}],["","",,H,{"^":"",
jT:function(){throw H.c(new P.R("Cannot modify unmodifiable Map"))},
ul:function(a){return init.types[a]},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.f(a)
if(typeof z!=="string")throw H.c(H.a3(a))
return z},
ay:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bF:function(a){var z,y,x,w,v,u,t,s
z=J.p(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.Q||!!J.p(a).$isbl){v=C.T(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.c.bP(w,0)===36)w=C.c.be(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.d7(H.cm(a),0,null),init.mangledGlobalNames)},
cM:function(a){return"Instance of '"+H.bF(a)+"'"},
an:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.i.cR(z,10))>>>0,56320|z&1023)}throw H.c(P.a6(a,0,1114111,null,null))},
fr:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.a3(a))
return a[b]},
b9:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b1(!0,b,"index",null)
z=J.aS(a)
if(b<0||b>=z)return P.cF(b,a,"index",null,z)
return P.c9(b,"index",null)},
a3:function(a){return new P.b1(!0,a,null,null)},
d2:function(a){if(typeof a!=="number")throw H.c(H.a3(a))
return a},
cl:function(a){if(typeof a!=="string")throw H.c(H.a3(a))
return a},
c:function(a){var z
if(a==null)a=new P.cK()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.it})
z.name=""}else z.toString=H.it
return z},
it:function(){return J.f(this.dartException)},
e:function(a){throw H.c(a)},
au:function(a){throw H.c(new P.B(a))},
C:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.wp(a)
if(a==null)return
if(a instanceof H.dk)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.i.cR(x,16)&8191)===10)switch(w){case 438:return z.$1(H.dr(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.b(y)+" (Error "+w+")"
return z.$1(new H.fi(v,null))}}if(a instanceof TypeError){u=$.$get$h4()
t=$.$get$h5()
s=$.$get$h6()
r=$.$get$h7()
q=$.$get$hb()
p=$.$get$hc()
o=$.$get$h9()
$.$get$h8()
n=$.$get$he()
m=$.$get$hd()
l=u.b7(y)
if(l!=null)return z.$1(H.dr(y,l))
else{l=t.b7(y)
if(l!=null){l.method="call"
return z.$1(H.dr(y,l))}else{l=s.b7(y)
if(l==null){l=r.b7(y)
if(l==null){l=q.b7(y)
if(l==null){l=p.b7(y)
if(l==null){l=o.b7(y)
if(l==null){l=r.b7(y)
if(l==null){l=n.b7(y)
if(l==null){l=m.b7(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.fi(y,l==null?null:l.method))}}return z.$1(new H.pc(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fR()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b1(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fR()
return a},
E:function(a){var z
if(a instanceof H.dk)return a.b
if(a==null)return new H.hv(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.hv(a,null)},
uC:function(a){if(a==null||typeof a!='object')return J.h(a)
else return H.ay(a)},
tN:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.t(0,a[y],a[x])}return b},
ur:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ci(b,new H.us(a))
case 1:return H.ci(b,new H.ut(a,d))
case 2:return H.ci(b,new H.uu(a,d,e))
case 3:return H.ci(b,new H.uv(a,d,e,f))
case 4:return H.ci(b,new H.uw(a,d,e,f,g))}throw H.c(P.cD("Unsupported number of arguments for wrapped closure"))},
d4:function(a,b){var z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.ur)
a.$identity=z
return z},
jO:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isL){z.$reflectionInfo=c
x=H.nd(z).r}else x=c
w=d?Object.create(new H.oo().constructor.prototype):Object.create(new H.dd(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aH
$.aH=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.eL(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ul,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.eG:H.de
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.eL(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
jL:function(a,b,c,d){var z=H.de
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
eL:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.jN(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.jL(y,!w,z,b)
if(y===0){w=$.aH
$.aH=w+1
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.bx
if(v==null){v=H.cw("self")
$.bx=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aH
$.aH=w+1
t+=H.b(w)
w="return function("+t+"){return this."
v=$.bx
if(v==null){v=H.cw("self")
$.bx=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
jM:function(a,b,c,d){var z,y
z=H.de
y=H.eG
switch(b?-1:a){case 0:throw H.c(new H.np("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
jN:function(a,b){var z,y,x,w,v,u,t,s
z=H.jC()
y=$.eF
if(y==null){y=H.cw("receiver")
$.eF=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.jM(w,!u,x,b)
if(w===1){y="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
u=$.aH
$.aH=u+1
return new Function(y+H.b(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
u=$.aH
$.aH=u+1
return new Function(y+H.b(u)+"}")()},
eh:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isL){c.fixed$length=Array
z=c}else z=c
return H.jO(a,b,z,!!d,e,f)},
uL:function(a,b){var z=J.V(b)
throw H.c(H.cy(H.bF(a),z.av(b,3,z.gq(b))))},
A:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.p(a)[b]
else z=!0
if(z)return a
H.uL(a,b)},
ej:function(a){var z=J.p(a)
return"$S" in z?z.$S():null},
at:function(a,b){var z
if(a==null)return!1
z=H.ej(a)
return z==null?!1:H.em(z,b)},
hZ:function(a,b){var z,y
if(a==null)return a
if(H.at(a,b))return a
z=H.Y(b,null)
y=H.ej(a)
throw H.c(H.cy(y!=null?H.Y(y,null):H.bF(a),z))},
wm:function(a){throw H.c(new P.k3(a))},
d9:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
hT:function(a){return new H.aA(a,null)},
n:function(a,b){a.$ti=b
return a},
cm:function(a){if(a==null)return
return a.$ti},
i3:function(a,b){return H.ex(a["$as"+H.b(b)],H.cm(a))},
z:function(a,b,c){var z=H.i3(a,b)
return z==null?null:z[c]},
k:function(a,b){var z=H.cm(a)
return z==null?null:z[b]},
Y:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.d7(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.b(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.Y(z,b)
return H.r2(a,b)}return"unknown-reified-type"},
r2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.Y(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.Y(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.Y(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.tM(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.Y(r[p],b)+(" "+H.b(p))}w+="}"}return"("+w+") => "+z},
d7:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bL("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.C=v+", "
u=a[y]
if(u!=null)w=!1
v=z.C+=H.Y(u,c)}return w?"":"<"+z.j(0)+">"},
uk:function(a){var z,y
if(a instanceof H.a){z=H.ej(a)
if(z!=null)return H.Y(z,null)}y=J.p(a).constructor.builtin$cls
if(a==null)return y
return y+H.d7(a.$ti,0,null)},
ex:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aP:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cm(a)
y=J.p(a)
if(y[b]==null)return!1
return H.hL(H.ex(y[d],z),c)},
aF:function(a,b,c,d){if(a==null)return a
if(H.aP(a,b,c,d))return a
throw H.c(H.cy(H.bF(a),function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(b.substring(3)+H.d7(c,0,null),init.mangledGlobalNames)))},
hL:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.al(a[y],b[y]))return!1
return!0},
d3:function(a,b,c){return a.apply(b,H.i3(b,c))},
hP:function(a,b){var z,y,x
if(a==null)return b==null||b.builtin$cls==="d"||b.builtin$cls==="ap"
if(b==null)return!0
z=H.cm(a)
a=J.p(a)
y=a.constructor
if(z!=null){z=z.slice()
z.splice(0,0,y)
y=z}if('func' in b){x=a.$S
if(x==null)return!1
return H.em(x.apply(a,null),b)}return H.al(y,b)},
io:function(a,b){if(a!=null&&!H.hP(a,b))throw H.c(H.cy(H.bF(a),H.Y(b,null)))
return a},
al:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ap")return!0
if('func' in b)return H.em(a,b)
if('func' in a)return b.builtin$cls==="bz"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.Y(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hL(H.ex(u,z),x)},
hK:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.al(z,v)||H.al(v,z)))return!1}return!0},
re:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.al(v,u)||H.al(u,v)))return!1}return!0},
em:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.al(z,y)||H.al(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.hK(x,w,!1))return!1
if(!H.hK(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.al(o,n)||H.al(n,o)))return!1}}return H.re(a.named,b.named)},
wf:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.p(b)
if(!!z.$isf3){z=C.c.be(a,c)
return b.b.test(z)}else{z=z.dN(b,C.c.be(a,c))
return!z.ga_(z)}}},
l:function(a,b,c){var z,y,x
H.cl(c)
if(b==="")if(a==="")return c
else{z=a.length
y=H.b(c)
for(x=0;x<z;++x)y=y+a[x]+H.b(c)
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
xa:[function(a){return a},"$1","hy",2,0,19],
wg:function(a,b,c,d){var z,y,x,w,v,u
z=J.p(b)
if(!z.$isdI)throw H.c(P.dc(b,"pattern","is not a Pattern"))
for(z=z.dN(b,a),z=new H.hm(z.a,z.b,z.c,null),y=0,x="";z.v();){w=z.d
v=w.b
u=v.index
x=x+H.b(H.hy().$1(C.c.av(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.hy().$1(C.c.be(a,y)))
return z.charCodeAt(0)==0?z:z},
b_:function(a,b,c,d){var z,y,x,w,v
if(typeof b==="string"){z=a.indexOf(b,d)
if(z<0)return a
return H.im(a,z,z+b.length,c)}if(b==null)H.e(H.a3(b))
y=J.iE(b,a,d)
x=new H.hw(y.a,y.b,y.c,null)
if(!x.v())return a
w=x.d
y=w.a
v=w.c
H.cl(c)
return H.im(a,y,P.ca(y,y+v.length,a.length,null,null,null),c)},
im:function(a,b,c,d){var z,y
z=a.substring(0,b)
y=a.substring(c)
return z+H.b(d)+y},
jS:{"^":"d;$ti",
ga_:function(a){return this.gq(this)===0},
j:function(a){return P.dB(this)},
t:function(a,b,c){return H.jT()},
$isH:1},
jU:{"^":"jS;a,b,c,$ti",
gq:function(a){return this.a},
a9:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.a9(b))return
return this.eD(b)},
eD:function(a){return this.b[a]},
Y:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.eD(w))}}},
nc:{"^":"d;a,b,c,d,e,f,r,x",A:{
nd:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.nc(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
p7:{"^":"d;a,b,c,d,e,f",
b7:function(a){var z,y,x
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
A:{
aK:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.p7(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cV:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ha:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fi:{"^":"a4;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+z+"' on null"}},
lR:{"^":"a4;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
A:{
dr:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.lR(a,y,z?null:b.receiver)}}},
pc:{"^":"a4;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dk:{"^":"d;a,bM:b<"},
wp:{"^":"a:0;a",
$1:function(a){if(!!J.p(a).$isa4)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
hv:{"^":"d;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
us:{"^":"a:2;a",
$0:function(){return this.a.$0()}},
ut:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
uu:{"^":"a:2;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
uv:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
uw:{"^":"a:2;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
a:{"^":"d;",
j:function(a){return"Closure '"+H.bF(this).trim()+"'"},
gfJ:function(){return this},
$isbz:1,
gfJ:function(){return this}},
h3:{"^":"a;"},
oo:{"^":"h3;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dd:{"^":"h3;a,b,c,d",
R:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dd))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.ay(this.a)
else y=typeof z!=="object"?J.h(z):H.ay(z)
return(y^H.ay(this.b))>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+H.cM(z)},
A:{
de:function(a){return a.a},
eG:function(a){return a.c},
jC:function(){var z=$.bx
if(z==null){z=H.cw("self")
$.bx=z}return z},
cw:function(a){var z,y,x,w,v
z=new H.dd("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jH:{"^":"a4;a",
j:function(a){return this.a},
A:{
cy:function(a,b){return new H.jH("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
np:{"^":"a4;a",
j:function(a){return"RuntimeError: "+H.b(this.a)}},
aA:{"^":"d;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gB:function(a){return J.h(this.a)},
R:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.aA){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
P:{"^":"d;a,b,c,d,e,f,r,$ti",
gq:function(a){return this.a},
ga_:function(a){return this.a===0},
gbU:function(){return new H.m7(this,[H.k(this,0)])},
gc_:function(){return H.bB(this.gbU(),new H.lQ(this),H.k(this,0),H.k(this,1))},
a9:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.ez(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.ez(y,a)}else return this.iF(a)},
iF:function(a){var z=this.d
if(z==null)return!1
return this.cp(this.cO(z,this.co(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.c6(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.c6(x,b)
return y==null?null:y.b}else return this.iG(b)},
iG:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.cO(z,this.co(a))
x=this.cp(y,a)
if(x<0)return
return y[x].b},
t:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.dC()
this.b=z}this.er(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.dC()
this.c=y}this.er(y,b,c)}else this.iI(b,c)},
iI:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.dC()
this.d=z}y=this.co(a)
x=this.cO(z,y)
if(x==null)this.dG(z,y,[this.dD(a,b)])
else{w=this.cp(x,a)
if(w>=0)x[w].b=b
else x.push(this.dD(a,b))}},
j2:function(a,b){var z
if(this.a9(a))return this.h(0,a)
z=b.$0()
this.t(0,a,z)
return z},
Z:function(a,b){if(typeof b==="string")return this.eS(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eS(this.c,b)
else return this.iH(b)},
iH:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.cO(z,this.co(a))
x=this.cp(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eU(w)
return w.b},
aV:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
Y:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.B(this))
z=z.c}},
er:function(a,b,c){var z=this.c6(a,b)
if(z==null)this.dG(a,b,this.dD(b,c))
else z.b=c},
eS:function(a,b){var z
if(a==null)return
z=this.c6(a,b)
if(z==null)return
this.eU(z)
this.eA(a,b)
return z.b},
dD:function(a,b){var z,y
z=new H.m6(a,b,null,null,[null,null])
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eU:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
co:function(a){return J.h(a)&0x3ffffff},
cp:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.u(a[y].a,b))return y
return-1},
j:function(a){return P.dB(this)},
c6:function(a,b){return a[b]},
cO:function(a,b){return a[b]},
dG:function(a,b,c){a[b]=c},
eA:function(a,b){delete a[b]},
ez:function(a,b){return this.c6(a,b)!=null},
dC:function(){var z=Object.create(null)
this.dG(z,"<non-identifier-key>",z)
this.eA(z,"<non-identifier-key>")
return z},
$islC:1,
$isH:1,
A:{
f5:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])}}},
lQ:{"^":"a:0;a",
$1:function(a){return this.a.h(0,a)}},
m6:{"^":"d;a,b,c,d,$ti"},
m7:{"^":"aa;a,$ti",
gq:function(a){return this.a.a},
ga_:function(a){return this.a.a===0},
ga0:function(a){var z,y
z=this.a
y=new H.m8(z,z.r,null,null,this.$ti)
y.c=z.e
return y},
Y:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.c(new P.B(z))
y=y.c}}},
m8:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
f3:{"^":"d;a,b,c,d",
j:function(a){return"RegExp/"+this.a+"/"},
ghC:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.dq(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ghB:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.dq(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
cS:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return new H.pM(this,b,c)},
dN:function(a,b){return this.cS(a,b,0)},
hs:function(a,b){var z,y
z=this.ghC()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.hu(this,y)},
hr:function(a,b){var z,y
z=this.ghB()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(y.pop()!=null)return
return new H.hu(this,y)},
fd:function(a,b,c){if(c>b.length)throw H.c(P.a6(c,0,b.length,null,null))
return this.hr(b,c)},
$isdI:1,
A:{
dq:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.c(new P.eT("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
hu:{"^":"d;a,b",
h:function(a,b){return this.b[b]},
$isbf:1},
pM:{"^":"c3;a,b,c",
ga0:function(a){return new H.hm(this.a,this.b,this.c,null)},
$asc3:function(){return[P.bf]},
$asy:function(){return[P.bf]}},
hm:{"^":"d;a,b,c,d",
gS:function(){return this.d},
v:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.hs(z,y)
if(x!=null){this.d=x
z=x.b
y=z.index
w=y+z[0].length
this.c=y===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}},
fW:{"^":"d;a,b,c",
h:function(a,b){if(b!==0)H.e(P.c9(b,null,null))
return this.c},
$isbf:1},
qI:{"^":"y;a,b,c",
ga0:function(a){return new H.hw(this.a,this.b,this.c,null)},
$asy:function(){return[P.bf]}},
hw:{"^":"d;a,b,c,d",
v:function(){var z,y,x,w,v,u,t
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
this.d=new H.fW(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gS:function(){return this.d}}}],["","",,H,{"^":"",
tM:function(a){var z=H.n(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
uK:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
pN:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.rf()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.d4(new P.pP(z),1)).observe(y,{childList:true})
return new P.pO(z,y,x)}else if(self.setImmediate!=null)return P.rg()
return P.rh()},
x4:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.d4(new P.pQ(a),0))},"$1","rf",2,0,15],
x5:[function(a){++init.globalState.f.b
self.setImmediate(H.d4(new P.pR(a),0))},"$1","rg",2,0,15],
x6:[function(a){P.dV(C.E,a)},"$1","rh",2,0,15],
aD:function(a,b){P.e8(null,a)
return b.a},
ar:function(a,b){P.e8(a,b)},
aC:function(a,b){b.bx(a)},
aB:function(a,b){b.dQ(H.C(a),H.E(a))},
e8:function(a,b){var z,y,x,w
z=new P.qR(b)
y=new P.qS(b)
x=J.p(a)
if(!!x.$isJ)a.dH(z,y)
else if(!!x.$isO)a.ec(z,y)
else{w=new P.J(0,$.r,null,[null])
w.a=4
w.c=a
w.dH(z,null)}},
as:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.rd(z)},
d_:function(a,b,c){var z,y,x,w,v
if(b===0){z=c.c
if(z!=null)z.f0()
else c.a.bk()
return}else if(b===1){z=c.c
if(z!=null)z.dQ(H.C(a),H.E(a))
else{y=H.C(a)
x=H.E(a)
z=c.a
if(z.b>=4)H.e(z.bO())
if(y==null)y=new P.cK()
$.r.toString
z.dl(y,x)
c.a.bk()}return}if(a instanceof P.bN){if(c.c!=null){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
w=c.a
if(w.b>=4)H.e(w.bO())
w.c4(z)
P.cp(new P.qP(b,c))
return}else if(z===1){v=a.a
c.a.i5(v,!1).bF(new P.qQ(b,c))
return}}P.e8(a,b)},
rc:function(a){var z=a.a
z.toString
return new P.cW(z,[H.k(z,0)])},
ed:function(a,b){if(H.at(a,{func:1,args:[P.ap,P.ap]})){b.toString
return a}else{b.toString
return a}},
av:function(a){return new P.qJ(new P.J(0,$.r,null,[a]),[a])},
r4:function(){var z,y
for(;z=$.bo,z!=null;){$.bR=null
y=z.b
$.bo=y
if(y==null)$.bQ=null
z.a.$0()}},
x9:[function(){$.ea=!0
try{P.r4()}finally{$.bR=null
$.ea=!1
if($.bo!=null)$.$get$dZ().$1(P.hM())}},"$0","hM",0,0,7],
hG:function(a){var z=new P.hn(a,null)
if($.bo==null){$.bQ=z
$.bo=z
if(!$.ea)$.$get$dZ().$1(P.hM())}else{$.bQ.b=z
$.bQ=z}},
rb:function(a){var z,y,x
z=$.bo
if(z==null){P.hG(a)
$.bR=$.bQ
return}y=new P.hn(a,null)
x=$.bR
if(x==null){y.b=z
$.bR=y
$.bo=y}else{y.b=x.b
x.b=y
$.bR=y
if(y.b==null)$.bQ=y}},
cp:function(a){var z=$.r
if(C.k===z){P.bq(null,null,C.k,a)
return}z.toString
P.bq(null,null,z,z.dO(a,!0))},
x_:function(a,b){return new P.qH(null,a,!1,[b])},
ee:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.C(x)
y=H.E(x)
w=$.r
w.toString
P.bp(null,null,w,z,y)}},
r5:[function(a,b){var z=$.r
z.toString
P.bp(null,null,z,a,b)},function(a){return P.r5(a,null)},"$2","$1","rj",2,2,20,0],
x8:[function(){},"$0","ri",0,0,7],
ra:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.C(u)
y=H.E(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=x.gf5()
w=t
v=x.gbM()
c.$2(w,v)}}},
qT:function(a,b,c,d){var z=a.cj()
if(!!J.p(z).$isO&&z!==$.$get$bd())z.bG(new P.qW(b,c,d))
else b.b4(c,d)},
qU:function(a,b){return new P.qV(a,b)},
qX:function(a,b,c){var z=a.cj()
if(!!J.p(z).$isO&&z!==$.$get$bd())z.bG(new P.qY(b,c))
else b.bg(c)},
p6:function(a,b){var z=$.r
if(z===C.k){z.toString
return P.dV(a,b)}return P.dV(a,z.dO(b,!0))},
dV:function(a,b){var z=C.i.bs(a.a,1000)
return H.p3(z<0?0:z,b)},
pp:function(){return $.r},
bp:function(a,b,c,d,e){var z={}
z.a=d
P.rb(new P.r8(z,e))},
hD:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
hF:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
hE:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bq:function(a,b,c,d){var z=C.k!==c
if(z)d=c.dO(d,!(!z||!1))
P.hG(d)},
pP:{"^":"a:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
pO:{"^":"a:32;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
pQ:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
pR:{"^":"a:2;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
qR:{"^":"a:0;a",
$1:function(a){return this.a.$2(0,a)}},
qS:{"^":"a:22;a",
$2:function(a,b){this.a.$2(1,new H.dk(a,b))}},
rd:{"^":"a:46;a",
$2:function(a,b){this.a(a,b)}},
qP:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.b
y=z.a
x=y.b
if((x&1)!==0?(y.gbh().e&4)!==0:(x&2)===0){z.b=!0
return}this.a.$2(null,0)}},
qQ:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pS:{"^":"d;a,b,c",
hb:function(a){var z=new P.pV(a)
this.a=new P.q_(null,0,null,new P.pX(z),null,new P.pY(this,z),new P.pZ(this,a),[null])},
A:{
pT:function(a){var z=new P.pS(null,!1,null)
z.hb(a)
return z}}},
pV:{"^":"a:2;a",
$0:function(){P.cp(new P.pW(this.a))}},
pW:{"^":"a:2;a",
$0:function(){this.a.$2(0,null)}},
pX:{"^":"a:2;a",
$0:function(){this.a.$0()}},
pY:{"^":"a:2;a,b",
$0:function(){var z=this.a
if(z.b){z.b=!1
this.b.$0()}}},
pZ:{"^":"a:2;a,b",
$0:function(){var z=this.a
if((z.a.b&4)===0){z.c=new P.cf(new P.J(0,$.r,null,[null]),[null])
if(z.b){z.b=!1
P.cp(new P.pU(this.b))}return z.c.a}}},
pU:{"^":"a:2;a",
$0:function(){this.a.$2(2,null)}},
bN:{"^":"d;ai:a<,b",
j:function(a){return"IterationMarker("+this.b+", "+H.b(this.a)+")"},
A:{
bO:function(a){return new P.bN(a,1)},
aM:function(){return C.a9},
hr:function(a){return new P.bN(a,0)},
aN:function(a){return new P.bN(a,3)}}},
b8:{"^":"d;a,b,c,d",
gS:function(){var z=this.c
return z==null?this.b:z.gS()},
v:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.v())return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bN){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.ah(z)
if(!!w.$isb8){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
qK:{"^":"c3;a",
ga0:function(a){return new P.b8(this.a(),null,null,null)},
$asc3:I.ba,
$asy:I.ba,
A:{
aO:function(a){return new P.qK(a)}}},
O:{"^":"d;$ti"},
hp:{"^":"d;$ti",
dQ:function(a,b){if(a==null)a=new P.cK()
if(this.a.a!==0)throw H.c(new P.v("Future already completed"))
$.r.toString
this.b4(a,b)},
cW:function(a){return this.dQ(a,null)}},
cf:{"^":"hp;a,$ti",
bx:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.v("Future already completed"))
z.bf(a)},
f0:function(){return this.bx(null)},
b4:function(a,b){this.a.ev(a,b)}},
qJ:{"^":"hp;a,$ti",
bx:function(a){var z=this.a
if(z.a!==0)throw H.c(new P.v("Future already completed"))
z.bg(a)},
f0:function(){return this.bx(null)},
b4:function(a,b){this.a.b4(a,b)}},
e3:{"^":"d;a,b,c,d,e,$ti",
iT:function(a){if(this.c!==6)return!0
return this.b.b.ea(this.d,a.a)},
iw:function(a){var z,y
z=this.e
y=this.b.b
if(H.at(z,{func:1,args:[,,]}))return y.jg(z,a.a,a.b)
else return y.ea(z,a.a)}},
J:{"^":"d;cd:a<,b,hL:c<,$ti",
ec:function(a,b){var z=$.r
if(z!==C.k){z.toString
if(b!=null)b=P.ed(b,z)}return this.dH(a,b)},
bF:function(a){return this.ec(a,null)},
dH:function(a,b){var z,y
z=new P.J(0,$.r,null,[null])
y=b==null?1:3
this.cH(new P.e3(null,z,y,a,b,[H.k(this,0),null]))
return z},
bG:function(a){var z,y
z=$.r
y=new P.J(0,z,null,this.$ti)
if(z!==C.k)z.toString
z=H.k(this,0)
this.cH(new P.e3(null,y,8,a,null,[z,z]))
return y},
cH:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.cH(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.bq(null,null,z,new P.q8(this,a))}},
eP:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.eP(a)
return}this.a=u
this.c=y.c}z.a=this.c8(a)
y=this.b
y.toString
P.bq(null,null,y,new P.qf(z,this))}},
dF:function(){var z=this.c
this.c=null
return this.c8(z)},
c8:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
bg:function(a){var z,y
z=this.$ti
if(H.aP(a,"$isO",z,"$asO"))if(H.aP(a,"$isJ",z,null))P.cY(a,this)
else P.hq(a,this)
else{y=this.dF()
this.a=4
this.c=a
P.bm(this,y)}},
b4:[function(a,b){var z=this.dF()
this.a=8
this.c=new P.cu(a,b)
P.bm(this,z)},function(a){return this.b4(a,null)},"ju","$2","$1","gcJ",2,2,20,0],
bf:function(a){var z
if(H.aP(a,"$isO",this.$ti,"$asO")){this.hk(a)
return}this.a=1
z=this.b
z.toString
P.bq(null,null,z,new P.qa(this,a))},
hk:function(a){var z
if(H.aP(a,"$isJ",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bq(null,null,z,new P.qe(this,a))}else P.cY(a,this)
return}P.hq(a,this)},
ev:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bq(null,null,z,new P.q9(this,a,b))},
hd:function(a,b){this.a=4
this.c=a},
$isO:1,
A:{
hq:function(a,b){var z,y,x
b.a=1
try{a.ec(new P.qb(b),new P.qc(b))}catch(x){z=H.C(x)
y=H.E(x)
P.cp(new P.qd(b,z,y))}},
cY:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.c8(y)
b.a=a.a
b.c=a.c
P.bm(b,x)}else{b.a=2
b.c=a
a.eP(y)}},
bm:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.bp(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.bm(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.bp(null,null,y,v,u)
return}p=$.r
if(p==null?r!=null:p!==r)$.r=r
else p=null
y=b.c
if(y===8)new P.qi(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.qh(x,b,s).$0()}else if((y&2)!==0)new P.qg(z,x,b).$0()
if(p!=null)$.r=p
y=x.b
if(!!J.p(y).$isO){if(y.a>=4){o=u.c
u.c=null
b=u.c8(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.cY(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.c8(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
q8:{"^":"a:2;a,b",
$0:function(){P.bm(this.a,this.b)}},
qf:{"^":"a:2;a,b",
$0:function(){P.bm(this.b,this.a.a)}},
qb:{"^":"a:0;a",
$1:function(a){var z=this.a
z.a=0
z.bg(a)}},
qc:{"^":"a:45;a",
$2:function(a,b){this.a.b4(a,b)},
$1:function(a){return this.$2(a,null)}},
qd:{"^":"a:2;a,b,c",
$0:function(){this.a.b4(this.b,this.c)}},
qa:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a
y=z.dF()
z.a=4
z.c=this.b
P.bm(z,y)}},
qe:{"^":"a:2;a,b",
$0:function(){P.cY(this.b,this.a)}},
q9:{"^":"a:2;a,b,c",
$0:function(){this.a.b4(this.b,this.c)}},
qi:{"^":"a:7;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.ft(w.d)}catch(v){y=H.C(v)
x=H.E(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.cu(y,x)
u.a=!0
return}if(!!J.p(z).$isO){if(z instanceof P.J&&z.gcd()>=4){if(z.gcd()===8){w=this.b
w.b=z.ghL()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.bF(new P.qj(t))
w.a=!1}}},
qj:{"^":"a:0;a",
$1:function(a){return this.a}},
qh:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.ea(x.d,this.c)}catch(w){z=H.C(w)
y=H.E(w)
x=this.a
x.b=new P.cu(z,y)
x.a=!0}}},
qg:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.iT(z)&&w.e!=null){v=this.b
v.b=w.iw(z)
v.a=!1}}catch(u){y=H.C(u)
x=H.E(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.cu(y,x)
s.a=!0}}},
hn:{"^":"d;a,b"},
bK:{"^":"d;$ti",
Y:function(a,b){var z,y
z={}
y=new P.J(0,$.r,null,[null])
z.a=null
z.a=this.bm(new P.oz(z,this,b,y),!0,new P.oA(y),y.gcJ())
return y},
gq:function(a){var z,y
z={}
y=new P.J(0,$.r,null,[P.t])
z.a=0
this.bm(new P.oD(z),!0,new P.oE(z,y),y.gcJ())
return y},
ga_:function(a){var z,y
z={}
y=new P.J(0,$.r,null,[P.ad])
z.a=null
z.a=this.bm(new P.oB(z,y),!0,new P.oC(y),y.gcJ())
return y},
bZ:function(a){var z,y,x
z=H.z(this,"bK",0)
y=H.n([],[z])
x=new P.J(0,$.r,null,[[P.L,z]])
this.bm(new P.oF(this,y),!0,new P.oG(y,x),x.gcJ())
return x}},
oz:{"^":"a;a,b,c,d",
$1:function(a){P.ra(new P.ox(this.c,a),new P.oy(),P.qU(this.a.a,this.d))},
$S:function(){return H.d3(function(a){return{func:1,args:[a]}},this.b,"bK")}},
ox:{"^":"a:2;a,b",
$0:function(){return this.a.$1(this.b)}},
oy:{"^":"a:0;",
$1:function(a){}},
oA:{"^":"a:2;a",
$0:function(){this.a.bg(null)}},
oD:{"^":"a:0;a",
$1:function(a){++this.a.a}},
oE:{"^":"a:2;a,b",
$0:function(){this.b.bg(this.a.a)}},
oB:{"^":"a:0;a,b",
$1:function(a){P.qX(this.a.a,this.b,!1)}},
oC:{"^":"a:2;a",
$0:function(){this.a.bg(!0)}},
oF:{"^":"a;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.d3(function(a){return{func:1,args:[a]}},this.a,"bK")}},
oG:{"^":"a:2;a,b",
$0:function(){this.b.bg(this.a)}},
cZ:{"^":"d;cd:b<,$ti",
ghF:function(){if((this.b&8)===0)return this.a
return this.a.c},
du:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.e6(null,null,0,this.$ti)
this.a=z}return z}y=this.a
z=y.c
if(z==null){z=new P.e6(null,null,0,this.$ti)
y.c=z}return z},
gbh:function(){if((this.b&8)!==0)return this.a.c
return this.a},
bO:function(){if((this.b&4)!==0)return new P.v("Cannot add event after closing")
return new P.v("Cannot add event while adding a stream")},
i5:function(a,b){var z,y,x,w
z=this.b
if(z>=4)throw H.c(this.bO())
if((z&2)!==0){z=new P.J(0,$.r,null,[null])
z.bf(null)
return z}z=this.a
y=new P.J(0,$.r,null,[null])
x=a.bm(this.ghi(),!1,this.ghj(),this.ghf())
w=this.b
if((w&1)!==0?(this.gbh().e&4)!==0:(w&2)===0)x.fi()
this.a=new P.qD(z,y,x,this.$ti)
this.b|=8
return y},
eC:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$bd():new P.J(0,$.r,null,[null])
this.c=z}return z},
u:[function(a,b){if(this.b>=4)throw H.c(this.bO())
this.c4(b)},"$1","ghU",2,0,function(){return H.d3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cZ")}],
bk:function(){var z=this.b
if((z&4)!==0)return this.eC()
if(z>=4)throw H.c(this.bO())
z|=4
this.b=z
if((z&1)!==0)this.cb()
else if((z&3)===0)this.du().u(0,C.x)
return this.eC()},
c4:[function(a){var z=this.b
if((z&1)!==0)this.ca(a)
else if((z&3)===0)this.du().u(0,new P.e0(a,null,this.$ti))},"$1","ghi",2,0,function(){return H.d3(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"cZ")}],
dl:[function(a,b){var z=this.b
if((z&1)!==0)this.cc(a,b)
else if((z&3)===0)this.du().u(0,new P.e1(a,b,null))},"$2","ghf",4,0,31],
eu:[function(){var z=this.a
this.a=z.c
this.b&=4294967287
z.a.bf(null)},"$0","ghj",0,0,7],
hP:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.v("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.q3(this,null,null,null,z,y,null,null,this.$ti)
x.hc(a,b,c,d,H.k(this,0))
w=this.ghF()
y=this.b|=1
if((y&8)!==0){v=this.a
v.c=x
v.b.fs()}else this.a=x
x.hN(w)
x.dB(new P.qF(this))
return x},
hI:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.cj()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.C(v)
x=H.E(v)
u=new P.J(0,$.r,null,[null])
u.ev(y,x)
z=u}else z=z.bG(w)
w=new P.qE(this)
if(z!=null)z=z.bG(w)
else w.$0()
return z}},
qF:{"^":"a:2;a",
$0:function(){P.ee(this.a.d)}},
qE:{"^":"a:7;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bf(null)}},
qM:{"^":"d;$ti",
ca:function(a){this.gbh().c4(a)},
cc:function(a,b){this.gbh().dl(a,b)},
cb:function(){this.gbh().eu()}},
q0:{"^":"d;$ti",
ca:function(a){this.gbh().bN(new P.e0(a,null,[H.k(this,0)]))},
cc:function(a,b){this.gbh().bN(new P.e1(a,b,null))},
cb:function(){this.gbh().bN(C.x)}},
q_:{"^":"cZ+q0;a,b,c,d,e,f,r,$ti"},
qL:{"^":"cZ+qM;a,b,c,d,e,f,r,$ti"},
cW:{"^":"qG;a,$ti",
gB:function(a){return(H.ay(this.a)^892482866)>>>0},
R:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.cW))return!1
return b.a===this.a}},
q3:{"^":"e_;x,a,b,c,d,e,f,r,$ti",
eK:function(){return this.x.hI(this)},
eM:[function(){var z=this.x
if((z.b&8)!==0)z.a.b.fi()
P.ee(z.e)},"$0","geL",0,0,7],
eO:[function(){var z=this.x
if((z.b&8)!==0)z.a.b.fs()
P.ee(z.f)},"$0","geN",0,0,7]},
pK:{"^":"d;$ti",
cj:function(){var z=this.b.cj()
if(z==null){this.a.bf(null)
return}return z.bG(new P.pL(this))}},
pL:{"^":"a:2;a",
$0:function(){this.a.a.bf(null)}},
qD:{"^":"pK;c,a,b,$ti"},
e_:{"^":"d;cd:e<,$ti",
hN:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.cC(this)}},
iY:function(a){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.dB(this.geL())},
fi:function(){return this.iY(null)},
fs:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128)if((z&64)!==0&&this.r.c!=null)this.r.cC(this)
else{z=(z&4294967291)>>>0
this.e=z
if((z&32)===0)this.dB(this.geN())}}},
cj:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.dn()
z=this.f
return z==null?$.$get$bd():z},
dn:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.eK()},
c4:function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.ca(a)
else this.bN(new P.e0(a,null,[H.z(this,"e_",0)]))},
dl:function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cc(a,b)
else this.bN(new P.e1(a,b,null))},
eu:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cb()
else this.bN(C.x)},
eM:[function(){},"$0","geL",0,0,7],
eO:[function(){},"$0","geN",0,0,7],
eK:function(){return},
bN:function(a){var z,y
z=this.r
if(z==null){z=new P.e6(null,null,0,[H.z(this,"e_",0)])
this.r=z}z.u(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cC(this)}},
ca:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.fw(this.a,a)
this.e=(this.e&4294967263)>>>0
this.dr((z&4)!==0)},
cc:function(a,b){var z,y
z=this.e
y=new P.q2(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.dn()
z=this.f
if(!!J.p(z).$isO&&z!==$.$get$bd())z.bG(y)
else y.$0()}else{y.$0()
this.dr((z&4)!==0)}},
cb:function(){var z,y
z=new P.q1(this)
this.dn()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isO&&y!==$.$get$bd())y.bG(z)
else z.$0()},
dB:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.dr((z&4)!==0)},
dr:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.eM()
else this.eO()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.cC(this)},
hc:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.ed(b==null?P.rj():b,z)
this.c=c==null?P.ri():c}},
q2:{"^":"a:7;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.at(y,{func:1,args:[P.d,P.bi]})
w=z.d
v=this.b
u=z.b
if(x)w.jh(u,v,this.c)
else w.fw(u,v)
z.e=(z.e&4294967263)>>>0}},
q1:{"^":"a:7;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.fu(z.c)
z.e=(z.e&4294967263)>>>0}},
qG:{"^":"bK;$ti",
bm:function(a,b,c,d){return this.a.hP(a,d,c,!0===b)}},
e2:{"^":"d;d2:a@,$ti"},
e0:{"^":"e2;ai:b<,a,$ti",
e4:function(a){a.ca(this.b)}},
e1:{"^":"e2;f5:b<,bM:c<,a",
e4:function(a){a.cc(this.b,this.c)},
$ase2:I.ba},
q4:{"^":"d;",
e4:function(a){a.cb()},
gd2:function(){return},
sd2:function(a){throw H.c(new P.v("No events after a done."))}},
qy:{"^":"d;cd:a<,$ti",
cC:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cp(new P.qz(this,a))
this.a=1}},
qz:{"^":"a:2;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gd2()
z.b=w
if(w==null)z.c=null
x.e4(this.b)}},
e6:{"^":"qy;b,c,a,$ti",
ga_:function(a){return this.c==null},
u:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sd2(b)
this.c=b}}},
qH:{"^":"d;a,b,c,$ti"},
qW:{"^":"a:2;a,b,c",
$0:function(){return this.a.b4(this.b,this.c)}},
qV:{"^":"a:22;a,b",
$2:function(a,b){P.qT(this.a,this.b,a,b)}},
qY:{"^":"a:2;a,b",
$0:function(){return this.a.bg(this.b)}},
cu:{"^":"d;f5:a<,bM:b<",
j:function(a){return H.b(this.a)},
$isa4:1},
qO:{"^":"d;"},
r8:{"^":"a:2;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cK()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.j(0)
throw x}},
qA:{"^":"qO;",
fu:function(a){var z,y,x,w
try{if(C.k===$.r){x=a.$0()
return x}x=P.hD(null,null,this,a)
return x}catch(w){z=H.C(w)
y=H.E(w)
return P.bp(null,null,this,z,y)}},
fw:function(a,b){var z,y,x,w
try{if(C.k===$.r){x=a.$1(b)
return x}x=P.hF(null,null,this,a,b)
return x}catch(w){z=H.C(w)
y=H.E(w)
return P.bp(null,null,this,z,y)}},
jh:function(a,b,c){var z,y,x,w
try{if(C.k===$.r){x=a.$2(b,c)
return x}x=P.hE(null,null,this,a,b,c)
return x}catch(w){z=H.C(w)
y=H.E(w)
return P.bp(null,null,this,z,y)}},
dO:function(a,b){if(b)return new P.qB(this,a)
else return new P.qC(this,a)},
h:function(a,b){return},
ft:function(a){if($.r===C.k)return a.$0()
return P.hD(null,null,this,a)},
ea:function(a,b){if($.r===C.k)return a.$1(b)
return P.hF(null,null,this,a,b)},
jg:function(a,b,c){if($.r===C.k)return a.$2(b,c)
return P.hE(null,null,this,a,b,c)}},
qB:{"^":"a:2;a,b",
$0:function(){return this.a.fu(this.b)}},
qC:{"^":"a:2;a,b",
$0:function(){return this.a.ft(this.b)}}}],["","",,P,{"^":"",
dw:function(a,b){return new H.P(0,null,null,null,null,null,0,[a,b])},
aV:function(){return new H.P(0,null,null,null,null,null,0,[null,null])},
a_:function(a){return H.tN(a,new H.P(0,null,null,null,null,null,0,[null,null]))},
lM:function(a,b,c){var z,y
if(P.eb(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bS()
y.push(a)
try{P.r3(a,z)}finally{y.pop()}y=P.fV(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cG:function(a,b,c){var z,y,x
if(P.eb(a))return b+"..."+c
z=new P.bL(b)
y=$.$get$bS()
y.push(a)
try{x=z
x.C=P.fV(x.gC(),a,", ")}finally{y.pop()}y=z
y.C=y.gC()+c
y=z.gC()
return y.charCodeAt(0)==0?y:y},
eb:function(a){var z,y
for(z=0;y=$.$get$bS(),z<y.length;++z)if(a===y[z])return!0
return!1},
r3:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga0(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.b(z.gS())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gS();++x
if(!z.v()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
u=b.pop()
y+=v.length+2}else{s=z.gS();++x
for(;z.v();t=s,s=r){r=z.gS();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
m9:function(a,b,c,d,e){return new H.P(0,null,null,null,null,null,0,[d,e])},
f9:function(a,b,c){var z=P.m9(null,null,null,b,c)
a.Y(0,new P.rp(z))
return z},
af:function(a,b,c,d){return new P.hs(0,null,null,null,null,null,0,[d])},
c7:function(a,b){var z,y
z=P.af(null,null,null,b)
for(y=J.ah(a);y.v();)z.u(0,y.gS())
return z},
dB:function(a){var z,y,x
z={}
if(P.eb(a))return"{...}"
y=new P.bL("")
try{$.$get$bS().push(a)
x=y
x.C=x.gC()+"{"
z.a=!0
a.Y(0,new P.mj(z,y))
z=y
z.C=z.gC()+"}"}finally{$.$get$bS().pop()}z=y.gC()
return z.charCodeAt(0)==0?z:z},
ht:{"^":"P;a,b,c,d,e,f,r,$ti",
co:function(a){return H.uC(a)&0x3ffffff},
cp:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
A:{
bP:function(a,b){return new P.ht(0,null,null,null,null,null,0,[a,b])}}},
hs:{"^":"qk;a,b,c,d,e,f,r,$ti",
hD:function(){return new P.hs(0,null,null,null,null,null,0,this.$ti)},
ga0:function(a){var z=new P.ac(this,this.r,null,null,[null])
z.c=this.e
return z},
gq:function(a){return this.a},
ga_:function(a){return this.a===0},
ad:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hm(b)},
hm:function(a){var z=this.d
if(z==null)return!1
return this.cM(z[this.cK(a)],a)>=0},
d0:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.ad(0,a)?a:null
else return this.hA(a)},
hA:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.cK(a)]
x=this.cM(y,a)
if(x<0)return
return J.aG(y,x).ghp()},
Y:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.c(new P.B(this))
z=z.b}},
u:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.ew(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.ew(x,b)}else return this.aw(b)},
aw:function(a){var z,y,x
z=this.d
if(z==null){z=P.qt()
this.d=z}y=this.cK(a)
x=z[y]
if(x==null)z[y]=[this.ds(a)]
else{if(this.cM(x,a)>=0)return!1
x.push(this.ds(a))}return!0},
Z:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ex(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ex(this.c,b)
else return this.hJ(b)},
hJ:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.cK(a)]
x=this.cM(y,a)
if(x<0)return!1
this.ey(y.splice(x,1)[0])
return!0},
hu:function(a,b){var z,y,x,w,v
z=this.e
for(;z!=null;z=x){y=z.a
x=z.b
w=this.r
v=a.$1(y)
if(w!==this.r)throw H.c(new P.B(this))
if(b===v)this.Z(0,y)}},
aV:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
ew:function(a,b){if(a[b]!=null)return!1
a[b]=this.ds(b)
return!0},
ex:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ey(z)
delete a[b]
return!0},
ds:function(a){var z,y
z=new P.qs(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ey:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
cK:function(a){return J.h(a)&0x3ffffff},
cM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.u(a[y].a,b))return y
return-1},
$isdR:1,
$isaa:1,
A:{
qt:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
qs:{"^":"d;hp:a<,b,c"},
ac:{"^":"d;a,b,c,d,$ti",
gS:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.B(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
qk:{"^":"nV;$ti"},
c3:{"^":"y;$ti"},
rp:{"^":"a:6;a",
$2:function(a,b){this.a.t(0,a,b)}},
fa:{"^":"fj;$ti"},
fj:{"^":"d+b5;$ti",$asL:null,$asaa:null,$isL:1,$isaa:1},
b5:{"^":"d;$ti",
ga0:function(a){return new H.dx(this,this.gq(this),0,null,[H.z(this,"b5",0)])},
aq:function(a,b){return this.h(0,b)},
Y:function(a,b){var z,y
z=this.gq(this)
for(y=0;y<z;++y){b.$1(this.h(0,y))
if(z!==this.gq(this))throw H.c(new P.B(this))}},
ga_:function(a){return this.gq(this)===0},
gdZ:function(a){return!this.ga_(this)},
gD:function(a){if(this.gq(this)===0)throw H.c(H.aI())
return this.h(0,this.gq(this)-1)},
ad:function(a,b){var z,y,x
z=this.gq(this)
for(y=0;y<this.gq(this);++y){x=this.h(0,y)
if(x==null?b==null:x===b)return!0
if(z!==this.gq(this))throw H.c(new P.B(this))}return!1},
b5:function(a,b){var z,y
z=this.gq(this)
for(y=0;y<z;++y){if(b.$1(this.h(0,y)))return!0
if(z!==this.gq(this))throw H.c(new P.B(this))}return!1},
aW:function(a,b,c){var z,y,x
z=this.gq(this)
for(y=0;y<z;++y){x=this.h(0,y)
if(b.$1(x))return x
if(z!==this.gq(this))throw H.c(new P.B(this))}return c.$0()},
bn:function(a,b){return new H.aj(this,b,[H.z(this,"b5",0),null])},
dj:function(a,b){return H.fX(this,b,null,H.z(this,"b5",0))},
ef:function(a){var z,y
z=P.af(null,null,null,H.z(this,"b5",0))
for(y=0;y<this.gq(this);++y)z.u(0,this.h(0,y))
return z},
u:function(a,b){var z=this.gq(this)
this.sq(0,z+1)
this.t(0,z,b)},
Z:function(a,b){var z
for(z=0;z<this.gq(this);++z)if(this.h(0,z)===b){this.aM(0,z,this.gq(this)-1,this,z+1)
this.sq(0,this.gq(this)-1)
return!0}return!1},
ht:function(a,b){var z,y,x,w
z=H.n([],[H.z(this,"b5",0)])
y=this.gq(this)
for(x=0;x<y;++x){w=this.h(0,x)
if(J.u(a.$1(w),b))z.push(w)
if(y!==this.gq(this))throw H.c(new P.B(this))}if(z.length!==this.gq(this)){this.fW(0,0,z.length,z)
this.sq(0,z.length)}},
aM:function(a,b,c,d,e){var z,y,x,w,v
P.ca(b,c,this.gq(this),null,null,null)
z=c-b
if(z===0)return
if(H.aP(d,"$isL",[H.z(this,"b5",0)],"$asL")){y=e
x=d}else{x=J.iL(d,e).br(0,!1)
y=0}w=J.V(x)
if(y+z>w.gq(x))throw H.c(H.eZ())
if(y<b)for(v=z-1;v>=0;--v)this.t(0,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.t(0,b+v,w.h(x,y+v))},
fW:function(a,b,c,d){return this.aM(a,b,c,d,0)},
j:function(a){return P.cG(this,"[","]")},
$isL:1,
$isaa:1},
qN:{"^":"d;$ti",
t:function(a,b,c){throw H.c(new P.R("Cannot modify unmodifiable map"))},
$isH:1},
mh:{"^":"d;$ti",
h:function(a,b){return this.a.h(0,b)},
t:function(a,b,c){this.a.t(0,b,!1)},
a9:function(a){return this.a.a9(a)},
Y:function(a,b){this.a.Y(0,b)},
ga_:function(a){var z=this.a
return z.ga_(z)},
gq:function(a){var z=this.a
return z.gq(z)},
j:function(a){return this.a.j(0)},
$isH:1},
hi:{"^":"mh+qN;a,$ti",$asH:null,$isH:1},
mj:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.C+=", "
z.a=!1
z=this.b
y=z.C+=H.b(a)
z.C=y+": "
z.C+=H.b(b)}},
ma:{"^":"b4;a,b,c,d,$ti",
ga0:function(a){return new P.e5(this,this.c,this.d,this.b,null,this.$ti)},
Y:function(a,b){var z,y
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){b.$1(this.a[y])
if(z!==this.d)H.e(new P.B(this))}},
ga_:function(a){return this.b===this.c},
gq:function(a){return(this.c-this.b&this.a.length-1)>>>0},
aq:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.e(P.cF(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
au:function(a,b){var z,y,x,w,v,u,t,s
z=this.$ti
if(H.aP(b,"$isL",z,"$asL")){y=b.gq(b)
x=this.gq(this)
w=C.i.aK(x,y)
v=this.a.length
if(w>=v){w=C.i.aK(x,y)
w=new Array(P.mb(w+C.i.cR(w,1)))
w.fixed$length=Array
u=H.n(w,z)
this.c=this.hS(u)
this.a=u
this.b=0
C.a.aM(u,x,C.i.aK(x,y),b,0)
this.c=C.i.aK(this.c,y)}else{t=v-this.c
if(y.bJ(0,t)){z=this.a
w=this.c
C.a.aM(z,w,C.i.aK(w,y),b,0)
this.c=C.i.aK(this.c,y)}else{s=y.c1(0,t)
z=this.a
w=this.c
C.a.aM(z,w,w+t,b,0)
C.a.aM(this.a,0,s,b,t)
this.c=s}}++this.d}else for(z=new P.e5(b,b.c,b.d,b.b,null,[H.k(b,0)]);z.v();)this.aw(z.e)},
aV:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
j:function(a){return P.cG(this,"{","}")},
eX:function(a){var z,y
z=this.b
y=this.a
z=(z-1&y.length-1)>>>0
this.b=z
y[z]=a
if(z===this.c)this.eG();++this.d},
d4:function(){var z,y,x
z=this.b
if(z===this.c)throw H.c(H.aI());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
aw:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.eG();++this.d},
eG:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.n(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aM(y,0,w,z,x)
C.a.aM(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
hS:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.aM(a,0,w,x,z)
return w}else{v=x.length-z
C.a.aM(a,0,v,x,z)
C.a.aM(a,v,v+this.c,this.a,0)
return this.c+v}},
h3:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.n(z,[b])},
A:{
b6:function(a,b){var z=new P.ma(null,0,0,0,[b])
z.h3(a,b)
return z},
mb:function(a){var z
a=C.S.js(a,1)-1
for(;!0;a=z)z=(a&a-1)>>>0}}},
e5:{"^":"d;a,b,c,d,e,$ti",
gS:function(){return this.e},
v:function(){var z,y
z=this.a
if(this.c!==z.d)H.e(new P.B(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
nW:{"^":"d;$ti",
ga_:function(a){return this.a===0},
au:function(a,b){var z
for(z=J.ah(b);z.v();)this.u(0,z.gS())},
ic:function(a){var z,y
for(z=a.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e;y.v();)if(!this.ad(0,y.d))return!1
return!0},
br:function(a,b){var z,y,x,w
z=H.n([],this.$ti)
C.a.sq(z,this.a)
for(y=new P.ac(this,this.r,null,null,[null]),y.c=this.e,x=0;y.v();x=w){w=x+1
z[x]=y.d}return z},
bZ:function(a){return this.br(a,!0)},
bn:function(a,b){return new H.cC(this,b,[H.k(this,0),null])},
j:function(a){return P.cG(this,"{","}")},
Y:function(a,b){var z
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.v();)b.$1(z.d)},
b6:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=b;z.v();)y=c.$2(y,z.d)
return y},
aW:function(a,b,c){var z,y
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e;z.v();){y=z.d
if(b.$1(y))return y}if(c!=null)return c.$0()
throw H.c(H.aI())},
cX:function(a,b){return this.aW(a,b,null)},
bd:function(a,b){var z,y,x,w
for(z=new P.ac(this,this.r,null,null,[null]),z.c=this.e,y=null,x=!1;z.v();){w=z.d
if(b.$1(w)){if(x)throw H.c(H.dn())
y=w
x=!0}}if(x)return y
throw H.c(H.aI())},
$isdR:1,
$isaa:1},
nV:{"^":"nW;$ti"}}],["","",,P,{"^":"",
d0:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.qn(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.d0(a[z])
return a},
r6:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.c(H.a3(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.C(x)
w=String(y)
throw H.c(new P.eT(w,null,null))}w=P.d0(z)
return w},
x7:[function(a){return a.d9()},"$1","tk",2,0,0],
qn:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.hH(b):y}},
gq:function(a){var z
if(this.b==null){z=this.c
z=z.gq(z)}else z=this.cL().length
return z},
ga_:function(a){var z
if(this.b==null){z=this.c
z=z.gq(z)}else z=this.cL().length
return z===0},
t:function(a,b,c){var z,y
if(this.b==null)this.c.t(0,b,c)
else if(this.a9(b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.hR().t(0,b,c)},
a9:function(a){if(this.b==null)return this.c.a9(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
Y:function(a,b){var z,y,x,w
if(this.b==null)return this.c.Y(0,b)
z=this.cL()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.d0(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.c(new P.B(this))}},
j:function(a){return P.dB(this)},
cL:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
hR:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.dw(P.m,null)
y=this.cL()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.t(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.sq(y,0)
this.b=null
this.a=null
this.c=z
return z},
hH:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.d0(this.a[a])
return this.b[a]=z},
$isH:1,
$asH:function(){return[P.m,null]}},
eM:{"^":"d;$ti"},
cA:{"^":"d;$ti"},
ds:{"^":"a4;a,b",
j:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
lT:{"^":"ds;a,b",
j:function(a){return"Cyclic error in JSON stringify"}},
lS:{"^":"eM;a,b",
ii:function(a,b){var z=P.r6(a,this.gij().a)
return z},
ih:function(a){return this.ii(a,null)},
ir:function(a,b){var z=this.gis()
z=P.qp(a,z.b,z.a)
return z},
f4:function(a){return this.ir(a,null)},
gis:function(){return C.V},
gij:function(){return C.U},
$aseM:function(){return[P.d,P.m]}},
lV:{"^":"cA;a,b",
$ascA:function(){return[P.d,P.m]}},
lU:{"^":"cA;a",
$ascA:function(){return[P.m,P.d]}},
qq:{"^":"d;",
fI:function(a){var z,y,x,w,v,u,t
z=a.length
for(y=J.bt(a),x=this.c,w=0,v=0;v<z;++v){u=y.bP(a,v)
if(u>92)continue
if(u<32){if(v>w)x.C+=C.c.av(a,w,v)
w=v+1
x.C+=H.an(92)
switch(u){case 8:x.C+=H.an(98)
break
case 9:x.C+=H.an(116)
break
case 10:x.C+=H.an(110)
break
case 12:x.C+=H.an(102)
break
case 13:x.C+=H.an(114)
break
default:x.C+=H.an(117)
x.C+=H.an(48)
x.C+=H.an(48)
t=u>>>4&15
x.C+=H.an(t<10?48+t:87+t)
t=u&15
x.C+=H.an(t<10?48+t:87+t)
break}}else if(u===34||u===92){if(v>w)x.C+=C.c.av(a,w,v)
w=v+1
x.C+=H.an(92)
x.C+=H.an(u)}}if(w===0)x.C+=H.b(a)
else if(w<z)x.C+=y.av(a,w,z)},
dq:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.c(new P.lT(a,null))}z.push(a)},
dd:function(a){var z,y,x
if(this.fH(a))return
this.dq(a)
try{z=this.b.$1(a)
if(!this.fH(z))throw H.c(new P.ds(a,null))
this.a.pop()}catch(x){y=H.C(x)
throw H.c(new P.ds(a,y))}},
fH:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.c.C+=C.m.j(a)
return!0}else if(a===!0){this.c.C+="true"
return!0}else if(a===!1){this.c.C+="false"
return!0}else if(a==null){this.c.C+="null"
return!0}else if(typeof a==="string"){z=this.c
z.C+='"'
this.fI(a)
z.C+='"'
return!0}else{z=J.p(a)
if(!!z.$isL){this.dq(a)
this.jq(a)
this.a.pop()
return!0}else if(!!z.$isH){this.dq(a)
y=this.jr(a)
this.a.pop()
return y}else return!1}},
jq:function(a){var z,y,x
z=this.c
z.C+="["
y=J.V(a)
if(y.gq(a)>0){this.dd(y.h(a,0))
for(x=1;x<y.gq(a);++x){z.C+=","
this.dd(y.h(a,x))}}z.C+="]"},
jr:function(a){var z,y,x,w,v,u
z={}
if(a.ga_(a)){this.c.C+="{}"
return!0}y=a.gq(a)*2
x=new Array(y)
z.a=0
z.b=!0
a.Y(0,new P.qr(z,x))
if(!z.b)return!1
w=this.c
w.C+="{"
for(v='"',u=0;u<y;u+=2,v=',"'){w.C+=v
this.fI(x[u])
w.C+='":'
this.dd(x[u+1])}w.C+="}"
return!0}},
qr:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
z[x]=a
y.a=w+1
z[w]=b}},
qo:{"^":"qq;c,a,b",A:{
qp:function(a,b,c){var z,y,x
z=new P.bL("")
y=new P.qo(z,[],P.tk())
y.dd(a)
x=z.C
return x.charCodeAt(0)==0?x:x}}}}],["","",,P,{"^":"",
wu:[function(a,b){return J.bw(a,b)},"$2","tl",4,0,41],
eQ:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.f(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kP(a)},
kP:function(a){var z=J.p(a)
if(!!z.$isa)return z.j(a)
return H.cM(a)},
cD:function(a){return new P.q7(a)},
N:function(a,b,c){var z,y
z=H.n([],[c])
for(y=J.ah(a);y.v();)z.push(y.gS())
if(b)return z
z.fixed$length=Array
return z},
mc:function(a,b,c,d){var z,y
z=H.n(new Array(a),[d])
for(y=0;y<a;++y)z[y]=b.$1(y)
return z},
ax:function(a,b){var z=P.N(a,!1,b)
z.fixed$length=Array
z.immutable$list=Array
return z},
eo:function(a){H.uK(H.b(a))},
bg:function(a,b,c){return new H.f3(a,H.dq(a,!1,b,!1),null,null)},
ad:{"^":"d;"},
"+bool":0,
Z:{"^":"d;$ti"},
aX:{"^":"K;",$isZ:1,
$asZ:function(){return[P.K]}},
"+double":0,
by:{"^":"d;a",
aK:function(a,b){return new P.by(C.i.aK(this.a,b.geB()))},
c1:function(a,b){return new P.by(C.i.c1(this.a,b.geB()))},
bJ:function(a,b){return C.i.bJ(this.a,b.geB())},
cB:function(a,b){return this.a>b.a},
R:function(a,b){if(b==null)return!1
if(!(b instanceof P.by))return!1
return this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
bw:function(a,b){return C.i.bw(this.a,b.a)},
j:function(a){var z,y,x,w,v
z=new P.kw()
y=this.a
if(y<0)return"-"+new P.by(0-y).j(0)
x=z.$1(C.i.bs(y,6e7)%60)
w=z.$1(C.i.bs(y,1e6)%60)
v=new P.kv().$1(y%1e6)
return""+C.i.bs(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isZ:1,
$asZ:function(){return[P.by]}},
kv:{"^":"a:13;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
kw:{"^":"a:13;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a4:{"^":"d;",
gbM:function(){return H.E(this.$thrownJsError)}},
cK:{"^":"a4;",
j:function(a){return"Throw of null."}},
b1:{"^":"a4;a,b,m:c<,d",
gdw:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gdv:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gdw()+y+x
if(!this.a)return w
v=this.gdv()
u=P.eQ(this.b)
return w+v+": "+H.b(u)},
A:{
F:function(a){return new P.b1(!1,null,null,a)},
dc:function(a,b,c){return new P.b1(!0,a,b,c)},
j:function(a){return new P.b1(!1,null,a,"Must not be null")}}},
dP:{"^":"b1;e,f,a,b,c,d",
gdw:function(){return"RangeError"},
gdv:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
A:{
n8:function(a){return new P.dP(null,null,!1,null,null,a)},
c9:function(a,b,c){return new P.dP(null,null,!0,a,b,"Value not in range")},
a6:function(a,b,c,d,e){return new P.dP(b,c,!0,a,d,"Invalid value")},
n9:function(a,b,c,d,e){if(a<b||a>c)throw H.c(P.a6(a,b,c,d,e))},
ca:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.a6(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.a6(b,a,c,"end",f))
return b}}},
lB:{"^":"b1;e,q:f>,a,b,c,d",
gdw:function(){return"RangeError"},
gdv:function(){if(J.iA(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+z},
A:{
cF:function(a,b,c,d,e){var z=e!=null?e:J.aS(b)
return new P.lB(b,z,!0,a,c,"Index out of range")}}},
R:{"^":"a4;a",
j:function(a){return"Unsupported operation: "+this.a}},
X:{"^":"a4;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
v:{"^":"a4;a",
j:function(a){return"Bad state: "+this.a}},
B:{"^":"a4;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.eQ(z))+"."}},
mF:{"^":"d;",
j:function(a){return"Out of Memory"},
gbM:function(){return},
$isa4:1},
fR:{"^":"d;",
j:function(a){return"Stack Overflow"},
gbM:function(){return},
$isa4:1},
k3:{"^":"a4;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
q7:{"^":"d;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.b(z)}},
eT:{"^":"d;a,b,c",
j:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.c.av(x,0,75)+"..."
return y+"\n"+x}},
kU:{"^":"d;m:a<,hy,$ti",
j:function(a){return"Expando:"+H.b(this.a)},
h:function(a,b){var z,y
z=this.hy
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.e(P.dc(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.fr(b,"expando$values")
return y==null?null:H.fr(y,z)}},
bz:{"^":"d;"},
t:{"^":"K;",$isZ:1,
$asZ:function(){return[P.K]}},
"+int":0,
y:{"^":"d;$ti",
bn:function(a,b){return H.bB(this,b,H.z(this,"y",0),null)},
bH:["cG",function(a,b){return new H.I(this,b,[H.z(this,"y",0)])}],
ad:function(a,b){var z
for(z=this.ga0(this);z.v();)if(J.u(z.gS(),b))return!0
return!1},
Y:function(a,b){var z
for(z=this.ga0(this);z.v();)b.$1(z.gS())},
b6:function(a,b,c){var z,y
for(z=this.ga0(this),y=b;z.v();)y=c.$2(y,z.gS())
return y},
b5:function(a,b){var z
for(z=this.ga0(this);z.v();)if(b.$1(z.gS()))return!0
return!1},
br:function(a,b){return P.N(this,b,H.z(this,"y",0))},
bZ:function(a){return this.br(a,!0)},
ef:function(a){return P.c7(this,H.z(this,"y",0))},
gq:function(a){var z,y
z=this.ga0(this)
for(y=0;z.v();)++y
return y},
ga_:function(a){return!this.ga0(this).v()},
gdZ:function(a){return!this.ga_(this)},
dj:function(a,b){return H.o1(this,b,H.z(this,"y",0))},
gD:function(a){var z,y
z=this.ga0(this)
if(!z.v())throw H.c(H.aI())
do y=z.gS()
while(z.v())
return y},
gbK:function(a){var z,y
z=this.ga0(this)
if(!z.v())throw H.c(H.aI())
y=z.gS()
if(z.v())throw H.c(H.dn())
return y},
aq:function(a,b){var z,y,x
if(b<0)H.e(P.a6(b,0,null,"index",null))
for(z=this.ga0(this),y=0;z.v();){x=z.gS()
if(b===y)return x;++y}throw H.c(P.cF(b,this,"index",null,y))},
j:function(a){return P.lM(this,"(",")")}},
cH:{"^":"d;$ti"},
L:{"^":"d;$ti",$isy:1,$isaa:1},
"+List":0,
H:{"^":"d;$ti"},
ap:{"^":"d;",
gB:function(a){return P.d.prototype.gB.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
K:{"^":"d;",$isZ:1,
$asZ:function(){return[P.K]}},
"+num":0,
d:{"^":";",
R:function(a,b){return this===b},
gB:function(a){return H.ay(this)},
j:function(a){return H.cM(this)},
geb:function(a){return new H.aA(H.uk(this),null)},
toString:function(){return this.j(this)}},
bf:{"^":"d;"},
bi:{"^":"d;"},
m:{"^":"d;",$isZ:1,
$asZ:function(){return[P.m]},
$isdI:1},
"+String":0,
bL:{"^":"d;C<",
gq:function(a){return this.C.length},
ga_:function(a){return this.C.length===0},
j:function(a){var z=this.C
return z.charCodeAt(0)==0?z:z},
A:{
fV:function(a,b,c){var z=J.ah(b)
if(!z.v())return a
if(c.length===0){do a+=H.b(z.gS())
while(z.v())}else{a+=H.b(z.gS())
for(;z.v();)a=a+c+H.b(z.gS())}return a},
oJ:function(a){return new P.bL(a)}}}}],["","",,P,{"^":"",fF:{"^":"d;"}}],["","",,P,{"^":"",
dO:function(a){return C.P},
qm:{"^":"d;",
ak:function(a){if(a<=0||a>4294967296)throw H.c(P.n8("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
iV:function(){return Math.random()}}}],["","",,S,{"^":"",dg:{"^":"d;a,b,$ti",
ae:function(a){var z=new S.M(null,null,this.$ti)
z.ab()
z.i(this)
a.$1(z)
return z.n()},
gB:function(a){var z=this.b
if(z==null){z=X.bu(this.a)
this.b=z}return z},
R:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$isdg)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;v!==x.length;++v)if(!J.u(y[v],x[v]))return!1
return!0},
j:function(a){return J.f(this.a)},
h:function(a,b){return this.a[b]},
gq:function(a){return this.a.length},
ga0:function(a){var z=this.a
return new J.b2(z,z.length,0,null,[H.k(z,0)])},
bn:function(a,b){var z=this.a
z.toString
return new H.aj(z,b,[H.k(z,0),null])},
Y:function(a,b){var z=this.a
return(z&&C.a).Y(z,b)},
ga_:function(a){return this.a.length===0},
ab:function(){if(new H.aA(H.Y(H.k(this,0)),null).R(0,C.u))throw H.c(new P.R('explicit element type required, for example "new BuiltList<int>"'))}},M:{"^":"d;a,b,$ti",
n:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dg(z,null,this.$ti)
y.ab()
this.a=z
this.b=y
z=y}return z},
i:function(a){if(H.aP(a,"$isdg",this.$ti,null)){this.a=a.a
this.b=a}else{this.a=P.N(a,!0,H.k(this,0))
this.b=null}},
h:function(a,b){return this.a[b]},
u:function(a,b){var z
if(b==null)H.e(P.F("null element"))
z=this.gcP();(z&&C.a).u(z,b)},
gcP:function(){if(this.b!=null){this.a=P.N(this.a,!0,H.k(this,0))
this.b=null}return this.a},
ab:function(){if(new H.aA(H.Y(H.k(this,0)),null).R(0,C.u))throw H.c(new P.R('explicit element type required, for example "new ListBuilder<int>"'))}}}],["","",,A,{"^":"",cx:{"^":"d;a,b,c,d,$ti",
ae:function(a){var z=new A.cJ(null,null,this.$ti)
z.bQ()
z.i(this)
a.$1(z)
return z.n()},
gB:function(a){var z=this.b
if(z==null){z=this.a.gbU()
z=H.bB(z,new A.jF(this),H.z(z,"y",0),null)
z=P.N(z,!1,H.z(z,"y",0))
C.a.eo(z)
z=X.bu(z)
this.b=z}return z},
R:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$iscx)return!1
y=b.a
x=this.a
if(y.gq(y)!==x.gq(x))return!1
z=z.gB(b)
w=this.gB(this)
if(z==null?w!=null:z!==w)return!1
z=this.c
if(z==null){z=x.gbU()
this.c=z}z=z.ga0(z)
for(;z.v();){v=z.gS()
if(!J.u(y.h(0,v),x.h(0,v)))return!1}return!0},
j:function(a){return J.f(this.a)},
h:function(a,b){return this.a.h(0,b)},
Y:function(a,b){this.a.Y(0,b)},
ga_:function(a){var z=this.a
return z.ga_(z)},
gq:function(a){var z=this.a
return z.gq(z)},
bQ:function(){if(new H.aA(H.Y(H.k(this,0)),null).R(0,C.u))throw H.c(new P.R('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.aA(H.Y(H.k(this,1)),null).R(0,C.u))throw H.c(new P.R('explicit value type required, for example "new BuiltMap<int, int>"'))}},jF:{"^":"a:0;a",
$1:function(a){var z,y
z=J.h(a)
y=J.h(this.a.a.h(0,a))
return X.d1(X.aW(X.aW(0,J.h(z)),J.h(y)))}},cJ:{"^":"d;a,b,$ti",
n:function(){var z=this.b
if(z==null){z=new A.cx(this.a,null,null,null,this.$ti)
z.bQ()
this.b=z}return z},
i:function(a){var z
if(H.aP(a,"$iscx",this.$ti,null)){this.b=a
this.a=a.a}else if(!!a.$iscx){z=P.f9(a.a,H.k(this,0),H.k(this,1))
this.b=null
this.a=z}else if(!!a.$isH){z=P.f9(a,H.k(this,0),H.k(this,1))
this.b=null
this.a=z}else throw H.c(P.F("expected Map or BuiltMap, got "+a.geb(a).j(0)))},
h:function(a,b){return this.a.h(0,b)},
bQ:function(){if(new H.aA(H.Y(H.k(this,0)),null).R(0,C.u))throw H.c(new P.R('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.aA(H.Y(H.k(this,1)),null).R(0,C.u))throw H.c(new P.R('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,L,{"^":"",dh:{"^":"d;a,b,$ti",
ae:function(a){var z=new L.U(null,null,this.$ti)
z.ah()
z.i(this)
a.$1(z)
return z.n()},
gB:function(a){var z=this.b
if(z==null){z=this.a
z.toString
z=P.N(new H.cC(z,new L.jG(),[H.k(z,0),null]),!1,null)
C.a.eo(z)
z=X.bu(z)
this.b=z}return z},
R:function(a,b){var z,y,x
if(b==null)return!1
if(b===this)return!0
z=J.p(b)
if(!z.$isdh)return!1
y=this.a
if(b.a.a!==y.a)return!1
z=z.gB(b)
x=this.gB(this)
if(z==null?x!=null:z!==x)return!1
return y.ic(b)},
j:function(a){return J.f(this.a)},
gq:function(a){return this.a.a},
d0:function(a){return this.a.d0(a)},
ga0:function(a){var z,y
z=this.a
y=new P.ac(z,z.r,null,null,[null])
y.c=z.e
return y},
bn:function(a,b){var z=this.a
z.toString
return new H.cC(z,b,[H.k(z,0),null])},
ad:function(a,b){return this.a.ad(0,b)},
Y:function(a,b){return this.a.Y(0,b)},
ga_:function(a){return this.a.a===0},
ah:function(){if(new H.aA(H.Y(H.k(this,0)),null).R(0,C.u))throw H.c(new P.R('explicit element type required, for example "new BuiltSet<int>"'))}},jG:{"^":"a:0;",
$1:function(a){return J.h(a)}},U:{"^":"d;a,b,$ti",
n:function(){var z=this.b
if(z==null){z=new L.dh(this.a,null,this.$ti)
z.ah()
this.b=z}return z},
i:function(a){var z,y,x,w
if(H.aP(a,"$isdh",this.$ti,null)){this.a=a.a
this.b=a}else{z=H.k(this,0)
y=P.af(null,null,null,z)
for(x=J.ah(a);x.v();){w=x.gS()
if(H.hP(w,z))y.u(0,w)
else throw H.c(P.F("iterable contained invalid element: "+H.b(w)))}this.b=null
this.a=y}},
gaZ:function(){if(this.b!=null){this.a=P.c7(this.a,H.k(this,0))
this.b=null}return this.a},
ah:function(){if(new H.aA(H.Y(H.k(this,0)),null).R(0,C.u))throw H.c(new P.R('explicit element type required, for example "new SetBuilder<int>"'))}}}],["","",,Y,{"^":"",
i:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
S:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,N,{"^":"",nx:{"^":"nv;ch,cx,cn:cy<,db,dx,b,c,d,e,f,r,x,y,z,Q,a",
fk:function(){var z=$.$get$cq()
z.t(0,"game",this.cx)
z.t(0,"hitpoints",this.cy)
z.t(0,"stamina",this.db)
z.t(0,"gold",this.dx)},
iD:function(){var z,y,x,w
this.cx=null
this.cy=Z.bI("Health",new N.nA(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
z=P.t
this.db=Z.bI("Stamina",new N.nB(),"#CCCCCC","Spare physical energy",0,0,!0,z)
z=Z.bI("Gold",new N.nC(),"#CCCCCC","Gold coins",0,0,!0,z)
this.dx=z
y=$.$get$bT()
x=this.cy
w=this.db
y=new O.eP(N.be("EdgeheadGame"),null,!1,null,null,null,null,null,null,null,null,new Y.a1(H.n([],[Y.ag]),0,P.aV()),x,w,z,O.uR(),O.uQ(),O.uP(),y,this.gfY(),new P.bL(""),!1,null)
y.fX()
this.cx=y
y.x="endGame"
$.$get$ck().u(0,0)},
h7:function(){var z,y
z=new O.cR(["# Insignificant Little Vermin",[null,P.a_(["goto","gameLoop"])]],0,null,!1,!1)
y=this.b.a
y.t(0,"start",z)
z.a="start"
z=new O.cR([new N.nz(this),[null,P.a_(["goto","gameLoop"])]],0,null,!1,!1)
y.t(0,"gameLoop",z)
z.a="gameLoop"
z=new O.cR(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.t(0,"endGame",z)
z.a="endGame"
this.c=y.h(0,"start")},
A:{
ny:function(){var z,y,x,w
z=Z.bI("Health",new N.rZ(),"#CCCCCC","Your physical state",100,0,!0,P.aX)
y=P.t
x=Z.bI("Stamina",new N.t_(),"#CCCCCC","Spare physical energy",0,0,!0,y)
y=Z.bI("Gold",new N.t0(),"#CCCCCC","Gold coins",0,0,!0,y)
w=P.m
z=new N.nx("net.filiph.edgehead.0.0.1",null,z,x,y,new O.nD(new H.P(0,null,null,null,null,null,0,[w,O.cR])),null,null,null,P.af(null,null,null,w),!1,null,-9999,null,null,null)
z.h7()
return z}}},rZ:{"^":"a:24;",
$1:function(a){if(a===0)return"\ud83d\udc80"
if(a<=0.5)return"\ud83d\ude23"
if(a<1)return"\ud83d\ude27"
return"\ud83d\ude10"}},t_:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},t0:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}},nz:{"^":"a:28;a",
$0:function(){var z=0,y=P.av(),x=this
var $async$$0=P.as(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:z=2
return P.ar(x.a.cx.b8(),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},nA:{"^":"a:24;",
$1:function(a){if(a===0)return"\ud83d\udc80"
if(a<=0.5)return"\ud83d\ude23"
if(a<1)return"\ud83d\ude27"
return"\ud83d\ude10"}},nB:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udd06"}},nC:{"^":"a:9;",
$1:function(a){return H.b(a)+" \ud83d\udcb0"}}}],["","",,M,{"^":"",cB:{"^":"d;"},kM:{"^":"d;"},pu:{"^":"cB;a,b,c",
ae:function(a){var z=new M.dX(null,!1,0,0)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.cB))return!1
return this.a===b.a&&this.b===b.b&&!0},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF),C.R.gB(!1)))},
j:function(a){return"EdgeheadGlobalState {bloodrockFollowers="+C.i.j(this.a)+",\nbrianaQuoteIndex="+C.i.j(this.b)+",\nhasKegOfBeer="+String(!1)+",\n}"}},dX:{"^":"kM;d,a,b,c",
gc2:function(){var z=this.d
if(z!=null){this.b=z.a
this.c=this.d.b
this.d.c
this.a=!1
this.d=null}return this},
i:function(a){this.d=a},
n:function(){var z,y,x
z=this.d
if(z==null){this.gc2()
y=this.b
this.gc2()
x=this.c
this.gc2()
this.a
z=new M.pu(y,x,!1)}this.i(z)
return z}}}],["","",,O,{"^":"",
xb:[function(a){return a.a-2*a.c},"$1","d6",2,0,27],
xn:[function(a){return a.a+a.b-a.c},"$1","hV",2,0,27],
eP:{"^":"md;y,z,Q,ch,cx,cy,db,dx,dy,cz:fr<,fx,fy,cn:go<,id,k1,a,b,c,d,e,f,r,x",
fX:function(){var z,y,x,w,v,u
z=P.ax(C.r,null)
y=$.$get$br()
this.cy=R.b0(1000,"orc",O.d6(),null,null,new G.az("sword",1,1,!1,!0,!1,z),null,0,2,0,!1,!1,2,!1,C.w,0,y)
this.db=R.b0(1001,"goblin",O.d6(),null,null,new G.az("scimitar",1,1,!1,!0,!1,P.ax(C.r,null)),null,0,1,0,!1,!1,1,!1,C.w,0,y)
y=new S.M(null,null,[Q.o])
y.ab()
y.i([new Q.o("start_adventure","","",null)])
this.dx=new K.cc(y.n(),"preStartBook",new O.kD(),new O.kE(),null,null,"ground")
y=R.b0(1,"Filip",null,"preStartBook",null,null,null,0,2,1000,!1,!0,2,!0,C.I,1,null)
this.ch=y
this.go.sai(y.x/y.db)
this.id.sai(this.ch.fy)
this.k1.sai(this.ch.r)
this.cx=R.b0(100,"Briana",null,this.dx.b,null,null,this.ch.y,0,2,0,!1,!1,2,!0,C.a4,0,null)
this.dy=F.fA(this.dx,!1)
y=K.cc
x=P.N($.$get$hI(),!0,y)
C.a.au(x,[this.dx,$.$get$ei()])
w=new M.dX(null,!1,0,0).n()
z=this.ch
v=this.cx
u=this.dy
v=P.c7([z,v],R.x)
z=P.b6(null,O.cs)
u=new A.a2(v,P.af(null,null,null,U.D),w,z,P.c7(x,y),P.N([u],!0,S.ab),0,null)
this.fr=u
y=new Y.a1(H.n([],[Y.ag]),0,P.aV())
y.b=u.r
this.fx=new B.bD(u,null,y,1,1,!0,!1,!1,0)},
cv:function(){var z=0,y=P.av(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$cv=P.as(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:v=w.fy
u=w.giq()
if(v.fh(u)){z=1
break}t=w.fr.w(w.ch.y)
s=w.go
r=t.x/t.db
if(!J.u(s.f,r)){s.f=r
s.y=!0
$.bj=!0}s=w.id
r=t.fy
if(!J.u(s.f,r)){s.f=r
s.y=!0
$.bj=!0}s=w.k1
r=t.r
if(!J.u(s.f,r)){s.f=r
s.y=!0
$.bj=!0}s=w.y
s.T(C.B,"update() for world at time "+w.fr.r,null,null)
r=w.fr.f
if(r.length===0){w.r=!0
v.l(0,"\n\n",!0)
if(!w.fr.iA(w.ch.y))v.l(0,"You die.",!0)
w.f.C+=v.bW()
z=1
break}r=C.a.gD(r)
q=w.fr
p=r.as(r.gU(),q)
if(p==null){v=w.fr
u=v.f
o=C.a.gD(u)
o.cs(v)
C.a.Z(u,o);++w.fr.r
z=1
break}n=G.iR(p,w.fr)
z=3
return P.ar(n.j_(),$async$cv)
case 3:q=n.f
if(q.ga_(q)){m=n.a
l=n.b
m.T(C.D,"There are no actions available for actorId="+H.b(l)+".",null,null)
l="Actions not available for "+H.b(l)+" and "
k=n.c
j=k.a
i=J.p(j)
j="PlanConsequence<"+i.gB(j)+", "+i.j(j)+", "+J.f(k.b)+", "+H.b(k.d)+", "+k.y+", "
m.T(C.q,l+(j+(k.x?"isSuccess":"")+">")+".",null,null)}m=Z.mM(q)
h=new Z.mL(new P.hi(q,[null,null]),m)
if(q.ga_(q))$.$get$bE().T(C.D,"Created with no recommendations.",null,null)
q=m.length
if(q===0){s.T(C.C,"No recommendation for "+H.b(p.dx),null,null)
s.T(C.C,new O.kG(w),null,null)
w.fr.f3(r.gp());++w.fr.r
z=1
break}z=p.cx?4:6
break
case 4:if(q>1)for(g=0;u=m.length,g<u;u===q||(0,H.au)(m),++g);s.T(C.q,"planner.generateTable for "+H.b(p.dx),null,null)
n.ei().Y(0,new O.kH(w))
u=h.fj(r.gd1(),O.hV())
u.toString
f=P.N(u,!1,H.z(u,"y",0))
if(f.length!==0&&C.a.b5(f,new O.kI())){w.f.C+=v.bW()
C.a.sq(v.a,0)}v=new O.kJ(new O.kL())
u=f.length-1
if(u-0<=32)H.fQ(f,0,u,v)
else H.fP(f,0,u,v)
for(v=f.length,u=w.c,g=0;g<f.length;f.length===v||(0,H.au)(f),++g){e=f[g]
u.$3$helpMessage$script(e.gW(),e.gM(),new O.kK(w,p,e))}z=1
break
z=5
break
case 6:s=p.b
z=7
return P.ar(w.c3(h.iZ(s==null?O.hV():s),p,v),$async$cv)
case 7:case 5:v.fh(u)
case 1:return P.aC(x,y)}})
return P.aD($async$cv,y)},
cI:function(a,b,c){var z=0,y=P.av(),x=this,w,v,u,t,s,r,q,p,o,n,m,l
var $async$cI=P.as(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=a.G(b,x.fr)
z=w===1?2:4
break
case 2:x.fx=C.a.gbK(c)
z=3
break
case 4:z=w===0?5:7
break
case 5:x.fx=C.a.gbK(c)
z=6
break
case 7:v=C.a.gD(J.f(a.gI()).split("."))
w.toString
u=a.a4(b,x.fr)
if(a.gN()){a.gI()
t=b.fy>=1}else t=!1
s="use "+H.b(v)
x.eQ()
z=8
return P.ar(x.e.$4$rerollEffectDescription$rerollable(w,u,s,t),$async$cI)
case 8:r=e
t=new H.I(c,new O.kx(r),[H.k(c,0)])
x.fx=t.gbK(t)
if(r.gjp()){q=A.dW(x.fx.a)
q.V(b.y,new O.ky())
u=x.fx
t=u.b
s=H.n([],[Y.ag])
p=new Y.a1(s,0,P.aV())
C.a.au(s,u.c.a)
s=u.d
o=u.e
n=u.f
m=u.r
l=u.x
u=u.y
p.b=q.r
x.fx=new B.bD(q,t,p,s,o,n,m,l,u)}case 6:case 3:return P.aC(null,y)}})
return P.aD($async$cI,y)},
c3:function(a,b,c){var z=0,y=P.av(),x=this,w,v
var $async$c3=P.as(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=a.cT(b,x.fx,x.fr)
v=P.N(w,!0,H.z(w,"y",0))
z=b.cx?2:4
break
case 2:z=5
return P.ar(x.cI(a,b,v),$async$c3)
case 5:z=3
break
case 4:x.fx=v[S.n6(new H.aj(v,new O.kA(),[H.k(v,0),null]),1)]
case 3:C.a.au(c.a,x.fx.c.a)
x.fr=x.fx.a
w=x.y
w.T(C.q,new O.kB(a,b),null,null)
w.T(C.j,new O.kC(x,b),null,null)
return P.aC(null,y)}})
return P.aD($async$c3,y)}},
kD:{"^":"a:3;",
$3:function(a,b,c){return c.l(0,"UNUSED because this is the first choice",!0)}},
kE:{"^":"a:3;",
$3:function(a,b,c){return H.e(new P.v("Room isn't to be revisited"))}},
kG:{"^":"a:2;a",
$0:function(){var z=this.a.fr.d
return"- how we got here: "+new H.aj(z,new O.kF(),[H.k(z,0),null]).cq(0," <- ")}},
kF:{"^":"a:0;",
$1:function(a){return a.gbc()}},
kH:{"^":"a:0;a",
$1:function(a){return this.a.y.T(C.q,a,null,null)}},
kL:{"^":"a:47;",
$1:function(a){if(a instanceof Q.w)return H.b(a.b.dx)+" "+a.gW()
return"ZZZZZZ "+a.gW()}},
kI:{"^":"a:0;",
$1:function(a){return a.gW()!==""}},
kJ:{"^":"a:6;a",
$2:function(a,b){var z=this.a
return J.bw(z.$1(a),z.$1(b))}},
kK:{"^":"a:28;a,b,c",
$0:function(){var z=0,y=P.av(),x=this,w
var $async$$0=P.as(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.ar(w.c3(x.c,x.b,w.fy),$async$$0)
case 2:return P.aC(null,y)}})
return P.aD($async$$0,y)}},
kx:{"^":"a:0;a",
$1:function(a){return a.ge0()===this.a.ge0()}},
ky:{"^":"a:0;",
$1:function(a){var z=a.gk().go
a.gk().go=z-1
return a}},
kA:{"^":"a:0;",
$1:function(a){return a.gj0()}},
kB:{"^":"a:2;a,b",
$0:function(){return H.b(this.b.dx)+" selected "+this.a.gm()}},
kC:{"^":"a:2;a,b",
$0:function(){var z,y
z=this.a.fr.d
y=new H.aj(z,new O.kz(),[H.k(z,0),null]).cq(0," <- ")
return"- how "+H.b(this.b.dx)+" got here: "+y}},
kz:{"^":"a:0;",
$1:function(a){return a.gbc()}}}],["","",,Q,{"^":"",
i_:function(a,b,c){return P.aO(function(){var z=a,y=b,x=c
var w=0,v=1,u,t,s,r,q,p
return function $async$i_(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=t.length!==0?C.a.gD(t):null
s=J.iO(t.aL(y.a,y),new Q.u0(z))
t=J.ah(s.a),r=new H.bM(t,s.b,[H.k(s,0)])
case 2:if(!r.v()){w=3
break}q=t.gS()
p=x.$1(q)
if(p.gH()&&z.cY(q,y)<=0){w=2
break}w=4
return p
case 4:w=2
break
case 3:return P.aM()
case 1:return P.aN(u)}}})},
i0:function(a,b,c){return P.aO(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i0(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=y.dg((t.length!==0?C.a.gD(t):null).a).a.a,t=new J.b2(t,t.length,0,null,[H.k(t,0)])
case 2:if(!t.v()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aM()
case 1:return P.aN(u)}}})},
i1:function(a,b,c){return P.aO(function(){var z=a,y=b,x=c
var w=0,v=1,u,t
return function $async$i1(d,e){if(d===1){u=e
w=v}while(true)switch(w){case 0:t=y.f
t=(t.length!==0?C.a.gD(t):null).a.a,t=new J.b2(t,t.length,0,null,[H.k(t,0)])
case 2:if(!t.v()){w=3
break}w=4
return x.$1(t.d)
case 4:w=2
break
case 3:return P.aM()
case 1:return P.aN(u)}}})},
u0:{"^":"a:0;a",
$1:function(a){return!J.u(a,this.a)&&a.gbl()}},
ae:{"^":"d;",
cT:function(a,b,c){var z=this
return P.aO(function(){var y=a,x=b,w=c
var v=0,u=1,t,s,r
return function $async$cT(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.G(y,x.a)
v=s>0?2:3
break
case 2:r=A.dW(w)
v=4
return B.fo(r,x,z,z.hh(r,y,w,z.gL(),!0),s,!1,!1,!0)
case 4:case 3:v=s<1?5:6
break
case 5:r=A.dW(w)
v=7
return B.fo(r,x,z,z.hg(r,y,w,z.gK(),!0),1-s,!0,!1,!1)
case 7:case 6:return P.aM()
case 1:return P.aN(t)}}})},
es:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
a.x=this
z=a.a.bd(0,new Q.iP(b))
y=new O.eC(null,null,null,null,null,null,null,null,null,null,null,null,null)
x=this.gm()
y.ga2().c=x
x=b.y
y.ga2().r=x
y.ga2().f=C.W
y.ga2().cx=f
y.ga2().Q=e
x=this.gH()
y.ga2().z=x
x=this.gX()
y.ga2().ch=x
if(!!this.$isw){x=y.ga2()
w=x.x
if(w==null){w=new L.U(null,null,[P.t])
w.ah()
w.i(C.h)
x.x=w
x=w}else x=w
w=this.b.y
if(w==null)H.e(P.F("null element"))
x.gaZ().u(0,w)}if(!!this.$isc0){x=this.b.a
y.ga2().d=x}v=new Y.a1(H.n([],[Y.ag]),0,P.aV())
x=a.f
u=(x.length!==0?C.a.gD(x):null).gp()
a.gB(a);(x.length!==0?C.a.gD(x):null).toString
this.a=d.$3(z,a,v)
if(a.cN(u)!=null)a.f3(u);++a.r
w=a.ej(u)
if(!(w==null))w.ff(a,v)
a.x=null
while(!0){w=x.length!==0?C.a.gD(x):null
if((w==null?w:w.as(w.gU(),a))!=null){w=x.length!==0?C.a.gD(x):null
w=!J.u(w==null?w:w.cE(a),!0)}else w=!0
if(!w)break
if((x.length!==0?C.a.gD(x):null)==null)break
t=C.a.gD(x)
t.cs(a)
C.a.Z(x,t)}x=x.length!==0?C.a.gD(x):null
if(!(x==null))x.fg(a,v)
if(this.a==null)H.e(new P.v("No description given when executing "+this.j(0)+". You should return it from your world-modifying function."))
x=this.a
y.ga2().e=x
x=a.r
y.ga2().y=x
a.d.eX(y.n())
return v},
hh:function(a,b,c,d,e){return this.es(a,b,c,d,!1,e)},
hg:function(a,b,c,d,e){return this.es(a,b,c,d,e,!1)}},
iP:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a.y
return z==null?y==null:z===y}},
w:{"^":"ae;dU:b<",
gW:function(){var z=new Y.a1(H.n([],[Y.ag]),0,P.aV())
z.eV(0,this.ga3(),this.b)
return z.bW()},
a4:function(a,b){var z=new Y.a1(H.n([],[Y.ag]),0,P.aV())
z.hY(0,this.ga7(),this.b,a,!0)
return z.bW()},
j:function(a){var z=this.b
return"EnemyTargetAction<"+this.ga3()+"::enemy="+H.b(z.y)+"/"+H.b(z.dx)+">"}},
c0:{"^":"ae;",
gW:function(){return this.b.b},
j:function(a){return"ExitAction<"+this.b.b+">"}},
c2:{"^":"ae;",
gW:function(){var z=new Y.a1(H.n([],[Y.ag]),0,P.aV())
z.eV(0,this.ga3(),this.b)
return z.bW()},
j:function(a){return"ItemAction<"+this.gW()+">"}},
ng:{"^":"d;a,b",
j:function(a){return this.b}}}],["","",,O,{"^":"",cs:{"^":"d;",
j:function(a){return"ActionRecord<"+H.b(this.b)+", "+H.b(this.d)+">"}},m2:{"^":"d;a,b",
j:function(a){return this.b}},pq:{"^":"cs;a,dI:b<,dS:c<,bc:d<,e,ct:f<,eq:r<,U:x<,fE:y<,z,fF:Q<,fG:ch<",
ae:function(a){var z=new O.eC(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof O.cs))return!1
if(J.u(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y){z=this.f
y=b.f
if(z==null?y==null:z===y)if(J.u(this.r,b.r)){z=this.x
y=b.x
if(z==null?y==null:z===y){z=this.y
y=b.y
if(z==null?y==null:z===y){z=this.z
y=b.z
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.ch
y=b.ch
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)),J.h(this.f)),J.h(this.r)),J.h(this.x)),J.h(this.y)),J.h(this.z)),J.h(this.Q)),J.h(this.ch)))},
j:function(a){return"ActionRecord {accomplices="+J.f(this.a)+",\nactionName="+J.f(this.b)+",\ndataString="+J.f(this.c)+",\ndescription="+J.f(this.d)+",\nknownTo="+J.f(this.e)+",\nprotagonist="+J.f(this.f)+",\nsufferers="+J.f(this.r)+",\ntime="+J.f(this.x)+",\nwasAggressive="+J.f(this.y)+",\nwasFailure="+J.f(this.z)+",\nwasProactive="+J.f(this.Q)+",\nwasSuccess="+J.f(this.ch)+",\n}"}},eC:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdI:function(){return this.ga2().c},
gdS:function(){return this.ga2().d},
gbc:function(){return this.ga2().e},
gct:function(){return this.ga2().r},
geq:function(){var z,y
z=this.ga2()
y=z.x
if(y==null){y=new L.U(null,null,[P.t])
y.ah()
y.i(C.h)
z.x=y
z=y}else z=y
return z},
gU:function(){return this.ga2().y},
gfE:function(){return this.ga2().z},
gfF:function(){return this.ga2().ch},
gfG:function(){return this.ga2().cx},
ga2:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new L.U(null,null,[H.k(z,0)])
y.ah()
y.i(z)
z=y}this.b=z
z=this.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.r=z.f
z=z.r
if(!(z==null)){y=new L.U(null,null,[H.k(z,0)])
y.ah()
y.i(z)
z=y}this.x=z
z=this.a
this.y=z.x
this.z=z.y
this.Q=z.z
this.ch=z.Q
this.cx=z.ch
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.a
if(z==null){y=this.ga2()
x=y.b
if(x==null){x=new L.U(null,null,[P.t])
x.ah()
x.i(C.h)
y.b=x
y=x}else y=x
y=y.n()
x=this.ga2().c
w=this.ga2().d
v=this.ga2().e
u=this.ga2().f
t=this.ga2().r
s=this.ga2()
r=s.x
if(r==null){r=new L.U(null,null,[P.t])
r.ah()
r.i(C.h)
s.x=r
s=r}else s=r
s=s.n()
r=this.ga2().y
q=this.ga2().z
p=this.ga2().Q
o=this.ga2().ch
n=this.ga2().cx
z=new O.pq(y,x,w,v,u,t,s,r,q,p,o,n)
if(y==null)H.e(P.j("accomplices"))
if(x==null)H.e(P.j("actionName"))
if(v==null)H.e(P.j("description"))
if(u==null)H.e(P.j("knownTo"))
if(t==null)H.e(P.j("protagonist"))
if(s==null)H.e(P.j("sufferers"))
if(r==null)H.e(P.j("time"))
if(q==null)H.e(P.j("wasAggressive"))
if(p==null)H.e(P.j("wasFailure"))
if(o==null)H.e(P.j("wasProactive"))
if(n==null)H.e(P.j("wasSuccess"))}this.i(z)
return z}}}],["","",,R,{"^":"",
i2:function(a,b){return P.aO(function(){var z=a,y=b
var x=0,w=1,v,u
return function $async$i2(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:x=2
return z
case 2:u=y.a
x=3
return P.bO(new H.I(u,new R.uj(z),[H.k(u,0)]))
case 3:return P.aM()
case 1:return P.aN(v)}}})},
b0:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var z=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
new R.rV(a,b,l,n,o,f,e,i,m,p,j,h,d,g,q,!1,c).$1(z)
return z.n()},
uj:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gf6()
y=this.a.y
return z==null?y==null:z===y}},
x:{"^":"mn;",
gal:function(){return this.x>0},
gf8:function(){return this.e instanceof K.T},
gfa:function(){return this.fr===C.f},
ge_:function(){return this.fr===C.d},
dR:function(a){var z,y,x
for(z=this.cy.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e,x=0;y.v();)if(C.a.ad(y.d.gfB(),a))++x
z=this.e
z=z==null?z:z.a
if((z==null?z:J.bW(z,a))===!0)++x
z=this.d
z=z==null?z:z.a
return(z==null?z:J.bW(z,a))===!0?x+1:x},
iv:function(){var z,y,x,w,v,u,t
for(z=this.cy.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e,x=null,w=-9999999;y.v();){v=y.d
if(!(v instanceof L.aL))continue
z=v.gaf()
u=v.gaJ()
t=v.gaG()?1:0
if(2+z+u+t>w){z=v.gaf()
u=v.gaJ()
t=v.gaG()?1:0
w=2+z+u+t
x=v}}return x},
iB:function(a,b){return this.cY(a,b)>0},
cY:function(a,b){var z,y
if(this.ch){z=a.go
y=this.go.a
z=z.a
z=y==null?z==null:y===z}else z=!1
if(z)return 1000
if(this.hx(a,b,10))return 1
z=a.go
y=this.go.a
z=z.a
return(y==null?z!=null:y!==z)?1:0},
cD:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.w(this.y)
y=z.x
x=2*y
if(!(y>0))x-=10
y=z.e
if(!(y instanceof K.T))x+=4
x+=y.gai()/2
for(y=z.cy.a,w=[null],v=new P.ac(y,y.r,null,null,w),v.c=y.e;v.v();)x+=J.cr(v.d.gai(),10)
y=a.a
for(v=y.ga0(y),u=new H.bM(v,new R.jj(this),[H.k(y,0)]),t=0;u.v();){s=v.gS()
r=s.gbl()?2:0
q=s.gcn()
p=s.e
o=p.gaf()
n=p.gaJ()
p=p.gaG()?1:0
t=t+r+2*q+(2+o+n+p)/2
for(r=s.cy.a,q=new P.ac(r,r.r,null,null,w),q.c=r.e;q.v();)t+=J.cr(q.d.gai(),10)}return new A.ct(x,t,y.b6(0,0,new R.jk(this,a)))},
hx:function(a,b,c){var z=b.ji(a,this,!0)
if(z==null)return!1
return z<=c},
$isaw:1},
mn:{"^":"d+dj;"},
rV:{"^":"a:0;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
$1:function(a){var z,y
a.gk().z=this.a
a.gk().dy=this.b
a.gk().fr=this.d
a.gk().fy=this.e
z=this.f
if(z==null)z=$.$get$d5()
a.gk().f=z
a.gk().e=this.r
a.gk().b=[]
a.gk().fx=C.d
a.gk().y=this.x
a.gk().dx=this.y
a.gk().x=this.ch
a.gk().go=this.z
a.gk().Q=this.Q
a.gk().ch=!0
a.gk().cy=this.c
z=new L.U(null,null,[U.D])
z.ah()
z.i(C.h)
a.gk().db=z
z=this.db
if(z!=null){y=new L.bk(null,null)
y.i(z)
z=y}else{z=$.$get$d8()
z.toString
y=new L.bk(null,null)
y.i(z)
z=y}a.gk().id=z
a.gk().d=this.cx
a.gk().r=this.cy
a.gk().cx=this.dx
a.gk().c=this.dy
return a}},
jj:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
if(J.u(a.gbq(),z.go)){y=a.gp()
z=z.y
z=y==null?z!=null:y!==z}else z=!1
return z}},
jk:{"^":"a:50;a,b",
$2:function(a,b){var z=b.gal()&&b.Q?1:0
return a+(z+b.x)*this.a.cY(b,this.b)}},
dJ:{"^":"d;a,b",
j:function(a){return this.b}},
pr:{"^":"x;a,b,ig:c<,by:d<,f2:e<,f6:f<,r,cn:x<,p:y<,z,bT:Q<,f9:ch<,b0:cx<,cy,db,m:dx<,aG:dy<,fr,ag:fx<,fy,bq:go<",
ae:function(a){var z=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof R.x))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y)if(J.u(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
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
if(z==null?y==null:z===y)if(J.u(this.cy,b.cy)){z=this.db
y=b.db
if(z==null?y==null:z===y){z=this.dx
y=b.dx
if(z==null?y==null:z===y){z=this.dy
y=b.dy
if(z==null?y==null:z===y){z=this.fr
y=b.fr
if(z==null?y==null:z===y){z=this.fx
y=b.fx
if(z==null?y==null:z===y){z=this.fy
y=b.fy
z=(z==null?y==null:z===y)&&J.u(this.go,b.go)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)),J.h(this.f)),J.h(this.r)),J.h(this.x)),J.h(this.y)),J.h(this.z)),J.h(this.Q)),J.h(this.ch)),J.h(this.cx)),J.h(this.cy)),J.h(this.db)),J.h(this.dx)),J.h(this.dy)),J.h(this.fr)),J.h(this.fx)),J.h(this.fy)),J.h(this.go)))},
j:function(a){return"Actor {categories="+J.f(this.a)+",\ncombineFunction="+J.f(this.b)+",\ncurrentRoomName="+J.f(this.c)+",\ncurrentShield="+J.f(this.d)+",\ncurrentWeapon="+J.f(this.e)+",\nfollowingActorId="+J.f(this.f)+",\ngold="+J.f(this.r)+",\nhitpoints="+J.f(this.x)+",\nid="+J.f(this.y)+",\ninitiative="+J.f(this.z)+",\nisActive="+J.f(this.Q)+",\nisConfused="+J.f(this.ch)+",\nisPlayer="+J.f(this.cx)+",\nitems="+J.f(this.cy)+",\nmaxHitpoints="+J.f(this.db)+",\nname="+J.f(this.dx)+",\nnameIsProperNoun="+J.f(this.dy)+",\npose="+J.f(this.fr)+",\npronoun="+J.f(this.fx)+",\nstamina="+J.f(this.fy)+",\nteam="+J.f(this.go)+",\n}"}},
am:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id",
gby:function(){return this.gk().e},
gf2:function(){return this.gk().f},
gf6:function(){return this.gk().r},
gcn:function(){return this.gk().y},
gp:function(){return this.gk().z},
gf9:function(){return this.gk().cx},
gb0:function(){return this.gk().cy},
gm:function(){return this.gk().dy},
gbq:function(){var z,y
z=this.gk()
y=z.id
if(y==null){y=new L.bk(null,null)
z.id=y
z=y}else z=y
return z},
gk:function(){var z,y
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
z=z.cy
if(!(z==null)){y=new L.U(null,null,[H.k(z,0)])
y.ah()
y.i(z)
z=y}this.db=z
z=this.a
this.dx=z.db
this.dy=z.dx
this.fr=z.dy
this.fx=z.fr
this.fy=z.fx
this.go=z.fy
z=z.go
if(!(z==null)){y=new L.bk(null,null)
y.i(z)
z=y}this.id=z
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.a
if(z==null){y=this.gk().b
x=this.gk().c
w=this.gk().d
v=this.gk().e
u=this.gk().f
t=this.gk().r
s=this.gk().x
r=this.gk().y
q=this.gk().z
p=this.gk().Q
o=this.gk().ch
n=this.gk().cx
m=this.gk().cy
l=this.gk()
k=l.db
if(k==null){k=new L.U(null,null,[U.D])
k.ah()
k.i(C.h)
l.db=k
l=k}else l=k
l=l.n()
k=this.gk().dx
j=this.gk().dy
i=this.gk().fr
h=this.gk().fx
g=this.gk().fy
f=this.gk().go
e=this.gk()
d=e.id
if(d==null){d=new L.bk(null,null)
e.id=d
e=d}else e=d
e=e.n()
z=new R.pr(y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e)
if(y==null)H.e(P.j("categories"))
if(u==null)H.e(P.j("currentWeapon"))
if(s==null)H.e(P.j("gold"))
if(r==null)H.e(P.j("hitpoints"))
if(q==null)H.e(P.j("id"))
if(p==null)H.e(P.j("initiative"))
if(o==null)H.e(P.j("isActive"))
if(n==null)H.e(P.j("isConfused"))
if(m==null)H.e(P.j("isPlayer"))
if(l==null)H.e(P.j("items"))
if(k==null)H.e(P.j("maxHitpoints"))
if(j==null)H.e(P.j("name"))
if(i==null)H.e(P.j("nameIsProperNoun"))
if(h==null)H.e(P.j("pose"))
if(g==null)H.e(P.j("pronoun"))
if(f==null)H.e(P.j("stamina"))}this.i(z)
return z}}}],["","",,A,{"^":"",ct:{"^":"d;el:a<,fz:b<,dU:c<",
c1:function(a,b){return new A.ai(this.a-b.a,this.b-b.b,this.c-b.c)},
j:function(a){return"ActorScore<self="+C.m.b9(this.a,2)+",team="+C.m.b9(this.b,2)+",enemy="+J.iN(this.c,2)+">"}},ai:{"^":"d;el:a<,fz:b<,dU:c<",
giL:function(){return this.a===-1/0&&this.b===-1/0&&this.c===-1/0},
c0:function(a,b){return new A.ai(this.a*b,this.b*b,this.c*b)},
aK:function(a,b){return new A.ai(this.a+b.a,this.b+b.b,this.c+b.c)},
eh:function(a,b){return new A.ai(this.a/b,this.b/b,this.c/b)},
j:function(a){return"ActorScoreChange<self="+C.m.b9(this.a,2)+",team="+C.m.b9(this.b,2)+",enemy="+C.m.b9(this.c,2)+">"},
A:{
ji:function(a){var z,y,x,w,v,u,t,s
for(z=a.length,y=0,x=0,w=0,v=0,u=0;t=a.length,u<t;t===z||(0,H.au)(a),++u){s=a[u];++y
x+=s.a
w+=s.b
v+=s.c}if(y===0)throw H.c(P.F("Cannot average empty iterable"))
return new A.ai(x/y,w/y,v/y)}}}}],["","",,U,{"^":"",
wo:function(a){switch(a){case C.F:return"fist"
case C.y:return"shield"
case C.v:return"spear"
case C.z:return"sword"}throw H.c(P.F(a))},
D:{"^":"mo;fB:a<",
gbc:function(){return U.wo(C.a.gdW(this.a))},
gp:function(){return H.ay(this)},
gbT:function(){return!0},
gal:function(){return!1},
gb0:function(){return!1},
gaG:function(){return!1},
gag:function(){return C.p},
gbq:function(){return $.$get$aE()},
$isaw:1},
mo:{"^":"d+dj;"},
bA:{"^":"d;a,b",
j:function(a){return this.b}}}],["","",,K,{"^":"",T:{"^":"aL;m:b<,a"}}],["","",,E,{"^":"",bh:{"^":"D;m:b<,a",
gai:function(){return 1},
$isaw:1}}],["","",,Z,{"^":"",ak:{"^":"aL;m:b<,af:c<,aJ:d<,aG:e<,bR:f<,dP:r<,a",A:{
od:function(a,b,c,d,e){return new Z.ak(c,0,e,!1,!1,!1,P.ax(C.G,null))}}}}],["","",,G,{"^":"",az:{"^":"aL;m:b<,af:c<,aJ:d<,aG:e<,bR:f<,dP:r<,a",A:{
oL:function(a,b,c,d,e,f){return new G.az(c,e,f,d,!0,!1,P.ax(C.r,null))}}}}],["","",,L,{"^":"",aL:{"^":"D;",
gdP:function(){return!1},
gbR:function(){return!1},
gq:function(a){return 2},
gaf:function(){return 0},
gaJ:function(){return 0},
gai:function(){var z,y,x
z=this.gaf()
y=this.gaJ()
x=this.gaG()?1:0
return 2+z+y+x},
$isaw:1}}],["","",,G,{"^":"",md:{"^":"d;",
eQ:function(){var z,y
z=this.f
y=z.C
if(y.length!==0){this.b.$1(y.charCodeAt(0)==0?y:y)
z.C=""}},
jx:[function(a){this.f.C+=a},"$1","giq",2,0,16],
b8:function(){var z=0,y=P.av(),x,w=this,v,u
var $async$b8=P.as(function(a,b){if(a===1)return P.aB(b,y)
while(true)switch(z){case 0:if(w.x==null)throw H.c(new P.v("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(w.r){w.d.sq(0,0)
w.a.$1(w.x)
z=1
break}v=w.d
u=w.f
case 3:if(!!0){z=4
break}if(!(!w.r&&v.gq(v)===0&&u.C.length===0)){z=4
break}z=5
return P.ar(w.cv(),$async$b8)
case 5:z=3
break
case 4:w.eQ()
case 1:return P.aC(x,y)}})
return P.aD($async$b8,y)}}}],["","",,B,{"^":"",eN:{"^":"d;ek:a<,f1:b<,e3:c<",
j:function(a){return"ConsequenceStats<order="+this.c+", cumProb="+C.m.b9(this.b,3)+", score="+this.a.j(0)+">"}},bD:{"^":"d;cz:a<,hT:b<,c,j0:d<,f1:e<,f,r,e0:x<,e3:y<",
gB:function(a){return X.bu(H.n([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x],[P.d]))},
R:function(a,b){var z
if(b==null)return!1
z=J.p(b)
return!!z.$isbD&&this.gB(this)===z.gB(b)},
j:function(a){var z,y
z=this.a
y=J.p(z)
z="PlanConsequence<"+y.gB(z)+", "+y.j(z)+", "+J.f(this.b)+", "+H.b(this.d)+", "+this.y+", "
return z+(this.x?"isSuccess":"")+">"},
A:{
fo:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?e:e*b.e
z=z?0:b.y+1
d.b=a.r
return new B.bD(a,c,d,e,y,g,f,h,z)}}}}],["","",,G,{"^":"",iQ:{"^":"d;a,b,c,d,e,f",
ia:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
z.T(C.j,"...",null,null)
z.T(C.j,"combining scores",null,null)
y=H.n([],[A.ai])
x=new G.jb()
for(w=J.ah(a),v=b.a,u=b.b,t=b.c,s=null;w.v();){r=w.gS()
z.T(C.j,new G.j9(r),null,null)
if(r.gf1()>0.15)if(s==null){z.T(C.j,"    - first _bestCase",null,null)
s=r}else if(J.ao(x.$1(r.gek()),x.$1(s.a))){z.T(C.j,"    - new _bestCase",null,null)
s=r}q=r.gek()
p=r.b
o=new A.ai((q.a-v)*p,(q.b-u)*p,(q.c-t)*p)
z.T(C.j,new G.ja(o),null,null)
y.push(o)}n=A.ji(y)
w=s==null
if(w)m=C.K
else{q=s.a
m=new A.ai(q.a-v,q.b-u,q.c-t)}w=w?s:s.c
if(w==null)w=1
v=m.a/w
u=m.b/w
w=m.c/w
t=n.a
q=n.b
p=n.c
z.T(C.j,"- uplifts average = "+("ActorScoreChange<self="+C.m.b9(t,2)+",team="+C.m.b9(q,2)+",enemy="+C.m.b9(p,2)+">"),null,null)
z.T(C.j,"- best = "+new A.ai(v,u,w).j(0),null,null)
l=new A.ai(v+t,u+q,w+p)
z.T(C.j,"- result = "+l.j(0),null,null)
return l},
ei:function(){var z=this
return P.aO(function(){var y=0,x=1,w,v,u,t,s
return function $async$ei(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.f,u=v.gbU(),u=u.ga0(u),t=1
case 2:if(!u.v()){y=3
break}s=u.gS()
y=4
return""+t+") "+s.gW()+"\t"+H.b(v.h(0,s))
case 4:++t
y=2
break
case 3:return P.aM()
case 1:return P.aN(w)}}})},
d3:function(a,b,c){var z=0,y=P.av(),x=this,w,v,u,t,s,r,q,p,o,n,m
var $async$d3=P.as(function(d,e){if(d===1)return P.aB(e,y)
while(true)switch(z){case 0:w=x.f
w.aV(0)
v=x.c
u=v.a
t=u.a.bd(0,new G.jc(x))
s=t.cD(u)
r=x.a
r.T(C.q,"Planning for "+H.b(t.dx)+", initialScore="+s.j(0),null,null)
q=new P.b8(x.dA(t,u).a(),null,null,null)
case 2:if(!q.v()){z=3
break}p=q.c
o=p==null?q.b:p.gS()
r.T(C.l,new G.jd(t,o),null,null)
if(!o.F(t,u)){r.T(C.l,new G.je(o),null,null)
z=2
break}z=4
return P.ar(x.c5(v,o,b,a,c).bZ(0),$async$d3)
case 4:n=e
if(J.ez(n)){r.T(C.l,new G.jf(o),null,null)
w.t(0,o,C.L)
z=2
break}r.T(C.l,new G.jg(s,o,n),null,null)
m=x.ia(n,s,b)
w.t(0,o,m)
r.T(C.l,new G.jh(o,m),null,null)
z=2
break
case 3:x.e=!0
return P.aC(null,y)}})
return P.aD($async$d3,y)},
j_:function(){return this.d3(50,10,null)},
dA:function(a,b){return P.aO(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q,p,o
return function $async$dA(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.f
x=2
return P.bO((u.length!==0?C.a.gD(u):null).gbt())
case 2:u=(u.length!==0?C.a.gD(u):null).gat()
t=u.length
s={func:1,ret:Q.c2,args:[U.D]}
r={func:1,ret:Q.c0,args:[Q.o]}
q={func:1,ret:Q.w,args:[R.x]}
p=0
case 3:if(!(p<u.length)){x=5
break}o=u[p]
x=H.at(o,q)?6:8
break
case 6:x=9
return P.bO(Q.i_(z,y,o))
case 9:x=7
break
case 8:x=H.at(o,r)?10:12
break
case 10:x=13
return P.bO(Q.i0(z,y,o))
case 13:x=11
break
case 12:x=H.at(o,s)?14:16
break
case 14:x=17
return P.bO(Q.i1(z,y,o))
case 17:x=15
break
case 16:throw H.c(new P.v(o.j(0)+" is not one of the supported ones"))
case 15:case 11:case 7:case 4:u.length===t||(0,H.au)(u),++p
x=3
break
case 5:return P.aM()
case 1:return P.aN(v)}}})},
c5:function(a5,a6,a7,a8,a9){var $async$c5=P.as(function(b0,b1){switch(b0){case 2:u=x
z=u.pop()
break
case 1:v=b1
z=w}while(true)switch(z){case 0:s={}
r=a5.a
q=r.a.bd(0,new G.iU(t))
p=t.a
p.T(C.l,"=====",null,null)
p.T(C.l,new G.iV(a6,q),null,null)
p.T(C.l,new G.iW(a6),null,null)
if(!a6.F(q,r)){p.T(C.l,"- firstAction not applicable",null,null)
z=1
break}o=q.cD(r)
p.T(C.l,new G.j1(a5,o),null,null)
p.T(C.l,new G.j2(a5),null,null)
n=P.b6(null,B.bD)
m=P.af(null,null,null,A.a2)
l=J.p(r)
k=l.gB(r)
for(j=new P.b8(a6.cT(q,a5,r).a(),null,null,null);j.v();){i=j.c
h=i==null?j.b:i.gS()
if(l.gB(r)!==k)throw H.c(new P.v("Action "+a6.j(0)+" modified world state when producing "+H.b(h)+"."))
n.aw(h)}s.a=0
r=t.b
case 3:if(!!n.ga_(n)){z=4
break}++s.a
g=n.d4()
p.T(C.j,"----",null,null)
p.T(C.j,new G.j3(g),null,null)
p.T(C.j,new G.j4(g),null,null)
if(g.ge3()>a7||s.a>a8){p.T(C.j,new G.j5(s,a7,g),null,null)
p.T(C.j,new G.j6(g),null,null)
z=4
break}z=g.gcz().f.length===0?5:6
break
case 5:p.T(C.j,"- leaf node: world.situations is empty (end of book)",null,null)
l=g.a
q=l.a.aW(0,new G.j7(t),new G.j8())
if(q==null){p.T(C.j,"- this actor ("+H.b(r)+") has been removed",null,null)
z=3
break}f=new B.eN(q.cD(l),g.e,g.y)
p.T(C.j,new G.iX(f),null,null)
z=7
x=[1]
return P.d_(P.hr(f),$async$c5,y)
case 7:z=3
break
case 6:l=g.a
j=l.f
j=j.length!==0?C.a.gD(j):null
e=j.as(j.gU(),l)
j=l.a
i=new H.I(j,new G.iY(t),[H.k(j,0)])
d=i.gq(i)
if(d>1)throw H.c(new P.v("World has several duplicates of mainActor: "+J.f(l)))
else if(d===0){p.T(C.B,"mainActor "+H.b(r)+" dies and is removed in world - will use defaultScoreWhenDead",null,null)
q=null}else q=j.bd(0,new G.iZ(t))
c=J.u(e,q)
j=e.dx
p.T(C.j,"- actor: "+H.b(j)+" (isMain=="+c+")",null,null)
i=q==null
p.T(C.j,"- mainActor: "+H.b(i?q:q.dx),null,null)
b=i?q:q.cD(l)
if(b==null)b=C.M
f=new B.eN(b,g.e,g.y)
p.T(C.j,new G.j_(o,f),null,null)
p.T(C.j,new G.j0(g),null,null)
z=8
x=[1]
return P.d_(P.hr(f),$async$c5,y)
case 8:p.T(C.j,"- generating all actions for "+H.b(j),null,null)
j=n.c
i=n.b
a=n.a
for(a0=new P.b8(t.dA(e,l).a(),null,null,null);a0.v();){a1=a0.c
a2=a1==null?a0.b:a1.gS()
if(!a2.F(e,l))continue
for(a1=new P.b8(a2.cT(e,g,l).a(),null,null,null);a1.v();){a3=a1.c
a4=a3==null?a1.b:a3.gS();++t.d
if(a4.e<0.05)continue
if(m.ad(0,a4.a))continue
n.aw(a4)}}p.T(C.j,"- added "+(((n.c-n.b&n.a.length-1)>>>0)-((j-i&a.length-1)>>>0))+" new PlanConsequences",null,null)
m.u(0,l)
z=3
break
case 4:case 1:return P.d_(null,0,y)
case 2:return P.d_(v,1,y)}})
var z=0,y=P.pT($async$c5),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
return P.rc(y)},
h1:function(a,b){},
A:{
iR:function(a,b){var z,y
z=N.be("ActorPlanner")
y=new Y.a1(H.n([],[Y.ag]),0,P.aV())
y.b=b.r
z=new G.iQ(z,a.y,new B.bD(b,null,y,1,1,!0,!1,!1,0),0,!1,new H.P(0,null,null,null,null,null,0,[null,null]))
z.h1(a,b)
return z}}},jb:{"^":"a:51;",
$1:function(a){return a.b-a.c}},j9:{"^":"a:2;a",
$0:function(){return"  - consequence: "+H.b(this.a)}},ja:{"^":"a:2;a",
$0:function(){return"    - uplift = "+this.a.j(0)}},jc:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a.b
return z==null?y==null:z===y}},jd:{"^":"a:2;a,b",
$0:function(){return"Evaluating action '"+this.b.gW()+"' for "+H.b(this.a.dx)}},je:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' isn't applicable"}},jf:{"^":"a:2;a",
$0:function(){return"- action '"+this.a.gW()+"' is possible but we couldn't get to any outcomes while planning. Scoring with negative infinity."}},jg:{"^":"a:2;a,b,c",
$0:function(){return"- action '"+this.b.gW()+"' leads to "+H.b(J.aS(this.c))+" different ConsequenceStats, initialScore="+this.a.j(0)}},jh:{"^":"a:2;a,b",
$0:function(){return"- action '"+this.a.gW()+"' was scored "+this.b.j(0)}},iU:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a.b
return z==null?y==null:z===y}},iV:{"^":"a:2;a,b",
$0:function(){return"_getConsequenceStats for firstAction '"+this.a.gW()+"' of "+H.b(this.b.gm())}},iW:{"^":"a:2;a",
$0:function(){return"- firstAction == "+J.f(this.a)}},j1:{"^":"a:2;a,b",
$0:function(){var z=this.a
return"- current: initialScore="+this.b.j(0)+", cumProb="+H.b(z.e)+" (prob="+H.b(z.d)+", ord="+z.y+")"}},j2:{"^":"a:2;a",
$0:function(){var z=this.a
return"- initial action: "+C.c.c0(" ",z.y)+"- "+J.f(z.b)}},j3:{"^":"a:2;a",
$0:function(){return"evaluating a PlanConsequence of '"+this.a.ghT().gW()+"'"}},j4:{"^":"a:2;a",
$0:function(){var z=this.a.gcz().f
return"- situation: "+J.iG(z.length!==0?C.a.gD(z):null).j(0)}},j5:{"^":"a:2;a,b,c",
$0:function(){return"- order ("+this.c.ge3()+") higher than maximum ("+this.b+"), or consequences ("+this.a.a+") higher than maximum"}},j6:{"^":"a:2;a",
$0:function(){var z=this.a.gcz().d
return"- how we got here: "+new H.aj(z,new G.iT(),[H.k(z,0),null]).cq(0," <- ")}},iT:{"^":"a:0;",
$1:function(a){return a.gbc()}},j7:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a.b
return z==null?y==null:z===y}},j8:{"^":"a:2;",
$0:function(){return}},iX:{"^":"a:2;a",
$0:function(){return"- "+this.a.j(0)}},iY:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a.b
return z==null?y==null:z===y}},iZ:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a.b
return z==null?y==null:z===y}},j_:{"^":"a:2;a,b",
$0:function(){return"- mainActor's score == "+this.b.j(0)+" (initial="+this.a.j(0)+")"}},j0:{"^":"a:2;a",
$0:function(){var z=this.a.gcz().d
return"- how we got here: "+new H.aj(z,new G.iS(),[H.k(z,0),null]).cq(0," <- ")}},iS:{"^":"a:0;",
$1:function(a){return a.gbc()}}}],["","",,Z,{"^":"",mL:{"^":"d;a,b",
ga_:function(a){return this.b.length===0},
fj:function(a,b){var z=this
return P.aO(function(){var y=a,x=b
var w=0,v=2,u,t,s,r,q,p,o,n,m,l
return function $async$fj(c,d){if(c===1){u=d
w=v}while(true)switch(w){case 0:t=z.b
w=t.length<=y?3:4
break
case 3:w=5
return P.bO(t)
case 5:w=1
break
case 4:s=z.hv(new Z.mO())
r=z.dz(new Z.mP(),[s])
q=z.dz(new Z.mQ(),[s,r])
w=s!=null?6:8
break
case 6:$.$get$bE().T(C.q,"best self preserving: "+s.j(0),null,null)
w=9
return s
case 9:p=1
w=7
break
case 8:p=0
case 7:w=r!=null&&p<y?10:11
break
case 10:$.$get$bE().T(C.q,"best enemy damaging: "+J.f(r),null,null)
w=12
return r
case 12:++p
case 11:w=q!=null&&p<y?13:14
break
case 13:$.$get$bE().T(C.q,"best team preserving: "+J.f(q),null,null)
w=15
return q
case 15:++p
case 14:if(p===y){w=1
break}C.a.bL(t,new Z.mR(z,x))
o=t.length,n=0
case 16:if(!(n<t.length)){w=18
break}m=t[n]
l=J.p(m)
if(l.R(m,s)){w=17
break}if(l.R(m,r)){w=17
break}if(l.R(m,q)){w=17
break}w=19
return m
case 19:++p
if(p===y){w=18
break}case 17:t.length===o||(0,H.au)(t),++n
w=16
break
case 18:case 1:return P.aM()
case 2:return P.aN(u)}}})},
iZ:function(a){var z,y,x,w,v,u,t,s
z={}
y=this.b
if(y.length===1)return C.a.gbK(y)
C.a.bL(y,new Z.mS(this,a))
x=this.a.a
w=x.gc_().b6(0,1/0,new Z.mT(a))
v=x.gc_().b6(0,-1/0,new Z.mU(a))
u=w-(v-w)*0.1
z.a=u
if(w===v){--u
z.a=u
x=u}else x=u
t=P.mc(y.length,new Z.mV(z,this,a,v-x),!1,P.K)
s=new H.aj(t,new Z.mW(C.a.b6(t,0,Z.uH())),[H.k(t,0),null]).br(0,!1)
x=C.a.b6(s,0,Z.uI())
z=s.length-1
s[z]=J.iz(s[z],1000-x)
return y[S.n7(s,1000)]},
dz:function(a,b){var z,y,x,w,v,u,t
for(z=this.b,y=z.length,x=this.a.a,w=null,v=null,u=0;u<z.length;z.length===y||(0,H.au)(z),++u){t=z[u]
if(C.a.ad(b,t))continue
if(w==null||J.ao(a.$1(x.h(0,t)),v)){v=a.$1(x.h(0,t))
w=t
continue}}return w},
hv:function(a){return this.dz(a,C.h)},
A:{
mM:function(a){var z,y,x
z=a.gbU()
y=H.z(z,"y",0)
x=P.N(new H.I(z,new Z.mN(a),[y]),!1,y)
if(x.length===0)$.$get$bE().T(C.D,"After removing actions scored by undefined, there are no recommendations.",null,null)
return x},
wV:[function(a,b){return a+b},"$2","uH",4,0,43],
wW:[function(a,b){return a+b},"$2","uI",4,0,44]}},mO:{"^":"a:0;",
$1:function(a){return a.gel()}},mP:{"^":"a:0;",
$1:function(a){return-a.gdU()}},mQ:{"^":"a:0;",
$1:function(a){return a.gfz()}},mR:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bw(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},mS:{"^":"a:6;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.a.a
return-J.bw(z.$1(y.h(0,a)),z.$1(y.h(0,b)))}},mT:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.min(H.d2(a),H.d2(z))}},mU:{"^":"a:6;a",
$2:function(a,b){var z=this.a.$1(b)
return Math.max(H.d2(a),H.d2(z))}},mV:{"^":"a:9;a,b,c,d",
$1:function(a){var z=this.b
return J.cr(J.iC(this.c.$1(z.a.a.h(0,z.b[a])),this.a.a),this.d)}},mW:{"^":"a:0;a",
$1:function(a){return J.iK(J.iB(J.cr(a,this.a),1000))}},mN:{"^":"a:0;a",
$1:function(a){return!this.a.h(0,a).giL()}}}],["","",,K,{"^":"",rk:{"^":"a:3;",
$3:function(a,b,c){}},cc:{"^":"d;a,m:b<,c,d,e,f,bI:r<",
gB:function(a){return C.c.gB(this.b)},
R:function(a,b){if(b==null)return!1
return b instanceof K.cc&&b.b===this.b},
j:function(a){return"Room<"+this.b+">"},
A:{
W:function(a,b,c,d,e,f,g){var z=new S.M(null,null,[Q.o])
z.ab()
z.i(f)
return new K.cc(z.n(),a,b,c,d,e,g)}}}}],["","",,Q,{"^":"",o:{"^":"d;a,W:b<,bc:c<,d"}}],["","",,S,{"^":"",ab:{"^":"d;",
gat:function(){return C.h},
gbt:function(){return C.h},
gd1:function(){return 3},
ff:function(a,b){},
fg:function(a,b){},
cs:function(a){},
cE:function(a){return!0}}}],["","",,S,{"^":"",
fx:function(a){return a[$.$get$bG().ak(3)]},
n6:function(a,b){var z,y,x,w
z=$.$get$bG().iV()*b
for(y=new H.dx(a,a.gq(a),0,null,[H.z(a,"b4",0)]),x=0,w=0;y.v();){x+=y.d
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
n7:function(a,b){var z,y,x,w,v,u
z=$.$get$bG().ak(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.au)(a),++v){x+=a[v]
if(x>=z)return w;++w}throw H.c(P.F("The weights do not add up to total="+b))},
bH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.iH(a,"{")
if(z!==-1&&z<a.length-1){y=H.n([],[P.t])
y.push(z)
w=z+1
v=a.length
u=null
t=1
while(!0){if(!(w<v)){x=null
break}s=a[w]
if(s==="{")++t
else if(s==="|"&&t===1)y.push(w)
else if(s==="}"){--t
if(t===0){y.push(w)
x=w
u=x
break}}r=w+1
u=w
w=r}q=y.length-1
if(q>1){p=$.$get$bG().ak(q)
o=C.c.av(a,0,z)+H.b(S.bH(C.c.av(a,y[p]+1,y[p+1])))+C.c.av(a,x+1,v)
o=o.charCodeAt(0)==0?o:o
if(u===v-1)return o
else return S.bH(o)}else if(u===v-1)return a
else{v=u+1
return C.c.av(a,0,v)+H.b(S.bH(C.c.be(a,v)))}}else return a},
a5:function(a,b,c,d){var z=c!=null?3:2
switch($.$get$bG().ak(z)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",ag:{"^":"d;bb:a<,aN:b<,aX:c<,iX:d<,e,cU:f@,fl:r<,fe:x<,ep:y<,it:z<,h_:Q<,cw:ch<,cx,cy,U:db<",
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
default:throw H.c(P.F("Invalid key "+b+"."))}},
j:function(a){var z=this.a
z="Report<"+C.c.av(z,0,Math.min(z.length,20))+"...,thread="+H.b(this.cx)
return z+(this.cy?"(sup)":"")+">"}},a1:{"^":"d;a,U:b<,c",
gdX:function(){return C.a.b5(this.a,new Y.or())},
aC:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z,y
if(b==null||b==="")return
z=(J.bt(b).dT(b,".")||C.c.dT(b,"!")||C.c.dT(b,"?"))&&C.c.cF(b,P.bg("[A-Z]",!0,!1))?!0:p
y=this.b
this.a.push(new Y.ag(b,m,h,j,i,d,k,g,!1,e,l,z,c,f,y))},
u:function(a,b){return this.aC(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
l:function(a,b,c){return this.aC(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,c)},
bu:function(a,b,c,d){return this.aC(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
dJ:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return this.aC(a,b,c,d,e,f,g,h,i,j,k,!1,l,m,null,n)},
eV:function(a,b,c){return this.aC(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,!1,null,!1)},
dL:function(a,b,c,d,e){return this.aC(a,b,null,!1,!1,!1,c,null,null,null,!1,d,e,!1,null,!1)},
dK:function(a,b,c,d){return this.aC(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,!1)},
bu:function(a,b,c,d){return this.aC(a,b,null,!1,!1,!1,!1,null,null,c,!1,!1,d,!1,null,!1)},
eW:function(a,b,c,d,e,f){return this.aC(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,f,!1,null,!1)},
hZ:function(a,b,c,d,e,f){return this.aC(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,f,!1,null,!1)},
hW:function(a,b,c){return this.aC(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,null,!1,null,!1)},
hX:function(a,b,c,d){return this.aC(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,null,!1,null,!1)},
i_:function(a,b,c,d,e,f){return this.aC(a,b,null,!1,!1,!1,!1,c,null,d,!1,!1,e,!1,null,f)},
hY:function(a,b,c,d,e){return this.aC(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,!1,null,e)},
i3:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t
if(b.length===0)return
z=H.b(new Y.op().$1(a))+" "
for(y=b.length,x=e-1,w=0,v=0,u=0;u<b.length;b.length===y||(0,H.au)(b),++u){t=b[u]
if(w>0){if(w===1&&J.u(t,C.a.gD(b)))z=z+" "+d
else z=w===x?z+(", "+d):z+","
z+=" "}z+=H.b(this.bv(t.gm(),t.gm(),t,null,this.b));++w
if(w>x||t.R(0,C.a.gD(b))){z+="."
this.i_(0,z.charCodeAt(0)==0?z:z,f,g,h,!0);++v
z=H.l(a,"<also>","also")+" "
w=0}}},
i2:function(a,b,c,d){return this.i3(a,b,c,"and",3,null,null,d)},
dM:function(){return this.l(0,"\n\n",!0)},
bv:function(a,b,c,d,e){var z,y,x
if(d!=null)z=J.V(a).b_(a,"<owner's> "+H.b(b))!==-1||C.c.b_(a,"<ownerPronoun's> "+H.b(b))!==-1||C.c.b_(a,"<object-owner's> "+H.b(b))!==-1||C.c.b_(a,"<object-ownerPronoun's> "+H.b(b))!==-1
else z=!1
if(z)return a
if(J.V(a).b_(a,"<subject's> "+H.b(b))!==-1||C.c.b_(a,"<subjectPronoun's> "+H.b(b))!==-1)return a
if(!c.gaG()){z=this.c
y=z.h(0,c.gp())
if((y==null?-1:y)<e){z="the "+H.b(b)
x=H.b_(a,b,z,0)}else{if(J.eB(c.gm(),P.bg("[aeiouy]",!1,!1))){y="an "+H.b(b)
x=H.b_(a,b,y,0)}else{y="a "+H.b(b)
x=H.b_(a,b,y,0)}z.t(0,c.gp(),e)}}else x=null
return x==null?a:x},
dV:function(a,b){var z,y,x
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(z[a].gaN()==null||z[b].gaN()==null)return!1
if(z[a].gaX()==null||z[b].gaX()==null)return!1
y=z[a].gaN().gp()
x=z[b].gaX().gp()
if(y==null?x==null:y===x){y=z[a].gaX().gp()
z=z[b].gaN().gp()
z=y==null?z==null:y===z}else z=!1
return z},
de:function(a){var z=this
return P.aO(function(){var y=a
var x=0,w=2,v,u,t
return function $async$de(b,c){if(b===1){v=c
x=w}while(true)switch(x){case 0:if(!z.aE(y)){x=1
break}u=z.a[y]
x=u.gaN()!=null?3:4
break
case 3:x=5
return u.gaN()
case 5:case 4:x=u.gaX()!=null?6:7
break
case 6:x=8
return u.gaX()
case 8:case 7:x=u.giX()!=null?9:10
break
case 9:x=11
return u.d
case 11:case 10:t=u.e
x=t!=null?12:13
break
case 12:x=14
return t
case 14:case 13:case 1:return P.aM()
case 2:return P.aN(v)}}})},
cr:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gaX()},"$1","gaX",2,0,18],
iW:function(a,b){if(!this.aE(a)||!this.aE(b))return!1
if(this.dV(a,b))this.a[a].gep()
return!1},
fh:function(a){var z
for(z=!1;this.gdX();z=!0){a.$1(this.fm(!0))
this.j4()}return z},
fm:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.a
y=C.a.b6(z,[],new Y.os())
C.a.hK(z,new Y.ot(y),!1)
x=a&&this.gdX()?C.a.b_(z,C.a.cX(z,new Y.ou()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.dV(p,s)
if(!z[s].gcU())n=this.iW(s,p)&&this.fZ(s,p)
else n=!0
t=n&&!z[p].gcU()
z[s].scU(t)
n=s-w
if(n<3)if(!u){if(!z[s].gh_())if(!z[p].git())if(!z[s].gcw())if(this.cQ(s,p)||o)if(!(t&&n>1))n=t&&z[p].gcU()||this.jj(s)>4
else n=!0
else n=!0
else n=!0
else n=!0
else n=!0
v=n}else v=!0
else v=!0
if(v){if(z[p].gcw()){r+=" "
p=r}else{r+=". "
p=r}r=t&&!z[s].gcw()?r+"But ":p
u=!1}else if(t){r+=S.fx([" but "," but ",", but "])
u=!this.fN(s,s+1)&&!0}else{r+=S.fx([" and "," and ",", and "])
u=!0}}m=this.dk(s)
l=S.bH(m)
if(J.bW(l,"{")||C.c.ad(l,"}"))$.$get$i9().T(C.C,'Storyline result includes { and/or } even after being parsed by Randomly. Is there a dangling bracket here? Input = """'+H.b(m)+'""" Output = """'+l+'"""',null,null)
p=!v
if(p){n=s-1
n=this.cQ(s,n)&&J.eB(this.dk(n),"<subject> ")&&C.c.cF(l,"<subject> ")}else n=!1
if(n)l=H.b_(l,"<subject> ","",0)
n=this.dk(s)
if(typeof n!=="string")H.e(H.a3(n))
k=H.l(l,"<action>",n)
n=s-1
j=this.hM(s,n)
if(j)j=!(this.cr(s).gag()===C.p&&this.b3(s).gag()===C.p)
else j=!1
if(j){k=H.l(k,"<object-owner's> <object>","<objectPronounAccusative>")
k=H.l(k,"<object-ownerPronoun's> <object>","<objectPronounAccusative>")
k=H.l(k,"<object>","<objectPronounAccusative>")
k=H.l(k,"<object's>","<objectPronoun's>")}j=this.cQ(s,n)
if(j){k=H.l(k,"<owner's> <subject>","<subjectPronoun>")
k=H.l(k,"<ownerPronoun's> <subject>","<subjectPronoun>")
k=H.l(k,"<subject>","<subjectPronoun>")
k=H.l(k,"<subject's>","<subjectPronoun's>")}if(this.cr(n)!=null)if(this.b3(s)!=null)if(this.b3(n)!=null){j=this.cr(n)
j=j==null?j:j.gp()
i=this.b3(s)
if(J.u(j,i==null?i:i.gp())){j=this.b3(n)
j=j==null?j:j.gag()
i=this.b3(s)
j=!J.u(j,i==null?i:i.gag())}else j=!1}else j=!1
else j=!1
else j=!1
if(j){k=H.l(k,"<owner's> <subject>","<subjectPronoun>")
k=H.l(k,"<ownerPronoun's> <subject>","<subjectPronoun>")
k=H.l(k,"<subject>","<subjectPronoun>")
k=H.l(k,"<subject's>","<subjectPronoun's>")}if(this.b3(n)!=null)if(this.cr(s)!=null){j=this.b3(n)
j=j==null?j:j.gp()
i=this.cr(s)
if(J.u(j,i==null?i:i.gp())){n=this.b3(n)
n=n==null?n:n.gag()
j=this.b3(s)
n=!J.u(n,j==null?j:j.gag())}else n=!1}else n=!1
else n=!1
if(n){k=H.l(k,"<object-owner's> <object>","<objectPronoun>")
k=H.l(k,"<object-ownerPronoun's> <object>","<objectPronoun>")
k=H.l(k,"<object>","<objectPronounAccusative>")
k=H.l(k,"<object's>","<objectPronoun's>")}n=z[s]
h=n.b
g=n.c
f=n.d
e=n.e
j=h!=null
if(j){if(h.gb0()){d=H.l(k,"<subject>","<subjectPronoun>")
d=H.l(d,"<subject's>","<subjectPronoun's>")}else d=k
if(h.gag()===C.I||h.gag()===C.H){d=H.l(d,"<s>","")
d=H.l(d,"<es>","")
d=H.l(d,"<sses>","ss")
d=H.l(d,"<ies>","y")
d=H.l(d,"<does>","do")
d=H.l(d,"<is>","are")
d=H.l(d,"<has>","have")}else{d=H.l(d,"<s>","s")
d=H.l(d,"<es>","es")
d=H.l(d,"<sses>","sses")
d=H.l(d,"<ies>","ies")
d=H.l(d,"<does>","does")
d=H.l(d,"<is>","is")
d=H.l(d,"<has>","has")}d=H.b_(d,"<subject>","<subjectNoun>",0)
i=h.gag().a
d=H.l(d,"<subject>",i)
i=n.db
d=this.bv(d,"<subjectNoun>",h,f,i)
c=h.gm()
d.toString
if(typeof c!=="string")H.e(H.a3(c))
d.length
d=H.b_(d,"<subjectNoun>",c,0)
c=h.gag().a
d=H.l(d,"<subjectPronoun>",c)
if(C.c.ad(k,P.bg("<subject>.+<subject's>",!0,!1))){c=h.gag().c
d=H.l(d,"<subject's>",c)}d=this.bv(d,"<subject's>",h,f,i)
i=H.b(h.gm())+"'s"
d.length
d=H.b_(d,"<subject's>",i,0)
i=h.gag().c
d=H.l(d,"<subject's>",i)
i=h.gag().b
d=H.l(d,"<subjectPronounAccusative>",i)
i=h.gag().d
d=H.l(d,"<subjectPronounSelf>",i)}else d=k
if(g!=null){if(g.gaG()){d=H.l(d,"<subject's> <object>","<object>")
d=H.l(d,"<subjectPronoun's> <object>","<object>")}if(g.gb0()){d=H.l(d,"<object>","<objectPronoun>")
d=H.l(d,"<object's>","<objectPronoun's>")}else{d=this.bv(d,"<object>",g,e,n.db)
i=g.gm()
d.toString
if(typeof i!=="string")H.e(H.a3(i))
d=H.l(d,"<object>",i)}i=g.gag().b
d=H.l(d,"<objectPronoun>",i)
if(C.c.ad(k,P.bg("<object>.+<object's>",!0,!1))){i=g.gag().c
d=H.l(d,"<object's>",i)}d=this.bv(d,"<object's>",g,e,n.db)
i=H.b(g.gm())+"'s"
d.length
d=H.b_(d,"<object's>",i,0)
i=g.gag().c
d=H.l(d,"<object's>",i)
i=g.gag().c
d=H.l(d,"<objectPronoun's>",i)
i=g.gag().b
d=H.l(d,"<objectPronounAccusative>",i)
i=g.gag().a
d=H.l(d,"<objectPronounNominative>",i)}if(j){j=h.gag().c
d=H.l(d,"<subjectPronoun's>",j)}n=n.db
k=this.eR(e,this.eR(f,d,k,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),k,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n)
r+=(!p||q)&&!t?Y.oq(k):k
if(v)w=s
if(z[s].gcw())u=!0}z=!z[x-1].gcw()?r+".":r
return H.wg(z.charCodeAt(0)==0?z:z,$.$get$fT(),new Y.ov(),null)},
bW:function(){return this.fm(!1)},
j4:function(){var z,y
if(!this.gdX()){C.a.sq(this.a,0)
return}z=this.a
y=C.a.b_(z,C.a.cX(z,new Y.ow()))+1
P.ca(0,y,z.length,null,null,null)
z.splice(0,y-0)},
fN:function(a,b){var z
if(!this.aE(a)||!this.aE(b))return!1
if(this.dV(a,b))this.a[a].gep()
if(!this.cQ(a,b))return!1
z=this.a
if(z[a].gfl()&&z[b].gfl())return!0
if(z[a].gfe()&&z[b].gfe())return!0
else return!1},
fZ:function(a,b){var z,y,x,w,v,u
if(!this.aE(a)||!this.aE(b))return!1
for(z=new P.b8(this.de(a).a(),null,null,null);z.v();){y=z.c
x=y==null?z.b:y.gS()
for(y=new P.b8(this.de(b).a(),null,null,null);y.v();){w=y.c
v=w==null?y.b:w.gS()
w=x.gp()
u=v.gp()
if(w==null?u==null:w===u)return!0}}return!1},
dk:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gbb()},"$1","gbb",2,0,13],
b3:[function(a){if(a<0||a>=this.a.length)return
else return this.a[a].gaN()},"$1","gaN",2,0,18],
jj:function(a){var z,y
z=this.a
if(z[a].gU()!=null){y=a-1
y=!this.aE(y)||z[y].gU()==null}else y=!0
if(y)return 1000
else return z[a].gU()-z[a-1].gU()},
j:function(a){return this.bW()},
aE:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
eR:function(a,b,c,d,e,f,g,h){var z,y
if(a!=null){if(a.cx)z=H.l(H.l(b,d,"you"),e,"your")
else{z=this.bv(b,d,a,null,h)
y=a.dx
z.toString
H.cl(y)
z=H.l(z,d,y)}y=a.fx
z=H.l(z,f,y.a)
z=J.iJ(this.bv(C.c.ad(c,P.bg(d+".+"+e,!0,!1))?H.l(z,e,y.c):z,e,a,null,h),e,H.b(a.dx)+"'s")
y=y.c
z=H.l(H.l(z,e,y),g,y)}else z=H.l(H.l(H.l(H.l(b,d,""),e,""),f,""),g,"")
return z},
hM:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(z[a].gaX()==null||z[b].gaX()==null)return!1
y=z[a].gaX().gp()
z=z[b].gaX().gp()
return y==null?z==null:y===z},
cQ:function(a,b){var z,y
if(!this.aE(a)||!this.aE(b))return!1
z=this.a
if(z[a].gaN()==null||z[b].gaN()==null)return!1
y=z[a].gaN().gp()
z=z[b].gaN().gp()
return y==null?z==null:y===z},
A:{
oq:function(a){var z,y,x
z=!C.c.ad(a,"\n\n")?C.c.jn(a):a
y=z.length
if(y===0)return z
x=z[0].toUpperCase()
if(y===1)return x
else return x+C.c.be(z,1)}}},or:{"^":"a:0;",
$1:function(a){return J.u(a.gbb(),"\n\n")}},op:{"^":"a:19;",
$1:function(a){return C.c.dc(H.l(H.l(a,"<also> ",""),"  "," "))}},os:{"^":"a:39;",
$2:function(a,b){var z,y,x,w
z=J.V(a)
y=z.gdZ(a)?z.gD(a):null
if(y!=null)if(y.cy){x=b.cx
w=y.cx
w=x==null?w==null:x===w
x=w}else x=!1
else x=!1
if(x)z.t(a,z.gq(a)-1,b)
else z.u(a,b)
return a}},ot:{"^":"a:48;a",
$1:function(a){return J.bW(this.a,a)}},ou:{"^":"a:0;",
$1:function(a){return J.u(a.gbb(),"\n\n")}},ov:{"^":"a:52;",
$1:function(a){return H.b(a.h(0,1))+H.b(a.h(0,2))+H.b(a.h(0,3))}},ow:{"^":"a:0;",
$1:function(a){return J.u(a.gbb(),"\n\n")}},aw:{"^":"mp;aG:a<,m:b<,c,bq:d<,b0:e<,ag:f<",
gp:function(){return H.ay(this)},
gbT:function(){return!0},
gal:function(){return!0},
A:{
c_:function(a,b,c,d,e){var z=H.n([],[P.m])
return new Y.aw(c,b,z,e==null?$.$get$aE():e,!1,d)}}},mp:{"^":"d+dj;"},dj:{"^":"d;",
gbl:function(){return this.gal()&&this.gbT()},
a5:function(a,b,c,d,e,f,g,h,i,j,k,l,m){a.dJ(0,b,c,d,e,f,g,h,i,j,k,H.A(this,"$isaw"),!1,m)},
aY:function(a,b,c){return this.a5(a,b,null,!1,!1,!1,!1,null,null,null,c,!1,!1)},
ao:function(a,b,c){return this.a5(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c)},
a1:function(a,b){return this.a5(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
aa:function(a,b,c){return this.a5(a,b,null,c,!1,!1,!1,null,null,null,!1,!1,!1)},
d5:function(a,b,c,d){return this.a5(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d)},
jb:function(a,b,c,d,e){return this.a5(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,e)},
a6:function(a,b,c){return this.a5(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,!1)},
d7:function(a,b,c,d,e,f){return this.a5(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
d7:function(a,b,c,d,e,f){return this.a5(a,b,null,!1,!1,!1,!1,c,d,e,f,!1,!1)},
ar:function(a,b,c){return this.a5(a,b,null,!1,!1,!1,c,null,null,null,!1,!1,!1)},
bD:function(a,b,c,d){return this.a5(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
ja:function(a,b,c,d,e){return this.a5(a,b,null,c,!1,!1,!1,d,null,null,e,!1,!1)},
e7:function(a,b,c,d){return this.a5(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
e7:function(a,b,c,d){return this.a5(a,b,null,c,!1,!1,!1,null,null,null,d,!1,!1)},
bo:function(a,b,c,d){return this.a5(a,b,null,c,!1,!1,!1,d,null,null,!1,!1,!1)},
bp:function(a,b,c,d,e){return this.a5(a,b,c,!1,!1,!1,!1,d,null,null,e,!1,!1)},
e6:function(a,b,c,d){return this.a5(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
b1:function(a,b,c,d){return this.a5(a,b,null,!1,!1,!1,!1,c,null,null,d,!1,!1)},
bD:function(a,b,c,d){return this.a5(a,b,null,!1,c,!1,d,null,null,null,!1,!1,!1)},
d6:function(a,b,c,d,e){return this.a5(a,b,c,!1,!1,d,!1,e,null,null,!1,!1,!1)},
fq:function(a,b,c,d){return this.a5(a,b,null,!1,!1,!1,c,d,null,null,!1,!1,!1)},
fp:function(a,b,c,d){return this.a5(a,b,c,!1,!1,d,!1,null,null,null,!1,!1,!1)},
jd:function(a,b,c,d,e,f){return this.a5(a,b,c,d,!1,e,!1,f,null,null,!1,!1,!1)},
bE:function(a,b,c,d,e){return this.a5(a,b,c,d,!1,e,!1,null,null,null,!1,!1,!1)},
fo:function(a,b,c){return this.a5(a,b,c,!1,!1,!1,!1,null,null,null,!1,!1,!1)},
j8:function(a,b,c,d){return this.a5(a,b,c,!1,!1,!1,!1,d,null,null,!1,!1,!1)},
e8:function(a,b,c,d){return this.a5(a,b,null,!1,!1,!1,!1,c,d,null,!1,!1,!1)},
jc:function(a,b,c,d,e){return this.a5(a,b,null,!1,c,!1,!1,d,null,null,e,!1,!1)},
je:function(a,b,c,d,e,f){return this.a5(a,b,null,!1,c,!1,!1,d,e,null,f,!1,!1)},
e6:function(a,b,c,d){return this.a5(a,b,null,c,!1,!1,d,null,null,null,!1,!1,!1)},
j9:function(a,b,c,d){return this.a5(a,b,null,!1,c,!1,!1,null,null,null,d,!1,!1)}},c8:{"^":"d;a,b,c,d",
j:function(a){return this.a}}}],["","",,L,{"^":"",rX:{"^":"a:0;",
$1:function(a){a.gce().b=2
return 2}},rn:{"^":"a:0;",
$1:function(a){a.gce().b=0
return 0}},rW:{"^":"a:0;",
$1:function(a){a.gce().b=1
return 1}},h2:{"^":"d;"},pJ:{"^":"h2;p:a<",
ae:function(a){var z=new L.bk(null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.h2))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gB:function(a){return Y.S(Y.i(0,J.h(this.a)))},
j:function(a){return"Team {id="+J.f(this.a)+",\n}"},
A:{
dY:function(a){var z=new L.bk(null,null)
a.$1(z)
return z.n()}}},bk:{"^":"d;a,b",
gp:function(){return this.gce().b},
gce:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y
z=this.a
if(z==null){y=this.gce().b
z=new L.pJ(y)
if(y==null)H.e(P.j("id"))}this.i(z)
return z}}}],["","",,O,{"^":"",pb:{"^":"d;a"}}],["","",,X,{"^":"",
hJ:function(a,b){return P.aO(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$hJ(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.b2(u,u.length,0,null,[H.k(u,0)])
u=y.a
s=new J.b2(u,u.length,0,null,[H.k(u,0)])
case 2:r=t.v()
q=s.v()
x=r?5:6
break
case 5:x=7
return t.d
case 7:case 6:x=q?8:9
break
case 8:x=10
return s.d
case 10:case 9:case 3:if(r||q){x=2
break}case 4:return P.aM()
case 1:return P.aN(v)}}})}}],["","",,A,{"^":"",a2:{"^":"d;a,b,c,d,e,f,U:r<,x",
gB:function(a){var z,y,x,w,v
z=X.bu(this.a)
y=X.bu(this.d)
x=X.bu(this.f)
w=this.r
v=this.c
v=X.d1(X.aW(X.aW(0,C.i.gB(w)),J.h(v)))
return X.d1(X.aW(X.aW(X.aW(X.aW(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),v&0x1FFFFFFF))},
R:function(a,b){var z
if(b==null)return!1
z=J.p(b)
return!!z.$isa2&&this.gB(this)===z.gB(b)},
bj:function(a){var z,y
z=this.fL(a,!0)
y=z.ga0(z)
if(y.v()){y.gS()
return!0}return!1},
aj:function(a){var z,y
z=this.fK(a)
y=z.ga0(z)
if(y.v()){y.gS()
return!0}return!1},
f3:function(a){var z,y
z=this.cN(a)
if(z==null)throw H.c(new P.v("Tried to elapseSituationTime of situation id="+H.b(a)+" that doesn't exist in situations ("+H.b(this.f)+")."))
y=this.f
y[z]=y[z].am()},
am:function(){++this.r},
cA:function(a,b,c,d,e){var z=this.d
if(a!=null)z=z.cG(0,new A.pg(a))
if(b!=null)z=z.bH(0,new A.ph(b))
if(c!=null)z=z.bH(0,new A.pi(c))
if(e!=null)z=z.bH(0,new A.pj(e))
return d!=null?z.bH(0,new A.pk(d)):z},
fL:function(a,b){return this.cA(a,null,null,null,b)},
fM:function(a,b,c){return this.cA(a,b,null,null,c)},
fK:function(a){return this.cA(a,null,null,null,null)},
w:function(a){return this.a.bd(0,new A.pl(a))},
dg:function(a){return this.e.bd(0,new A.pm(a))},
ej:function(a){var z=this.cN(a)
if(z==null)return
return this.f[z]},
a8:function(a){var z,y
for(z=this.f,y=z.length-1;y>=0;--y)if(z[y].gm()===a)return z[y]
throw H.c(P.F("No situation with name="+a+" found."))},
iA:function(a){var z=this.a.aW(0,new A.pn(a),new A.po())
if(z==null)return!1
return z.gal()},
an:function(){var z,y
z=this.f
y=C.a.gD(z)
y.cs(this)
C.a.Z(z,y)},
aD:function(a){var z,y
z=this.f
while(!0){if(!(z.length!==0&&C.a.gD(z).gm()!==a))break
y=C.a.gD(z)
y.cs(this)
C.a.Z(z,y)}if(z.length===0)throw H.c(P.F("Tried to pop situations until "+a+" but none was found in stack."))},
bC:function(a,b){var z=this.cN(a)
if(z==null)throw H.c(P.F("Situation with id "+H.b(a)+" does not exist in "+H.b(this.f)))
this.f[z]=b},
ed:function(a,b,c,d,e){var z,y,x
z=this.cA(a,b,c,d,e)
y=z.ga0(z)
if(y.v()){x=y.gS()
return this.r-x.gU()}return},
ji:function(a,b,c){return this.ed(null,a,b,c,null)},
bY:function(a,b,c){return this.ed(a,null,b,null,c)},
d8:function(a){return this.ed(a,null,null,null,null)},
j:function(a){var z,y
z=this.a
y=z.hD()
y.au(0,z)
return"World<"+y.j(0)+">"},
V:function(a,b){var z,y,x
z=this.w(a)
z.toString
y=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.i(z)
b.$1(y)
x=y.n()
y=this.a
y.Z(0,z)
y.u(0,x)},
cN:function(a){var z,y,x,w
y=this.f
x=0
while(!0){if(!(x<y.length)){z=null
break}w=y[x].gp()
if(w==null?a==null:w===a){z=x
break}++x}return z},
ha:function(a){this.a.au(0,a.a)
this.d.au(0,a.d)
this.b.au(0,a.b)
this.e.au(0,a.e)
C.a.au(this.f,a.f)
this.r=a.r},
A:{
dW:function(a){var z,y,x,w
z=P.af(null,null,null,R.x)
y=P.b6(null,O.cs)
x=P.af(null,null,null,U.D)
w=P.af(null,null,null,null)
w=new A.a2(z,x,a.c,y,w,[],null,null)
w.ha(a)
return w}}},pg:{"^":"a:0;a",
$1:function(a){return a.gdI()===this.a}},ph:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gct()
y=this.a.y
return z==null?y==null:z===y}},pi:{"^":"a:0;a",
$1:function(a){return a.geq().ad(0,this.a.y)}},pj:{"^":"a:0;a",
$1:function(a){return a.gfG()===this.a}},pk:{"^":"a:0;a",
$1:function(a){return a.gfE()===this.a}},pl:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a
return z==null?y==null:z===y}},pm:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gm()
y=this.a
return z==null?y==null:z===y}},pn:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gp()
y=this.a
return z==null?y==null:z===y}},po:{"^":"a:2;",
$0:function(){return}}}],["","",,A,{"^":"",Q:{"^":"ae;X:b<"},fG:{"^":"Q;c,d,W:e<,M:f<,m:r<,b,a",
gH:function(){return!1},
gN:function(){return!1},
gI:function(){return H.e(new P.v("Not rerollable"))},
O:[function(a,b,c){throw H.c(new P.v("SimpleAction always succeeds"))},"$3","gK",6,0,1],
P:[function(a,b,c){return this.c.$4(a,b,c,this)},"$3","gL",6,0,1],
a4:function(a,b){throw H.c(new P.v("SimpleAction shouldn't have to provide roll reason"))},
G:function(a,b){return 1},
F:function(a,b){var z=this.d
if(z==null)return!0
return z.$3(a,b,this)}}}],["","",,N,{"^":"",jP:{"^":"w;H:c<,X:d<,M:e<,N:f<,I:r<,b,a",
ga3:function(){return"confuse <object>"},
gm:function(){return"Confuse"},
ga7:function(){return"will <subject> confuse <object>?"},
O:[function(a,b,c){var z
a.a1(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.a6(c,"<subject> tr<ies> to {channel|implant} {terror|confusion} into <object's> mind",z)
a.e6(c,"<subject> fail<s>",!0,!0)
return H.b(a.dx)+" fails to confuse "+H.b(z.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z
a.a1(c,"<subject> touch<es> <subject's> temple")
z=this.b
a.b1(c,"<subject> {channel<s>|implant<s>} {terror|confusion} into <object's> mind",z,!0)
z.ar(c,"<subject's> eyes go wide with terror",!0)
b.V(z.y,new N.jQ())
return H.b(a.dx)+" confuses "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){return 0.6},
F:function(a,b){var z
if(a.cx)if(a.fr===C.d){z=b.a
z=new H.I(z,new N.jR(this),[H.k(z,0)])
z=z.gq(z)>=2&&!this.b.ch}else z=!1
else z=!1
return z},
A:{
wv:[function(a){return new N.jP(!0,!0,"Channeling the terror of the Dead Prince into lesser minds is something you've been practicing. It makes the target rabid and disoriented. They might attack their own.",!0,C.e,a,null)},"$1","tj",2,0,4]}},jQ:{"^":"a:0;",
$1:function(a){a.gk().cx=!0
return a}},jR:{"^":"a:0;a",
$1:function(a){var z,y
if(a.gal()){z=a.gbq()
y=this.a.b.go
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}}}],["","",,V,{"^":"",k9:{"^":"w;N:c<,I:d<,H:e<,X:f<,M:r<,b,a",
ga3:function(){return"kick <object's> weapon off"},
gm:function(){return"DisarmKick"},
ga7:function(){return"will <subject> kick the weapon off?"},
O:[function(a,b,c){S.a5(new V.ka(this,a,c),new V.kb(this,a,c),null,null)
return H.b(a.dx)+" fails to kick "+H.b(this.b.dx)+"'s weapon off"},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
S.a5(new V.kc(this,a,c),new V.kd(this,a,c),null,null)
z=b.f
z=z.length!==0?C.a.gD(z):null
y=z.e
x=new U.b3(null,null,null,null,null,null,null,null,null)
x.i(z)
new V.ke(this).$1(x)
b.bC(y,x.n())
z=this.b
b.V(z.y,new V.kf())
return H.b(a.dx)+" kicks "+H.b(z.dx)+"'s weapon off"},"$3","gL",6,0,1],
G:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
return 0.5-z},
F:function(a,b){var z=a.fr
if(z===C.d||z===C.f){z=this.b
z=z.fr===C.b&&!(z.e instanceof K.T)}else z=!1
return z},
A:{
wy:[function(a){return new V.k9(!0,C.e,!0,!0,"When enemies are on the ground, you can try to kick their weapon off to disarm them.",a,null)},"$1","tC",2,0,4]}},ka:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.a6(y,"<subject> kick<s> {at|towards} <object's> weapon",this.a.b)
z.aa(y,"<subject> mi<sses>",!0)}},kb:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.a6(z,"<subject> kick<s> <object's> weapon",y)
y.aa(z,"<subject> hold<s> onto it",!0)}},kc:{"^":"a:2;a,b,c",
$0:function(){var z=this.a.b
this.b.je(this.c,"<subject> kick<s> <object-owner's> <object> off <object-owner's> hand",!0,z.e,z,!0)}},kd:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b1(z,"<subject> kick<s> <object's> {right|} hand",y,!0)
z.bu(0,"<owner's> <subject> fl<ies> away",y,y.e)}},ke:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gac()
y=z.b
if(y==null){y=new S.M(null,null,[U.D])
y.ab()
y.i(C.h)
z.b=y
z=y}else z=y
y=this.a.b.e
if(y==null)H.e(P.F("null element"))
z=z.gcP();(z&&C.a).u(z,y)
return a}},kf:{"^":"a:0;",
$1:function(a){var z=$.$get$d5()
a.gk().f=z
return a}}}],["","",,R,{"^":"",lX:{"^":"w;N:c<,I:d<,H:e<,X:f<,M:r<,b,a",
gm:function(){return"KickToGround"},
ga3:function(){return"kick <object> to the ground"},
ga7:function(){return"will <subject> kick <object> prone?"},
O:[function(a,b,c){S.a5(new R.lY(this,a,c),new R.lZ(this,a,c),null,null)
return H.b(a.dx)+" fails to sweep "+H.b(this.b.dx)+" off feet"},"$3","gK",6,0,1],
P:[function(a,b,c){var z
S.a5(new R.m_(this,a,c),new R.m0(this,a,c,U.bs(b)),null,null)
z=this.b
b.V(z.y,new R.m1())
return H.b(a.dx)+" sweeps "+H.b(z.dx)+" off feet"},"$3","gL",6,0,1],
G:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
return 0.5-z},
F:function(a,b){var z=a.fr
return(z===C.d||z===C.f)&&this.b.fr!==C.b},
A:{
wP:[function(a){return new R.lX(!0,C.e,!0,!0,"Sweeping opponents off their feet doesn't deal much damage but on the ground they will be much easier targets for you and your allies.",a,null)},"$1","uy",2,0,4]}},lY:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.b
y=this.c
z.a6(y,"<subject> kick<s> {at|towards} <object's> feet",this.a.b)
z.aa(y,"<subject> mi<sses>",!0)}},lZ:{"^":"a:2;a,b,c",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.a6(z,"<subject> kick<s> <object's> shin",y)
y.aa(z,"<subject> <does>n't budge",!0)}},m_:{"^":"a:2;a,b,c",
$0:function(){this.b.jc(this.c,"<subject> kick<s> <object> off <object's> feet and to the ground",!0,this.a.b,!0)}},m0:{"^":"a:2;a,b,c,d",
$0:function(){var z,y
z=this.c
y=this.a.b
this.b.b1(z,"<subject> kick<s> <object's> {right|left} shin",y,!0)
y.a1(z,"<subject> {grunt|shriek}<s>")
y.ar(z,"<subject> fall<s> to the "+H.b(this.d),!0)}},m1:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,F,{"^":"",mK:{"^":"ae;M:b<,H:c<,X:d<,N:e<,I:f<,a",
gW:function(){return"Stand off."},
gm:function(){return"Pass"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){if(a.cx)a.a1(c,"<subject> stand<s> off")
return H.b(a.dx)+" passes the opportunity"},"$3","gL",6,0,1],
a4:function(a,b){return"WARNING this shouldn't be user-visible"},
G:function(a,b){return 1},
F:function(a,b){return!0}}}],["","",,Y,{"^":"",mY:{"^":"w;N:c<,I:d<,H:e<,X:f<,M:r<,b,a",
ga3:function(){return"force <object> off balance"},
gm:function(){return"Pound"},
ga7:function(){return"will <subject> force <object> off balance?"},
O:[function(a,b,c){var z=this.b
a.e8(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.e,z)
z.aY(c,"<subject> {retain<s>|keep<s>} <subject's> {|combat} {stance|footing}",!0)
return H.b(a.dx)+" kicks "+H.b(z.dx)+" off balance"},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y
z=this.b
a.e8(c,"<subject> {fiercely|violently} {strike<s>|hammer<s>|batter<s>} on <object-owner's> {<object>|weapon}",z.e,z)
y=z.fr
if(y===C.d){z.fq(c,"<subject> lose<s> <object>",!0,$.$get$eg())
b.V(z.y,new Y.mZ())
C.a.u(b.f,U.mq(z,a))
return H.b(a.dx)+" pounds "+H.b(z.dx)+" off balance"}else if(y===C.f){z.a1(c,"<subject> <is> already off balance")
c.dK(0,"<subject> make<s> <object> fall to the "+H.b(U.bs(b)),z,$.$get$id())
b.V(z.y,new Y.n_())
return H.b(a.dx)+" pounds "+H.b(z.dx)+" to the ground"}throw H.c(new P.v("enemy pose must be either standing or off-balance"))},"$3","gL",6,0,1],
G:function(a,b){var z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
return 0.5-z},
F:function(a,b){var z,y
if(a.fr!==C.b)if(a.e.gaf()>0||!1){z=this.b
y=z.e
if(!y.gbR()){y.gdP()
y=!1}else y=!0
z=y&&z.fr!==C.b}else z=!1
else z=!1
return z},
A:{
wX:[function(a){return new Y.mY(!0,C.e,!0,!0,"Forcing enemies off balance often means hitting them heavily several times in a row. The goal is not to deal damage but to force the opponent to lose control of their combat stance. It can also give members of your party an opportunity to strike.",a,null)},"$1","uJ",2,0,4]}},mZ:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return a}},n_:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,B,{"^":"",ne:{"^":"ae;M:b<,H:c<,X:d<,N:e<,I:f<,a",
gW:function(){return"Regain balance."},
gm:function(){return"RegainBalance"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){if(a.cx)a.b1(c,"<subject> regain<s> <object>",$.$get$eg(),!0)
b.V(a.y,new B.nf())
return H.b(a.dx)+" regains balance"},"$3","gL",6,0,1],
a4:function(a,b){return"Will "+a.fx.a+" regain balance?"},
G:function(a,b){return 1},
F:function(a,b){return a.fr===C.f}},nf:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return C.d}}}],["","",,O,{"^":"",nu:{"^":"ae;M:b<,H:c<,X:d<,N:e<,I:f<,a",
gW:function(){return"Scramble."},
gm:function(){return"Scramble"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {scramble|crawl} out of {reach|harm's way}")
return H.b(a.dx)+" scrambles on ground"},"$3","gL",6,0,1],
a4:function(a,b){return"Will "+a.fx.a+" crawl out of harm's way?"},
G:function(a,b){return 1},
F:function(a,b){if(a.fr!==C.b)return!1
if(A.da(a,b))return!0
return!1}}}],["","",,Q,{"^":"",oe:{"^":"ae;M:b<,H:c<,X:d<,N:e<,I:f<,a",
gW:function(){return"Stand up."},
gm:function(){return"StandUp"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){a.a1(c,"<subject> {rise<s>|stand<s> up|get<s> to <subject's> feet|get<s> up|pick<s> <subjectPronounSelf> up}")
S.a5(new Q.of(a,c),new Q.og(a,c),null,null)
b.V(a.y,new Q.oh())
return H.b(a.dx)+" stands up"},"$3","gL",6,0,1],
a4:function(a,b){return"Will "+a.fx.a+" stand up?"},
G:function(a,b){return 1},
F:function(a,b){if(a.fr!==C.b)return!1
if(A.da(a,b))return!1
return!0}},of:{"^":"a:2;a,b",
$0:function(){return this.a.a1(this.b,"<subject> {stagger<s>|sway<s>} back before finding balance")}},og:{"^":"a:2;a,b",
$0:function(){return this.a.a1(this.b,"<subject> stead<ies> <subjectPronounSelf>")}},oh:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return C.d}}}],["","",,T,{"^":"",
xo:[function(a){return new A.a0(T.eq(),null,null,new T.uW(),new T.uX(),new T.uY(),null,!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGround",!1,null,"break <object's> neck",null,a,null)},"$1","w_",2,0,4],
xp:[function(a){return new A.a0(T.eq(),new T.uZ(),T.eq(),new T.v_(),new T.v0(),new T.v1(),new T.v2(),!0,"This move is hard, but when succesful, it's decisive.",!0,!0,"StartBreakNeckOnGroundPlayer",!0,C.e,"break <object's> neck","will <subject> succeed?",a,null)},"$1","w0",2,0,4],
xq:[function(a,b,c,d,e){a.a6(c,"<subject> throw<s> <subjectPronounSelf> {on|upon} <object>",d)
b.V(a.y,new T.v3())},"$5","eq",10,0,8],
uW:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.e instanceof K.T&&c.e instanceof K.T}},
uX:{"^":"a:3;",
$3:function(a,b,c){return Y.eI(a,c)}},
uY:{"^":"a:3;",
$3:function(a,b,c){return S.dF(a,c,C.n)}},
v_:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.e instanceof K.T&&c.e instanceof K.T}},
v0:{"^":"a:3;",
$3:function(a,b,c){return Y.eI(a,c)}},
v1:{"^":"a:3;",
$3:function(a,b,c){return S.dF(a,c,C.o)}},
uZ:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
v2:{"^":"a:3;",
$3:function(a,b,c){return S.dF(a,c,C.t)}},
v3:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,A,{"^":"",a0:{"^":"w;c,d,e,f,r,x,y,z,M:Q<,H:ch<,X:cx<,m:cy<,N:db<,I:dx<,a3:dy<,a7:fr<,b,a",
O:[function(a,b,c){var z,y,x,w
z=this.b
y=this.e
if(this.z){x=this.r.$3(a,b,z)
w=this.y.$3(a,b,z)
y.$5(a,b,c,z,x)
y=b.f
C.a.u(y,x)
C.a.u(y,w)}else y.$5(a,b,c,z,null)
return H.b(a.dx)+" fails to start a "+this.cy+" (defensible situation) at "+H.b(z.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=this.b
y=this.r.$3(a,b,z)
x=this.x.$3(a,b,z)
this.c.$5(a,b,c,z,y)
w=b.f
C.a.u(w,y)
C.a.u(w,x)
return H.b(a.dx)+" starts a "+this.cy+" (defensible situation) at "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){var z=this.d
if(z!=null)return z.$3(a,b,this.b)
return 1},
F:function(a,b){return this.f.$3(a,b,this.b)}}}],["","",,M,{"^":"",
xr:[function(a){return new A.a0(M.er(),null,null,new M.v4(),new M.v5(),new M.v6(),null,!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeap",!1,null,"leap at <object>",null,a,null)},"$1","w1",2,0,4],
xs:[function(a){return new A.a0(M.er(),new M.v7(),M.er(),new M.v8(),new M.v9(),new M.va(),new M.vb(),!0,"Jumping and tackling an opponent is one of the most risky moves but it's a quick way to neutralize someone.",!0,!0,"StartLeapPlayer",!0,C.e,"leap at <object>","will <subject> tackle <objectPronoun>?",a,null)},"$1","w2",2,0,4],
xt:[function(a,b,c,d,e){if(a.fr===C.b){a.fo(c,"<subject> roll<s>",e.gp())
a.fo(c,"<subject> put<s> <subject's> feet under <subjectPronounAccusative>",e.gp())}a.j8(c,"<subject> {leap<s>|jump<s>|spring<s>|launch<es> <subjectPronounSelf>|lunge<s>} at <object>",e.gp(),d)},"$5","er",10,0,8],
v4:{"^":"a:3;",
$3:function(a,b,c){var z,y
if(!a.cx){if(!(a.e instanceof K.T)){z=a.go
y=$.$get$br()
z=z.a
y=y.a
y=z==null?y==null:z===y
z=y}else z=!0
z=z&&c.fr!==C.b&&!A.da(a,b)}else z=!1
return z}},
v5:{"^":"a:3;",
$3:function(a,b,c){return F.f8(a,c)}},
v6:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.n)}},
v8:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.e instanceof K.T&&c.fr!==C.b&&!A.da(a,b)}},
v9:{"^":"a:3;",
$3:function(a,b,c){return F.f8(a,c)}},
va:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.o)}},
v7:{"^":"a:3;",
$3:function(a,b,c){return a.ge_()?0.4:0.2}},
vb:{"^":"a:3;",
$3:function(a,b,c){return V.du(a,c,C.t)}}}],["","",,U,{"^":"",
xu:[function(a){return new A.a0(U.es(),null,null,new U.vc(),new U.vd(),new U.ve(),null,!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunch",!1,null,"punch <object>",null,a,null)},"$1","w3",2,0,4],
xv:[function(a){return new A.a0(U.es(),new U.vf(),U.es(),new U.vg(),new U.vh(),new U.vi(),new U.vj(),!0,"Punching someone hard enough can cause them to lose their footing. And it hurts.",!0,!0,"StartPunchPlayer",!0,C.e,"punch <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w4",2,0,4],
xw:[function(a,b,c,d,e){c.hZ(0,"<subject> {thrust<s>|swing<s>} <subject's> fist at <object>",e.gp(),!0,d,a)},"$5","es",10,0,8],
vc:{"^":"a:3;",
$3:function(a,b,c){var z
if(!a.cx){z=a.fr
z=(z===C.d||z===C.f)&&c.fr!==C.b&&a.e instanceof K.T}else z=!1
return z}},
vd:{"^":"a:3;",
$3:function(a,b,c){return Q.fw(a,c)}},
ve:{"^":"a:3;",
$3:function(a,b,c){return Z.dM(a,c,C.n)}},
vg:{"^":"a:3;",
$3:function(a,b,c){var z
if(a.cx){z=a.fr
z=(z===C.d||z===C.f)&&c.fr!==C.b&&a.e instanceof K.T}else z=!1
return z}},
vh:{"^":"a:3;",
$3:function(a,b,c){return Q.fw(a,c)}},
vi:{"^":"a:3;",
$3:function(a,b,c){return Z.dM(a,c,C.o)}},
vf:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vj:{"^":"a:3;",
$3:function(a,b,c){return Z.dM(a,c,C.t)}}}],["","",,G,{"^":"",
xx:[function(a){return new A.a0(G.et(),null,null,new G.vm(),new G.vn(),new G.vo(),null,!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlash",!1,null,"swing at <object>",null,a,null)},"$1","w5",2,0,4],
xC:[function(a){return new A.a0(G.et(),new G.vx(),G.et(),new G.vy(),new G.vz(),new G.vA(),new G.vB(),!0,"The basic swordfighting move is also often the most effective.",!0,!0,"StartSlashPlayer",!0,C.e,"swing at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","w6",2,0,4],
xD:[function(a,b,c,d,e){return a.d6(c,"<subject> swing<s> {"+U.a8(a)+" |}at <object>",e.gp(),!0,d)},"$5","et",10,0,8],
vm:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e.gaf()>0}},
vn:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
vo:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.n)}},
vy:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e.gaf()>0}},
vz:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
vA:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.o)}},
vx:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gby()!=null?0.2:0)}},
vB:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.t)}}}],["","",,R,{"^":"",
xy:[function(a,b,c,d,e){return a.fq(c,"<subject> completely miss<es> <object> with "+U.a8(a),!0,d)},"$5","ik",10,0,12],
xz:[function(a){return new A.a0(R.il(),new R.vp(),R.ik(),new R.vq(),new R.vr(),new R.vs(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalance",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","w7",2,0,4],
xA:[function(a){return new A.a0(R.il(),new R.vt(),R.ik(),new R.vu(),new R.vv(),new R.vw(),null,!1,"It's always better to fight with your feet firmly on the ground. But sometimes, it's necessary to act quickly.",!0,!0,"StartSlashOutOfBalancePlayer",!1,null,"swing at <object> (while out of balance)",null,a,null)},"$1","w8",2,0,4],
xB:[function(a,b,c,d,e){return a.d6(c,"<subject> swing<s> {"+U.a8(a)+" |}at <object>",e.gp(),!0,d)},"$5","il",10,0,8],
vq:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.f&&c.fr!==C.b&&a.e.gaf()>0}},
vr:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
vs:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.n)}},
vp:{"^":"a:3;",
$3:function(a,b,c){return 0.7}},
vu:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.f&&c.fr!==C.b&&a.e.gaf()>0}},
vv:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
vw:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.o)}},
vt:{"^":"a:3;",
$3:function(a,b,c){return 0.5-(c.gby()!=null?0.2:0)}}}],["","",,D,{"^":"",
xE:[function(a){return new A.a0(D.eu(),null,null,new D.vC(),new D.vD(),new D.vE(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDown",!1,null,"strike down at <object>",null,a,null)},"$1","w9",2,0,4],
xF:[function(a){return new A.a0(D.eu(),new D.vF(),D.eu(),new D.vG(),new D.vH(),new D.vI(),new D.vJ(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartStrikeDownPlayer",!0,C.e,"strike down at <object>","will <subject> hit?",a,null)},"$1","wa",2,0,4],
xG:[function(a,b,c,d,e){return a.a6(c,"<subject> strike<s> down {with "+U.a8(a)+" |}at <object>",d)},"$5","eu",10,0,12],
vC:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e.gaf()>0}},
vD:{"^":"a:3;",
$3:function(a,b,c){return D.cU(a,c)}},
vE:{"^":"a:3;",
$3:function(a,b,c){return V.bC(a,c,C.n)}},
vG:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e.gaf()>0}},
vH:{"^":"a:3;",
$3:function(a,b,c){return D.cU(a,c)}},
vI:{"^":"a:3;",
$3:function(a,b,c){return V.bC(a,c,C.o)}},
vF:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gfa()?0.2:0
y=c.gby()!=null?0.2:0
return 0.7-z-y}},
vJ:{"^":"a:3;",
$3:function(a,b,c){return V.bC(a,c,C.t)}}}],["","",,A,{"^":"",
xH:[function(a){return new A.a0(A.ev(),null,null,new A.vK(),new A.vL(),new A.vM(),null,!0,"The basic move with a spear.",!0,!0,"StartThrustSpear",!1,null,"thrust at <object>",null,a,null)},"$1","wb",2,0,4],
xL:[function(a){return new A.a0(A.ev(),new A.vV(),A.ev(),new A.vW(),new A.vX(),new A.vY(),new A.vZ(),!0,"The basic move with a spear.",!0,!0,"StartThrustSpearPlayer",!0,C.e,"thrust at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","wc",2,0,4],
xM:[function(a,b,c,d,e){return a.d6(c,"<subject> thrust<s> {"+U.a8(a)+" |}at <object>",e.gp(),!0,d)},"$5","ev",10,0,8],
vK:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e instanceof Z.ak}},
vL:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
vM:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.n)}},
vW:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.fr===C.d&&c.fr!==C.b&&a.e instanceof Z.ak}},
vX:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
vY:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.o)}},
vV:{"^":"a:3;",
$3:function(a,b,c){return 0.7-(c.gby()!=null?0.2:0)}},
vZ:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.t)}}}],["","",,O,{"^":"",
xI:[function(a){return new A.a0(O.ew(),null,null,new O.vN(),new O.vO(),new O.vP(),null,!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDown",!1,null,"thrust down at <object>",null,a,null)},"$1","wd",2,0,4],
xJ:[function(a){return new A.a0(O.ew(),new O.vQ(),O.ew(),new O.vR(),new O.vS(),new O.vT(),new O.vU(),!0,"Opponents on the ground are often the most vulnerable.",!0,!0,"StartThrustSpearDownPlayer",!0,C.e,"thrust down at <object>","will <subject> hit?",a,null)},"$1","we",2,0,4],
xK:[function(a,b,c,d,e){return a.a6(c,"<subject> thrust<s> down {with "+U.a8(a)+" |}at <object>",d)},"$5","ew",10,0,12],
vN:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e instanceof Z.ak}},
vO:{"^":"a:3;",
$3:function(a,b,c){return D.cU(a,c)}},
vP:{"^":"a:3;",
$3:function(a,b,c){return V.bC(a,c,C.n)}},
vR:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&c.fr===C.b&&a.fr!==C.b&&a.e instanceof Z.ak}},
vS:{"^":"a:3;",
$3:function(a,b,c){return D.cU(a,c)}},
vT:{"^":"a:3;",
$3:function(a,b,c){return V.bC(a,c,C.o)}},
vQ:{"^":"a:3;",
$3:function(a,b,c){var z,y
z=a.gfa()?0.2:0
y=c.gby()!=null?0.2:0
return 0.7-z-y}},
vU:{"^":"a:3;",
$3:function(a,b,c){return V.bC(a,c,C.t)}}}],["","",,E,{"^":"",oM:{"^":"c2;X:c<,b,a",
ga3:function(){return"pick up <object>"},
gM:function(){return"A shield makes a huge difference in battle."},
gH:function(){return!1},
gm:function(){return"TakeDroppedShield"},
gN:function(){return!1},
gI:function(){return},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
z=b.f
z=z.length!==0?C.a.gD(z):null
y=z.e
x=new U.b3(null,null,null,null,null,null,null,null,null)
x.i(z)
new E.oN(this).$1(x)
b.bC(y,x.n())
b.V(a.y,new E.oO(this))
z=this.b
a.a6(c,"<subject> pick<s> <object> up",z)
return H.b(a.dx)+" picks up "+z.gm()},"$3","gL",6,0,1],
a4:function(a,b){return H.e(new P.X(null))},
G:function(a,b){return 1},
F:function(a,b){if(!(this.b instanceof E.bh))return!1
if(a.d!=null)return!1
return!0},
A:{
x0:[function(a){return new E.oM(!0,a,null)},"$1","wj",2,0,29]}},oN:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gac()
y=z.b
if(y==null){y=new S.M(null,null,[U.D])
y.ab()
y.i(C.h)
z.b=y
z=y}else z=y
z=z.gcP();(z&&C.a).Z(z,this.a.b)
return a}},oO:{"^":"a:0;a",
$1:function(a){var z=H.A(this.a.b,"$isbh")
a.gk().e=z}}}],["","",,M,{"^":"",oP:{"^":"c2;X:c<,b,a",
ga3:function(){return"pick up <object>"},
gM:function(){return"A different weapon might change the battle."},
gH:function(){return!1},
gm:function(){return"TakeDroppedWeapon"},
gN:function(){return!1},
gI:function(){return},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
z=b.f
z=z.length!==0?C.a.gD(z):null
y=z.e
x=new U.b3(null,null,null,null,null,null,null,null,null)
x.i(z)
new M.oQ(this).$1(x)
b.bC(y,x.n())
b.V(a.y,new M.oR(this,a))
z=this.b
a.a6(c,"<subject> pick<s> <object> up",z)
return H.b(a.dx)+" picks up "+z.gm()},"$3","gL",6,0,1],
a4:function(a,b){return H.e(new P.X(null))},
G:function(a,b){return 1},
F:function(a,b){var z,y,x,w,v
z=this.b
y=J.p(z)
if(!y.$isaL)return!1
if(!!y.$isak)return!1
x=a.e
w=x instanceof Z.ak&&!!y.$isaz
if(z.gai()<=x.gai()&&!w)return!1
v=b.bY("DisarmKick",a,!0)
if(v!=null&&v<=2)return!1
return!0},
A:{
x1:[function(a){return new M.oP(!0,a,null)},"$1","wk",2,0,29]}},oQ:{"^":"a:14;a",
$1:function(a){var z,y
z=a.gac()
y=z.b
if(y==null){y=new S.M(null,null,[U.D])
y.ab()
y.i(C.h)
z.b=y
z=y}else z=y
z=z.gcP();(z&&C.a).Z(z,this.a.b)
return a}},oR:{"^":"a:0;a,b",
$1:function(a){var z,y
if(!(this.b.e instanceof K.T)){z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
y=a.gk().f
if(y==null)H.e(P.F("null element"))
z.gaZ().u(0,y)}z=H.A(this.a.b,"$isaL")
a.gk().f=z}}}],["","",,D,{"^":"",oY:{"^":"w;H:c<,X:d<,M:e<,N:f<,I:r<,b,a",
ga3:function(){return"throw spear at <object>"},
gm:function(){return"ThrowSpear"},
ga7:function(){return"will <subject> hit <object>?"},
O:[function(a,b,c){var z,y,x
z=this.eE(a)
y=this.b
x="<subject's> "+z.b
a.a6(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+x+" at <object>",y)
x=y.d
if(x!=null)y.ja(c,"<subject> deflects it with <subject's> <object>",!0,x,!0)
else y.e7(c,"<subject> {dodge<s> it|move<s> out of the way}",!0,!0)
z.a1(c,"<subject> {drive<s>|plunge<s>|ram<s>|thrust<s>} into the "+H.b(U.bs(b))+"{| nearby| not far from here}")
this.eJ(b,a,z)
return H.b(a.dx)+" fails to hit "+H.b(y.dx)+" with spear"},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w,v,u,t
z=this.eE(a)
y=this.b
x="<subject's> "+z.b
a.a6(c,"<subject> {throw<s>|hurl<s>|cast<s>} "+x+" at <object>",y)
x=y.d
if(x!=null)z.d7(c,"<subject> fl<ies> past <object-owner's> <object>",x,y,a,!0)
x=y.y
b.V(x,new D.p1(z))
w=b.w(x)
v=!(w.x>0)&&w.y!==100
x=[P.m]
if(!v){u=S.bH("{shoulder|{left|right} arm|{left|right} thigh}")
t=a.go
x=H.n([],x)
z.d7(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aw(!1,u,x,t==null?$.$get$aE():t,!1,C.p),w,a,!0)
N.aZ(c,w)}else{u=S.bH("{chest|eye|neck}")
t=a.go
x=H.n([],x)
z.d7(c,"<subject> {pierce<s>|ram<s> into|drill<s> through} <object-owner's> <object>",new Y.aw(!1,u,x,t==null?$.$get$aE():t,!1,C.p),w,a,!0)
N.bb(c,b,w)}this.eJ(b,a,z)
return H.b(a.dx)+" hits "+H.b(y.dx)+" with spear"},"$3","gL",6,0,1],
G:function(a,b){return 0.6-(this.b.d!=null?0.2:0)},
F:function(a,b){var z
if(a.cx)if(a.fr===C.d)z=(C.a.ad(a.e.a,C.v)||a.dR(C.v)>=1)&&J.u(b.a8("FightSituation").gU(),0)
else z=!1
else z=!1
return z},
eE:function(a){var z,y,x
z=a.e
if(z!=null&&!!z.$isak)return z
for(z=a.cy.a,y=new P.ac(z,z.r,null,null,[null]),y.c=z.e;y.v();){x=y.d
if(x instanceof Z.ak)return x}throw H.c(new P.v("No spear found in "+H.b(a)))},
eJ:function(a,b,c){var z,y,x
z=a.a8("FightSituation")
y=b.e
if(y==null?c==null:y===c){x=b.iv()
if(x==null)x=$.$get$d5()
a.V(b.y,new D.oZ(x))}else a.V(b.y,new D.p_(c))
a.bC(z.gp(),z.ae(new D.p0(c)))},
A:{
x3:[function(a){return new D.oY(!0,!0,"The enemy is far enough for you to throw a spear at them and ready your other weapon before they close in.",!0,C.e,a,null)},"$1","wn",2,0,4]}},p1:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.d
a.gk().y=z-y
return a}},oZ:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a
a.gk().f=z
y=a.gk()
x=y.db
if(x==null){x=new L.U(null,null,[U.D])
x.ah()
x.i(C.h)
y.db=x
y=x}else y=x
y.gaZ().Z(0,z)
return a}},p_:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
z.gaZ().Z(0,this.a)
return a}},p0:{"^":"a:0;a",
$1:function(a){a.gbA().u(0,this.a)
return a}}}],["","",,M,{"^":"",p9:{"^":"ae;M:b<,N:c<,I:d<,H:e<,X:f<,a",
gW:function(){return"Regain clarity."},
gm:function(){return"Unconfuse"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){a.a1(c,"<subject> shake<s> <subject's> head violently")
if(a.cx)c.u(0,"the {horrible|terrible} spell seems to recede")
a.j9(c,"<subject's> eyes regain focus and clarity",!0,!0)
b.V(a.y,new M.pa())
return H.b(a.dx)+" regains clarity"},"$3","gL",6,0,1],
a4:function(a,b){return"WARNING this shouldn't be user-visible"},
G:function(a,b){return 1},
F:function(a,b){return a.ch&&b.bY("Confuse",a,!0)>8}},pa:{"^":"a:0;",
$1:function(a){a.gk().cx=!1
return a}}}],["","",,R,{"^":"",l7:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
gm:function(){return"FinishBreakNeck"},
ga3:function(){return""},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
z=this.b
y=z.y
b.V(y,new R.l8())
x=b.w(y)
if(x.y===100){a.b1(c,"<subject> smash<es> <object's> head to the ground",x,!0)
N.aZ(c,x)}else{a.b1(c,"<subject> break<s> <object's> neck",x,!0)
N.bb(c,b,x)}return H.b(a.dx)+" breaks "+H.b(z.dx)+"'s neck on ground"},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return!0},
A:{
wE:[function(a){return new R.l7(null,!0,!0,!0,C.e,a,null)},"$1","tO",2,0,4]}},l8:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,Y,{"^":"",
eI:function(a,b){var z=new Y.df(null,null,null,null,null)
new Y.tc(a,b).$1(z)
return z.n()},
eH:{"^":"ab;",
gat:function(){return[R.tO()]},
gm:function(){return"BreakNeckOnGroundSituation"},
am:function(){var z=new Y.df(null,null,null,null,null)
z.i(this)
new Y.jD().$1(z)
return z.n()},
as:function(a,b){if(a===0)return b.w(this.a)
return},
aL:function(a,b){return new H.I(a,new Y.jE(this),[H.k(a,0)])}},
tc:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaO().c=z
a.gaO().e=0
z=this.a.y
a.gaO().b=z
z=this.b.y
a.gaO().d=z
return a}},
jD:{"^":"a:0;",
$1:function(a){var z=a.gaO().e
a.gaO().e=z+1
return a}},
jE:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gp()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
ps:{"^":"eH;a,p:b<,c,U:d<",
ae:function(a){var z=new Y.df(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Y.eH))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"BreakNeckOnGroundSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
df:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaO().c},
gU:function(){return this.gaO().e},
gaO:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaO().b
x=this.gaO().c
w=this.gaO().d
v=this.gaO().e
z=new Y.ps(y,x,w,v)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("target"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,Z,{"^":"",kQ:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"evade"},
gm:function(){return"EvadeNeckBreaking"},
ga7:function(){return"will <subject> evade?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {dodge it|break free}")
S.a5(new Z.kR(a,c),new Z.kS(this,a,c),null,null)
b.an()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
a.b1(c,"<subject> {dodge<s> it|break<s> free}",z,!0)
b.aD("FightSituation")
return H.b(a.dx)+" evades "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){var z
if(a.cx)return 0.6
z=b.f
return(z.length!==0?C.a.gD(z):null).gaI().aH(0.5)},
F:function(a,b){return!0},
A:{
wD:[function(a){return new Z.kQ("This looks dangerous. Trying to evade this close-quarter move seems prudent.",!1,!1,!0,C.e,a,null)},"$1","tI",2,0,4]}},kR:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {can't|fail<s>}",!0)}},kS:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,S,{"^":"",
dF:function(a,b,c){var z=new S.dE(null,null,null,null,null,null)
new S.tb(a,b,c).$1(z)
return z.n()},
fm:{"^":"bZ;",
gat:function(){return[Z.tI()]},
gm:function(){return"OnGroundWrestleDefenseSituation"},
am:function(){var z=new S.dE(null,null,null,null,null,null)
z.i(this)
new S.mE().$1(z)
return z.n()}},
tb:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaB().c=z
a.gaB().f=0
z=this.a.y
a.gaB().b=z
z=this.b.y
a.gaB().e=z
a.gaB().d=this.c
return a}},
mE:{"^":"a:0;",
$1:function(a){var z=a.gaB().f
a.gaB().f=z+1
return a}},
pC:{"^":"fm;cg:a<,p:b<,bV:c<,bX:d<,U:e<",
ae:function(a){var z=new S.dE(null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.fm))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)))},
j:function(a){return"OnGroundWrestleDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+J.f(this.d)+",\ntime="+J.f(this.e)+",\n}"}},
dE:{"^":"d;a,b,c,d,e,f",
gp:function(){return this.gaB().c},
gU:function(){return this.gaB().f},
gaB:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaB().b
x=this.gaB().c
w=this.gaB().d
v=this.gaB().e
u=this.gaB().f
z=new S.pC(y,x,w,v,u)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("predeterminedResult"))
if(v==null)H.e(P.j("target"))
if(u==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,A,{"^":"",
da:function(a,b){var z,y,x,w
z=b.bY("KickToGround",a,!0)
if(z!=null&&z<=2)return!0
y=b.bY("Pound",a,!0)
if(y!=null&&y<=2)return!0
x=b.bY("FinishPunch",a,!0)
if(x!=null&&x<=2)return!0
w=b.bY("FinishLeap",a,!0)
if(w!=null&&w<=2)return!0
return!1}}],["","",,U,{"^":"",
bV:function(a){var z="<subject's> "+a.d.b
return z},
a8:function(a){var z=a.e
return z.gaG()?z.gm():"<subject's> "+z.gm()}}],["","",,G,{"^":"",
xc:[function(a,b,c,d,e){var z
a.a1(c,"<subject> tr<ies> to swing back")
a.e6(c,"<subject> {go<es> wide|miss<es>}",!0,!0)
z=a.fr
if(z===C.d){b.V(a.y,new G.tm())
a.bD(c,"<subject> lose<s> balance because of that",!0,!0)}else if(z===C.f){b.V(a.y,new G.tn())
a.ar(c,"<subject> lose<s> balance because of that",!0)
a.bD(c,"<subject> fall<s> to the ground",!0,!0)}},"$5","hR",10,0,12],
xd:[function(a){return new A.a0(G.hS(),new G.to(),G.hR(),new G.tp(),new G.tq(),new G.tr(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlash",!1,null,"swing back at <object>",null,a,null)},"$1","tw",2,0,4],
xf:[function(a,b,c,d,e){return a.a6(c,"<subject> swing<s> back",d)},"$5","hS",10,0,8],
xe:[function(a){return new A.a0(G.hS(),new G.ts(),G.hR(),new G.tt(),new G.tu(),new G.tv(),null,!1,"You can deal serious damage when countering because your opponent is often caught off guard. On the other hand, counters require fast reaction and could throw you out of balance.",!0,!0,"CounterSlashPlayer",!0,C.e,"swing back at <object>","will <subject> hit <objectPronoun>?",a,null)},"$1","tx",2,0,4],
tm:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return a}},
tn:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},
tp:{"^":"a:3;",
$3:function(a,b,c){return!a.cx&&a.e.gaf()>0&&a.fr!==C.b}},
tq:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
tr:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.n)}},
to:{"^":"a:3;",
$3:function(a,b,c){return c.ge_()?0.7:0.9}},
tt:{"^":"a:3;",
$3:function(a,b,c){return a.cx&&a.e.gaf()>0&&a.fr!==C.b}},
tu:{"^":"a:3;",
$3:function(a,b,c){return M.b7(a,c)}},
tv:{"^":"a:3;",
$3:function(a,b,c){return L.aJ(a,c,C.o)}},
ts:{"^":"a:3;",
$3:function(a,b,c){return c.ge_()?0.7:0.9}}}],["","",,V,{"^":"",jX:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"tackle <object>"},
gm:function(){return"CounterTackle"},
ga7:function(){return"will <subject> tackle <objectPronoun>?"},
O:[function(a,b,c){var z=this.b
a.a6(c,"<subject> tr<ies> to tackle <object>",z)
S.a5(new V.jY(a,c),new V.jZ(this,c),null,null)
a.a6(c,"<subject> land<s> on the "+H.b(U.bs(b))+" next to <object>",z)
b.V(a.y,new V.k_())
return H.b(a.dx)+" fails to tackle "+H.b(z.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
a.a6(c,"<subject> tackle<s> <object> to the ground",z)
b.V(z.y,new V.k0())
b.V(a.y,new V.k1())
return H.b(a.dx)+" tackles "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){var z=this.b.fr===C.f?0.2:0
if(a.cx)return 0.7+z
return 0.5+z},
F:function(a,b){return a.fr!==C.b&&a.e instanceof K.T},
A:{
ww:[function(a){return new V.jX("When an opponent misses you like that, it's a rare (though still dangerous) opportunity to bring them down.",!0,!0,!0,C.e,a,null)},"$1","ty",2,0,4]}},jY:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> go<es> wide",!0)}},jZ:{"^":"a:2;a,b",
$0:function(){return this.a.b.aa(this.b,"<subject> {evade<s>|sidestep<s>} it",!0)}},k_:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},k0:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},k1:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,S,{"^":"",
bY:function(a,b){var z=new S.di(null,null,null,null,null)
new S.t5(a,b).$1(z)
return z.n()},
eO:{"^":"ab;",
gat:function(){return[G.tw(),G.tx(),V.ty()]},
gbt:function(){return[$.$get$dH()]},
gm:function(){return"CounterAttackSituation"},
am:function(){var z=new S.di(null,null,null,null,null)
z.i(this)
new S.jV().$1(z)
return z.n()},
as:function(a,b){if(a===0)return b.w(this.a)
return},
aL:function(a,b){return new H.I(a,new S.jW(this),[H.k(a,0)])}},
t5:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaP().c=z
a.gaP().e=0
a.gaP().b=this.a.y
z=this.b.y
a.gaP().d=z
return a}},
jV:{"^":"a:0;",
$1:function(a){var z=a.gaP().e
a.gaP().e=z+1
return a}},
jW:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gp()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pt:{"^":"eO;a,p:b<,c,U:d<",
ae:function(a){var z=new S.di(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof S.eO))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"CounterAttackSituation {counterAttacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
di:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaP().c},
gU:function(){return this.gaP().e},
gaP:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaP().b
x=this.gaP().c
w=this.gaP().d
v=this.gaP().e
z=new S.pt(y,x,w,v)
if(y==null)H.e(P.j("counterAttacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("target"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,O,{"^":"",bZ:{"^":"o0;",
gd1:function(){return 1000},
as:function(a,b){if(a===0)return b.w(this.gbX())
return},
aL:function(a,b){return new H.I(a,new O.k4(this),[H.k(a,0)])}},o0:{"^":"ab+n0;"},k4:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.gcg()
if(z==null?x!=null:z!==x){z=a.gp()
y=y.gbX()
y=z==null?y==null:z===y
z=y}else z=!0
return z}}}],["","",,U,{"^":"",
bs:function(a){return a.a8("FightSituation").gbI()},
c1:function(a,b,c,d,e){var z=new U.b3(null,null,null,null,null,null,null,null,null)
new U.ro(a,b,c,d,e).$1(z)
return z.n()},
cE:{"^":"ab;",
gat:function(){return[N.tj(),V.tC(),R.uy(),Y.uJ(),T.w_(),T.w0(),M.w1(),M.w2(),U.w3(),U.w4(),G.w5(),G.w6(),D.w9(),D.wa(),R.w7(),R.w8(),A.wb(),A.wc(),O.wd(),O.we(),E.wj(),M.wk(),D.wn()]},
gbt:function(){return H.n([$.$get$fz(),$.$get$fS(),$.$get$fD(),$.$get$hh()],[Q.ae])},
gd1:function(){return 1000},
gm:function(){return"FightSituation"},
ci:function(a,b){var z=b.a
return(z&&C.a).b5(z,new U.kV(a))},
am:function(){var z=new U.b3(null,null,null,null,null,null,null,null,null)
z.i(this)
new U.kW().$1(z)
return z.n()},
as:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=X.hJ(this.f,this.b)
y=H.bB(z,new U.kX(b),H.z(z,"y",0),null)
x=H.z(y,"y",0)
w=P.N(new H.I(y,new U.kY(),[x]),!1,x)
x=H.k(w,0)
v=P.N(new H.I(w,new U.kZ(),[x]),!1,x)
u=v.length===1?C.a.gbK(v):null
if(a===0)if(u!=null)return u
for(y=w.length,t=0,s=null,r=0;r<w.length;w.length===y||(0,H.au)(w),++r){q=w[r]
x=b.d
p=x.aW(0,new U.l_(q),new U.l0())
o=p==null?p:p.gU()
if(o==null)o=-1
n=b.r-o
if(n<=0)continue
m=x.aW(0,new U.l1(q),new U.l2())
l=m==null?m:m.gU()
if(l==null)l=-1
k=(b.r-l+n)/2
if(q.gb0())k*=1.5
if(k>t){s=q
t=k}}return s},
aL:function(a,b){return new H.I(a,new U.l3(this),[H.k(a,0)])},
fg:function(a,b){var z,y
z=this.x
y=this.c.a
if(y.a9(z))y.h(0,z).$2(a,b)},
cs:function(a){var z,y,x,w,v,u,t,s
z=this.r
if(z!=null&&!this.ci(a,this.b)&&this.ci(a,this.f)){y=a.ej(z)
z=y.b
x=new F.cO(null,null,null,null,null)
x.i(y)
new U.l4().$1(x)
a.bC(z,x.n())
for(z=this.f,x=z.a,x=new J.b2(x,x.length,0,null,[H.k(x,0)]),w=a.a;x.v();){v=x.d
u=a.w(v)
if(u.gal()&&u.Q){t=a.w(v)
t.toString
u=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(t==null)H.e(P.j("other"))
u.a=t
new U.l5().$1(u)
s=u.n()
w.Z(0,t)
w.u(0,s)}}C.a.u(a.f,X.me(z,this.d,this.a,null))}else this.ci(a,this.f)},
cE:function(a){var z=this.f
if(this.ci(a,z))if(this.ci(a,this.b)){z=z.a
z=(z&&C.a).b5(z,new U.l6(a))}else z=!1
else z=!1
return z}},
ro:{"^":"a:0;a,b,c,d,e",
$1:function(a){var z,y
z=$.$get$a7().ak(1073741823)
a.gac().f=z
a.gac().y=0
z=a.gac()
y=z.r
if(y==null){y=new S.M(null,null,[P.t])
y.ab()
y.i(C.h)
z.r=y
z=y}else z=y
z.i(J.eA(this.a,new U.r_()))
z=a.gac()
y=z.c
if(y==null){y=new S.M(null,null,[P.t])
y.ab()
y.i(C.h)
z.c=y
z=y}else z=y
y=this.b
z.i(new H.aj(y,new U.r0(),[H.k(y,0),null]))
a.gac().e=this.c
y=new S.M(null,null,[U.D])
y.ab()
y.i(C.h)
a.gac().b=y
y=this.d.b
a.gac().x=y
y=new A.cJ(null,null,[P.t,{func:1,v:true,args:[A.a2,Y.a1]}])
y.bQ()
y.i(this.e)
a.gac().d=y
return a}},
r_:{"^":"a:0;",
$1:function(a){return a.gp()}},
r0:{"^":"a:0;",
$1:function(a){return a.gp()}},
kV:{"^":"a:0;a",
$1:function(a){var z=this.a.w(a)
return z.gal()&&z.Q}},
kW:{"^":"a:0;",
$1:function(a){var z=a.gac().y
a.gac().y=z+1
return a}},
kX:{"^":"a:0;a",
$1:function(a){return this.a.w(a)}},
kY:{"^":"a:0;",
$1:function(a){return a.gbl()}},
kZ:{"^":"a:0;",
$1:function(a){return a.gb0()}},
l_:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gct()
y=this.a.gp()
return(z==null?y==null:z===y)&&a.gfF()}},
l0:{"^":"a:2;",
$0:function(){return}},
l1:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gct()
y=this.a.gp()
return z==null?y==null:z===y}},
l2:{"^":"a:2;",
$0:function(){return}},
l3:{"^":"a:21;a",
$1:function(a){var z,y,x
if(a.gal()&&a.Q){z=this.a
y=a.y
x=z.f.a
if(!(x&&C.a).ad(x,y)){z=z.b.a
y=(z&&C.a).ad(z,y)
z=y}else z=!0}else z=!1
return z}},
l4:{"^":"a:0;",
$1:function(a){a.gaF().d=!1
return a}},
l5:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}},
l6:{"^":"a:42;a",
$1:function(a){var z=this.a.w(a)
return z.cx&&z.gal()&&z.Q}},
pv:{"^":"cE;bA:a<,b,c,bI:d<,p:e<,f,r,U:x<",
ae:function(a){var z=new U.b3(null,null,null,null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.cE))return!1
if(J.u(this.a,b.a))if(J.u(this.b,b.b))if(J.u(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
if(z==null?y==null:z===y)if(J.u(this.f,b.f)){z=this.r
y=b.r
if(z==null?y==null:z===y){z=this.x
y=b.x
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)),J.h(this.f)),J.h(this.r)),J.h(this.x)))},
j:function(a){return"FightSituation {droppedItems="+J.f(this.a)+",\nenemyTeamIds="+J.f(this.b)+",\nevents="+J.f(this.c)+",\ngroundMaterial="+J.f(this.d)+",\nid="+J.f(this.e)+",\nplayerTeamIds="+J.f(this.f)+",\nroomRoamingSituationId="+J.f(this.r)+",\ntime="+J.f(this.x)+",\n}"}},
b3:{"^":"d;a,b,c,d,e,f,r,x,y",
gbA:function(){var z,y
z=this.gac()
y=z.b
if(y==null){y=new S.M(null,null,[U.D])
y.ab()
y.i(C.h)
z.b=y
z=y}else z=y
return z},
gbI:function(){return this.gac().e},
gp:function(){return this.gac().f},
gU:function(){return this.gac().y},
gac:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.M(null,null,[H.k(z,0)])
y.ab()
y.i(z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new S.M(null,null,[H.k(z,0)])
y.ab()
y.i(z)
z=y}this.c=z
z=this.a.c
if(!(z==null)){y=new A.cJ(null,null,[H.k(z,0),H.k(z,1)])
y.bQ()
y.i(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
z=z.f
if(!(z==null)){y=new S.M(null,null,[H.k(z,0)])
y.ab()
y.i(z)
z=y}this.r=z
z=this.a
this.x=z.r
this.y=z.x
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u,t,s,r
z=this.a
if(z==null){y=this.gac()
x=y.b
if(x==null){x=new S.M(null,null,[U.D])
x.ab()
x.i(C.h)
y.b=x
y=x}else y=x
y=y.n()
x=this.gac()
w=x.c
if(w==null){w=new S.M(null,null,[P.t])
w.ab()
w.i(C.h)
x.c=w
x=w}else x=w
x=x.n()
w=this.gac()
v=w.d
if(v==null){v=new A.cJ(null,null,[P.t,{func:1,v:true,args:[A.a2,Y.a1]}])
v.bQ()
v.i(C.a2)
w.d=v
w=v}else w=v
w=w.n()
v=this.gac().e
u=this.gac().f
t=this.gac()
s=t.r
if(s==null){s=new S.M(null,null,[P.t])
s.ab()
s.i(C.h)
t.r=s
t=s}else t=s
t=t.n()
s=this.gac().x
r=this.gac().y
z=new U.pv(y,x,w,v,u,t,s,r)
if(y==null)H.e(P.j("droppedItems"))
if(x==null)H.e(P.j("enemyTeamIds"))
if(w==null)H.e(P.j("events"))
if(v==null)H.e(P.j("groundMaterial"))
if(u==null)H.e(P.j("id"))
if(t==null)H.e(P.j("playerTeamIds"))
if(s==null)H.e(P.j("roomRoamingSituationId"))
if(r==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,N,{"^":"",
bb:function(a,b,c){var z,y
z=b.a8("FightSituation")
y=z.gbI()
b.bC(z.gp(),z.ae(new N.uz(c)))
if(c.fr===C.b){c.ar(a,"<subject> stop<s> moving",!0)
a.l(0,"\n\n",!0)
return}switch($.$get$hB().ak(3)){case 0:c.bD(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:c.ar(a,"<subject> fall<s> backward",!0)
c.ar(a,"<subject> twist<s>",!0)
c.bD(a,"<subject> hit<s> the "+H.b(y)+" face down",!0,!0)
break
case 2:c.ar(a,"<subject> drop<s> to <subject's> knees",!0)
c.ar(a,"<subject> keel<s> over",!0)
break}a.l(0,"\n\n",!0)},
aZ:function(a,b){if(b.y===100&&b.x===0){N.r7(a,b)
return}b.ar(a,"<subject> {scream|yell|grunt}<s> in pain",!0)},
r7:function(a,b){if(b.fr===C.b){b.ar(a,"<subject> stop<s> moving",!0)
a.l(0,"\n\n",!0)
return}b.ar(a,"<subject> drop<s> to <subject's> knees",!0)
b.ar(a,"<subject> keel<s> over",!0)
a.l(0,"\n\n",!0)},
uz:{"^":"a:0;a",
$1:function(a){var z,y
z=this.a
y=z.e
if(!(y instanceof K.T))a.gbA().u(0,y)
z=z.d
if(z!=null)a.gbA().u(0,z)
return a}}}],["","",,R,{"^":"",l9:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
gm:function(){return"FinishLeap"},
ga3:function(){return""},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w,v
z=this.b
y=z.y
b.V(y,new R.la())
x=b.w(y)
b.V(a.y,new R.lb())
w=b.a8("LeapSituation").gp()
v=U.bs(b)
a.bp(c,"<subject> {ram<s>|smash<es>} into <object>",w,z,!0)
c.hW(0,"both "+(a.cx||z.cx?"of you":"")+" {land on|fall to} the "+H.b(v),w)
if(z.x>1){c.hX(0,"the impact almost {knocks <object> unconscious|knocks <object> out}",w,z)
N.aZ(c,x)
b.V(y,new R.lc())}return H.b(a.dx)+" finishes leap at "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return!0},
A:{
wF:[function(a){return new R.l9(null,!0,!0,!0,C.e,a,null)},"$1","tP",2,0,4]}},la:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},lb:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}},lc:{"^":"a:0;",
$1:function(a){var z=a.gk().y
a.gk().y=z-1
return a}}}],["","",,S,{"^":"",kg:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"dodge"},
gm:function(){return"DodgeLeap"},
ga7:function(){return"will <subject> dodge?"},
O:[function(a,b,c){var z=b.a8("LeapSituation").gp()
a.fp(c,"<subject> tr<ies> to {dodge|sidestep}",z,!0)
if(a.fr===C.f)a.bE(c,"<subject> <is> out of balance",z,!0,!0)
else S.a5(new S.kh(a,c,z),new S.ki(a,c,z),null,null)
b.an()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
z=b.a8("LeapSituation").gp()
y=U.bs(b)
x=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} <object>",z,x,!0)
x.ar(c,"<subject> {crash<es> to|fall<s> to|hit<s>} the "+H.b(y),!0)
b.V(x.y,new S.kj())
b.aD("FightSituation")
return H.b(a.dx)+" dodges "+H.b(x.dx)},"$3","gL",6,0,1],
G:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.b?0.2:0
if(a.cx)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gaI().aH(0.5-z+y)},
F:function(a,b){return a.fr!==C.b},
A:{
wz:[function(a){return new S.kg("Dodging means moving your body out of harm's way. When successful, your opponent will miss and will hit the ground beside you.",!1,!1,!0,C.e,a,null)},"$1","tD",2,0,4]}},kh:{"^":"a:2;a,b,c",
$0:function(){return this.a.bE(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},ki:{"^":"a:2;a,b,c",
$0:function(){return this.a.bE(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},kj:{"^":"a:0;",
$1:function(a){a.gk().fx=C.b
return a}}}],["","",,D,{"^":"",lx:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"impale"},
gm:function(){return"ImpaleLeaper"},
ga7:function(){return"will <subject> impale <objectPronoun>?"},
O:[function(a,b,c){var z,y
z=b.a8("LeapSituation").gp()
y=this.b
a.d6(c,"<subject> tr<ies> to {move|swing|shift} "+U.a8(a)+" between <subjectPronounSelf> and <object>",z,!0,y)
if(a.fr===C.f)a.bE(c,"<subject> <is> out of balance",z,!0,!0)
else S.a5(new D.ly(a,c,z),new D.lz(a,c,z),null,null)
b.an()
return H.b(a.dx)+" fails to impale "+H.b(y.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
z=b.a8("LeapSituation").gp()
y=this.b
a.bp(c,"<subject> {move<s>|swing<s>|shift<s>} "+U.a8(a)+" between <subjectPronounSelf> and <object>",z,y,!0)
y.ar(c,"<subject> {leap<s>|run<s>|lunge<s>} right into it",!0)
z=y.y
b.V(z,new D.lA())
x=b.w(z)
if(!(!(x.x>0)&&x.y!==100)){a.e.a6(c,"<subject> {cut<s> into|pierce<s>|go<es> into} <object's> flesh",x)
x.a1(c,"<subject> fall<s> to the ground")
N.aZ(c,x)}else{a.e.a6(c,"<subject> {go<es> right through|completely impale<s>|bore<s> through} <object's> {body|chest|stomach|neck}",x)
x.ar(c,"<subject> go<es> down",!0)
N.bb(c,b,x)}b.aD("FightSituation")
return H.b(a.dx)+" impales "+H.b(y.dx)},"$3","gL",6,0,1],
G:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.b?0.2:0
if(a.cx)return 0.5-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gaI().aH(0.4-z+y)},
F:function(a,b){return a.fr!==C.b&&a.e.gaJ()>0},
A:{
wL:[function(a){return new D.lx("You can move your weapon to point at the attacker. If successful, the weapon will pierce the attacker with the force of his own leap.",!1,!1,!0,C.e,a,null)},"$1","uq",2,0,4]}},ly:{"^":"a:2;a,b,c",
$0:function(){return this.a.bE(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},lz:{"^":"a:2;a,b,c",
$0:function(){return this.a.bE(this.b,"<subject> {<is> too slow|<is>n't fast enough}",this.c,!0,!0)}},lA:{"^":"a:0;",
$1:function(a){var z=a.gk().y
a.gk().y=z-1
a.gk().fx=C.b
return a}}}],["","",,V,{"^":"",
du:function(a,b,c){var z=new V.dt(null,null,null,null,null,null)
new V.t9(a,b,c).$1(z)
return z.n()},
f6:{"^":"bZ;",
gat:function(){return[S.tD(),D.uq()]},
gm:function(){return"LeapDefenseSituation"},
am:function(){var z=new V.dt(null,null,null,null,null,null)
z.i(this)
new V.m3().$1(z)
return z.n()}},
t9:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gax().c=z
a.gax().f=0
z=this.a.y
a.gax().b=z
z=this.b.y
a.gax().e=z
a.gax().d=this.c
return a}},
m3:{"^":"a:0;",
$1:function(a){var z=a.gax().f
a.gax().f=z+1
return a}},
px:{"^":"f6;cg:a<,p:b<,bV:c<,bX:d<,U:e<",
ae:function(a){var z=new V.dt(null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.f6))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)))},
j:function(a){return"LeapDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+J.f(this.d)+",\ntime="+J.f(this.e)+",\n}"}},
dt:{"^":"d;a,b,c,d,e,f",
gp:function(){return this.gax().c},
gU:function(){return this.gax().f},
gax:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gax().b
x=this.gax().c
w=this.gax().d
v=this.gax().e
u=this.gax().f
z=new V.px(y,x,w,v,u)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("predeterminedResult"))
if(v==null)H.e(P.j("target"))
if(u==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,F,{"^":"",
f8:function(a,b){var z=new F.dv(null,null,null,null,null)
new F.ta(a,b).$1(z)
return z.n()},
f7:{"^":"ab;",
gat:function(){return[R.tP()]},
gm:function(){return"LeapSituation"},
am:function(){var z=new F.dv(null,null,null,null,null)
z.i(this)
new F.m4().$1(z)
return z.n()},
as:function(a,b){if(a===0)return b.w(this.a)
return},
aL:function(a,b){return new H.I(a,new F.m5(this),[H.k(a,0)])}},
ta:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaQ().c=z
a.gaQ().e=0
z=this.a.y
a.gaQ().b=z
z=this.b.y
a.gaQ().d=z
return a}},
m4:{"^":"a:0;",
$1:function(a){var z=a.gaQ().e
a.gaQ().e=z+1
return a}},
m5:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gp()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
py:{"^":"f7;a,p:b<,c,U:d<",
ae:function(a){var z=new F.dv(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.f7))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"LeapSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dv:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaQ().c},
gU:function(){return this.gaQ().e},
gaQ:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaQ().b
x=this.gaQ().c
w=this.gaQ().d
v=this.gaQ().e
z=new F.py(y,x,w,v)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("target"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,Z,{"^":"",jl:{"^":"ae;H:b<,X:c<,N:d<,I:e<,a",
gW:function(){return""},
gM:function(){return},
gm:function(){return"AutoLoot"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.a8("LootSituation")
y=b.w(100)
if(y.Q&&!(y.x>0)){a.a6(c,"<subject> kneel<s> next to <object>",y)
a.a6(c,"<subject> help<s> <object> to <object's> feet",y)
y.ao(c,'"I\'ll live," <subject> say<s>.',!0)
b.V(100,new Z.jy())}x=[]
for(w=z.gbA(),w=w.ga0(w),v=b.a,u=null,t=null;w.v();){s=w.d
r=a.y
q=b.w(r)
p=q.e
o=p instanceof Z.ak&&s instanceof G.az
n=J.p(s)
if(!!n.$isaL){m=s.gaf()
l=s.gaJ()
k=s.gaG()?1:0
j=p.gaf()
i=p.gaJ()
p=p.gaG()?1:0
p=2+m+l+k>2+j+i+p||o}else p=!1
if(p){h=b.w(r)
h.toString
r=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.j("other"))
r.a=h
new Z.jz(s,q).$1(r)
g=r.n()
v.Z(0,h)
v.u(0,g)
u=s}else if(!!n.$isbh&&q.d==null){h=b.w(r)
h.toString
r=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.j("other"))
r.a=h
new Z.jA(s).$1(r)
g=r.n()
v.Z(0,h)
v.u(0,g)
t=s}else{h=b.w(r)
h.toString
r=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(h==null)H.e(P.j("other"))
r.a=h
new Z.jB(s).$1(r)
g=r.n()
v.Z(0,h)
v.u(0,g)
x.push(s)}}if(u!=null){a.a6(c,"<subject> pick<s> up <object>",u)
a.a6(c,"<subject> wield<s> <object>",u)}if(t!=null){a.a6(c,"<subject> pick<s> up <object>",t)
a.a6(c,"<subject> wield<s> <object>",t)}this.ho(x,a,z,b,c)
this.hn(x,a,z,b,c)
if(x.length!==0)c.i2("<subject> <also> take<s>",x,null,a)
return H.b(a.dx)+" auto-loots"},"$3","gL",6,0,1],
a4:function(a,b){return"WARNING this shouldn't be user-visible"},
G:function(a,b){return 1},
F:function(a,b){return a.cx},
ho:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=P.N(new H.I(a,new Z.js(),[H.k(a,0)]),!0,L.aL)
for(y=b.cy.a,x=new P.ac(y,y.r,null,null,[null]),x.c=y.e;x.v();){w=x.d
if(w instanceof L.aL)C.a.u(z,w)}if(z.length===0)return
C.a.bL(z,new Z.jt())
y=c.c.a
y.toString
v=new H.aj(y,new Z.ju(d),[H.k(y,0),null]).cG(0,new Z.jv())
for(y=J.ah(v.a),x=new H.bM(y,v.b,[H.k(v,0)]),u=d.a;x.v();){t=y.gS()
if(z.length===0)break
s=C.a.fn(z)
r=d.w(t.gp())
r.toString
q=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.j("other"))
q.a=r
new Z.jw(s).$1(q)
p=q.n()
u.Z(0,r)
u.u(0,p)
C.a.Z(a,s)
r=d.w(b.y)
r.toString
q=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.j("other"))
q.a=r
new Z.jx(s).$1(q)
p=q.n()
u.Z(0,r)
u.u(0,p)
e.dJ(0,"<subject> give<s> the "+H.b(s.gm())+" to <object>",null,!1,!1,!1,!1,t,null,null,!1,b,!1,!1)}},
hn:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=P.N(new H.I(a,new Z.jm(),[H.k(a,0)]),!0,E.bh)
for(y=b.cy.a,x=new P.ac(y,y.r,null,null,[null]),x.c=y.e;x.v();){w=x.d
if(w instanceof E.bh)C.a.u(z,w)}if(z.length===0)return
C.a.bL(z,new Z.jn())
y=c.c.a
y.toString
v=new H.aj(y,new Z.jo(d),[H.k(y,0),null]).cG(0,new Z.jp())
for(y=J.ah(v.a),x=new H.bM(y,v.b,[H.k(v,0)]),u=d.a;x.v();){t=y.gS()
if(z.length===0)break
s=C.a.fn(z)
r=d.w(t.gp())
r.toString
q=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.j("other"))
q.a=r
new Z.jq(s).$1(q)
p=q.n()
u.Z(0,r)
u.u(0,p)
C.a.Z(a,s)
r=d.w(b.y)
r.toString
q=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(r==null)H.e(P.j("other"))
q.a=r
new Z.jr(s).$1(q)
p=q.n()
u.Z(0,r)
u.u(0,p)
e.dJ(0,"<subject> give<s> the "+H.b(s.gm())+" to <object>",null,!1,!1,!1,!1,t,null,null,!1,b,!1,!1)}}},jy:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
a.gk().y=1
return a}},jz:{"^":"a:0;a,b",
$1:function(a){var z,y,x
z=this.b.e
if(!(z instanceof K.T)){y=a.gk()
x=y.db
if(x==null){x=new L.U(null,null,[U.D])
x.ah()
x.i(C.h)
y.db=x
y=x}else y=x
if(z==null)H.e(P.F("null element"))
y.gaZ().u(0,z)}a.gk().f=this.a}},jA:{"^":"a:0;a",
$1:function(a){var z=this.a
a.gk().e=z
return z}},jB:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
y=this.a
if(y==null)H.e(P.F("null element"))
z.gaZ().u(0,y)
return a}},js:{"^":"a:0;",
$1:function(a){return a instanceof L.aL}},jt:{"^":"a:6;",
$2:function(a,b){return J.bw(a.gai(),b.gai())}},ju:{"^":"a:0;a",
$1:function(a){return this.a.w(a)}},jv:{"^":"a:0;",
$1:function(a){return a.gbl()&&a.gf8()}},jw:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},jx:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
z.gaZ().Z(0,this.a)
return a}},jm:{"^":"a:0;",
$1:function(a){return a instanceof E.bh}},jn:{"^":"a:6;",
$2:function(a,b){return J.bw(a.gai(),b.gai())}},jo:{"^":"a:0;a",
$1:function(a){return this.a.w(a)}},jp:{"^":"a:0;",
$1:function(a){return a.gbl()&&a.gby()==null}},jq:{"^":"a:0;a",
$1:function(a){a.gk().e=this.a
return a}},jr:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
z.gaZ().Z(0,this.a)
return a}}}],["","",,X,{"^":"",
me:function(a,b,c,d){var z=new X.dz(null,null,null,null,null,null)
new X.rq(a,b,c).$1(z)
return z.n()},
fe:{"^":"ab;",
gbt:function(){return H.n([$.$get$eE()],[Q.ae])},
gm:function(){return"LootSituation"},
am:function(){var z=new X.dz(null,null,null,null,null,null)
z.i(this)
new X.mg().$1(z)
return z.n()},
as:function(a,b){if(a>0)return
return this.eF(b.a)},
aL:function(a,b){return[this.eF(a)]},
cE:function(a){return!0},
eF:function(a){return a.cX(0,new X.mf())}},
rq:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gap().e=z
a.gap().f=0
a.gap().c=this.b
z=new S.M(null,null,[P.t])
z.ab()
z.i(this.a)
a.gap().d=z
z=new S.M(null,null,[U.D])
z.ab()
z.i(this.c)
a.gap().b=z
return a}},
mg:{"^":"a:0;",
$1:function(a){var z=a.gap().f
a.gap().f=z+1
return a}},
mf:{"^":"a:0;",
$1:function(a){return a.gb0()&&a.gbl()}},
pz:{"^":"fe;bA:a<,bI:b<,c,p:d<,U:e<",
ae:function(a){var z=new X.dz(null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof X.fe))return!1
if(J.u(this.a,b.a)){z=this.b
y=b.b
if(z==null?y==null:z===y)if(J.u(this.c,b.c)){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1
else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)))},
j:function(a){return"LootSituation {droppedItems="+J.f(this.a)+",\ngroundMaterial="+J.f(this.b)+",\nplayerTeamIds="+J.f(this.c)+",\nid="+J.f(this.d)+",\ntime="+J.f(this.e)+",\n}"}},
dz:{"^":"d;a,b,c,d,e,f",
gbA:function(){var z,y
z=this.gap()
y=z.b
if(y==null){y=new S.M(null,null,[U.D])
y.ab()
y.i(C.h)
z.b=y
z=y}else z=y
return z},
gbI:function(){return this.gap().c},
gp:function(){return this.gap().e},
gU:function(){return this.gap().f},
gap:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.M(null,null,[H.k(z,0)])
y.ab()
y.i(z)
z=y}this.b=z
z=this.a
this.c=z.b
z=z.c
if(!(z==null)){y=new S.M(null,null,[H.k(z,0)])
y.ab()
y.i(z)
z=y}this.d=z
z=this.a
this.e=z.d
this.f=z.e
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gap()
x=y.b
if(x==null){x=new S.M(null,null,[U.D])
x.ab()
x.i(C.h)
y.b=x
y=x}else y=x
y=y.n()
x=this.gap().c
w=this.gap()
v=w.d
if(v==null){v=new S.M(null,null,[P.t])
v.ab()
v.i(C.h)
w.d=v
w=v}else w=v
w=w.n()
v=this.gap().e
u=this.gap().f
z=new X.pz(y,x,w,v,u)
if(y==null)H.e(P.j("droppedItems"))
if(x==null)H.e(P.j("groundMaterial"))
if(w==null)H.e(P.j("playerTeamIds"))
if(v==null)H.e(P.j("id"))
if(u==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,A,{"^":"",mu:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"stab <object>"},
gm:function(){return"OffBalanceOpportunityThrust"},
ga7:function(){return"will <subject> hit <objectPronoun>?"},
O:[function(a,b,c){var z=this.b
a.a6(c,"<subject> tr<ies> to stab <object>",z)
a.aa(c,"<subject> {go<es> wide|fail<s>|miss<es>}",!0)
return H.b(a.dx)+" fails to stab "+H.b(z.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x
z=this.b
y=z.y
b.V(y,new A.mv(a))
x=b.w(y)
if(!(!(x.x>0)&&x.y!==100)){a.b1(c,"<subject> thrust<s> {|"+U.a8(a)+"} deep into <object's> {shoulder|hip|thigh}",x,!0)
N.aZ(c,x)}else{a.b1(c,"<subject> {stab<s>|run<s> "+U.a8(a)+" through} <object>",x,!0)
N.bb(c,b,x)}return H.b(a.dx)+" stabs "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){if(a.cx)return 0.6
return 0.5},
F:function(a,b){return a.fr===C.d&&this.b.fr===C.f&&a.e.gaJ()>0},
A:{
wQ:[function(a){return new A.mu("When an opponent is out of balance they are the most vulnerable.",!0,!0,!0,C.e,a,null)},"$1","uD",2,0,4]}},mv:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaJ()
a.gk().y=z-y
return a}}}],["","",,U,{"^":"",
mq:function(a,b){var z=new U.dC(null,null,null,null,null)
new U.td(a,b).$1(z)
return z.n()},
fk:{"^":"ab;",
gat:function(){return H.n([A.uD()],[{func:1,ret:Q.w,args:[R.x]}])},
gbt:function(){return[$.$get$dH()]},
gm:function(){return"OffBalanceOpportunitySituation"},
am:function(){var z=new U.dC(null,null,null,null,null)
z.i(this)
new U.mr().$1(z)
return z.n()},
as:function(a,b){var z,y,x,w,v
if(a>0)return
z=b.w(this.a)
y=b.a
x=H.k(y,0)
w=P.N(new H.I(y,new U.ms(this,b,z),[x]),!0,x)
if(w.length===0)return
v=C.a.gdW(w)
if(v.fr===C.d&&z.fr===C.f&&v.e.gaJ()>0)return v
return},
aL:function(a,b){return new H.I(a,new U.mt(b,b.w(this.a)),[H.k(a,0)])}},
td:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaR().d=z
a.gaR().e=0
z=this.a.y
a.gaR().b=z
z=this.b
z=z==null?z:z.y
a.gaR().c=z
return a}},
mr:{"^":"a:0;",
$1:function(a){var z=a.gaR().e
a.gaR().e=z+1
return a}},
ms:{"^":"a:21;a,b,c",
$1:function(a){var z,y
if(a.gal()&&a.Q)if(a.cY(this.c,this.b)>0){z=a.y
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
mt:{"^":"a:0;a,b",
$1:function(a){var z=this.b
return J.u(a,z)||a.iB(z,this.a)}},
pA:{"^":"fk;a,b,p:c<,U:d<",
ae:function(a){var z=new U.dC(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof U.fk))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"OffBalanceOpportunitySituation {actorId="+J.f(this.a)+",\nculpritId="+J.f(this.b)+",\nid="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dC:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaR().d},
gU:function(){return this.gaR().e},
gaR:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaR().b
x=this.gaR().c
w=this.gaR().d
v=this.gaR().e
z=new U.pA(y,x,w,v)
if(y==null)H.e(P.j("actorId"))
if(w==null)H.e(P.j("id"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,O,{"^":"",ld:{"^":"w;M:c<,H:d<,X:e<,N:f<,b,a",
ga3:function(){return""},
gm:function(){return"FinishPunch"},
gI:function(){return},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=this.b
y=z.fr===C.d?C.f:C.b
x=b.a8("PunchSituation").gp()
w=U.bs(b)
b.V(z.y,new O.le(y))
switch(y){case C.d:throw H.c(new P.v("Enemy's pose should never be 'standing' after a successful punch"))
case C.f:c.eW(0,"<subject> {punch<es> <object> in the {face|nose|eye|jaw}|punch<es> <object's> {face|nose|eye|jaw}}",x,z,!0,a)
z.ar(c,"<subject> {stagger<s>|stumble<s>} off balance",!0)
break
case C.b:c.eW(0,"<subject> send<s> <object> to the "+H.b(w)+" with a {massive punch|well-placed fist} to the {face|nose|eye|jaw}",x,z,!0,a)
break}return H.b(a.dx)+" punches "+H.b(z.dx)+" to "+y.j(0)},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return!0},
A:{
wG:[function(a){return new O.ld(null,!0,!0,!1,a,null)},"$1","tQ",2,0,4]}},le:{"^":"a:0;a",
$1:function(a){a.gk().fx=this.a
return a}}}],["","",,E,{"^":"",kk:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"dodge"},
gm:function(){return"DodgePunch"},
ga7:function(){return"will <subject> dodge the fist?"},
O:[function(a,b,c){var z=b.a8("PunchSituation").gp()
a.fp(c,"<subject> tr<ies> to {dodge|sidestep|move out of the way}",z,!0)
S.a5(new E.kl(a,c,z),new E.km(this,a,c,z),null,null)
b.an()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
a.bp(c,"<subject> {dodge<s>|sidestep<s>} <object's> {punch|blow|jab}",b.a8("PunchSituation").gp(),z,!0)
b.aD("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bY(a,z))
return H.b(a.dx)+" dodges punch from "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gD(y):null).gaI().aH(0.4-z)},
F:function(a,b){return!0},
A:{
wA:[function(a){return new E.kk("Dodging means moving your body out of harm's way.",!1,!1,!0,C.e,a,null)},"$1","tE",2,0,4]}},kl:{"^":"a:2;a,b,c",
$0:function(){return this.a.bE(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",this.c,!0,!0)}},km:{"^":"a:2;a,b,c,d",
$0:function(){return this.a.b.jd(this.c,"<subject> <is> too quick for <object>",this.d,!0,!0,this.b)}}}],["","",,Z,{"^":"",
dM:function(a,b,c){var z=new Z.dL(null,null,null,null,null,null)
new Z.t7(a,b,c).$1(z)
return z.n()},
fu:{"^":"bZ;",
gat:function(){return[E.tE()]},
gm:function(){return"PunchDefenseSituation"},
am:function(){var z=new Z.dL(null,null,null,null,null,null)
z.i(this)
new Z.n3().$1(z)
return z.n()}},
t7:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaz().c=z
a.gaz().f=0
z=this.a.y
a.gaz().b=z
z=this.b.y
a.gaz().e=z
a.gaz().d=this.c
return a}},
n3:{"^":"a:0;",
$1:function(a){var z=a.gaz().f
a.gaz().f=z+1
return a}},
pD:{"^":"fu;cg:a<,p:b<,bV:c<,bX:d<,U:e<",
ae:function(a){var z=new Z.dL(null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Z.fu))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)))},
j:function(a){return"PunchDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+J.f(this.d)+",\ntime="+J.f(this.e)+",\n}"}},
dL:{"^":"d;a,b,c,d,e,f",
gp:function(){return this.gaz().c},
gU:function(){return this.gaz().f},
gaz:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaz().b
x=this.gaz().c
w=this.gaz().d
v=this.gaz().e
u=this.gaz().f
z=new Z.pD(y,x,w,v,u)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("predeterminedResult"))
if(v==null)H.e(P.j("target"))
if(u==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,Q,{"^":"",
fw:function(a,b){var z=new Q.dN(null,null,null,null,null)
new Q.t8(a,b).$1(z)
return z.n()},
fv:{"^":"ab;",
gat:function(){return[O.tQ()]},
gm:function(){return"PunchSituation"},
am:function(){var z=new Q.dN(null,null,null,null,null)
z.i(this)
new Q.n4().$1(z)
return z.n()},
as:function(a,b){if(a===0)return b.w(this.a)
return},
aL:function(a,b){return new H.I(a,new Q.n5(this),[H.k(a,0)])}},
t8:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaS().c=z
a.gaS().e=0
z=this.a.y
a.gaS().b=z
z=this.b.y
a.gaS().d=z
return a}},
n4:{"^":"a:0;",
$1:function(a){var z=a.gaS().e
a.gaS().e=z+1
return a}},
n5:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gp()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pE:{"^":"fv;a,p:b<,c,U:d<",
ae:function(a){var z=new Q.dN(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof Q.fv))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"PunchSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dN:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaS().c},
gU:function(){return this.gaS().e},
gaS:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaS().b
x=this.gaS().c
w=this.gaS().d
v=this.gaS().e
z=new Q.pE(y,x,w,v)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("target"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,O,{"^":"",lf:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return""},
gm:function(){return"FinishSlash"},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.V(y,new O.li(a))
x=b.w(y)
y=b.a8("SlashSituation").gp()
w=!(x.x>0)&&x.y!==100
if(!w){a.bp(c,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",y,x,!0)
N.aZ(c,x)}else{a.bp(c,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",y,x,!0)
y=a.e
if(y.gm()===$.$get$cn().b&&J.bW(z.dx,"orc"))y.ao(c,"<subject> slit<s> through the flesh like it isn't there.",!0)
N.bb(c,b,x)}y=H.b(a.dx)+" slashes"
return y+(w?" (and kills)":"")+" "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return a.e.gaf()>0},
A:{
wI:[function(a){return new O.lf(null,!0,!0,!0,C.e,a,null)},"$1","tR",2,0,4]}},li:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaf()
a.gk().y=z-y
return a}}}],["","",,V,{"^":"",lj:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return""},
gm:function(){return"FinishThrustSpear"},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.V(y,new V.lm(a))
x=b.w(y)
y=b.a8("SlashSituation").gp()
w=!(x.x>0)&&x.y!==100
if(!w){a.bp(c,"<subject> {pierce<s>|stab<s>|bore<s> through} <object's> {shoulder|abdomen|thigh}",y,x,!0)
N.aZ(c,x)}else{a.bp(c,"<subject> {pierce<s>|stab<s>|bore<s> through|impale<s>} <object's> {neck|chest|heart}",y,x,!0)
N.bb(c,b,x)}y=H.b(a.dx)+" pierces"
return y+(w?" (and kills)":"")+" "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return a.e instanceof Z.ak},
A:{
wK:[function(a){return new V.lj(null,!0,!0,!0,C.e,a,null)},"$1","tT",2,0,4]}},lm:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk().y
y=this.a.e.gaJ()
a.gk().y=z-y
return a}}}],["","",,X,{"^":"",k5:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"step back and parry"},
gm:function(){return"DefensiveParrySlash"},
ga7:function(){return"will <subject> parry it?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+U.a8(a)+"|fend it off}")
if(a.fr===C.f)a.aa(c,"<subject> <is> out of balance",!0)
else S.a5(new X.k6(a,c),new X.k7(this,a,c),null,null)
b.an()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z=a.cx
if(z)a.a1(c,"<subject> {step<s>|take<s> a step} back")
a.aY(c,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with "+U.a8(a)+"|fend<s> it off}",!0)
if(a.fr!==C.d){b.V(a.y,new X.k8())
if(z)a.a1(c,"<subject> regain<s> balance")}b.aD("FightSituation")
return H.b(a.dx)+" steps back and parries "+H.b(this.b.dx)},"$3","gL",6,0,1],
G:function(a,b){var z,y
if(a.cx)return 1
z=b.f
z=z.length!==0?C.a.gD(z):null
y=a.fr===C.d?0:0.2
return z.gaI().aH(0.5-y)},
F:function(a,b){return a.e.gbR()},
A:{
wx:[function(a){return new X.k5("Stepping back is the safest way to get out of harm's way.",!1,!1,!0,C.e,a,null)},"$1","tz",2,0,4]}},k6:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},k7:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},k8:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}}}],["","",,F,{"^":"",kn:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
gm:function(){return"DodgeSlash"},
ga3:function(){return"dodge and counter"},
ga7:function(){return"will <subject> dodge?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.fr===C.f)a.aa(c,"<subject> <is> out of balance",!0)
else S.a5(new F.ko(a,c),new F.kp(this,a,c),null,null)
b.an()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
a.b1(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.fr===C.d){z.bD(c,"<subject> lose<s> balance because of that",!0,!0)
b.V(z.y,new F.kq())}b.aD("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bY(a,z))
return H.b(a.dx)+" dodges "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gD(y):null).gaI().aH(0.4-z)},
F:function(a,b){return a.fr!==C.b&&this.b.e.gaf()>0},
A:{
wB:[function(a){return new F.kn("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.e,a,null)},"$1","tF",2,0,4]}},ko:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kp:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},kq:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return C.f}}}],["","",,M,{"^":"",kr:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"dodge and counter"},
gm:function(){return"DodgeThrustSpear"},
ga7:function(){return"will <subject> dodge?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {dodge|sidestep}")
if(a.fr===C.f)a.aa(c,"<subject> <is> out of balance",!0)
else S.a5(new M.ks(a,c),new M.kt(this,a,c),null,null)
b.an()
return H.b(a.dx)+" fails to dodge "+H.b(this.b.dx)+"'s spear"},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
a.b1(c,"<subject> {dodge<s>|sidestep<s>} it",z,!0)
if(z.fr===C.d){z.bD(c,"<subject> lose<s> balance because of that",!0,!0)
b.V(z.y,new M.ku())}b.aD("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bY(a,z))
return H.b(a.dx)+" dodges "+H.b(z.dx)+"'s spear"},"$3","gL",6,0,1],
G:function(a,b){var z,y
z=a.fr===C.d?0:0.2
if(a.cx)return 0.7-z
y=b.f
return(y.length!==0?C.a.gD(y):null).gaI().aH(0.4-z)},
F:function(a,b){return a.fr!==C.b&&this.b.e instanceof Z.ak},
A:{
wC:[function(a){return new M.kr("Dodging means moving your body out of harm's way. When done correctly, it will throw your opponent off balance and it will open an opportunity for a counter attack. When botched, it can get you killed.",!1,!1,!0,C.e,a,null)},"$1","tG",2,0,4]}},ks:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0)}},kt:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}},ku:{"^":"a:0;",
$1:function(a){a.gk().fx=C.f
return C.f}}}],["","",,O,{"^":"",lW:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"jump back"},
gm:function(){return"JumpBackFromSlash"},
ga7:function(){return"will <subject> avoid the slash?"},
O:[function(a,b,c){a.ao(c,"<subject> {jump<s>|leap<s>} {back|backward} but <subject> <is> {not fast enough|too slow}.",!0)
b.an()
return H.b(a.dx)+" fails to jump back from "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z
a.aY(c,"<subject> {leap<s>|jump<s>} {back|backwards|out of reach}",!0)
z=this.b
c.bu(0,"<owner's> <subject> {slash<es>|cut<s>} empty air",z,z.e)
b.aD("FightSituation")
return H.b(a.dx)+" jumps back from "+H.b(z.dx)+"'s attack"},"$3","gL",6,0,1],
G:function(a,b){var z,y
if(a.cx)return 1
z=b.f
z=z.length!==0?C.a.gD(z):null
y=a.fr===C.d?0:0.2
return z.gaI().aH(0.5-y)},
F:function(a,b){return a.e instanceof K.T&&this.b.e.gaf()>0},
A:{
wO:[function(a){return new O.lW("Jump back and the weapon can't reach you.",!1,!1,!0,C.e,a,null)},"$1","ux",2,0,4]}}}],["","",,G,{"^":"",mH:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
gm:function(){return"ParrySlash"},
ga3:function(){return"parry and counter"},
ga7:function(){return"will <subject> parry?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {parry|deflect it|meet it with "+U.a8(a)+"|fend it off}")
if(a.fr===C.f)a.aa(c,"<subject> <is> out of balance",!0)
else S.a5(new G.mI(a,c),new G.mJ(this,a,c),null,null)
b.an()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
if(z.fr===C.f){c.dL(0,"<subject> <is> out of balance",!0,!0,z)
c.bu(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ir())
a.aY(c,"<subject> {parr<ies> it easily|easily meet<s> it with "+U.a8(a)+"|fend<s> it off easily}",!0)}else a.aY(c,"<subject> {parr<ies> it|meet<s> it with "+U.a8(a)+"|fend<s> it off}",!0)
b.aD("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bY(a,z))
return H.b(a.dx)+" parries "+H.b(z.dx)},"$3","gL",6,0,1],
G:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.f?0.3:0
if(a.cx)return 0.6-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gaI().aH(0.3-z+y)},
F:function(a,b){return a.e.gbR()},
A:{
wT:[function(a){return new G.mH("Parrying means deflecting your opponent's move with your weapon. When successful, it will give you an opportunity for a counter attack. It won't throw your opponent off balance like dodging does, but it's also slightly easier to do.",!1,!1,!0,C.e,a,null)},"$1","uG",2,0,4]}},mI:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mJ:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,E,{"^":"",nX:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"block with shield and counter"},
gm:function(){return"ShieldBlockSlash"},
ga7:function(){return"will <subject> block the slash?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+U.bV(a))
if(a.fr===C.f)a.aa(c,"<subject> <is> out of balance",!0)
else S.a5(new E.nY(a,c),new E.nZ(a,c),new E.o_(this,a,c),null)
b.an()
return H.b(a.dx)+" fails to block "+H.b(this.b.dx)+" with shield"},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
if(z.fr===C.f){c.dL(0,"<subject> <is> out of balance",!0,!0,z)
c.bu(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$iq())
a.aY(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+U.bV(a),!0)}else a.aY(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+U.bV(a),!0)
b.aD("FightSituation")
if(a.cx)c.u(0,"this opens an opportunity for a counter attack")
C.a.u(b.f,S.bY(a,z))
return H.b(a.dx)+" blocks "+H.b(z.dx)+" with a shield"},"$3","gL",6,0,1],
G:function(a,b){var z,y,x
z=a.fr===C.d?0:0.2
y=this.b.fr===C.f?0.2:0
if(a.cx)return 0.8-z+y
x=b.f
return(x.length!==0?C.a.gD(x):null).gaI().aH(0.5-z+y)},
F:function(a,b){return a.d!=null},
A:{
wZ:[function(a){return new E.nX("A shield blocks enemy attacks with the least amount of energy and movement. It is easy and quick to launch a counter-attack when the enemy's weapon is stopped in this way.",!1,!1,!0,C.e,a,null)},"$1","uV",2,0,4]}},nY:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},nZ:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> <is> too slow",!0)}},o_:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",
aJ:function(a,b,c){var z=new L.dS(null,null,null,null,null,null)
new L.t4(a,b,c).$1(z)
return z.n()},
fI:{"^":"bZ;",
gat:function(){return[X.tz(),F.tF(),M.tG(),O.ux(),G.uG(),E.uV()]},
gm:function(){return"SlashDefenseSituation"},
am:function(){var z=new L.dS(null,null,null,null,null,null)
z.i(this)
new L.o3().$1(z)
return z.n()}},
t4:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaA().c=z
a.gaA().f=0
z=this.a.y
a.gaA().b=z
z=this.b.y
a.gaA().e=z
a.gaA().d=this.c
return a}},
o3:{"^":"a:0;",
$1:function(a){var z=a.gaA().f
a.gaA().f=z+1
return a}},
pG:{"^":"fI;cg:a<,p:b<,bV:c<,bX:d<,U:e<",
ae:function(a){var z=new L.dS(null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof L.fI))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)))},
j:function(a){return"SlashDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+J.f(this.d)+",\ntime="+J.f(this.e)+",\n}"}},
dS:{"^":"d;a,b,c,d,e,f",
gp:function(){return this.gaA().c},
gU:function(){return this.gaA().f},
gaA:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaA().b
x=this.gaA().c
w=this.gaA().d
v=this.gaA().e
u=this.gaA().f
z=new L.pG(y,x,w,v,u)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("predeterminedResult"))
if(v==null)H.e(P.j("target"))
if(u==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,M,{"^":"",
b7:function(a,b){var z=new M.dT(null,null,null,null,null)
new M.t6(a,b).$1(z)
return z.n()},
fJ:{"^":"ab;",
gat:function(){return[O.tR(),V.tT()]},
gm:function(){return"SlashSituation"},
am:function(){var z=new M.dT(null,null,null,null,null)
z.i(this)
new M.o4().$1(z)
return z.n()},
as:function(a,b){if(a===0)return b.w(this.a)
return},
aL:function(a,b){return new H.I(a,new M.o5(this),[H.k(a,0)])}},
t6:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaT().c=z
a.gaT().e=0
z=this.a.y
a.gaT().b=z
z=this.b.y
a.gaT().d=z
return a}},
o4:{"^":"a:0;",
$1:function(a){var z=a.gaT().e
a.gaT().e=z+1
return a}},
o5:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gp()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pH:{"^":"fJ;a,p:b<,c,U:d<",
ae:function(a){var z=new M.dT(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof M.fJ))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"SlashSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntarget="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dT:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaT().c},
gU:function(){return this.gaT().e},
gaT:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaT().b
x=this.gaT().c
w=this.gaT().d
v=this.gaT().e
z=new M.pH(y,x,w,v)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("target"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,Q,{"^":"",lg:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
gm:function(){return"FinishSlashGroundedEnemy"},
ga3:function(){return""},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.V(y,new Q.lh())
x=b.w(y)
w=x.y===100
c.dK(0,"<subject> {cut<s>|slash<es>|slit<s>} <object's> "+(w?"side":"{throat|neck|side}"),x,a.e)
if(w)N.aZ(c,x)
else N.bb(c,b,x)
return H.b(a.dx)+" slains "+H.b(z.dx)+" on the ground"},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return this.b.fr===C.b&&a.e.gaf()>0},
A:{
wH:[function(a){return new Q.lg(null,!0,!0,!0,C.e,a,null)},"$1","tS",2,0,4]}},lh:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,V,{"^":"",lk:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return""},
gm:function(){return"FinishThrustSpearAtGroundedEnemy"},
ga7:function(){return"(WARNING should not be user-visible)"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=this.b
y=z.y
b.V(y,new V.ll())
x=b.w(y)
w=x.y===100
c.dK(0,"<subject> {impale<s>|bore<s> through|pierce<s>} <object's> "+(w?"side":"{throat|neck|heart}"),x,a.e)
if(w)N.aZ(c,x)
else N.bb(c,b,x)
return H.b(a.dx)+" slains "+H.b(z.dx)+" on the ground with a spear"},"$3","gL",6,0,1],
G:function(a,b){return 1},
F:function(a,b){return this.b.fr===C.b&&a.e instanceof Z.ak},
A:{
wJ:[function(a){return new V.lk(null,!0,!0,!0,C.e,a,null)},"$1","tU",2,0,4]}},ll:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}}}],["","",,K,{"^":"",mx:{"^":"w;H:c<,X:d<,N:e<,I:f<,M:r<,b,a",
gm:function(){return"OnGroundParry"},
ga3:function(){return"parry it"},
ga7:function(){return"will <subject> parry it?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {parry|deflect it|stop it{| with "+U.a8(a)+"}}")
S.a5(new K.my(a,c),new K.mz(this,a,c),null,null)
b.an()
return H.b(a.dx)+" fails to parry "+H.b(this.b.dx)},"$3","gK",6,0,1],
P:[function(a,b,c){a.aY(c,"<subject> {parr<ies> it|stop<s> it with "+U.a8(a)+"}",!0)
b.aD("FightSituation")
return H.b(a.dx)+" parries "+H.b(this.b.dx)},"$3","gL",6,0,1],
G:function(a,b){var z
if(a.cx)return 0.6
z=b.f
return(z.length!==0?C.a.gD(z):null).gaI().aH(0.3)},
F:function(a,b){return this.b.e.gaf()>0&&a.e.gbR()},
A:{
wR:[function(a){return new K.mx(!1,!1,!0,C.e,"TODO",a,null)},"$1","uE",2,0,4]}},my:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mz:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,L,{"^":"",mA:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
ga3:function(){return"block with shield"},
gm:function(){return"OnGroundShieldBlock"},
ga7:function(){return"will <subject> block the strike?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to {block|stop|deflect} the {swing|attack|strike} with "+U.bV(a))
S.a5(new L.mB(a,c),new L.mC(a,c),new L.mD(this,a,c),null)
b.an()
return H.b(a.dx)+" fails to block "+H.b(this.b.dx)+" with shield on ground"},"$3","gK",6,0,1],
P:[function(a,b,c){var z=this.b
if(z.fr===C.f){c.dL(0,"<subject> <is> out of balance",!0,!0,z)
c.bu(0,"so <ownerPronoun's> <subject> is {weak|feeble}",z,$.$get$ip())
a.aY(c,"<subject> easily {block|stop|deflect} the {swing|attack|strike} with "+U.bV(a),!0)}else a.aY(c,"<subject> {block|stop|deflect} the {swing|attack|strike} with "+U.bV(a),!0)
b.aD("FightSituation")
return H.b(a.dx)+" blocks "+H.b(z.dx)+" with a shield on ground"},"$3","gL",6,0,1],
G:function(a,b){var z
if(a.cx)return 0.8
z=b.f
return(z.length!==0?C.a.gD(z):null).gaI().aH(0.5)},
F:function(a,b){return a.d!=null},
A:{
wS:[function(a){return new L.mA("A shield blocks enemy attacks with the least amount of energy and movement.",!1,!1,!0,C.e,a,null)},"$1","uF",2,0,4]}},mB:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> {fail<s>|<does>n't succeed}",!0)}},mC:{"^":"a:2;a,b",
$0:function(){return this.a.aa(this.b,"<subject> <is> too slow",!0)}},mD:{"^":"a:2;a,b,c",
$0:function(){return this.a.b.bo(this.c,"<subject> <is> too quick for <object>",!0,this.b)}}}],["","",,Y,{"^":"",nh:{"^":"w;M:c<,H:d<,X:e<,N:f<,I:r<,b,a",
gm:function(){return"RollOutOfWay"},
ga3:function(){return"roll out of way"},
ga7:function(){return"will <subject> evade?"},
O:[function(a,b,c){a.a1(c,"<subject> tr<ies> to roll out of the way")
a.aa(c,"<subject> can't",!0)
b.an()
return H.b(a.dx)+" fails to roll out of the way"},"$3","gK",6,0,1],
P:[function(a,b,c){a.e7(c,"<subject> <is> able to roll out of the way",!0,!0)
if(a.cx){b.V(a.y,new Y.ni())
a.aY(c,"<subject> jump<s> up on <subject's> feet",!0)}b.aD("FightSituation")
return H.b(a.dx)+" rolls out of the way of "+H.b(this.b.dx)+"'s strike"},"$3","gL",6,0,1],
G:function(a,b){var z
if(a.cx)return 1
z=b.f
return(z.length!==0?C.a.gD(z):null).gaI().aH(0.5)},
F:function(a,b){return!0},
A:{
wY:[function(a){return new Y.nh(null,!1,!1,!0,C.e,a,null)},"$1","uO",2,0,4]}},ni:{"^":"a:0;",
$1:function(a){a.gk().fx=C.d
return a}}}],["","",,V,{"^":"",
bC:function(a,b,c){var z=new V.dD(null,null,null,null,null,null)
new V.t1(a,b,c).$1(z)
return z.n()},
fl:{"^":"bZ;",
gat:function(){return[K.uE(),L.uF(),Y.uO()]},
gm:function(){return"OnGroundDefenseSituation"},
am:function(){var z=new V.dD(null,null,null,null,null,null)
z.i(this)
new V.mw().$1(z)
return z.n()}},
t1:{"^":"a:0;a,b,c",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gay().c=z
a.gay().f=0
z=this.a.y
a.gay().b=z
z=this.b.y
a.gay().e=z
a.gay().d=this.c
return a}},
mw:{"^":"a:0;",
$1:function(a){var z=a.gay().f
a.gay().f=z+1
return a}},
pB:{"^":"fl;cg:a<,p:b<,bV:c<,bX:d<,U:e<",
ae:function(a){var z=new V.dD(null,null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.fl))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
if(z==null?y==null:z===y){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)),J.h(this.e)))},
j:function(a){return"OnGroundDefenseSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\npredeterminedResult="+J.f(this.c)+",\ntarget="+J.f(this.d)+",\ntime="+J.f(this.e)+",\n}"}},
dD:{"^":"d;a,b,c,d,e,f",
gp:function(){return this.gay().c},
gU:function(){return this.gay().f},
gay:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.f=z.e
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gay().b
x=this.gay().c
w=this.gay().d
v=this.gay().e
u=this.gay().f
z=new V.pB(y,x,w,v,u)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("predeterminedResult"))
if(v==null)H.e(P.j("target"))
if(u==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,D,{"^":"",
cU:function(a,b){var z=new D.dU(null,null,null,null,null)
new D.t2(a,b).$1(z)
return z.n()},
fU:{"^":"ab;",
gat:function(){return[Q.tS(),V.tU()]},
gm:function(){return"StrikeDownSituation"},
am:function(){var z=new D.dU(null,null,null,null,null)
z.i(this)
new D.oH().$1(z)
return z.n()},
as:function(a,b){if(a===0)return b.w(this.a)
return},
aL:function(a,b){return new H.I(a,new D.oI(this),[H.k(a,0)])}},
t2:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaU().c=z
a.gaU().e=0
z=this.a.y
a.gaU().b=z
z=this.b.y
a.gaU().d=z
return a}},
oH:{"^":"a:0;",
$1:function(a){var z=a.gaU().e
a.gaU().e=z+1
return a}},
oI:{"^":"a:0;a",
$1:function(a){var z,y,x
z=a.gp()
y=this.a
x=y.a
if(z==null?x!=null:z!==x){z=a.gp()
y=y.c
y=z==null?y==null:z===y
z=y}else z=!0
return z}},
pI:{"^":"fU;a,p:b<,c,U:d<",
ae:function(a){var z=new D.dU(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof D.fU))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"StrikeDownSituation {attacker="+J.f(this.a)+",\nid="+J.f(this.b)+",\ntargetOnGround="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
dU:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaU().c},
gU:function(){return this.gaU().e},
gaU:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaU().b
x=this.gaU().c
w=this.gaU().d
v=this.gaU().e
z=new D.pI(y,x,w,v)
if(y==null)H.e(P.j("attacker"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("targetOnGround"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,O,{"^":"",n0:{"^":"d;",
gaI:function(){switch(this.gbV()){case C.n:return C.a3
case C.o:return $.$get$fp()
case C.t:return $.$get$fq()
default:throw H.c(P.F(this.gbV()))}},
$isab:1}}],["","",,K,{"^":"",dK:{"^":"d;a,b",
j:function(a){return this.b}}}],["","",,D,{"^":"",o9:{"^":"ae;H:b<,N:c<,X:d<,I:e<,a",
gW:function(){return""},
gM:function(){return},
gm:function(){return"SlayMonstersAction"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y,x,w
z=b.f
y=z.length!==0?C.a.gD(z):null
x=b.dg(y.a)
w=b.a
C.a.u(z,x.e.$3(b,y,new H.I(w,new D.oa(a,x),[H.k(w,0)])))
return H.b(a.dx)+" initiated combat with monsters in "+J.f(x)},"$3","gL",6,0,1],
a4:function(a,b){return"WARNING should not be user-visible"},
G:function(a,b){return 1},
F:function(a,b){var z=b.f
return H.A(z.length!==0?C.a.gD(z):null,"$isG").c}},oa:{"^":"a:0;a,b",
$1:function(a){var z,y
if(a.gbl()){z=a.gbq()
y=this.a.go
z=z.a
y=y.a
z=(z==null?y==null:z===y)&&a.gig()===this.b.b}else z=!1
return z}}}],["","",,Y,{"^":"",oS:{"^":"c0;H:c<,X:d<,N:e<,I:f<,b,a",
gM:function(){return},
gm:function(){return"TakeExitAction"},
O:[function(a,b,c){throw H.c(new P.X(null))},"$3","gK",6,0,1],
P:[function(a,b,c){var z,y
z=this.b
y=z.c
if(C.c.dc(y)!=="N/A")c.l(0,y,!0)
y=b.f
y=H.A(y.length!==0?C.a.gD(y):null,"$isG")
z=z.a
y.iU(b,a,z,c)
return H.b(a.dx)+" went through exit to "+z},"$3","gL",6,0,1],
a4:function(a,b){return"WARNING should not be user-visible"},
G:function(a,b){return 1},
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").c)return!1
this.b.d
return!0},
A:{
x2:[function(a){return new Y.oS(!1,!0,!1,null,a,null)},"$1","wl",2,0,49]}}}],["","",,F,{"^":"",
fA:function(a,b){var z=new F.cO(null,null,null,null,null)
new F.rU(a,b).$1(z)
return z.n()},
G:{"^":"ab;",
gat:function(){return[Y.wl()]},
gbt:function(){var z=[]
C.a.au(z,$.$get$hH())
z.push($.$get$fM())
return z},
gd1:function(){return 1000},
gm:function(){return"RoomRoamingSituation"},
am:function(){var z=new F.cO(null,null,null,null,null)
z.i(this)
new F.nj().$1(z)
return z.n()},
as:function(a,b){return b.a.aW(0,new F.nk(),new F.nl())},
aL:function(a,b){var z=this.as(null,b)
if(z==null)return[]
return[z]},
bS:function(a,b,c){return a.fM("TakeExitAction",b,!0).b5(0,new F.nm(c))},
bB:function(a,b,c,d,e){var z,y,x,w,v,u,t,s
z=a.dg(c)
a.bC(this.b,F.fA(z,!this.bS(a,b,c)&&z.e!=null))
if(!e)if(this.bS(a,b,z.b))z.d.$3(b,a,d)
else{d.l(0,"\n\n",!0)
z.c.$3(b,a,d)
d.l(0,"\n\n",!0)}for(y=R.i2(b,a),y=P.N(y,!0,H.z(y,"y",0)),x=y.length,w=a.a,v=0;v<y.length;y.length===x||(0,H.au)(y),++v){u=a.w(y[v].gp())
u.toString
t=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(u==null)H.e(P.j("other"))
t.a=u
new F.nn(z).$1(t)
s=t.n()
w.Z(0,u)
w.u(0,s)}},
iU:function(a,b,c,d){return this.bB(a,b,c,d,!1)},
ff:function(a,b){a.a.hu(new F.no(),!0)},
cE:function(a){if(this.a===$.$get$ei().b)return!1
return!0}},
rU:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gaF().c=z
a.gaF().e=0
z=this.a.b
a.gaF().b=z
a.gaF().d=this.b
return a}},
nj:{"^":"a:0;",
$1:function(a){var z=a.gaF().e
a.gaF().e=z+1
return a}},
nk:{"^":"a:0;",
$1:function(a){return a.gb0()&&a.gbl()}},
nl:{"^":"a:2;",
$0:function(){return}},
nm:{"^":"a:0;a",
$1:function(a){return a.gdS()===this.a}},
nn:{"^":"a:0;a",
$1:function(a){var z=this.a.b
a.gk().d=z
return a}},
no:{"^":"a:0;",
$1:function(a){return!a.gal()}},
pF:{"^":"G;a,p:b<,c,U:d<",
ae:function(a){var z=new F.cO(null,null,null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof F.G))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.c
y=b.c
if(z==null?y==null:z===y){z=this.d
y=b.d
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)),J.h(this.c)),J.h(this.d)))},
j:function(a){return"RoomRoamingSituation {currentRoomName="+J.f(this.a)+",\nid="+J.f(this.b)+",\nmonstersAlive="+J.f(this.c)+",\ntime="+J.f(this.d)+",\n}"}},
cO:{"^":"d;a,b,c,d,e",
gp:function(){return this.gaF().c},
gU:function(){return this.gaF().e},
gaF:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaF().b
x=this.gaF().c
w=this.gaF().d
v=this.gaF().e
z=new F.pF(y,x,w,v)
if(y==null)H.e(P.j("currentRoomName"))
if(x==null)H.e(P.j("id"))
if(w==null)H.e(P.j("monstersAlive"))
if(v==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,O,{"^":"",
tH:function(a,b){var z,y,x
z=a.bj("take_orcthorn")
y=a.bj("smelter_throw_spear")
x=a.bj("guardpost_above_church_enter_tunnel_with_cancel")
if(z||y||x){a.a8("RoomRoamingSituation").bB(a,a.w(1),"tunnel",b,!1)
return}a.a8("RoomRoamingSituation").bB(a,a.w(1),"tunnel_cancel_chance",b,!1)},
tA:function(a,b){var z,y,x,w,v,u,t,s,r,q
b.l(0,"<p class='meta'>",!0)
b.l(0,"Thanks for playing _Insignificant Little Vermin._",!0)
z=a.bj("take_orcthorn")
y=a.bj("smelter_throw_spear")
x=a.w(1)
x.a1(b,"<subject> "+(z?"took":"didn't find")+" Orcthorn")
x.aa(b,"<subject> "+(y?"destroyed":"didn't destroy")+" the iron monster",z!==y)
w=new O.tB(x)
v=w.$2(C.z,"sword")
u=w.$2(C.v,"spear")
t=w.$2(C.y,"shield")
x.ao(b,"<subject> <is> leaving Mount Bloodrock with "+H.b(v)+", "+H.b(u)+" and "+H.b(t)+".",!0)
s=x.x>=2?"in good health":"seriously injured"
r=x.fy>0?"with energy to spare":"exhausted"
x.ao(b,"<subject> <is> "+s+" and "+r+".",!0)
q=a.w(100)
q.a1(b,"<subject> <is> "+(q.x>=2?"uninjured":"wounded"))
b.l(0,"The important thing, though, is that you survived. <strong>Congratulations!</strong>",!0)
b.l(0,"</p>",!0)},
tJ:function(a,b){var z=a.w(1).cy.a.aW(0,new O.tK(),null)
a.V(a.w(1).y,new O.tL(z))
a.a8("RoomRoamingSituation").bB(a,a.w(1),"war_forge",b,!0)},
xh:[function(a,b,c){var z,y
z=R.b0(6666,"Agruth",null,null,null,null,null,0,2,100,!1,!1,2,!0,C.w,0,$.$get$br())
y=z.y
a.a.u(0,z)
return U.c1(c,[z],"{rock|cavern} floor",b,P.a_([1,new O.tW(y),5,new O.tX(y),9,new O.tY(y),12,new O.tZ(y),17,new O.u_(y)]))},"$3","wq",6,0,10],
xi:[function(a,b,c){var z,y,x,w,v
z=O.hz(2)
y=O.ec(!1)
x=new O.ua(z.y)
w=new O.u9(y.y)
v=[z,y]
a.a.au(0,v)
return U.c1(c,v,"{rock|cavern} floor",b,P.a_([1,new O.u3(x,w,new O.u2()),4,new O.u4(x,w),6,new O.u5(),9,new O.u6(),12,new O.u7(),16,new O.u8()]))},"$3","wr",6,0,10],
xj:[function(a,b,c){var z,y,x
z=a.aj("talk_to_briana_3")?"guardian":"orc"
y=R.b0(6667,z,null,null,null,new G.az("rusty sword",1,1,!1,!0,!1,P.ax(C.r,null)),null,0,3,100,!1,!1,3,!1,C.w,0,$.$get$br())
x=y.y
a.a.u(0,y)
return U.c1(c,[y],"{rock|cavern} floor",b,P.a_([1,new O.ub(x),3,new O.uc(x),5,new O.ud(x)]))},"$3","ws",6,0,10],
xk:[function(a,b,c){var z,y,x,w,v
z=O.hz(2)
y=O.ec(!0)
x=new O.ui(z.y)
w=new O.uh(y.y)
v=[z,y]
a.a.au(0,v)
return U.c1(c,v,"{rough|stone} floor",b,P.a_([1,new O.uf(x,w,new O.ue()),3,new O.ug(x,w)]))},"$3","wt",6,0,10],
um:function(a){return a.V(a.w(1).y,new O.un())},
i4:function(a,b){a.V(a.w(1).y,new O.uo(b))},
en:function(a){var z=a.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").c)return!1
return C.a.ad(C.Z,H.A(z.length!==0?C.a.gD(z):null,"$isG").a)},
aY:function(a,b){var z,y,x,w,v
z=a.w(1)
for(y=a.d,y=new P.e5(y,y.c,y.d,y.b,null,[H.k(y,0)]);y.v();){x=y.e
w=x.gct()
v=z.y
if(w==null?v!=null:w!==v)continue
if(x.gdI()!=="TakeExitAction")continue
if(x.gdS()===b)return!0
return!1}return!1},
ia:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.a,y=z.ga0(z),x=new H.bM(y,new O.uA(),[H.k(z,0)]);x.v();){w=y.gS()
if(!w.gf8()){v=H.A(w.e,"$isaz")
y=b
x=v.c
u=v.d
v.r
t=P.N(C.r,!1,null)
t.fixed$length=Array
t.immutable$list=Array
s=a.w(w.y)
s.toString
r=new R.am(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
if(s==null)H.e(P.j("other"))
r.a=s
new O.uB(new G.az(y,x,u,!0,!0,!1,t)).$1(r)
q=r.n()
z.Z(0,s)
z.u(0,q)
break}}},
co:function(a,b){var z,y,x
z=H.A(a.c,"$iscB").b
if(z>=5)return
b.l(0,C.a1[z],!0)
y=H.A(a.c,"$iscB")
y.toString
x=new M.dX(null,!1,0,0)
x.i(y)
a.c=new O.uN().$1(x).n()},
ep:function(a,b,c,d){var z,y
b.V(a.y,new O.uS())
if(!d){z=b.a
y=O.ec(!1)
z.u(0,y)
C.a.u(b.f,U.c1(new H.I(z,new O.uT(),[H.k(z,0)]),[y],"{smooth|} rock",b.a8("RoomRoamingSituation"),P.a_([1,new O.uU(y.y)])))}},
wh:function(a,b){a.V(b.y,new O.wi(b))},
ec:function(a){var z,y
z=$.$get$ef().a++
y=a?new Z.ak("spear",0,1,!1,!1,!1,P.ax(C.G,null)):new G.az("scimitar",1,1,!1,!0,!1,P.ax(C.r,null))
return R.b0(z,"goblin",O.d6(),null,null,y,null,0,1,0,!1,!1,1,!1,C.w,0,$.$get$br())},
hz:function(a){return R.b0($.$get$ef().a++,"orc",O.d6(),null,null,new G.az("sword",1,1,!1,!0,!1,P.ax(C.r,null)),null,0,a,0,!1,!1,a,!1,C.w,0,$.$get$br())},
tB:{"^":"a:30;a",
$2:function(a,b){var z,y
z=this.a.dR(a)
if(z>1)y=b+"s"
else y=z===1?"a "+b:"no "+b
return y}},
tK:{"^":"a:0;",
$1:function(a){return C.a.ad(a.gfB(),C.v)}},
tL:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
z.gaZ().Z(0,this.a)
return a}},
tW:{"^":"a:6;a",
$2:function(a,b){var z,y,x
z=this.a
y=a.w(z)
x=new G.az("sword",1,1,!1,!0,!1,P.ax(C.r,null))
y.a1(b,"<subject> {drop<s>|let<s> go of} the whip")
y.a6(b,"<subject> draw<s> <subject's> <object>",x)
a.V(z,new O.tV(x))
y.d5(b,'"You\'re dead, slave," <subject> growl<s> at <object> with hatred.',a.w(1),!0)}},
tV:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},
tX:{"^":"a:6;a",
$2:function(a,b){a.w(this.a).a1(b,"<subject> spit<s> on the cavern floor")}},
tY:{"^":"a:6;a",
$2:function(a,b){var z=a.w(this.a)
b.dM()
z.ao(b,'"I\'ll enjoy eating your flesh, human," <subject> snarl<s>.',!0)
b.l(0,"\n\n",!0)}},
tZ:{"^":"a:6;a",
$2:function(a,b){var z=a.w(this.a)
z.a1(b,"<subject> grit<s> <subject's> teeth")
z.aa(b,"<subject> do<es>n't talk any more",!0)}},
u_:{"^":"a:6;a",
$2:function(a,b){a.w(this.a).a1(b,"<subject> scowl<s> with pure hatred")}},
ua:{"^":"a:11;a",
$1:function(a){return a.w(this.a)}},
u9:{"^":"a:11;a",
$1:function(a){return a.w(this.a)}},
u2:{"^":"a:23;",
$2:function(a,b){return a.gal()&&a.Q&&b.gal()&&b.Q}},
u3:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y,x,w,v,u
z=this.a.$1(a)
y=this.b.$1(a)
x=a.w(1)
if(this.c.$2(z,y)){w=z.gf9()?y:z
v=J.u(w,z)?y:z
w.ao(b,'"Look, Sgarr," <subject> say<s>. "Look at them. Give a puny slave some steel and suddenly they think they\'re mighty slayers."',!0)
v.a1(b,"<subject> laugh<s>")
u=x.e
if(u.gm()===$.$get$cn().b){v.aa(b,"<subject> stop<s> almost instantly",!0)
v.d5(b,"<subject> see<s> <object> in your hand.",u,!0)}}else{w=z.gal()&&z.gbT()?z:y
w.ao(b,'"Look at you," <subject> laugh<s>. "Give a puny slave some steel and suddenly you think you\'re mighty slayers."',!0)
u=x.e
if(u.gm()===$.$get$cn().b)w.jb(b,"But then <subject> see<s> <object> in your hand and his face hardens.",!0,u,!0)}}},
u4:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gal()&&z.gbT()?z:y
w=a.w(1)
if(!(x.gf2() instanceof K.T))v=w.e instanceof K.T&&w.d==null
else v=!0
u=v?"kicking":"slashing"
t=v?["Whoosh!","Swah!","Slam!"]:["Swish!","Whoosh!","Thunk!"]
x.aY(b,"<subject> start<s> wildly "+u+" in your direction",!0)
s=J.aQ(b)
s.l(b,'"Insignificant..." '+t[0]+' "... little ..." '+t[1]+' "... vermin!" '+t[2],!0)
if(v)r="knee"
else r=w.d!=null?"shield":w.e.gm()
q="That last blow hits your "+r+" hard"
s.l(b,q+(w.fr===C.b?"":" and sends you a couple of steps back")+".",!0)
q=H.n([],[P.m])
p=$.$get$aE()
s.bu(b,"<owner's> <subject> glint<s> with intensity",x,new Y.aw(!1,"eyes",q,p,!1,C.H))}},
u5:{"^":"a:6;",
$2:function(a,b){J.bv(b,"From behind, you hear loud cries. Your pursuers must have reached the top of the stairs.",!0)}},
u6:{"^":"a:6;",
$2:function(a,b){J.bv(b,"Ear-splitting shouts come from behind. You wheel around and see a body of orcs and goblins approaching at top speed, their swords and spears at the ready.",!0)}},
u7:{"^":"a:6;",
$2:function(a,b){J.bv(b,"The orcs are goblins are halfway here.",!0)}},
u8:{"^":"a:6;",
$2:function(a,b){J.bv(b,"Your pursuers reach you from behind and a sword pierces your chest with formidable power.",!0)
a.V(a.w(1).y,new O.u1())
a.aD("RoomRoamingSituation")
a.an()}},
u1:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}},
ub:{"^":"a:6;a",
$2:function(a,b){a.w(this.a).d5(b,'"Good good good," <subject> whisper<s>, eyeing <object>.',a.w(1),!0)}},
uc:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.w(this.a)
y=a.w(100)
b.dM()
z.ao(b,'"Pain is good," <subject> chuckle<s>.',!0)
b.l(0,"\n\n",!0)
if(y.gal()&&y.Q){y.a1(b,"<subject> glare<s> at him")
y.ao(b,'"Shut up and die."',!0)
b.l(0,"\n\n",!0)}}},
ud:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.w(this.a)
y=a.w(1)
b.dM()
z.ao(b,'"You\'ll make a nice addition to my collection," <subject> say<s>, laughing.',!0)
z.a1(b,"<subject> nod<s> towards a heap of rotting bodies nearby")
b.l(0,"\n\n",!0)
y.ao(b,"<subject> glance<s> over at Briana, then back at the orc.",!0)
y.ao(b,'_"You had better shut up, and die."_',!0)
b.l(0,"\n\n",!0)}},
ui:{"^":"a:11;a",
$1:function(a){return a.w(this.a)}},
uh:{"^":"a:11;a",
$1:function(a){return a.w(this.a)}},
ue:{"^":"a:23;",
$2:function(a,b){return a.gal()&&a.Q&&b.gal()&&b.Q}},
uf:{"^":"a:6;a,b,c",
$2:function(a,b){var z,y
z=this.a.$1(a)
y=this.b.$1(a)
if(!(y.gcn()>0)){z.a6(b,"<subject> look<s> at <object's> body",y)
z.ao(b,'"You\'ll pay for this, vermin," <subject> snarl<s>.',!0)
return}if(this.c.$2(z,y)){z.a6(b,"<subject> look<s> at <object>",y)
z.d5(b,'"Now that is practice," <subject> say<s> to <objectPronoun>.',y,!0)}}},
ug:{"^":"a:6;a,b",
$2:function(a,b){var z,y,x
z=this.a.$1(a)
y=this.b.$1(a)
x=z.gal()&&z.gbT()?z:y
x.ao(b,'"You don\'t understand," <subject> growl<s>. "No matter how many of us you kill, there will be more. And when we get you, we will eat your face alive."',!0)
x.a1(b,"<subject> smirk<s>")
x.ao(b,'"You mean nothing."',!0)}},
un:{"^":"a:0;",
$1:function(a){var z,y
z=a.gk()
y=z.db
if(y==null){y=new L.U(null,null,[U.D])
y.ah()
y.i(C.h)
z.db=y
z=y}else z=y
y=$.$get$e9()
if(y==null)H.e(P.F("null element"))
z.gaZ().u(0,y)
return a}},
uo:{"^":"a:0;a",
$1:function(a){var z=a.gk().go
a.gk().go=z+this.a
return a}},
uA:{"^":"a:0;",
$1:function(a){return J.u(a.gbq(),$.$get$d8())}},
uB:{"^":"a:0;a",
$1:function(a){a.gk().f=this.a
return a}},
uN:{"^":"a:0;",
$1:function(a){var z
a.gc2()
z=a.c
a.gc2()
a.c=z+1
return a}},
uS:{"^":"a:0;",
$1:function(a){var z=P.ax(C.a0,null)
a.gk().e=new E.bh("shield",z)
return a}},
uT:{"^":"a:0;",
$1:function(a){return J.u(a.gbq(),$.$get$d8())}},
uU:{"^":"a:6;a",
$2:function(a,b){var z,y
z=a.w(this.a)
y=a.w(1)
if(a.bj("take_spear_in_underground_church")){z.e8(b,"<subject> look<s> at <object-owner's> <object>",$.$get$e9(),y)
z.ao(b,'"Thief," <subject> hiss<es>.',!0)}}},
wi:{"^":"a:0;a",
$1:function(a){var z,y,x
z=this.a.e
if(!(z instanceof K.T)){y=a.gk()
x=y.db
if(x==null){x=new L.U(null,null,[U.D])
x.ah()
x.i(C.h)
y.db=x
y=x}else y=x
if(z==null)H.e(P.F("null element"))
y.gaZ().u(0,z)}z=$.$get$cn()
a.gk().f=z}}}],["","",,V,{"^":"",
lp:function(){var z=new V.dl(null,null,null)
new V.tf().$1(z)
return z.n()},
rR:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rS:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rP:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The tunnel back to the main slave quarters is suicide. There will be too many orcs, and the Gate of Screams is a long way beyond, at the very base of Mount Bloodrock. That leaves two options: the black passage towards the war forges, and the deserted tunnel to the Unholy Church, an underground temple. Both these paths lead upwards and in the general direction of a small exit near the mountaintop \u2014 the Upper Door.\n",!0)}},
rQ:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The corpse lies still, getting cold.\n\n\n",!0)
O.co(b,c)
c.l(0,"",!0)}},
nU:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="cave_with_agruth")return!1
if(b.aj(this.d))return!1
return!0},
P:[function(a,b,c){c.l(0,"You search his pockets but turn up with nothing. Just then, you realize that if Agruth had something valuable on him, he would have hidden it well. You run your hand inside his vest and find a troma herb. This boosts your energy right when you need it--very handy. (Your stamina increases by 1.)\n",!0)
O.i4(b,1)
return H.b(a.dx)+" successfully performs SearchAgruth"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return"You have taken his weapon but there might be other useful items in his pocket."},
gH:function(){return!1}},
rN:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'Only a few bends ahead, the tunnel get blindingly bright and the empty smell of mountain air fills your nose. After three years, you hear the howling wind. You run through a small stone portal and out of the mountain you thought would be your grave. \n\n\nYou have to close your eyes to keep the blinding sun out. You let the wind chill your muscles. \n\n\nBut merely two breaths later, you are again in motion, jumping down a sharply descending path. Outside, it\'s you and Briana who have the upper hand \u2014 the orcs and goblins groan and stumble. This is still their territory, but the bright sun and the lack of cave walls rubs against all their instincts. These are cave breeds.\n\n\nSoon, they stop following altogether, presumably leaving the two of you to their aboveground brothers. You don\'t dare to stop but you gradually slow down, and then lift your eyes from the treacherous terrain.\n\n\nAt first, you cannot make much sense of what you see \u2014 this is nothing like the country you left three years ago. You look at Briana but she doesn\'t seem surprised. You turn your eyes to the scenery again, to the black smoke of orc camps and razed villages, to the burned forests, to the cracks in the wall of the distant Fort Ironcast, just visible over the Glenview hill. \n\n\nNo birds, only some horrible dark eagle-like creatures with no head, circling in both directions above Mount Bloodrock.\n\n\n_"We must stop this."_\n\n\nBriana follows your gaze, then shakes her head. "This is much larger than us, Aren. We\'ve both seen what takes place in the mountain. Now you can see what has happend outside. This is a problem for kings, not peasants."\n\n\n_"No king has what we have."_\n\n\n',!0)
if(b.aj("take_orcthorn"))c.l(0,'"Orcthorn? Bah, you think they\'ll let you have it? A farm boy?" \n\n\n_"I\'m not a farm boy. And I don\'t mean Orcthorn, no. I have a connection. We both do."_\n',!0)
c.l(0,"\n",!0)
if(!b.aj("take_orcthorn"))c.l(0,"\"Let me guess. Muscles and a bit of brains? Don't be a fool, you're still a farm boy.\" \n\n\n_\"I'm not a farm boy. And I don't mean muscles or brains, no. I have a connection. We both do.\"_\n",!0)
c.l(0,'\n"A connection."\n\n\n_"With the Dead Prince. I dream his dreams. I think I have some of his power. He is more than people think. A lot more. You feel it, too \u2014 I am sure of it \u2014 but you have not been in the mountain for as long as I have. Most slaves are lucky to survive the first month. I survived three years."_\n\n\n"So the thing you have that kings don\'t is\u2026 a way to communicate? Negotiate?"\n\n\n_"I do not have anything the Dead Prince wants. No, I do not think any mortal man does. But I think I am starting to understand what that is, and how the Dead Prince wants to seize it."_\n\n\n"And your plan is?"\n\n\n[IMG long view of the road ahead]\n\n\n_"Not letting him have it. Giving him the exact opposite of what he wants."_\n\n\n"You know we could just run as fast as we can, slaying some orcs along the way, and getting as far away from this place as possible, right?"\n\n\n_"Yes."_\n\n\n"That others would do exactly that."\n\n\n_"But we will not."_\n\n\n"No. We will not."\n\n\nWith that, you both start down the road towards the black fort in the distance. \n\n\nTHE END.\n\n\n',!0)
O.tA(b,c)
c.l(0,"",!0)}},
rO:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rL:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The crevice is small.\n",!0)}},
rM:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rJ:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You enter a small, circular room. There are exits on three sides, all marked with crude writing.\n\n\n",!0)
if(O.aY(b,"smelter"))c.l(0,'The passage you came from is marked with the words "Hot iron", which must mean "smelter" in the orcs\' vocabulary. Another one has the words "Unholy Church" above it. Both of these slope downwards.\n',!0)
c.l(0,"\n",!0)
if(O.aY(b,"underground_church"))c.l(0,'The passage you came from is marked with the words "Unholy Church". Another one has the words "Hot iron" above it, which must mean "smelter" in the orcs\' vocabulary. Both of these slope downwards.\n',!0)
c.l(0,"\nA third passage is marked \"Up Door\", and a few paces beyond the opening, it turns into a steep stairway upwards. This is it, if you're ready for it. Your final path to escape, an end to those three horrible years. For the first time, you see a smile on Briana's face. Not a smirk or an angry taunt of a laugh, but a genuine smile. \"_Up Door?_\" she whispers, shaking hear head. \"I can't believe we've made it this far.\"\n\n\nLeaning on the wall next to the third exit is a goblin guard. He's sleeping. He holds a scimitar in one hand, and there's a shield laid on his lap.\n",!0)}},
rK:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)
if(b.aj("guardpost_above_church_take_shield")&&!b.bj("guardpost_above_church_take_shield"))c.u(0,"The goblin's corpse is sprawled on the ground in the middle of the circular room.")
else c.u(0,"The goblin is sleeping soundly next to the exit to the Upper Door.")
c.l(0,"",!0)}},
ln:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="guardpost_above_church")return!1
return!0},
P:[function(a,b,c){c.l(0,"You take the passage that leads to the Upper Door.\n",!0)
O.tH(b,c)
return H.b(a.dx)+" successfully performs GuardpostAboveChurchEnterTunnelWithCancel"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
lo:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="guardpost_above_church")return!1
if(b.d8(this.d)!=null)return!1
return!0},
P:[function(a,b,c){c.l(0,"You silently approach the goblin's legs, wait a few moments, then lean over him and deftly lift the shield. The goblin sniffs, moves, but stays asleep.\n\n\nYou take a few slow steps back, then fix the shield on your offhand.\n",!0)
O.ep(a,b,c,!0)
return H.b(a.dx)+" successfully performs GuardpostAboveChurchTakeShield"},"$3","gL",6,0,1],
O:[function(a,b,c){c.l(0,"You silently approach the goblin's legs, and wait a few moments. You're trying to stay as far away from his nose as possible. The goblin sniffs, moves, but stays asleep. You shift your weight on the right leg, leaning over the goblin and using the other leg as a counterweigh. Briana watches you with amusement.\n\n\nYou touch the shield to lift it, but freeze. The goblin sniffs again, and shifts. If you move, he'll wake up.\n",!0)
C.a.u(b.f,V.lp())
return H.b(a.dx)+" fails to perform GuardpostAboveChurchTakeShield"},"$3","gK",6,0,1],
G:function(a,b){return 0.3},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return"The goblin is asleep but not soundly \u2014 the floor here must be cold and uncomfortable. Taking the shield from its position on the goblin's lap will quite likely wake him up."},
gH:function(){return!1}},
eV:{"^":"ab;",
gbt:function(){return[new A.fG(new V.lr(),new V.ls(),"Stay perfectly still","If you stop moving, the guard will go back to sleep. But in this position, staying perfectly still even for a single minute will be quite a feat. (It will cost you 1 stamina.)","guardpost_above_church_take_shield_rescue",!0,null),new A.fG(new V.lt(),null,"Snatch the shield","You can quickly snatch the shield, jump back and prepare for a fight.","guardpost_above_church_take_shield_continuation_of_failure",!0,null)]},
gm:function(){return"guardpost_above_church_take_shield"},
am:function(){var z=new V.dl(null,null,null)
z.i(this)
new V.lu().$1(z)
return z.n()},
as:function(a,b){if(a!==0)return
return b.a.bd(0,new V.lv())},
aL:function(a,b){return[a.bd(0,new V.lw())]}},
tf:{"^":"a:0;",
$1:function(a){var z=$.$get$a7().ak(1073741823)
a.gbi().b=z
a.gbi().c=0
return a}},
lr:{"^":"a:25;",
$4:function(a,b,c,d){J.bv(c,"You stay frozen in place. After a while, the strain of holding the awkward position start to show. Your left leg is shaking, and a drop of sweat is forming on your nose, threatening to fall on the goblin's leg.\n\n\nFortunately, at about that moment the goblin shifts again and his expression gets visibly more relaxed. His breath is deep and regular again.\n\n\nYou deftly lift the shield, take a few slow steps back, then fix the shield on your offhand.",!0)
b.an()
b.V(a.gp(),new V.lq())
O.ep(a,b,c,!0)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Stay perfectly still)"}},
lq:{"^":"a:0;",
$1:function(a){var z=a.gk().go
a.gk().go=z-1
return a}},
ls:{"^":"a:3;",
$3:function(a,b,c){return a.fy>0}},
lt:{"^":"a:25;",
$4:function(a,b,c,d){J.bv(c,"You snatch the shield and jump back next to Briana. The goblin wakes up instantly and gets his bearing suprisingly fast. He jumps up and gets into combat stance, pointing his scimitar at you.\n\n\nYou hold the shield on your offhand and get ready to fight.",!0)
b.an()
O.ep(a,b,c,!1)
return"GuardpostAboveChurchTakeShieldRescueSituation resolved with rescue/continuation (Snatch the shield)"}},
lu:{"^":"a:0;",
$1:function(a){var z=a.gbi().c
a.gbi().c=z+1
return a}},
lv:{"^":"a:0;",
$1:function(a){return a.gb0()}},
lw:{"^":"a:0;",
$1:function(a){return a.gb0()}},
rG:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'You are Aren, a slave. You have spent three painful years inside this mountain, between the foul-smelling cave walls, and under the whip of the orcs and the goblins that live here. \n\n\nYou watch Briana straighten over Agruth\'s corpse. She smooths her hair, using a pool of Agruth\'s blood as a mirror. \n\n\n"What?" she says when she notices you\'re looking.\n\n\n_"We either go now, or die."_\n\n\nBriana spits down at the body. "He wasn\'t even the worst of them, you know."\n\n\n_"I know."_\n\n\n"They _all_ deserve this, or worse, and I like the fact we\'ll kill them by their own swords." She kicks the dead slaver in the hip. \n\n\n_"That one is already dead."_\n\n\n"I was making sure," she says, and turns her attention to the sword. "We should name it. Gods love named swords. And I refuse to carry it around referring to it as _Agruth\'s_." She makes a pained grimace when she says the orc\'s name.\n',!0)}},
rH:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
ml:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
P:[function(a,b,c){c.l(0,'_"We will call it Luck Bringer. We got lucky, and luck is our only chance to get out of this place."_\n\n\nBriana nods. "Luck Bringer it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ia(b,"Luck Bringer")
b.a8("RoomRoamingSituation").bB(b,b.w(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordOpportunity"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
mm:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
P:[function(a,b,c){c.l(0,'_"We will call it Savior. It was our first step to freedom. The sword should have killed us and instead it set us free."_\n\n\nBriana nods. "Savior it is. Now, you\'re right, let\'s just get out of here as quickly as possible."\n',!0)
O.ia(b,"Savior")
b.a8("RoomRoamingSituation").bB(b,b.w(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordRedemption"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
mk:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="just_after_agruth_fight")return!1
return!0},
P:[function(a,b,c){c.l(0,"_\"That is foolish. It is just a sword, after all.\"_\n\n\nBriana shrugs. \"Whatever, just don't ever call it _Agruth's._ I already have more respect to this piece of iron than to that worthless animal. Now, you're right, let's just get out of here as quickly as possible.\"\n",!0)
b.a8("RoomRoamingSituation").bB(b,b.w(1),"cave_with_agruth_pre",c,!1)
return H.b(a.dx)+" successfully performs NameAgruthSwordNothing"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rE:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)}},
rF:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"TODO\n",!0)}},
rC:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The room is dark and wet. As you enter, the noises end. Smell of rotting flesh fills your nostrils and almost makes you vomit.\n\n\nWhen your eyes become accustomed to the dark, you see a figure standing in front of you, and next to a heap of dead bodies. You realize it's a male orc, but an especially large one, with huge muscles and many scars. His face is in constant motion, overwhelmed by tics and waves of hateful expressions.\n",!0)}},
rD:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The room is quiet. The mad guardian's huge body lies on the floor beneath the statue.\n",!0)}},
oT:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="orcthorn_room")return!1
if(b.aj("talk_to_briana_3"))if(!b.aj(this.d))z=!H.A(z.length!==0?C.a.gD(z):null,"$isG").c
else z=!1
else z=!1
if(!z)return!1
return!0},
P:[function(a,b,c){c.l(0,'You and Briana nod at each other and start sweeping the room. The mad guardian has left many bizarre things scattered around the space. A box of severed orc hands. Crude drawings of tentacles covering one of the walls, with several gouged out eyes below it. A circle made from half-eaten rats, with a single pebble in the middle.\n\n\n"None of this makes any sense," Briana says, turning some useless apparatus made of sticks in hand. "He must _really_ have gone mad. From fear, or magic, or both."\n\n\nSoon, the last place in the room that hasn\'t been searched by either you or Briana is the large pile of rotting corpses. Mostly orcs, but there are also some human slaves, and many rats and bats. The reek of rotten flesh raises above it in visible, pale fumes. Briana hides her nose in an elbow and starts dragging out the upper, less rotten corpses. You join her.\n\n\n"The sword will be at the bottom, I bet."\n\n\n_"Of course. He tried to bury it."_\n\n\nIn what seems like hours of work, you get to the bottom. Among a slush of decayed meat, you feel something hard and cold. Pulling it uncovers a sword.\n\n\nYou fling the weapon and the green-red rot falls to the ground easily, as if it had no traction on the steel. You hold in your hand the brightest, sharpest sword you have ever seen.\n\n\n[IMG orcthorn]\n\n\n"Orcthorn," Briana nods and surveys the blade and the hilt. Gradually, she starts shaking her head. "Why would they keep the sword at all? Why wouldn\'t they destroy it? They were terrified of it."\n\n\n_"Fear. It is the ultimate authority. I do not think it was the orcs who decided to keep the sword."_\n\n\n"Well, now they can start fearing again." Briana crouches next to the corpse of the mad guardian. "And all this because of a common soldier and a farm boy," she says to the lifeless face.\n\n\n_"I am not a farm boy. And we still need to get out of here first."_\n',!0)
O.wh(b,a)
return H.b(a.dx)+" successfully performs TakeOrcthorn"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rA:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'"There is a difference between being brave and being stupid. You\'re crossing it," she says.\n',!0)}},
rB:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'"We _really_ shouldn\'t be pushing our luck," she says.\n',!0)}},
o6:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="slave_quarters")return!1
return!0},
P:[function(a,b,c){c.l(0,"_\"Do you not want to kill some more orcs?\"_\n\n\n\"I do, trust me. That's why I don't want to get killed before having a chance to do it.\"\n\n\nYou shake your head and start walking. Briana reluctantly follows, here eyes darting around the familiar tunnel. You're close to where the orcs were keping you during sleep hours.\n\n\nSoon, you see an orc patrol appearing from behind a bend, and here it's impossible to hide. The orcs spot you immediatelly. There are three of them, one with a longsword, second with a spear, and the third one holds a battle axe.\n\n\nThe one with the spear throws it, and it rams into Briana's shoulder. She screams in pain. The swordman makes three fast leaps towards you, and swings his weapon. You have no time to react, and the blade slits your throat. You gurgle in surprise.\n\n\nYou look at Briana. As the battle axe cleaves her stomach, she looks directly at you.\n",!0)
b.V(a.y,new V.o7())
b.an()
return H.b(a.dx)+" successfully performs SlaveQuartersContinue"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
o7:{"^":"a:0;",
$1:function(a){a.gk().y=0
return a}},
ry:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You can see Briana clutching her fists. \"Are we homesick already?\" she says. But she doesn't wait for reply, and presses on.\n\n\nIt doesn't take long before you start hearing voices. Orcs and goblins shouting commands, mostly. Then human screams.\n\n\nThe tunnel gets wider and better lit by torches. The walls are smoother. You stop down next to a small, reinforced door. Up ahead, something is happening. A human slave is running towards you. His hand is visibly broken just above the elbow and blood is streaming down his limping left leg. His lips are moving but there is no sound anymore, only pain. Eyes in tears, he doesn't see you or anything else.\n\n\nBefore you can so much as call to him, something long and sharp shoots from behind the slave, and into his back. A bloodied spearhead appears in the center of the man's chest, as if growing from there. The tearful eyes go down, looking at the fatal wound. Two more steps and the slave falls face down, the shaft of the spear protruding upwards from his back.\n\n\nAn orc and a goblin appear from the tunnel, walking towards the dead man. The orc is laughing, patting his companion on the back. \"Vicious throw, small one!\" he roars.\n\n\nYou step back and motion Briana to lean on the wall, hoping that the door's embossed frame will provide enough cover before the two slavers turn again. \n\n\nBut at that time, something or someone smashes on that very door from the inside. Then come angry growls and something akin to barking and howling.\n\n\nThe door stays shut but the two slavers are now looking directly at you. The goblin yanks his spear from the corpse, and the orc unsheathes his sword. They start towards you.\n\n\n[IMAGE goblin spearman + orc]\n",!0)}},
rz:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)
if(b.a8("RoomRoamingSituation").bS(b,b.w(1),"orcthorn_room")&&!O.aY(b,"orcthorn_room"))c.l(0,"The small door on the side of the corridor is open.",!0)
c.l(0,"\n",!0)
if(!b.a8("RoomRoamingSituation").bS(b,b.w(1),"orcthorn_room"))c.l(0,"The small door on the side of the corridor is closed.",!0)
c.l(0,"\n",!0)
O.co(b,c)
c.l(0,"",!0)}},
o8:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="slave_quarters_passage")return!1
if(!b.aj(this.d))z=!H.A(z.length!==0?C.a.gD(z):null,"$isG").c&&!b.a8("RoomRoamingSituation").bS(b,b.w(1),"orcthorn_room")
else z=!1
if(!z)return!1
return!0},
P:[function(a,b,c){c.l(0,'Violent grunts and growls are coming through that door. Next to it, an orcish writing on the wall says "Danger mad. Give food go away."\n',!0)
return H.b(a.dx)+" successfully performs SlaveQuartersPassageExamineDoor"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rv:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"A blast of smoke and heat greets you as you walk out of the passage and into the room. The roaring fire draws your attention to the far wall, where scores of orcs shovel coal into a giant furnace and tilt huge kettles of molten steel into white-hot rivers. This is the smelter.\n\n\n",!0)
if(O.aY(b,"war_forge"))c.l(0,"You see a smooth passage leading out of the smelter and sloping upwards. You'll be able to go there unnoticed.",!0)
c.l(0,"",!0)
if(O.aY(b,"guardpost_above_church"))c.l(0,"Not far from here there is a short tunnel, sloping down. It leads into the same room where the molten steel goes \u2014 the war forges. You'll be able to go there unnoticed.",!0)
c.l(0,"",!0)}},
rw:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The reds and whites of the molten steel reflect in the heaps of coal.\n\n\n",!0)
if(b.bj("smelter_look_around"))c.l(0,"About a spear's throw away, the ogre is {closing the flow of molten steel|waiting for commands from the forges}.",!0)
c.l(0,"\n",!0)
O.co(b,c)
c.l(0,"",!0)}},
ob:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="smelter")return!1
if(b.aj(this.d))return!1
return!0},
P:[function(a,b,c){c.l(0,"The artificial rivers lead the molten iron across the room, into a large pool. From that pool, a single ogre is distributing the forge-ready liquid into troughs that descend to the war forges below. \n\n\nThe ogre is no more than a spear's throw away from you. But he doesn't notice. In fact, you realize he's blind, probably from all the molten steel around him. Yet he's performing his job without fault, listening to commands from orcs in the war forges beyond the wall, and operating the  floodgates accordingly.\n",!0)
return H.b(a.dx)+" successfully performs SmelterLookAround"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
oc:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="smelter")return!1
if(!(!b.aj(this.d)&&b.aj("war_forge_watch_workers")&&b.aj("smelter_look_around")&&b.w(1).dR(C.v)>=1))return!1
return!0},
P:[function(a,b,c){c.l(0,'It is a long distance to the blind ogre, but you can\'t come any closer \u2014 there is the pool of molten steel between you and him, and going around it would surely make the orcs aware of your presence. You wait for the ogre to get an order from bellow and watch him open one of the gates. The molten steel starts flowing.\n\n\nYou move just a few steps closer to the ogre and withdraw the spear. \n\n\nBriana gives you a puzzled look. "Wait\u2026" she whispers.\n\n\nYou throw.\n\n\nThe spear sails over the molten steel and rams into the blind ogre\'s shoulder. Your heart skips a beat. It\'s not a killing throw. The ogre will scream, the orcs will hear it \u2014 you\'re dead. But then, the gods show mercy. The ogre wheels around, trying to reach the spear with his left hand. He gets away from the gate and tries to correct it by stepping back.\n\n\nThe last step takes him over the edge and into the pool of white-hot steel. He doesn\'t even have a chance to scream \u2014 the liquid swallows him. The orcs on the other side of the room don\'t notice.\n\n\n"Why would you do that?" Briana says with her hands thrown in the direction of the throw. "You wasted a perfectly good spear on a stupid ogre that posed no threat to us."\n\n\n_"Listen."_\n\n\nAt this point, the distant voices coming from the war forges get slightly louder. Then again. In the clamor and noise of the two rooms, the small increase in volume is almost imperceptible but Briana hears it. She looks at you and a smile starts to form on her lips. "Let\'s go," she says.\n\n\nYou pass the short passage and crouch at the walkway above the war forges. There is chaos below. Most orcs and ogres have stopped working and watch molten steel overflowing the troughs and raining down on the forges. A large part of the iron monster is obliterated and the orcs working there are either dead or running away. \n\n\nSoon, you see an orc using a rope ladder to scale the wall to the smelter. He\'ll be able to get to the gate and close it but it will take him some time to make the climb. And the damage has already been done.\n\n\n"That, my friend, was the most boring heroic deed in history." Briana seems amused, watching the havoc below. "You just threw a spear\u2026"\n\n\n_"A well placed throw."_\n\n\n"... and killed a _blind_ ogre \u2026"\n\n\n_"An important one."_\n\n\n"... a _dam_ worker. Who happened to trip and fall into molten steel."\n\n\n_"As I said, a well placed throw. The less simple you see the world, the easier it is for you to change it."_\n\n\n"Nonsense. You got lucky."\n',!0)
O.tJ(b,c)
return H.b(a.dx)+" successfully performs SmelterThrowSpear"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rt:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The path from slavery to power begins with a single crack of a whip. Briana wheels around, her face red with pain and anger. She is new here, but she knows what will follow. \n\n\n\n\nOnce Agruth starts whipping, the victim ends up dead. Agruth loves killing slaves. \n\n\n\n\nAnother crack and there is new blood on Briana's face. Agruth grins.\n\n\n\n\nNobody else is in sight. It's just you, Agruth and Briana. That's Agruth's main mistake.\n",!0)}},
ru:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
oV:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){if(!(b.d8(this.d)==null&&O.en(b)))return!1
return!0},
P:[function(a,b,c){c.l(0,'_"You were caught not too long ago, I think. What can you tell me about outside?"_\n\n\n\n\nBriana shrugs. "How long have you been here?"\n\n\n\n\n_"Three years."_\n\n\n\n\n"Three years! Gods. A lot has happened in the last winter alone. The orcs have taken the upper valley, and make raids way beyond Fort Ironcast."\n',!0)
return H.b(a.dx)+" successfully performs TalkToBriana1"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
oW:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){if(!(b.aj("talk_to_briana_1")&&b.d8(this.d)==null&&O.en(b)))return!1
return!0},
P:[function(a,b,c){c.l(0,'_"Where did they get you?"_\n\n\n\n\n"At the Gate of Screams. I was trying to sneak in."\n\n\n\n\n_"You what?"_\n\n\n\n\n"I know. It seemed like a stupid idea even then. I wanted to get in, steal back the Orcthorn, get out, help the fight."\n',!0)
return H.b(a.dx)+" successfully performs TalkToBriana2"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
oX:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){if(!(b.aj("talk_to_briana_2")&&b.d8(this.d)==null&&O.en(b)))return!1
return!0},
P:[function(a,b,c){c.l(0,'_"What\'s Orcthorn?"_\n\n\n"A sword. It has killed hundreds of orc, wielded by many different knights. Even more orcs died trying to seize it, almost to no avail."\n\n\n_"Almost."_\n\n\n"Yes. Last full moon, an orcish captain and a company of (TODO: alpha) warriors ambushed Lord TODO. He was the wielder of Orcthorn at that time, and they knew it. They slaughtered his company and brought the sword here, to Bloodrock. Since then, the orcs are bolder and more successful."\n\n\n_"The mad guardian."_\n\n\n"The mad who?"\n\n\n_"That\'s what Agruth and the other slavers were talking about a couple of weeks back. One orc was tasked with guarding a sword. That seemed wierd enough to me. Guarding a sword? Stranger yet, that orc went mad after only a few days of doing this. Now they keep him in a cell, and call him *grach kamkorr*. The mad guardian. That sword is still with him. Hidden there in the cell."_\n\n\n"Where is that cell?"\n\n\n_"Somewhere in the slave quarters."_\n\n\n',!0)
if(!b.a8("RoomRoamingSituation").bS(b,b.w(1),"slave_quarters_passage"))c.l(0,'Briana tenses. "Well then, at least we have that choice." ',!0)
c.l(0,"",!0)
return H.b(a.dx)+" successfully performs TalkToBriana3"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rr:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"This must be the place that the orcs call the Shafts. It's a tall, seemingly endless room, with many walkways across.\n\n\n\n\n\n\nYou realize there is really only one way out, over one of the walkways. You'll have to run, there is no hiding anymore.\n",!0)}},
rs:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
th:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'Almost as soon as you lose the circular room from sight, loud yells and shouting rises from the deep of the mountain. You hurry up, taking the high stairs by two. The voices from below quiet down a bit, and now you can hear stomping of dozens of orc and goblin feet.\n\n\nThe air gets colder and fresher, but there\'s still no end in sight, and the stairs are now so high that the climb feels like walking up a ladder.\n\n\n"I have\u2026" Briana gasps, trying to catch her breath. "I have not fought my way through the depths of mount bloodrock just to die of exhaution on its doorstep."\n\n\n_"That\u2026 that would be disappointing, yes."_\n\n\nThe sounds from behind get louder. You can now pick out individual voices, although not what they say. The stairway suddenly makes a sharp left and levels out. Tasting blood on the roof of your mouth, your whole body demands to stop \u2014 but you start running anyway. Briana closely follows.\n\n\nThe light in the tunnel gets brighter and the air colder. Then, suddenly, an orc and a goblin jump in front of you from a slimy crevice, swords in hands. \n\n\n![Orc and Goblin](img/orc_and_goblin_sketch.jpg)\n\n\nThis must be the guard of the Upper Door. There is no way around them.\n',!0)}},
ti:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
te:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'After a few strides, you realize Briana still stands in the circular room behind.\n\n\n_"Are you not coming?"_\n\n\nBriana hesitates. "It feels like we could have done more." She motions at the goblin, then extends her gesture to the rest of the mountain. "Wreak more havoc. Take more. I mean, we might be the first people to be in Mount Bloodrock, and live."\n',!0)}},
tg:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"",!0)}},
rT:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You enter something that at first looks like a large, twisting cave, but then opens into a high room with many columns. This must be what the orcs call the Underground Church. Your bare footsteps reverberate around the space, so you slow down to quiet them. There are no windows, of course, you are deep underground, but there is dim light coming from the far end of the place, where you expect the altar to be but can't quite see it. No torches here. Quiet. \n\n\n",!0)
if(O.aY(b,"cave_with_agruth"))c.u(0,"After a bit of searching, you also notice a twisty passage going from the right hand side of the Church and sloping upwards. That must be the way out.")
c.l(0,"",!0)
if(O.aY(b,"guardpost_above_church"))c.u(0,"Not far from here, a tunnel leads slightly downwards, to where you killed Agruth.")
c.l(0,"",!0)}},
t3:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The temple stands silent, as if holding breath.\n\n\n",!0)
O.co(b,c)
c.l(0,"",!0)}},
kT:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="underground_church")return!1
if(b.aj(this.d))return!1
return!0},
P:[function(a,b,c){c.l(0,'This place was not built by the orcs or their slaves. Walls are straight and smooth. The ceiling is high enough to make you feel small, negligible, unimportant. The columns are decorated with delicate embossments of skulls and tentacles.\n\n\n"What are these things?" Briana whispers, looking at the ornaments.\n\n\n_"This place worships the Dead Prince."_\n\n\nSaying the name brings coldness and sweat. You hear the name every night in the Dead Prince\'s tongue \u2014 but it has been a long time since you said it yourself.\n\n\n"Worships?" Briana looks up at the high ceiling, then around the temple. "I though the Dead Prince was a warlord. A shaman. Something like that."\n\n\n_"He is god."_\n\n\n',!0)
if(!b.aj("wait_for_ritual"))c.l(0,"Briana smirks. \"Look, no. The Dead Prince is no god. The orcs might think so, you shouldn't. He's some talented illusionist at best.\" ",!0)
c.l(0,'\nThe glow coming from the altar dims for a moment, then lights up again.\n\n\n_"He is worse than god. He is fear itself."_\n\n\nBriana looks at you, narrowing her eyes.\n\n\n_"I think you have felt it."_\n',!0)
return H.b(a.dx)+" successfully performs ExamineUndergroundChurch"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rx:{"^":"a:5;",
$3:function(a,b,c){c.l(0,'The altar is a simple block of stone at the back of the temple. On the wall above it, there is a large ornament portraying an octopus with eight tentacles and eight black eyes at their tips. It\'s the sign of the Dead Prince. You have never seen it in real life but you know it well.\n\n\n"You\'re brave, my friend," Briana whispers. "I\'ll give you that. But if we must linger in this mountain, I\'d much rather kill some orcs than spy around a temple."\n\n\n_"You hate orcs? This is what made them."_\n\n\nBriana opens her mouth to reply, but at that point the otherwise steady light from the altar flickers like a flame, and you both slip behind a large column to move out of sight. A spear that lies here on the ground almost trips you up.\n',!0)}},
rI:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The altar glows with a dim red light that reflects in the eight black eyes above it.\n",!0)}},
pd:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="underground_church_altar")return!1
if(b.aj(this.d))return!1
return!0},
P:[function(a,b,c){c.l(0,'You move to a shadow and wait. After a few heartbeats, there is a scraping sound of stone against stone. You lean out from your hiding and see a part of the wall to the right of the altar opening.\n\n\nAn orc priest, tall and pale, enters from the stone door. At that time, the whole temple reverberates with a strong, dissonant tone that is somehow both sickening and appealing at the same time. It\'s like a groan of some large beast awakening.\n\n\nAfter the priest, a huge creature enters through the door, crouching below the frame. It\'s unclear what it is, but possibly some large breed of ogre, and judging by the braided hair, a female. Her sword \u2014 attached to her hip with a rope \u2014 is as long as you are tall. \n\n\nWhen she enters the temple and unbends, you can see that she leads someone on a chain. An orc. Despite being a strong one, probably a captain or even a chieftain, he is dwarfed by the creature before him, and he visibly shakes in horror.\n\n\nThe three of them \u2014 the priest, the ogre and the orc \u2014 go around the altar and stop before it, facing the symbol of the octopus, and away from you and Briana. The dissonant tone stops. You lean a little further out from your hiding, to have a better view.\n\n\nWithout words, the priest beckons the orc to lie at the altar. The orc is now shaking uncontrollably, but complies. You can hear his fitful breath, the rustle of his body against the stone as he glides into position, and nothing else.\n\n\nWhen the orc lies on the altar, the female ogre walks up to him and places her hands on his shoulders, pinning him down.\n\n\n_"Maggots."_\n\n\nSomehow, you know. Briana gives you a puzzled look, then turns back to the altar. From the shadows in the base of the altar, a swarm of large black insects starts to make its way to the top, towards the terrified orc. The priest lifts his arms as if in silent worship.\n\n\nThe ogre pushes down, preparing for the inevitable struggle. The orc senses it, tenses up and opens his mouth to scream.\n\n\nBut the scream doesn\'t come. Instead of it, the dissonant tone sounds again, more powerful than before.\n\n\nThe maggots crawl over the edge of the altar\'s top, onto the orc\'s body, heading straight towards his face. They move faster now.\n\n\n\n\nThe orc\'s eyes go wide. He struggles against the ogre\'s grip, pointlessly. The dissonant tone gets even louder. The temple quivers. The sound permeates everything.\n\n\nThis has a strange effect on you. Suddenly, the terror of the moment is fully replaced by something of an opposite \u2014 an invigorating feeling of power. You breathe in and feel stronger, refreshed. (Your stamina increases by +1.)\n\n\nYou notice that the priest takes a deep breath as well.\n\n\nThen, suddenly, the sound stops, and the orc\'s body sinks. The invigorating feeling is gone. You realize the maggots have eaten through the orc\'s eyes and cheeks, and that they are now scuttling back to the base of the altar.\n\n\nThe priest puts his arms down again, and \u2014 without ceremony \u2014 heads back to the stone door. The ogre takes the orc\'s dead body, puts it over her shoulder, and follows. In a few heartbeats, they are all gone and the door is closed. A new splash of blood on the altar is the only reminder of the scene.\n\n\nBriana doesn\'t look at you. "How did you know it would be maggots?"\n\n\n_"I do not know."_\n\n\n"Is this\u2026 I _felt_ that sound, somehow. I _felt_ it."\n\n\n_"This place does something weird to people."_\n\n\n"And if that orc was meant to be an offering, why did they not leave the body?" Briana shakes her head, still not looking at you. "Let\'s\u2026 let\'s just get out of here."\n',!0)
O.i4(b,1)
return H.b(a.dx)+" successfully performs WaitForRitual"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
oU:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="underground_church_altar")return!1
if(b.aj(this.d))return!1
return!0},
P:[function(a,b,c){c.l(0,"It's a primive short spear that probably belonged to some goblin. You take it in your hand, feeling the wet wood and the patches of mire along its length. It must have been here for a while. \n\n\nBut it feels right in your hand, a good throwing weapon.\n",!0)
O.um(b)
return H.b(a.dx)+" successfully performs TakeSpearInUndergroundChurch"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
rl:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"You enter the enormous cave that holds Mount Bloodrock's war forges. This space is so vast that it has its own climate, with dark clouds covering most of the ceiling, and what looks like black rain falling in the distance. Weird bats are circling just below the clouds, their shrieks mixing with the clangs of steel and angry shouts below.\n\n\n",!0)
if(O.aY(b,"cave_with_agruth"))c.l(0,"You and Briana duck behind some carts on a walkway above the floor of the cave. You can see that the walkway leads up a flight of stairs that hugs one side of the cave, and into a large stone wall. This must be the way through the smelter, and towards the Upper Door. Thankfully, there is nobody in the way. ",!0)
c.l(0,"\n",!0)
if(O.aY(b,"smelter"))c.l(0,"You and Briana stand on a walkway way above the floor of the cave. You can see the walkway leads down a flight of stairs that hugs one side of the cave, towards the bottom. Down there, you recognize a passage in the rock that you know must descend deeper into the mountain, towards the slave quarters, and therefore to where you slayed Agruth. There is nobody in the way. ",!0)
c.l(0,"",!0)}},
rm:{"^":"a:5;",
$3:function(a,b,c){c.l(0,"The air in the war forges is heavy and the noise overwhelming.\n\n\n",!0)
O.co(b,c)
c.l(0,"",!0)}},
pe:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="war_forge")return!1
if(b.aj(this.d))return!1
return!0},
P:[function(a,b,c){c.l(0,"The cave is natural, but on the side of the smelter there is an artificial wall, like a stone dam. From an opening high on that wall, suspended troughs of molten steel descend into all parts of the room like huge fiery tentacles. \n\n\nAt the end of each of the troughs, teams of orcs pour the steel into molds for axes, war hammers, and greatswords. The clamor of hammers hitting anvils is deafening, and the strong smell of iron and soot is almost stronger than the smell of all that orc sweat.\n\n\nThis place makes Fort Ironcast's military forge look like a doll house: tiny and inconsequential.\n",!0)
return H.b(a.dx)+" successfully performs WarForgeLookAround"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
pf:{"^":"Q;W:c<,m:d<,b,a",
F:function(a,b){var z=b.f
if(H.A(z.length!==0?C.a.gD(z):null,"$isG").a!=="war_forge")return!1
if(!(!b.aj(this.d)&&b.aj("war_forge_look_around")))return!1
return!0},
P:[function(a,b,c){c.l(0,'You crane your neck from your hiding and take the scene in. More likely than not, no human has ever seen this place and lived to tell the tale.\n\n\nBriana shakes her head: "The orcs are working together with ogres. They must be terrified."\n\n\nYou scan the workers, noticing the slow-moving ogres that tower over the orcs. "And they don\'t use slaves here," you say. "There must be something important going on here." Looking again at the molds they are using, you don\'t see anything out of the expected. Primitive axes and swords, some armor.\n\n\n"What is that thing!" Briana gasps. You follow her stare and at first all you see is just a cluster of slightly larger forges. Then you squint and an image appears. An image of an enormous, repulsive, half-assembled insect. Each leg, or whatever they are, is as long as a good rock\'s throw. There are eight of them. Then there\'s the body \u2014 a huge cockroach-like contraption. The teeth of steel are already completed, sharp and menacing and as long as a man. \n\n\nA full-sized ogre is pouring water over one part of the form just now, producing a cloud of steam. You can\'t see much else. From the high opening in the smelter wall, molten steel is starting to flow down to fill another part of the iron monster.\n',!0)
return H.b(a.dx)+" successfully performs WarForgeWatchWorkers"},"$3","gL",6,0,1],
O:[function(a,b,c){throw H.c(new P.v("Success chance is 100%"))},"$3","gK",6,0,1],
G:function(a,b){return 1},
gN:function(){return!1},
a4:function(a,b){return"Will you be successful?"},
gI:function(){return},
gM:function(){return""},
gH:function(){return!1}},
pw:{"^":"eV;p:a<,U:b<",
ae:function(a){var z=new V.dl(null,null,null)
z.i(this)
a.$1(z)
return z.n()},
R:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(!(b instanceof V.eV))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gB:function(a){return Y.S(Y.i(Y.i(0,J.h(this.a)),J.h(this.b)))},
j:function(a){return"GuardpostAboveChurchTakeShieldRescueSituation {id="+J.f(this.a)+",\ntime="+J.f(this.b)+",\n}"}},
dl:{"^":"d;a,b,c",
gp:function(){return this.gbi().b},
gU:function(){return this.gbi().c},
gbi:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.a=null}return this},
i:function(a){this.a=a},
n:function(){var z,y,x
z=this.a
if(z==null){y=this.gbi().b
x=this.gbi().c
z=new V.pw(y,x)
if(y==null)H.e(P.j("id"))
if(x==null)H.e(P.j("time"))}this.i(z)
return z}}}],["","",,O,{"^":"",
xg:[function(a){var z,y
z=$.$get$db()
y=z.C
if(y.length>0){y+=" "
z.C=y}z.C=y+a},"$1","uQ",2,0,17],
xl:[function(a){$.el=a},"$1","uR",2,0,17],
hQ:[function(a,b,c,d,e,f,g){var z=L.eJ(a,!1,!1,d,e,f,g)
$.$get$bT().u(0,z)
return z},function(a){return O.hQ(a,!1,!1,null,null,null,null)},function(a,b,c){return O.hQ(a,!1,!1,null,b,c,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$3$helpMessage$script","uP",2,13,40,0,0,0,1,1,0],
nv:{"^":"nH;",
ba:function(){var z=0,y=P.av(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j
var $async$ba=P.as(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if($.bj){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Sending updated stats."
n.a.E(m.J())
m=t.Q
n=Z.ol()
m.toString
l=new A.q(100,null,null,null,null)
l.e=n.J()
m.a.E(l.J())
new P.J(0,$.r,null,[null]).bf(!0)}if(t.r){n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Saving player chronology."
n.a.E(m.J())
t.r=!1
m=t.Q
m.toString
n=new A.q(60,null,null,null,null)
n.b=t.f.bZ(0)
m.a.E(n.J())}s=null
case 3:n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Calling _goOneStep()."
n.a.E(m.J())
w=7
z=10
return P.ar(t.c7(),$async$ba)
case 10:s=b
w=2
z=9
break
case 7:w=6
j=v
n=H.C(j)
if(n instanceof M.cv){r=n
q=H.E(j)
n=t.Q
m=H.b(r)+"\nStacktrace: "+H.b(q)
n.toString
l=new A.q(666,null,null,null,null)
l.c="AuthorScriptException: "+m
n.a.E(l.J())
z=1
break}else{p=n
o=H.E(j)
n=t.Q
m=H.b(p)+"\nStacktrace: "+H.b(o)
n.toString
l=new A.q(666,null,null,null,null)
l.c="Unknown Error (probably in egamebook itself): "+m
n.a.E(l.J())
z=1
break}z=9
break
case 6:z=2
break
case 9:case 4:if(J.u(s,!1)){z=3
break}case 5:n=t.Q
n.toString
m=new A.q(667,null,null,null,null)
m.c="Ending _goOneStep() loop."
n.a.E(m.J())
case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$ba,y)},
e9:function(){var z,y
this.eH()
this.f.aV(0)
this.r=!0
this.e=this.c
z=this.Q
Z.hg(Z.bJ())
z.toString
y=new A.q(90,null,null,null,null)
y.b=Z.bJ()
z.a.E(y.J())
this.ba()},
jv:[function(a){var z,y
z={}
z.a=null
y=$.$get$bT()
y.Y(0,new O.nS(z,this,a))
z=z.a
if(z==null)throw H.c(P.F("The sent choice hash ("+H.b(a)+") is not one of those offered ("+J.f(y)+")"))
this.hG(z)
this.ba()},"$1","ghw",2,0,33],
hG:function(a){var z=a.r
if(z!=null)$.$get$cj().aw(z)
z=a.x
if(z!=null)this.dE(z)},
c7:function(){var z=0,y=P.av(),x,w=[],v=this,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$c7=P.as(function(a,a0){if(a===1)return P.aB(a0,y)
while(true)switch(z){case 0:u={}
r=$.$get$ck()
q=r.b
if(q.b!==q.c){u=v.Q
u.toString
q=new A.q(667,null,null,null,null)
q.c="Awarding points."
u.a.E(q.J())
p=r.b.d4()
r=v.Q
q=p.gi6()
u=p.b
o=p.c
r.toString
n=new A.q(70,null,null,null,null)
n.b=[q,u]
n.c=o
r.a.E(n.J())
r=new P.J(0,$.r,null,[null])
r.bf(null)
r.bF(new O.nI(v))
x=!0
z=1
break}r=v.x
q=v.e.d
o=q.length
m=r===o-1||r===v.y
u.a=m
l=v.y
k=r!==l&&r!=null&&r<o&&!!J.p(q[r]).$isL
r="atEndOfPage = "+m+", atStaticChoiceList = "+k
q=v.Q
q.toString
o=new A.q(667,null,null,null,null)
o.c=r
q.a.E(o.J())
o=$.$get$bT()
o.ht(new O.nJ(v),!1)
if(o.gq(o)!==0){r=v.Q
r.toString
q=new A.q(667,null,null,null,null)
q.c="We have choices."
r.a.E(q.J())
q=H.z(o,"b5",0)
q=P.N(new H.I(o,new O.nK(u,k),[q]),!0,q)
r=o.a
H.n([],[L.a9])
j=new L.eK(r,q)
if(!j.ga_(j)){u=v.Q
r=u.e
if(r!=null){r.cW(new D.bX("Showing new choice before previous one was selected."))
u.e=null}r=P.t
u.e=new P.cf(new P.J(0,$.r,null,[r]),[r])
r=j.da()
u.a.E(r.J())
u=u.e.a.bF(v.ghw())
i=new O.nL(v)
r=H.k(u,0)
q=$.r
if(q!==C.k){i=P.ed(i,q)
q.toString}u.cH(new P.e3(null,new P.J(0,q,null,[r]),6,new O.nM(),i,[r,r]))
x=!0
z=1
break}else{h=o.aW(0,new O.nN(),new O.nO())
if(h!=null){r=h.r
if(r!=null)$.$get$cj().aw(r)
r=h.x
if(r!=null)v.dE(r)
o.Z(0,h)}}}r=$.$get$cj()
q=r.b
g=r.c
z=q!==g?3:4
break
case 3:++r.d
u=r.a
g=(g-1&u.length-1)>>>0
r.c=g
f=u[g]
u[g]=null
z=5
return P.ar(v.c9(f),$async$c7)
case 5:x=a0
z=1
break
case 4:r=$.el
if(r!=null){v.dE(r)
$.el=null
x=!1
z=1
break}r=v.x
if(r==null){v.x=0
r=0}else if(r===l){r=v.e.d.length-1
v.x=r}else if($.hC)$.hC=!1
else{++r
v.x=r}q=v.e
u.a=r===q.d.length-1
q="Resolving block: '"+H.b(q.a)+"' block "+H.b(v.x)+"."
r=v.Q
r.toString
l=new A.q(667,null,null,null,null)
l.c=q
r.a.E(l.J())
r=v.x
q=v.e.d
if(r===q.length){u=v.Q
u.toString
r=new A.q(667,null,null,null,null)
r.c="End of book."
u.a.E(r.J())
r=v.Q
u=v.dt()
r.toString
u=u.ee(50)
r.a.E(u.J())
v.Q.a.E(new A.q(80,null,null,null,null).J())
x=!0
z=1
break}r=q[r]
z=typeof r==="string"?6:8
break
case 6:u=v.Q
q=P.ad
u.f=new P.cf(new P.J(0,$.r,null,[q]),[q])
q=new A.q(30,null,null,null,null)
q.c=r
u.a.E(q.J())
u.f.a.bF(new O.nP(v))
x=!0
z=1
break
z=7
break
case 8:z=!!J.p(r).$isL?9:11
break
case 9:r=v.Q
r.toString
q=new A.q(667,null,null,null,null)
q.c="A ChoiceList encountered."
r.a.E(q.J())
try{o.i4(v.e.d[v.x])}catch(b){u=H.C(b)
if(u instanceof M.cv){t=u
s=H.E(b)
u=v.Q
r=H.b(t)+"\nStacktrace: "+H.b(s)
u.toString
q=new A.q(666,null,null,null,null)
q.c="AuthorScriptException: "+r
u.a.E(q.J())
x=!0
z=1
break}else throw b}r=v.Q
r.toString
q=new A.q(667,null,null,null,null)
q.c="- choices added"
r.a.E(q.J())
if(o.b5(0,new O.nQ(u,v))&&v.x===v.e.d.length-1){u=v.Q
u.toString
r=new A.q(667,null,null,null,null)
r.c="Creating & sending savegame"
u.a.E(r.J())
r=v.Q
u=v.dt()
r.toString
u=u.ee(50)
r.a.E(u.J())
x=!1
z=1
break}x=!1
z=1
break
z=10
break
case 11:q={func:1,ret:[P.O,P.ap]}
z=H.at(r,q)?12:14
break
case 12:d=v.x===v.e.d.length-1?v.dt():null
z=15
return P.ar(v.c9(H.hZ(v.e.d[v.x],q)),$async$c7)
case 15:c=a0
if(o.b5(0,new O.nR(u,v))&&v.x===v.e.d.length-1){u=v.Q
u.toString
r=d.ee(50)
u.a.E(r.J())}x=c
z=1
break
z=13
break
case 14:throw H.c(new P.v("Invalid block: "+H.b(v.e.d[v.x])))
case 13:case 10:case 7:case 1:return P.aC(x,y)}})
return P.aD($async$c7,y)},
dE:function(a){var z,y,x,w,v
z=$.$get$cz()
if(z.b.test(H.cl(a))){y=this.d
if(y==null)throw H.c(new P.v("Cannot use ["+J.f(z)+"] when there is no _preGotoPosition."))
x=y.a
w=y.b-1}else{x=this.b.df(a,this.e.gdh())
if(x==null)throw H.c("Function goto() called with an invalid argument '"+H.b(a)+"'. No such page.")
w=null}z=this.d
y=z==null
if((y?null:z.a)!=null){z=y?null:z.a
y=this.e
this.f.u(0,H.b(z.a)+">>"+H.b(y.a))
this.r=!0}if(this.f.ad(0,H.b(this.e.a)+">>"+H.b(x.a))||x.e>0){z=this.d
y=z==null
if((y?null:z.a)!=null)z=!((y?null:z.a).e>0)
else z=!1}else z=!1
$.hA=z
z="Points embargo = "+z
y=this.Q
y.toString
v=new A.q(667,null,null,null,null)
v.c=z
y.a.E(v.J())
v=this.e
this.d=new O.nw(v,this.x)
this.e=x
this.x=w
v.e=v.e+1},
eH:function(){var z,y,x,w,v,u
this.x=null
$.$get$cj().aV(0)
$.$get$bT().sq(0,0)
$.r1=null
x=$.$get$cq()
x.aV(0)
w=$.$get$ck()
x.t(0,"points",w)
w.a=0
w.b.aV(0)
this.b.i8()
$.i7=!0
try{this.iD()}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Author Exception in initBlock() (<variables>): "+w
x.a.E(u.J())
throw H.c(z)}this.fk()
$.i7=!1},
c9:function(a){var z=0,y=P.av(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m
var $async$c9=P.as(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=$.$get$db()
q.C=""
w=4
z=7
return P.ar(a.$0(),$async$c9)
case 7:w=2
z=6
break
case 4:w=3
m=v
s=H.C(m)
r=H.E(m)
q.C+="<code><pre>ERROR: "+H.b(s)+"\n\n"+H.b(r)+"</pre></code>"
q=J.f(s)
o=t.e.a
n=t.x
throw H.c(new M.cv(q,o,n))
z=6
break
case 3:z=2
break
case 6:if(q.C.length!==0){t.Q.em(J.f(q)).bF(new O.nT(t))
x=!0
z=1
break}else{x=!1
z=1
break}case 1:return P.aC(x,y)
case 2:return P.aB(v,y)}})
return P.aD($async$c9,y)},
hz:[function(a){var z,y,x
z=a.x
if(z==null)return!1
if($.$get$cz().b.test(z))return!1
if(this.b.df(z,this.e.gdh())==null){z="Target page '"+z+"' was not found."
y=this.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.E(x.J())
return!0}return!1},"$1","geI",2,0,34],
dt:function(){var z,y,x,w,v,u
this.fk()
try{x=this.e.a
w=$.$get$cq()
x=new Z.fB(x,this.b.iu(),null,null,null,null)
x.c=H.aF(Z.cQ(w),"$isH",[P.m,P.d],"$asH")
x.f=Date.now()
x.e=C.i.jm(H.ay(x),16)
return x}catch(v){z=H.C(v)
y=H.E(v)
x=this.Q
w=H.b(z)+"\n"+H.b(y)
x.toString
u=new A.q(666,null,null,null,null)
u.c="Error when creating savegame: "+w
x.a.E(u.J())
throw H.c(z)}},
fc:function(a,b){var z,y,x
this.eH()
z=this.b
y=z.a
if(y.h(0,a.a)==null)throw H.c(new Z.dm("Trying to load page '"+H.b(a.a)+"' which doesn't exist in current egamebook."))
this.e=y.h(0,a.a)
this.x=this.y
y=this.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c="Importing state from savegame."
y.a.E(x.J())
z.iC(a.b)
if(b!=null){z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Importing player chronology."
z.a.E(y.J())
this.f.au(0,b)}z=this.Q
z.toString
y=new A.q(667,null,null,null,null)
y.c="Copying save variables into vars."
z.a.E(y.J())
y=$.$get$cq()
Z.ns(a,y,P.dw(P.m,P.bz))
this.cx=H.A(y.h(0,"game"),"$iseP")
this.cy=H.aF(y.h(0,"hitpoints"),"$isaq",[P.aX],"$asaq")
z=[P.t]
this.db=H.aF(y.h(0,"stamina"),"$isaq",z,"$asaq")
this.dx=H.aF(y.h(0,"gold"),"$isaq",z,"$asaq")
z=this.Q
Z.hg(Z.bJ())
z.toString
y=new A.q(90,null,null,null,null)
y.b=Z.bJ()
z.a.E(y.J())
y=this.Q
y.toString
z=new A.q(667,null,null,null,null)
z.c="loadFromSaveGame() done."
y.a.E(z.J())
this.ba()},
iQ:function(a){return this.fc(a,null)},
di:[function(a,b,c,d){var z=0,y=P.av(),x,w=this,v,u,t
var $async$di=P.as(function(e,f){if(e===1)return P.aB(f,y)
while(true)switch(z){case 0:v=$.$get$db()
if(v.C.length!==0){w.Q.em(J.f(v))
v.C=""}v=w.Q
v.toString
u=new A.q(130,null,null,null,null)
u.b=[a,b,d,c]
v.a.E(u.J())
u=U.cd
t=new P.J(0,$.r,null,[u])
v.x=new P.cf(t,[u])
x=t
z=1
break
case 1:return P.aC(x,y)}})
return P.aD($async$di,y)},function(a,b){return this.di(a,b,null,!1)},"jt","$4$rerollEffectDescription$rerollable","$2","gfY",4,5,53,1,0]},
nS:{"^":"a:0;a,b,c",
$1:function(a){var z,y,x,w
a.sen(!0)
if(a.d===this.c){z="Found choice that was selected: "+a.e
y=this.b.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.E(x.J())
this.a.a=a}else{z=a.x
if(z!=null){y=this.b
w=$.$get$cz().b.test(z)?y.d.a:y.b.df(z,y.e.gdh())
if(w!=null){y.f.u(0,H.b(y.e.a)+">>"+H.b(w.a))
y.r=!0}}}}},
nI:{"^":"a:0;a",
$1:function(a){return this.a.ba()}},
nJ:{"^":"a:0;a",
$1:function(a){return a.gen()||this.a.hz(a)}},
nK:{"^":"a:36;a,b",
$1:function(a){return a.iJ(this.b,this.a.a)}},
nL:{"^":"a:0;a",
$1:function(a){var z,y,x
z=H.b(a)
y=this.a.Q
y.toString
x=new A.q(667,null,null,null,null)
x.c=z
y.a.E(x.J())
return}},
nM:{"^":"a:0;",
$1:function(a){return a instanceof D.bX}},
nN:{"^":"a:0;",
$1:function(a){return a.giK()}},
nO:{"^":"a:2;",
$0:function(){return}},
nP:{"^":"a:0;a",
$1:function(a){return this.a.ba()}},
nQ:{"^":"a:0;a,b",
$1:function(a){return a.cZ(!0,this.a.a,this.b.geI())}},
nR:{"^":"a:0;a,b",
$1:function(a){return a.cZ(!0,this.a.a,this.b.geI())}},
nT:{"^":"a:0;a",
$1:function(a){return this.a.ba()}},
mX:{"^":"d;a,b,f_:c<",
hV:function(a,b,c){var z
if(!$.hA){z=this.a+b
this.a=z
this.b.aw(new A.cL(b,z,c))}},
u:function(a,b){return this.hV(a,b,null)},
aK:function(a,b){this.u(0,b)
return this},
J:function(){return P.a_(["points",this.a])},
fD:function(a){this.a=a.h(0,"points")
this.b.aV(0)},
h5:function(){this.b=P.b6(null,A.cL)},
$isdQ:1},
cR:{"^":"mG;d,eg:e@,a,b,c"},
nw:{"^":"d;a,b"},
nD:{"^":"d;a",
h:function(a,b){return this.a.h(0,b)},
df:function(a,b){var z
if(b!=null&&this.a.a9(b+": "+H.b(a)))return this.a.h(0,H.b(b)+": "+H.b(a))
else{z=this.a
if(z.a9(a))return z.h(0,a)
else return}},
iu:function(){var z=new H.P(0,null,null,null,null,null,0,[P.m,null])
this.a.Y(0,new O.nF(z))
return z},
iC:function(a){a.Y(0,new O.nG(this))},
i8:function(){this.a.Y(0,new O.nE())}},
nF:{"^":"a:6;a",
$2:function(a,b){this.a.t(0,a,P.a_(["visitCount",b.geg()]))}},
nG:{"^":"a:6;a",
$2:function(a,b){var z=this.a.a
if(z.a9(a))z.h(0,a).seg(J.aG(b,"visitCount"))}},
nE:{"^":"a:6;",
$2:function(a,b){b.seg(0)}}}],["","",,M,{"^":"",cv:{"^":"d;a,b,c",
j:function(a){return"AuthorScriptException at page '"+H.b(this.b)+"', block #"+H.b(this.c)+": "+H.b(this.a)},
A:{
eD:function(a){return new M.cv(a,null,null)}}}}],["","",,M,{"^":"",nH:{"^":"d;"}}],["","",,Z,{"^":"",fB:{"^":"d;a,b,c,d,e,f",
ee:function(a){var z
if(a!==50&&a!==1020)throw H.c("Cannot create Message of type "+a+". Can only be MSG_SAVE_GAME (50) or MSG_LOAD_GAME (1020).")
z=new A.q(a,null,null,null,null)
z.c=this.d9()
return z},
d9:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.m,null])
z.t(0,"uid",this.e)
z.t(0,"currentPageName",this.a)
z.t(0,"pageMapState",this.b)
z.t(0,"vars",this.c)
z.t(0,"timestamp",this.f)
y=this.d
if(y!=null)z.t(0,"previousText",y)
return C.A.f4(z)},
j:function(a){return this.d9()},
A:{
fC:function(a){var z,y
if(a!=null)if(typeof a!=="string"){if(typeof a!=="number"||Math.floor(a)!==a)if(typeof a!=="number")if(typeof a!=="boolean"){z=J.p(a)
z=!!z.$isL||!!z.$isH}else z=!0
else z=!0
else z=!0
y=z}else y=!0
else y=!0
if(y)return!0
return!!J.p(a).$isdQ},
cQ:function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.p(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gq(a);++x)if(Z.fC(z.h(a,x)))y.push(Z.cQ(z.h(a,x)))
return y}else if(!!z.$isH){w=new H.P(0,null,null,null,null,null,0,[null,null])
z.Y(a,new Z.nr(a,w))
return w}else if(!!z.$isdQ){v=a.J()
v.t(0,"_class",a.gf_())
return Z.cQ(v)}else throw H.c("Function _dissolveToPrimitivess called with a non-saveable argument type.")}},
cP:function(a,b,c){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"&&Math.floor(a)===a||typeof a==="number"||typeof a==="boolean")return a
else{z=J.p(a)
if(!!z.$isL){y=[]
for(x=0;x<z.gq(a);++x)y.push(Z.cP(z.h(a,x),b,null))
return y}else{w=!!z.$isH
if(w&&!a.a9("_class")){v=new H.P(0,null,null,null,null,null,0,[null,null])
z.Y(a,new Z.nq(b,v))
return v}else if(w&&a.a9("_class"))if(c!=null){c.fD(a)
return c}else{u=z.h(a,"_class")
if(!b.a9(u))throw H.c(new Z.dm("Constructor for "+H.b(u)+" not set. Cannot assemble a new instance."))
else return b.h(0,u).$1(a)}else throw H.c("Function _assembleFromPrimitives called with a non-primitive argument type.")}}},
ns:function(a,b,c){a.c.Y(0,new Z.nt(b,c))}}},nr:{"^":"a:6;a,b",
$2:function(a,b){if(Z.fC(this.a.h(0,a)))this.b.t(0,a,Z.cQ(b))}},nq:{"^":"a:6;a,b",
$2:function(a,b){this.b.t(0,a,Z.cP(b,this.a,null))}},nt:{"^":"a:37;a,b",
$2:function(a,b){var z,y,x
z=this.a
y=z.h(0,a)
x=this.b
if(y==null)z.t(0,a,Z.cP(b,x,null))
else z.t(0,a,Z.cP(b,x,y))}},dm:{"^":"d;a",
j:function(a){return"IncompatibleSavegameException: "+this.a}},lD:{"^":"d;a",
j:function(a){return"InvalidSavegameException: "+this.a}}}],["","",,D,{"^":"",n2:{"^":"d;"},n1:{"^":"n2;"},lL:{"^":"n1;a,b,c,d,e,f,r,x",
jw:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
o=P.m
n=[o,P.d]
H.aF(a,"$isH",n,"$asH")
m=new A.q(a.h(0,"type"),null,null,null,null)
if(a.a9("strContent"))m.c=a.h(0,"strContent")
if(a.a9("listContent"))m.b=a.h(0,"listContent")
if(a.a9("intContent"))m.d=a.h(0,"intContent")
if(a.a9("mapContent"))m.e=H.aF(a.h(0,"mapContent"),"$isH",n,"$asH")
z=m
switch(z.gfA()){case 1070:o=this.e
if(o!=null){o.cW(new D.bX("Book Quit before choice was selected."))
this.e=null}o=this.b
o.a.bk()
o.b.bk()
return
case 1000:o=new A.q(667,null,null,null,null)
o.c="GET_BOOK_UID received."
n=this.a
n.E(o.J())
n.E(new A.q(10,null,this.c.ch,null,null).J())
return
case 1050:l=z.giE()
this.e.bx(l)
this.e=null
return
case 1060:o=new A.q(667,null,null,null,null)
o.c="New form state from player received."
this.a.E(o.J())
o=z.giS()
if(!o.a9("__submitted__"))o.t(0,"__submitted__",!1)
n=this.r
if(n.b>=4)H.e(n.bO())
n.c4(new G.k2(o))
return
case 1080:o=new A.q(667,null,null,null,null)
o.c="Received slot machine result."
this.a.E(o.J())
k=J.aG(z.ge2(),0)
j=J.aG(z.ge2(),1)
this.x.bx(new U.cd(C.Y[k],j))
this.x=null
return
case 1010:o=new A.q(667,null,null,null,null)
o.c="Starting book from scratch."
n=this.a
n.E(o.J())
o=this.e
if(o!=null){o.cW(new D.bX("Book Restart before choice was selected."))
this.e=null}try{this.c.e9()}catch(i){y=H.C(i)
x=H.E(i)
o=new A.q(666,null,null,null,null)
o.c="An error occured when initializing: "+H.b(y)+".\n"+H.b(x)
n.E(o.J())
throw H.c(y)}o=new A.q(90,null,null,null,null)
o.b=Z.bJ()
n.E(o.J())
n.E(new A.cL(0,0,null).da().J())
return
case 1020:h=new A.q(667,null,null,null,null)
h.c="Loading a saved game."
g=this.a
g.E(h.J())
h=this.e
if(h!=null){h.cW(new D.bX("Book Load before choice was selected."))
this.e=null}try{h=z.c
f=new Z.fB(null,null,null,null,null,null)
e=H.aF(C.A.ih(h),"$isH",n,"$asH")
if(!e.a9("currentPageName")||!e.a9("vars"))H.e(new Z.lD("Invalid JSON for Savegame. Doesn't contain required fields 'currentPageName' or 'vars'. JSON='"+H.b(h)+"'."))
f.e=e.h(0,"uid")
f.a=e.h(0,"currentPageName")
f.f=e.h(0,"timestamp")
f.b=H.aF(e.h(0,"pageMapState"),"$isH",n,"$asH")
f.c=H.aF(e.h(0,"vars"),"$isH",n,"$asH")
if(e.a9("previousText"))f.d=e.h(0,"previousText")
w=f
v=H.aF(J.iM(z.ge2()),"$isdR",[o],"$asdR")
o=this.c
if(v!=null)o.fc(w,v)
else o.iQ(w)}catch(i){o=H.C(i)
if(o instanceof Z.dm){u=o
t=H.E(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed due to incompatibility: "+H.b(u)+".\n"+H.b(t)
g.E(o.J())
this.c.e9()}else{s=o
r=H.E(i)
o=new A.q(666,null,null,null,null)
o.c="Load failed for unknown reason: "+H.b(s)+".\n"+H.b(r)
g.E(o.J())
this.c.e9()}}try{o=new A.q(90,null,null,null,null)
o.b=Z.bJ()
g.E(o.J())}catch(i){q=H.C(i)
p=H.E(i)
o=new A.q(666,null,null,null,null)
o.c="Sending Stats failed for unknown reason: "+H.b(q)+".\n"+H.b(p)
g.E(o.J())
throw H.c(q)}this.c.toString
g.E(new A.cL(0,$.$get$ck().a,null).da().J())
return
case 1090:this.f.bx(!0)
this.f=null
return
case 1040:this.c.ba()
return
default:o=new A.q(666,null,null,null,null)
o.c="Wrong message type received by Scripter - "+H.b(z.gfA())+"."
this.a.E(o.J())}},"$1","ghE",2,0,16],
em:function(a){var z=P.ad
this.f=new P.cf(new P.J(0,$.r,null,[z]),[z])
z=new A.q(30,null,null,null,null)
z.c=a
this.a.E(z.J())
return this.f.a}},bX:{"^":"d;a",
j:function(a){return"AsyncOperationOverridenException: "+this.a+"."}}}],["","",,G,{"^":"",k2:{"^":"d;a",
j:function(a){return"<CurrentState submitted="+H.b(this.a.h(0,"__submitted__"))+">"}}}],["","",,A,{"^":"",q:{"^":"d;fA:a<,e2:b<,c,iE:d<,iS:e<",
gjo:function(){var z=this.a
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
d9:function(){return C.A.f4(this.J())},
J:function(){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.m,P.d])
z.t(0,"type",this.a)
y=this.c
if(y!=null)z.t(0,"strContent",y)
y=this.b
if(y!=null)z.t(0,"listContent",y)
y=this.d
if(y!=null)z.t(0,"intContent",y)
y=this.e
if(y!=null)z.t(0,"mapContent",y)
return z},
j:function(a){var z,y
z="Message "+this.gjo()
y=this.a
return z+(y===50||y===60||y===90||y===100||y===666||y===667?" (async)":"")}}}],["","",,E,{"^":"",mG:{"^":"d;m:a<",
j:function(a){return this.a},
gdh:function(){var z,y
z=this.a
if(z==null)throw H.c("Accessed groupName Page has name = null.")
y=C.c.b_(z,": ")
if(y>0)return C.c.av(z,0,y)
else return}}}],["","",,A,{"^":"",cL:{"^":"d;i6:a<,b,c",
j:function(a){var z="Score +"+this.a+"."
return z},
da:function(){var z=new A.q(70,null,null,null,null)
z.b=[this.a,this.b]
z.c=this.c
return z}}}],["","",,L,{"^":"",a9:{"^":"d;en:a@,b,c,d,bb:e<,f,r,x,y",
giK:function(){return this.e.length===0},
cZ:function(a,b,c){if(this.a)return!1
if(this.e.length===0)return!1
b!=null
a!=null
if(c!=null&&c.$1(this))return!1
return!0},
iJ:function(a,b){return this.cZ(a,b,null)},
jk:function(){return P.a_(["string",this.e,"hash",this.d,"submenu",this.y,"helpMessage",this.f])},
bF:function(a){this.r=a
return this},
bw:function(a,b){return C.c.bw(this.e,b.e)},
j:function(a){return"Choice: "+this.e+" ["+H.b(this.x)+"] ("+this.d+")"},
h2:function(a,b,c,d,e,f,g){if(a==null)throw H.c(P.F("String given to choice cannot be null."))
this.e=C.c.dc(a)
this.d=C.c.gB(a)
this.r=f
this.b=!1
this.c=!1},
$isZ:1,
$asZ:function(){return[L.a9]},
A:{
eJ:function(a,b,c,d,e,f,g){var z=new L.a9(!1,null,null,null,null,e,null,d,g)
z.h2(a,!1,!1,d,e,f,g)
return z}}},eK:{"^":"fa;a,b",
gq:function(a){return this.b.length},
sq:function(a,b){C.a.sq(this.b,b)
return b},
h:function(a,b){return this.b[b]},
t:function(a,b,c){this.b[b]=c},
i4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
v=a[0]
if(v!=null&&!!J.p(v).$isbz)try{this.a=v.$0()}catch(u){z=H.C(u)
v=M.eD(J.f(z))
throw H.c(v)}else this.a=null
for(v=this.b,t={func:1,ret:[P.O,P.ap]},s=1;s<a.length;++s){y=a[s]
x=null
if(J.aG(y,"string")!=null&&!!J.p(J.aG(y,"string")).$isbz)try{x=J.aG(y,"string").$0()}catch(u){w=H.C(u)
v=M.eD(J.f(w))
throw H.c(v)}else x=""
r=x
q=J.aG(y,"goto")
p=H.hZ(J.aG(y,"script"),t)
o=new L.a9(!1,null,null,null,null,null,null,q,J.aG(y,"submenu"))
if(r==null)H.e(P.F("String given to choice cannot be null."))
o.e=J.bt(r).dc(r)
o.d=C.c.gB(r)
o.r=p
o.b=!1
o.c=!1
C.a.u(v,o)}},
i0:function(a,b,c,d,e,f,g){if(b instanceof L.a9)C.a.u(this.b,b)
else if(typeof b==="string")C.a.u(this.b,L.eJ(b,!1,!1,e,null,f,g))
else throw H.c(P.F("To add a choice to choices, one must provide either a new Choice element or a String."))},
u:function(a,b){return this.i0(a,b,!1,!1,null,null,null)},
jl:function(a,b,c,d){var z,y,x,w
z=this.b
y=H.k(z,0)
x=P.N(new H.I(z,new L.jI(b,a,c),[y]),!0,y)
if(x.length===0)throw H.c("Choices is empty, but still choices.toMessage was called.")
w=new A.q(40,null,null,null,null)
z=[]
w.b=z
z.push(d)
z.push(this.a)
C.a.Y(x,new L.jJ(w))
return w},
da:function(){return this.jl(null,null,null,null)},
j:function(a){var z=this.b
return new H.aj(z,new L.jK(),[H.k(z,0),null]).cq(0,", ")},
$asfa:function(){return[L.a9]},
$asfj:function(){return[L.a9]},
$asL:function(){return[L.a9]},
$asaa:function(){return[L.a9]}},jI:{"^":"a:0;a,b,c",
$1:function(a){return a.cZ(this.b,this.a,this.c)}},jJ:{"^":"a:0;a",
$1:function(a){H.b(a)
J.iD(this.a.b,a.jk())
a.a=!0}},jK:{"^":"a:0;",
$1:function(a){return H.b(a)}}}],["","",,Z,{"^":"",cS:{"^":"d;a,bb:b<"},oi:{"^":"d;a",
J:function(){var z=new H.P(0,null,null,null,null,null,0,[P.m,P.d])
this.a.Y(0,new Z.oj(z))
return z},
Y:function(a,b){this.a.Y(0,b)}},oj:{"^":"a:38;a",
$2:function(a,b){this.a.t(0,a,P.a_(["show",b.a,"string",b.b]))}},hf:{"^":"d;m:a<,bc:b<,c,e5:d<,e,f,bb:r<",A:{
hg:function(a){var z,y,x,w,v
z=H.n(new Array(a.length),[Z.hf])
for(y=a.length,x=0,w=0;w<a.length;a.length===y||(0,H.au)(a),++w){v=a[w]
z[x]=new Z.hf(v.h(0,"name"),v.h(0,"description"),v.h(0,"color"),v.h(0,"priority"),v.h(0,"show"),v.h(0,"notifyOnChange"),v.h(0,"string"));++x}C.a.bL(z,new Z.p8())
return z}}},p8:{"^":"a:6;",
$2:function(a,b){return b.ge5()-a.ge5()}},aq:{"^":"d;m:a<,bc:b<,c,d,e5:e<,f,r,x,i7:y<,f_:z<,$ti",
gai:function(){return this.f},
sai:function(a){if(!J.u(this.f,a)){this.f=a
this.y=!0
$.bj=!0}},
gbb:function(){return this.c.$1(this.f)},
J:function(){return P.a_(["name",this.a,"value",this.f,"show",this.r])},
fD:function(a){var z,y
this.sai(H.io(a.h(0,"value"),H.k(this,0)))
z=a.h(0,"show")
y=this.r
if(y==null?z!=null:y!==z){this.r=z
this.y=!0
$.bj=!0}},
$isdQ:1,
A:{
bI:function(a,b,c,d,e,f,g,h){var z,y
z=$.$get$cT()
y=z.a9(a)?H.aF(z.h(0,a),"$isaq",[h],"$asaq"):new Z.aq(a,d,b,c,f,null,null,!0,!1,"Stat",[null])
y.f=H.io(e,h)
y.r=!0
z.t(0,a,y)
return y},
ol:function(){var z,y
z=new Z.oi(new H.P(0,null,null,null,null,null,0,[P.m,Z.cS]))
y=$.$get$cT().gc_()
new H.I(y,new Z.om(),[H.z(y,"y",0)]).Y(0,new Z.on(z))
$.bj=!1
return z},
bJ:function(){var z=H.n([],[[P.H,P.m,P.d]])
$.$get$cT().gc_().Y(0,new Z.ok(z))
return z}}},om:{"^":"a:0;",
$1:function(a){return a.gi7()}},on:{"^":"a:26;a",
$1:function(a){var z,y
z=a.r
y=a.f
y=a.c.$1(y)
a.y=!1
this.a.a.t(0,a.a,new Z.cS(z,y))}},ok:{"^":"a:26;a",
$1:function(a){var z,y
z=new H.P(0,null,null,null,null,null,0,[P.m,P.d])
z.t(0,"name",a.a)
z.t(0,"description",a.b)
z.t(0,"color",a.d)
z.t(0,"priority",a.e)
z.t(0,"show",a.r)
a.x
z.t(0,"notifyOnChange",!0)
y=a.f
z.t(0,"string",a.c.$1(y))
this.a.push(z)}}}],["","",,N,{"^":"",dy:{"^":"d;m:a<,b,c,d,e,f",
gf7:function(){var z,y,x
z=this.b
y=z==null||z.a===""
x=this.a
return y?x:z.gf7()+"."+x},
gfb:function(){if($.i6){var z=this.b
if(z!=null)return z.gfb()}return $.r9},
iR:function(a,b,c,d,e){var z,y,x,w,v,u
x=a.b
if(x>=this.gfb().b){if(!!J.p(b).$isbz)b=b.$0()
w=b
if(typeof w!=="string")b=J.f(b)
if(d==null&&x>=$.uM.b)try{x="autogenerated stack trace for "+a.j(0)+" "+H.b(b)
throw H.c(x)}catch(v){z=H.C(v)
y=H.E(v)
d=y
if(c==null)c=z}this.gf7()
Date.now()
$.fb=$.fb+1
if($.i6)for(u=this;u!=null;)u=u.b
else $.$get$fd().f}},
T:function(a,b,c,d){return this.iR(a,b,c,d,null)},
A:{
be:function(a){return $.$get$fc().j2(a,new N.rY(a))}}},rY:{"^":"a:2;a",
$0:function(){var z,y,x,w
z=this.a
if(C.c.cF(z,"."))H.e(P.F("name shouldn't start with a '.'"))
y=C.c.iO(z,".")
if(y===-1)x=z!==""?N.be(""):null
else{x=N.be(C.c.av(z,0,y))
z=C.c.be(z,y+1)}w=new H.P(0,null,null,null,null,null,0,[P.m,N.dy])
w=new N.dy(z,x,null,w,new P.hi(w,[null,null]),null)
if(x!=null)x.d.t(0,z,w)
return w}},aU:{"^":"d;m:a<,ai:b<",
R:function(a,b){if(b==null)return!1
return b instanceof N.aU&&this.b===b.b},
bJ:function(a,b){return C.i.bJ(this.b,b.gai())},
cB:function(a,b){return C.i.cB(this.b,b.gai())},
bw:function(a,b){return this.b-b.b},
gB:function(a){return this.b},
j:function(a){return this.a},
$isZ:1,
$asZ:function(){return[N.aU]}}}],["","",,X,{"^":"",
bu:function(a){return X.d1(J.iF(a,0,new X.up()))},
aW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
d1:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
up:{"^":"a:6;",
$2:function(a,b){return X.aW(a,J.h(b))}},
dG:{"^":"c3;a,$ti",
gai:function(){var z=this.a
if(z==null)throw H.c(new P.v("value called on absent Optional."))
return z},
aH:function(a){var z=this.a
return z==null?a:z},
ga0:function(a){var z=this.a
if(z!=null){z=H.n([z],this.$ti)
z=new J.b2(z,1,0,null,[H.k(z,0)])}else z=C.N
return z},
gB:function(a){return J.h(this.a)},
R:function(a,b){var z,y
if(b==null)return!1
if(b instanceof X.dG){z=b.a
y=this.a
y=z==null?y==null:z===y
z=y}else z=!1
return z},
j:function(a){var z=this.a
return z==null?"Optional { absent }":"Optional { value: "+H.b(z)+" }"},
h4:function(a,b){if(this.a==null)throw H.c(P.F("Must not be null."))},
A:{
fn:function(a,b){var z=new X.dG(a,[b])
z.h4(a,b)
return z}}}}],["","",,U,{"^":"",cN:{"^":"d;a,b",
j:function(a){return this.b}},cd:{"^":"d;a,jp:b<",
ge0:function(){return this.a===C.J},
j:function(a){return"SessionResult<"+this.a.b+",wasRerolled="+H.b(this.b)+">"},
R:function(a,b){var z,y
if(b==null)return!1
if(b instanceof U.cd)if(b.a===this.a){z=b.b
y=this.b
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1
return z},
gB:function(a){return(this.b?2:1)*100+this.a.a}}}],["","",,X,{"^":"",
xm:[function(a,b){var z,y,x,w,v
z=new D.lL(b,null,null,null,null,null,null,null)
y=$.fy
$.fy=y+1
x=new H.cb(y,null,!1)
w=init.globalState.d
w.dm(y,x)
w.cf()
w=new H.nb(x,null)
w.h6(x)
z.b=w
w=w.b
w.toString
new P.cW(w,[H.k(w,0)]).bm(z.ghE(),null,null,null)
b.E(new H.ch(z.b.a,init.globalState.d.a))
v=N.ny()
z.c=v
v.Q=z},"$2","hU",4,0,35]},1]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.f0.prototype
return J.lN.prototype}if(typeof a=="string")return J.c6.prototype
if(a==null)return J.f1.prototype
if(typeof a=="boolean")return J.f_.prototype
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.aQ=function(a){if(a==null)return a
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.V=function(a){if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(a.constructor==Array)return J.c4.prototype
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.bU=function(a){if(typeof a=="number")return J.c5.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.ek=function(a){if(typeof a=="number")return J.c5.prototype
if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.bt=function(a){if(typeof a=="string")return J.c6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bl.prototype
return a}
J.iz=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ek(a).aK(a,b)}
J.cr=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.bU(a).eh(a,b)}
J.u=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).R(a,b)}
J.ao=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bU(a).cB(a,b)}
J.iA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bU(a).bJ(a,b)}
J.iB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ek(a).c0(a,b)}
J.iC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.bU(a).c1(a,b)}
J.aG=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string")if(b>>>0===b&&b<a.length)return a[b]
return J.V(a).h(a,b)}
J.iD=function(a,b){return J.aQ(a).u(a,b)}
J.bv=function(a,b,c){return J.aQ(a).l(a,b,c)}
J.iE=function(a,b,c){return J.bt(a).cS(a,b,c)}
J.bw=function(a,b){return J.ek(a).bw(a,b)}
J.bW=function(a,b){return J.V(a).ad(a,b)}
J.ey=function(a,b){return J.aQ(a).aq(a,b)}
J.iF=function(a,b,c){return J.aQ(a).b6(a,b,c)}
J.h=function(a){return J.p(a).gB(a)}
J.ez=function(a){return J.V(a).ga_(a)}
J.ah=function(a){return J.aQ(a).ga0(a)}
J.aS=function(a){return J.V(a).gq(a)}
J.iG=function(a){return J.p(a).geb(a)}
J.iH=function(a,b){return J.V(a).b_(a,b)}
J.eA=function(a,b){return J.aQ(a).bn(a,b)}
J.iI=function(a,b,c){return J.bt(a).fd(a,b,c)}
J.iJ=function(a,b,c){return J.bt(a).j6(a,b,c)}
J.iK=function(a){return J.bU(a).jf(a)}
J.iL=function(a,b){return J.aQ(a).dj(a,b)}
J.eB=function(a,b){return J.bt(a).cF(a,b)}
J.iM=function(a){return J.aQ(a).ef(a)}
J.f=function(a){return J.p(a).j(a)}
J.iN=function(a,b){return J.bU(a).b9(a,b)}
J.iO=function(a,b){return J.aQ(a).bH(a,b)}
I.aR=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.Q=J.aT.prototype
C.a=J.c4.prototype
C.R=J.f_.prototype
C.i=J.f0.prototype
C.S=J.f1.prototype
C.m=J.c5.prototype
C.c=J.c6.prototype
C.K=new A.ai(0,0,0)
C.L=new A.ai(-1/0,-1/0,-1/0)
C.M=new A.ct(-10,0,100)
C.N=new H.kO([null])
C.O=new P.mF()
C.x=new P.q4()
C.P=new P.qm()
C.k=new P.qA()
C.E=new P.by(0)
C.F=new U.bA(0,"ItemType.fist")
C.y=new U.bA(1,"ItemType.shield")
C.v=new U.bA(2,"ItemType.spear")
C.z=new U.bA(3,"ItemType.sword")
C.T=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.A=new P.lS(null,null)
C.U=new P.lU(null)
C.V=new P.lV(null,null)
C.W=new O.m2(0,"KnownToMode.all")
C.l=new N.aU("FINER",400)
C.j=new N.aU("FINEST",300)
C.q=new N.aU("FINE",500)
C.B=new N.aU("INFO",800)
C.X=new N.aU("OFF",2000)
C.C=new N.aU("SEVERE",1000)
C.D=new N.aU("WARNING",900)
C.J=new U.cN(0,"Result.success")
C.a5=new U.cN(1,"Result.failure")
C.a6=new U.cN(2,"Result.criticalSuccess")
C.a7=new U.cN(3,"Result.criticalFailure")
C.Y=I.aR([C.J,C.a5,C.a6,C.a7])
C.Z=I.aR(["cave_with_agruth","guardpost_above_church","orcthorn_room","slave_quarters_passage","smelter","underground_church","war_forge"])
C.a_=I.aR([C.F])
C.a0=I.aR([C.y])
C.G=I.aR([C.v])
C.r=I.aR([C.z])
C.h=I.aR([])
C.a1=I.aR(['Briana spits on the floor. "Can\'t wait to see some actual architecture \n  when we get out of here."',"Somewhere in the distance, there are yells that rise in intensity, \n  then suddenly stop entirely.",'Briana turns to you with an intense whisper. \n  "You know, I _have_ a right to hate orcs." \n  \n  "I didn\'t know people need to have a right to hate them, to be honest." \n  \n  She observes you for a moment. "I\'m glad we are in agreement."',"More yells from the distance.","Briana stops and listens for a moment. \"Aren, we're pushing our luck. \n  I'd hate to go all this way only to get \n  my head smashed in by some random orc patrol."])
C.a2=new H.jU(0,{},C.h,[null,null])
C.a3=new X.dG(null,[P.K])
C.d=new R.dJ(0,"Pose.standing")
C.f=new R.dJ(1,"Pose.offBalance")
C.b=new R.dJ(2,"Pose.onGround")
C.n=new K.dK(0,"Predetermination.none")
C.t=new K.dK(1,"Predetermination.successGuaranteed")
C.o=new K.dK(2,"Predetermination.failureGuaranteed")
C.w=new Y.c8("he","him","his","himself")
C.p=new Y.c8("it","it","its","itself")
C.a4=new Y.c8("she","her","her","herself")
C.H=new Y.c8("they","them","their","themselves")
C.I=new Y.c8("you","you","your","yourself")
C.e=new Q.ng(0,"Resource.stamina")
C.a8=H.hT("ap")
C.u=H.hT("dynamic")
C.a9=new P.bN(null,2)
$.fy=1
$.fs="$cachedFunction"
$.ft="$cachedInvocation"
$.aH=0
$.bx=null
$.eF=null
$.bo=null
$.bQ=null
$.bR=null
$.ea=!1
$.r=C.k
$.eS=0
$.el=null
$.hA=!1
$.r1=null
$.hC=!1
$.i7=!0
$.bj=!1
$.i6=!1
$.uM=C.X
$.r9=C.B
$.fb=0
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
I.$lazy(y,x,w)}})(["eX","$get$eX",function(){return H.lJ()},"eY","$get$eY",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eS
$.eS=z+1
z="expando$key$"+z}return new P.kU(null,z,[P.t])},"h4","$get$h4",function(){return H.aK(H.cV({
toString:function(){return"$receiver$"}}))},"h5","$get$h5",function(){return H.aK(H.cV({$method$:null,
toString:function(){return"$receiver$"}}))},"h6","$get$h6",function(){return H.aK(H.cV(null))},"h7","$get$h7",function(){return H.aK(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hb","$get$hb",function(){return H.aK(H.cV(void 0))},"hc","$get$hc",function(){return H.aK(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"h9","$get$h9",function(){return H.aK(H.ha(null))},"h8","$get$h8",function(){return H.aK(function(){try{null.$method$}catch(z){return z.message}}())},"he","$get$he",function(){return H.aK(H.ha(void 0))},"hd","$get$hd",function(){return H.aK(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dZ","$get$dZ",function(){return P.pN()},"bd","$get$bd",function(){var z,y
z=P.ap
y=new P.J(0,P.pp(),null,[z])
y.hd(null,z)
return y},"bS","$get$bS",function(){return[]},"d5","$get$d5",function(){return new K.T("fist",P.ax(C.a_,null))},"bE","$get$bE",function(){return N.be("PlannerRecommendation")},"hW","$get$hW",function(){return new K.rk()},"ei","$get$ei",function(){var z=$.$get$hW()
return K.W("__END_OF_ROAM__",z,z,null,null,[],"ground")},"a7","$get$a7",function(){return P.dO(null)},"bG","$get$bG",function(){return P.dO(null)},"i9","$get$i9",function(){return N.be("Storyline")},"fT","$get$fT",function(){return P.bg("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},"br","$get$br",function(){return L.dY(new L.rX())},"aE","$get$aE",function(){return L.dY(new L.rn())},"d8","$get$d8",function(){return L.dY(new L.rW())},"dH","$get$dH",function(){return new F.mK("Sometimes, patience pays off. Especially when the other option is potentially dangerous.",!1,!0,!1,null,null)},"eg","$get$eg",function(){return Y.c_(!1,"balance",!0,C.p,$.$get$aE())},"id","$get$id",function(){return Y.c_(!1,"pounding",!1,C.p,$.$get$aE())},"fz","$get$fz",function(){return new B.ne("Most moves are easier and more effective when you are firmly in balance.",!1,!0,!1,null,null)},"fD","$get$fD",function(){return new O.nu(null,!1,!0,!1,null,null)},"fS","$get$fS",function(){return new Q.oe(null,!1,!0,!0,C.e,null)},"hh","$get$hh",function(){return new M.p9("",!0,C.e,!1,!0,null)},"hB","$get$hB",function(){return P.dO(null)},"eE","$get$eE",function(){return new Z.jl(!1,!0,!1,null,null)},"ir","$get$ir",function(){return Y.c_(!1,"swing",!0,C.p,$.$get$aE())},"iq","$get$iq",function(){return Y.c_(!1,"swing",!0,C.p,$.$get$aE())},"ip","$get$ip",function(){return Y.c_(!1,"swing",!0,C.p,$.$get$aE())},"fp","$get$fp",function(){return X.fn(0,P.K)},"fq","$get$fq",function(){return X.fn(1,P.K)},"fM","$get$fM",function(){return new D.o9(!1,!1,!0,null,null)},"cn","$get$cn",function(){return G.oL(!1,!0,"Orcthorn",!0,2,2)},"e9","$get$e9",function(){return Z.od(!1,!1,"spear",!1,1)},"ef","$get$ef",function(){return new O.pb(1e4)},"hO","$get$hO",function(){return K.W("cave_with_agruth_pre",new V.rR(),new V.rS(),null,null,H.n([new Q.o("cave_with_agruth","","You look around.",null)],[Q.o]),"ground")},"hN","$get$hN",function(){return K.W("cave_with_agruth",new V.rP(),new V.rQ(),null,null,H.n([new Q.o("underground_church","Go to the Unholy Church","You make it to the Church undetected.",null),new Q.o("war_forge","Go to the war forges","You sneak your way through the black passage, closing towards the sound of hundreds of anvils.",null),new Q.o("slave_quarters_passage","Go to the slave quarters","You and Briana hug the wall and start towards the slave quarters.",null)],[Q.o]),"ground")},"fE","$get$fE",function(){return new V.nU("Search Agruth","search_agruth",!0,null)},"hX","$get$hX",function(){return K.W("exit_from_bloodrock",new V.rN(),new V.rO(),null,null,H.n([new Q.o("__END_OF_ROAM__","","N/A",null)],[Q.o]),"ground")},"hY","$get$hY",function(){return K.W("forge_church_crevice",new V.rL(),new V.rM(),null,null,H.n([new Q.o("tunnel","Continue along the crevice","You continue until the crevice open into a tunnel. You can smell fresh air.",null)],[Q.o]),"ground")},"i5","$get$i5",function(){return K.W("guardpost_above_church",new V.rJ(),new V.rK(),null,null,H.n([new Q.o("underground_church","Descend towards the Underground Church","You take the passage leading down towards the temple.",null),new Q.o("smelter","Go to the smelter","You take the slightly downwards passage towards the smelter.",null)],[Q.o]),"ground")},"eU","$get$eU",function(){return new V.ln("Go to the Upper Gate","guardpost_above_church_enter_tunnel_with_cancel",!0,null)},"eW","$get$eW",function(){return new V.lo("Cautiously take the shield","guardpost_above_church_take_shield",!0,null)},"i8","$get$i8",function(){return K.W("just_after_agruth_fight",new V.rG(),new V.rH(),null,null,H.n([],[Q.o]),"ground")},"fg","$get$fg",function(){return new V.ml('"Luck Bringer"',"name_agruth_sword_opportunity",!0,null)},"fh","$get$fh",function(){return new V.mm('"Savior"',"name_agruth_sword_redemption",!0,null)},"ff","$get$ff",function(){return new V.mk("No name","name_agruth_sword_nothing",!0,null)},"ib","$get$ib",function(){return K.W("orcthorn_door",new V.rE(),new V.rF(),null,null,H.n([new Q.o("cave_with_agruth","Go to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.o("slave_quarters","Go further towards the Gate of Screams","TODO",null),new Q.o("orcthorn_room","Open the door","You open the door.",null)],[Q.o]),"ground")},"ic","$get$ic",function(){return K.W("orcthorn_room",new V.rC(),new V.rD(),O.ws(),null,H.n([new Q.o("slave_quarters_passage","Exit the room","You leave through the door and find yourself back in the corridor of the slave quarters.",null)],[Q.o]),"ground")},"fY","$get$fY",function(){return new V.oT("Search for Orcthorn","take_orcthorn",!0,null)},"ie","$get$ie",function(){return K.W("slave_quarters",new V.rA(),new V.rB(),null,null,H.n([new Q.o("slave_quarters_passage","Go back","You nod, and start carefully backing out through the passage.",null)],[Q.o]),"ground")},"fK","$get$fK",function(){return new V.o6("Continue","slave_quarters_continue",!0,null)},"ig","$get$ig",function(){return K.W("slave_quarters_passage",new V.ry(),new V.rz(),O.wt(),null,H.n([new Q.o("cave_with_agruth","Go back to the cave with Agruth's corpse","You back out from the door, and go back where you left Agruth's body.",null),new Q.o("slave_quarters","Go further towards the Gate of Screams","You start down the slope of the passage, towards the heart of the slave quarters and the Gate of Screams beyond. Briana tugs at your hand.",null),new Q.o("orcthorn_room","Open the door","You open the door.",null)],[Q.o]),"ground")},"fL","$get$fL",function(){return new V.o8("Examine the door","slave_quarters_passage_examine_door",!0,null)},"ih","$get$ih",function(){return K.W("smelter",new V.rv(),new V.rw(),null,null,H.n([new Q.o("war_forge","Go to the war forges","You walk through a short passage set in stone, towards the sound of hundreds of anvils.",null),new Q.o("guardpost_above_church","Go through the smooth passage","You take the smooth passage and it leads you slightly upwards.",null)],[Q.o]),"ground")},"fN","$get$fN",function(){return new V.ob("Look around","smelter_look_around",!0,null)},"fO","$get$fO",function(){return new V.oc("Throw spear at the ogre","smelter_throw_spear",!0,null)},"ii","$get$ii",function(){return K.W("start_adventure",new V.rt(),new V.ru(),O.wq(),null,H.n([new Q.o("just_after_agruth_fight","","You look around. Fortunately, nobody is in sight.",null)],[Q.o]),"ground")},"h_","$get$h_",function(){return new V.oV("Talk to Briana","talk_to_briana_1",!0,null)},"h0","$get$h0",function(){return new V.oW("Ask Briana about her capture","talk_to_briana_2",!0,null)},"h1","$get$h1",function(){return new V.oX("Ask Briana about Orcthorn","talk_to_briana_3",!0,null)},"is","$get$is",function(){return K.W("the_shafts",new V.rr(),new V.rs(),null,null,H.n([new Q.o("tunnel","Run","You run over the passage. Orcs start to scream and yell commands. As you near the entrance, the air gets better.",null)],[Q.o]),"ground")},"iu","$get$iu",function(){return K.W("tunnel",new V.th(),new V.ti(),O.wr(),null,H.n([new Q.o("exit_from_bloodrock","Start running again","You start running again.",null)],[Q.o]),"ground")},"iv","$get$iv",function(){return K.W("tunnel_cancel_chance",new V.te(),new V.tg(),null,null,H.n([new Q.o("tunnel","Continue","You shake your head and continue through the passage. Soon, you find yourself climbing a steep, poorly lit stairway. Briana catches up with you.",null),new Q.o("guardpost_above_church","Return","You nod, and step back into the circular room.",null)],[Q.o]),"ground")},"iw","$get$iw",function(){return K.W("underground_church",new V.rT(),new V.t3(),null,null,H.n([new Q.o("guardpost_above_church","Enter the upwards passage","You take the sloping passage and go a long, slightly rising way.",null),new Q.o("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak out of the church, back towards where you left Agruth's body.",null),new Q.o("underground_church_altar","Go towards the altar","You sneak towards the front of the temple, trying to stay in the shadows.",null)],[Q.o]),"ground")},"eR","$get$eR",function(){return new V.kT("Look around","examine_underground_church",!0,null)},"ix","$get$ix",function(){return K.W("underground_church_altar",new V.rx(),new V.rI(),null,null,H.n([new Q.o("underground_church","Sneak back","You crouch low and, keeping an eye on the altar, head back to the Church's entrance.",null)],[Q.o]),"ground")},"hj","$get$hj",function(){return new V.pd("Wait","wait_for_ritual",!0,null)},"fZ","$get$fZ",function(){return new V.oU("Take the spear","take_spear_in_underground_church",!0,null)},"iy","$get$iy",function(){return K.W("war_forge",new V.rl(),new V.rm(),null,null,H.n([new Q.o("smelter","Go to smelter","You keep low, ascending the stairs. At the top you sense a draft of hot air coming from a passage through the wall. You make your way through it.",null),new Q.o("cave_with_agruth","Go back to the cave with Agruth's corpse","You sneak back towards where you left Agruth's body.",null)],[Q.o]),"ground")},"hk","$get$hk",function(){return new V.pe("Look around","war_forge_look_around",!0,null)},"hl","$get$hl",function(){return new V.pf("Watch the workers","war_forge_watch_workers",!0,null)},"hI","$get$hI",function(){return H.n([$.$get$hO(),$.$get$hN(),$.$get$hX(),$.$get$hY(),$.$get$i5(),$.$get$i8(),$.$get$ib(),$.$get$ic(),$.$get$ie(),$.$get$ig(),$.$get$ih(),$.$get$ii(),$.$get$is(),$.$get$iu(),$.$get$iv(),$.$get$iw(),$.$get$ix(),$.$get$iy()],[K.cc])},"hH","$get$hH",function(){return H.n([$.$get$fE(),$.$get$eU(),$.$get$eW(),$.$get$fg(),$.$get$fh(),$.$get$ff(),$.$get$fY(),$.$get$fK(),$.$get$fL(),$.$get$fN(),$.$get$fO(),$.$get$h_(),$.$get$h0(),$.$get$h1(),$.$get$eR(),$.$get$hj(),$.$get$fZ(),$.$get$hk(),$.$get$hl()],[A.Q])},"db","$get$db",function(){return P.oJ("")},"ck","$get$ck",function(){var z=new O.mX(0,null,"PointsCounter")
z.h5()
return z},"bT","$get$bT",function(){return new L.eK(null,H.n([],[L.a9]))},"cq","$get$cq",function(){return H.f5(P.m,P.d)},"cj","$get$cj",function(){return P.b6(null,{func:1,ret:[P.O,P.ap]})},"cz","$get$cz",function(){return P.bg("^\\s*<<<\\s*$",!0,!1)},"cT","$get$cT",function(){return H.f5(P.m,Z.aq)},"fd","$get$fd",function(){return N.be("")},"fc","$get$fc",function(){return P.dw(P.m,N.dy)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,!1]
init.types=[{func:1,args:[,]},{func:1,ret:P.m,args:[R.x,A.a2,Y.a1]},{func:1},{func:1,args:[,,,]},{func:1,ret:Q.w,args:[R.x]},{func:1,args:[R.x,A.a2,Y.a1]},{func:1,args:[,,]},{func:1,v:true},{func:1,v:true,args:[R.x,A.a2,Y.a1,R.x,S.ab]},{func:1,args:[P.t]},{func:1,ret:U.cE,args:[A.a2,F.G,[P.y,R.x]]},{func:1,ret:R.x,args:[A.a2]},{func:1,v:true,args:[R.x,A.a2,Y.a1,R.x,,]},{func:1,ret:P.m,args:[P.t]},{func:1,args:[U.b3]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d]},{func:1,v:true,args:[P.m]},{func:1,ret:Y.aw,args:[P.t]},{func:1,ret:P.m,args:[P.m]},{func:1,v:true,args:[P.d],opt:[P.bi]},{func:1,args:[R.x]},{func:1,args:[,P.bi]},{func:1,ret:P.ad,args:[R.x,R.x]},{func:1,args:[P.aX]},{func:1,args:[,,,,]},{func:1,args:[Z.aq]},{func:1,ret:P.K,args:[A.ai]},{func:1,ret:P.O},{func:1,ret:Q.c2,args:[U.D]},{func:1,ret:P.m,args:[U.bA,P.m]},{func:1,v:true,args:[P.d,P.bi]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.t]},{func:1,ret:P.ad,args:[L.a9]},{func:1,v:true,args:[[P.L,P.m],P.fF]},{func:1,args:[L.a9]},{func:1,args:[P.m,,]},{func:1,args:[P.m,Z.cS]},{func:1,args:[[P.L,Y.ag],Y.ag]},{func:1,ret:L.a9,args:[P.m],named:{deferToChoiceList:P.ad,deferToEndOfPage:P.ad,goto:P.m,helpMessage:P.m,script:{func:1,ret:[P.O,P.ap]},submenu:P.m}},{func:1,ret:P.t,args:[P.Z,P.Z]},{func:1,ret:P.ad,args:[P.t]},{func:1,ret:P.K,args:[P.K,P.K]},{func:1,ret:P.t,args:[P.t,P.t]},{func:1,args:[,],opt:[,]},{func:1,args:[P.t,,]},{func:1,ret:P.m,args:[Q.ae]},{func:1,args:[Y.ag]},{func:1,ret:Q.c0,args:[Q.o]},{func:1,args:[P.K,R.x]},{func:1,ret:P.K,args:[A.ct]},{func:1,args:[P.bf]},{func:1,ret:[P.O,U.cd],args:[P.aX,P.m],named:{rerollEffectDescription:P.m,rerollable:P.ad}}]
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
if(x==y)H.wm(d||a)
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
Isolate.aR=a.aR
Isolate.ba=a.ba
return Isolate}}(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ij(X.hU(),b)},[])
else (function(b){H.ij(X.hU(),b)})([])})})()