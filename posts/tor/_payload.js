export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah){return {data:{"content-/posts/tor":{_path:"\u002Fposts\u002Ftor",_dir:"posts",_draft:D,_partial:D,_locale:n,_empty:D,title:"Tor проксирование",description:L,date:"2022-05-26T00:00:00.000Z",type:"post",tags:["network"],body:{type:"root",children:[{type:a,tag:m,props:{},children:[{type:b,value:L}]},{type:a,tag:k,props:{code:"sudo pacman -S dnsmasq dhcpcd tor\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"pacman"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"-S"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:O}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Конфиг dnsmasq."}]},{type:a,tag:k,props:{code:"# \u002Fetc\u002Fdnsmasq.conf\n\nno-resolv\nno-hosts\nport=53\nserver=127.0.0.1#9053\nlisten-address=::1,127.0.0.1\nserver=\u002Fonion\u002F127.0.0.1#9053\nserver=\u002F.exit\u002F127.0.0.1#9053\nserver=8.8.8.8\nserver=8.8.4.4\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# \u002Fetc\u002Fdnsmasq.conf"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"no-resolv"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"no-hosts"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"port"}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"53"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"127.0.0.1#"}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:A}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"listen-address="}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:":"}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:":1,127.0.0.1"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\u002Fonion\u002F127.0.0.1#"}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:A}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\u002F.exit\u002F127.0.0.1#"}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:A}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:P}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:x}]},{type:a,tag:c,props:{class:u},children:[{type:b,value:v}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"8.8.4.4"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Конфиг dhcpcd."}]},{type:a,tag:k,props:{code:"# \u002Fetc\u002Fdhcpcd.conf\n\nnohook resolv.conf\nnoarp\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# \u002Fetc\u002Fdhcpcd.conf"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"nohook"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"resolv.conf"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"noarp"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Конфиг tor. tor_resolv походу не обязательно."}]},{type:a,tag:k,props:{code:"# \u002Fetc\u002Ftor\u002Ftorrc\n\nVirtualAddrNetwork 10.254.0.0\u002F16\nAutomapHostsOnResolve 1\nAutomapHostsSuffixes .exit,.onion\nTransPort 127.0.0.1:9040 NoIsolateClientAddr SessionGroup=1\nDNSPort 127.0.0.1:9053\nServerDNSResolvConfFile \u002Fetc\u002Ftor_resolv.conf\n\n# \u002Fetc\u002Ftor_resolv.conf\n\nnameserver 8.8.8.8\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# \u002Fetc\u002Ftor\u002Ftorrc"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"VirtualAddrNetwork"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:F}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"AutomapHostsOnResolve"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:Q}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"AutomapHostsSuffixes"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:".exit,.onion"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"TransPort"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:G}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"NoIsolateClientAddr"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"SessionGroup="}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:Q}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"DNSPort"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:R}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:A}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"ServerDNSResolvConfFile"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\u002Fetc\u002Ftor_resolv.conf"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# \u002Fetc\u002Ftor_resolv.conf"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"nameserver"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:P}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Выключам, включаем и стартуем службы."}]},{type:a,tag:k,props:{code:"sudo systemctl disable --now systemd-networkd.socket\nsudo systemctl disable --now systemd-networkd\nsudo systemctl disable --now systemd-resolved\n\nsudo systemctl enable --now dhcpcd\nsudo systemctl enable --now dnsmasq\nsudo systemctl start tor\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"systemd-networkd.socket"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"systemd-networkd"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"systemd-resolved"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:N}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:S}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:M}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:w}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"start"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:O}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Правила перенаправления запросов onion в тор мост."}]},{type:a,tag:k,props:{code:"# ip route show default | awk '\u002Fdefault\u002F {print $5}'\n\nsudo iptables -t nat -A PREROUTING -d 10.254.0.0\u002F16 -i enp5s0 -p tcp -j REDIRECT --to-ports 9040\nsudo iptables -t nat -A OUTPUT -d 10.254.0.0\u002F16 -p tcp -j REDIRECT --to-ports 9040\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# ip route show default | awk '\u002Fdefault\u002F {print $5}'"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"PREROUTING"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"-i"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"enp5s0"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:G}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"OUTPUT"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:F}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:Y}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:Z}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:G}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Выключить запрет в firefox. В адресной строке откройте адрес about:config и выключить значение."}]},{type:a,tag:k,props:{code:"network.dns.blockDotOnion     false\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:"network.dns.blockDotOnion"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"     "}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"false"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Для теста onion keybase."}]},{type:a,tag:m,props:{},children:[{type:a,tag:s,props:{href:"http:\u002F\u002Fkeybase5wmilwokqirssclfnsqrjdsi7jdir5wy7y7iu3tanwmtp6oid.onion",rel:[t]},children:[{type:b,value:"keybase5wmilwo"}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Если все нормально, то можно выгрузить правила iptables в любое удобное место, я сохраню рядом с дефолтом."}]},{type:a,tag:k,props:{code:"# \u002Fetc\u002Fiptables\u002Fiptables.rules\n\nsudo iptables-save -f \u002Fetc\u002Fiptables\u002Fiptables.rules.tor\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# \u002Fetc\u002Fiptables\u002Fiptables.rules"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"\u002Fetc\u002Fiptables\u002Fiptables.rules.tor"}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Если нужны эти правила постоянно, то просто перетрите \u002Fetc\u002Fiptables\u002Fiptables.rules, но перед этим создайте копию."}]},{type:a,tag:k,props:{code:"sudo cp \u002Fetc\u002Fiptables\u002Fiptables.rules \u002Fetc\u002Fiptables\u002Fiptables.rules.bak\nsudo iptables-save -f \u002Fetc\u002Fiptables\u002Fiptables.rules\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:"cp"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:K}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ab}]}]}]}]}]},{type:a,tag:m,props:{},children:[{type:b,value:"Считывание правил с файла."}]},{type:a,tag:k,props:{code:"sudo iptables-restore \u002Fetc\u002Fiptables\u002Fiptables.rules.bak\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:K}]}]}]}]}]},{type:a,tag:ad,props:{id:ae},children:[{type:b,value:af}]},{type:a,tag:m,props:{},children:[{type:b,value:"В сети наткнулся на простой пайтон скрипт, немного подправил под Arch."}]},{type:a,tag:m,props:{},children:[{type:a,tag:s,props:{href:"https:\u002F\u002Fgithub.com\u002Fcreio\u002Fdots\u002Fblob\u002Fmaster\u002F.bin\u002Ftoriptables3.py",rel:[t]},children:[{type:b,value:B}]}]},{type:a,tag:k,props:{code:"sudo toriptables3.py -l\n\n# сброс правил\nsudo toriptables3.py -f\n\n# лучше откатите через iptables\nsudo iptables-restore \u002Fetc\u002Fiptables\u002Fiptables.rules.bak\n\n# help\nsudo toriptables3.py -h\n",language:o,meta:p},children:[{type:a,tag:q,props:{},children:[{type:a,tag:k,props:{__ignoreMap:n},children:[{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"-l"}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# сброс правил"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:J}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# лучше откатите через iptables"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:ac}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:K}]}]},{type:a,tag:g,props:{class:h},children:[]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:r},children:[{type:b,value:"# help"}]}]},{type:a,tag:g,props:{class:h},children:[{type:a,tag:c,props:{class:j},children:[{type:b,value:l}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:f},children:[{type:b,value:B}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:e}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"-h"}]}]}]}]}]},{type:a,tag:ad,props:{id:ag},children:[{type:b,value:ah}]},{type:a,tag:"ul",props:{},children:[{type:a,tag:z,props:{},children:[{type:a,tag:s,props:{href:"https:\u002F\u002Fgitlab.torproject.org\u002Flegacy\u002Ftrac\u002F-\u002Fwikis\u002Fdoc\u002FTransparentProxy",rel:[t]},children:[{type:b,value:"TransparentProxy"}]}]},{type:a,tag:z,props:{},children:[{type:a,tag:s,props:{href:"https:\u002F\u002Fwiki.archlinux.org\u002Ftitle\u002Fiptables",rel:[t]},children:[{type:b,value:I}]}]},{type:a,tag:z,props:{},children:[{type:a,tag:s,props:{href:"https:\u002F\u002Fwiki.archlinux.org\u002Ftitle\u002FDhcpcd",rel:[t]},children:[{type:b,value:"Dhcpcd"}]}]},{type:a,tag:z,props:{},children:[{type:a,tag:s,props:{href:"https:\u002F\u002Fwiki.archlinux.org\u002Ftitle\u002FTor#Using_TorDNS_for_all_DNS_queries",rel:[t]},children:[{type:b,value:"Using_TorDNS_for_all_DNS_queries"}]}]},{type:a,tag:z,props:{},children:[{type:a,tag:s,props:{href:"https:\u002F\u002Fwiki.archlinux.org\u002Ftitle\u002FDnsmasq",rel:[t]},children:[{type:b,value:"Dnsmasq"}]}]}]},{type:a,tag:"style",children:[{type:b,value:".ct-0dcaaa{color:#FF7B72}\n.ct-c268e1{color:#8B949E}\n.ct-9be8ab{color:#79C0FF}\n.ct-88b303{color:#A5D6FF}\n.ct-dac861{color:#C9D1D9}\n.ct-e18295{color:#FFA657}"}]}],toc:{title:n,searchDepth:C,depth:C,links:[{id:ae,depth:C,text:af},{id:ag,depth:C,text:ah}]}},_type:"markdown",_id:"content:posts:tor.md",_source:"content",_file:"posts\u002Ftor.md",_extension:"md"}},prerenderedAt:1681405493922}}("element","text","span","ct-dac861"," ","ct-88b303","div","line","ct-9be8ab","ct-e18295","code","sudo","p","","bash",null,"pre","ct-c268e1","a","nofollow","ct-0dcaaa","=","systemctl","server","--now","li","9053","toriptables3.py",2,false,"10.254.0.0\u002F","16","9040","disable","iptables","-f","\u002Fetc\u002Fiptables\u002Fiptables.rules.bak","Задача заставить локально обрабатывать все запросы к onion, через тор, а все остальное в обычном режиме. В этом деле поможет dnsmasq, но заставить его работать я смог только с dhcpcd, не знаю возможно ли это сделать через networkmanager, не пользуюсь им. Выключаем и удаляем все сетевое, ставим dnsmasq и dhcpcd.","dnsmasq","dhcpcd","tor","8.8.8.8","1","127.0.0.1:","enable","-t","nat","-A","-d","-p","tcp","-j","REDIRECT","--to-ports","iptables-save","\u002Fetc\u002Fiptables\u002Fiptables.rules","iptables-restore","h2","заворачивание-всего-трафика-в-tor","Заворачивание всего трафика в tor","ссылки","Ссылки"))