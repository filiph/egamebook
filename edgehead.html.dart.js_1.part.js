self.$dart_deferred_initializers$=self.$dart_deferred_initializers$||Object.create(null)
$dart_deferred_initializers$.current=function($globals$,$){var A=$globals$.A
var B=$globals$.B
var C=$globals$.C
var D=$globals$.D
var E=$globals$.E
var F=$globals$.F
var G=$globals$.G
var H=$globals$.H
var J=$globals$.J
var K=$globals$.K
var L=$globals$.L
var M=$globals$.M
var N=$globals$.N
var O=$globals$.O
var P=$globals$.P
var Q=$globals$.Q
var R=$globals$.R
var S=$globals$.S
var T=$globals$.T
var U=$globals$.U
var V=$globals$.V
var W=$globals$.W
var X=$globals$.X
var Y=$globals$.Y
var Z=$globals$.Z
var init=$globals$.init
var setupProgram=$globals$.setupProgram
var I=$globals$.I
var dart=[["","",,P,{"^":"",
cx:function(a,b,c){var z,y,x
if(b===0){if(c.gel())J.jv(c.c)
else J.dO(c.a)
return}else if(b===1){if(c.gel())c.c.ed(H.E(a),H.P(a))
else{z=H.E(a)
y=H.P(a)
c.a.cb(z,y)
J.dO(c.a)}return}if(a instanceof P.bU){if(c.gel()){b.$2(2,null)
return}z=a.b
if(z===0){z=a.a
J.cI(c.a,z)
P.cF(new P.r7(b,c))
return}else if(z===1){x=a.a
c.a.fP(x,!1).a_(new P.r8(b,c))
return}}P.iI(a,b)},
rW:function(a){return J.ft(a)},
r7:{"^":"a:1;a,b",
$0:function(){var z=this.b
if(z.a.gaZ()){z.b=!0
return}this.a.$2(null,0)}},
r8:{"^":"a:0;a,b",
$1:function(a){var z=this.b.c!=null?2:0
this.a.$2(z,null)}},
pF:{"^":"b;a,b,c",
gbX:function(a){return J.ft(this.a)},
gaZ:function(){return this.a.gaZ()},
gel:function(){return this.c!=null},
l:function(a,b){return J.cI(this.a,b)},
cb:function(a,b){return this.a.cb(a,b)},
av:function(a){return J.dO(this.a)},
i6:function(a){var z=new P.pI(a)
this.a=P.hW(new P.pK(this,a),new P.pL(z),null,new P.pM(this,z),!1,null)},
t:{
pG:function(a){var z=new P.pF(null,!1,null)
z.i6(a)
return z}}},
pI:{"^":"a:1;a",
$0:function(){P.cF(new P.pJ(this.a))}},
pJ:{"^":"a:1;a",
$0:function(){this.a.$2(0,null)}},
pL:{"^":"a:1;a",
$0:function(){this.a.$0()}},
pM:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(z.b===!0){z.b=!1
this.b.$0()}}},
pK:{"^":"a:1;a,b",
$0:function(){var z=this.a
if(!z.a.gh7()){z.c=new P.aV(new P.v(0,$.h,null,[null]),[null])
if(z.b===!0){z.b=!1
P.cF(new P.pH(this.b))}return z.c.gh3()}}},
pH:{"^":"a:1;a",
$0:function(){this.a.$2(2,null)}},
bU:{"^":"b;a,b",
k:function(a){return"IterationMarker("+this.b+", "+H.d(this.a)+")"},
t:{
iz:function(a){return new P.bU(a,1)},
du:function(){return C.ao},
iy:function(a){return new P.bU(a,0)},
dv:function(a){return new P.bU(a,3)}}},
bW:{"^":"b;a,b,c,d",
gA:function(){var z=this.c
return z==null?this.b:z.gA()},
m:function(){var z,y,x,w
for(;!0;){z=this.c
if(z!=null)if(z.m()===!0)return!0
else this.c=null
y=function(a,b,c){var v,u=b
while(true)try{return a(u,v)}catch(t){v=t
u=c}}(this.a,0,1)
if(y instanceof P.bU){x=y.b
if(x===2){z=this.d
if(z==null||z.length===0){this.b=null
return!1}if(0>=z.length)return H.e(z,-1)
this.a=z.pop()
continue}else{z=y.a
if(x===3)throw z
else{w=J.aD(z)
if(w instanceof P.bW){z=this.d
if(z==null){z=[]
this.d=z}z.push(this.a)
this.a=w.a
continue}else{this.c=w
continue}}}}else{this.b=y
return!0}}return!1}},
r_:{"^":"d0;a",
gH:function(a){return new P.bW(this.a(),null,null,null)},
$asd0:I.Y,
$asF:I.Y,
t:{
dy:function(a){return new P.r_(a)}}}}],["","",,P,{"^":"",
ep:function(a){return C.X},
qk:{"^":"b;",
aA:function(a){if(a<=0||a>4294967296)throw H.c(P.nC("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
hb:function(){return Math.random()}}}],["","",,S,{"^":"",dZ:{"^":"b;iD:a<,b,$ti",
aE:function(a){var z=new S.bm(null,null,this.$ti)
z.aX()
z.ac(0,this)
a.$1(z)
return z.C()},
gv:function(a){var z=this.b
if(z==null){z=X.aM(this.a)
this.b=z}return z},
q:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$isdZ)return!1
y=b.a
x=this.a
if(y.length!==x.length)return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(v=0;z=x.length,v!==z;++v){if(v>=y.length)return H.e(y,v)
w=y[v]
if(v>=z)return H.e(x,v)
if(!J.f(w,x[v]))return!1}return!0},
k:function(a){return J.w(this.a)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
gi:function(a){return this.a.length},
bf:function(a,b,c){var z=this.a
return(z&&C.a).bf(z,b,c)},
be:function(a,b){return this.bf(a,b,0)},
gH:function(a){var z=this.a
return new J.bh(z,z.length,0,null,[H.p(z,0)])},
aO:function(a,b){var z=this.a
z.toString
return new H.ao(z,b,[null,null])},
F:function(a,b){var z=this.a
return(z&&C.a).F(z,b)},
w:function(a,b){var z=this.a
return(z&&C.a).w(z,b)},
gD:function(a){return this.a.length===0},
gZ:function(a){return this.a.length!==0},
gN:function(a){var z=this.a
return(z&&C.a).gN(z)},
gB:function(a){var z=this.a
return(z&&C.a).gB(z)},
P:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.e(z,b)
return z[b]},
aX:function(){if(new H.b6(H.aY(H.p(this,0)),null).q(0,C.o))throw H.c(new P.D('explicit element type required, for example "new BuiltList<int>"'))}},bm:{"^":"b;a,b,$ti",
C:function(){var z,y
z=this.b
if(z==null){z=this.a
y=new S.dZ(z,null,this.$ti)
y.aX()
this.a=z
this.b=y
z=y}return z},
ac:function(a,b){if(H.f5(b,"$isdZ",this.$ti,null)){this.a=b.giD()
this.b=b}else{this.a=P.a7(b,!0,H.p(this,0))
this.b=null}},
j:function(a,b,c){var z
if(c==null)H.o(P.a_("null element"))
z=this.ge4()
if(b>>>0!==b||b>=z.length)return H.e(z,b)
z[b]=c},
l:function(a,b){var z
if(b==null)H.o(P.a_("null element"))
z=this.ge4();(z&&C.a).l(z,b)},
E:function(a,b){var z=this.ge4();(z&&C.a).E(z,b)},
aO:function(a,b){var z=this.a
z.toString
z=new H.ao(z,b,[null,null]).aF(0,!0)
this.a=z
this.b=null
this.ih(z)},
ge4:function(){if(this.b!=null){this.a=P.a7(this.a,!0,H.p(this,0))
this.b=null}return this.a},
aX:function(){if(new H.b6(H.aY(H.p(this,0)),null).q(0,C.o))throw H.c(new P.D('explicit element type required, for example "new ListBuilder<int>"'))},
ih:function(a){var z,y,x,w
for(z=a.length,y=H.p(this,0),x=0;x<a.length;a.length===z||(0,H.ab)(a),++x){w=a[x]
if(!H.f6(w,y))throw H.c(P.a_("invalid element: "+H.d(w)))}}}}],["","",,A,{"^":"",cT:{"^":"b;iF:a<,b,c,d,$ti",
aE:function(a){var z=new A.ci(null,null,this.$ti)
z.bp()
z.ac(0,this)
a.$1(z)
return z.C()},
gv:function(a){var z=this.b
if(z==null){z=this.a
z=z.gV(z)
z=H.bn(z,new A.kk(this),H.A(z,"F",0),null)
z=P.a7(z,!1,H.A(z,"F",0))
C.a.hF(z)
z=X.aM(z)
this.b=z}return z},
q:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b===this)return!0
z=J.l(b)
if(!z.$iscT)return!1
y=b.a
x=this.a
if(y.gi(y)!==x.gi(x))return!1
z=z.gv(b)
w=this.gv(this)
if(z==null?w!=null:z!==w)return!1
for(z=this.gV(this),z=z.gH(z);z.m();){v=z.gA()
if(!J.f(y.h(0,v),x.h(0,v)))return!1}return!0},
k:function(a){return J.w(this.a)},
h:function(a,b){return this.a.h(0,b)},
w:function(a,b){this.a.w(0,b)},
gD:function(a){var z=this.a
return z.gD(z)},
gZ:function(a){var z=this.a
return z.gZ(z)},
gV:function(a){var z=this.c
if(z==null){z=this.a
z=z.gV(z)
this.c=z}return z},
gi:function(a){var z=this.a
return z.gi(z)},
bp:function(){if(new H.b6(H.aY(H.p(this,0)),null).q(0,C.o))throw H.c(new P.D('explicit key type required, for example "new BuiltMap<int, int>"'))
if(new H.b6(H.aY(H.p(this,1)),null).q(0,C.o))throw H.c(new P.D('explicit value type required, for example "new BuiltMap<int, int>"'))}},kk:{"^":"a:0;a",
$1:function(a){var z,y
z=J.x(a)
y=J.x(this.a.a.h(0,a))
return X.eW(X.bv(X.bv(0,J.x(z)),J.x(y)))}},ci:{"^":"b;a,b,$ti",
C:function(){var z=this.b
if(z==null){z=new A.cT(this.a,null,null,null,this.$ti)
z.bp()
this.b=z}return z},
ac:function(a,b){var z
if(H.f5(b,"$iscT",this.$ti,null)){this.b=b
this.a=b.giF()}else if(!!b.$iscT){z=P.eh(b.a,H.p(this,0),H.p(this,1))
this.b=null
this.a=z}else if(!!b.$isR){z=P.eh(b,H.p(this,0),H.p(this,1))
this.b=null
this.a=z}else throw H.c(P.a_("expected Map or BuiltMap, got "+H.d(b.gkJ(b))))},
j:function(a,b,c){if(b==null)H.o(P.a_("null key"))
if(c==null)H.o(P.a_("null value"))
this.gcO().j(0,b,c)},
E:function(a,b){this.gcO().E(0,b)},
gcO:function(){if(this.b!=null){this.a=P.eh(this.a,H.p(this,0),H.p(this,1))
this.b=null}return this.a},
bp:function(){if(new H.b6(H.aY(H.p(this,0)),null).q(0,C.o))throw H.c(new P.D('explicit key type required, for example "new MapBuilder<int, int>"'))
if(new H.b6(H.aY(H.p(this,1)),null).q(0,C.o))throw H.c(new P.D('explicit value type required, for example "new MapBuilder<int, int>"'))}}}],["","",,Y,{"^":"",
y:function(a,b){if(typeof b!=="number")return H.n(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
aZ:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,M,{"^":"",bI:{"^":"b;$ti",
h:function(a,b){var z
if(!this.cH(b))return
z=this.c.h(0,this.a.$1(H.fk(b,H.A(this,"bI",1))))
return z==null?null:J.cN(z)},
j:function(a,b,c){if(!this.cH(b))return
this.c.j(0,this.a.$1(b),new B.hA(b,c,[null,null]))},
M:function(a,b){if(!this.cH(b))return!1
return this.c.M(0,this.a.$1(H.fk(b,H.A(this,"bI",1))))},
w:function(a,b){this.c.w(0,new M.kl(b))},
gD:function(a){var z=this.c
return z.gD(z)},
gZ:function(a){var z=this.c
return z.gZ(z)},
gV:function(a){var z=this.c
z=z.gan(z)
return H.bn(z,new M.km(),H.A(z,"F",0),null)},
gi:function(a){var z=this.c
return z.gi(z)},
E:function(a,b){var z
if(!this.cH(b))return
z=this.c.E(0,this.a.$1(H.fk(b,H.A(this,"bI",1))))
return z==null?null:J.cN(z)},
gan:function(a){var z=this.c
z=z.gan(z)
return H.bn(z,new M.kn(),H.A(z,"F",0),null)},
k:function(a){return P.d3(this)},
cH:function(a){var z
if(a==null||H.f6(a,H.A(this,"bI",1)))z=this.b.$1(a)===!0
else z=!1
return z},
$isR:1,
$asR:function(a,b,c){return[b,c]}},kl:{"^":"a:3;a",
$2:function(a,b){var z=J.aj(b)
return this.a.$2(z.gN(b),z.gB(b))}},km:{"^":"a:0;",
$1:function(a){return J.fq(a)}},kn:{"^":"a:0;",
$1:function(a){return J.cN(a)}}}],["","",,B,{"^":"",hA:{"^":"b;N:a>,B:b>,$ti"}}],["","",,N,{"^":"",nQ:{"^":"nO;Q,ch,a,b,c,d,e,f,r,x,y,z",
hd:function(){$.$get$c2().j(0,"game",this.ch)},
jM:function(){this.ch=H.c1($.$get$c2().h(0,"game"),"$isfV")},
k_:function(){this.ch=null
var z=$.$get$c0()
z=new O.fV(null,null,null,null,null,null,null,new Y.ah(H.r([],[Y.aA]),0,P.ag()),O.uZ(),O.uY(),O.uX(),z,new P.b5(""),!1,null)
z.ds()
this.ch=z
z.r="endGame"},
i2:function(){var z,y
z=new O.df(["You and Briana sprint through the giant worm\u2019s tunnel.","Suddenly, an **orc** and a **goblin** jump in front of you from a slimy crevice, swords in hands.","![Orc and Goblin](img/orc_and_goblin_sketch.jpg)",[null,P.aS(["goto","gameLoop"])]],0,null,!1,!1)
y=this.a.a
y.j(0,"start",z)
z.a="start"
z=new O.df([new N.nS(this),[null,P.aS(["goto","gameLoop"])]],0,null,!1,!1)
y.j(0,"gameLoop",z)
z.a="gameLoop"
z=new O.df(['<p class="meta">\n  Hit <strong>Restart</strong> (top left) to play again. It will be different.\n</p>'],0,null,!1,!1)
y.j(0,"endGame",z)
z.a="endGame"
this.b=y.h(0,"start")},
t:{
nR:function(){var z,y
z=P.i
y=new H.a2(0,null,null,null,null,null,0,[z,O.df])
z=new N.nQ("net.filiph.edgehead.0.0.1",null,new O.nT(y),null,null,null,P.H(null,null,null,z),!1,null,-9999,null,null)
z.i2()
return z}}},nS:{"^":"a:26;a",
$0:function(){var z=0,y=new P.aP(),x=1,w,v=this
var $async$$0=P.aK(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.C(v.a.ch.aU(),$async$$0,y)
case 2:return P.C(null,0,y)
case 1:return P.C(w,1,y)}})
return P.C(null,$async$$0,y)}}}],["","",,O,{"^":"",
x7:[function(a,b){var z,y
z=b.gj6()
z=new H.a4(z,new O.t4(a),[H.p(z,0)]).ah(0,0,new O.t5())
if(typeof z!=="number")return H.n(z)
y=b.a
y=new H.a4(y,new O.t6(a),[H.p(y,0)]).ah(0,0,new O.t7())
if(typeof y!=="number")return H.n(y)
return 0+z-y},"$2","j3",4,0,4],
fV:{"^":"mW;x,y,z,Q,ch,cu:cx<,cy,eZ:db<,a,b,c,d,e,f,r",
ds:function(){var z,y,x,w
z=[P.i]
y=H.r([],z)
x=P.H(null,null,null,null)
w=$.$get$fi()
x=new R.cv(null,!0,y,null,null,C.c,1,null,100,!0,!1,x,null,!0,C.l,w,null)
new O.kZ().$1(x)
this.x=x.C()
y=new R.cv(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,w,null)
new O.l_().$1(y)
this.y=y.C()
y=new R.cv(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,w,null)
new O.l0().$1(y)
this.z=y.C()
z=new R.cv(null,!0,H.r([],z),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,w,null)
new O.l1().$1(z)
z=z.C()
this.Q=z
y=new U.cZ(null,null,null,null,null,null)
y.a=U.li([this.x,this.y],[this.z,z])
new O.l2().$1(y)
this.ch=y.C()
z=P.aT([this.x,this.y,this.z,this.Q],null)
y=this.ch
x=P.H(null,null,null,null)
y=new A.ai(z,P.H(null,null,null,null),x,P.H(null,null,null,null),P.a7([y],!0,null),0)
this.cx=y
x=new Y.ah(H.r([],[Y.aA]),0,P.ag())
z=new B.cl(y,null,x,1,1,!0,!1,!1,0)
z.f0(y,null,null,x,1,!1,!0,!1)
this.cy=z},
df:function(){var z=0,y=new P.aP(),x,w=2,v,u=this,t,s,r,q,p,o,n,m,l,k,j,i
var $async$df=P.aK(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:t=u.cx.e
if(t.length===0){u.f=!0
t=u.db
t.aY(0,"\n\n",!0)
s=u.cx.a0(u.x.r)
if(s.gbD()){t.e8(0,"<subject> look<s> behind",s)
t.e8(0,"<subject> see<s> the giant worm's hideous head approaching",s)
if(u.cx.a0(u.y.r).gbD())t.aY(0,"You both start sprinting again.",!0)
else{t.e8(0,"<subject> take<s> a last look at Briana",s)
t.ja(0,"<subject> start<s> sprinting again, alone",!0,s)}t.aY(0,"\n\n",!0)
t.aY(0,"TO BE CONTINUED.",!0)}else t.aY(0,"You will soon be the giant worm's food.",!0)
u.e.a+=t.d8()
z=1
break}r=C.a.gB(t)
q=r.dk(u.cx)
t=u.cx
p=new H.a2(0,null,null,null,null,null,0,[null,null])
o=J.L(q)
n=new Y.ah(H.r([],[Y.aA]),0,P.ag())
n.b=t.f
m=new G.k3(o,new B.cl(t,null,n,1,1,!0,!1,!1,0),0,!1,p)
z=3
return P.C(m.d6(4,new O.l3()),$async$df,y)
case 3:l=G.nk(p)
t=l.b
if(t.length===0){u.cx.h_(r.gp(r))
t=u.cx
p=t.f
if(typeof p!=="number"){x=p.G()
z=1
break}t.f=p+1
z=1
break}if(q.gU()){if(t.length===1){u.dC(C.a.ga6(t),q,u.db)
z=1
break}p=u.db
u.e.a+=p.d8()
C.a.si(p.a,0)
m.eO().w(0,P.ur())
k=P.a7(new H.oZ(t,0,4,[H.p(t,0)]),!0,null)
t=new O.l4()
p=k.length-1
if(p-0<=32)H.hR(k,0,p,t)
else H.hQ(k,0,p,t)
for(t=k.length,p=u.c,j=0;j<k.length;k.length===t||(0,H.ab)(k),++j){i=k[j]
p.$2$script(J.M(i),new O.l5(u,q,i))}z=1
break}else{p=S.nA(l.a,1000)
if(p>=t.length){x=H.e(t,p)
z=1
break}o=u.db
u.dC(t[p],q,o)}if(o.geh()){u.e.a+=o.hg(!0)
o.kz()}case 1:return P.C(x,0,y)
case 2:return P.C(v,1,y)}})
return P.C(null,$async$df,y)},
dC:function(a,b,c){var z,y,x
z=a.cU(b,this.cy,this.cx)
z.toString
y=P.a7(z,!0,H.A(z,"F",0))
x=S.nz(new H.ao(y,new O.kW(),[null,null]),1)
if(x>=y.length)return H.e(y,x)
z=y[x]
this.cy=z
C.a.K(c.a,z.geZ().a)
this.cx=this.cy.gcu()}},
kZ:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=1
a.gu()
a.z=!0
a.gu()
a.cy=C.I
a.gu()
a.ch="Filip"
z=$.$get$bA()
a.gu()
a.c=new U.dh(!1,10,!0,z,"sword",C.f)
a.gu()
a.f=2
a.gu()
a.x=1000
return a}},
l_:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=100
a.gu()
a.cy=C.ak
a.gu()
a.ch="Briana"
z=$.$get$bA()
a.gu()
a.c=new U.dh(!1,10,!0,z,"longsword",C.f)
a.gu()
a.f=2
return a}},
l0:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=1000
a.gu()
a.ch="orc"
a.gu()
a.cx=!1
a.gu()
a.cy=C.H
z=$.$get$bA()
a.gu()
a.c=new U.dh(!1,10,!0,z,"sword",C.f)
a.gu()
a.f=2
z=$.$get$f8()
a.gu()
a.db=z
a.gu()
a.dx=O.j3()
return a}},
l1:{"^":"a:0;",
$1:function(a){var z
a.gu()
a.r=1001
a.gu()
a.ch="goblin"
a.gu()
a.cx=!1
a.gu()
a.cy=C.H
z=$.$get$bA()
a.gu()
a.c=new U.dh(!1,10,!0,z,"scimitar",C.f)
z=$.$get$f8()
a.gu()
a.db=z
a.gu()
a.dx=O.j3()
return a}},
l2:{"^":"a:0;",
$1:function(a){var z,y
z=a.gaa()
y=z.c
if(y==null){y=new A.ci(null,null,[P.q,{func:1,v:true,args:[A.ai,Y.ah]}])
y.bp()
y.ac(0,C.v)
z.c=y
z=y}else z=y
z.gcO().j(0,2,new O.kX())
z=a.gaa()
y=z.c
if(y==null){y=new A.ci(null,null,[P.q,{func:1,v:true,args:[A.ai,Y.ah]}])
y.bp()
y.ac(0,C.v)
z.c=y
z=y}else z=y
z.gcO().j(0,6,new O.kY())
return a}},
kX:{"^":"a:3;",
$2:function(a,b){b.e9()
b.l(0,"You hear a horrible growling sound from behind.")
b.l(0,"The worm must be near.")
b.aY(0,"\n\n",!0)}},
kY:{"^":"a:3;",
$2:function(a,b){b.e9()
b.l(0,"The earth shatters and there's that sound again.")
b.aY(0,"\n\n",!0)}},
l3:{"^":"a:26;",
$0:function(){var z=0,y=new P.aP(),x=1,w
var $async$$0=P.aK(function(a,b){if(a===1){w=b
z=x}while(true)switch(z){case 0:z=2
return P.C(C.an.gjj(window),$async$$0,y)
case 2:return P.C(null,0,y)
case 1:return P.C(w,1,y)}})
return P.C(null,$async$$0,y)}},
l4:{"^":"a:3;",
$2:function(a,b){return J.cJ(J.M(a),J.M(b))}},
l5:{"^":"a:1;a,b,c",
$0:function(){var z=this.a
z.dC(this.c,this.b,z.db)}},
kW:{"^":"a:0;",
$1:function(a){return a.gku()}},
t4:{"^":"a:0;a",
$1:function(a){return J.f(a.gad(),this.a.gad())}},
t5:{"^":"a:3;",
$2:function(a,b){return J.Q(a,b.gay())}},
t6:{"^":"a:0;a",
$1:function(a){return a.bT(this.a)}},
t7:{"^":"a:3;",
$2:function(a,b){return J.Q(a,b.gay())}}}],["","",,Q,{"^":"",dS:{"^":"b;",
cU:function(a,b,c){var z=this
return new P.dy(function(){var y=a,x=b,w=c
var v=0,u=2,t,s,r,q,p,o
return function $async$cU(d,e){if(d===1){t=e
v=u}while(true)switch(v){case 0:s=z.eQ(y,x.gcu())
r=J.I(s)
v=r.ae(s,0)?3:4
break
case 3:q=A.im(w)
v=5
return B.el(q,x,z,z.f4(q,y,w,z.gfR()),s,!1,!1,!0)
case 5:case 4:v=r.W(s,1)?6:7
break
case 6:v=!z.gh1()?8:9
break
case 8:r=H.r([],[Y.aA])
p=P.ag()
if(typeof s!=="number")H.n(s)
v=10
return B.el(w,x,z,new Y.ah(r,0,p),1-s,!0,!1,!1)
case 10:v=1
break
case 9:q=A.im(w)
o=z.f4(q,y,w,z.gfQ())
if(typeof s!=="number")H.n(s)
v=11
return B.el(q,x,z,o,1-s,!0,!1,!1)
case 11:case 7:case 1:return P.du()
case 2:return P.dv(t)}}})},
f4:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.a.b3(0,new Q.jZ(b))
y=new O.jX(null,null,null,C.C,null,null,null)
y.f=this.gn(this)
y.a=b
y.ki(c)
x=new Y.ah(H.r([],[Y.aA]),0,P.ag())
w=a.e
v=J.L(w.length!==0?C.a.gB(w):null)
u=a.gv(a);(w.length!==0?C.a.gB(w):null).hc(a,x)
if(a.gv(a)!==u)throw H.c(new P.z("Please don't change the world in onBeforeAction"))
this.a=d.$3(z,a,x)
if(a.dQ(v)!=null)a.h_(v)
t=a.f
if(typeof t!=="number")return t.G()
a.f=t+1
t=a.hu(v)
if(!(t==null))t.ko(a,x)
while(!0){t=w.length!==0?C.a.gB(w):null
if((t==null?t:t.dk(a))!=null){t=w.length!==0?C.a.gB(w):null
t=!J.f(t==null?t:t.eW(a),!0)}else t=!0
if(!t)break
if((w.length!==0?C.a.gB(w):null)==null)break
C.a.hh(w)}if(this.a==null)H.o(new P.z("No description given when executing "+this.k(0)+". You should return it from your world-modifying function."))
y.e=a
y.b=this.a
y.r=a.f
a.c.l(0,y.C())
return x}},jZ:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),J.L(this.a))}},ks:{"^":"dS;n:b>,c,d,e,f,h1:r<,a",
jk:[function(a,b,c){return this.e.$3(a,b,c)},"$3","gfQ",6,0,0],
jl:[function(a,b,c){return this.d.$3(a,b,c)},"$3","gfR",6,0,0],
eQ:function(a,b){return this.f},
d1:function(a,b){return this.c.$2(a,b)},
k:function(a){return this.b},
t:{
e_:function(a,b,c,d,e){return new Q.ks(a,b,c,d,e,!0,null)}}},fv:{"^":"b;"},aE:{"^":"fv;n:a>,b,c,d,e",
jq:function(a,b){var z,y
z=b.e
z=z.length!==0?C.a.gB(z):null
y=z.bm(b.a,b)
z=H.p(y,0)
return new H.cj(new H.a4(y,new Q.lb(a),[z]),new Q.lc(this),[z,null])},
k:function(a){return"EnemyTargetActionBuilder<"+this.a+">"}},lb:{"^":"a:0;a",
$1:function(a){var z,y
z=a.gad()
y=this.a.gad()
z=z.a
y=y.a
return z==null?y!=null:z!==y}},lc:{"^":"a:10;a",
$1:function(a){var z,y
z=new Y.ah(H.r([],[Y.aA]),0,P.ag())
y=this.a
z.j9(0,y.a,a)
return new Q.la(z.d8(),y.b,y.c,y.d,y.e,a,null)}},la:{"^":"dS;n:b>,c,d,e,f,r,a",
jk:[function(a,b,c){return this.e.$4(a,this.r,b,c)},"$3","gfQ",6,0,0],
jl:[function(a,b,c){return this.d.$4(a,this.r,b,c)},"$3","gfR",6,0,0],
gh1:function(){return this.e!=null},
eQ:function(a,b){return this.f.$3(a,this.r,b)},
d1:function(a,b){return this.c.$3(a,this.r,b)},
k:function(a){return this.b}}}],["","",,O,{"^":"",
x2:[function(a){return J.L(a)},"$1","rY",2,0,5],
cP:{"^":"b;cd:a<,fN:b<,R:c<,hf:d<,e,ke:f<,r",
gv:function(a){var z=this.d
return X.j9(this.c,this.a,X.aM(z==null?new P.iC(0,null,null,null,null,null,0,[null]):P.aT([z],null)),X.aM(this.f))},
q:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$iscP&&this.gv(this)===z.gv(b)},
k:function(a){return"ActionRecord<"+H.d(this.b)+", "+H.d(this.a)+">"}},
jX:{"^":"b;a,b,c,d,e,fN:f<,R:r<",
gcd:function(){return this.b},
ghf:function(){return this.a},
C:function(){var z,y,x,w,v,u,t,s
z=this.d
switch(z){case C.C:y=this.e.a
break
case C.af:z=R.S
y=P.aT(H.r([this.a],[z]),z)
break
default:throw H.c(new P.dm("Mode "+z.k(0)+" not implemented"))}x=R.dU(P.U)
z=this.e.a
for(w=z.gH(z),z=new H.il(w,new O.jY(this),[H.p(z,0)]);z.m();){v=w.gA()
x.j(0,v,J.K(v.bM(this.e),this.c.h(0,v)))}z=this.r
w=this.f
u=this.b
t=J.L(this.a)
s=P.aT(new H.bJ(y,O.rY(),[H.p(y,0),null]),null)
return new O.cP(u,w,z,t,P.H(null,null,null,P.q),s,x)},
ki:function(a){var z,y,x
this.c=R.dU(P.U)
for(z=a.a,y=new P.aC(z,z.r,null,null,[null]),y.c=z.e;y.m();){x=y.d
this.c.j(0,x,x.bM(a))}}},
jY:{"^":"a:0;a",
$1:function(a){var z=this.a.c
return z.gV(z).F(0,a)}},
hj:{"^":"b;a",
k:function(a){return C.aj.h(0,this.a)}}}],["","",,R,{"^":"",S:{"^":"n6;",
gbD:function(){return this.f>0},
bM:function(a){var z,y,x
z=this.dx
if(z!=null)return z.$2(this,a)
z=a.a
y=[H.p(z,0)]
x=new H.a4(z,new R.k9(this),y).ah(0,0,new R.ka())
if(typeof x!=="number")return H.n(x)
y=new H.a4(z,new R.kb(this),y).ah(0,0,new R.kc())
if(typeof y!=="number")return H.n(y)
return 10*this.f+x-y},
b2:function(a){var z=this.c
return z!=null&&z.a===a},
$isbL:1},n6:{"^":"b+e3;"},k9:{"^":"a:0;a",
$1:function(a){return J.f(a.gad(),this.a.db)}},ka:{"^":"a:27;",
$2:function(a,b){return J.Q(a,2*b.gay())}},kb:{"^":"a:0;a",
$1:function(a){return a.bT(this.a)}},kc:{"^":"a:27;",
$2:function(a,b){return J.Q(a,b.gay())}},k_:{"^":"b;aj:c<,J:e@,ay:f@,p:r>,U:z<,n:ch*,I:cy<,ad:db<"},dT:{"^":"bI;a,b,c,$ti",
gv:function(a){var z=this.gan(this)
return X.aM(P.a7(z,!1,H.A(z,"F",0)))},
q:function(a,b){var z,y
if(b==null)return!1
z=J.l(b)
if(!!z.$isdT){y=this.gan(this)
y=X.aM(P.a7(y,!1,H.A(y,"F",0)))
z=z.gan(b)
z=y===X.aM(P.a7(z,!1,H.A(z,"F",0)))}else z=!1
return z},
$asbI:function(a){return[P.q,R.S,a]},
$asR:function(a){return[R.S,a]},
t:{
dU:function(a){var z=new H.a2(0,null,null,null,null,null,0,[P.q,[B.hA,R.S,a]])
return new R.dT(new R.k1(),new R.k2(),z,[a])},
k0:function(a,b){var z=R.dU(b)
a.w(0,new R.tP(b,z))
return z}}},k1:{"^":"a:10;",
$1:function(a){return J.L(a)}},k2:{"^":"a:0;",
$1:function(a){return a!=null}},tP:{"^":"a;a,b",
$2:function(a,b){this.b.j(0,a,b)
return b},
$signature:function(){return H.av(function(a){return{func:1,args:[R.S,a]}},this,"dT")}},en:{"^":"b;a",
k:function(a){return C.F.h(0,this.a)}},po:{"^":"S;a,b,aj:c<,d,J:e<,ay:f<,p:r>,x,ek:y<,U:z<,Q,n:ch>,d4:cx<,I:cy<,ad:db<,dx",
aE:function(a){var z=new R.cv(null,!0,H.r([],[P.i]),null,null,C.c,1,null,100,!0,!1,P.H(null,null,null,null),null,!0,C.l,$.$get$fi(),null)
z.dy=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof R.S))return!1
if(this.b===b.b){z=this.c
y=b.c
if(z==null?y==null:z===y)if(this.e===b.e)if(this.f===b.f){z=this.r
y=b.r
if(z==null?y==null:z===y)if(this.x===b.x)z=this.z===b.z&&this.Q===b.Q&&J.f(this.ch,b.ch)&&this.cx===b.cx&&this.cy===b.cy&&J.f(this.db,b.db)&&J.f(this.dx,b.dx)
else z=!1
else z=!1}else z=!1
else z=!1
else z=!1}else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(Y.y(0,C.p.gv(!0)),H.al(this.b)),J.x(this.c)),C.z.gv(this.d)),H.al(this.e)),this.f&0x1FFFFFFF),J.x(this.r)),this.x&0x1FFFFFFF),C.p.gv(!0)),C.p.gv(this.z)),H.al(this.Q)),J.x(this.ch)),C.p.gv(this.cx)),H.al(this.cy)),J.x(this.db)),J.x(this.dx)))},
k:function(a){return"Actor {alreadyMentioned="+String(!0)+",\ncategories="+P.bl(this.b,"[","]")+",\ncurrentWeapon="+J.w(this.c)+",\nshield="+C.z.k(this.d)+",\npose="+H.d(C.F.h(0,this.e.a))+",\nhitpoints="+C.k.k(this.f)+",\nid="+J.w(this.r)+",\ninitiative="+C.k.k(this.x)+",\nisActive="+String(!0)+",\nisPlayer="+String(this.z)+",\nitems="+P.bl(this.Q,"{","}")+",\nname="+H.d(J.w(this.ch))+",\nnameIsProperNoun="+String(this.cx)+",\npronoun="+this.cy.a+",\nteam="+J.w(this.db)+",\nworldScoringFunction="+H.d(J.w(this.dx))+",\n}"}},cv:{"^":"k_;dy,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
gaj:function(){this.gu()
return this.c},
gJ:function(){this.gu()
return this.e},
sJ:function(a){this.gu()
this.e=a},
gay:function(){this.gu()
return this.f},
say:function(a){this.gu()
this.f=a},
gp:function(a){this.gu()
return this.r},
gU:function(){this.gu()
return this.z},
gn:function(a){this.gu()
return this.ch},
sn:function(a,b){this.gu()
this.ch=b},
gd4:function(){this.gu()
return this.cx},
gI:function(){this.gu()
return this.cy},
gad:function(){this.gu()
return this.db},
gu:function(){var z=this.dy
if(z!=null){z.a
this.a=!0
this.b=this.dy.b
this.c=this.dy.c
this.d=this.dy.d
this.e=this.dy.e
this.f=this.dy.f
this.r=this.dy.r
this.x=this.dy.x
this.dy.y
this.y=!0
this.z=this.dy.z
this.Q=this.dy.Q
this.ch=this.dy.ch
this.cx=this.dy.cx
this.cy=this.dy.cy
this.db=this.dy.db
this.dx=this.dy.dx
this.dy=null}return this},
C:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.dy
if(z==null){this.gu()
this.a
this.gu()
y=this.b
this.gu()
x=this.c
this.gu()
w=this.d
this.gu()
v=this.e
this.gu()
u=this.f
this.gu()
t=this.r
this.gu()
s=this.x
this.gu()
this.y
this.gu()
r=this.z
this.gu()
q=this.Q
this.gu()
p=this.ch
this.gu()
o=this.cx
this.gu()
n=this.cy
this.gu()
m=this.db
this.gu()
z=new R.po(!0,y,x,w,v,u,t,s,!0,r,q,p,o,n,m,this.dx)
if(t==null)H.o(P.J("id"))
if(p==null)H.o(P.J("name"))
if(m==null)H.o(P.J("team"))}this.dy=z
return z}}}],["","",,U,{"^":"",
v8:function(a){switch(a){case C.a1:return"spear"
case C.a2:return"branch"
case C.a3:return"tent"
case C.f:return"sword"
default:throw H.c(P.a_(a))}},
d_:{"^":"b;a",
k:function(a){return C.ai.h(0,this.a)}},
e9:{"^":"hx;$ti",
gcd:function(){return U.v8(this.a)},
$isbL:1},
hx:{"^":"b+e3;$ti"},
dh:{"^":"e9;b,c,ek:d<,ad:e<,n:f>,a",
gp:function(a){return H.al(this)},
gbD:function(){return!1},
gU:function(){return!1},
gd4:function(){return!1},
gI:function(){return C.l},
$ase9:I.Y,
$ashx:I.Y}}],["","",,K,{"^":"",mU:{"^":"b;a,j5:b<,c"},mV:{"^":"b;"}}],["","",,G,{"^":"",mW:{"^":"b;",
aU:function(){var z=0,y=new P.aP(),x,w=2,v,u=this,t,s
var $async$aU=P.aK(function(a,b){if(a===1){v=b
z=w}while(true)switch(z){case 0:if(u.r==null)throw H.c(new P.z("Cannot run a LoopedEvent before onFinishedGoto is defined."))
if(u.f){u.d.si(0,0)
u.a.$1(u.r)
z=1
break}t=u.d
s=u.e
case 3:if(!!0){z=4
break}if(!(!u.f&&t.gi(t)===0&&s.a.length===0)){z=4
break}z=5
return P.C(u.df(),$async$aU,y)
case 5:z=3
break
case 4:t=s.a
if(t.length!==0){u.b.$1(t.charCodeAt(0)==0?t:t)
s.a=""}case 1:return P.C(x,0,y)
case 2:return P.C(v,1,y)}})
return P.C(null,$async$aU,y)}}}],["","",,B,{"^":"",cl:{"^":"b;cu:a<,b,eZ:c<,ku:d<,cZ:e<,f,r,x,d5:y>",
gv:function(a){return X.aM([this.a,this.e,this.b,this.d,this.y,this.f,this.r,this.x])},
q:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$iscl&&this.gv(this)===z.gv(b)},
k:function(a){var z,y
z=this.a
y=J.l(z)
z="PlanConsequence<"+y.gv(z)+", "+y.k(z)+", "+J.w(this.b)+", "+H.d(this.d)+", "+H.d(this.y)+", "
return z+(this.x?"isSuccess":"")+">"},
f0:function(a,b,c,d,e,f,g,h){this.c.b=this.a.f},
t:{
el:function(a,b,c,d,e,f,g,h){var z,y
z=b==null
y=z?0:J.Q(b.gd5(b),1)
y=new B.cl(a,c,d,e,z?e:J.cH(e,b.gcZ()),g,f,h,y)
y.f0(a,b,c,d,e,f,g,h)
return y}}},fF:{"^":"b;cA:a<,cZ:b<,d5:c>"}}],["","",,G,{"^":"",k3:{"^":"b;a,b,c,d,e",
eO:function(){var z=this
return new P.dy(function(){var y=0,x=1,w,v,u,t,s
return function $async$eO(a,b){if(a===1){w=b
y=x}while(true)switch(y){case 0:v=z.e,u=v.gV(v),u=u.gH(u),t=0
case 2:if(!u.m()){y=3
break}s=u.gA()
y=4
return""+t+") "+H.d(s)+"\t"+J.jV(v.h(0,s),2)
case 4:++t
y=2
break
case 3:return P.du()
case 1:return P.dv(w)}}})},
dS:function(a,b){return new P.dy(function(){var z=a,y=b
var x=0,w=1,v,u,t,s
return function $async$dS(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=y.e
x=2
return P.iz((u.length!==0?C.a.gB(u):null).gc9())
case 2:u=(u.length!==0?C.a.gB(u):null).gbb()
t=u.length
s=0
case 3:if(!(s<u.length)){x=5
break}x=6
return P.iz(u[s].jq(z,y))
case 6:case 4:u.length===t||(0,H.ab)(u),++s
x=3
break
case 5:return P.du()
case 1:return P.dv(v)}}})},
d6:function(a,b){var z=0,y=new P.aP(),x=1,w,v=this,u,t,s,r,q,p,o,n,m
var $async$d6=P.aK(function(c,d){if(c===1){w=d
z=x}while(true)switch(z){case 0:u=v.e
u.Y(0)
t=v.b
s=t.a
r=s.a.b3(0,new G.k8(v))
q=r.bM(s)
p=new P.bW(v.dS(r,s).a(),null,null,null)
case 2:if(!p.m()){z=3
break}o=p.c
n=o==null?p.b:o.gA()
if(n.d1(r,s)!==!0){z=2
break}z=4
return P.C(v.bQ(t,n,a,b).aB(0),$async$d6,y)
case 4:m=d
if(J.fr(m)===!0){u.j(0,n,-1/0)
z=2
break}u.j(0,n,v.jv(m,q,a))
z=2
break
case 3:v.d=!0
return P.C(null,0,y)
case 1:return P.C(w,1,y)}})
return P.C(null,$async$d6,y)},
jv:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.r([],[P.U])
for(y=J.aD(a),x=null;y.m()===!0;){w=y.gA()
if(J.Z(w.gcZ(),0.3))if(x==null)x=w
else if(J.Z(w.gcA(),x.gcA()))x=w
z.push(J.cH(J.K(w.gcA(),b),w.b))}y=C.a.ah(z,0,new G.k7())
v=z.length
if(typeof y!=="number")return y.dj()
if(x==null)u=0
else{t=x.gcA()
s=x.c
if(typeof t!=="number")return t.dj()
if(typeof s!=="number")return H.n(s)
u=t/s}return u+y/v},
bQ:function(a,b,c,d){var $async$bQ=P.aK(function(e,f){switch(e){case 2:u=x
z=u.pop()
break
case 1:v=f
z=w}while(true)switch(z){case 0:s=a.a
r=s.a.b3(0,new G.k4(t))
r.bM(s)
q=P.b2(null,B.cl)
p=P.H(null,null,null,A.ai)
if(b.d1(r,s)!==!0){z=1
break}o=J.l(s)
n=o.gv(s)
for(m=new P.bW(b.cU(r,a,s).a(),null,null,null);m.m();){l=m.c
k=l==null?m.b:l.gA()
if(o.gv(s)!==n)throw H.c(new P.z("Action "+b.k(0)+" modified world state when producing "+H.d(k)+"."))
q.a7(k)}case 3:if(!!q.gD(q)){z=4
break}z=1000*(Date.now()-$.$get$dV().a)>15e3?5:6
break
case 5:z=7
return P.cx(d.$0(),$async$bQ,y)
case 7:$.dV=new P.c6(Date.now(),!1)
case 6:j=q.cq()
if(J.bC(J.jz(j),c)){z=4
break}z=j.gcu().e.length===0?8:9
break
case 8:s=j.a
z=10
x=[1]
return P.cx(P.iy(new B.fF(s.a.b3(0,new G.k5(t)).bM(s),j.e,j.y)),$async$bQ,y)
case 10:z=3
break
case 9:s=j.a
o=s.e
i=(o.length!==0?C.a.gB(o):null).dk(s)
r=s.a.b3(0,new G.k6(t))
J.f(i,r)
z=11
x=[1]
return P.cx(P.iy(new B.fF(r.bM(s),j.e,j.y)),$async$bQ,y)
case 11:for(o=new P.bW(t.dS(i,s).a(),null,null,null);o.m();){m=o.c
h=m==null?o.b:m.gA()
if(h.d1(i,s)!==!0)continue
for(m=new P.bW(h.cU(i,j,s).a(),null,null,null);m.m();){l=m.c
g=l==null?m.b:l.gA();++t.c
if(J.aI(g.gcZ(),0.05))continue
if(p.F(0,g.gcu()))continue
q.a7(g)}}p.l(0,s)
z=3
break
case 4:case 1:return P.cx(null,0,y)
case 2:return P.cx(v,1,y)}})
var z=0,y=P.pG($async$bQ),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g
return P.rW(y)}},k8:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},k7:{"^":"a:3;",
$2:function(a,b){return J.Q(a,b)}},k4:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},k5:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},k6:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a.a)}},em:{"^":"b;a,c9:b<",
gD:function(a){return this.b.length===0},
t:{
wq:[function(a,b){return J.Q(a,b)},"$2","jh",4,0,6],
nk:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a.gD(a)){P.a8("WARNING: no recommendations")
return new G.em([],[])}y=a.gV(a)
x=P.a7(y,!0,H.A(y,"F",0))
C.a.aM(x,"removeWhere")
C.a.e3(x,new G.uo(a),!0)
if(x.length===1)return new G.em([1000],x)
C.a.cB(x,new G.td(a))
w=a.gan(a).ah(0,1/0,P.uV())
v=a.gan(a).ah(0,-1/0,P.uU())
y=J.I(v)
u=J.I(w)
t=u.O(w,J.cH(y.O(v,w),0.1))
z.a=t
if(u.q(w,v)){t=J.K(t,1)
z.a=t
u=t}else u=t
s=y.O(v,u)
r=P.ho(x.length,new G.te(z,a,x,s),!1,P.aH)
q=new H.ao(r,new G.tf(C.a.ah(r,0,G.jh())),[null,null]).aF(0,!1)
z=C.a.ah(q,0,G.jh())
if(typeof z!=="number")return H.n(z)
u=q.length
y=u-1
if(y<0)return H.e(q,y)
z=J.Q(q[y],1000-z)
if(y>=q.length)return H.e(q,y)
q[y]=z
return new G.em(q,x)}}},uo:{"^":"a:0;a",
$1:function(a){return J.f(this.a.h(0,a),-1/0)}},td:{"^":"a:3;a",
$2:function(a,b){var z=this.a
return J.jt(J.cJ(z.h(0,a),z.h(0,b)))}},te:{"^":"a:9;a,b,c,d",
$1:function(a){var z,y
z=this.c
if(a>=z.length)return H.e(z,a)
z=J.K(this.b.h(0,z[a]),this.a.a)
y=this.d
if(typeof z!=="number")return z.dj()
if(typeof y!=="number")return H.n(y)
return z/y}},tf:{"^":"a:0;a",
$1:function(a){var z=this.a
if(typeof a!=="number")return a.dj()
if(typeof z!=="number")return H.n(z)
return C.a4.dc(a/z*1000)}}}],["","",,S,{"^":"",br:{"^":"b;",
gbb:function(){return C.j},
gc9:function(){return C.j},
dk:function(a){return this.bl(this.gR(),a)},
ko:function(a,b){},
hc:function(a,b){},
eW:function(a){return!0}}}],["","",,S,{"^":"",
nB:function(a){if(a<0||a>1)throw H.c(P.a3(a,0,1,"Probability needs to be within <0,1>.",null))
if(a===0)return!1
if(a===1)return!0
return $.$get$bq().hb()<a},
nz:function(a,b){var z,y,x,w,v
z=$.$get$bq().hb()*b
for(y=new H.bN(a,a.gi(a),0,null,[H.A(a,"aJ",0)]),x=0,w=0;y.m();){v=y.d
if(typeof v!=="number")return H.n(v)
x+=v
if(x>=z)return w;++w}throw H.c(P.a_("The weights do not add up to total="+b))},
nA:function(a,b){var z,y,x,w,v,u,t
z=$.$get$bq().aA(b)
for(y=a.length,x=0,w=0,v=0;u=a.length,v<u;u===y||(0,H.ab)(a),++v){t=a[v]
if(typeof t!=="number")return H.n(t)
x+=t
if(x>=z)return w;++w}throw H.c(P.a_("The weights do not add up to total="+b))},
hF:function(a){var z=$.$get$bq().aA(3)
if(z<0||z>=3)return H.e(a,z)
return a[z]},
da:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=J.T(a)
y=z.be(a,"{")
if(y!==-1){x=J.K(z.gi(a),1)
if(typeof x!=="number")return H.n(x)
x=y<x}else x=!1
if(x){w=H.r([],[P.q])
w.push(y)
u=y+1
t=null
s=1
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.n(x)
if(!(u<x)){v=null
break}r=z.h(a,u)
x=J.l(r)
if(x.q(r,"{"))++s
else if(x.q(r,"|")&&s===1)w.push(u)
else if(x.q(r,"}")){--s
if(s===0){w.push(u)
v=u
t=v
break}}q=u+1
t=u
u=q}p=w.length-1
if(p>1){o=$.$get$bq().aA(p)
z=z.a1(a,0,y)
x=w.length
if(o<0||o>=x)return H.e(w,o)
n=w[o]
m=o+1
if(m>=x)return H.e(w,m)
m=z+H.d(S.da(C.b.a1(a,n+1,w[m])))
if(typeof v!=="number")return v.G()
n=a.length
m+=C.b.a1(a,v+1,n)
z=m.charCodeAt(0)==0?m:m
if(t===n-1)return z
else return S.da(z)}else if(t===J.K(z.gi(a),1))return a
else{if(typeof t!=="number")return t.G()
x=t+1
return z.a1(a,0,x)+H.d(S.da(C.b.bo(a,x)))}}else return a},
cn:function(a,b,c,d){switch($.$get$bq().aA(2)){case 0:a.$0()
break
case 1:b.$0()
break
case 2:c.$0()
break
case 4:d.$0()
break}}}],["","",,Y,{"^":"",aA:{"^":"b;af:a<,ai:b<,aC:c<,kq:d<,e,cV:f@,bi:r<,bg:x<,jK:y<,hI:z<,ct:Q<,ch,kb:cx<,R:cy<",
h:function(a,b){switch(b){case"string":return this.a
case"subject":return this.b
case"object":return this.c
case"owner":return this.d
case"but":return this.f
case"positive":return this.r
case"negative":return this.x
case"endSentence":return this.y
case"startSentence":return!1
case"wholeSentence":return this.Q
case"time":return this.cy
default:throw H.c(P.a_("Invalid key "+H.d(b)+"."))}}},ah:{"^":"b;a,R:b<,c",
bv:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){if(b==null||J.f(b,""))return
n=this.b
if((J.am(b).d0(b,".")||C.b.d0(b,"!")||C.b.d0(b,"?"))&&C.b.cC(b,P.G("[A-Z]",!0,!1)))o=!0
this.a.push(new Y.aA(b,m,h,j,i,d,k,g,e,!1,o,c,!1,n))},
l:function(a,b){return this.bv(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,null,!1)},
aY:function(a,b,c){return this.bv(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,null,null,c)},
e8:function(a,b,c){return this.bv(a,b,null,!1,!1,!1,!1,null,null,null,!1,!1,c,null,!1)},
ja:function(a,b,c,d){return this.bv(a,b,null,!1,c,!1,!1,null,null,null,!1,!1,d,null,!1)},
ca:function(a,b,c,d,e,f,g,h,i){return this.bv(a,b,null,c,d,!1,e,f,g,null,h,!1,i,null,!1)},
jb:function(a,b,c,d){return this.bv(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,d,null,!1)},
j9:function(a,b,c){return this.bv(a,b,null,!1,!1,!1,!1,c,null,null,!1,!1,null,null,!1)},
e9:function(){return this.aY(0,"\n\n",!0)},
du:[function(a){var z=J.I(a)
if(z.W(a,0)||z.bk(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaf()}},"$1","gaf",2,0,3],
T:[function(a){var z=J.I(a)
if(z.W(a,0)||z.bk(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gai()}},"$1","gai",2,0,1],
am:[function(a){var z=J.I(a)
if(z.W(a,0)||z.bk(a,this.a.length))return
else{z=this.a
if(a>>>0!==a||a>=z.length)return H.e(z,a)
return z[a].gaC()}},"$1","gaC",2,0,1],
kM:function(a){var z,y,x
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gR()!=null){y=a-1
if(this.aI(y)){if(y<0||y>=z.length)return H.e(z,y)
y=z[y].gR()==null}else y=!0}else y=!0
if(y)return 1000
else{if(a>=z.length)return H.e(z,a)
y=z[a].gR()
x=a-1
if(x<0||x>=z.length)return H.e(z,x)
x=z[x].gR()
if(typeof y!=="number")return y.O()
if(typeof x!=="number")return H.n(x)
return y-x}},
cP:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gai()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gai()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gai())
if(b<0||b>=z.length)return H.e(z,b)
z=J.L(z[b].gai())
return y==null?z==null:y===z},
iV:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gaC())
if(b<0||b>=z.length)return H.e(z,b)
return J.f(y,J.L(z[b].gaC()))},
ef:function(a,b){var z,y,x
if(!this.aI(a)||!this.aI(b))return!1
z=this.a
if(a<0||a>=z.length)return H.e(z,a)
if(z[a].gai()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gai()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
if(z[a].gaC()!=null){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gaC()==null}else y=!0
if(y)return!1
if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gai())
if(b<0||b>=z.length)return H.e(z,b)
x=J.L(z[b].gaC())
if(y==null?x==null:y===x){if(a>=z.length)return H.e(z,a)
y=J.L(z[a].gaC())
if(b>=z.length)return H.e(z,b)
z=J.f(y,J.L(z[b].gai()))}else z=!1
return z},
aI:function(a){if(a>=this.a.length||a<0)return!1
else return!0},
hv:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
if(this.ef(a,b)&&this.T(a).bT(this.T(b))){z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbi()){if(b>=z.length)return H.e(z,b)
y=z[b].gbg()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbg()){if(b>=z.length)return H.e(z,b)
z=z[b].gbi()}else z=!1
if(z)return!0}if(!this.cP(a,b))return!1
z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbi()){if(b>=z.length)return H.e(z,b)
y=z[b].gbi()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbg()){if(b>=z.length)return H.e(z,b)
z=z[b].gbg()}else z=!1
if(z)return!0
else return!1},
kp:function(a,b){var z,y
if(!this.aI(a)||!this.aI(b))return!1
if(this.ef(a,b)&&this.T(a).bT(this.T(b))){z=this.a
if(a>=z.length)return H.e(z,a)
if(z[a].gbi()){if(b<0||b>=z.length)return H.e(z,b)
y=z[b].gbi()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbg()){if(b<0||b>=z.length)return H.e(z,b)
z=z[b].gbg()}else z=!1
if(z)return!0}z=this.a
if(a>=z.length)return H.e(z,a)
y=z[a].gai()
if(b<0||b>=z.length)return H.e(z,b)
if(this.iW(y,z[b].gai())){if(a>=z.length)return H.e(z,a)
if(z[a].gbi()){if(b>=z.length)return H.e(z,b)
y=z[b].gbg()}else y=!1
if(y)return!0
if(a>=z.length)return H.e(z,a)
if(z[a].gbg()){if(b>=z.length)return H.e(z,b)
z=z[b].gbi()}else z=!1
if(z)return!0}return!1},
iW:function(a,b){if(a==null||b==null)return!1
return J.f(a.gad(),b.gad())},
fw:function(a,b,c,d,e,f,g,h){b=J.t(J.t(J.t(J.t(b,d,""),e,""),f,""),g,"")
return b},
cT:function(a,b,c,d,e){var z,y
if(!c.gd4()){z=this.c
y=z.h(0,c.gp(c))
if(y==null)y=-1
if(typeof y!=="number")return y.W()
if(typeof e!=="number")return H.n(e)
if(y<e)a=J.c4(a,b,"the "+b)
else{y=J.am(a)
a=J.cO(c.gn(c),P.G("[aeiouy]",!1,!1))?y.eA(a,b,"an "+b):y.eA(a,b,"a "+b)
z.j(0,c.gp(c),e)}}return a},
geh:function(){return C.a.au(this.a,new Y.ov())},
kz:function(){if(!this.geh()){C.a.si(this.a,0)
return}var z=this.a
C.a.d9(z,0,C.a.be(z,C.a.h2(z,new Y.oA()))+1)},
k:function(a){return this.d8()},
hg:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=C.a.ah(z,[],new Y.ow())
C.a.aM(z,"retainWhere")
C.a.e3(z,new Y.ox(y),!1)
x=a&&this.geh()?C.a.be(z,C.a.h2(z,new Y.oy()))+1:z.length
if(x<1)return""
for(w=-1,v=!0,u=!1,t=!1,s=0,r="";s<x;++s){q=s===0
if(!q){p=s-1
o=this.ef(p,s)
if(s>=z.length)return H.e(z,s)
if(z[s].gcV()||this.kp(s,p)){if(p<0||p>=z.length)return H.e(z,p)
t=!z[p].gcV()}else t=!1
if(s>=z.length)return H.e(z,s)
z[s].scV(t)
n=s-w
if(n<3)if(!u){if(s>=z.length)return H.e(z,s)
z[s].ghI()
if(p<0||p>=z.length)return H.e(z,p)
if(!z[p].gjK()){if(s>=z.length)return H.e(z,s)
if(!z[s].gct())if(this.cP(s,p)||o)if(!(t&&n>1)){if(t){if(p>=z.length)return H.e(z,p)
n=z[p].gcV()}else n=!1
n=n||this.kM(s)>4}else n=!0
else n=!0
else n=!0}else n=!0
v=n}else v=!0
else v=!0
if(v){if(p<0||p>=z.length)return H.e(z,p)
if(z[p].gct()){r+=" "
p=r}else{r+=". "
p=r}if(t){if(s>=z.length)return H.e(z,s)
n=!z[s].gct()}else n=!1
r=n?r+"But ":p
u=!1}else if(t){r+=S.hF([" but "," but ",", but "])
u=!this.hv(s,s+1)&&!0}else{r+=S.hF([" and "," and ",", and "])
u=!0}}m=this.du(s)
p=!v
if(p){n=s-1
if(this.cP(s,n))if(J.cO(this.du(n),"<subject> "))if(J.cO(m,"<subject> "))m=H.jq(m,"<subject> ","",0)}l=J.t(m,"<action>",this.du(s))
if(this.iV(s,s-1))n=!(this.am(s).gI()===C.l&&this.T(s).gI()===C.l)
else n=!1
if(n)l=J.t(J.t(J.t(J.t(l,"<object-owner's> <object>",this.am(s).gI().b),"<object-ownerPronoun's> <object>",this.am(s).gI().b),"<object>",this.am(s).gI().b),"<object's>",this.am(s).gI().c)
if(this.cP(s,s-1))l=J.t(J.t(J.t(J.t(l,"<owner's> <subject>",this.T(s).gI().a),"<ownerPronoun's> <subject>",this.T(s).gI().a),"<subject>",this.T(s).gI().a),"<subject's>",this.T(s).gI().c)
n=s-1
if(this.am(n)!=null&&this.T(s)!=null&&this.T(n)!=null&&J.f(J.L(this.am(n)),J.L(this.T(s)))&&this.T(n).gI()!==this.T(s).gI())l=J.t(J.t(J.t(J.t(l,"<owner's> <subject>",this.T(s).gI().a),"<ownerPronoun's> <subject>",this.T(s).gI().a),"<subject>",this.T(s).gI().a),"<subject's>",this.T(s).gI().c)
if(this.T(n)!=null)if(this.am(s)!=null){k=J.L(this.T(n))
j=J.L(this.am(s))
n=(k==null?j==null:k===j)&&this.T(n).gI()!==this.T(s).gI()}else n=!1
else n=!1
if(n)l=J.t(J.t(J.t(J.t(l,"<object-owner's> <object>",this.am(s).gI().a),"<object-ownerPronoun's> <object>",this.am(s).gI().a),"<object>",this.am(s).gI().b),"<object's>",this.am(s).gI().c)
if(s>=z.length)return H.e(z,s)
n=z[s]
i=n.gai()
h=n.gaC()
g=n.gkq()
f=n.e
if(i!=null){e=i.gU()?J.t(J.t(l,"<subject>","you"),"<subject's>","your"):l
k=i.gI()===C.I||i.gI()===C.al
j=J.am(e)
e=J.c4(k?J.t(J.t(J.t(J.t(J.t(j.bV(e,"<s>",""),"<es>",""),"<ies>","y"),"<does>","do"),"<is>","are"),"<has>","have"):J.t(J.t(J.t(J.t(J.t(j.bV(e,"<s>","s"),"<es>","es"),"<ies>","ies"),"<does>","does"),"<is>","is"),"<has>","has"),"<subject>","<subjectNoun>")
j=i.gI()
e=H.cG(e,"<subject>",j.a)
k=n.cy
e=J.c4(this.cT(e,"<subjectNoun>",i,g,k),"<subjectNoun>",i.gn(i))
j=i.gI()
e=H.cG(e,"<subjectPronoun>",j.a)
e=J.c4(this.cT(J.cK(l,P.G("<subject>.+<subject's>",!0,!1))===!0?J.t(e,"<subject's>",i.gI().c):e,"<subject's>",i,g,k),"<subject's>",H.d(i.gn(i))+"'s")
k=i.gI()
e=J.t(H.cG(e,"<subject's>",k.c),"<subjectPronoun's>",i.gI().c)}else e=l
if(h!=null){e=h.gU()?J.t(J.t(e,"<object>","you"),"<object's>","your"):J.t(this.cT(e,"<object>",h,f,n.cy),"<object>",h.gn(h))
e=J.t(e,"<objectPronoun>",h.gI().b)
if(J.cK(l,P.G("<object>.+<object's>",!0,!1))===!0)e=J.t(e,"<object's>",h.gI().c)
e=J.c4(this.cT(e,"<object's>",h,f,n.cy),"<object's>",H.d(h.gn(h))+"'s")
k=h.gI()
e=J.t(H.cG(e,"<object's>",k.c),"<objectPronoun's>",h.gI().c)}n=n.cy
m=S.da(this.fw(f,this.fw(g,e,l,"<owner>","<owner's>","<ownerPronoun>","<ownerPronoun's>",n),l,"<object-owner>","<object-owner's>","<object-ownerPronoun>","<object-ownerPronoun's>",n))
r+=H.d((!p||q)&&!t?Y.ou(m):m)
if(v)w=s
if(s>=z.length)return H.e(z,s)
if(z[s].gct())u=!0}q=x-1
if(q>>>0!==q||q>=z.length)return H.e(z,q)
z=!z[q].gct()?r+".":r
return H.v5(z.charCodeAt(0)==0?z:z,$.$get$hV(),new Y.oz(),null)},
d8:function(){return this.hg(!1)},
t:{
ou:function(a){var z,y
z=J.T(a)
if(z.F(a,"\n\n")!==!0)a=z.kR(a)
z=J.T(a)
if(z.gD(a)===!0)return a
y=J.jW(z.h(a,0))
if(J.f(z.gi(a),1))return y
else return y+z.bo(a,1)}}},ov:{"^":"a:0;",
$1:function(a){return J.f(a.gaf(),"\n\n")}},oA:{"^":"a:0;",
$1:function(a){return J.f(a.gaf(),"\n\n")}},ow:{"^":"a:41;",
$2:function(a,b){var z,y
z=J.T(a)
y=z.gZ(a)?z.gB(a):null
if(y!=null)y.gkb()
z.l(a,b)
return a}},ox:{"^":"a:42;a",
$1:function(a){return J.cK(this.a,a)}},oy:{"^":"a:0;",
$1:function(a){return J.f(a.gaf(),"\n\n")}},oz:{"^":"a:52;",
$1:function(a){return H.d(a.h(0,1))+H.d(a.h(0,2))+H.d(a.h(0,3))}},bL:{"^":"n7;d4:a<,n:b>,c,ad:d<,U:e<,I:f<",
gp:function(a){return H.al(this)},
gek:function(){return!0},
gbD:function(){return!0}},n7:{"^":"b+e3;"},e3:{"^":"b;",
gck:function(){if(this.gbD()){this.gek()
var z=!0}else z=!1
return z},
bT:function(a){var z,y
z=this.gad()
y=$.$get$bA()
if(J.f(z,y)||J.f(a.gad(),y))return!1
return!J.f(this.gad(),a.gad())},
aT:function(a,b,c,d,e,f,g,h){J.ay(a,b,c,d,e,f,g,h,H.c1(this,"$isbL"))},
bG:function(a,b,c){return this.aT(a,b,!1,!1,!1,c,null,!1)},
aS:function(a,b){return this.aT(a,b,!1,!1,!1,null,null,!1)},
kE:function(a,b,c,d){return this.aT(a,b,c,!1,!1,null,null,d)},
da:function(a,b,c,d){return this.aT(a,b,c,!1,!1,d,null,!1)},
eB:function(a,b,c){return this.aT(a,b,!1,!1,!1,null,null,c)},
bF:function(a,b,c){return this.aT(a,b,!1,!1,c,null,null,!1)},
bH:function(a,b,c,d){return this.aT(a,b,!1,!1,!1,c,null,d)},
kF:function(a,b,c,d){return this.aT(a,b,!1,c,d,null,null,!1)},
kD:function(a,b,c){return this.aT(a,b,!1,c,!1,null,null,!1)},
kG:function(a,b,c,d){return this.aT(a,b,!1,!1,c,d,null,!1)}},cm:{"^":"b;a,b,c,d",
k:function(a){return this.a}}}],["","",,L,{"^":"",i0:{"^":"b;"},tJ:{"^":"a:0;",
$1:function(a){a.gc8().b=0
return 0}},uf:{"^":"a:0;",
$1:function(a){a.gc8().b=1
return 1}},tU:{"^":"a:0;",
$1:function(a){a.gc8().b=2
return 2}},pw:{"^":"i0;p:a>",
aE:function(a){var z=new L.i1(null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.i0))return!1
z=this.a
y=b.a
return z==null?y==null:z===y},
gv:function(a){return Y.aZ(Y.y(0,J.x(this.a)))},
k:function(a){return"Team {id="+J.w(this.a)+",\n}"},
t:{
eE:function(a){var z=new L.i1(null,null)
a.$1(z)
return z.C()}}},i1:{"^":"b;a,b",
gp:function(a){return this.gc8().b},
gc8:function(){var z=this.a
if(z!=null){this.b=z.a
this.a=null}return this},
C:function(){var z,y
z=this.a
if(z==null){y=this.gc8().b
z=new L.pw(y)
if(y==null)H.o(P.J("id"))}this.a=z
return z}}}],["","",,X,{"^":"",
iT:function(a,b){return new P.dy(function(){var z=a,y=b
var x=0,w=1,v,u,t,s,r,q
return function $async$iT(c,d){if(c===1){v=d
x=w}while(true)switch(x){case 0:u=z.a
t=new J.bh(u,u.length,0,null,[H.p(u,0)])
u=y.a
s=new J.bh(u,u.length,0,null,[H.p(u,0)])
case 2:if(!!0){x=3
break}r=t.m()
q=s.m()
x=r?4:5
break
case 4:x=6
return t.d
case 6:case 5:x=q?7:8
break
case 7:x=9
return s.d
case 9:case 8:if(!r&&!q){x=3
break}x=2
break
case 3:return P.du()
case 1:return P.dv(v)}}})}}],["","",,A,{"^":"",ai:{"^":"b;j6:a<,b,c,d,e,R:f<",
gv:function(a){return X.j9(X.aM(this.a),X.aM(this.c),X.aM(this.e),this.f)},
q:function(a,b){var z
if(b==null)return!1
z=J.l(b)
return!!z.$isai&&this.gv(this)===z.gv(b)},
h_:function(a){var z,y,x
z=this.dQ(a)
if(z==null)throw H.c(new P.z("Tried to elapseSituationTime of situation id="+H.d(a)+" that doesn't exist in situations ("+H.d(this.e)+")."))
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
x=y[z].bd()
if(z!==(z|0)||z>=y.length)return H.e(y,z)
y[z]=x},
bd:function(){var z=this.f
if(typeof z!=="number")return z.G()
this.f=z+1},
a0:function(a){return this.a.b3(0,new A.pn(a))},
hu:function(a){var z,y
z=this.dQ(a)
if(z==null)return
y=this.e
if(z!==(z|0)||z>=y.length)return H.e(y,z)
return y[z]},
cp:function(a){var z=this.e
while(!0){if(!(z.length!==0&&!J.f(J.M(C.a.gB(z)),a)))break
C.a.hh(z)}if(z.length===0)throw H.c(P.a_("Tried to pop situations until "+a+" but none was found in stack."))},
ew:function(a){C.a.l(this.e,a)},
k:function(a){var z,y
z=this.a
y=z.fu()
y.K(0,z)
return"World<"+P.bl(y,"{","}")+">"},
aH:function(a,b){var z,y,x
z=this.a0(a)
y=z.aE(b)
x=this.a
x.E(0,z)
x.l(0,y)},
dQ:function(a){var z,y,x
y=this.e
x=0
while(!0){if(!(x<y.length)){z=null
break}if(J.f(J.L(y[x]),a)){z=x
break}++x}return z},
i5:function(a){var z
this.a.K(0,a.a)
z=a.c
this.c.K(0,new H.bJ(z,new A.pl(),[H.p(z,0),null]))
this.b.K(0,a.b)
z=a.d
this.d.K(0,new H.bJ(z,new A.pm(),[H.p(z,0),null]))
C.a.K(this.e,a.e)
this.f=a.f},
t:{
im:function(a){var z,y
z=P.H(null,null,null,R.S)
y=P.H(null,null,null,O.cP)
y=new A.ai(z,P.H(null,null,null,U.e9),y,P.H(null,null,null,null),[],null)
y.i5(a)
return y}}},pl:{"^":"a:0;",
$1:function(a){var z,y,x,w,v,u,t
z=a.gR()
y=a.gfN()
x=a.gcd()
w=a.ghf()
v=P.q
u=P.aT(a.gke(),v)
t=R.k0(a.r,P.U)
return new O.cP(x,y,z,w,P.H(null,null,null,v),u,t)}},pm:{"^":"a:0;",
$1:function(a){var z=a.gj5()
return new K.mU(P.aT(a.a,K.mV),z,a.c)}},pn:{"^":"a:0;a",
$1:function(a){return J.f(J.L(a),this.a)}}}],["","",,S,{"^":"",
fJ:function(a,b){var z=new S.e0(null,null,null,null,null)
new S.tL(a,b).$1(z)
return z.C()},
fI:{"^":"br;",
gbb:function(){return[$.$get$j_()]},
gc9:function(){return[$.$get$fh()]},
gn:function(a){return"CounterAttackSituation"},
bd:function(){var z=new S.e0(null,null,null,null,null)
z.a=this
new S.kB().$1(z)
return z.C()},
bl:function(a,b){if(a===0)return b.a0(this.a)
return},
bm:function(a,b){return new H.a4(a,new S.kC(this),[H.p(a,0)])}},
tL:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aA(1073741823)
a.gao().c=z
a.gao().e=0
z=this.a
z=z.gp(z)
a.gao().b=z
z=J.L(this.b)
a.gao().d=z
return a}},
kB:{"^":"a:0;",
$1:function(a){var z=a.gao().e
if(typeof z!=="number")return z.G()
a.gao().e=z+1
return a}},
kC:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gp(a),y.a)||J.f(z.gp(a),y.c)}},
pp:{"^":"fI;a,p:b>,c,R:d<",
aE:function(a){var z=new S.e0(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof S.fI))return!1
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
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"CounterAttackSituation {counterAttacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntarget="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
e0:{"^":"b;a,b,c,d,e",
gp:function(a){return this.gao().c},
gR:function(){return this.gao().e},
gao:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gao().b
x=this.gao().c
w=this.gao().d
v=this.gao().e
z=new S.pp(y,x,w,v)
if(y==null)H.o(P.J("counterAttacker"))
if(x==null)H.o(P.J("id"))
if(w==null)H.o(P.J("target"))
if(v==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,G,{"^":"",tQ:{"^":"a:7;",
$3:function(a,b,c){return a.b2(C.f)}},tT:{"^":"a:4;",
$3:function(a,b,c){return b.gJ()===C.c?0.7:0.9}},tR:{"^":"a:6;",
$4:function(a,b,c,d){var z
a.bG(d,"<subject> swing<s> back at <object>",b)
c.ew(M.hP(a,b))
z=L.hN(a,b)
C.a.l(c.e,z)
return H.d(a.gn(a))+" swings back at "+H.d(J.M(b))}},tS:{"^":"a:6;",
$4:function(a,b,c,d){var z
a.aS(d,"<subject> tr<ies> to swing back")
a.toString
z=J.aj(d)
z.ca(d,"<subject> {go<es> wide|miss<es>}",!0,!1,!1,null,null,!1,a)
if(a.gJ()===C.c){c.aH(a.r,new G.rj())
z.ca(d,"<subject> lose<s> balance because of that",!1,!0,!0,null,null,!1,a)}return H.d(a.ch)+" fails to swing back at "+H.d(J.M(b))}},rj:{"^":"a:0;",
$1:function(a){a.sJ(C.i)
return a}}}],["","",,X,{"^":"",
jk:function(a,b){var z
switch($.$get$iM().aA(3)){case 0:b.kF(a,"<subject> collapse<s>, dead",!0,!0)
break
case 1:b.bF(a,"<subject> fall<s> backward",!0)
b.toString
z=J.aj(a)
z.ca(a,"<subject> twist<s>",!1,!1,!0,null,null,!1,b)
z.ca(a,"<subject> hit<s> the ground face down",!1,!0,!0,null,null,!1,b)
break
case 2:b.bF(a,"<subject> drop<s> to <subject's> knees",!0)
b.toString
J.ay(a,"<subject> keel<s> over",!1,!1,!0,null,null,!1,b)
break}a.e9()}}],["","",,X,{"^":"",tC:{"^":"a:8;",
$3:function(a,b,c){return a.b2(C.f)}},tF:{"^":"a:4;",
$3:function(a,b,c){if(a.gU())return 1
return 0.5-(a.gJ()===C.c?0:0.2)}},tD:{"^":"a:5;",
$4:function(a,b,c,d){if(a.gU())a.aS(d,"<subject> {step<s>|take<s> a step} back")
a.eB(d,"<subject> {parr<ies> it|deflect<s> it|meet<s> it with <subject's> "+a.gaj().f+"|fend<s> it off}",!0)
if(a.e!==C.c){c.aH(a.r,new X.rB())
if(a.z)J.ay(d,"<subject> regain<s> balance",!1,!1,!1,null,null,!1,a)}c.cp("FightSituation")
return H.d(a.ch)+" steps back and parries "+H.d(J.M(b))}},rB:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return a}},tE:{"^":"a:20;",
$4:function(a,b,c,d){a.aS(d,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gaj().f+"|fend it off}")
if(a.e===C.i)J.ay(d,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cn(new X.rz(a,d),new X.rA(a,b,d),null,null)
return H.d(a.ch)+" fails to dodge "+H.d(J.M(b))}},rz:{"^":"a:1;a,b",
$0:function(){J.ay(this.b,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},rA:{"^":"a:1;a,b,c",
$0:function(){return this.b.da(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,F,{"^":"",tZ:{"^":"a:8;",
$3:function(a,b,c){return a.gJ()!==C.n}},u1:{"^":"a:4;",
$3:function(a,b,c){var z=a.gJ()===C.c?0:0.2
if(a.gU())return 0.7-z
return 0.4-z}},u_:{"^":"a:6;",
$4:function(a,b,c,d){var z
a.bH(d,"<subject> {dodge<s>|sidestep<s>} it",b,!0)
if(b.gJ()===C.c){b.kD(d,"<subject> lose<s> balance because of that",!0)
c.aH(b.r,new F.rn())}c.cp("FightSituation")
if(a.gU())J.cI(d,"this opens an opportunity for a counter attack")
z=S.fJ(a,b)
C.a.l(c.e,z)
return H.d(a.gn(a))+" dodges "+H.d(b.gn(b))}},rn:{"^":"a:0;",
$1:function(a){a.sJ(C.i)
return C.i}},u0:{"^":"a:6;",
$4:function(a,b,c,d){a.aS(d,"<subject> tr<ies> to {dodge|sidestep}")
if(a.gJ()===C.i)J.ay(d,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cn(new F.rl(a,d),new F.rm(a,b,d),null,null)
return H.d(a.ch)+" fails to dodge "+H.d(J.M(b))}},rl:{"^":"a:1;a,b",
$0:function(){J.ay(this.b,"<subject> {can't|fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},rm:{"^":"a:1;a,b,c",
$0:function(){return this.b.da(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,U,{"^":"",
li:function(a,b){var z=new U.cZ(null,null,null,null,null,null)
new U.u4(a,b).$1(z)
return z.C()},
h1:{"^":"br;",
gbb:function(){return H.r([$.$get$jc(),$.$get$jp(),$.$get$jm()],[Q.fv])},
gc9:function(){return H.r([$.$get$jj(),$.$get$jn()],[Q.dS])},
gn:function(a){return"FightSituation"},
bd:function(){var z=new U.cZ(null,null,null,null,null,null)
z.a=this
new U.lj().$1(z)
return z.C()},
bl:function(a,b){var z,y,x
z=X.iT(this.d,this.a)
y=H.A(z,"F",0)
x=P.a7(new H.a4(z,new U.lk(b),[y]),!1,y)
y=x.length
if(typeof a!=="number")return a.eR()
return b.a0(x[C.k.eR(a,y)])},
bm:function(a,b){return new H.a4(a,new U.ll(this),[H.p(a,0)])},
hc:function(a,b){var z,y
z=this.e
y=this.b.a
if(y.M(0,z))y.h(0,z).$2(a,b)},
eW:function(a){var z,y
z=new U.lm(a)
y=this.d
if(z.$1(y)===!0)if(z.$1(this.a)===!0){z=y.a
z=(z&&C.a).au(z,new U.lo(a))}else z=!1
else z=!1
return z}},
u4:{"^":"a:0;a,b",
$1:function(a){var z,y,x
z=$.$get$be().aA(1073741823)
a.gaa().d=z
a.gaa().f=0
z=a.gaa()
y=z.e
if(y==null){y=new S.bm(null,null,[P.q])
y.aX()
y.ac(0,C.j)
z.e=y
z=y}else z=y
y=[null,null]
z.ac(0,new H.ao(this.a,new U.rg(),y))
z=a.gaa()
x=z.b
if(x==null){x=new S.bm(null,null,[P.q])
x.aX()
x.ac(0,C.j)
z.b=x
z=x}else z=x
z.ac(0,new H.ao(this.b,new U.rh(),y))
return a}},
rg:{"^":"a:0;",
$1:function(a){return J.L(a)}},
rh:{"^":"a:0;",
$1:function(a){return J.L(a)}},
lj:{"^":"a:0;",
$1:function(a){var z=a.gaa().f
if(typeof z!=="number")return z.G()
a.gaa().f=z+1
return a}},
lk:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gck()}},
ll:{"^":"a:10;a",
$1:function(a){var z,y,x
if(a.gck()){z=this.a
y=a.gp(a)
x=z.d.a
if(!(x&&C.a).F(x,y)){y=a.gp(a)
z=z.a.a
y=(z&&C.a).F(z,y)
z=y}else z=!0}else z=!1
return z}},
lm:{"^":"a:50;a",
$1:function(a){var z=a.a
return(z&&C.a).au(z,new U.ln(this.a))}},
ln:{"^":"a:0;a",
$1:function(a){return this.a.a0(a).gck()}},
lo:{"^":"a:51;a",
$1:function(a){var z=this.a.a0(a)
return z.gU()&&z.gck()}},
pq:{"^":"h1;a,b,p:c>,d,R:e<",
aE:function(a){var z=new U.cZ(null,null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.h1))return!1
if(J.f(this.a,b.a))if(J.f(this.b,b.b)){z=this.c
y=b.c
if(z==null?y==null:z===y)if(J.f(this.d,b.d)){z=this.e
y=b.e
y=z==null?y==null:z===y
z=y}else z=!1
else z=!1}else z=!1
else z=!1
return z},
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)),J.x(this.e)))},
k:function(a){return"FightSituation {enemyTeamIds="+J.w(this.a)+",\nevents="+J.w(this.b)+",\nid="+J.w(this.c)+",\nplayerTeamIds="+J.w(this.d)+",\ntime="+J.w(this.e)+",\n}"}},
cZ:{"^":"b;a,b,c,d,e,f",
gp:function(a){return this.gaa().d},
gR:function(){return this.gaa().f},
gaa:function(){var z,y
z=this.a
if(z!=null){z=z.a
if(!(z==null)){y=new S.bm(null,null,[H.p(z,0)])
y.aX()
y.ac(0,z)
z=y}this.b=z
z=this.a.b
if(!(z==null)){y=new A.ci(null,null,[H.p(z,0),H.p(z,1)])
y.bp()
y.ac(0,z)
z=y}this.c=z
z=this.a
this.d=z.c
z=z.d
if(!(z==null)){y=new S.bm(null,null,[H.p(z,0)])
y.aX()
y.ac(0,z)
z=y}this.e=z
this.f=this.a.e
this.a=null}return this},
C:function(){var z,y,x,w,v,u
z=this.a
if(z==null){y=this.gaa()
x=y.b
if(x==null){x=new S.bm(null,null,[P.q])
x.aX()
x.ac(0,C.j)
y.b=x
y=x}else y=x
y=y==null?y:y.C()
x=this.gaa()
w=x.c
if(w==null){w=new A.ci(null,null,[P.q,{func:1,v:true,args:[A.ai,Y.ah]}])
w.bp()
w.ac(0,C.v)
x.c=w
x=w}else x=w
x=x==null?x:x.C()
w=this.gaa().d
v=this.gaa()
u=v.e
if(u==null){u=new S.bm(null,null,[P.q])
u.aX()
u.ac(0,C.j)
v.e=u
v=u}else v=u
v=v==null?v:v.C()
u=this.gaa().f
z=new U.pq(y,x,w,v,u)
if(y==null)H.o(P.J("enemyTeamIds"))
if(x==null)H.o(P.J("events"))
if(w==null)H.o(P.J("id"))
if(v==null)H.o(P.J("playerTeamIds"))
if(u==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,Y,{"^":"",u2:{"^":"a:7;",
$3:function(a,b,c){return a.gJ()===C.c}},u6:{"^":"a:4;",
$3:function(a,b,c){var z=a.gJ()===C.c?0:0.2
if(a.gU())return 0.7-z
return 0.5-z}},u3:{"^":"a:5;",
$4:function(a,b,c,d){if(b.gJ()===C.c||b.gJ()===C.i){S.cn(new Y.rq(a,b,d),new Y.rr(a,b,d),null,null)
c.aH(b.gp(b),new Y.rs())}else a.bG(d,"<subject> kick<s> <object> on the ground",b)
return H.d(J.M(a))+" kicks "+H.d(b.gn(b))}},rq:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.b
this.a.bG(z,"<subject> kick<s> <object>",y)
if(S.nB(0.5))y.aS(z,"<subject> flail<s> <subject's> arms")
y.bF(z,"<subject> fall<s>{| to the ground}",!0)}},rr:{"^":"a:1;a,b,c",
$0:function(){var z,y
z=this.c
y=this.b
this.a.bH(z,"<subject> kick<s> <object> off <object's> feet",y,!0)
if(y.gU())y.bF(z,"<subject> land<s> on the ground",!0)}},rs:{"^":"a:0;",
$1:function(a){a.sJ(C.n)
return a}},u5:{"^":"a:20;",
$4:function(a,b,c,d){var z
a.bG(d,"<subject> kick<s> <object>",b)
if(b.gJ()===C.c){if(a.gU())b.kG(d,"<subject> lose<s> <object>",!0,$.$get$f4())
c.aH(b.gp(b),new Y.ro())}if(c.a0(b.gp(b)).gJ()===C.i){z=U.n8(b,a)
C.a.l(c.e,z)}return H.d(a.gn(a))+" kicks "+H.d(b.gn(b))+" off balance"}},ro:{"^":"a:0;",
$1:function(a){a.sJ(C.i)
return a}}}],["","",,U,{"^":"",
n8:function(a,b){var z=new U.ej(null,null,null,null,null)
new U.u7(a,b).$1(z)
return z.C()},
hy:{"^":"br;",
gbb:function(){return[$.$get$fg()]},
gc9:function(){return[$.$get$fh()]},
gn:function(a){return"OffBalanceOpportunitySituation"},
bd:function(){var z=new U.ej(null,null,null,null,null)
z.a=this
new U.n9().$1(z)
return z.C()},
bl:function(a,b){var z,y,x,w,v
if(typeof a!=="number")return a.ae()
if(a>0)return
z=b.a0(this.a)
y=b.a
x=H.p(y,0)
w=P.a7(new H.a4(y,new U.na(this,z),[x]),!0,x)
if(w.length!==0){v=C.a.gN(w)
if($.$get$fg().b.$3(v,z,b)===!0)return v}return},
bm:function(a,b){return new H.a4(a,new U.nb(b.a0(this.a)),[H.p(a,0)])}},
u7:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aA(1073741823)
a.gap().d=z
a.gap().e=0
z=this.a
z=z.gp(z)
a.gap().b=z
z=this.b
z=z==null?z:z.gp(z)
a.gap().c=z
return a}},
n9:{"^":"a:0;",
$1:function(a){var z=a.gap().e
if(typeof z!=="number")return z.G()
a.gap().e=z+1
return a}},
na:{"^":"a:10;a,b",
$1:function(a){var z,y
if(a.gck())if(a.bT(this.b)){z=a.gp(a)
y=this.a.b
y=z==null?y!=null:z!==y
z=y}else z=!1
else z=!1
return z}},
nb:{"^":"a:0;a",
$1:function(a){var z=this.a
return J.f(a,z)||a.bT(z)}},
pr:{"^":"hy;a,b,p:c>,R:d<",
aE:function(a){var z=new U.ej(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof U.hy))return!1
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
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"OffBalanceOpportunitySituation {actorId="+J.w(this.a)+",\nculpritId="+J.w(this.b)+",\nid="+J.w(this.c)+",\ntime="+J.w(this.d)+",\n}"}},
ej:{"^":"b;a,b,c,d,e",
gp:function(a){return this.gap().d},
gR:function(){return this.gap().e},
gap:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gap().b
x=this.gap().c
w=this.gap().d
v=this.gap().e
z=new U.pr(y,x,w,v)
if(y==null)H.o(P.J("actorId"))
if(w==null)H.o(P.J("id"))
if(v==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,A,{"^":"",u8:{"^":"a:8;",
$3:function(a,b,c){return a.gJ()===C.c&&b.gJ()===C.i&&a.b2(C.f)}},ub:{"^":"a:4;",
$3:function(a,b,c){if(a.gU())return 0.6
return 0.5}},u9:{"^":"a:5;",
$4:function(a,b,c,d){var z=J.u(b)
c.aH(z.gp(b),new A.rp())
if(c.a0(z.gp(b)).gbD()){a.bH(d,"<subject> thrust<s> {|<subject's> "+a.gaj().f+"} deep into <object's> {shoulder|hip|thigh}",b,!0)
b.bF(d,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bH(d,"<subject> {stab<s>|run<s> <subject's> "+a.gaj().f+" through} <object>",b,!0)
X.jk(d,b)}return H.d(J.M(a))+" stabs "+H.d(z.gn(b))}},rp:{"^":"a:0;",
$1:function(a){a.say(a.gay()-1)
return a}},ua:{"^":"a:6;",
$4:function(a,b,c,d){a.bG(d,"<subject> tr<ies> to stab <object>",b)
a.toString
J.ay(d,"<subject> {go<es> wide|fail<s>|miss<es>}",!0,!1,!1,null,null,!1,a)
return H.d(a.gn(a))+" fails to stab "+H.d(J.M(b))}}}],["","",,V,{"^":"",
nc:function(a,b){var z=new V.ek(null,null,null,null,null)
new V.tj(a,b).$1(z)
return z.C()},
hz:{"^":"br;",
gbb:function(){return[$.$get$je(),$.$get$jl()]},
gn:function(a){return"OnGroundDefenseSituation"},
bd:function(){var z=new V.ek(null,null,null,null,null)
z.a=this
new V.nd().$1(z)
return z.C()},
bl:function(a,b){if(a===0)return b.a0(this.c)
return},
bm:function(a,b){return new H.a4(a,new V.ne(this),[H.p(a,0)])}},
tj:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aA(1073741823)
a.gaq().c=z
a.gaq().e=0
z=this.a
z=z.gp(z)
a.gaq().b=z
z=J.L(this.b)
a.gaq().d=z
return a}},
nd:{"^":"a:0;",
$1:function(a){var z=a.gaq().e
if(typeof z!=="number")return z.G()
a.gaq().e=z+1
return a}},
ne:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gp(a),y.a)||J.f(z.gp(a),y.c)}},
ps:{"^":"hz;a,p:b>,c,R:d<",
aE:function(a){var z=new V.ek(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof V.hz))return!1
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
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"OnGroundDefenseSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntargetOnGround="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
ek:{"^":"b;a,b,c,d,e",
gp:function(a){return this.gaq().c},
gR:function(){return this.gaq().e},
gaq:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gaq().b
x=this.gaq().c
w=this.gaq().d
v=this.gaq().e
z=new V.ps(y,x,w,v)
if(y==null)H.o(P.J("attacker"))
if(x==null)H.o(P.J("id"))
if(w==null)H.o(P.J("targetOnGround"))
if(v==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,K,{"^":"",tp:{"^":"a:8;",
$3:function(a,b,c){return a.b2(C.f)}},ts:{"^":"a:4;",
$3:function(a,b,c){if(a.gU())return 0.6
return 0.3}},tq:{"^":"a:5;",
$4:function(a,b,c,d){a.eB(d,"<subject> {parr<ies> it|stop<s> it with <subject's> "+a.gaj().f+"}",!0)
c.cp("FightSituation")
return H.d(a.ch)+" parries "+H.d(J.M(b))}},tr:{"^":"a:6;",
$4:function(a,b,c,d){a.aS(d,"<subject> tr<ies> to {parry|deflect it|stop it{| with <subject's> "+a.gaj().f+"}}")
S.cn(new K.rt(a,d),new K.rx(a,b,d),null,null)
return H.d(a.ch)+" fails to parry "+H.d(J.M(b))}},rt:{"^":"a:1;a,b",
$0:function(){var z=this.a
z.toString
J.ay(this.b,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,z)
return}},rx:{"^":"a:1;a,b,c",
$0:function(){return this.b.da(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,Y,{"^":"",tk:{"^":"a:8;",
$3:function(a,b,c){return!0}},to:{"^":"a:4;",
$3:function(a,b,c){if(a.gU())return 1
return 0.5}},tl:{"^":"a:5;",
$4:function(a,b,c,d){a.kE(d,"<subject> <is> able to roll out of the way",!0,!0)
if(a.gU()){c.aH(a.gp(a),new Y.ri())
J.ay(d,"<subject> jump<s> up on <subject's> feet",!1,!1,!1,null,null,!0,a)}c.cp("FightSituation")
return H.d(a.gn(a))+" rolls out of the way of "+H.d(J.M(b))+"'s strike"}},ri:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return a}},tm:{"^":"a:6;",
$4:function(a,b,c,d){a.aS(d,"<subject> tr<ies> to roll out of the way")
a.toString
J.ay(d,"<subject> can't",!0,!1,!1,null,null,!1,a)
return H.d(a.gn(a))+" fails to roll out of the way"}}}],["","",,T,{"^":"",tg:{"^":"a:7;",
$3:function(a,b,c){return b.gJ()===C.n&&a.b2(C.f)}},ti:{"^":"a:4;",
$3:function(a,b,c){return 1}},th:{"^":"a:5;",
$4:function(a,b,c,d){var z
a.bG(d,"<subject> strike<s> down {with <subject's> "+a.gaj().f+" |}at <object>",b)
c.ew(D.oV(a,b))
z=V.nc(a,b)
C.a.l(c.e,z)
return H.d(a.ch)+" strikes down at "+H.d(J.M(b))+" on the ground"}},tu:{"^":"a:7;",
$3:function(a,b,c){return b.gJ()===C.n&&a.b2(C.f)}},tw:{"^":"a:4;",
$3:function(a,b,c){return 1}},tv:{"^":"a:5;",
$4:function(a,b,c,d){var z,y
z=J.u(b)
c.aH(z.gp(b),new T.ry())
y=J.aj(d)
y.jb(d,"<subject> {cuts|slashes|slits} <object's> {throat|neck|side}",b,a.gaj())
b.bF(d,"<subject> die<s>",!0)
y.aY(d,"\n\n",!0)
return H.d(a.gn(a))+" slains "+H.d(z.gn(b))+" on the ground"}},ry:{"^":"a:0;",
$1:function(a){a.say(0)
return a}}}],["","",,Q,{"^":"",uc:{"^":"a:13;",
$2:function(a,b){return a.gJ()===C.n}},ud:{"^":"a:4;",
$3:function(a,b,c){a.aS(c,"<subject> stand<s> up")
b.aH(a.gp(a),new Q.ru())
return H.d(a.gn(a))+" stands up"}},ru:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return C.c}},ue:{"^":"a:4;",
$3:function(a,b,c){}}}],["","",,D,{"^":"",
oV:function(a,b){var z=new D.ey(null,null,null,null,null)
new D.tt(a,b).$1(z)
return z.C()},
hX:{"^":"br;",
gbb:function(){return[$.$get$j6()]},
gn:function(a){return"StrikeDownSituation"},
bd:function(){var z=new D.ey(null,null,null,null,null)
z.a=this
new D.oW().$1(z)
return z.C()},
bl:function(a,b){if(a===0)return b.a0(this.a)
return},
bm:function(a,b){return new H.a4(a,new D.oX(this),[H.p(a,0)])}},
tt:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aA(1073741823)
a.gat().c=z
a.gat().e=0
z=this.a
z=z.gp(z)
a.gat().b=z
z=J.L(this.b)
a.gat().d=z
return a}},
oW:{"^":"a:0;",
$1:function(a){var z=a.gat().e
if(typeof z!=="number")return z.G()
a.gat().e=z+1
return a}},
oX:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gp(a),y.a)||J.f(z.gp(a),y.c)}},
pv:{"^":"hX;a,p:b>,c,R:d<",
aE:function(a){var z=new D.ey(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof D.hX))return!1
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
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"StrikeDownSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntargetOnGround="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
ey:{"^":"b;a,b,c,d,e",
gp:function(a){return this.gat().c},
gR:function(){return this.gat().e},
gat:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gat().b
x=this.gat().c
w=this.gat().d
v=this.gat().e
z=new D.pv(y,x,w,v)
if(y==null)H.o(P.J("attacker"))
if(x==null)H.o(P.J("id"))
if(w==null)H.o(P.J("targetOnGround"))
if(v==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,G,{"^":"",tG:{"^":"a:8;",
$3:function(a,b,c){return a.b2(C.f)}},tK:{"^":"a:4;",
$3:function(a,b,c){var z=a.gJ()===C.c?0:0.2
if(a.gU())return 0.6-z
return 0.3-z}},tH:{"^":"a:5;",
$4:function(a,b,c,d){var z
a.eB(d,"<subject> {parr<ies> it|meet<s> it with <subject's> "+a.gaj().f+"|fend<s> it off}",!0)
c.cp("FightSituation")
if(a.z)J.cI(d,"this opens an opportunity for a counter attack")
z=S.fJ(a,b)
C.a.l(c.e,z)
return H.d(a.ch)+" parries "+H.d(J.M(b))}},tI:{"^":"a:6;",
$4:function(a,b,c,d){a.aS(d,"<subject> tr<ies> to {parry|deflect it|meet it with <subject's> "+a.gaj().f+"|fend it off}")
if(a.e===C.i)J.ay(d,"<subject> <is> out of balance",!0,!1,!1,null,null,!1,a)
else S.cn(new G.rC(a,d),new G.rD(a,b,d),null,null)
return H.d(a.ch)+" fails to dodge "+H.d(J.M(b))}},rC:{"^":"a:1;a,b",
$0:function(){J.ay(this.b,"<subject> {fail<s>|<does>n't succeed}",!0,!1,!1,null,null,!1,this.a)
return}},rD:{"^":"a:1;a,b,c",
$0:function(){return this.b.da(this.c,"<subject> <is> too quick for <object>",!0,this.a)}}}],["","",,F,{"^":"",tM:{"^":"a:3;",
$2:function(a,b){return!0}},tN:{"^":"a:53;",
$3:function(a,b,c){if(a.gU())a.aS(c,"<subject> stand<s> off")
return H.d(a.gn(a))+" passes the opportunity"}},tO:{"^":"a:4;",
$3:function(a,b,c){}}}],["","",,B,{"^":"",ug:{"^":"a:13;",
$2:function(a,b){return a.gJ()===C.i}},uh:{"^":"a:4;",
$3:function(a,b,c){if(a.gU())a.bH(c,"<subject> regain<s> <object>",$.$get$f4(),!0)
b.aH(a.gp(a),new B.rv())
return H.d(a.gn(a))+" regains balance"}},rv:{"^":"a:0;",
$1:function(a){a.sJ(C.c)
return C.c}},ui:{"^":"a:4;",
$3:function(a,b,c){}}}],["","",,Y,{"^":"",tx:{"^":"a:7;",
$3:function(a,b,c){return a.gJ()===C.c&&b.gJ()!==C.n&&a.b2(C.f)}},tA:{"^":"a:4;",
$3:function(a,b,c){return 1}},tz:{"^":"a:5;",
$4:function(a,b,c,d){var z
a.bG(d,"<subject> swing<s> {<subject's> "+a.gaj().f+" |}at <object>",b)
c.ew(M.hP(a,b))
z=L.hN(a,b)
C.a.l(c.e,z)
return H.d(a.ch)+" slashes at "+H.d(J.M(b))}},tW:{"^":"a:7;",
$3:function(a,b,c){return a.b2(C.f)}},tY:{"^":"a:4;",
$3:function(a,b,c){return 1}},tX:{"^":"a:5;",
$4:function(a,b,c,d){var z=J.u(b)
c.aH(z.gp(b),new Y.rk())
if(c.a0(z.gp(b)).gbD()){a.bH(d,"<subject> {slash<es>|cut<s>} <object's> {shoulder|abdomen|thigh}",b,!0)
b.bF(d,"<subject> {scream|yell|grunt}<s> in pain",!0)}else{a.bH(d,"<subject> {slash<es>|cut<s>} {across|through} <object's> {neck|abdomen|lower body}",b,!0)
X.jk(d,b)}return H.d(J.M(a))+" slains "+H.d(z.gn(b))}},rk:{"^":"a:0;",
$1:function(a){a.say(a.gay()-1)
return a}}}],["","",,L,{"^":"",
hN:function(a,b){var z=new L.es(null,null,null,null,null)
new L.tB(a,b).$1(z)
return z.C()},
hM:{"^":"br;",
gbb:function(){return[$.$get$j1(),$.$get$jf(),$.$get$j0()]},
gn:function(a){return"SlashDefenseSituation"},
bd:function(){var z=new L.es(null,null,null,null,null)
z.a=this
new L.of().$1(z)
return z.C()},
bl:function(a,b){if(a===0)return b.a0(this.c)
return},
bm:function(a,b){return new H.a4(a,new L.og(this),[H.p(a,0)])}},
tB:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aA(1073741823)
a.gar().c=z
a.gar().e=0
z=this.a
z=z.gp(z)
a.gar().b=z
z=J.L(this.b)
a.gar().d=z
return a}},
of:{"^":"a:0;",
$1:function(a){var z=a.gar().e
if(typeof z!=="number")return z.G()
a.gar().e=z+1
return a}},
og:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gp(a),y.a)||J.f(z.gp(a),y.c)}},
pt:{"^":"hM;a,p:b>,c,R:d<",
aE:function(a){var z=new L.es(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof L.hM))return!1
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
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"SlashDefenseSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntarget="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
es:{"^":"b;a,b,c,d,e",
gp:function(a){return this.gar().c},
gR:function(){return this.gar().e},
gar:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gar().b
x=this.gar().c
w=this.gar().d
v=this.gar().e
z=new L.pt(y,x,w,v)
if(y==null)H.o(P.J("attacker"))
if(x==null)H.o(P.J("id"))
if(w==null)H.o(P.J("target"))
if(v==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,M,{"^":"",
hP:function(a,b){var z=new M.et(null,null,null,null,null)
new M.tV(a,b).$1(z)
return z.C()},
hO:{"^":"br;",
gbb:function(){return[$.$get$j5()]},
gn:function(a){return"SlashSituation"},
bd:function(){var z=new M.et(null,null,null,null,null)
z.a=this
new M.oh().$1(z)
return z.C()},
bl:function(a,b){if(a===0)return b.a0(this.a)
return},
bm:function(a,b){return new H.a4(a,new M.oi(this),[H.p(a,0)])}},
tV:{"^":"a:0;a,b",
$1:function(a){var z=$.$get$be().aA(1073741823)
a.gas().c=z
a.gas().e=0
z=this.a
z=z.gp(z)
a.gas().b=z
z=J.L(this.b)
a.gas().d=z
return a}},
oh:{"^":"a:0;",
$1:function(a){var z=a.gas().e
if(typeof z!=="number")return z.G()
a.gas().e=z+1
return a}},
oi:{"^":"a:0;a",
$1:function(a){var z,y
z=J.u(a)
y=this.a
return J.f(z.gp(a),y.a)||J.f(z.gp(a),y.c)}},
pu:{"^":"hO;a,p:b>,c,R:d<",
aE:function(a){var z=new M.et(null,null,null,null,null)
z.a=this
a.$1(z)
return z.C()},
q:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof M.hO))return!1
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
gv:function(a){return Y.aZ(Y.y(Y.y(Y.y(Y.y(0,J.x(this.a)),J.x(this.b)),J.x(this.c)),J.x(this.d)))},
k:function(a){return"SlashSituation {attacker="+J.w(this.a)+",\nid="+J.w(this.b)+",\ntarget="+H.d(J.w(this.c))+",\ntime="+J.w(this.d)+",\n}"}},
et:{"^":"b;a,b,c,d,e",
gp:function(a){return this.gas().c},
gR:function(){return this.gas().e},
gas:function(){var z=this.a
if(z!=null){this.b=z.a
this.c=z.b
this.d=z.c
this.e=z.d
this.a=null}return this},
C:function(){var z,y,x,w,v
z=this.a
if(z==null){y=this.gas().b
x=this.gas().c
w=this.gas().d
v=this.gas().e
z=new M.pu(y,x,w,v)
if(y==null)H.o(P.J("attacker"))
if(x==null)H.o(P.J("id"))
if(w==null)H.o(P.J("target"))
if(v==null)H.o(P.J("time"))}this.a=z
return z}}}],["","",,O,{"^":"",
x9:[function(a){var z,y
z=$.$get$fl()
y=z.a
if(y.length>0){y+=" "
z.a=y}z.a=y+a},"$1","uY",2,0,2],
va:[function(a){$.fb=a},"$1","uZ",2,0,2],
iZ:[function(a,b,c,d,e,f,g){var z=L.fB(a,!1,!1,d,e,f,g)
$.$get$c0().l(0,z)
return z},function(a){return O.iZ(a,!1,!1,null,null,null,null)},function(a,b){return O.iZ(a,!1,!1,null,null,b,null)},"$7$deferToChoiceList$deferToEndOfPage$goto$helpMessage$script$submenu","$1","$2$script","uX",2,13,7,0,0,0,1,1,0]}],["","",,X,{"^":"",
aM:function(a){return X.eW(J.jx(a,0,new X.uw()))},
j9:function(a,b,c,d){return X.eW(X.bv(X.bv(X.bv(X.bv(0,J.x(a)),J.x(b)),c&0x1FFFFFFF),J.x(d)))},
bv:function(a,b){var z=J.Q(a,b)
if(typeof z!=="number")return H.n(z)
a=536870911&z
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eW:function(a){if(typeof a!=="number")return H.n(a)
a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
uw:{"^":"a:3;",
$2:function(a,b){return X.bv(a,J.x(b))}}}]]
setupProgram(dart,init.types.length)
var deferredTypes=[{func:1,ret:P.i,args:[R.S,A.ai,Y.ah]},{func:1,ret:Y.bL,args:[P.q]},{func:1,v:true,args:[P.i]},{func:1,ret:P.i,args:[P.q]},{func:1,ret:P.U,args:[R.S,A.ai]},{func:1,ret:P.q,args:[R.S]},{func:1,ret:P.U,args:[P.U,P.U]},{func:1,ret:L.af,args:[P.i],named:{deferToChoiceList:P.W,deferToEndOfPage:P.W,goto:P.i,helpMessage:P.i,script:{func:1,ret:[P.ae,P.b4]},submenu:P.i}}]
init.types.push.apply(init.types,deferredTypes)
C.X=new P.qk()
C.a1=new U.d_(0)
C.a2=new U.d_(1)
C.a3=new U.d_(2)
C.f=new U.d_(3)
C.C=new O.hj(0)
C.af=new O.hj(1)
C.ai=new H.e7([0,"ItemType.SPEAR",1,"ItemType.BRANCH",2,"ItemType.TENT",3,"ItemType.SWORD"],[null,null])
C.aj=new H.e7([0,"KnownToMode.ALL",1,"KnownToMode.PROTAGONIST_ONLY",2,"KnownToMode.CUSTOM"],[null,null])
C.F=new H.e7([0,"Pose.standing",1,"Pose.offBalance",2,"Pose.onGround"],[null,null])
C.c=new R.en(0)
C.i=new R.en(1)
C.n=new R.en(2)
C.H=new Y.cm("he","him","his","himself")
C.l=new Y.cm("it","it","its","itself")
C.ak=new Y.cm("she","her","her","herself")
C.al=new Y.cm("they","them","their","themselves")
C.I=new Y.cm("you","you","your","yourself")
C.o=H.us("dynamic")
C.ao=new P.bU(null,2);(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
var v=a[z++]
I.$lazy(y,x,w,null,v)}})(["dV","$get$dV",function(){return P.kJ()},$,"be","$get$be",function(){return P.ep(null)},$,"bq","$get$bq",function(){return P.ep(null)},$,"hV","$get$hV",function(){return P.G("(\\w)([\\.\\?\\!])([\"'])\\.(?=$|\\s)",!0,!1)},$,"bA","$get$bA",function(){return L.eE(new L.tJ())},$,"fi","$get$fi",function(){return L.eE(new L.uf())},$,"f8","$get$f8",function(){return L.eE(new L.tU())},$,"j_","$get$j_",function(){return new Q.aE("swing back at <object>",new G.tQ(),new G.tR(),new G.tS(),new G.tT())},$,"iM","$get$iM",function(){return P.ep(null)},$,"j0","$get$j0",function(){return new Q.aE("step back and parry",new X.tC(),new X.tD(),new X.tE(),new X.tF())},$,"j1","$get$j1",function(){return new Q.aE("dodge and counter",new F.tZ(),new F.u_(),new F.u0(),new F.u1())},$,"jc","$get$jc",function(){return new Q.aE("kick <object>",new Y.u2(),new Y.u3(),new Y.u5(),new Y.u6())},$,"f4","$get$f4",function(){var z,y
z=$.$get$bA()
y=H.r([],[P.i])
z==null
return new Y.bL(!0,"balance",y,z,!1,C.l)},$,"fg","$get$fg",function(){return new Q.aE("stab <object>",new A.u8(),new A.u9(),new A.ua(),new A.ub())},$,"je","$get$je",function(){return new Q.aE("parry it",new K.tp(),new K.tq(),new K.tr(),new K.ts())},$,"jl","$get$jl",function(){return new Q.aE("roll out of way",new Y.tk(),new Y.tl(),new Y.tm(),new Y.to())},$,"jm","$get$jm",function(){return new Q.aE("strike down at <object>",new T.tg(),new T.th(),null,new T.ti())},$,"j6","$get$j6",function(){return new Q.aE("kill <object>",new T.tu(),new T.tv(),null,new T.tw())},$,"jn","$get$jn",function(){return Q.e_("Stand up.",new Q.uc(),new Q.ud(),new Q.ue(),1)},$,"jf","$get$jf",function(){return new Q.aE("parry and counter",new G.tG(),new G.tH(),new G.tI(),new G.tK())},$,"fh","$get$fh",function(){return Q.e_("Stand off.",new F.tM(),new F.tN(),new F.tO(),1)},$,"jj","$get$jj",function(){return Q.e_("Regain balance.",new B.ug(),new B.uh(),new B.ui(),1)},$,"jp","$get$jp",function(){return new Q.aE("swing at <object>",new Y.tx(),new Y.tz(),null,new Y.tA())},$,"j5","$get$j5",function(){return new Q.aE("kill <object>",new Y.tW(),new Y.tX(),null,new Y.tY())},$])}
$dart_deferred_initializers$["4Tn8YnbGvugdZS/gwaHVPzTDJKg="]=$dart_deferred_initializers$.current
