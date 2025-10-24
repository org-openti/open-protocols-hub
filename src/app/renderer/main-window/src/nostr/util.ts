import { nip19 } from 'nostr-tools';

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function isHexKey(hex: string): boolean {
  return /^[a-f0-9]{64}$/i.test(hex);
}

function isBech32Key(key: string): boolean {
  try {
    const { type, data } = nip19.decode(key);

    if ((type === 'npub' || type === 'nsec') && data instanceof Uint8Array) {
      const hex = bytesToHex(data);
      return isHexKey(hex);
    }

    return false; // Para outros tipos como 'nprofile', 'nevent', etc.
  } catch {
    return false;
  }
}

/** Verifica se a chave (hex ou bech32 npub/nsec) é válida */
export function isValidNostrKey(key: string): boolean {
  
  return isHexKey(key) || isBech32Key(key);
}
