import React from 'react'

const generateAvatar = (name) => {

    if (!name || name.trim() === "") {
        return (
            <div
                className="flex items-center justify-center rounded-full text-white,font-bold  w-full h-full"
            >
                <span>A</span>
            </div>
        )
    }

    const firstLetter = name.trim().charAt(0).toUpperCase();
    const colors = [
        'bg-red-500', 'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-blue-500',
        'bg-sky-500', 'bg-cyan-500', 'bg-teal-500', 'bg-emerald-500', 'bg-green-500',
        'bg-lime-500', 'bg-yellow-500', 'bg-amber-500', 'bg-orange-500', 'bg-rose-500',
        'bg-fuchsia-500', 'bg-stone-500', 'bg-neutral-500', 'bg-zink-500', 'bg-black',
        'bg-red-900', 'bg-pink-900', 'bg-purple-900', 'bg-indigo-900', 'bg-blue-900',
        'bg-sky-900', 'bg-cyan-900', 'bg-teal-900', 'bg-emerald-900', 'bg-green-900',
        'bg-lime-900', 'bg-yellow-900', 'bg-amber-900', 'bg-orange-900', 'bg-rose-900',
        'bg-fuchsia-900', 'bg-stone-900', 'bg-neutral-900', 'bg-zink-900'
    ]

    let hash = 0;

    for (let i = 0; i < firstLetter.length; i++){
        hash = firstLetter.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colorIndex = Math.abs(hash % colors.length);
    const backgroundColorClass = colors[colorIndex];

    return (
        <div
            className={`flex items-center justify-center rounded-full text-white,font-bold ${backgroundColorClass} w-full h-full`}
        >
            <span>{firstLetter}</span>
        </div>
    )
}

function UserAvatar({name, photoUrl=null, size=60}) {
    if (photoUrl) {
        return (
            <div className='relative inline-block' style={{width: size, height: size}}>
                <div
                    className="flex items-center justify-center rounded-full text-white,font-bold  w-full h-full"
                >
                    <span><img src = {photoUrl} alt={`${name}'s profile pic` ||  "avatar pic"} className='rounded-full object-cover'/></span>
                </div>
                
            </div>
        )
    }

    return (
        <div className='relative inline-block' style={{width: size, height: size}}>
            {generateAvatar(name)}
        </div>
    )
}

export default UserAvatar