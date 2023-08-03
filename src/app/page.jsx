"use client"

import axios from "axios";
import React, { useState } from "react";

export default function Home(){
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs,setNFTs] = useState();
  const getNftUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.API_KEY}/getNFTs`
  const getNfts =async ()=>{
    let nfts;
    if(!collection){
      const {data} = axios.get(getNftUrl+`?owner=${wallet}`);
      const nfts = data.json();
    }
    else{
      const {data} = axios.get(getNftUrl+`?owner=${wallet}&contractAddresses%5B%5D=${collection}`);
      const nfts = data.json();
    }
    if(nfts){
      setNFTs(nfts)
    }

  }
  return(<>
    <div className="w-screen h-screen flex flex-col items-center justify-center py-8 ">
      <div className="flex flex-col w-full justify-center items-center gap-y-4">
        <input type={"text"} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} placeholder="Add your wallet address" className="bg-emerald-300 h-10 w-1/5 text-center"></input>
        <input type={"text"} placeholder="Add the collection address" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} className="bg-emerald-300 h-10 w-1/5 text-center"></input>
        <label className="text-gray-600 "><input type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}>Let's go! </button>
      </div>
    </div>
  </>)
}