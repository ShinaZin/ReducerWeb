import * as React from "react";
interface TileProps {
    href: string;
    label?: string;
    size?: number;
}
export class Tile extends React.Component<TileProps> {
    render() {
        let label = this.props.label || this.props.href;
        label = label.replace(/[A-Za-z]*\:\/\//, "");
        label = label.split("/")[0];
        let size = this.props.size || 1;
        return (
            <a
                href={this.props.href}
                className={
                    this.numberToSize(size) +
                    " " +
                    this.setBgColor("") +
                    " fg-white text-shadow "
                }
            >
                <div className="tile-content">
                    <span className="tile-label">{label}</span>
                </div>
            </a>
        );
    }
    private setBgColor(color: string): string {
        let colors: string[] = [
            "black",
            "white",
            "lime",
            "green",
            "emerald",
            "teal",
            "blue",
            "cyan",
            "cobalt",
            "indigo",
            "violet",
            "pink",
            "magenta",
            "crimson",
            "red",
            "orange",
            "amber",
            "yellow",
            "brown",
            "olive",
            "steel",
            "mauve",
            "taupe",
            "gray",
            "dark",
            "darker",
            "darkBrown",
            "darkCrimson",
            "darkMagenta",
            "darkIndigo",
            "darkCyan",
            "darkCobalt",
            "darkTeal",
            "darkEmerald",
            "darkGreen",
            "darkOrange",
            "darkRed",
            "darkPink",
            "darkViolet",
            "darkBlue",
            "lightBlue",
            "lightRed",
            "lightGreen",
            "lighterBlue",
            "lightTeal",
            "lightOlive",
            "lightOrange",
            "lightPink",
            "grayDark",
            "grayDarker",
            "grayLight",
            "grayLighter"
        ];
        if (colors.indexOf(color) === -1)
            return "bg-" + colors[Math.round(Math.random() * colors.length)];
        return "bg-" + color;
    }
    private numberToSize(size: number): string {
        switch (size) {
            case 4:
                return "tile-large";
            case 2:
                return "tile-wide";
            case 0.5:
            case 0:
                return "tile-small";
            case 1:
            default:
                return "tile";
        }
    }
}
