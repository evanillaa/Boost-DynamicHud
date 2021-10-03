local PlayerStats = {['thirst'] = 0, ['hunger'] = 0, ['stress'] = 0}
local isLoggedIn = false

RegisterNetEvent('QBCore:Client:OnPlayerUnload')
AddEventHandler('QBCore:Client:OnPlayerUnload', function()
    isLoggedIn = false
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded')
AddEventHandler('QBCore:Client:OnPlayerLoaded', function()
    isLoggedIn = true
    Wait(100)
    UpdatePos()
end)

RegisterNetEvent('hud:client:UpdateNeeds') -- Triggered in qb-core
AddEventHandler('hud:client:UpdateNeeds', function(newHunger, newThirst)
    PlayerStats.hunger = newHunger
    PlayerStats.thirst = newThirst
end)

RegisterNetEvent('hud:client:UpdateStress') -- Add this event with adding stress elsewhere
AddEventHandler('hud:client:UpdateStress', function(newStress)
    PlayerStats.stress = newStress
end)


Citizen.CreateThread(function()
    while true do
        Wait(500)
        if isLoggedIn then
            local player = PlayerPedId()
            local talking = NetworkIsPlayerTalking(PlayerId())
            local health = GetEntityHealth(player) - 100
            local armor = GetPedArmour(player)
            local voice = 0
            if LocalPlayer.state['proximity'] ~= nil then
                voice = LocalPlayer.state['proximity'].distance
                SendNUIMessage({
                    type = 'mic',
                    volume = voice,
                    talking = talking
                })
            end
            SendNUIMessage({
                type = 'status',
                hunger = PlayerStats.hunger,
                thirst = PlayerStats.thirst,
                stress = PlayerStats.stress,
                health = health,
                armor = armor,
            })
            SendNUIMessage({
                type = 'toggle',
                show = not IsPauseMenuActive()
            })
        else
            SendNUIMessage({
                type = 'toggle',
                show = false
            })
        end
    end
end)


function UpdatePos()
    local pos = getPos()
    if not IsRadarEnabled() then
        SendNUIMessage({
            type = 'setpos',
            x = pos.right_x,
            y = pos.top_y
        })
    else
        SendNUIMessage({
            type = 'setpos',
            x = pos.right_x,
            y = pos.top_y + 0.18
        })
    end
end

function getPos()
    -- Safezone goes from 1.0 (no gap) to 0.9 (5% gap (1/20))
    -- 0.05 * ((safezone - 0.9) * 10)
    local safezone = GetSafeZoneSize()
    local safezone_x = 1.0 / 20.0
    local safezone_y = 1.0 / 20.0
    local aspect_ratio = GetAspectRatio(0)
    local res_x, res_y = GetActiveScreenResolution()
    local xscale = 1.0 / res_x
    local yscale = 1.0 / res_y
    local Minimap = {}
    Minimap.width = xscale * (res_x / (4 * aspect_ratio))
    Minimap.height = yscale * (res_y / 5.674)
    Minimap.left_x = xscale * (res_x * (safezone_x * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.bottom_y = 1.0 - yscale * (res_y * (safezone_y * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.right_x = Minimap.left_x + Minimap.width
    Minimap.top_y = Minimap.bottom_y - Minimap.height
    Minimap.x = Minimap.left_x
    Minimap.y = Minimap.top_y
    Minimap.xunit = xscale
    Minimap.yunit = yscale
    return Minimap
end

