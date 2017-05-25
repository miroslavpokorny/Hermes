/**
 * Copyright 2017 Miroslav Pokorný
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using System;
using System.Collections.Generic;
using Hermes.Connection;
using Microsoft.AspNet.SignalR;
using Owin;

namespace Hermes.Configuration
{
    /// <summary>
    /// Class used to map Hermes connections to SignalR
    /// </summary>
    public class Configuration : IConfiguration
    {
        /// <summary>
        /// List which store info about connections
        /// </summary>
        private readonly List<ConnectionInfo> _connections = new List<ConnectionInfo>();

        /// <summary>
        /// Private data class which store informations about one connection
        /// </summary>
        private class ConnectionInfo
        {
            public ConnectionConfiguration ConnectionConfiguration { get; set; }
            public Type ConnectionType { get; set; }
            public string Path { get; set; }
        }

        /// <inheritdoc />
        public void Config(IAppBuilder appBuilder)
        {
            foreach (var connectionInfo in _connections)
            {
                appBuilder.MapSignalR(
                    connectionInfo.Path,
                    connectionInfo.ConnectionType,
                    connectionInfo.ConnectionConfiguration);
            }
        }

        /// <inheritdoc />
        public void MapConnection<TConnection>(string path) where TConnection : BaseConnection
        {
            MapConnection<TConnection>(path, new ConnectionConfiguration());
        }

        /// <inheritdoc />
        public void MapConnection<TConnection>(string path, ConnectionConfiguration configuration)
            where TConnection : BaseConnection
        {
            _connections.Add(new ConnectionInfo()
            {
                ConnectionConfiguration = configuration,
                ConnectionType = typeof(TConnection),
                Path = path
            });
        }
    }
}