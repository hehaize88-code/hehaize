'use client';
import {useEffect} from 'react';

export function CommerceRuntime() {
 useEffect(()=>{
  // Start currency updates after React has hydrated the original document.
  if(document.getElementById('commerce-runtime'))return;
  const script=document.createElement('script');
  script.id='commerce-runtime';script.type='module';script.src='/commerce/client.js?v=20261112';
  document.body.append(script);
 },[]);
 return null;
}
