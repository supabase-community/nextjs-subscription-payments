import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { Database } from '@/types_db';

type TypedSupabaseClient = SupabaseClient<Database> | any;

export const getUser = cache(async (supabase: TypedSupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: TypedSupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();
  return subscription;
});

export const getProducts = cache(async (supabase: TypedSupabaseClient) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });
  return products;
});

export const getUserDetails = cache(async (supabase: TypedSupabaseClient) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  return userDetails;
});