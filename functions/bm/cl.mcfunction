gamerule commandblocksenabled true
#gamerule sendcommandfeedback false
gamerule commandblockoutput false
scoreboard objectives add kills dummy
scoreboard objectives add killstreak dummy
scoreboard objectives add clspawn dummy
scoreboard objectives add clcmd dummy
scoreboard objectives add cldata dummy
scoreboard objectives add clcmdc dummy
scoreboard objectives add clt dummy
scoreboard objectives add cls dummy
scoreboard objectives add cld dummy
scoreboard objectives add c dummy
scoreboard objectives add cs dummy
scoreboard objectives add clROTID dummy
scoreboard objectives add clsong dummy
scoreboard objectives add clspawn1 dummy
scoreboard objectives add clwins dummy
scoreboard objectives add hks dummy
scoreboard objectives add l dummy
scoreboard objectives add l2 dummy
scoreboard objectives add l3 dummy
scoreboard objectives add clloss dummy
scoreboard objectives add clspawn2 dummy
scoreboard objectives add clfly dummy
scoreboard objectives add clpid2 dummy
scoreboard objectives add clplayer dummy
scoreboard objectives add clsong dummy
scoreboard objectives add clROTh dummy "§d§lHearts"
scoreboard objectives add clpl dummy
scoreboard objectives add leathboots dummy leathboots
scoreboard objectives add chainboots dummy chainboots
scoreboard objectives add goldboots dummy goldboots
scoreboard objectives add ironboots dummy ironboots
scoreboard objectives add diaboots dummy diaboots
scoreboard objectives add nethboots dummy nethboots
scoreboard objectives add leathlegs dummy leathlegs
scoreboard objectives add chainlegs dummy chainlegs
scoreboard objectives add goldlegs dummy goldlegs
scoreboard objectives add ironlegs dummy ironlegs
scoreboard objectives add dialegs dummy dialegs
scoreboard objectives add nethlegs dummy nethlegs
scoreboard objectives add leathchest dummy leathchest
scoreboard objectives add chainchest dummy chainchest
scoreboard objectives add goldchest dummy goldchest
scoreboard objectives add ironchest dummy ironchest
scoreboard objectives add diachest dummy diachest
scoreboard objectives add nethchest dummy nethchest
scoreboard objectives add leathhelm dummy leathhelm
scoreboard objectives add chainhelm dummy chainhelm
scoreboard objectives add goldhelm dummy goldhelm
scoreboard objectives add ironhelm dummy ironhelm
scoreboard objectives add diahelm dummy diahelm
scoreboard objectives add nethhelm dummy nethhelm
scoreboard objectives add skywars dummy
scoreboard objectives add swg dummy
scoreboard objectives add sw dummy
scoreboard objectives add swk dummy
scoreboard objectives add swd dummy
scoreboard objectives add swkd dummy
scoreboard players add @a clwins 0
scoreboard players add @a clloss 0
scoreboard players add @a swg 0
scoreboard players add @a sw 0
scoreboard players add @a swk 0
scoreboard players add @a swd 0
scoreboard players add @a swkd 0
scoreboard players add @a kills 0
scoreboard players add @a cld 0
scoreboard players add @a leathboots 0
scoreboard players add @a chainboots 0
scoreboard players add @a goldboots 0
scoreboard players add @a ironboots 0
scoreboard players add @a hks 0
scoreboard players add @a cs 0
scoreboard players add @a c 0
scoreboard players add @a l 0
scoreboard players add @a l2 0
scoreboard players add @a l3 0
scoreboard players add @a diaboots 0
scoreboard players add @a nethboots 0
scoreboard players add @a leathlegs 0
scoreboard players add @a chainlegs 0
scoreboard players add @a goldlegs 0
scoreboard players add @a ironlegs 0
scoreboard players add @a dialegs 0
scoreboard players add @a nethlegs 0
scoreboard players add @a leathchest 0
scoreboard players add @a chainchest 0
scoreboard players add @a goldchest 0
scoreboard players add @a ironchest 0
scoreboard players add @a diachest 0
scoreboard players add @a nethchest 0
scoreboard players add @a leathhelm 0
scoreboard players add @a chainhelm 0
scoreboard players add @a goldhelm 0
scoreboard players add @a ironhelm 0
scoreboard players add @a diahelm 0
scoreboard players add @a nethhelm 0
scoreboard players add @a clcmd 0
scoreboard players add @a clROTh 0
scoreboard players set @a[m=c] clcmd 0
scoreboard players add @a clspawn1 0
scoreboard players add @a clfly 0
scoreboard players add @a clspawn1 0
scoreboard players add @a clpid2 0
execute @a ~~~ scoreboard players operation @s clspawn1 = @s clspawn2
scoreboard objectives remove clspawn2
scoreboard objectives add clspawn2 dummy
scoreboard players add @a clspawn2 0
execute @a ~~~ scoreboard players operation @s clspawn2 = @s clspawn1
scoreboard players reset @a clspawn1
scoreboard players reset @s clpl
execute @a ~~~ scoreboard players add @a clpl 1
scoreboard players add @a clpid2 0
execute @a ~~~ scoreboard players operation @s clpid2 = @s clpid
scoreboard objectives remove clpid
scoreboard objectives add clpid dummy
scoreboard players add @a clpid 0
execute @a ~~~ scoreboard players operation @s clpid = @s clpid2

