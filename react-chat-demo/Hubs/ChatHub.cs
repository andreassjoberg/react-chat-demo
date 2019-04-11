using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace react_chat_demo.Hubs
{
    public class ChatHub : Hub
    {
        [SuppressMessage("ReSharper", "UnusedMember.Global", Justification = "Used by SignalR")]
        public async Task PostMessage(string user, string message)
        {
            await Clients.All.SendAsync("messagePosted", Guid.NewGuid(), user, message);
        }
    }
}
