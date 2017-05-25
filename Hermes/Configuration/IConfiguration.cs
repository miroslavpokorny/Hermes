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

using Hermes.Connection;
using Microsoft.AspNet.SignalR;
using Owin;

namespace Hermes.Configuration
{
    /// <summary>
    /// Interface representing Hermes initialization/configuration
    /// </summary>
    public interface IConfiguration
    {
        /// <summary>
        /// Configure mapped connection
        /// </summary>
        /// <param name="appBuilder"></param>
        void Config(IAppBuilder appBuilder);

        /// <summary>
        /// Register (map) connection class to specified path
        /// </summary>
        /// <typeparam name="TConnection">TConnection is child of BaseConnection class</typeparam>
        /// <param name="path">URL part which will be used by mapped connection class</param>
        void MapConnection<TConnection>(string path) where TConnection : BaseConnection;

        /// <summary>
        /// Register (map) connection class to specified path
        /// </summary>
        /// <typeparam name="TConnection">TConnection is child of BaseConnection class</typeparam>
        /// <param name="path">URL part which will be used by mapped connection class</param>
        /// <param name="configuration">SignalR connection configuration</param>
        void MapConnection<TConnection>(string path, ConnectionConfiguration configuration)
            where TConnection : BaseConnection;
    }
}