#Divder

scoreboard players add @a cldata 0
scoreboard players set @a clROTID 0
playsound random.orb @a[tag=!clnftj]
tellraw @a[tag=!clnftj] {"rawtext":[{"text":"§7§l>>§r§7 \u0054\u0068\u0069\u0073 \u0073\u0065\u0072\u0076\u0065\u0072 \u0075\u0073\u0065\u0073 \u0052\u004f\u0054 \u0061\u006e\u0064 \u0055\u0041\u0043\u0021 \u004a\u006f\u0069\u006e \u0074\u0068\u0065 \u0052\u004f\u0054 \u0064\u0069\u0073\u0063\u006f\u0072\u0064\u003a \u00a7\u006c\u00a7\u0064\u0064\u0069\u0073\u0063\u006f\u0072\u0064\u002e\u0067\u0067\u002f\u006a\u0034\u0039\u0045\u0041\u0034\u0042\u0037\u0039\u0071"}]}
execute @a[tag=!clnftj] ~~~ summon fireworks_rocket
execute @a[tag=cl1] ~~~ function bm/CS/cl1
execute @a[tag=cl2] ~~~ function bm/CS/cl2
execute @a[tag=cl3] ~~~ function bm/CS/cl3
execute @a[tag=cl4] ~~~ function bm/CS/cl4
execute @a[tag=cl5] ~~~ function bm/CS/cl5
execute @a[tag=smite] ~~~ summon lightning_bolt ~~~
execute @a[tag=smite] ~~~ tellraw @a[tag=!smite] {"rawtext":[{"text":"§7§l>>§r§7 §a"},{"selector":"@a[tag=smite]"},{"text":" §6\u0048\u0061\u0073 \u0062\u0065\u0065\u006e \u002f\u0073\u006d\u0069\u0074\u0065\u0064\u0021 \u0050\u006f\u0069\u006e\u0074 \u0061\u006e\u0064 \u006c\u0075\u0061\u0067\u0068 \u0061\u0074 \u0074\u0068\u0065\u006d \u0058\u0044\u0021\u0021\u0021"}]}
effect @a[tag=smite] levitation 1 150 true
tellraw @a[tag=smite] {"rawtext":[{"text":"§7§l>>§r§7 §l§d<o/\n§l§6A Admin §d/Smited §eYou!!!§r"}]}
tag @a remove smite
scoreboard players reset @a[scores={clspawn2=0}] clpid
scoreboard players set @a[scores={clspawn2=0}] clpid 31
scoreboard players add @a[scores={clspawn2=0}] clog 1
tellraw @a[scores={clspawn2=0},tag=clnftj] {"rawtext":[{"text":"§7§l>>§r§7 Welcome back! Join the ROT Discord here:§l§d https://discord.gg/2ADBWfcC6S"}]}
tag @a add clnftj
scoreboard players set @a clspawn2 1
execute @a[scores={clpid=1}] ~~~ scoreboard players set @a[scores={clpid=31}] clpid 32
execute @a[scores={clpid=2}] ~~~ scoreboard players set @a[scores={clpid=32}] clpid 33
execute @a[scores={clpid=3}] ~~~ scoreboard players set @a[scores={clpid=33}] clpid 34
execute @a[scores={clpid=4}] ~~~ scoreboard players set @a[scores={clpid=34}] clpid 35
execute @a[scores={clpid=5}] ~~~ scoreboard players set @a[scores={clpid=35}] clpid 36
execute @a[scores={clpid=6}] ~~~ scoreboard players set @a[scores={clpid=36}] clpid 37
execute @a[scores={clpid=7}] ~~~ scoreboard players set @a[scores={clpid=37}] clpid 38
execute @a[scores={clpid=8}] ~~~ scoreboard players set @a[scores={clpid=38}] clpid 39
execute @a[scores={clpid=9}] ~~~ scoreboard players set @a[scores={clpid=39}] clpid 40
execute @a[scores={clpid=10}] ~~~ scoreboard players set @a[scores={clpid=40}] clpid 41
execute @a[scores={clpid=11}] ~~~ scoreboard players set @a[scores={clpid=41}] clpid 42
execute @a[scores={clpid=12}] ~~~ scoreboard players set @a[scores={clpid=42}] clpid 43
execute @a[scores={clpid=13}] ~~~ scoreboard players set @a[scores={clpid=43}] clpid 44
execute @a[scores={clpid=14}] ~~~ scoreboard players set @a[scores={clpid=44}] clpid 45
execute @a[scores={clpid=15}] ~~~ scoreboard players set @a[scores={clpid=45}] clpid 46
execute @a[scores={clpid=16}] ~~~ scoreboard players set @a[scores={clpid=46}] clpid 47
execute @a[scores={clpid=17}] ~~~ scoreboard players set @a[scores={clpid=47}] clpid 48
execute @a[scores={clpid=18}] ~~~ scoreboard players set @a[scores={clpid=48}] clpid 49
execute @a[scores={clpid=19}] ~~~ scoreboard players set @a[scores={clpid=49}] clpid 50
execute @a[scores={clpid=20}] ~~~ scoreboard players set @a[scores={clpid=50}] clpid 51
execute @a[scores={clpid=21}] ~~~ scoreboard players set @a[scores={clpid=51}] clpid 52
execute @a[scores={clpid=22}] ~~~ scoreboard players set @a[scores={clpid=52}] clpid 53
execute @a[scores={clpid=23}] ~~~ scoreboard players set @a[scores={clpid=53}] clpid 54
execute @a[scores={clpid=24}] ~~~ scoreboard players set @a[scores={clpid=54}] clpid 55
execute @a[scores={clpid=25}] ~~~ scoreboard players set @a[scores={clpid=55}] clpid 56
execute @a[scores={clpid=26}] ~~~ scoreboard players set @a[scores={clpid=56}] clpid 57
execute @a[scores={clpid=27}] ~~~ scoreboard players set @a[scores={clpid=57}] clpid 58
execute @a[scores={clpid=28}] ~~~ scoreboard players set @a[scores={clpid=58}] clpid 59
execute @a[scores={clpid=29}] ~~~ scoreboard players set @a[scores={clpid=59}] clpid 60
execute @a[scores={clpid=30}] ~~~ scoreboard players set @a[scores={clpid=60}] clpid 61
scoreboard players set @a[scores={clpid=31}] clpid 1
scoreboard players set @a[scores={clpid=32}] clpid 2
scoreboard players set @a[scores={clpid=33}] clpid 3
scoreboard players set @a[scores={clpid=34}] clpid 4
scoreboard players set @a[scores={clpid=35}] clpid 5
scoreboard players set @a[scores={clpid=36}] clpid 6
scoreboard players set @a[scores={clpid=37}] clpid 7
scoreboard players set @a[scores={clpid=38}] clpid 8
scoreboard players set @a[scores={clpid=39}] clpid 9
scoreboard players set @a[scores={clpid=40}] clpid 10
scoreboard players set @a[scores={clpid=41}] clpid 11
scoreboard players set @a[scores={clpid=42}] clpid 12
scoreboard players set @a[scores={clpid=43}] clpid 13
scoreboard players set @a[scores={clpid=44}] clpid 14
scoreboard players set @a[scores={clpid=45}] clpid 15
scoreboard players set @a[scores={clpid=46}] clpid 16
scoreboard players set @a[scores={clpid=47}] clpid 17
scoreboard players set @a[scores={clpid=48}] clpid 18
scoreboard players set @a[scores={clpid=49}] clpid 19
scoreboard players set @a[scores={clpid=50}] clpid 20
scoreboard players set @a[scores={clpid=51}] clpid 21
scoreboard players set @a[scores={clpid=52}] clpid 22
scoreboard players set @a[scores={clpid=53}] clpid 23
scoreboard players set @a[scores={clpid=54}] clpid 24
scoreboard players set @a[scores={clpid=55}] clpid 25
scoreboard players set @a[scores={clpid=56}] clpid 26
scoreboard players set @a[scores={clpid=57}] clpid 27
scoreboard players set @a[scores={clpid=58}] clpid 28
scoreboard players set @a[scores={clpid=59}] clpid 29
scoreboard players set @a[scores={clpid=60}] clpid 30
scoreboard players add @a[scores={clt=20..}] cls 1
scoreboard players set @a[scores={clt=20..}] clt 0
scoreboard players add @a[scores={cls=60..}] clm 1
scoreboard players set @a[scores={cls=60..}] cls 0
scoreboard players add @a[scores={clm=60..}] clh 1
scoreboard players set @a[scores={clm=60..}] clm 0
tag @a[tag=v] add c
tag @a[tag=v] add t
tag @a[name=SamoyedDiamond5] add v
tag @a[name=turdnugget77469] add v
#tag @a[name=moisesgamingtv9] add v
tag @a[name=fireshardpk] add v
scoreboard players add @e clplayer 0
scoreboard players set @e[type=!player] clplayer 1
scoreboard players set @e[type=player] clplayer 1
execute @e[scores={clplayer=0}] ~ ~ ~ fill ~15 ~15 ~15 ~-15 ~-15 ~-15 air 0 replace mob_spawner
tp @e[scores={clplayer=0}] 0 -100 0
kill @e[scores={clplayer=0}]
kill @e[type=command_block_minecart]
fill ~15~15~15~-15~-15~-15 air 0 replace beehive -1
fill ~15~~15~-15~~-15 air 0 replace beehive -1
fill ~15~15~15~-15~-15~-15 air 0 replace bee_nest -1
clear @a beehive
clear @a bee_nest