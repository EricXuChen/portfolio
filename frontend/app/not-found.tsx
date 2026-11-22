import Image from "next/image";
import Link from "next/link";
import { Kicker, T } from "@/components/T";
import Scene from "@/components/Scene";
import { PAGE_SCENES } from "@/content/scenes";
import DreamEye from "@/components/DreamEye";
import RetroWindow from "@/components/RetroWindow";

export default function NotFound() {
  return (
    <section className="page-head wrap not-found has-scene">
      <Scene use={PAGE_SCENES.notFound.page} eager />
      <Image className="nf-watch" src="/objects/pocket-watch-plain.webp" width={619} height={860} alt="A pocket watch — click it, or pull it and let go" sizes="260px" data-swing="" data-pivot="0.02" data-period="1.6" tabIndex={0} draggable={false} />
      <DreamEye className="nf-eye" />
      <Kicker num="404" v={{ en: "Not in the archive", zh: "档案中没有这一页" }} />
      <h1 className="display">
        <T v={{ en: "This page has stopped.", zh: "这一页停摆了。" }} />
      </h1>
      <p className="lede">
        <T
          v={{
            en: "The address may have changed when the archive was reorganised into four sections.",
            zh: "档案重新整理为四个板块后，这个地址可能已经变更。",
          }}
        />
      </p>
      <Link className="text-link" href="/">
        <T v={{ en: "Return to the cover", zh: "回到首页" }} /> →
      </Link>
      <RetroWindow
        title="404"
        again={[
          <T key="a" v={{ en: "you closed the room. it is still missing.", zh: "你把房间关掉了。它还是不见了。" }} />,
          <T key="b" v={{ en: "fine. we will wait here together.", zh: "好吧。那我们一起在这里等。" }} />,
        ]}
        className="nf-window"
        buttons={[
          { label: <T v={{ en: "Go back", zh: "返回" }} />, action: "back" },
          { label: <T v={{ en: "Stay", zh: "留下" }} />, action: "close" },
        ]}
      >
        <T v={{ en: "this room was here a moment ago.", zh: "这个房间刚才还在这里。" }} />
      </RetroWindow>
      <p className="nf-dream">
        <Link className="text-link" href="/dream">
          <T v={{ en: "Or get lost in the dream instead", zh: "或者，去梦里迷一会儿路" }} /> →
        </Link>
      </p>
    </section>
  );
}
