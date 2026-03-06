import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090');

export async function getOffres(id) {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

// src/js/backend.mjs
export async function getOffre(id) {  // ← singular, avec paramètre id
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}
export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function getAgents() {
    try {
        let data = await db.collection('agents').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function getAgent(id) {
    try {
        const data = await db.collection('agents').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant l\'agent', error);
        return null;
    }
}

export async function getOffresByAgent(agentId) {
    try {
        let data = await db.collection('maison').getFullList({
            filter: `agent = "${agentId}"`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les offres de l\'agent', error);
        return [];
    }
}