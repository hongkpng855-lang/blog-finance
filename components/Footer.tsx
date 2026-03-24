'use client'

import Link from 'next/link'
import { Mail, Rss, Github, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* 頂部波浪裝飾 */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-lg">財</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">財經觀點</span>
                <div className="text-xs text-slate-400">FINANCE INSIGHT</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              專業財經知識平台，提供投資理財、股市分析、經濟趨勢等優質內容，助您掌握財富增值之道。
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800/80 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800/80 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800/80 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800/80 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
              <a href="/feed.xml" className="w-9 h-9 bg-slate-800/80 rounded-lg flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all duration-300">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>