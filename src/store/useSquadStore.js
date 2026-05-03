import { create } from 'zustand';
import playersData from '../data/players.json';

const INITIAL_BUDGET = 100.00;

export const useSquadStore = create((set, get) => ({
    // State
    availablePlayers: playersData,
    draftedPlayers: [],
    budget: INITIAL_BUDGET,
    teamFilter: 'All',
    roleFilter: 'All',

    // Actions
    draftPlayer: (playerId) => {
        const { availablePlayers, draftedPlayers, budget } = get();
        
        // Find player in available pool
        const playerToDraft = availablePlayers.find(p => p.id === playerId);
        
        if (!playerToDraft) return; // Player not found or already drafted
        
        // Check budget constraints
        if (budget - playerToDraft.price < 0) {
            console.warn("Not enough budget to draft this player!");
            return; 
        }

        set({
            availablePlayers: availablePlayers.filter(p => p.id !== playerId),
            draftedPlayers: [...draftedPlayers, playerToDraft],
            budget: Number((budget - playerToDraft.price).toFixed(2))
        });
    },

    removePlayer: (playerId) => {
        const { availablePlayers, draftedPlayers, budget } = get();
        
        // Find player in drafted squad
        const playerToRemove = draftedPlayers.find(p => p.id === playerId);
        
        if (!playerToRemove) return;

        set({
            draftedPlayers: draftedPlayers.filter(p => p.id !== playerId),
            availablePlayers: [...availablePlayers, playerToRemove],
            budget: Number((budget + playerToRemove.price).toFixed(2))
        });
    },

    setTeamFilter: (team) => set({ teamFilter: team }),
    setRoleFilter: (role) => set({ roleFilter: role }),
    
    // Computed/Derived helpers via get()
    getFilteredPlayers: () => {
        const { availablePlayers, teamFilter, roleFilter } = get();
        return availablePlayers.filter(player => {
            const matchesTeam = teamFilter === 'All' || player.team === teamFilter;
            const matchesRole = roleFilter === 'All' || player.role === roleFilter;
            return matchesTeam && matchesRole;
        });
    }
}));
