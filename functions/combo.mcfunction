scoreboard objectives add combo dummy
scoreboard players add @a combo 0
execute @a ~~~ detect ~~-2~ air 0 tag @s add kbth
effect @a[scores={combo=1},tag=!kbth] levitation 1 18 true
scoreboard players add @a[scores={combo=1..}] combo 1
effect @a[scores={combo=3..}] levitation 0 255 true
tp @a[scores={combo=2..}] @s
event entity @a[scores={combo=3..}] minecraft:kb
scoreboard players reset @a[scores={combo=3..}] combo
tag @a remove kbth