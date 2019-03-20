interface Coords {
    x: number;
    y: number;
}

export class LocationHelper {
    public getCurrentLocation(): Promise<Position> {
        return new Promise<Position>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
    }

    private distanceBetweenPoints (p1: Coords, p2: Coords) {
        return Math.abs(Math.sqrt((p1.y - p2.y) * (p1.y - p2.y) + (p1.x - p2.x) * (p1.x - p2.x)))
    }

    public sortByDistance(origin: Coordinates, list: CarDetailedInfo[]) {
        list.sort((a, b) => {
            const distA = this.distanceBetweenPoints({x: origin.latitude, y: origin.longitude}, {x: a.carAvailable.lat, y: a.carAvailable.long});
            const distB = this.distanceBetweenPoints({x: origin.latitude, y: origin.longitude}, {x: b.carAvailable.lat, y: b.carAvailable.long});
            return distA - distB;
        });
    }
}
