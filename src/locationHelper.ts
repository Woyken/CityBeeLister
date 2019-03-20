interface ICoords {
    x: number;
    y: number;
}

export class LocationHelper {
    public getCurrentLocation(): Promise<Position> {
        return new Promise<Position>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    public sortByDistance(origin: Coordinates, list: CarDetailedInfo[]) {
        list.sort((a, b) => {
            const distA = this.distanceBetweenPoints(
                { x: origin.latitude, y: origin.longitude },
                { x: a.carAvailable.lat, y: a.carAvailable.long },
            );
            const distB = this.distanceBetweenPoints(
                { x: origin.latitude, y: origin.longitude },
                { x: b.carAvailable.lat, y: b.carAvailable.long },
            );
            return distA - distB;
        });
    }

    private distanceBetweenPoints(p1: ICoords, p2: ICoords) {
        return Math.abs(Math.sqrt((p1.y - p2.y) * (p1.y - p2.y) + (p1.x - p2.x) * (p1.x - p2.x)));
    }
}
