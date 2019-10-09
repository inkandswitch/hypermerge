/// <reference types="node" />
import Queue from './Queue';
import { Metadata } from './Metadata';
import { Actor } from './Actor';
import { Clock } from './Clock';
import { ToBackendQueryMsg, ToBackendRepoMsg, ToFrontendRepoMsg } from './RepoMsg';
import { Change } from 'automerge';
import * as DocBackend from './DocBackend';
import { ActorId, DocId, RepoId } from './Misc';
import FeedStore from './FeedStore';
import FileStore from './FileStore';
import Network from './Network';
import NetworkPeer from './NetworkPeer';
import { Swarm, JoinOptions } from './SwarmInterface';
import { PeerMsg } from './PeerMsg';
import ClockStore from './ClockStore';
import MessageCenter from './MessageCenter';
import KeyStore from './KeyStore';
import ReplicationManager, { Discovery } from './ReplicationManager';
export interface FeedData {
    actorId: ActorId;
    writable: Boolean;
    changes: Change[];
}
export interface Options {
    path?: string;
    memory?: boolean;
}
export declare class RepoBackend {
    path?: string;
    storage: Function;
    feeds: FeedStore;
    keys: KeyStore;
    files: FileStore;
    clocks: ClockStore;
    actors: Map<ActorId, Actor>;
    docs: Map<DocId, DocBackend.DocBackend>;
    meta: Metadata;
    opts: Options;
    toFrontend: Queue<ToFrontendRepoMsg>;
    id: RepoId;
    network: Network;
    messages: MessageCenter<PeerMsg>;
    replication: ReplicationManager;
    swarmKey: Buffer;
    private db;
    private fileServer;
    constructor(opts: Options);
    startFileServer: (path: string) => void;
    private create;
    private debug;
    private destroy;
    private open;
    merge(id: DocId, clock: Clock): void;
    close: () => Promise<[void, void, void, void]>;
    private allReadyActors;
    private loadDocument;
    join: (actorId: ActorId) => void;
    leave: (actorId: ActorId) => void;
    private getReadyActor;
    storageFn: (path: string) => (name: string) => any;
    initActorFeed(doc: DocBackend.DocBackend): ActorId;
    actorIds(doc: DocBackend.DocBackend): ActorId[];
    docActors(doc: DocBackend.DocBackend): Actor[];
    syncReadyActors: (ids: ActorId[]) => void;
    private documentNotify;
    onPeer: (peer: NetworkPeer) => void;
    onDiscovery: ({ feedId, peer }: Discovery) => void;
    private onMessage;
    private actorNotify;
    private initActor;
    syncChanges: (actor: Actor) => void;
    setSwarm: (swarm: Swarm, joinOptions?: JoinOptions | undefined) => void;
    subscribe: (subscriber: (message: ToFrontendRepoMsg) => void) => void;
    handleQuery: (id: number, query: ToBackendQueryMsg) => void;
    receive: (msg: ToBackendRepoMsg) => void;
    actor(id: ActorId): Actor | undefined;
}
