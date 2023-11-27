/*

We are generating a basic dev stage config for our pipeline.
Given a static array (or generated) list of regions, write me a Typescript function that generates a pipelines stage config consisting of:

* stage
* wave
* regionInfo

The function and usage should use a newly defined interface. Name your interface "BaseRegionInfo". The function itself should be named "generateRegionConfig" and should be made usable outside of the file the function is written in.

This can be in pseudo code or TypeScript.
*/

// optional enum for Stage
export enum Stage {
    Dev = "dev",
    Build = "build",
    Beta = "beta",
    Gamma = "gamma",
    Prod = "prod",
}

// Optional extra credit to use a base config
export interface BaseRegionInfo {
    readonly region: string;
    readonly status: string;
}

// Intended setup
/*
export interface BaseStageInfo<RegionInfo extends BaseRegionInfo> {
    readonly stage: Stage;
    readonly wave: string;
    readonly regionInfo: RegionInfo[];
}
*/

// Acceptable setup
export interface BaseStageInfo {
    readonly stage: Stage;
    readonly wave: string;
    readonly region: string;
    readonly status: string;
}

export function generateRegionConfig(stage: Stage, regionArray: string[]): BaseStageInfo[]  {
    const stageInfoConfig: BaseStageInfo[] = [];
    const regionStatus = "BUILD"
    let waveIndex = 1

    console.log("Generating config") 
    for (const region of regionArray) {
        const regionInfo: BaseStageInfo = {
            stage,
            wave: `wave-${waveIndex}`,
            region: region,
            status: regionStatus
        }
        stageInfoConfig.push(regionInfo);
        waveIndex++;
    }
    return stageInfoConfig
}

// Execute
const config = generateRegionConfig(
    Stage.Dev,
    [
        "us-east-1",
        "eu-west-1",
        "us-gov-east-1"
    ]
)
console.log(config)
