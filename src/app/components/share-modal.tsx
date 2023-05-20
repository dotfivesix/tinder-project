import { swipes } from "@/data";
import { useState } from "react";

export function BaseModal
  ({ setSelection, children }: any) {

  return (
    <div className="fixed py-8 z-10 top-0 left-0 w-full h-screen flex justify-center items-start rounded-lg overflow-y-auto">
      <button
        type="button"
        className="fixed z-10 top-0 w-full h-screen bg-[#00000040] cursor-default"
        onClick={() => setSelection(false)}
      ></button>
      {children}
    </div>
  );

};

export default function ShareModal
  ({ setSelection }: any) {

  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ style:'', text: '' });

  const inputStyle = "border border-gray-800 w-full p-2 focus:outline-gray-500";

  const isValidUsername = (username: string): string | null => {
    if (username.trim().length < 3) {
      return null; // Invalid username with less than 3 characters
    }
    const sanitizedUsername = username.replace(/\s+/g, '+');
    const regex = /^[a-zA-Z0-9_+]+$/;
  
    return regex.test(sanitizedUsername) ? sanitizedUsername : null;
  };
  

  const generateLink = () => {
    setMessage({style: '', text: ''});
    const domain = process.env.NEXT_PUBLIC_DOMAIN ?? 'https://luxury-escapes.vercel.app';
    const validatedUsername = isValidUsername(name);
    if (!validatedUsername) { setMessage({style: 'text-red-500', text: 'Invalid Username !'}); return; }
    const swipesToString = (dir:string):string => swipes.filter(swipe => swipe.direction === dir).map(swipe => swipe.id).join('+');
    const newLink = `${domain}/?name=${validatedUsername}&left=${swipesToString('left')}&right=${swipesToString('right')}`;
    setLink(newLink);
    navigator.clipboard.writeText(newLink).then(() => {
      setMessage({style:'text-green-500', text: 'Copied! Now send it to your friend!'});
    })
  }

  return (
    <BaseModal {...{ setSelection }}>
      <article className="mx-4 my-auto p-6 z-20 w-full max-w-lg bg-white rounded-md flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Match with your friend</h1>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800 text-sm">Your Name</label>
          <input type="text" placeholder="Your Name Here" className={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
          <button className="p-2 bg-gray-800 text-neutral-200 w-full" onClick={() => generateLink()}>Get Link</button>
          <input type="text" placeholder="Link Will Generate Here" value={link} className={inputStyle} />
          <span className={message.style}>{message.text}</span>
        </div>
      </article>
    </BaseModal>
  )
}
