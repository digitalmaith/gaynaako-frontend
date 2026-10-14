import { api } from '@/shared/services/api';
import type {
  User,
  SecteurRef,
  PaysRef,
  DomaineInterventionRef,
  UpdateIdentityPayload,
  UpdateEntrepreneurProfilePayload,
  UpdatePmeProfilePayload,
  UpdateOngProfilePayload,
} from '../types';

export const profileService = {
  async getMe(): Promise<User> {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  async updateIdentity(payload: UpdateIdentityPayload): Promise<User> {
    const { data } = await api.patch<User>('/users/me/identity', payload);
    return data;
  },

  async updateEntrepreneurProfile(payload: UpdateEntrepreneurProfilePayload): Promise<User> {
    const { data } = await api.patch<User>('/users/me/entrepreneur-profile', payload);
    return data;
  },

  async updatePmeProfile(payload: UpdatePmeProfilePayload): Promise<User> {
    const { nomEntreprise, secteurIds } = payload;
    const { data } = await api.patch<User>('/users/me/pme-profile', {
      nomEntreprise,
      secteurIds,
    });
    return data;
  },

  async updateOngProfile(payload: UpdateOngProfilePayload): Promise<User> {
    const { nomOrganisation, domaineInterventionIds, mission } = payload;
    const { data } = await api.patch<User>('/users/me/ong-profile', {
      nomOrganisation,
      domaineInterventionIds,
      mission,
    });
    return data;
  },

  async uploadAvatar(file: File): Promise<User> {
    const form = new FormData();
    form.append('avatar', file);
    const { data } = await api.patch<User>('/users/me/avatar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async uploadLogo(file: File): Promise<User> {
    const form = new FormData();
    form.append('logo', file);
    const { data } = await api.patch<User>('/users/me/logo', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async getSecteurs(): Promise<SecteurRef[]> {
    const { data } = await api.get<SecteurRef[]>('/reference/secteurs');
    return data;
  },

  async getPays(): Promise<PaysRef[]> {
    const { data } = await api.get<PaysRef[]>('/reference/pays');
    return data;
  },

  async getDomainesIntervention(): Promise<DomaineInterventionRef[]> {
    const { data } = await api.get<DomaineInterventionRef[]>('/reference/domaines-intervention');
    return data;
  },
};